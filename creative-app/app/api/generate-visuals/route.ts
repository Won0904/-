import { NextRequest, NextResponse } from "next/server";
import { generateVisualDirections } from "@/lib/generateVisualDirections";
import type { UserInputs, CopyOption } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inputs: UserInputs = body.inputs;
    const selectedCopy: CopyOption = body.selectedCopy;

    if (!inputs || !selectedCopy) {
      return NextResponse.json(
        { error: "inputs and selectedCopy are required" },
        { status: 400 }
      );
    }

    const visualDirections = await generateVisualDirections(inputs, selectedCopy);
    return NextResponse.json({ visualDirections });
  } catch (error) {
    console.error("[API /generate-visuals]", error);
    return NextResponse.json(
      { error: "비주얼 방향 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
