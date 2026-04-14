import Anthropic from "@anthropic-ai/sdk";
import type { UserInputs, CopyOption } from "./types";
import { beoltoonBrand } from "../prompts/brand/beoltoon";
import { buildCopySystemPrompt } from "../prompts/system/copySystemPrompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateCopies(inputs: UserInputs): Promise<CopyOption[]> {
  const systemPrompt = buildCopySystemPrompt(beoltoonBrand, inputs);

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system: systemPrompt,
    messages: [{ role: "user", content: "지금 카피 옵션들을 생성해주세요." }],
  });

  // Extract text from response (thinking blocks come first)
  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude가 텍스트 응답을 반환하지 않았습니다.");
  }

  const raw = textBlock.text.trim();
  // Strip markdown code fences if present
  const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  const parsed = JSON.parse(jsonStr);
  const copies: CopyOption[] = Array.isArray(parsed) ? parsed : parsed.copies ?? [];

  if (!Array.isArray(copies) || copies.length === 0) {
    throw new Error("카피 생성 결과가 비어 있습니다.");
  }

  return copies;
}
