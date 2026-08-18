// src/app/terminos/page.tsx
import type { Metadata } from "next";
import { reciprocalAlternates, regionalOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso de LEM-BOX. Reglas de registro, uso del servicio, limitaciones de responsabilidad y enlaces a terceros.",
  robots: { index: true },
  alternates: reciprocalAlternates("/terminos"),
  openGraph: regionalOpenGraph("/terminos"),
};

export default function TerminosPage() {
  return (
    <main className="band text-brandtext" aria-labelledby="terminos-title">
      <section className="relative scroll-mt-24 section-divider pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h1 id="terminos-title" className="h-sub">
            Términos y Condiciones
          </h1>
          <p className="mt-4 lede max-w-3xl">
            Este documento establece los términos aplicables al uso del sitio y de los servicios de LEM-BOX. Al acceder o utilizar
            nuestros servicios, el usuario acepta estas condiciones.
          </p>

          <div className="mt-10 space-y-10 body-copy">
            <section>
              <h2 className="h-card">1. Aceptación de los Términos</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                El uso del sitio y de los servicios de LEM-BOX implica la aceptación plena de estos Términos y de la{" "}
                <a href="/privacidad" className="link-inline fx">Política de Privacidad</a>.
                Si el usuario no está de acuerdo, deberá abstenerse de utilizar el servicio.
              </p>
            </section>

            <section>
              <h2 className="h-card">2. Registro de Usuario</h2>
              <div className="eyebrow-rule mt-2"></div>
              <ul className="list-disc list-inside legal-list mt-2 space-y-1">
                <li>El registro requiere datos personales exactos, completos y actualizados.</li>
                <li>Cada usuario recibe la dirección de recepción en Miami aplicable a su operación.</li>
                <li>La cuenta es personal e intransferible; está prohibido tener múltiples cuentas.</li>
                <li>El usuario es responsable por la confidencialidad de sus credenciales y por toda actividad de su cuenta.</li>
                <li>El usuario debe notificar de inmediato cualquier uso no autorizado.</li>
                <li>LEM-BOX puede rechazar o cancelar registros ante incumplimientos o inconsistencias.</li>
              </ul>
            </section>

            <section>
              <h2 className="h-card">3. Uso de los Servicios</h2>
              <div className="eyebrow-rule mt-2"></div>
              <ul className="list-disc list-inside legal-list mt-2 space-y-1">
                <li>Los servicios incluyen almacenaje, consolidación y envío de mercancías.</li>
                <li>El usuario es responsable por la licitud del contenido de sus envíos y por contar con documentación válida.</li>
                <li>Está prohibido enviar bienes ilícitos, peligrosos o restringidos por normativa aduanera o de transporte.</li>
                <li>Al ingresar un paquete, LEM-BOX podrá abrirlo e inspeccionarlo para documentar la recepción y gestionar la operación. El registro incluye fotografías del contenido y de la etiqueta de llegada, junto con el nombre y el tracking visible, sin perjuicio de las inspecciones adicionales que puedan requerir las autoridades competentes.</li>
              </ul>
            </section>

            <section>
              <h2 className="h-card">4. Almacenamiento y mercadería no retirada</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                El plazo máximo de almacenamiento ordinario es de 90 días corridos desde la recepción de la mercadería en Miami. Vencido ese plazo, LEM-BOX podrá notificar al usuario para que coordine el despacho, retiro o devolución de la mercadería dentro del plazo indicado. Si la mercadería no es retirada, LEM-BOX podrá ejercer los derechos y procedimientos previstos por la normativa aplicable, incluida, cuando corresponda, su venta o disposición con las notificaciones y formalidades legalmente exigidas. El mero vencimiento de los 90 días no implica abandono automático ni autoriza la destrucción inmediata de la mercadería.
              </p>
            </section>

            <section>
              <h2 className="h-card">5. Seguro de la mercadería</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Salvo acuerdo escrito expreso, los servicios de LEM-BOX no incluyen una póliza de seguro sobre la mercadería. Esta aclaración no excluye las obligaciones ni responsabilidades que no puedan limitarse por la normativa aplicable. Antes de comprar o enviar productos de alto valor o que requieran condiciones especiales, el usuario debe consultar su viabilidad y las condiciones de la operación.
              </p>
            </section>

            <section>
              <h2 className="h-card">6. Modificaciones de estos Términos</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                LEM-BOX podrá actualizar estos Términos. Las modificaciones serán publicadas en el sitio y entrarán en vigencia desde
                su publicación. Si el usuario no acepta las modificaciones, deberá comunicarlo y cerrar su cuenta.
              </p>
            </section>

            <section>
              <h2 className="h-card">7. Enlaces a sitios de terceros</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                El sitio puede contener enlaces a páginas de terceros. LEM-BOX no controla ni es responsable por sus contenidos o políticas.
                El uso de sitios enlazados es bajo exclusivo riesgo del usuario.
              </p>
            </section>

            <section>
              <h2 className="h-card">8. Protección de datos</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Los datos personales se tratan conforme a la{" "}
                <a href="/privacidad" className="link-inline fx">Política de Privacidad</a>. Implementamos medidas de seguridad
                y no almacenamos contraseñas en texto plano.
              </p>
            </section>

            <section>
              <h2 className="h-card">9. Limitación de responsabilidad</h2>
              <div className="eyebrow-rule mt-2"></div>
              <ul className="list-disc list-inside legal-list mt-2 space-y-1">
                <li>La responsabilidad por retrasos, daños o pérdidas se determinará según su causa y la normativa aplicable. LEM-BOX podrá quedar eximida únicamente cuando demuestre que la causa le fue totalmente ajena y estuvo fuera de su control razonable, como puede ocurrir ante determinados actos de autoridades, caso fortuito o fuerza mayor. Esta cláusula no limita la responsabilidad por actos u omisiones propios ni las obligaciones que no puedan excluirse por la normativa aplicable, incluso cuando intervengan terceros en la prestación del servicio.</li>
                <li>No respondemos por información inexacta proporcionada por los usuarios.</li>
                <li>No garantizamos disponibilidad continua del sitio; pueden existir interrupciones técnicas.</li>
              </ul>
            </section>

            <section>
              <h2 className="h-card">10. Legislación aplicable</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Estos Términos se rigen por la legislación aplicable y los tribunales competentes del lugar donde LEM-BOX presta
                el servicio o donde se entregue la mercancía, según corresponda.
              </p>
            </section>

            <section>
              <h2 className="h-card">11. Contacto</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Para consultas relacionadas con estos Términos, escribinos a{" "}
                <a href="mailto:info@lem-box.com" className="link-inline fx">info@lem-box.com</a>.
              </p>
            </section>

            <p className="legal-note mt-8">
              Última actualización: 16/8/2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
