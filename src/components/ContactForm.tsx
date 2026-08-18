// src/components/ContactForm.tsx
"use client";
import { useState } from "react";

export default function ContactForm() {
  function SubmitButton({ pending }: { pending: boolean }) {
    return (
      <button
        type="submit"
        aria-busy={pending}
        disabled={pending}
        className="w-full cta cta-operational h-12 transition-colors fx-on-operational disabled:opacity-70 disabled:cursor-not-allowed"
        data-analytics-event="contact-submit"
        data-analytics-surface="home-contact-form"
        data-analytics-destination="/api/contact"
      >
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4"/></svg>
            Enviando…
          </span>
        ) : (
          "Enviar consulta"
        )}
      </button>
    );
  }

  const [nameValue, setNameValue] = useState("");
  const [state, setState] = useState<{ ok: boolean; message: string; field?: string }>({ ok: false, message: "" });
  const [pending, setPending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string || "").trim();
    const email = (fd.get("email") as string || "").trim();
    const message = (fd.get("message") as string || "").trim();
    const company = (fd.get("company") as string || "").trim();
    if (company) {
      setState({ ok: true, message: "Enviado." });
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setState({ ok: false, message: "Ingresá un email válido.", field: "email" });
      return;
    }
    if (name.length < 2) {
      setState({ ok: false, message: "Ingresá tu nombre completo.", field: "name" });
      return;
    }
    if (message.length < 12) {
      setState({ ok: false, message: "Contanos un poco más (mín. 12 caracteres).", field: "message" });
      return;
    }
    setPending(true);
    (async () => {
      try {
        const resp = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message, company }),
        });
        const data = await resp.json();
        if (!resp.ok || !data.ok) {
          setState({
            ok: false,
            message: data?.message ?? "No se pudo enviar.",
            field: data?.field,
          });
        } else {
          setState({
            ok: true,
            message: data?.message ?? "¡Gracias! Te respondemos en horas hábiles.",
          });
          (e.target as HTMLFormElement).reset();
          setNameValue("");
        }
      } catch {
        setState({ ok: false, message: "Error de red. Probá nuevamente o por WhatsApp." });
      } finally {
        setPending(false);
      }
    })();
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-xl">
      <div>
        <label htmlFor="name" className="field-label">Nombre</label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-required="true"
          aria-invalid={state.field === "name"}
          className={`field fx-always ${state.field === "name" ? "field-invalid" : ""}`}
          placeholder="Tu nombre"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        {state.field === "name" && !state.ok && (
          <p className="mt-1 form-error">{state.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          aria-required="true"
          aria-invalid={state.field === "email"}
          className={`field fx-always ${state.field === "email" ? "field-invalid" : ""}`}
          placeholder="tu@correo.com"
        />
        {state.field === "email" && !state.ok && (
          <p className="mt-1 form-error">{state.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="field-label">Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={12}
          aria-required="true"
          aria-invalid={state.field === "message"}
          className={`field fx-always ${state.field === "message" ? "field-invalid" : ""}`}
          placeholder="¿En qué te ayudamos?"
        />
        {state.field === "message" && !state.ok && (
          <p className="mt-1 form-error">{state.message}</p>
        )}
      </div>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <SubmitButton pending={pending} />
      <p className="mt-1 legal-note">
        Al enviar este formulario aceptás la{" "}
        <a href="/privacidad" className="link-inline fx">Política de Privacidad</a>.
      </p>
      <a
        href={`https://wa.me/17544653318?text=${encodeURIComponent(nameValue ? `Hola, soy ${nameValue}. Quiero hacer una consulta.` : "Hola, quiero hacer una consulta.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full cta cta-operational-outline transition-colors fx"
        data-analytics-event="contact-whatsapp"
        data-analytics-surface="home-contact-form"
        data-analytics-destination="whatsapp"
        aria-label="Escribir por WhatsApp (ver Política de Privacidad en /privacidad)"
      >
        Escribir por WhatsApp <span className="sr-only">Se abre en una pestaña nueva</span>
      </a>
      <p role="status" aria-live="polite" className={`mt-3 body-small ${state.ok ? "form-status-ok" : ""}`}>
        {state.message}
      </p>
      <p className="mt-2 legal-note">
        Usamos tus datos solo para responderte.
      </p>
    </form>
  );
}
