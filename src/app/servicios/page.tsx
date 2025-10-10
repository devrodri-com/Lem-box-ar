// src/app/servicios/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | LEM-BOX",
  description:
    "Servicios logísticos integrales en EE.UU. y envíos internacionales. Infraestructura en Miami, servicios personalizados, fulfillment 3PL y despachos a Argentina y dentro de EE.UU.",
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
              <li>• Casillero privado identificado con número exclusivo</li>
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
              <li>• Consolidación automática por cliente o destino</li>
              <li>• Reempaque optimizado para reducir volumen y peso, o mejorar presentación</li>
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
              Despachos adaptados a tu mercado. Llegamos a tus clientes dentro y fuera de EE.UU. sin fricción.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="mb-3 h-px w-10 bg-emerald-300/20"></div>
            <ul className="space-y-2 text-sm leading-relaxed text-emerald-100/85">
              <li>• Envíos semanales a Argentina, sin mínimos de carga</li>
              <li>• Entregas rápidas en todo EE.UU. con tarifas competitivas</li>
              <li>• Logística inversa: devoluciones o reenvíos a proveedores o terceros</li>
              <li>• Flujo de trabajo ajustado a cada cliente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tabla SLA */}
      <section className="py-14 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Niveles de servicio (SLA)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-emerald-200/80 border-b border-white/10">
                  <th scope="col" className="py-3 pr-4 w-[22%]">Servicio</th>
                  <th scope="col" className="py-3 pr-4 w-[22%]">Cobertura</th>
                  <th scope="col" className="py-3 pr-4 w-[18%]">SLA</th>
                  <th scope="col" className="py-3 pr-4 w-[18%]">Cutoff</th>
                  <th scope="col" className="py-3 w-[20%]">Seguimiento</th>
                </tr>
              </thead>
              <tbody className="text-emerald-100/80">
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Recepción</td>
                  <td className="py-3 pr-4">Miami warehouse</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">24-48h</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">Lunes a Viernes</td>
                  <td className="py-3">Foto + registro en sistema</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Consolidación</td>
                  <td className="py-3 pr-4">Clientes con múltiples envíos</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">48h</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">Previo a cutoff aéreo</td>
                  <td className="py-3">Etiqueta + guía única</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Envíos a Argentina</td>
                  <td className="py-3 pr-4">A todo el país</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">Entrega estimada: 4 días hábiles desde cutoff</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">Jueves 15h</td>
                  <td className="py-3">Tracking online</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4">Fulfillment e‑commerce</td>
                  <td className="py-3 pr-4">EE.UU. doméstico</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">Same/next day</td>
                  <td className="py-3 pr-4 font-[tabular-nums]">Orden confirmada</td>
                  <td className="py-3">Tracking carrier</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-emerald-100/60">
              Operamos con vuelos semanales a Argentina: Sujeto a disponibilidad y condiciones operativas.
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
              href="https://lem-box.com/Tracking/web/#/register"
              data-umami-event="cta-servicios-register"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500/90 px-5 py-3 text-sm font-semibold text-[#02120f] hover:bg-emerald-400 transition-colors"
            >
              Crear cuenta gratis
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
