export type FAQItem = {
  id: string;
  question: string;
  answer: React.ReactNode | string;
};

export type FAQCategory = {
  title: string;
  items: FAQItem[];
};

export const faqData: FAQCategory[] = [
  {
    title: "AI & Generation",
    items: [
      {
        id: "workflow",
        question: "How does CodePilot build an app?",
        answer: "CodePilot passes your natural language prompt through an AI agent workflow. The agent generates standard React components, wires them together, and outputs a structured project directory. It then runs this code in an isolated environment to provide a live preview."
      },
      {
        id: "iteration",
        question: "Can I iterate after the first generation?",
        answer: "Yes. CodePilot is built for continuous iteration. Once the initial app is generated, you can use the chat interface to ask for specific layout tweaks, color changes, or new components. The agent updates the files and refreshes the preview."
      }
    ]
  },
  {
    title: "Development Workflow",
    items: [
      {
        id: "export",
        question: "Can I export the generated code?",
        answer: "Absolutely. CodePilot doesn't lock you into a proprietary format. The generated files are standard React components (often using Tailwind CSS) that you can easily copy and paste into your own local codebase."
      },
      {
        id: "preview",
        question: "How does the live preview work?",
        answer: "Every generated application is executed inside a dedicated, isolated E2B sandbox. This ensures that the code runs safely and exactly as it would in a standard local Node/Next.js environment."
      }
    ]
  },
  {
    title: "Trust & Reliability",
    items: [
      {
        id: "async",
        question: "What happens if a complex build takes a long time?",
        answer: "CodePilot uses asynchronous background queues (powered by Inngest) to process heavy generation tasks. If dependency installation or AI generation takes extra time, the interface won't freeze—it safely processes the task and notifies you when it's ready."
      },
      {
        id: "errors",
        question: "What happens if the AI writes broken code?",
        answer: "While our agent is highly capable, AI-generated code isn't always perfect on the first try. If an error occurs, you can often simply prompt the agent with the error message, and it will rewrite the component to resolve the issue."
      }
    ]
  }
];
