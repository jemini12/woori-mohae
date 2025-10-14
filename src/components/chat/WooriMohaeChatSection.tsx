"use client";

import { useState } from "react";
import { FamilyPlannerChat } from "./FamilyPlannerChat";

type SupportedLanguage = "en" | "ko";

const HEADER_COPY: Record<
  SupportedLanguage,
  { title: string; description: string }
> = {
  en: {
    title: "Plan your family's day with one conversation.",
    description:
      "Share your kids’ ages, neighbourhood, routines, and any must-haves. I’ll ask follow-up questions, then return a balanced itinerary with weather-aware backups.",
  },
  ko: {
    title: "대화 한 번으로 가족 하루를 계획하세요.",
    description:
      "아이 나이, 사는 지역, 루틴과 꼭 포함하고 싶은 내용을 알려 주세요. 필요한 내용을 확인한 뒤 날씨 대비 플랜까지 담은 일정을 안내해 드릴게요.",
  },
};

export function WooriMohaeChatSection() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const copy = HEADER_COPY[language];

  return (
    <>
      <header className="flex w-full flex-col items-center gap-4 text-center text-slate-900">
        <div className="flex w-full justify-end">
          <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border-muted)] bg-white/90 px-2 py-1 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                language === "en"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-pressed={language === "en"}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("ko")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                language === "ko"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-pressed={language === "ko"}
            >
              한국어
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">{copy.description}</p>
      </header>

      <section className="w-full">
        <FamilyPlannerChat language={language} />
      </section>
    </>
  );
}
