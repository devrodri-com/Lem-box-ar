import Link from "next/link";
import type { ComponentType } from "react";
import { BENEFITS, type BenefitVisualKey } from "@/lib/content";
import styles from "@/components/route-foundation.module.css";

type VisualProps = { className?: string };

function StatesVisual({ className }: VisualProps) {
  return (
    <svg className={className} viewBox="0 0 240 88" fill="none" aria-hidden="true" focusable="false">
      <path d="M28 44H212" stroke="currentColor" strokeWidth="2" />
      {[28, 88, 152, 212].map((x, index) => (
        <circle key={x} cx={x} cy="44" r="8" fill={index < 2 ? "currentColor" : "var(--brand-surface)"} stroke="currentColor" strokeWidth="2" />
      ))}
      <path d="M28 20V30M88 58V68M152 20V30M212 58V68" stroke="var(--brand-border-strong)" strokeWidth="2" />
    </svg>
  );
}

function ConsolidationVisual({ className }: VisualProps) {
  return (
    <svg className={className} viewBox="0 0 240 88" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
        <path d="M30 29 59 15l29 14-29 14-29-14Z" /><path d="M30 29v28l29 15 29-15V29M59 43v29" />
        <path d="M106 34 128 23l22 11-22 11-22-11Z" /><path d="M106 34v22l22 11 22-11V34M128 45v22" />
        <path d="m166 24 25-12 25 12-25 13-25-13Z" /><path d="M166 24v37l25 13 25-13V24M191 37v37" />
        <path d="M91 45h10M153 45h10" strokeDasharray="3 4" />
      </g>
    </svg>
  );
}

function ReceptionVisual({ className }: VisualProps) {
  return (
    <svg className={className} viewBox="0 0 240 88" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <rect x="38" y="15" width="94" height="58" rx="7" />
        <circle cx="85" cy="44" r="17" /><circle cx="85" cy="44" r="5" fill="currentColor" stroke="none" />
        <path d="M148 23h52M148 37h36M148 51h46M148 65h27" />
        <path d="M50 15 60 6h32l10 9" />
      </g>
    </svg>
  );
}

function WarehouseVisual({ className }: VisualProps) {
  return (
    <svg className={className} viewBox="0 0 240 88" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
        <path d="M22 73V26L63 7l41 19v47M38 73V47h49v26" />
        <path d="M120 24h94M120 49h94M120 73h94M128 16v57M206 16v57" />
        <rect x="139" y="29" width="22" height="15" rx="2" /><rect x="169" y="29" width="28" height="15" rx="2" />
        <rect x="139" y="54" width="31" height="14" rx="2" /><rect x="178" y="54" width="19" height="14" rx="2" />
      </g>
    </svg>
  );
}

function SupportVisual({ className }: VisualProps) {
  return (
    <svg className={className} viewBox="0 0 240 88" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M32 19h112a12 12 0 0 1 12 12v15a12 12 0 0 1-12 12H82L57 73l5-15H32a12 12 0 0 1-12-12V31a12 12 0 0 1 12-12Z" />
        <path d="M174 29h46M174 44h35M174 59h26" />
        <circle cx="57" cy="39" r="4" fill="currentColor" stroke="none" /><circle cx="88" cy="39" r="4" fill="currentColor" stroke="none" /><circle cx="119" cy="39" r="4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const VISUALS = {
  states: StatesVisual,
  consolidation: ConsolidationVisual,
  reception: ReceptionVisual,
  warehouse: WarehouseVisual,
  support: SupportVisual,
} satisfies Record<BenefitVisualKey, ComponentType<VisualProps>>;

export default function BenefitModules() {
  return (
    <section id="beneficios" className={`${styles.benefitSection} band`} aria-labelledby="beneficios-title">
      <div className={styles.sectionInner}>
        <div className="mb-3">
          <p className="eyebrow">Beneficios</p>
          <div className="eyebrow-rule" aria-hidden="true" />
        </div>
        <h2 id="beneficios-title" className="h-section">Una operación que podés entender</h2>
        <p className="mt-3 max-w-2xl body-copy">
          Cada beneficio nace de una parte concreta del recorrido, desde la recepción en Miami hasta la coordinación final.
        </p>

        <div className={styles.benefitGrid} role="list">
          {BENEFITS.map((benefit) => {
            const Visual = VISUALS[benefit.visualKey];
            return (
              <article className={styles.benefitCard} data-benefit-id={benefit.id} key={benefit.id} role="listitem">
                <div className={styles.benefitVisual}><Visual /></div>
                <div className={styles.benefitBody}>
                  <h3 className="h-card">{benefit.title}</h3>
                  <p className={styles.benefitValue}>{benefit.value}</p>
                  <p className="mt-2 body-small">{benefit.description}</p>
                  <Link
                    className={`${styles.benefitLink} fx`}
                    href={benefit.href}
                    data-analytics-event="benefit-link-click"
                    data-analytics-surface="home-beneficios"
                    data-analytics-destination={benefit.href}
                    data-analytics-benefit-id={benefit.id}
                  >
                    {benefit.linkLabel} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
