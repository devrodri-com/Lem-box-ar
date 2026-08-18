// src/components/ContactSection.tsx

import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-16 md:py-24 band text-brandtext"
      style={{ scrollMarginTop: "var(--nav-h, 80px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <div className="mb-3">
            <p className="eyebrow">Contacto</p>
            <div className="eyebrow-rule" />
          </div>
          <h2 className="h-section">Hablemos</h2>
          <p className="mt-3 max-w-prose body-copy">
            Respondemos en horas hábiles. WhatsApp o email.
          </p>
          <dl className="mt-6 space-y-2 body-copy">
            <div>
              <dt className="inline font-medium">WhatsApp: </dt>
              <dd className="inline">
                <a
                  href="https://wa.me/17544653318"
                  className="link-inline fx"
                  rel="noopener noreferrer"
                  target="_blank"
                  data-analytics-event="contact-details-whatsapp"
                  data-analytics-surface="home-contact"
                  data-analytics-destination="whatsapp"
                >
                  +1 (754) 465 3318
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Email: </dt>
              <dd className="inline">
                <a href="mailto:info@lem-box.com" className="link-inline fx">info@lem-box.com</a>
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">Dirección Miami: </dt>
              <dd className="inline meta">20200 NW 2nd Ave, Unit 108, Miami, FL 33169</dd>
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
