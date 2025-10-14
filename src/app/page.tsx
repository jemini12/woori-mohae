import { FamilyPlannerChat } from "@/components/chat/FamilyPlannerChat";

const HERO_HIGHLIGHTS = [
  {
    title: "Localised family rituals",
    description:
      "Age-banded prompts tuned for Korean childcare, hagwon pickups, and extended family visits.",
  },
  {
    title: "Weather-ready back-ups",
    description: "AgentKit hooks can inject KMA forecasts and indoor alternates before hand-off.",
  },
  {
    title: "Actionable Markdown output",
    description: "Parents receive linked activities, routine reminders, and contingency notes.",
  },
];

const FEATURE_PANELS = [
  {
    title: "AgentKit-first workflow",
    description:
      "The hosted workflow is primed to call your AgentKit actions for local activities, weather, transport, budget checks, and more.",
    bullets: [
      "Instruction set maps to age bands, location, routines, and constraints.",
      "Summarises back for confirmation before running the tool plan.",
      "Returns structured Markdown that ChatKit renders cleanly on web and mobile.",
    ],
  },
  {
    title: "Production-grade guardrails",
    description:
      "Fine-grained prompts and validations keep the conversation focussed while giving parents transparency into the plan.",
    bullets: [
      "Enforces checklist coverage before tool invocation.",
      "Slots in disclaimers about availability, budget, and weather uncertainty.",
      "Configurable composer placeholder, starter prompts, and chip badges.",
    ],
  },
  {
    title: "Design for trust & delight",
    description:
      "A polished surface that feels at home on a brand site: layered gradients, relaxed typography, and responsive cards throughout.",
    bullets: [
      "Navigation anchors for demo, workflow setup, and design system.",
      "Chat panel framed by soft borders and ambient glow.",
      "Sections sized for laptops, tablets, and touch surfaces.",
    ],
  },
];

const SETUP_CHECKLIST = [
  "Create or update your Agent Builder workflow with the Woori Mohae instructions and AgentKit tools.",
  "Duplicate `.env.local.example` to `.env.local`, then set `OPENAI_API_KEY` and `CHATKIT_WORKFLOW_ID`.",
  "Run `npm install` followed by `npm run dev` to load the Next.js app locally.",
  "Register your domain (or `http://localhost:3000`) in the ChatKit domain allowlist before going live.",
];

const CONVERSATION_CHECKLIST = [
  "Confirm each child’s age band (0-3, 4-6, 7-9, 10-12) and any caregivers joining.",
  "Capture the city, neighbourhood, or nearby subway line to geo-tune recommendations.",
  "Log every routine: meals, naps, lessons, meds, quiet time, screen limits.",
  "Ask for preferences, energy levels, budget ceilings, and transit constraints.",
  "Summarise the plan for confirmation before invoking the tool plan and final reply.",
];

const DESIGN_PROMISES = [
  "Responsive layout with accessible contrast and keyboard-friendly navigation.",
  "Radial-gradient backdrop with frosted cards to keep focus on the concierge.",
  "Tailwind CSS tokens plus CSS variables for brand colour expansion.",
  "Metadata primed for social previews and future SEO optimisation.",
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-40 h-96 bg-gradient-to-b from-blue-200/50 via-transparent to-transparent blur-3xl" />
        <div className="absolute left-[10%] top-36 h-64 w-64 rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute right-[5%] top-16 h-80 w-80 rounded-full bg-indigo-200/30 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-24 px-6 pb-28 pt-10 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-muted)] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur">
              Woori Mohae
            </span>
            <span className="hidden text-sm text-slate-500 sm:inline">
              Family concierge for busy Korean households
            </span>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-slate-600 sm:justify-end">
            <a
              href="#chat"
              className="rounded-full border border-transparent bg-slate-900 px-4 py-1.5 font-medium text-white transition hover:bg-slate-700"
            >
              Live demo
            </a>
            <a
              href="#workflow"
              className="rounded-full border border-[color:var(--border-muted)] bg-white/80 px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900"
            >
              Workflow setup
            </a>
            <a
              href="#design"
              className="rounded-full border border-[color:var(--border-muted)] bg-white/80 px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900"
            >
              Design system
            </a>
          </nav>
        </header>

        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Production-ready itineraries, routines, and backup plans—crafted in moments.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Woori Mohae blends OpenAI Agent Builder, AgentKit tools, and ChatKit for a concierge
                that understands Korean family rhythms. Ship a branded experience parents trust on
                day one.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {HERO_HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-2xl border border-[color:var(--border-muted)] bg-white/80 p-5 shadow-sm backdrop-blur"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-soft)] px-3 py-1 font-medium text-[color:var(--accent)]">
                Built on Next.js 15 · Tailwind 4 · ChatKit React
              </span>
              <span>AgentKit toolchain ready for weather, venues, and transit.</span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-[color:var(--border-muted)] bg-white/80 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Workflow guardrails out of the box
              </h2>
              <p className="text-sm text-slate-600">
                Use this playbook inside Agent Builder so every chat stays structured, on-topic,
                and ready for instant itinerary generation.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-xs font-semibold text-[color:var(--accent)]">
                  1
                </span>
                Start with a warm greeting and confirm whether it’s a weekday or weekend.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-xs font-semibold text-[color:var(--accent)]">
                  2
                </span>
                Capture ages, group size, location, and every routine that matters today.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-xs font-semibold text-[color:var(--accent)]">
                  3
                </span>
                Confirm preferences and constraints, summarise back, then run the tool plan.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-xs font-semibold text-[color:var(--accent)]">
                  4
                </span>
                Deliver Markdown with linked activities, routine reminders, and weather backups.
              </li>
            </ul>
            <div className="rounded-2xl border border-dashed border-[color:var(--border-muted)] bg-slate-50/70 px-4 py-3 text-xs text-slate-500">
              Tip: wire in your AgentKit actions for venue search, ticketing availability, and
              forecast lookups so plans update with confidence.
            </div>
          </div>
        </section>

        <section id="chat" className="grid gap-8">
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border-muted)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Live concierge
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Test the embedded Woori Mohae experience
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600">
              Launch a session, feed in your family’s specifics, and watch the workflow move from
              qualifying questions to the final markdown hand-off. Swap in your own AgentKit actions
              to personalise every recommendation.
            </p>
          </div>
          <FamilyPlannerChat />
        </section>

        <section id="capabilities" className="space-y-10">
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border-muted)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Why teams choose Woori Mohae
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Built for launch day polish with room to grow
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600">
              Every section is tuned for brand storytelling, while the underlying workflow keeps
              conversations structured and compliant. Extend it with your own data sources when
              you’re ready.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {FEATURE_PANELS.map((panel) => (
              <article
                key={panel.title}
                className="flex flex-col gap-4 rounded-3xl border border-[color:var(--border-muted)] bg-white/80 p-7 shadow-sm backdrop-blur transition hover:shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{panel.title}</h3>
                  <p className="text-sm text-slate-600">{panel.description}</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  {panel.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--border-muted)] bg-white/85 p-8 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">Get production-ready</h2>
            <p className="mt-3 text-sm text-slate-600">
              Connect your workflow and environment variables, then invite parents to try the demo.
              Swap the copy or add more sections as your brand evolves.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {SETUP_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[color:var(--border-muted)] bg-white/85 p-8 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">Conversation contract</h2>
            <p className="mt-3 text-sm text-slate-600">
              Mirror these checkpoints in your prompt so the agent reliably covers families’ needs
              before committing to an itinerary.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {CONVERSATION_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="design" className="grid gap-6 rounded-3xl border border-[color:var(--border-muted)] bg-slate-50/70 p-8 shadow-inner backdrop-blur-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900">Design notes</h2>
            <p className="text-sm text-slate-600">
              Crafted to feel premium on desktop and mobile, with plenty of breathing room for your
              brand photography or testimonials down the line.
            </p>
          </div>
          <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {DESIGN_PROMISES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-[color:var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-col items-start gap-4 border-t border-[color:var(--border-muted)] pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-700">Woori Mohae</p>
            <p>Agent-powered concierge for Korean families · Crafted with care in Seoul.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#chat"
              className="rounded-full border border-[color:var(--border-muted)] bg-white/80 px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900"
            >
              View demo
            </a>
            <a
              href="#workflow"
              className="rounded-full border border-transparent bg-slate-900 px-4 py-1.5 font-medium text-white hover:bg-slate-700"
            >
              Launch in Agent Builder
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
