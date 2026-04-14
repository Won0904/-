"use client";

import { useState } from "react";
import type { AppState, ContentType, UserInputs, CopyOption, VisualDirection } from "@/lib/types";
import StepIndicator from "@/components/StepIndicator";
import SummaryBar from "@/components/SummaryBar";
import ContentTypeSelector from "@/components/ContentTypeSelector";
import InputForm from "@/components/InputForm";
import CopyCard from "@/components/CopyCard";
import VisualOptionCard from "@/components/VisualOptionCard";
import PromptResult from "@/components/PromptResult";

const initialState: AppState = {
  step: 1,
  selectedContentType: null,
  userInputs: null,
  copies: [],
  selectedCopy: null,
  visualDirections: [],
  selectedVisual: null,
  promptResult: null,
  generatedImageUrl: null,
  isLoading: false,
  error: null,
};

export default function HomePage() {
  const [state, setState] = useState<AppState>(initialState);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  function updateState(partial: Partial<AppState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  // Step 1 → 2: Select content type
  function handleContentTypeSelect(contentType: ContentType) {
    updateState({ selectedContentType: contentType });
    // Auto-advance to step 2
    setTimeout(() => updateState({ step: 2 }), 150);
  }

  // Step 2 → 3: Submit inputs, generate copies
  async function handleInputsSubmit(inputs: UserInputs) {
    updateState({ userInputs: inputs, isLoading: true, error: null, step: 3 });
    try {
      const res = await fetch("/api/generate-copies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "카피 생성 실패");
      updateState({ copies: data.copies, isLoading: false });
    } catch (err) {
      updateState({ error: String(err), isLoading: false });
    }
  }

  // Step 3 → 4: Select copy, generate visual directions
  async function handleCopySelect(copy: CopyOption) {
    updateState({ selectedCopy: copy, isLoading: true, error: null, step: 4 });
    try {
      const res = await fetch("/api/generate-visuals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: state.userInputs, selectedCopy: copy }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "비주얼 방향 생성 실패");
      updateState({ visualDirections: data.visualDirections, isLoading: false });
    } catch (err) {
      updateState({ error: String(err), isLoading: false });
    }
  }

  // Step 4 → 5: Select visual, generate prompt
  async function handleVisualSelect(visual: VisualDirection) {
    updateState({ selectedVisual: visual, isLoading: true, error: null, step: 5 });
    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputs: state.userInputs,
          selectedCopy: state.selectedCopy,
          selectedVisual: visual,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "프롬프트 생성 실패");
      updateState({ promptResult: data.promptResult, isLoading: false });
    } catch (err) {
      updateState({ error: String(err), isLoading: false });
    }
  }

  // Image generation (placeholder — connect real provider)
  async function handleGenerateImage() {
    if (!state.promptResult) return;
    setIsGeneratingImage(true);
    // TODO: Connect image provider
    // const imageUrl = await generateImage(state.promptResult, openaiProvider);
    // updateState({ generatedImageUrl: imageUrl });
    setTimeout(() => {
      alert("이미지 생성 API 연결이 필요합니다.\n.env에 API 키를 설정하고 lib/buildImagePrompt.ts의 provider를 활성화하세요.");
      setIsGeneratingImage(false);
    }, 800);
  }

  // Back navigation
  function handleBack() {
    if (state.step === 2) updateState({ step: 1 });
    else if (state.step === 3) updateState({ step: 2, copies: [], selectedCopy: null });
    else if (state.step === 4) updateState({ step: 3, visualDirections: [], selectedVisual: null });
    else if (state.step === 5) updateState({ step: 4, promptResult: null, generatedImageUrl: null });
  }

  // Step click navigation (only for completed steps)
  function handleStepClick(step: typeof state.step) {
    if (step < state.step) {
      updateState({ step });
    }
  }

  // Reset all
  function handleReset() {
    setState(initialState);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-yellow-400 rounded-md flex items-center justify-center text-sm font-black text-black">
              벌
            </div>
            <div>
              <span className="text-white font-bold text-sm">벌툰 크리에이티브</span>
              <span className="text-gray-600 text-xs ml-2">마케팅 이미지 생성 도구</span>
            </div>
          </div>
          {state.step > 1 && (
            <button
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              처음으로
            </button>
          )}
        </div>
        <StepIndicator currentStep={state.step} onStepClick={handleStepClick} />
      </header>

      {/* Summary Bar */}
      <SummaryBar
        step={state.step}
        contentType={state.selectedContentType}
        selectedCopy={state.selectedCopy}
        selectedVisual={state.selectedVisual}
      />

      {/* Main Content */}
      <main className="flex-1 pb-16">
        {/* Error Banner */}
        {state.error && (
          <div className="max-w-3xl mx-auto px-4 pt-4">
            <div className="bg-red-950/50 border border-red-900 rounded-xl p-4 text-sm text-red-400">
              {state.error}
              <button
                onClick={() => updateState({ error: null })}
                className="ml-3 underline hover:no-underline"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {state.isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-white font-semibold mb-1">
                {state.step === 3 && "카피 문구 생성 중..."}
                {state.step === 4 && "비주얼 방향 분석 중..."}
                {state.step === 5 && "이미지 생성 프롬프트 작성 중..."}
              </p>
              <p className="text-gray-500 text-sm">Claude가 깊이 생각하는 중이에요 — 약 20~40초 소요</p>
            </div>
          </div>
        ) : (
          <>
            {/* Step 1: Content Type Selection */}
            {state.step === 1 && (
              <ContentTypeSelector
                onSelect={handleContentTypeSelect}
                selected={state.selectedContentType}
              />
            )}

            {/* Step 2: Input Form */}
            {state.step === 2 && state.selectedContentType && (
              <InputForm
                contentType={state.selectedContentType}
                onSubmit={handleInputsSubmit}
                onBack={handleBack}
              />
            )}

            {/* Step 3: Copy Selection */}
            {state.step === 3 && state.copies.length > 0 && (
              <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">카피 문구 선택</h2>
                    <p className="text-gray-400 text-sm">
                      {state.copies.length}개의 카피 중 하나를 선택하세요
                    </p>
                  </div>
                  <button
                    onClick={handleBack}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors mt-1"
                  >
                    ← 이전
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {state.copies.map((copy) => (
                    <CopyCard
                      key={copy.id}
                      copy={copy}
                      onSelect={handleCopySelect}
                      isSelected={state.selectedCopy?.id === copy.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Visual Direction Selection */}
            {state.step === 4 && state.visualDirections.length > 0 && (
              <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">비주얼 방향 선택</h2>
                    <p className="text-gray-400 text-sm">
                      선택한 카피와 맞는 비주얼 방향 {state.visualDirections.length}가지 중 하나를 고르세요
                    </p>
                  </div>
                  <button
                    onClick={handleBack}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors mt-1"
                  >
                    ← 이전
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {state.visualDirections.map((visual) => (
                    <VisualOptionCard
                      key={visual.id}
                      visual={visual}
                      onSelect={handleVisualSelect}
                      isSelected={state.selectedVisual?.id === visual.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Result */}
            {state.step === 5 && state.promptResult && (
              <PromptResult
                promptResult={state.promptResult}
                generatedImageUrl={state.generatedImageUrl}
                isGeneratingImage={isGeneratingImage}
                onGenerateImage={handleGenerateImage}
                onBack={handleBack}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
