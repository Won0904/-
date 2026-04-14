import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "벌툰 크리에이티브 | 마케팅 이미지 생성 도구",
  description: "카피 선택 → 비주얼 선택 → 이미지 생성 프롬프트 자동 작성",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-950 text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
