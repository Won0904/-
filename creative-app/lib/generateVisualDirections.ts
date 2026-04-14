/**
 * LLM API CONNECTION POINT
 *
 * Currently returns mock data for development.
 *
 * To connect a real LLM, replace the mock return with an API call using
 * buildVisualSystemPrompt() to generate contextual visual directions.
 *
 * --- OpenAI Example ---
 * const systemPrompt = buildVisualSystemPrompt(beoltoonBrand, inputs, selectedCopy);
 * const response = await openai.chat.completions.create({
 *   model: "gpt-4o",
 *   messages: [{ role: "system", content: systemPrompt }],
 *   response_format: { type: "json_object" },
 *   temperature: 0.7,
 * });
 * return JSON.parse(response.choices[0].message.content ?? "[]");
 */

import type { UserInputs, CopyOption, VisualDirection } from "./types";
import { mockVisualDirections } from "./mock";
import { beoltoonBrand } from "../prompts/brand/beoltoon";
import { buildVisualSystemPrompt } from "../prompts/system/visualSystemPrompt";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateVisualDirections(
  inputs: UserInputs,
  selectedCopy: CopyOption
): Promise<VisualDirection[]> {
  const useMock = process.env.USE_MOCK_DATA !== "false";

  if (useMock) {
    await delay(1500);

    const systemPrompt = buildVisualSystemPrompt(beoltoonBrand, inputs, selectedCopy);
    console.log("[generateVisualDirections] Using mock data. System prompt length:", systemPrompt.length);
    console.log("[generateVisualDirections] Selected copy:", selectedCopy.text);

    return mockVisualDirections;
  }

  // ============================================================
  // REAL LLM IMPLEMENTATION
  // ============================================================
  // const systemPrompt = buildVisualSystemPrompt(beoltoonBrand, inputs, selectedCopy);
  //
  // Using OpenAI:
  // const { OpenAI } = await import("openai");
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     { role: "system", content: systemPrompt },
  //     { role: "user", content: "비주얼 방향을 제안해주세요." }
  //   ],
  //   response_format: { type: "json_object" },
  //   temperature: 0.7,
  //   max_tokens: 4096,
  // });
  // const content = response.choices[0].message.content ?? "[]";
  // const parsed = JSON.parse(content);
  // return Array.isArray(parsed) ? parsed : parsed.visualDirections ?? [];

  await delay(1500);
  return mockVisualDirections;
}
