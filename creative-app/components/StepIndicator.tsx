"use client";

import type { Step } from "@/lib/types";

const STEPS: { label: string; short: string }[] = [
  { label: "콘텐츠 유형", short: "유형" },
  { label: "상세 설정", short: "설정" },
  { label: "카피 선택", short: "카피" },
  { label: "비주얼 선택", short: "비주얼" },
  { label: "결과 확인", short: "결과" },
];

interface StepIndicatorProps {
  currentStep: Step;
  onStepClick?: (step: Step) => void;
}

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const stepNum = (index + 1) as Step;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            const isFuture = stepNum > currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => isClickable && onStepClick(stepNum)}
                    disabled={isFuture || !isClickable}
                    className={[
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200",
                      isCompleted
                        ? "bg-yellow-400 text-black cursor-pointer hover:bg-yellow-300"
                        : isCurrent
                        ? "bg-yellow-400 text-black ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-950"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed",
                    ].join(" ")}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </button>
                  <span
                    className={[
                      "text-xs font-medium hidden sm:block",
                      isCurrent ? "text-yellow-400" : isCompleted ? "text-gray-300" : "text-gray-600",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                  <span
                    className={[
                      "text-xs font-medium sm:hidden",
                      isCurrent ? "text-yellow-400" : isCompleted ? "text-gray-300" : "text-gray-600",
                    ].join(" ")}
                  >
                    {step.short}
                  </span>
                </div>

                {index < STEPS.length - 1 && (
                  <div
                    className={[
                      "flex-1 h-0.5 mx-2 transition-all duration-300",
                      isCompleted ? "bg-yellow-400" : "bg-gray-800",
                    ].join(" ")}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
