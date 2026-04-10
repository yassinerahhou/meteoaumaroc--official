import { NextRequest, NextResponse } from "next/server";

// Rate limit: max 2 subscribe attempts per IP per hour
const attempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= 2) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Trop de tentatives." }, { status: 429 });
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (email.length > 200) {
    return NextResponse.json({ error: "Email trop long." }, { status: 400 });
  }

  // Notify admin via EmailJS (same credentials as /api/contact)
  const serviceId  = process.env.EMAILJS_SERVICE_ID  ?? "service_cj7bnkn";
  const templateId = process.env.EMAILJS_TEMPLATE_ID ?? "template_277u68a";
  const publicKey  = process.env.EMAILJS_PUBLIC_KEY  ?? "Eit3Bgxn7uRPpVnHh";

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id:  serviceId,
        template_id: templateId,
        user_id:     publicKey,
        template_params: {
          from_name:  "Newsletter – Nouvel abonné",
          from_email: email,
          message:    `Nouvel abonnement newsletter : ${email}`,
          reply_to:   email,
        },
      }),
    });

    if (!res.ok) {
      console.error("EmailJS subscribe error:", await res.text());
      return NextResponse.json({ error: "Erreur d'envoi." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return NextResponse.json({ error: "Erreur réseau." }, { status: 500 });
  }
}
