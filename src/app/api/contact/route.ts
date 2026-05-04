import { NextRequest, NextResponse } from "next/server";

// Simple rate limiting: max 3 submissions per IP per hour
const submissions = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = submissions.get(ip);

  if (!entry || now > entry.resetAt) {
    submissions.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { name, email, message } = body;

  // Validate
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return NextResponse.json({ error: "Données trop longues." }, { status: 400 });
  }

  // Call EmailJS REST API — all credentials stay server-side
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
          from_name:    name.trim(),
          from_email:   email.trim(),
          subject:      `[MeteoAuMaroc] Message de ${name.trim()}`,
          message:      message.trim(),
          reply_to:     email.trim(),
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("EmailJS error:", res.status, text);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Réessayez dans quelques minutes." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact send error:", err);
    return NextResponse.json(
      { error: "Erreur réseau. Vérifiez votre connexion et réessayez." },
      { status: 500 }
    );
  }
}
