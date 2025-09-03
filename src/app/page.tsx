// src/app/page.tsx

import { headers } from "next/headers";
import { getCountryFromHost } from "@/lib/country";
import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import InfoBar from "@/components/InfoBar";
import InfoCardsGrid from "@/components/InfoCardsGrid";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const country = getCountryFromHost(host);
  const content = getContent(country);

  return (
    <main>
      <Hero />
      <InfoBar />

      <AboutSection />

      <section id="beneficios" className="py-16 md:py-24 bg-[#02120f]" style={{ scrollMarginTop: "var(--nav-h, 80px)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-3">
            <p
              className="text-[12px] uppercase tracking-[0.18em] text-emerald-200/70"
              aria-label="Etiqueta de sección: Beneficios"
            >
              Beneficios
            </p>
            <div className="mt-2 h-px w-10 bg-emerald-300/25" aria-hidden />
          </div>
          <h2 className="text-4xl md:text-5xl tracking-tight font-semibold text-white relative z-10">
            ¿Por qué elegirnos?
          </h2>
          <div className="mt-10">
            <InfoCardsGrid
              variant="media"
              items={(content.benefits as any).map((b: any, idx: number) => ({
                ...b,
                imageSrc: `/media/beneficios/${idx + 1}.webp`,
              }))}
            />
          </div>
        </div>
      </section>

      <HowItWorks />

      <ContactSection />
    </main>
  );
}