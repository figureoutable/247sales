import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a UK tax assistant on an accounting firm's website. You only answer questions that are directly related to UK tax, accounting, allowable business expenses, HMRC rules, or financial compliance. If the user's question is not related to any of these topics, respond only with: 'This isn't something I can help with here. This assistant is for UK tax and accounting questions only.' Do not answer questions about anything else under any circumstances. Keep answers concise, practical, and accurate. Always include a short disclaimer at the end of every answer: 'This is general guidance only. Please speak to your accountant to confirm what applies to your situation.'`;

const MIN_LENGTH = 10;
const MAX_LENGTH = 300;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim() ?? "";

    if (message.length < MIN_LENGTH) {
      return NextResponse.json(
        { error: "Please enter a question of at least 10 characters." },
        { status: 400 },
      );
    }

    if (message.length > MAX_LENGTH) {
      return NextResponse.json(
        { error: "Please keep your question under 300 characters." },
        { status: 400 },
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
