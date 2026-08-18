import Link from "next/link";
import RouteInstrument from "@/components/route/RouteInstrument";
import styles from "@/components/route-foundation.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Corredor Miami → Argentina</p>
          <h1 id="hero-title" className={`${styles.heroTitle} h-display mt-5`}>
            Envíos desde Miami a Argentina, con cada etapa clara
          </h1>
          <p className="mt-6 lede max-w-[48ch]">
            Recibimos tus compras en Miami, documentamos cada paquete, consolidamos y coordinamos una salida semanal hacia Argentina.
          </p>
          <div className={styles.heroCtas}>
            <a
              href="https://portal.lem-box.com/registro"
              className="cta cta-primary fx-on-primary"
              data-analytics-event="hero-cta-register"
              data-analytics-surface="home-hero"
              data-analytics-destination="portal-registro"
            >
              Activá tu dirección
            </a>
            <Link
              href="/como-funciona"
              className="cta cta-secondary fx"
              data-analytics-event="hero-cta-como-funciona"
              data-analytics-surface="home-hero"
              data-analytics-destination="/como-funciona"
            >
              Ver cómo funciona
            </Link>
          </div>
          <p className={styles.heroProof}>
            <span><strong>Salida</strong> una vez por semana</span>
            <span><strong>Cierre</strong> jueves 12 PM, Miami</span>
          </p>
        </div>

        <RouteInstrument />
      </div>
    </section>
  );
}
