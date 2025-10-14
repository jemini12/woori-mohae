# Woori Mohae · Family Concierge

Launch-ready marketing page and embedded ChatKit experience for an AgentKit-powered family planning workflow. Woori Mohae speaks to Korean parents, helping them stitch together weekend or weekday routines with weather-aware backups in minutes.

## Overview

- **Stack** – Next.js 15 (App Router), Tailwind CSS 4, ChatKit React bindings, OpenAI `beta.chatkit.sessions`.
- **Workflow ready** – Aligns with an Agent Builder flow that greets parents, gathers age bands, location, routines, preferences, and constraints, then summarises before running the tool plan.
- **Brand forward** – Gradient backdrop, frosted panels, and responsive cards showcase the concierge with production-friendly copy.
- **Extensible** – Swap in your AgentKit actions for venues, weather, transit, budget, or loyalty integrations.

## Getting Started

1. **Clone & install**
   ```bash
   npm install
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to load the experience.
2. **Configure environment**
   - Duplicate `.env.local.example` to `.env.local`.
   - Provide your credentials:
     ```env
     OPENAI_API_KEY=sk-...
     CHATKIT_WORKFLOW_ID=workflow_...
     ```
   - Register your local domain (`http://localhost:3000`) and production host in the ChatKit domain allowlist.
3. **Agent Builder workflow**
   - Deploy (or update) your Agent Builder workflow with the Woori Mohae instructions.
   - Attach AgentKit tools for activities, weather, transport, budgeting, or reservations.
   - Copy the published `workflow_id` and paste it into `.env.local`.

## Docker Deployment

Use the provided `Dockerfile` when shipping to platforms such as Vercel’s Docker runtime or any OCI-compatible host.

```bash
# Build the image
docker build -t woori-mohae .

# Run locally (maps host port 3000)
docker run --rm -p 3000:3000 \
  -e OPENAI_API_KEY=sk-... \
  -e CHATKIT_WORKFLOW_ID=workflow_... \
  woori-mohae
```

Vercel automatically injects `PORT` (and your environment secrets) at runtime. The container listens on port `3000` and binds to `0.0.0.0`, so no further changes are needed.

## Conversation Checklist

Mirror these checkpoints inside your workflow instructions so every chat stays structured:

1. Greet the family, note the day/date, and confirm whether you’re planning for a weekday or weekend.
2. Capture every child’s age band (0-3, 4-6, 7-9, 10-12) plus any caregivers joining.
3. Log the city, neighbourhood, or nearest subway line to geo-tune recommendations.
4. Document routines (meals, naps, lessons, meds), preferences, budgets, and transit limits.
5. Summarise back for confirmation, then invoke the tool plan and deliver Markdown with linked activities, timing reminders, and weather contingencies.

## Design Guarantees

- Responsive layout with accessible contrast, keyboard-friendly navigation, and semantic HTML.
- Radial gradients and frosted glass cards frame the ChatKit widget without distracting from it.
- CSS variables for brand colours plus Tailwind utility classes for rapid iteration.
- Metadata slots (OpenGraph/Twitter) pre-filled for future SEO and sharing needs.

## Session Endpoint

`src/app/api/chatkit/session/route.ts` exchanges your workflow ID and environment context for a short-lived ChatKit client secret:

- Inject `workflow.state_variables` if you want to seed the agent with additional context (e.g., loyalty IDs).
- Persist session IDs for auditing or apply rate limits before handing secrets to the browser.
- Consider refreshing tokens instead of creating a brand new session per request once you scale.

## Deployment

Ship to Vercel or your preferred Next.js host. Add `OPENAI_API_KEY`, `CHATKIT_WORKFLOW_ID`, and any other AgentKit environment variables. When you flip to production, update the ChatKit domain allowlist with your live URL.
