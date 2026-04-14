import Anthropic from "@anthropic-ai/sdk";
import type { UserInputs, CopyOption, VisualDirection, ImagePromptResult } from "./types";
import { beoltoonBrand } from "../prompts/brand/beoltoon";
import { buildImagePromptSystem } from "../prompts/system/imagePromptSystem";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ============================================================
// IMAGE PROVIDER ABSTRACTION INTERFACE
// ============================================================

export interface ImageProvider {
  name: string;
  generate(prompt: string, negativePrompt: string, size: string): Promise<string>;
}

// ============================================================
// BUILD IMAGE PROMPT via Claude
// ============================================================

export async function buildImagePrompt(
  inputs: UserInputs,
  selectedCopy: CopyOption,
  selectedVisual: VisualDirection
): Promise<ImagePromptResult> {
  const systemPrompt = buildImagePromptSystem(beoltoonBrand, inputs, selectedCopy, selectedVisual);

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system: systemPrompt,
    messages: [{ role: "user", content: "이미지 생성 프롬프트를 작성해주세요." }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude가 텍스트 응답을 반환하지 않았습니다.");
  }

  const raw = textBlock.text.trim();
  const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  const result: ImagePromptResult = JSON.parse(jsonStr);
  return result;
}

// ============================================================
// GENERATE IMAGE (provider abstraction — connect external API)
// ============================================================

export async function generateImage(
  promptResult: ImagePromptResult,
  provider?: ImageProvider
): Promise<string | null> {
  if (!provider) {
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
