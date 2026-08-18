import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import {
  ProcessDetail,
  ProcessFaqTeaser,
  ProcessFinalCta,
  StatusDiagram,
} from "@/components/process/ProcessDetail";
import styles from "@/components/route-foundation.module.css";
import {
  SITE_URL,
  argentinaOnlyAlternates,
  regionalOpenGraph,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cómo funciona un envío desde Miami a Argentina",
  description:
    "Conocé las ocho etapas de un envío con LEM-BOX: consulta, dirección en Miami, recepción, consolidación, despacho, seguimiento, coordinación en Argentina y almacenaje.",
  alternates: argentinaOnlyAlternates("/como-funciona"),
  openGraph: regionalOpenGraph("/como-funciona"),
  robots: { index: true, follow: true },
};

export default function ComoFuncionaPage() {
  return (
    <main className="band text-brandtext">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Cómo funciona",
              item: `${SITE_URL}/como-funciona`,
            },
          ],
        }}
      />
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <nav className={styles.breadcrumb} aria-label="Migas de pan">
            <Link href="/" className="fx">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Cómo funciona</span>
          </nav>
          <p className="eyebrow mt-8">Ruta operativa</p>
          <h1 className={`${styles.pageTitle} h-display`}>
            Cómo funciona un envío desde Miami a Argentina
          </h1>
          <p className={`${styles.pageIntro} lede`}>
            Desde la consulta previa hasta la coordinación final: ocho etapas claras para saber qué ocurre con tu envío y qué información recibís.
          </p>
          <p className="mt-5 body-copy">
            Para operaciones comerciales, también podés revisar nuestros{" "}
            <Link href="/servicios" className="link-inline fx">servicios logísticos</Link>.
          </p>
          <div className={styles.factLine} aria-label="Datos operativos principales">
            <span><strong>Salida</strong> semanal</span>
            <span><strong>Cierre</strong> jueves 12 PM, Miami</span>
            <span><strong>Seguimiento</strong> por cuatro estados</span>
          </div>
        </div>
      </header>
      <ProcessDetail />
      <StatusDiagram />
      <ProcessFaqTeaser />
      <ProcessFinalCta />
    </main>
  );
}
