"use client";
// NOTE: To convert JPG/PNG to WEBP using Sharp:
// sharp input.jpg -o output.webp

import Image from "next/image";
// src/components/Hero.tsx

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92dvh] md:min-h-dvh flex items-center justify-center text-center pt-20 md:pt-28 pb-12 md:pb-20"
      style={{ scrollMarginTop: "var(--nav-h, 80px)" }}
    >
      {/* Fondo: imagen si está disponible */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-10 object-cover object-bottom md:object-[50%_60%]"
      />
      {/* Fondo: degradado + anillos suaves para profundidad */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0f1a17] via-[#0f1a17]/90 to-[#0f1a17]/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,95,64,0.35),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(235,102,24,0.12),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-black/30" />

      <div className="px-6 w-full max-w-7xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-white max-w-[18ch] mx-auto">
          Tu puente entre EE.UU. y Argentina
        </h1>
        <p className="mt-5 text-white/80 max-w-[48ch] mx-auto leading-relaxed">
          Recepción y consolidación en Miami; ahorrás volumen y recibís en Argentina en tiempo y forma. Atención humana y seguimiento claro.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://lem-box.com/Tracking/web/#/register"
            className="w-full sm:w-auto inline-flex h-11 px-6 items-center justify-center rounded-full bg-[#eb6618] text-white font-semibold hover:bg-[#d15612] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40 shadow-[0_8px_20px_-6px_rgba(235,102,24,0.45)]"
          >
            Crear cuenta
          </a>
          <a
            href="#como-funciona"
            className="w-full sm:w-auto inline-flex h-11 px-6 items-center justify-center rounded-full border border-white/30 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Cómo funciona
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#quienes-somos"
        className="hidden sm:inline-flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 w-9 h-9 animate-bounce"
        aria-label="Bajar a la siguiente sección"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </a>
    </section>
  );
}