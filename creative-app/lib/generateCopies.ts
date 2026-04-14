/**
 * LLM API CONNECTION POINT
 *
 * Currently returns mock data for development.
 *
 * To connect a real LLM, replace the mock return with an API call:
 *
 * --- OpenAI Example ---
 * import OpenAI from "openai";
 * const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 * const response = await openai.chat.completions.create({
 *   model: "gpt-4o",
 *   messages: [{ role: "system", content: buildCopySystemPrompt(beoltoonBrand, inputs) }],
 *   response_format: { type: "json_object" },
 * });
 * return JSON.parse(response.choices[0].message.content ?? "[]");
 *
 * --- Anthropic Example ---
 * import Anthropic from "@anthropic-ai/sdk";
 * const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 * const message = await client.messages.create({
 *   model: "claude-opus-4-5",
 *   max_tokens: 4096,
 *   system: buildCopySystemPrompt(beoltoonBrand, inputs),
 *   messages: [{ role: "user", content: "Generate the copy options now." }],
 * });
 * return JSON.parse((message.content[0] as { text: string }).text);
 */

import type { UserInputs, CopyOption } from "./types";
import { mockCopies } from "./mock";
import { beoltoonBrand } from "../prompts/brand/beoltoon";
import { buildCopySystemPrompt } from "../prompts/system/copySystemPrompt";

// Simulate a delay to mimic real API latency
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateCopies(inputs: UserInputs): Promise<CopyOption[]> {
  const useMock = process.env.USE_MOCK_DATA !== "false";

  if (useMock) {
    // Simulate API latency for realistic UX
    await delay(1200);

    // Build prompt (for logging/debugging purposes)
    const systemPrompt = buildCopySystemPrompt(beoltoonBrand, inputs);
    console.log("[generateCopies] Using mock data. System prompt length:", systemPrompt.length);
    console.log("[generateCopies] Content type:", inputs.contentType);

    // Return mock copies — in production, this would be the LLM response
    return mockCopies;
  }

  // ============================================================
  // REAL LLM IMPLEMENTATION (uncomment and configure as needed)
  // ============================================================
  // const systemPrompt = buildCopySystemPrompt(beoltoonBrand, inputs);
  //
  // Using OpenAI:
  // const { OpenAI } = await import("openai");
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     { role: "system", content: systemPrompt },
  //     { role: "user", content: "지금 카피 옵션들을 생성해주세요." }
  //   ],
  //   response_format: { type: "json_object" },
  //   temperature: 0.8,
  //   max_tokens: 4096,
  // });
  // const content = response.choices[0].message.content ?? "[]";
  // const parsed = JSON.parse(content);
  // return Array.isArray(parsed) ? parsed : parsed.copies ?? [];

  // Fallback to mock if implementation not configured
  await delay(1200);
  return mockCopies;
}
