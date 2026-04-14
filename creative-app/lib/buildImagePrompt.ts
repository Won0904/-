/**
 * IMAGE PROMPT BUILDER & PROVIDER ABSTRACTION
 *
 * This module handles:
 * 1. Building structured image generation prompts from selected copy + visual direction
 * 2. Abstracting image generation across multiple AI providers
 *
 * PROVIDER INTEGRATION POINTS:
 * - OpenAI DALL-E 3: Set provider = openaiProvider
 * - Recraft v3: Set provider = recraftProvider
 * - Leonardo AI: Set provider = leonardoProvider
 * - Midjourney (via API): Set provider = midjourneyProvider
 */

import type { UserInputs, CopyOption, VisualDirection, ImagePromptResult } from "./types";
import { mockImagePromptResult } from "./mock";
import { beoltoonBrand } from "../prompts/brand/beoltoon";
import { buildImagePromptSystem } from "../prompts/system/imagePromptSystem";

// ============================================================
// IMAGE PROVIDER ABSTRACTION INTERFACE
// ============================================================

export interface ImageProvider {
  name: string;
  generate(prompt: string, negativePrompt: string, size: string): Promise<string>; // returns image URL
}

// Example provider implementations (not yet active)
// Uncomment and configure when connecting real APIs

/*
export const openaiProvider: ImageProvider = {
  name: "OpenAI DALL-E 3",
  async generate(prompt, _negativePrompt, size) {
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const [width, height] = size.split("x").map(Number);
    const dalleSize = width > height ? "1792x1024" : width < height ? "1024x1792" : "1024x1024";
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: dalleSize as "1024x1024" | "1792x1024" | "1024x1792",
      quality: "hd",
      style: "natural",
    });
    return response.data[0].url ?? "";
  },
};

export const recraftProvider: ImageProvider = {
  name: "Recraft v3",
  async generate(prompt, negativePrompt, size) {
    const [width, height] = size.split("x").map(Number);
    const response = await fetch("https://external.api.recraft.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RECRAFT_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: negativePrompt,
        width,
        height,
        style: "realistic_image",
        n: 1,
      }),
    });
    const data = await response.json();
    return data.data[0].url ?? "";
  },
};
*/

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================
// BUILD IMAGE PROMPT
// ============================================================

export async function buildImagePrompt(
  inputs: UserInputs,
  selectedCopy: CopyOption,
  selectedVisual: VisualDirection
): Promise<ImagePromptResult> {
  const useMock = process.env.USE_MOCK_DATA !== "false";

  if (useMock) {
    await delay(1800);

    const systemPrompt = buildImagePromptSystem(beoltoonBrand, inputs, selectedCopy, selectedVisual);
    console.log("[buildImagePrompt] Using mock data. System prompt length:", systemPrompt.length);

    return mockImagePromptResult;
  }

  // ============================================================
  // REAL LLM IMPLEMENTATION
  // ============================================================
  // const systemPrompt = buildImagePromptSystem(beoltoonBrand, inputs, selectedCopy, selectedVisual);
  //
  // Using OpenAI:
  // const { OpenAI } = await import("openai");
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     { role: "system", content: systemPrompt },
  //     { role: "user", content: "이미지 생성 프롬프트를 작성해주세요." }
  //   ],
  //   response_format: { type: "json_object" },
  //   temperature: 0.6,
  //   max_tokens: 4096,
  // });
  // return JSON.parse(response.choices[0].message.content ?? "{}");

  await delay(1800);
  return mockImagePromptResult;
}

// ============================================================
// GENERATE IMAGE
// ============================================================

export async function generateImage(
  promptResult: ImagePromptResult,
  provider?: ImageProvider
): Promise<string | null> {
  if (!provider) {
    // No provider configured — return null
    // Frontend will show "API 연결 필요" state
    console.log("[generateImage] No provider configured. Image generation skipped.");
    return null;
  }

  try {
    console.log(`[generateImage] Using provider: ${provider.name}`);
    const imageUrl = await provider.generate(
      promptResult.mainPrompt,
      promptResult.negativePrompt,
      promptResult.recommendedSize
    );
    return imageUrl;
  } catch (error) {
    console.error("[generateImage] Provider error:", error);
    return null;
  }
}
