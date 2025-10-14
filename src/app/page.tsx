import { FamilyPlannerChat } from "@/components/chat/FamilyPlannerChat";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center gap-10 px-4 pb-12 pt-12 sm:px-8">
      <header className="flex flex-col items-center gap-4 text-center text-slate-900">
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-muted)] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 backdrop-blur">
          Woori Mohae
        </span>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Plan your family&apos;s day with one conversation.
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Share your kids&apos; ages, neighbourhood, routines, and any must-haves. I&apos;ll ask the
          follow-ups, craft a balanced itinerary with weather-aware backups, and leave you with a
          tidy checklist to confirm.
        </p>
      </header>

      <section className="w-full">
        <FamilyPlannerChat />
      </section>
    </main>
  );
}
