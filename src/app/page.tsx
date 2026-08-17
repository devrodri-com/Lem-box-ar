// src/app/page.tsx

import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import InfoBar from "@/components/InfoBar";
import InfoCardsGrid from "@/components/InfoCardsGrid";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";


type Benefit = { title: string; description?: string; icon?: string };

export default function Page() {
  const content = getContent();

  return (
    <main>
      <Hero />
      <InfoBar />

      <AboutSection />

      <section id="beneficios" className="py-16 md:py-24 band" style={{ scrollMarginTop: "var(--nav-h, 80px)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-3">
            <p
              className="eyebrow"
              aria-label="Etiqueta de sección: Beneficios"
            >
              Beneficios
            </p>
            <div className="eyebrow-rule" aria-hidden />
          </div>
          <h2 className="h-section relative z-10">
            ¿Por qué elegirnos?
          </h2>
          <div className="mt-10">
            <InfoCardsGrid
              variant="media"
              items={(content.benefits as readonly Benefit[]).map((b, idx) => {
                return {
                  title: String(b.title),
                  description: b.description ?? "",
                  icon: b.icon ?? "",
                  imageSrc: `/media/beneficios/${idx + 1}.webp`,
                };
              })}
            />
          </div>
        </div>
      </section>

      <HowItWorks />

      <ContactSection />
    </main>
  );
}
