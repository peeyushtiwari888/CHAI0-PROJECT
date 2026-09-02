import { Sandbox } from 'e2b';

/**
 * Extract text output from agent output
 */
export function agentOutputText(output: any, defaultText: string = ''): string {
  if (typeof output === 'string') {
    return output;
  }
  
  if (output?.text) {
    return output.text;
  }
  
  if (output?.content) {
    return output.content;
  }
  
  if (output?.output) {
    return agentOutputText(output.output, defaultText);
  }
  
  return defaultText;
}

/**
 * Get the last assistant message text content from agent result
 */
export function lastAssistantTextMessageContent(result: any): string | null {
  if (!result) return null;
  
  if (Array.isArray(result.messages)) {
    for (let i = result.messages.length - 1; i >= 0; i--) {
      const msg = result.messages[i];
      if (msg.role === 'assistant' && msg.content) {
        if (typeof msg.content === 'string') {
          return msg.content;
        }
        if (Array.isArray(msg.content)) {
          for (const block of msg.content) {
            if (block.type === 'text' && block.text) {
              return block.text;
            }
          }
        }
      }
    }
  }
  
  if (result.message && result.role === 'assistant') {
    return typeof result.message === 'string' ? result.message : null;
  }
  
  return null;
}

/**
 * Connect to an existing E2B sandbox
 */
export async function connectSandbox(sandboxId: string): Promise<Sandbox> {
  return await Sandbox.connect(sandboxId);
}

/**
 * Capture task summary from agent output
 */
export function captureTaskSummary(output: any): string {
  const text = agentOutputText(output, '');
  
  // Extract content between <task_summary> tags if present
  const summaryMatch = text.match(/<task_summary>([\s\S]*?)<\/task_summary>/);
  if (summaryMatch) {
    return summaryMatch[1].trim();
  }
  
  return text;
}
