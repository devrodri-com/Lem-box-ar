// src/components/ContactSection.tsx

import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

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
