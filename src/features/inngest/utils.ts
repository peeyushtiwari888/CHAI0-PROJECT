import { Sandbox } from 'e2b';

/**
 * Extract text output from agent output
 */
export function agentOutputText(output: any, defaultText: string = ''): string {
  if (typeof output === 'string') {
    return output;
  }
  
  if (Array.isArray(output)) {
    // Try to find the last assistant message
    const lastAssistant = [...output].reverse().find(m => m.role === 'assistant' && (m.content || m.text));
    if (lastAssistant) {
      if (typeof lastAssistant.content === 'string') return lastAssistant.content;
      if (lastAssistant.text) return lastAssistant.text;
      if (Array.isArray(lastAssistant.content)) {
          for (const block of lastAssistant.content) {
              if (block.type === 'text' && block.text) return block.text;
          }
      }
    }
    // Fallback: just take the last item's text if possible
    const lastItem = output[output.length - 1];
    if (lastItem) {
        if (typeof lastItem.content === 'string') return lastItem.content;
        if (lastItem.text) return lastItem.text;
    }
  }

  if (output?.text) {
    return output.text;
  }
  
  if (output?.content) {
    if (typeof output.content === 'string') return output.content;
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
  
  // Inngest agent-kit AgentResult uses .output instead of .messages
  const messages = Array.isArray(result) ? result : (result.output || result.messages);

  if (Array.isArray(messages)) {
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
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
