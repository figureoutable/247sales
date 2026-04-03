import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/constants";

function resendErrorMessage(status: number, bodyText: string): string {
  try {
    const j = JSON.parse(bodyText) as { message?: string; errors?: Array<{ message?: string } | string> };
    if (typeof j.message === "string" && j.message.trim()) return j.message.trim();
    if (Array.isArray(j.errors) && j.errors.length > 0) {
      const parts = j.errors.map((e) =>
        typeof e === "string" ? e : typeof e?.message === "string" ? e.message : JSON.stringify(e),
      );
      return parts.join("; ");
    }
  } catch {
    /* use raw */
  }
  const raw = bodyText.trim().slice(0, 800);
  return raw || `Email service returned HTTP ${status}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as { name?: string; email?: string; message?: string };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // If Resend is configured, use it. Otherwise log and return 200 so the form still "succeeds"
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "Figures Contact Form <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          replyTo: email,
          subject: `Contact form: ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        const detail = resendErrorMessage(res.status, err);
        return NextResponse.json({ error: `Could not send email: ${detail}` }, { status: 502 });
      }
    } else {
      console.log("Contact form (no RESEND_API_KEY):", { name, email, message });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Unknown server error";
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
