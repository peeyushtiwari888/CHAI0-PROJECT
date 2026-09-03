export const maxDuration = 300; // Allow function to run for up to 5 minutes on Vercel Pro (60s on Hobby)

import { inngest } from "@/features/inngest/client";
import { codeAgentFunction, processTask } from "@/features/inngest/functions";
import { serve } from "inngest/next";

// Inngest endpoint for webhook and function triggers
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask, codeAgentFunction],
});