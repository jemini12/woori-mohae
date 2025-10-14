"use client";

import { useState } from "react";
import { FamilyPlannerChat } from "./FamilyPlannerChat";

type SupportedLanguage = "en" | "ko";

const HEADER_COPY: Record<
  SupportedLanguage,
  { title: string; description: string; toggleLabel: string }
> = {
  en: {
    title: "Plan your family's day with one conversation.",
    description:
      "Share your kids’ ages, neighbourhood, routines, and any must-haves. I’ll ask follow-up questions, then return a balanced itinerary with weather-aware backups.",
    toggleLabel: "한국어",
  },
  ko: {
    title: "대화 한 번으로 가족 하루를 계획하세요.",
    description:
      "아이 나이, 사는 지역, 루틴과 꼭 포함하고 싶은 내용을 알려 주세요. 필요한 내용을 확인한 뒤 날씨 대비 플랜까지 담은 일정을 안내해 드릴게요.",
    toggleLabel: "English",
  },
};

export function WooriMohaeChatSection() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const copy = HEADER_COPY[language];

  const handleToggle = () => {
    setLanguage((prev) => (prev === "en" ? "ko" : "en"));
  };

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center text-slate-900">
        <button
          type="button"
          onClick={handleToggle}
          className="self-end rounded-full border border-[color:var(--border-muted)] bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          aria-label={language === "en" ? "Switch to Korean" : "Switch to English"}
          data-language={language}
        >
          {copy.toggleLabel}
        </button>
        <h1 className="text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">{copy.description}</p>
      </header>

      <section className="w-full">
        <FamilyPlannerChat language={language} />
      </section>
    </>
  );
}
