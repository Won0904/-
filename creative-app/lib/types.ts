export type ContentType =
  | "instagram_branding"
  | "instagram_ad"
  | "story_ad"
  | "event_banner"
  | "season_promo"
  | "healing_solo"
  | "date_content"
  | "exam_afterwork";

export interface ContentTypeOption {
  id: ContentType;
  label: string;
  description: string;
  emojiIcon: string;
}

export interface UserInputs {
  contentType: ContentType;
  target: string;
  situation: string;
  channel: string;
  brandTone: string;
  emphasis: string;
}

export interface CopyOption {
  id: string;
  text: string;
  subtext: string;
  tone: string;
  targetEmotion: string;
}

export interface VisualDirection {
  id: string;
  conceptName: string;
  overallMood: string;
  imageComposition: string;
  elements: {
    people: string;
    space: string;
    props: string;
  };
  layout: string;
  colorPalette: string;
  lighting: string;
  textPlacement: string;
  recommendedRatio: string;
  whyItWorks: string;
}

export interface ImagePromptResult {
  mainPrompt: string;
  negativePrompt: string;
  recommendedSize: string;
  recommendedLayout: string;
  colorPalette: string[];
  textPlacementGuide: string;
  postEditingTips: string;
  platformVariants: {
    instagram_feed: string;
    instagram_story: string;
    facebook_ad: string;
  };
}

export type Step = 1 | 2 | 3 | 4 | 5;

export interface AppState {
  step: Step;
  selectedContentType: ContentType | null;
  userInputs: UserInputs | null;
  copies: CopyOption[];
  selectedCopy: CopyOption | null;
  visualDirections: VisualDirection[];
  selectedVisual: VisualDirection | null;
  promptResult: ImagePromptResult | null;
  generatedImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}
