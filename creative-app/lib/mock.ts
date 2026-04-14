import type { CopyOption, VisualDirection, ImagePromptResult } from "./types";

export const mockCopies: CopyOption[] = [
  {
    id: "copy-001",
    text: "만화 속으로 사라지는 시간, 벌툰에서",
    subtext: "오늘 하루의 피로를 잊게 해줄 나만의 공간이 기다리고 있어요.",
    tone: "감성적 · 몽환적",
    targetEmotion: "일상 탈출 욕구",
  },
  {
    id: "copy-002",
    text: "오늘 하루도 수고했어. 이제 네 시간이야",
    subtext: "아무것도 신경 쓰지 않아도 되는 시간. 벌툰에서 충전하세요.",
    tone: "따뜻한 위로",
    targetEmotion: "위로 · 보상 심리",
  },
  {
    id: "copy-003",
    text: "읽고 싶었던 만화, 다 여기 있어",
    subtext: "수천 권의 만화책과 웹툰이 한 공간에. 마음껏 빠져드세요.",
    tone: "직접적 · 설레는",
    targetEmotion: "기대감 · 설렘",
  },
  {
    id: "copy-004",
    text: "혼자여도 괜찮아, 오히려 더 좋아",
    subtext: "온전히 나에게 집중할 수 있는 공간, 벌툰의 아늑한 독립 좌석.",
    tone: "공감 · 위로",
    targetEmotion: "솔로 힐링 공감",
  },
  {
    id: "copy-005",
    text: "세상에서 가장 편한 자리",
    subtext: "따뜻한 조명 아래, 좋아하는 만화와 함께하는 완벽한 쉼.",
    tone: "포근 · 감성적",
    targetEmotion: "편안함 · 안락함",
  },
  {
    id: "copy-006",
    text: "잠깐, 여기서 숨 좀 쉬고 가",
    subtext: "바쁜 일상 속 나를 위한 작은 사치. 벌툰에서 진짜 쉬어가세요.",
    tone: "친근한 · 가볍게 위로",
    targetEmotion: "일시적 탈출 욕구",
  },
  {
    id: "copy-007",
    text: "좋아하는 것들로 가득 찬 공간",
    subtext: "만화, 웹툰, 그리고 나. 이 순간만큼은 내가 주인공.",
    tone: "설레는 · 자기중심적",
    targetEmotion: "자기 보상 · 즐거움",
  },
  {
    id: "copy-008",
    text: "방해받지 않을 권리",
    subtext: "조용히 혼자만의 시간을 즐길 수 있는 독립 공간, 벌툰.",
    tone: "단호한 · 자유로운",
    targetEmotion: "프라이버시 · 독립성",
  },
  {
    id: "copy-009",
    text: "네가 좋아하는 만화, 벌툰이 다 갖고 있어",
    subtext: "장르 불문, 취향 불문. 당신의 취향에 딱 맞는 작품이 기다려요.",
    tone: "친근한 · 자신감 있는",
    targetEmotion: "기대감 · 신뢰",
  },
  {
    id: "copy-010",
    text: "오늘만큼은 만화 주인공이 되어봐",
    subtext: "현실을 잊고 이야기 속으로. 벌툰에서 특별한 하루를 만드세요.",
    tone: "유쾌한 · 환상적",
    targetEmotion: "현실 탈출 · 즐거움",
  },
];

export const mockVisualDirections: VisualDirection[] = [
  {
    id: "visual-001",
    conceptName: "아늑한 황금빛 공간",
    overallMood: "따뜻하고 몽환적인 감성. 황금빛 빛과 어둠이 대비되는 분위기.",
    imageComposition: "인물이 왼쪽 하단 1/3 지점에 위치하고, 배경의 만화책들이 보케 효과로 흐릿하게 펼쳐지는 구도.",
    elements: {
      people: "혼자 앉아 만화를 읽는 20대 여성. 편안한 표정, 따뜻한 니트 착용.",
      space: "아늑한 독립 좌석. 나무 테이블, 부드러운 쿠션. 따뜻한 간접 조명.",
      props: "펼쳐진 만화책, 따뜻한 음료 (카페라테), 포근한 담요 한 귀퉁이.",
    },
    layout: "세로형. 인물 중심 + 배경 텍스트 영역 분리.",
    colorPalette: "황금빛 (#FFD700), 짙은 갈색 (#2D1B00), 크림 화이트 (#FFF8E7)",
    lighting: "따뜻한 황금빛 간접 조명. 창문으로 들어오는 부드러운 역광.",
    textPlacement: "상단 20% 영역에 브랜드 카피. 하단 10%에 브랜드 로고.",
    recommendedRatio: "4:5",
    whyItWorks:
      "황금빛 조명이 브랜드 컬러와 자연스럽게 연결되며, 혼자 읽는 감성이 '혼자 힐링' 타겟의 공감을 끌어냄.",
  },
  {
    id: "visual-002",
    conceptName: "도심 속 만화 세계",
    overallMood: "모던하고 감각적인 도시 감성. 현실과 만화 세계의 경계 모호화.",
    imageComposition: "플랫레이 구도. 위에서 내려다보는 시점. 책과 소품들이 퍼즐처럼 배치.",
    elements: {
      people: "인물 없음. 소품과 공간 중심.",
      space: "정돈된 나무 테이블. 깔끔하고 미니멀한 배경.",
      props: "여러 권의 만화책, 귀여운 굿즈 피규어, 따뜻한 음료 컵, 벌툰 로고 스티커.",
    },
    layout: "정방형. 균형 잡힌 대칭 구도.",
    colorPalette: "진한 노랑 (#FFD700), 블랙 (#111111), 화이트 (#FFFFFF)",
    lighting: "자연광 또는 소프트 스튜디오 조명. 그림자 최소화.",
    textPlacement: "중앙 하단 또는 좌측 정렬 텍스트.",
    recommendedRatio: "1:1",
    whyItWorks:
      "인물 없는 소품 중심 구도는 보는 사람이 직접 자신을 투영하게 만들며, 깔끔한 레이아웃이 피드 통일감을 줌.",
  },
  {
    id: "visual-003",
    conceptName: "커플의 달콤한 만화 데이트",
    overallMood: "설레고 따뜻한 커플 감성. 같은 만화를 함께 읽는 특별한 시간.",
    imageComposition: "두 사람이 나란히 앉은 측면 샷. 두 사람 사이로 열린 만화책이 보이는 구도.",
    elements: {
      people: "20대 커플. 서로 기대거나 만화를 함께 가리키는 자연스러운 모습.",
      space: "두 명이 앉을 수 있는 넉넉한 공간. 포근한 소파 좌석.",
      props: "함께 읽는 만화책, 각자의 음료, 작은 간식.",
    },
    layout: "가로형 또는 4:5. 두 인물이 화면 2/3를 차지.",
    colorPalette: "따뜻한 피치 (#FFBF8C), 소프트 옐로 (#FFF3B0), 다크 브라운 (#3D2000)",
    lighting: "따뜻하고 부드러운 조명. 로맨틱한 분위기의 낮은 조도.",
    textPlacement: "상단 여백에 카피 배치. 브랜드는 하단 우측.",
    recommendedRatio: "4:5",
    whyItWorks:
      "커플의 자연스러운 공감대 형성 장면이 '데이트 장소'로서의 벌툰을 직관적으로 전달. 설렘 감정 자극.",
  },
  {
    id: "visual-004",
    conceptName: "시험 끝 해방감",
    overallMood: "해방감과 홀가분함. 고생 끝의 달콤한 보상 감성.",
    imageComposition: "인물이 자리에 기대어 만화책을 들고 있는 편안한 자세. 책가방이 바닥에 던져져 있는 디테일.",
    elements: {
      people: "20대 학생 또는 직장인. 넥타이 느슨하게 풀거나 교복/캐주얼 착용.",
      space: "편안한 좌석. 창밖으로 저녁 노을 또는 야경.",
      props: "책가방, 교재 또는 노트북, 읽고 있는 만화책, 아이스 아메리카노.",
    },
    layout: "세로형. 인물 전신 또는 상반신 + 공간 디테일.",
    colorPalette: "저녁 오렌지 (#FF8C42), 딥 퍼플 (#2D1B4E), 노랑 (#FFD700)",
    lighting: "저녁 햇살 또는 인공 조명. 대비가 있는 드라마틱한 조명.",
    textPlacement: "상단 또는 하단 텍스트 바. 강렬한 폰트.",
    recommendedRatio: "9:16",
    whyItWorks:
      "시험·퇴근 후 타겟의 감정을 직접적으로 반영. '나도 저렇게 쉬고 싶다'는 욕구를 자극하는 강한 감정이입 유도.",
  },
];

export const mockImagePromptResult: ImagePromptResult = {
  mainPrompt:
    "A cozy manhwa cafe interior in Seoul, warm golden ambient lighting, young Korean woman in her 20s sitting alone reading a manga book, comfortable private booth seating with soft cushions, wooden table with a warm latte cup, bookshelves filled with colorful comics in soft bokeh background, cinematic photography, shallow depth of field, warm color grading, film grain, editorial lifestyle photography style, 35mm lens aesthetic",
  negativePrompt:
    "ugly, blurry, low quality, distorted face, extra limbs, bad anatomy, watermark, text overlay, oversaturated, neon lights, nightclub, party atmosphere, crowded, noisy, harsh lighting, cold colors, blue tones",
  recommendedSize: "1080x1350",
  recommendedLayout: "Portrait 4:5 – 인물이 하단 1/3에 위치하고 상단 공간에 텍스트 카피 삽입",
  colorPalette: ["#FFD700", "#2D1B00", "#FFF8E7", "#C9A227", "#111111"],
  textPlacementGuide:
    "상단 25% 영역에 메인 카피 배치 (흰색 또는 크림 계열 텍스트). 하단 8% 영역에 브랜드 로고와 서브 정보. 텍스트 뒤 반투명 다크 그라디언트 오버레이 적용 권장.",
  postEditingTips:
    "1. 전체적인 색온도를 약간 따뜻하게 (+15~20) 조정\n2. 하이라이트를 노란 계열로 쉬프트\n3. 섀도우에 약간의 브라운 톤 추가\n4. Lightroom 'Warm Vintage' 프리셋 또는 유사 필터 적용\n5. 비네팅 효과로 중앙 집중감 강화\n6. 텍스트 삽입 시 Pretendard ExtraBold 또는 Noto Sans KR Black 사용 권장",
  platformVariants: {
    instagram_feed:
      "A cozy manhwa cafe interior, warm golden lighting, Korean woman reading manga in a private booth, soft bokeh bookshelves background, lifestyle editorial photography, 4:5 portrait format, warm film grain aesthetic, shallow depth of field, cinematic color grading",
    instagram_story:
      "Cozy manhwa cafe private reading booth, warm golden ambient light, single person relaxing with comic books, vertical format 9:16, intimate close-up composition, warm color palette with yellow accents, soft focus background, Korean lifestyle photography",
    facebook_ad:
      "Bright inviting manhwa cafe interior in Seoul, young adults enjoying comic books in comfortable private seating, warm welcoming atmosphere, golden hour lighting, editorial lifestyle photography, wide angle to show the full cozy space, vibrant but warm color palette",
  },
};
