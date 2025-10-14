"use client";

import type { ChatKitEvents } from "@openai/chatkit";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type SupportedLanguage = "en" | "ko";

const LOCALE_COPY: Record<
  SupportedLanguage,
  {
    prompts: { label: string; prompt: string; icon: "calendar" | "lifesaver" | "sparkle" }[];
    greeting: string;
    placeholder: string;
    tip: string;
    badge: string;
  }
> = {
  en: {
    prompts: [
      {
        label: "Seoul Saturday blueprint",
        prompt:
          "We’re based near Seoul Forest with kids 3 and 8. Craft a Saturday plan with outdoor play, culture, and a calm evening wind-down.",
        icon: "calendar",
      },
      {
        label: "Rain-ready routines",
        prompt:
          "It’s expected to rain in Busan. Design a Sunday itinerary for siblings aged 2 and 6 that balances energy, meals, and indoor adventures.",
        icon: "lifesaver",
      },
      {
        label: "Half-day Daegu dash",
        prompt:
          "We only have Sunday afternoon in Daegu. Suggest two can’t-miss experiences plus reminders for naps and dinner.",
        icon: "sparkle",
      },
    ],
    greeting:
      "Annyeong! Tell me your family’s ages, routines, and preferences so I can build the perfect day.",
    placeholder:
      "Tell me your kids’ ages, neighborhood or subway line, routines, and any must-haves…",
    tip: "Tip: share age bands (0-3, 4-6, 7-9, 10-12), where you live, and routines you care about most. I’ll ask follow-ups before proposing plans.",
    badge: "Always double-check availability",
  },
  ko: {
    prompts: [
      {
        label: "서울 토요일 일정 짜기",
        prompt:
          "서울숲 근처에 사는 3살, 8살 아이가 있는 가족이에요. 야외 활동과 문화 체험, 저녁 휴식까지 균형 잡힌 토요일 계획을 만들어 주세요.",
        icon: "calendar",
      },
      {
        label: "비 오는 날 루틴",
        prompt:
          "부산에 비 예보가 있어요. 2살, 6살 남매가 지루하지 않도록 실내 위주의 일요일 일정을 만들어 주세요. 식사와 낮잠도 챙겨 주세요.",
        icon: "lifesaver",
      },
      {
        label: "대구 반나절 코스",
        prompt:
          "일요일 오후만 대구에 머물 수 있어요. 꼭 가봐야 할 활동 두 가지와 낮잠, 저녁 식사 알림까지 제안해 주세요.",
        icon: "sparkle",
      },
    ],
    greeting:
      "안녕하세요! 아이들 나이, 가족 일정, 선호를 알려 주시면 균형 잡힌 하루 일정을 만들어 드릴게요.",
    placeholder:
      "아이 나이, 사는 지역이나 지하철역, 루틴과 꼭 포함하고 싶은 것들을 알려 주세요…",
    tip: "Tip: 연령대(0-3, 4-6, 7-9, 10-12), 사는 곳, 챙겨야 할 루틴을 먼저 알려 주세요. 필요한 내용을 확인한 후 일정을 제안해 드릴게요.",
    badge: "최종 일정은 직접 확인해 주세요",
  },
};

type FamilyPlannerChatProps = {
  language?: SupportedLanguage;
};

export function FamilyPlannerChat({ language = "en" }: FamilyPlannerChatProps) {
  const locale = LOCALE_COPY[language];
  const [error, setError] = useState<string | null>(null);
  const [isScriptReady, setScriptReady] = useState(false);

  const fetchClientSecret = useCallback(async (currentClientSecret: string | null) => {
    const response = await fetch("/api/chatkit/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentClientSecret }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Unable to initialize chat session.");
    }


    setError(null);

    const payload = (await response.json()) as { client_secret: string };
    return payload.client_secret;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.customElements?.get("openai-chatkit")) {
      setScriptReady(true);
      return;
    }

    const maxAttempts = 120;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const isRegistered = window.customElements?.get("openai-chatkit") !== undefined;
      if (isRegistered) {
        console.info("[FamilyPlannerChat] openai-chatkit registered");
        setScriptReady(true);
        setError(null);
        window.clearInterval(timer);
      } else if (attempts >= maxAttempts) {
        window.clearInterval(timer);
        setError(
          "Chat widget failed to load. Confirm https://cdn.platform.openai.com/deployments/chatkit/chatkit.js is accessible and your domain is allowlisted.",
        );
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  const options = useMemo(
    () => ({
      api: {
        getClientSecret: fetchClientSecret,
      },
      header: {
        enabled: false,
      },
      history: {
        enabled: false,
      },
      startScreen: {
        greeting: locale.greeting,
        prompts: locale.prompts,
      },
      composer: {
        placeholder: locale.placeholder,
      },
      theme: {
        colorScheme: "light" as const,
        radius: "round" as const,
      },
      onError: ({ error }: ChatKitEvents["chatkit.error"]["detail"]) => {
        console.error("ChatKit error", error);
        setError(error?.message ?? "Unexpected ChatKit error. Check console for details.");
      },
      onResponseStart: () => console.info("[Woori Mohae] ChatKit response started"),
      onResponseEnd: () => console.info("[Woori Mohae] ChatKit response finished"),
      onLog: ({ name, data }: ChatKitEvents["chatkit.log"]["detail"]) => {
        console.info(`[Woori Mohae] ChatKit log: ${name}`, data ?? {});
      },
    }),
    [fetchClientSecret, locale.greeting, locale.placeholder, locale.prompts],
  );

  const { control } = useChatKit(options);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-[32px] border border-[color:var(--border-muted)] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur">
      {isScriptReady ? (
        <ChatKit
          control={control}
          className="h-[640px] w-full rounded-2xl border border-slate-200/60 bg-white"
        />
      ) : (
        <div className="flex h-[640px] w-full items-center justify-center rounded-2xl border border-slate-200/60 bg-white text-sm text-slate-500">
          {error ?? "Loading ChatKit widget..."}
        </div>
      )}
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-[1fr_auto] sm:items-center">
        <p>{locale.tip}</p>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {locale.badge}
        </span>
      </div>
    </div>
  );
}
