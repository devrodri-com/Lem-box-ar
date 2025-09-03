// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY || "";
const FROM = process.env.RESEND_FROM || "LEM-BOX <onboarding@resend.dev>";
const DEBUG_TO = process.env.RESEND_DEBUG_TO || "";

const resend = new Resend(API_KEY);

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      console.error("RESEND_API_KEY missing");
      return NextResponse.json(
        { ok: false, message: "Config faltante: RESEND_API_KEY." },
        { status: 500 }
      );
    }

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

    const recipients = ["info@lem-box.com"];
    if (DEBUG_TO && !recipients.includes(DEBUG_TO)) recipients.push(DEBUG_TO);

    const sent = await resend.emails.send({
      from: FROM,                // remitente (ideal: verificado en Resend)
      to: recipients,            // destinatarios
      replyTo: email,            // para responder al cliente
      subject: `Contacto LEM-BOX: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });

    if (!sent?.data?.id) {
      console.error("RESEND_NO_ID", sent);
      return NextResponse.json(
        { ok: false, message: "Resend no devolvió ID. Revisá Logs en Resend.", detail: sent },
        { status: 502 }
      );
    }

    console.log("RESEND_OK", sent?.data?.id);
    return NextResponse.json({ ok: true, message: "¡Gracias! Te respondemos en horas hábiles.", id: sent?.data?.id });
  } catch (err: any) {
    console.error("RESEND_ERR", err);
    return NextResponse.json(
      { ok: false, message: "Error al enviar. Probá por WhatsApp.", detail: err?.message ?? err },
      { status: 500 }
    );
  }
}