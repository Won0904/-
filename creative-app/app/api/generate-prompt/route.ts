import { NextRequest, NextResponse } from "next/server";
import { buildImagePrompt } from "@/lib/buildImagePrompt";
import type { UserInputs, CopyOption, VisualDirection } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inputs: UserInputs = body.inputs;
    const selectedCopy: CopyOption = body.selectedCopy;
    const selectedVisual: VisualDirection = body.selectedVisual;

    if (!inputs || !selectedCopy || !selectedVisual) {
      return NextResponse.json(
        { error: "inputs, selectedCopy, and selectedVisual are required" },
        { status: 400 }
      );
    }

    const promptResult = await buildImagePrompt(inputs, selectedCopy, selectedVisual);
    return NextResponse.json({ promptResult });
  } catch (error) {
    console.error("[API /generate-prompt]", error);
    const msg = error instanceof Error ? error.message : "프롬프트 생성 중 오류가 발생했습니다.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
