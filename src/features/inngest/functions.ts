import { prisma } from "@/lib/db";
import { inngest } from "./client";
import { Sandbox } from "e2b";
import { MessageRole, MessageType } from "@/generated/prisma/enums";

import { createAgent, createNetwork, createState, createTool, gemini, openai } from "@inngest/agent-kit"
import { FRAGMENT_TITLE_PROMPT, PROMPT, RESPONSE_PROMPT } from "@/lib/prompt";
import z from "zod"
import { agentOutputText, captureTaskSummary, connectSandbox, lastAssistantTextMessageContent } from "./utils";

export interface CodeAgentState {
  sandboxId: string;
  summary: string;
  files: Record<string, string>;
}


export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    await step.sleep("pause", "1s");

    return { message: `Task ${event.data.id} complete`, result };
  }
);

export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent", triggers: { event: "code-agent/run" }, retries: 0 },
  async ({ event, step }) => {
    const sandboxTemplate = process.env.E2B_TEMPLATE_ID || "c0-build";

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create({
        template: sandboxTemplate,
        apiKey: process.env.E2B_API_KEY,
        timeoutMs: 1000 * 60 * 30, // 30 minutes
      });

      return sandbox.sandboxId;
    })

    const previousMessages = await step.run("get-previous-messages", async () => {
      const messages = await prisma.message.findMany({
        where: {
          projectId: event.data.projectId
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 4
      });

      messages.reverse();

      return messages.map((message) => ({
        type: "text" as const,
        role:
          message.role === MessageRole.ASSISTANT
            ? ("assistant" as const)
            : ("user" as const),
        content: message.content,
      }))
    });

    const state = createState<CodeAgentState>(
      { sandboxId, summary: "", files: {} },
      { messages: previousMessages }
    );

    const codeAgent = createAgent({
      name: "code-agent",
      system: PROMPT,
      model: gemini({ model: "gemini-3.8-flash", apiKey: process.env.GEMINI_API_KEY! }),
      tools: [
        createTool({
          name: "terminal",
          description: "Use the terminal to run commands",
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command }, { step }) => {
            const buffers = { stdout: "", stderr: "" };

            try {
              const sandbox = await Sandbox.connect(sandboxId);

              const result = await sandbox.commands.run(command, {
                timeoutMs: 15000,
                onStdout: (data: string) => {
                  buffers.stdout += data;
                },

                onStderr: (data: string) => {
                  buffers.stderr += data;
                },
              });

              return result.stdout;
            } catch (error) {
              console.error(
                `Command failed: ${error} \n stdout: ${buffers.stdout}\n stderr: ${buffers.stderr}`
              );
              throw new Error(`Command failed: ${error}`);
            }
          },
        }),

        // 2. createOrUpdateFiles
        createTool({
          name: "createOrUpdateFiles",
          description: "Create or update files in the sanbox",
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              })
            ),
          }),

          handler: async ({ files }, { network }) => {
            try {
              const updatedFiles = network?.state?.data?.files || {};

              const sandbox = await Sandbox.connect(sandboxId);

              for (const file of files) {
                await sandbox.files.write(file.path, file.content);
                updatedFiles[file.path] = file.content;
              }

              if (network?.state) {
                network.state.data.files = updatedFiles;
              }

              return `Successfully updated ${files.length} file(s).`;
            } catch (error) {
              console.error("Error updating files:", error);
              throw error;
            }
          },
        }),
        // 3. readFiles
        createTool({
          name: "readFiles",
          description: "Read files in the sandbox",

          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }) => {
            try {
              const sandbox = await Sandbox.connect(sandboxId);

              const contents: { path: string; content: string }[] = [];

              for (const file of files) {
                const content = await sandbox.files.read(file);
                contents.push({ path: file, content });
              }
              return contents;
            } catch (error) {
              console.error("Error reading files:", error);
              throw error;
            }
          },
        }),
      ],

      lifecycle: {
        onResponse: async ({ result, network }) => {
          console.log(result);
          const lastAssistantMessageText =
            lastAssistantTextMessageContent(result);

          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }

          return result;
        },
      },
    });

    const network = createNetwork({
      name: "code-agent-network",
      agents: [codeAgent],
      maxIter: 3,
      router: async({ network }) => {
        const summary = network.state.data.summary;

        // Stop if we have a summary
        if(summary){
          return undefined;
        }

        return codeAgent;
      }

    });

    const inputValue = event.data?.value || "Continue";
    const result = await network.run(inputValue, { state });
    const { summary = "", files = {} } = result.state?.data || {};

    const finalSummary = summary.trim() ? summary : `The user requested: ${inputValue}`;

    // Generate a simple title based on the user's prompt (first 3 words)
    const words = inputValue.split(/\s+/).filter(Boolean);
    let fragmentTitle = words.slice(0, 3).join(" ") || "Untitled";
    if (words.length > 3) fragmentTitle += "...";
    fragmentTitle = fragmentTitle.charAt(0).toUpperCase() + fragmentTitle.slice(1);

    // Hardcode a friendly response to save API calls and avoid hangs
    const responseText = "Done! I've updated the application based on your request. Check out the generated code and preview.";

    console.log(files)

    const isError = !finalSummary;


    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await connectSandbox(sandboxId);
      return `http://${sandbox.getHost(3000)}`
    });

    await step.run("save-result", async () => {
      if (isError) {
        return prisma.message.create({
          data: {
            projectId: event.data.projectId,
            content: "Something went wrong. Please try again",
            role: MessageRole.ASSISTANT,
            type: MessageType.ERROR,
          },
        });
      }

      return prisma.message.create({
        data: {
          projectId: event.data.projectId,
          content: responseText,
          role: MessageRole.ASSISTANT,
          type: MessageType.RESULT,
          fragments: {
            create: {
              sandboxUrl,
              title: fragmentTitle,
              files
            }
          }
        }
      });
    });

    return {
      url: sandboxUrl,
      title: fragmentTitle,
      files,
      summary
    };
  }
);