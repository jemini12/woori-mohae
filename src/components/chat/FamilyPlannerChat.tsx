"use client";

import type { ChatKitEvents } from "@openai/chatkit";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const STARTER_PROMPTS = [
  {
    label: "Seoul Saturday blueprint",
    prompt:
      "We’re based near Seoul Forest with kids 3 and 8. Craft a Saturday plan with outdoor play, culture, and a calm evening wind-down.",
    icon: "calendar" as const,
  },
  {
    label: "Rain-ready routines",
    prompt:
      "It’s expected to rain in Busan. Design a Sunday itinerary for siblings aged 2 and 6 that balances energy, meals, and indoor adventures.",
    icon: "lifesaver" as const,
  },
  {
    label: "Half-day Daegu dash",
    prompt:
      "We only have Sunday afternoon in Daegu. Suggest two can’t-miss experiences plus reminders for naps and dinner.",
    icon: "sparkle" as const,
  },
];

export function FamilyPlannerChat() {
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
        title: {
          text: "Woori Mohae Concierge",
        },
      },
      history: {
        enabled: false,
      },
      startScreen: {
        greeting:
          "Annyeong! Share your crew’s ages, routines, preferences, and timing—I’ll stitch together a balanced plan.",
        prompts: STARTER_PROMPTS,
      },
      composer: {
        placeholder:
          "Tell me your family’s ages, neighborhood or subway line, routines, and any must-haves…",
      },
      theme: {
        colorScheme: "light" as const,
        radius: "round" as const,
      },
      onError: ({ error }: ChatKitEvents["chatkit.error"]["detail"]) => {
        console.error("ChatKit error", error);
        setError(error?.message ?? "Unexpected ChatKit error. Check console for details.");
      },
    }),
    [fetchClientSecret],
  );

  const { control } = useChatKit(options);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4 rounded-[32px] border border-[color:var(--border-muted)] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur">
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
        <p>
          Tip: start with age bands (0-3, 4-6, 7-9, 10-12), where you live, and the
          routines you care about most. The agent will probe for constraints before
          proposing plans.
        </p>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          Always double-check availability
        </span>
      </div>
    </div>
  );
}
