import { NextResponse } from "next/server";
import OpenAI from "openai";
import { randomUUID } from "node:crypto";

export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 500 },
    );
  }

  const workflowId = process.env.CHATKIT_WORKFLOW_ID;
  if (!workflowId) {
    return NextResponse.json(
      { error: "CHATKIT_WORKFLOW_ID is not configured" },
      { status: 500 },
    );
  }

  const requestData = await safeParseJson(request);

  try {
    const sanitizedState = sanitizeStateVariables(requestData?.state_variables);
    const session = await openai.beta.chatkit.sessions.create({
      user: requestData?.user ?? `family-planner-${randomUUID()}`,
      workflow: {
        id: workflowId,
        state_variables: {
          entrypoint: "family-planner-web",
          ...(sanitizedState ?? {}),
        },
      },
    });

    return NextResponse.json({
      client_secret: session.client_secret,
      expires_at: session.expires_at,
      session_id: session.id,
    });
  } catch (error) {
    console.error("Failed to create ChatKit session", error);
    return NextResponse.json(
      { error: "Failed to create ChatKit session" },
      { status: 500 },
    );
  }
}

async function safeParseJson(request: Request) {
  try {
    if (request.headers.get("content-length") === "0") {
      return undefined;
    }

    const text = await request.text();
    if (!text) {
      return undefined;
    }
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function sanitizeStateVariables(
  stateVariables: Record<string, unknown> | undefined,
) {
  if (!stateVariables) {
    return undefined;
  }

  const output: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(stateVariables)) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      output[key] = value;
    }
  }
  return output;
}
