import { TRACKING_STATES } from "@/lib/content";
import styles from "@/components/route-foundation.module.css";

export default function RouteInstrument() {
  return (
    <figure
      className={styles.instrument}
      role="img"
      aria-label="Ruta operativa de Miami a Argentina con los estados recibido, consolidado, en tránsito y en destino"
    >
      <div className={styles.instrumentTopline} aria-hidden="true">
        <span>Origen <strong>Miami</strong></span>
        <span>Destino <strong>Argentina</strong></span>
      </div>

      <svg
        className={styles.instrumentSvg}
        viewBox="0 0 620 330"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="var(--brand-border)" strokeWidth="1">
          <path d="M22 62H598" />
          <path d="M22 165H598" />
          <path d="M22 268H598" />
          <path d="M108 24V306" strokeDasharray="2 8" />
          <path d="M514 24V306" strokeDasharray="2 8" />
        </g>

        <path
          d="M84 88C206 42 394 67 520 255"
          fill="none"
          stroke="var(--brand-border-strong)"
          strokeDasharray="3 8"
          strokeLinecap="round"
          strokeWidth="1.25"
        />
        <path
          d="M84 88C206 42 394 67 520 255"
          fill="none"
          stroke="var(--brand-secondary-on-dark)"
          strokeLinecap="round"
          strokeWidth="3"
        />

        <g fill="var(--brand-ink)" stroke="var(--brand-secondary-on-dark)" strokeWidth="3">
          <circle cx="92" cy="85" r="8" />
          <circle cx="224" cy="59" r="8" />
          <circle cx="398" cy="112" r="8" />
          <circle cx="515" cy="247" r="8" fill="var(--brand-secondary-on-dark)" />
        </g>

        <g stroke="var(--brand-text)" strokeWidth="2">
          <path d="M72 64V110" />
          <path d="M492 268H540" />
        </g>
        <g fill="var(--brand-secondary-on-dark)">
          <rect x="68" y="60" width="8" height="3" />
          <rect x="536" y="264" width="8" height="3" />
        </g>
      </svg>

      <ol className={styles.stateLegend} aria-hidden="true">
        {TRACKING_STATES.map((state) => (
          <li className={styles.stateLegendItem} key={state.id}>{state.label}</li>
        ))}
      </ol>

      <figcaption className={styles.instrumentBottomline}>
        <span>Seguimiento por estados</span>
        <span>Una operación conectada</span>
      </figcaption>
    </figure>
  );
}
