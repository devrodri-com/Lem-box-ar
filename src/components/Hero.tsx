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
      <div className="absolute inset-0 -z-10 hero-veil" />
      <div className="absolute inset-0 -z-10 hero-veil-2" />
      <div className="absolute inset-0 -z-10 hero-veil-3" />
      <div className="absolute inset-0 -z-10 bg-black/30" />

      <div className="px-6 w-full max-w-7xl">
        <h1 className="h-display max-w-[18ch] mx-auto">
          Tu puente entre EE.UU. y Argentina
        </h1>
        <p className="mt-5 lede max-w-[48ch] mx-auto">
          Recibimos tus compras en Miami, registramos cada paquete con fotos, consolidamos y reempacamos, y coordinamos una salida semanal hacia Argentina.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://portal.lem-box.com/registro"
            className="w-full sm:w-auto cta cta-primary fx-on-primary"
          >
            Crear cuenta
          </a>
          <a
            href="#como-funciona"
            className="w-full sm:w-auto cta cta-secondary fx"
          >
            Cómo funciona
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#quienes-somos"
        className="hidden sm:inline-flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center justify-center rounded-full border scroll-cue w-9 h-9 animate-bounce fx"
        aria-label="Bajar a la siguiente sección"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </a>
    </section>
  );
}
