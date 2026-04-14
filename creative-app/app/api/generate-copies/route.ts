import { NextRequest, NextResponse } from "next/server";
import { generateCopies } from "@/lib/generateCopies";
import type { UserInputs } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inputs: UserInputs = body.inputs;

    if (!inputs || !inputs.contentType) {
      return NextResponse.json(
        { error: "inputs.contentType is required" },
        { status: 400 }
      );
    }

    const copies = await generateCopies(inputs);
    return NextResponse.json({ copies });
  } catch (error) {
    console.error("[API /generate-copies]", error);
    const msg = error instanceof Error ? error.message : "카피 생성 중 오류가 발생했습니다.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
