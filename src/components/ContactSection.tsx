// src/components/ContactSection.tsx
"use client";
import { Suspense } from "react";
import { useState } from "react";

function ContactForm() {
  function SubmitButton({ pending }: { pending: boolean }) {
    return (
      <button
        type="submit"
        aria-busy={pending}
        disabled={pending}
        className="w-full inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500/90 px-6 text-sm font-semibold text-[#02120f] hover:bg-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02120f] disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_0_1px_rgba(0,95,64,0.25)]"
        data-umami-event="contact-submit"
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
      } catch (err) {
        setState({ ok: false, message: "Error de red. Probá nuevamente o por WhatsApp." });
      } finally {
        setPending(false);
      }
    })();
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-emerald-100/80 mb-1">Nombre</label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-required="true"
          aria-invalid={state.field === "name"}
          className={`w-full rounded-xl bg-white/[0.08] border px-3.5 py-2.5 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 focus:border-emerald-300/30 ${state.field === "name" ? "border-red-400/40" : "border-white/10"}`}
          placeholder="Tu nombre"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        {state.field === "name" && !state.ok && (
          <p className="mt-1 text-sm text-red-300/80">{state.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-emerald-100/80 mb-1">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          aria-required="true"
          aria-invalid={state.field === "email"}
          className={`w-full rounded-xl bg-white/[0.08] border px-3.5 py-2.5 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 focus:border-emerald-300/30 ${state.field === "email" ? "border-red-400/40" : "border-white/10"}`}
          placeholder="tu@correo.com"
        />
        {state.field === "email" && !state.ok && (
          <p className="mt-1 text-sm text-red-300/80">{state.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-emerald-100/80 mb-1">Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={12}
          aria-required="true"
          aria-invalid={state.field === "message"}
          className={`w-full rounded-xl bg-white/[0.08] border px-3.5 py-2.5 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 focus:border-emerald-300/30 ${state.field === "message" ? "border-red-400/40" : "border-white/10"}`}
          placeholder="¿En qué te ayudamos?"
        />
        {state.field === "message" && !state.ok && (
          <p className="mt-1 text-sm text-red-300/80">{state.message}</p>
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
      <p className="mt-1 text-xs text-emerald-100/60">
        Al enviar este formulario aceptás la{" "}
        <a href="/privacidad" className="underline hover:text-white">Política de Privacidad</a>.
      </p>
      <a
        href={`https://wa.me/17544653318?text=${encodeURIComponent(nameValue ? `Hola, soy ${nameValue}. Quiero hacer una consulta.` : "Hola, quiero hacer una consulta.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full inline-flex h-11 items-center justify-center rounded-xl border border-emerald-300/30 px-6 text-sm font-medium text-emerald-100 hover:border-emerald-300/50 hover:bg-emerald-400/5 transition-colors"
        data-umami-event="contact-whatsapp"
        aria-label="Escribir por WhatsApp (ver Política de Privacidad en /privacidad)"
      >
        Escribir por WhatsApp <span className="sr-only">Se abre en una pestaña nueva</span>
      </a>
      <p role="status" aria-live="polite" className={`mt-3 text-[14px] text-sm ${state.ok ? "text-emerald-200" : "text-emerald-100/80"}`}>
        {state.message}
      </p>
      <p className="mt-2 text-xs text-emerald-100/60">
        Usamos tus datos solo para responderte.
      </p>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-16 md:py-24 bg-[#02120f] text-[#e6f6f1] border-t border-white/5"
      style={{ scrollMarginTop: "var(--nav-h, 80px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <div className="mb-3">
            <p className="text-[12px] uppercase tracking-[0.18em] text-emerald-200/70">Contacto</p>
            <div className="mt-2 h-px w-10 bg-emerald-300/25" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Hablemos</h2>
          <p className="mt-3 max-w-prose text-[15px] text-emerald-100/85 leading-relaxed">
            Respondemos en horas hábiles. WhatsApp o email.
          </p>
          <dl className="mt-6 space-y-2 text-emerald-100/80">
            <div>
              <dt className="inline font-medium">WhatsApp: </dt>
              <dd className="inline">
                <a href="https://wa.me/17544653318" className="text-emerald-100/90 hover:text-emerald-100" rel="noopener noreferrer" target="_blank">+1 (754) 465 3318</a>
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Email: </dt>
              <dd className="inline">
                <a href="mailto:info@lem-box.com" className="text-emerald-100/90 hover:text-emerald-100">info@lem-box.com</a>
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Dirección Miami: </dt>
              <dd className="inline">20200 NW 2nd Ave, Unit 108, Miami, FL 33169</dd>
            </div>
          </dl>
        </div>
        <Suspense>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}