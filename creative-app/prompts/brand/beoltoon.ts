export const beoltoonBrand = {
  name: "벌툰",
  nameEn: "Beoltoon",
  category: "manhwa_cafe",
  concept: "만화카페 / 웹툰 카페",
  targetAudience: ["20대 초중반", "대학생", "직장인", "커플", "혼자 힐링을 원하는 사람"],
  brandVoice: "따뜻하고 편안하며, 나만의 시간을 소중히 여기는 감성",
  brandColors: {
    primary: "#FFD700",
    secondary: "#111111",
    accent: "#FFF3B0",
  },
  brandKeywords: ["힐링", "나만의 공간", "만화", "웹툰", "편안함", "혼자만의 시간", "데이트", "이스케이프"],
  avoidKeywords: ["럭셔리", "파티", "화려함", "클럽", "네온"],
  spaceDescription: "아늑한 독립 좌석, 따뜻한 조명, 만화책과 태블릿이 가득한 공간",
  copyToneGuides: {
    instagram_branding: "감성적이고 공감 중심. 직접적 판매보다 감정과 상황에 집중",
    instagram_ad: "CTA 포함. 혜택과 액션을 명확히. 그래도 과하지 않게",
    story_ad: "임팩트 있는 한 줄. 스크롤을 멈추게 하는 훅",
    event_banner: "이벤트 내용 명확히. 날짜/혜택/CTA 포함",
    season_promo: "계절감과 감성 결합. 시즌 특유의 분위기 강조",
    healing_solo: "혼자만의 시간 강조. 위로와 공감의 감성",
    date_content: "설레임과 특별함. 커플 감성",
    exam_afterwork: "공감과 위로. 수고했다는 감성. 보상 심리 자극",
  },
} as const;

export type BeoltoonBrand = typeof beoltoonBrand;
