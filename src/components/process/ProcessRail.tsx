import Link from "next/link";
import {
  HOME_PROCESS_STEP_IDS,
  PROCESS_STEPS,
  type ProcessStepId,
} from "@/lib/content";
import styles from "@/components/route-foundation.module.css";

const HOME_PROCESS_IDS: ReadonlySet<ProcessStepId> = new Set(HOME_PROCESS_STEP_IDS);
const HOME_PROCESS_STEPS = PROCESS_STEPS.filter((step) => HOME_PROCESS_IDS.has(step.id));

export default function ProcessRail() {
  return (
    <section
      id="como-funciona"
      className={`${styles.processSection} band`}
      aria-labelledby="como-funciona-title"
    >
      <div className={styles.sectionInner}>
        <div className="mb-3">
          <p className="eyebrow">Cómo funciona</p>
          <div className="eyebrow-rule" aria-hidden="true" />
        </div>
        <h2 id="como-funciona-title" className="h-section">
          De Miami a Argentina, en una sola secuencia
        </h2>
        <p className="mt-3 max-w-2xl body-copy">
          Seis momentos para entender el recorrido. La página del proceso explica cada etapa en detalle.
        </p>

        <div className={styles.rail}>
          <div className={styles.railTrack} aria-hidden="true" />
          <ol className={styles.railList}>
            {HOME_PROCESS_STEPS.map((step, index) => (
              <li className={styles.railStep} data-process-node={step.id} key={step.id}>
                <span className={styles.railNode} aria-hidden="true" />
                <span className={styles.railNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.railTitle}>{step.shortTitle}</h3>
                <p className={styles.railSummary}>{step.summary}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.railCtas}>
          <Link
            href="/como-funciona"
            className="cta cta-primary fx-on-primary"
            data-analytics-event="process-cta-full"
            data-analytics-surface="home-proceso"
            data-analytics-destination="/como-funciona"
          >
            Ver el proceso completo
          </Link>
          <a
            href="https://portal.lem-box.com/registro"
            className="cta cta-secondary fx"
            data-analytics-event="process-cta-register"
            data-analytics-surface="home-proceso"
            data-analytics-destination="portal-registro"
          >
            Activá tu dirección
          </a>
        </div>
      </div>
    </section>
  );
}
