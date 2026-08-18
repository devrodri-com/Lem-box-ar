import Link from "next/link";
import { FAQS, PROCESS_STEPS, TRACKING_STATES } from "@/lib/content";
import styles from "@/components/route-foundation.module.css";

function Note({ stepId, children }: { stepId: string; children: string }) {
  const citesTerms = stepId === "recepcion" || stepId === "almacenaje";

  return (
    <p className={styles.detailNote}>
      {children}{" "}
      {citesTerms ? (
        <Link href="/terminos" className="link-inline fx">
          Ver Términos y Condiciones
        </Link>
      ) : null}
    </p>
  );
}

export function ProcessDetail() {
  return (
    <div className={styles.detailLayout}>
      <nav className={styles.processIndex} aria-label="Índice del proceso">
        <p className={styles.processIndexTitle}>El proceso</p>
        <ol className={styles.processIndexList}>
          {PROCESS_STEPS.map((step) => (
            <li key={step.id}>
              <a className={`${styles.processIndexLink} fx`} href={`#${step.id}`}>
                {String(step.number).padStart(2, "0")} · {step.shortTitle}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={styles.detailModules}>
        {PROCESS_STEPS.map((step) => (
          <section
            className={styles.detailModule}
            data-process-detail={step.id}
            id={step.id}
            key={step.id}
            aria-labelledby={`${step.id}-title`}
          >
            <p className={styles.detailNumber}>ETAPA {String(step.number).padStart(2, "0")}</p>
            <h2 id={`${step.id}-title`} className="h-sub mt-2">{step.title}</h2>
            <p className="body-copy mt-3">{step.detail}</p>
            <ul className={styles.proofList} aria-label="Datos de esta etapa">
              {step.proof.map((proof) => <li className={styles.proofItem} key={proof}>{proof}</li>)}
            </ul>
            {step.note ? <Note stepId={step.id}>{step.note}</Note> : null}
          </section>
        ))}
      </div>
    </div>
  );
}

export function StatusDiagram() {
  return (
    <section className={`${styles.wideSection} band`} aria-labelledby="estados-title">
      <div className="mb-3">
        <p className="eyebrow">Seguimiento</p>
        <div className="eyebrow-rule" aria-hidden="true" />
      </div>
      <h2 id="estados-title" className="h-section">Cuatro estados, un mismo recorrido</h2>
      <p className="mt-3 max-w-2xl body-copy">
        Cada estado confirma un momento concreto de la operación y mantiene visible el orden del envío.
      </p>
      <ol className={styles.statusGrid}>
        {TRACKING_STATES.map((state, index) => (
          <li className={styles.statusItem} key={state.id}>
            <p className={styles.statusName}>{String(index + 1).padStart(2, "0")} · {state.label}</p>
            <p className="mt-2 body-small">{state.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProcessFaqTeaser() {
  return (
    <section className={`${styles.wideSection} band`} aria-labelledby="dudas-title">
      <div className="mb-3">
        <p className="eyebrow">Dudas frecuentes</p>
        <div className="eyebrow-rule" aria-hidden="true" />
      </div>
      <h2 id="dudas-title" className="h-section">Antes de coordinar</h2>
      <div className={styles.faqGrid}>
        {FAQS.map((faq) => (
          <article className={styles.faqItem} key={faq.q}>
            <h3>{faq.q}</h3>
            <p className="mt-2 body-small">{faq.a}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 body-copy">
        ¿Tu caso necesita otra respuesta?{" "}
        <Link href="/#contacto" className="link-inline fx">Escribinos desde Contacto</Link>
        {" "}o revisá los{" "}
        <Link href="/servicios" className="link-inline fx">servicios disponibles</Link>.
      </p>
    </section>
  );
}

export function ProcessFinalCta() {
  return (
    <section className={styles.finalSection} aria-labelledby="empezar-title">
      <div className={styles.finalInner}>
        <p className="eyebrow eyebrow-center">Próximo paso</p>
        <h2 id="empezar-title" className="h-section mt-5">Activá tu dirección en Miami</h2>
        <p className="mt-4 body-copy">Creá tu cuenta o consultanos antes de comprar.</p>
        <div className={styles.finalCtas}>
          <a
            href="https://portal.lem-box.com/registro"
            className="cta cta-primary fx-on-primary"
            data-analytics-event="cf-final-cta-register"
            data-analytics-surface="como-funciona-final"
            data-analytics-destination="portal-registro"
          >
            Activá tu dirección
          </a>
          <a
            href="https://wa.me/17544653318"
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta-secondary fx"
            data-analytics-event="cf-final-cta-whatsapp"
            data-analytics-surface="como-funciona-final"
            data-analytics-destination="whatsapp"
          >
            Consultá antes de comprar
          </a>
        </div>
      </div>
    </section>
  );
}
