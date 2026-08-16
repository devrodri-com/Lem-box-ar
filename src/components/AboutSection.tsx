// src/components/AboutSection.tsx
import Image from "next/image";
import { getContent } from "@/lib/content";

export default function AboutSection() {
  const content = getContent();

  return (
    <section
      id="quienes-somos"
      aria-labelledby="quienes-somos-title"
      className="relative bg-[#02120f] py-16 md:py-28 px-4 sm:px-6"
      style={{ scrollMarginTop: "var(--nav-h, 72px)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
        {/* Columna de texto */}
        <div className="col-span-1 lg:col-span-6">
          <span className="inline-block text-sm text-white/70 tracking-normal">
            Experiencia previa en operaciones logísticas EE.UU. ↔ Argentina, con el servicio actualmente retomado
          </span>
          <h2
            id="quienes-somos-title"
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            {content.about.title}
          </h2>
          <p className="mt-6 text-white/90 text-[16px] sm:text-[17px] md:text-[18px] leading-[1.6] tracking-[0.01em] max-w-[34ch] md:max-w-[44ch]">
            Somos operadores logísticos con base en Miami. Coordinamos servicios para particulares y operaciones comerciales según las condiciones de cada caso, y también logística para clientes que venden en EE.UU. Nuestro equipo atiende por WhatsApp y email durante todo el proceso.
          </p>
          <ul className="mt-5 space-y-2 text-white/85 text-[15px] sm:text-[16px] leading-[1.6]">
            <li className="flex items-start gap-2"><span className="self-center inline-block h-1.5 w-1.5 rounded-full bg-white/70" />Recepción documentada con fotos en Miami</li>
            <li className="flex items-start gap-2"><span className="self-center inline-block h-1.5 w-1.5 rounded-full bg-white/70" />Consolidación y reempaque incluidos</li>
            <li className="flex items-start gap-2"><span className="self-center inline-block h-1.5 w-1.5 rounded-full bg-white/70" />Una salida semanal hacia Argentina</li>
            <li className="flex items-start gap-2"><span className="self-center inline-block h-1.5 w-1.5 rounded-full bg-white/70" />Seguimiento por estados y atención humana en español</li>
            <li className="flex items-start gap-2"><span className="self-center inline-block h-1.5 w-1.5 rounded-full bg-white/70" />Logística para terceros en EE.UU. (almacenaje y preparación de pedidos)</li>
          </ul>

          {/* CTA group */}
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/servicios"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#eb6618] text-white px-7 py-3 text-sm font-semibold no-underline hover:bg-[#d15612] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40"
            >
              Ver servicios
            </a>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/40 text-white/90 px-7 py-3 text-sm font-semibold no-underline hover:border-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Cómo funciona →
            </a>
            <a
              href="#contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/40 text-white/90 px-7 py-3 text-sm font-semibold no-underline hover:border-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Columna de imagen */}
        <div className="col-span-1 lg:col-span-6 mt-10 lg:pt-6 xl:pt-8 flex justify-center order-first md:order-none">
          <div className="mx-auto w-full max-w-[280px] sm:max-w-[360px] md:max-w-[520px] lg:max-w-[580px] xl:max-w-[540px] 2xl:max-w-[620px]">
            <Image
              src="/logo1.png" // Logo real en /public/logo1.png
              alt="Logo LEM-BOX"
              width={600}
              height={400}
              className="mx-auto h-auto w-auto max-w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
