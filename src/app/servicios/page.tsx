// src/app/servicios/page.tsx
import type { Metadata } from "next";
import { reciprocalAlternates, regionalOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios | LEM-BOX",
  description:
    "Servicios logísticos integrales en EE.UU. y envíos internacionales. Infraestructura en Miami, servicios personalizados, fulfillment 3PL y despachos a Argentina y dentro de EE.UU.",
  alternates: reciprocalAlternates("/servicios"),
  openGraph: regionalOpenGraph("/servicios"),
};

export default function ServiciosPage() {
  return (
    <main className="bg-[#02120f] text-[#e6f6f1]">
      {/* Hero */}
      <section className="relative scroll-mt-24 border-b border-white/5 pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 text-center">
          <div className="mb-3">
            <p className="text-[12px] uppercase tracking-[0.18em] text-emerald-200/70">
              Servicios
            </p>
            <div className="mt-2 h-px w-10 bg-emerald-300/25 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Servicios logísticos integrales en EE.UU. y envíos internacionales
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-emerald-100/80">
            Desde nuestro hub en Miami, ofrecemos soluciones de almacenamiento, fulfillment, consolidación y logística personalizada para tu negocio.
          </p>
        </div>
      </section>

      {/* Bloque 1 – Infraestructura en Miami */}
      <section className="py-14 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Infraestructura en Miami
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-emerald-100/80 max-w-prose">
              Tu centro logístico en el corazón de EE.UU. Nuestro almacén en Miami es el punto de partida para tus operaciones internacionales.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="mb-3 h-px w-10 bg-emerald-300/20"></div>
            <ul className="space-y-2 text-sm leading-relaxed text-emerald-100/85">
              <li>• Recepción de paquetería y carga comercial</li>
              <li>• Dirección de recepción indicada según cada operación</li>
              <li>• Entrega directa a tu propio agente si lo preferís</li>
              <li>• Espacios adaptables según el volumen y tipo de mercancía</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bloque 2 – Servicios logísticos personalizados */}
      <section className="py-14 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Servicios logísticos personalizados
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-emerald-100/80 max-w-prose">
              Flexibilidad y control en cada envío. Adaptamos la logística a tu modelo de negocio para optimizar tiempos y costos.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="mb-3 h-px w-10 bg-emerald-300/20"></div>
            <ul className="space-y-2 text-sm leading-relaxed text-emerald-100/85">
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
      <section className="py-14 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Fulfillment para e‑commerce (3PL)
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-emerald-100/80 max-w-prose">
              Soluciones para sellers de Amazon, Shopify, Etsy y más. Convertimos nuestro depósito en tu centro de fulfillment.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="mb-3 h-px w-10 bg-emerald-300/20"></div>
            <ul className="space-y-2 text-sm leading-relaxed text-emerald-100/85">
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
      <section className="py-14 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Envíos internacionales y domésticos
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-emerald-100/80 max-w-prose">
              Coordinamos cada operación según su destino y sus condiciones.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="mb-3 h-px w-10 bg-emerald-300/20"></div>
            <ul className="space-y-2 text-sm leading-relaxed text-emerald-100/85">
              <li>• Una salida semanal a Argentina, con cierre el jueves a las 12 PM, hora de Miami</li>
              <li>• Cobertura en todo Argentina mediante entrega, retiro, Andreani, Vía Cargo, OCA, transporte privado u otra alternativa acordada</li>
              <li>• Seguimiento por estados: recibido, consolidado, en tránsito y en destino</li>
              <li>• Cotización según la operación, sin mínimo comercial fijo</li>
              <li>• Consulta previa para confirmar el producto y las condiciones de envío</li>
              <li>• Entregas rápidas en todo EE.UU. con tarifas competitivas</li>
              <li>• Logística inversa: devoluciones o reenvíos a proveedores o terceros</li>
              <li>• Flujo de trabajo ajustado a cada cliente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Referencia operativa */}
      <section className="py-14 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Referencia operativa
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-emerald-200/80 border-b border-white/10">
                  <th scope="col" className="py-3 pr-4 w-[24%]">Etapa</th>
                  <th scope="col" className="py-3 pr-4 w-[48%]">Cómo funciona</th>
                  <th scope="col" className="py-3 w-[28%]">Referencia</th>
                </tr>
              </thead>
              <tbody className="text-emerald-100/80">
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Recepción en Miami</td>
                  <td className="py-3 pr-4">Foto del contenido y de la etiqueta, nombre y tracking visible</td>
                  <td className="py-3">Se registra en el sistema</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Consolidación y reempaque</td>
                  <td className="py-3 pr-4">Incluidos según las necesidades de la operación</td>
                  <td className="py-3">Antes del despacho</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Salida a Argentina</td>
                  <td className="py-3 pr-4">Una salida semanal</td>
                  <td className="py-3">Cierre jueves 12 PM, hora de Miami</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Seguimiento</td>
                  <td className="py-3 pr-4">Recibido, consolidado, en tránsito y en destino</td>
                  <td className="py-3">Se actualiza por estados, sin actualización continua</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Coordinación en Argentina</td>
                  <td className="py-3 pr-4">Entrega, retiro, agencia o transporte acordado</td>
                  <td className="py-3">Normalmente comienza entre martes y miércoles de la semana siguiente</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-emerald-100/60">
              Después del cierre se despacha y se realizan controles. La referencia de martes o miércoles no es una garantía: puede variar por controles, condiciones operativas y disponibilidad, y requiere coordinación individual.
            </p>
          </div>
        </div>
      </section>

      {/* Franja aspiracional */}
      <section className="py-12 border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-[15px] leading-relaxed text-emerald-100/85">
            Tu socio ideal en EE.UU.: mientras nosotros gestionamos tu carga, vos podés dedicarte a maximizar tus ventas.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-white">
            ¿Listo para optimizar tu logística?
          </h2>
          <p className="mt-3 text-[15px] text-emerald-100/80 leading-relaxed">
            Con LEM-BOX tenés un socio logístico en Miami para crecer en Argentina y EE.UU.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://portal.lem-box.com/registro"
              data-umami-event="cta-servicios-register"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500/90 px-5 py-3 text-sm font-semibold text-[#02120f] hover:bg-emerald-400 transition-colors"
            >
              Crear cuenta
            </a>
            <a
              href="https://wa.me/17544653318"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="cta-servicios-whatsapp"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-300/30 bg-transparent px-5 py-3 text-sm font-medium text-emerald-100 hover:border-emerald-300/50 hover:bg-emerald-400/5 transition-colors"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
