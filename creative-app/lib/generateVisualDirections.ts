import Anthropic from "@anthropic-ai/sdk";
import type { UserInputs, CopyOption, VisualDirection } from "./types";
import { beoltoonBrand } from "../prompts/brand/beoltoon";
import { buildVisualSystemPrompt } from "../prompts/system/visualSystemPrompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateVisualDirections(
  inputs: UserInputs,
  selectedCopy: CopyOption
): Promise<VisualDirection[]> {
  const systemPrompt = buildVisualSystemPrompt(beoltoonBrand, inputs, selectedCopy);

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system: systemPrompt,
    messages: [{ role: "user", content: "비주얼 방향을 제안해주세요." }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude가 텍스트 응답을 반환하지 않았습니다.");
  }

  const raw = textBlock.text.trim();
  const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  const parsed = JSON.parse(jsonStr);
  const directions: VisualDirection[] = Array.isArray(parsed)
    ? parsed
    : parsed.visualDirections ?? [];

  if (!Array.isArray(directions) || directions.length === 0) {
    throw new Error("비주얼 방향 생성 결과가 비어 있습니다.");
  }

  return directions;
}
