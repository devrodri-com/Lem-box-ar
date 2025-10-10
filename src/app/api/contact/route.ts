// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY || "";
const FROM = process.env.RESEND_FROM || "LEM-BOX <onboarding@resend.dev>";

const DEBUG_TO = process.env.RESEND_DEBUG_TO || "";
const CONTACT_TO = process.env.CONTACT_TO || "";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      console.error("RESEND_API_KEY missing");
      return NextResponse.json(
        { ok: false, message: "Config faltante: RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const resend = new Resend(API_KEY); // lazy init en runtime

    const { name, email, message, company } = await req.json();

    // honeypot
    if ((company ?? "").trim()) return NextResponse.json({ ok: true });

    // validaciones básicas
    if (!name || name.trim().length < 2)
      return NextResponse.json(
        { ok: false, message: "Ingresá tu nombre completo.", field: "name" },
        { status: 400 }
      );
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json(
        { ok: false, message: "Ingresá un email válido.", field: "email" },
        { status: 400 }
      );
    if (!message || message.trim().length < 12)
      return NextResponse.json(
        { ok: false, message: "Contanos un poco más (mín. 12 caracteres).", field: "message" },
        { status: 400 }
      );

    // destinatarios desde ENV (permite lista separada por comas)
    const recipients = (CONTACT_TO || "info@lem-box.com")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (DEBUG_TO && !recipients.includes(DEBUG_TO)) recipients.push(DEBUG_TO);

    // primer intento con el FROM configurado
    const primaryFrom = FROM;
    let result = await resend.emails.send({
      from: primaryFrom,
      to: recipients,
      replyTo: email,
      subject: `Contacto LEM-BOX: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });

    // si Resend rechaza (p.ej., dominio no verificado), reintenta usando onboarding
    if (!result?.data?.id) {
      const fallbackFrom = "LEM-BOX <onboarding@resend.dev>";
      if (primaryFrom !== fallbackFrom) {
        console.warn("RESEND_RETRY_WITH_ONBOARDING", result?.error);
        result = await resend.emails.send({
          from: fallbackFrom,
          to: recipients,
          replyTo: email,
          subject: `Contacto LEM-BOX: ${name}`,
          text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
        });
      }
    }

    if (!result?.data?.id) {
      console.error("RESEND_NO_ID", result);
      return NextResponse.json(
        {
          ok: false,
          message:
            "No pudimos enviar el email ahora. Escribinos por WhatsApp y lo vemos.",
          detail: result?.error ?? result,
        },
        { status: 502 }
      );
    }

    console.log("RESEND_OK", result.data.id);
    return NextResponse.json({ ok: true, message: "¡Gracias! Te respondemos en horas hábiles.", id: result.data.id });
  } catch (err: unknown) {
    console.error("RESEND_ERR", err);
    return NextResponse.json(
      { ok: false, message: "Error al enviar. Probá por WhatsApp.", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}