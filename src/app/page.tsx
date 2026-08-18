// src/app/page.tsx

import Hero from "@/components/Hero";
import InfoBar from "@/components/InfoBar";
import BenefitModules from "@/components/benefits/BenefitModules";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <main>
      <Hero />
      <InfoBar />

      <AboutSection />
      <BenefitModules />
      <HowItWorks />
      <ContactSection />
    </main>
  );
}
