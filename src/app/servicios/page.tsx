// src/app/servicios/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { reciprocalAlternates, regionalOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios logísticos desde Miami",
  description:
    "Servicios logísticos integrales en EE.UU. y envíos internacionales. Infraestructura en Miami, servicios personalizados, fulfillment 3PL y despachos a Argentina y dentro de EE.UU.",
  alternates: reciprocalAlternates("/servicios"),
  openGraph: regionalOpenGraph("/servicios"),
};

export default function ServiciosPage() {
  return (
    <main className="band text-brandtext">
      {/* Hero */}
      <section className="relative scroll-mt-24 section-divider pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 text-center">
          <div className="mb-3">
            <p className="eyebrow eyebrow-center">
              Servicios
            </p>
            <div className="eyebrow-rule mx-auto" />
          </div>
          <h1 className="h-display">
            Servicios logísticos integrales en EE.UU. y envíos internacionales
          </h1>
          <p className="mt-4 max-w-2xl mx-auto lede">
            Desde nuestro hub en Miami, ofrecemos soluciones de almacenamiento, fulfillment, consolidación y logística personalizada para tu negocio.
          </p>
        </div>
      </section>

      {/* Bloque 1 – Infraestructura en Miami */}
      <section className="py-14 sm:py-16 section-divider">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="h-sub">
              Infraestructura en Miami
            </h2>
            <p className="mt-3 body-copy max-w-prose">
              Tu centro logístico en el corazón de EE.UU. Nuestro almacén en Miami es el punto de partida para tus operaciones internacionales.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="eyebrow-rule mb-3 mt-0"></div>
            <ul className="space-y-2 body-small">
              <li>• Recepción de paquetería y carga comercial</li>
              <li>• Dirección de recepción indicada según cada operación</li>
              <li>• Entrega directa a tu propio agente si lo preferís</li>
              <li>• Espacios adaptables según el volumen y tipo de mercancía</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bloque 2 – Servicios logísticos personalizados */}
      <section className="py-14 sm:py-16 section-divider">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="h-sub">
              Servicios logísticos personalizados
            </h2>
            <p className="mt-3 body-copy max-w-prose">
              Flexibilidad y control en cada envío. Adaptamos la logística a tu modelo de negocio para optimizar tiempos y costos.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="eyebrow-rule mb-3 mt-0"></div>
            <ul className="space-y-2 body-small">
              <li>• Consolidación incluida según las necesidades de la operación</li>
              <li>• Reempaque incluido según las necesidades de la operación</li>
              <li>• Etiquetado personalizado con códigos de barras o branding propio</li>
              <li>• Control de calidad básico: verificación visual del estado del producto</li>
              <li>• Revisión documental: facturas comerciales, valores FOB y requisitos aduaneros</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bloque 3 – Fulfillment para e‑commerce (3PL) */}
      <section id="fulfillment" className="scroll-mt-24 py-14 sm:py-16 section-divider">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="h-sub">
              Fulfillment para e‑commerce (3PL)
            </h2>
            <p className="mt-3 body-copy max-w-prose">
              Soluciones para sellers de Amazon, Shopify, Etsy y más. Convertimos nuestro depósito en tu centro de fulfillment.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="eyebrow-rule mb-3 mt-0"></div>
            <ul className="space-y-2 body-small">
              <li>• Almacenamiento y gestión de inventario</li>
              <li>• Recepción y procesamiento de pedidos</li>
              <li>• Envío unitario directo al cliente final en EE.UU</li>
              <li>• Procesamiento de devoluciones y reenvíos</li>
              <li>• Reporte mensual (PDF/Excel) con movimientos, costos y tracking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bloque 4 – Envíos internacionales y domésticos */}
      <section className="py-14 sm:py-16 section-divider">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="h-sub">
              Envíos internacionales y domésticos
            </h2>
            <p className="mt-3 body-copy max-w-prose">
              Coordinamos cada operación según su destino y sus condiciones.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="eyebrow-rule mb-3 mt-0"></div>
            <ul className="space-y-2 body-small">
              <li>• Una salida semanal a Argentina, con cierre el jueves a las 12 PM, hora de Miami</li>
              <li>• Cobertura en todo el país mediante entrega, retiro, Andreani, Vía Cargo, OCA, transporte privado u otra alternativa acordada</li>
              <li>• Seguimiento por estados: recibido, consolidado, en tránsito y en destino</li>
              <li>• Cotización según la operación, sin mínimo comercial fijo</li>
              <li>• Consulta previa para confirmar el producto y las condiciones de envío</li>
              <li>• Envíos dentro de EE.UU. coordinados según las condiciones de cada operación</li>
              <li>• Logística inversa: devoluciones o reenvíos a proveedores o terceros</li>
              <li>• Flujo de trabajo ajustado a cada cliente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* El proceso vive en una única fuente operativa. */}
      <section className="py-14 sm:py-16 section-divider">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <p className="eyebrow">Ruta operativa</p>
            <h2 className="h-sub mt-3">El recorrido completo, etapa por etapa</h2>
            <p className="mt-3 body-copy max-w-2xl">
              La recepción, consolidación, salida, seguimiento y coordinación final se explican en una sola guía, con sus referencias y condiciones.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/como-funciona"
              className="cta cta-secondary fx"
              data-analytics-event="services-process"
              data-analytics-surface="services-process-teaser"
              data-analytics-destination="/como-funciona"
            >
              Ver cómo funciona
            </Link>
          </div>
        </div>
      </section>

      {/* Franja aspiracional */}
      <section className="py-12 section-divider">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="lede">
            Tu socio ideal en EE.UU.: mientras nosotros gestionamos tu carga, vos podés dedicarte a maximizar tus ventas.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="h-sub">
            ¿Listo para optimizar tu logística?
          </h2>
          <p className="mt-3 body-copy">
            Con LEM-BOX tenés un socio logístico en Miami para crecer en Argentina y EE.UU.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://portal.lem-box.com/registro"
              data-analytics-event="services-register"
              data-analytics-surface="services-final"
              data-analytics-destination="portal-registro"
              className="cta cta-primary transition-colors fx-on-primary"
            >
              Crear cuenta
            </a>
            <a
              href="https://wa.me/17544653318"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="services-whatsapp"
              data-analytics-surface="services-final"
              data-analytics-destination="whatsapp"
              className="cta cta-operational-outline transition-colors fx"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
