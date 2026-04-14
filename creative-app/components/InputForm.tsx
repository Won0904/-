"use client";

import { useState } from "react";
import type { ContentType, UserInputs } from "@/lib/types";

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

const DEFAULT_VALUES: Record<ContentType, Partial<UserInputs>> = {
  instagram_branding: {
    target: "20대 대학생, 직장인",
    situation: "평범한 일상에서 나만의 공간을 찾고 싶은 순간",
    channel: "인스타그램 피드",
    brandTone: "따뜻하고 감성적, 공감 중심",
    emphasis: "아늑한 공간과 나만의 시간",
  },
  instagram_ad: {
    target: "20~30대 직장인, 대학생",
    situation: "주말 또는 퇴근 후 시간을 어떻게 보낼지 고민하는 순간",
    channel: "인스타그램 피드 광고",
    brandTone: "친근하고 직접적, CTA 포함",
    emphasis: "첫 방문 혜택, 편안한 공간, 다양한 만화",
  },
  story_ad: {
    target: "10~20대 만화·웹툰 팬",
    situation: "스토리 스크롤 중 관심 있는 콘텐츠 탐색",
    channel: "인스타그램 스토리 광고",
    brandTone: "임팩트 있고 간결한",
    emphasis: "즉각적인 행동 유도 (스와이프업)",
  },
  event_banner: {
    target: "기존 고객 및 신규 고객",
    situation: "시즌 이벤트 또는 프로모션 기간",
    channel: "인스타그램 피드/스토리",
    brandTone: "명확하고 혜택 중심",
    emphasis: "이벤트 기간, 할인 혜택, 참여 방법",
  },
  season_promo: {
    target: "20대 감성 소비자",
    situation: "계절 변화를 느끼는 특정 시즌",
    channel: "인스타그램 피드",
    brandTone: "감성적이고 계절감이 뚜렷한",
    emphasis: "시즌 분위기와 특별한 경험",
  },
  healing_solo: {
    target: "혼자 시간을 보내고 싶은 20~30대",
    situation: "혼자만의 시간이 필요한 주말 오후",
    channel: "인스타그램 피드",
    brandTone: "따뜻한 위로, 공감 중심",
    emphasis: "나만의 독립 공간, 아무도 방해하지 않는 시간",
  },
  date_content: {
    target: "20대 커플",
    situation: "데이트 장소를 찾고 있는 주말",
    channel: "인스타그램 피드",
    brandTone: "설레고 로맨틱, 따뜻한",
    emphasis: "함께하는 특별한 경험, 만화로 나누는 이야기",
  },
  exam_afterwork: {
    target: "시험 끝난 대학생, 퇴근한 직장인",
    situation: "시험이 끝난 직후 또는 힘든 하루를 마친 저녁",
    channel: "인스타그램 피드/스토리",
    brandTone: "공감과 위로, 보상 심리 자극",
    emphasis: "수고한 나를 위한 보상, 완전한 휴식",
  },
};

interface InputFormProps {
  contentType: ContentType;
  onSubmit: (inputs: UserInputs) => void;
  onBack: () => void;
}

export default function InputForm({ contentType, onSubmit, onBack }: InputFormProps) {
  const defaults = DEFAULT_VALUES[contentType];

  const [formData, setFormData] = useState({
    target: defaults.target ?? "",
    situation: defaults.situation ?? "",
    channel: defaults.channel ?? "",
    brandTone: defaults.brandTone ?? "",
    emphasis: defaults.emphasis ?? "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputs: UserInputs = { contentType, ...formData };
    onSubmit(inputs);
  };

  const fields: { key: keyof typeof formData; label: string; placeholder: string; hint: string }[] = [
    {
      key: "target",
      label: "타겟",
      placeholder: "예: 20대 대학생, 직장인",
      hint: "콘텐츠를 보게 될 주요 대상",
    },
    {
      key: "situation",
      label: "상황",
      placeholder: "예: 평범한 일상에서 나만의 공간을 찾는 순간",
      hint: "타겟이 이 콘텐츠를 접하는 맥락이나 감정 상태",
    },
    {
      key: "channel",
      label: "채널",
      placeholder: "예: 인스타그램 피드, 스토리 광고",
      hint: "콘텐츠가 게재될 플랫폼·지면",
    },
    {
      key: "brandTone",
      label: "브랜드 톤",
      placeholder: "예: 따뜻하고 감성적, 친근하고 위트 있는",
      hint: "카피와 비주얼의 전반적인 감성 방향",
    },
    {
      key: "emphasis",
      label: "강조 포인트",
      placeholder: "예: 아늑한 독립 공간, 다양한 만화 컬렉션",
      hint: "이 콘텐츠에서 가장 부각시킬 것",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded font-medium">
            {CONTENT_TYPE_LABELS[contentType]}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">상세 설정</h2>
        <p className="text-gray-400 text-sm">카피 생성에 필요한 정보를 입력해주세요. 기본값이 미리 채워져 있어요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ key, label, placeholder, hint }) => (
          <div key={key} className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-200">
              {label}
              <span className="text-gray-500 font-normal ml-2 text-xs">{hint}</span>
            </label>
            <textarea
              rows={2}
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none transition-colors"
            />
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 text-sm font-medium hover:border-gray-500 hover:text-white transition-colors"
          >
            이전으로
          </button>
          <button
            type="submit"
            className="flex-[2] py-3 rounded-xl bg-yellow-400 text-black text-sm font-bold hover:bg-yellow-300 transition-colors"
          >
            카피 추천받기 →
          </button>
        </div>
      </form>
    </div>
  );
}
