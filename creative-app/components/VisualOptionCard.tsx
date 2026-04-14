"use client";

import type { VisualDirection } from "@/lib/types";

interface VisualOptionCardProps {
  visual: VisualDirection;
  onSelect: (visual: VisualDirection) => void;
  isSelected?: boolean;
}

const COLOR_PALETTE_REGEX = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g;

function extractColors(colorString: string): string[] {
  const matches = colorString.match(COLOR_PALETTE_REGEX);
  return matches ? matches.slice(0, 5) : [];
}

export default function VisualOptionCard({ visual, onSelect, isSelected }: VisualOptionCardProps) {
  const colors = extractColors(visual.colorPalette);

  return (
    <div
      className={[
        "group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer",
        isSelected
          ? "border-yellow-400 bg-gray-800 ring-1 ring-yellow-400"
          : "border-gray-700 bg-gray-900 hover:border-gray-600 hover:bg-gray-800",
      ].join(" ")}
      onClick={() => onSelect(visual)}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3 pr-6">
        <div>
          <h3 className={["text-base font-bold mb-1", isSelected ? "text-yellow-400" : "text-white group-hover:text-yellow-400"].join(" ")}>
            {visual.conceptName}
          </h3>
          <span className="text-xs bg-gray-800 border border-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
            {visual.recommendedRatio}
          </span>
        </div>
      </div>

      {/* Mood */}
      <p className="text-gray-300 text-sm mb-3 leading-relaxed">{visual.overallMood}</p>

      {/* Color Palette */}
      {colors.length > 0 && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xs text-gray-500">색감</span>
          <div className="flex gap-1">
            {colors.map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-gray-700 flex-shrink-0"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="space-y-2 mb-4">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">구성</span>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{visual.imageComposition}</p>
        </div>

        {visual.elements.people !== "없음" && visual.elements.people && (
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">인물</span>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{visual.elements.people}</p>
          </div>
        )}

        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">텍스트 위치</span>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{visual.textPlacement}</p>
        </div>
      </div>

      {/* Why it works */}
      <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-3 mb-4">
        <span className="text-xs font-semibold text-yellow-400/80 block mb-1">이 카피와 잘 맞는 이유</span>
        <p className="text-xs text-gray-300 leading-relaxed">{visual.whyItWorks}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(visual);
        }}
        className={[
          "w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
          isSelected
            ? "bg-yellow-400 text-black"
            : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400",
        ].join(" ")}
      >
        {isSelected ? "선택됨 ✓" : "이 방향 선택"}
      </button>
    </div>
  );
}
