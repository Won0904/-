"use client";

import type { ContentType, ContentTypeOption } from "@/lib/types";

const CONTENT_TYPES: ContentTypeOption[] = [
  {
    id: "instagram_branding",
    label: "인스타 브랜딩",
    description: "감성·분위기 중심의 브랜드 이미지 콘텐츠",
    emojiIcon: "📸",
  },
  {
    id: "instagram_ad",
    label: "인스타 광고",
    description: "CTA 포함 광고 이미지 소재",
    emojiIcon: "📣",
  },
  {
    id: "story_ad",
    label: "스토리 광고",
    description: "스크롤을 멈추는 세로형 스토리 광고",
    emojiIcon: "▶️",
  },
  {
    id: "event_banner",
    label: "이벤트 배너",
    description: "이벤트 정보와 혜택이 담긴 배너",
    emojiIcon: "🎉",
  },
  {
    id: "season_promo",
    label: "시즌 프로모션",
    description: "계절감이 담긴 시즌 한정 콘텐츠",
    emojiIcon: "🌸",
  },
  {
    id: "healing_solo",
    label: "혼자 힐링",
    description: "혼자만의 시간과 위로를 담은 감성 콘텐츠",
    emojiIcon: "🛋️",
  },
  {
    id: "date_content",
    label: "데이트 콘텐츠",
    description: "커플을 위한 설레는 데이트 장소 소개",
    emojiIcon: "💑",
  },
  {
    id: "exam_afterwork",
    label: "시험·퇴근 후",
    description: "수고한 나를 위한 보상 감성 콘텐츠",
    emojiIcon: "📚",
  },
];

interface ContentTypeSelectorProps {
  onSelect: (contentType: ContentType) => void;
  selected: ContentType | null;
}

export default function ContentTypeSelector({ onSelect, selected }: ContentTypeSelectorProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">콘텐츠 유형 선택</h2>
        <p className="text-gray-400 text-sm">만들고 싶은 마케팅 콘텐츠 유형을 선택하세요</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CONTENT_TYPES.map((type) => {
          const isSelected = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={[
                "relative p-4 rounded-xl border text-left transition-all duration-200 hover:border-yellow-400 hover:bg-gray-800 group",
                isSelected
                  ? "border-yellow-400 bg-gray-800 ring-1 ring-yellow-400"
                  : "border-gray-700 bg-gray-900",
              ].join(" ")}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="text-2xl mb-2">{type.emojiIcon}</div>
              <div className={["text-sm font-semibold mb-1", isSelected ? "text-yellow-400" : "text-white group-hover:text-yellow-400"].join(" ")}>
                {type.label}
              </div>
              <div className="text-xs text-gray-500 leading-tight">{type.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
