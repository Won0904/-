"use client";

import type { CopyOption, VisualDirection, ContentType, Step } from "@/lib/types";

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  instagram_branding: "인스타 브랜딩",
  instagram_ad: "인스타 광고",
  story_ad: "스토리 광고",
  event_banner: "이벤트 배너",
  season_promo: "시즌 프로모션",
  healing_solo: "혼자 힐링",
  date_content: "데이트 콘텐츠",
  exam_afterwork: "시험·퇴근 후",
};

interface SummaryBarProps {
  step: Step;
  contentType: ContentType | null;
  selectedCopy: CopyOption | null;
  selectedVisual: VisualDirection | null;
}

export default function SummaryBar({ step, contentType, selectedCopy, selectedVisual }: SummaryBarProps) {
  if (step < 3) return null;

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-4 py-2.5">
      <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {contentType && (
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">유형</span>
            <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
              {CONTENT_TYPE_LABELS[contentType]}
            </span>
          </div>
        )}

        {selectedCopy && step >= 4 && (
          <>
            <span className="text-gray-700">›</span>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-gray-500 flex-shrink-0">카피</span>
              <span className="bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded truncate max-w-[180px] sm:max-w-xs">
                {selectedCopy.text}
              </span>
            </div>
          </>
        )}

        {selectedVisual && step >= 5 && (
          <>
            <span className="text-gray-700">›</span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 flex-shrink-0">비주얼</span>
              <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                {selectedVisual.conceptName}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
