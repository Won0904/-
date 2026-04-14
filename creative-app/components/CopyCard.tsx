"use client";

import type { CopyOption } from "@/lib/types";

interface CopyCardProps {
  copy: CopyOption;
  onSelect: (copy: CopyOption) => void;
  isSelected?: boolean;
}

export default function CopyCard({ copy, onSelect, isSelected }: CopyCardProps) {
  return (
    <div
      className={[
        "group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer",
        isSelected
          ? "border-yellow-400 bg-gray-800 ring-1 ring-yellow-400"
          : "border-gray-700 bg-gray-900 hover:border-gray-600 hover:bg-gray-800",
      ].join(" ")}
      onClick={() => onSelect(copy)}
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

      <div className="mb-3">
        <p className={["text-base font-bold leading-snug mb-2", isSelected ? "text-yellow-400" : "text-white group-hover:text-yellow-400"].join(" ")}>
          "{copy.text}"
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">{copy.subtext}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="text-xs bg-gray-800 border border-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
          {copy.tone}
        </span>
        <span className="text-xs bg-yellow-400/10 border border-yellow-400/20 text-yellow-400/80 px-2 py-0.5 rounded-full">
          {copy.targetEmotion}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(copy);
        }}
        className={[
          "w-full py-2 rounded-lg text-sm font-semibold transition-all duration-200",
          isSelected
            ? "bg-yellow-400 text-black"
            : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 group-hover:border-gray-600",
        ].join(" ")}
      >
        {isSelected ? "선택됨 ✓" : "이 문구 선택"}
      </button>
    </div>
  );
}
