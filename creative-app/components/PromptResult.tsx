"use client";

import { useState } from "react";
import type { ImagePromptResult } from "@/lib/types";

interface PromptResultProps {
  promptResult: ImagePromptResult;
  generatedImageUrl: string | null;
  isGeneratingImage: boolean;
  onGenerateImage: () => void;
  onBack: () => void;
  onReset: () => void;
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={[
        "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200",
        copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600",
      ].join(" ")}
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          복사됨
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label || "복사"}
        </>
      )}
    </button>
  );
}

function PromptBlock({
  title,
  content,
  isNegative = false,
}: {
  title: string;
  content: string;
  isNegative?: boolean;
}) {
  return (
    <div className={["rounded-xl border p-4", isNegative ? "border-red-900/50 bg-red-950/20" : "border-gray-700 bg-gray-900"].join(" ")}>
      <div className="flex items-center justify-between mb-2">
        <span className={["text-xs font-semibold uppercase tracking-wide", isNegative ? "text-red-400" : "text-gray-400"].join(" ")}>
          {title}
        </span>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-gray-300 leading-relaxed font-mono">{content}</p>
    </div>
  );
}

export default function PromptResult({
  promptResult,
  generatedImageUrl,
  isGeneratingImage,
  onGenerateImage,
  onBack,
  onReset,
}: PromptResultProps) {
  const [activeTab, setActiveTab] = useState<"prompt" | "image">("prompt");
  const [activePlatform, setActivePlatform] = useState<"instagram_feed" | "instagram_story" | "facebook_ad">("instagram_feed");

  const platformLabels = {
    instagram_feed: "인스타 피드",
    instagram_story: "인스타 스토리",
    facebook_ad: "페이스북 광고",
  };

  const fullPromptText = [
    `[메인 프롬프트]\n${promptResult.mainPrompt}`,
    `\n[네거티브 프롬프트]\n${promptResult.negativePrompt}`,
    `\n[권장 사이즈] ${promptResult.recommendedSize}`,
    `\n[레이아웃] ${promptResult.recommendedLayout}`,
    `\n[텍스트 배치] ${promptResult.textPlacementGuide}`,
    `\n[후편집 팁]\n${promptResult.postEditingTips}`,
  ].join("\n");

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">결과 확인</h2>
        <p className="text-gray-400 text-sm">이미지를 생성하거나, 외부 AI에 넣을 프롬프트를 복사하세요.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-900 border border-gray-800 rounded-xl p-1">
        {(["prompt", "image"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
              activeTab === tab
                ? "bg-yellow-400 text-black"
                : "text-gray-400 hover:text-white",
            ].join(" ")}
          >
            {tab === "prompt" ? "📋 프롬프트 복사" : "🎨 이미지 생성"}
          </button>
        ))}
      </div>

      {/* Prompt Tab */}
      {activeTab === "prompt" && (
        <div className="space-y-4">
          {/* Meta info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-3">
              <span className="text-xs text-gray-500 block mb-1">권장 사이즈</span>
              <span className="text-sm font-bold text-white">{promptResult.recommendedSize}</span>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-3">
              <span className="text-xs text-gray-500 block mb-1">레이아웃</span>
              <span className="text-xs font-medium text-gray-300 leading-tight block">{promptResult.recommendedLayout.split("–")[0].trim()}</span>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 col-span-2 sm:col-span-1">
              <span className="text-xs text-gray-500 block mb-1">색상 팔레트</span>
              <div className="flex gap-1.5 flex-wrap">
                {promptResult.colorPalette.map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded border border-gray-700"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Prompt */}
          <PromptBlock title="메인 프롬프트" content={promptResult.mainPrompt} />

          {/* Negative Prompt */}
          <PromptBlock title="네거티브 프롬프트" content={promptResult.negativePrompt} isNegative />

          {/* Text Placement */}
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">텍스트 배치 가이드</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{promptResult.textPlacementGuide}</p>
          </div>

          {/* Post Editing Tips */}
          <div className="rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-400 block mb-2">후편집 팁</span>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{promptResult.postEditingTips}</p>
          </div>

          {/* Platform Variants */}
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">플랫폼별 프롬프트</span>
            </div>
            <div className="flex gap-1.5 mb-3 flex-wrap">
              {(Object.keys(platformLabels) as Array<keyof typeof platformLabels>).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={[
                    "text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                    activePlatform === platform
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800 text-gray-400 border border-gray-700 hover:text-white",
                  ].join(" ")}
                >
                  {platformLabels[platform]}
                </button>
              ))}
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm text-gray-300 font-mono leading-relaxed flex-1">
                  {promptResult.platformVariants[activePlatform]}
                </p>
                <CopyButton text={promptResult.platformVariants[activePlatform]} label="복사" />
              </div>
            </div>
          </div>

          {/* Full Copy Button */}
          <div className="flex gap-3">
            <div className="flex-1">
              <CopyButton text={fullPromptText} label="전체 프롬프트 복사" />
            </div>
          </div>
        </div>
      )}

      {/* Image Tab */}
      {activeTab === "image" && (
        <div className="space-y-4">
          {generatedImageUrl ? (
            <div className="rounded-xl border border-gray-700 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={generatedImageUrl} alt="Generated creative" className="w-full" />
              <div className="p-3 flex justify-end">
                <a
                  href={generatedImageUrl}
                  download="beoltoon-creative.png"
                  className="text-xs bg-yellow-400 text-black px-3 py-1.5 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  다운로드
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900 p-10 text-center">
              <div className="text-4xl mb-3">🖼️</div>
              <h3 className="text-white font-semibold mb-2">이미지 자동 생성</h3>
              <p className="text-gray-500 text-sm mb-4 max-w-sm mx-auto leading-relaxed">
                이미지 생성 API(OpenAI DALL-E, Recraft 등)를 연결하면 선택한 프롬프트로 이미지를 자동 생성합니다.
              </p>

              <button
                onClick={onGenerateImage}
                disabled={isGeneratingImage}
                className="bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-xl hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {isGeneratingImage ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    생성 중...
                  </span>
                ) : (
                  "이미지 생성하기"
                )}
              </button>

              <p className="text-xs text-gray-600 mt-3">
                ※ .env에 OPENAI_API_KEY 또는 RECRAFT_API_KEY 설정 필요
              </p>
            </div>
          )}

          {/* Provider info */}
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <span className="text-xs font-semibold text-gray-400 block mb-3">지원 예정 이미지 생성 AI</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["OpenAI DALL-E 3", "Recraft v3", "Leonardo AI", "Midjourney"].map((provider) => (
                <div
                  key={provider}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 text-center"
                >
                  {provider}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center">
            현재는 프롬프트 복사 탭에서 생성된 프롬프트를 직접 붙여넣기 하세요
          </p>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-gray-800">
        <button
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-medium hover:border-gray-500 hover:text-white transition-colors"
        >
          비주얼 다시 선택
        </button>
        <button
          onClick={onReset}
          className="ml-auto px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          처음부터 다시
        </button>
      </div>
    </div>
  );
}
