// src/app/privacidad/page.tsx
import type { Metadata } from "next";
import { reciprocalAlternates, regionalOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Privacidad | LEM-BOX",
  description:
    "Conocé cómo LEM-BOX protege y utiliza tus datos personales. Transparencia y seguridad en la gestión de tu información.",
  robots: { index: true },
  alternates: reciprocalAlternates("/privacidad"),
  openGraph: regionalOpenGraph("/privacidad"),
};

export default function PrivacidadPage() {
  return (
    <main className="band text-brandtext" aria-labelledby="privacidad-title">
      <section className="relative scroll-mt-24 section-divider pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h1 className="h-sub" id="privacidad-title">
            Política de Privacidad
          </h1>
          <p className="mt-4 lede max-w-3xl">
            En LEM-BOX valoramos y protegemos tu privacidad. Esta política explica cómo recopilamos, utilizamos y resguardamos tu información personal.
          </p>

          <div className="mt-10 space-y-10 body-copy">
            <section>
              <h2 className="h-card">1. Información que recolectamos</h2>
              <div className="eyebrow-rule mt-2"></div>
              <ul className="list-disc list-inside legal-list mt-2 space-y-1">
                <li>Nombre completo, documento de identidad y datos de contacto.</li>
                <li>Información de registro de cuenta (usuario y credenciales de acceso en forma segura).</li>
                <li>Datos operativos de los paquetes y cargas recibidos, incluidos el nombre, el tracking, las fotografías del contenido y de la etiqueta de llegada, y los datos personales visibles en esa etiqueta, que pueden corresponder al usuario o a terceros vinculados con el envío.</li>
                <li>Actividad de navegación en nuestro sitio (páginas visitadas, búsquedas, IP, navegador).</li>
                <li>Correspondencia enviada por email, WhatsApp u otros canales.</li>
              </ul>
            </section>

            <section>
              <h2 className="h-card">2. Uso de la información</h2>
              <div className="eyebrow-rule mt-2"></div>
              <ul className="list-disc list-inside legal-list mt-2 space-y-1">
                <li>Procesar cargas y coordinar su entrega.</li>
                <li>Gestionar direcciones de recepción, consolidaciones y almacenaje.</li>
                <li>Enviar notificaciones sobre estado de envíos, facturación o soporte.</li>
                <li>Comunicar promociones y novedades (opcional).</li>
                <li>Cumplir con obligaciones legales y regulatorias.</li>
              </ul>
            </section>

            <section>
              <h2 className="h-card">3. Confidencialidad y protección</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Los datos de los usuarios se tratan de forma confidencial y con medidas de seguridad técnicas y administrativas.
                No vendemos ni alquilamos información personal. Solo compartimos datos cuando es necesario para operar nuestros
                servicios, cumplir con normativas legales o resolver disputas.
              </p>
            </section>

            <section>
              <h2 className="h-card">4. Almacenamiento y plazos</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Los paquetes pueden permanecer almacenados por un máximo de 90 días corridos desde su recepción en Miami. Vencido ese plazo, LEM-BOX podrá notificar al usuario para que coordine su despacho, retiro o devolución y aplicar el procedimiento previsto en los Términos y Condiciones y la normativa aplicable. El vencimiento del plazo no implica abandono automático. Los datos personales se conservan mientras exista una relación comercial o durante los plazos exigidos por la normativa aplicable.
              </p>
            </section>

            <section>
              <h2 className="h-card">5. Derechos del usuario</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                El usuario puede acceder, actualizar o rectificar sus datos, solicitar la baja de su cuenta o pedir la exclusión de listas
                de comunicaciones comerciales. Para ejercer estos derechos puede escribir a{" "}
                <a href="mailto:info@lem-box.com" className="link-inline fx">
                  info@lem-box.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="h-card">6. Seguridad</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Aplicamos estándares de la industria para proteger la información personal. LEM-BOX no almacena contraseñas en texto plano; utilizamos hashing seguro y controles de acceso y cifrado TLS en tránsito. Sin embargo, ningún sistema es infalible y no podemos garantizar seguridad absoluta frente a accesos no autorizados.
              </p>
            </section>

            <section>
              <h2 className="h-card">7. Menores de edad</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Nuestros servicios están destinados a personas con capacidad legal para contratar. Los menores solo podrán registrarse con
                consentimiento de sus padres o tutores.
              </p>
            </section>

            <section>
              <h2 className="h-card">8. Modificaciones</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                LEM-BOX podrá actualizar esta política y publicará los cambios en este sitio con la fecha de última modificación.
              </p>
            </section>

            <section>
              <h2 className="h-card">9. Contacto</h2>
              <div className="eyebrow-rule mt-2"></div>
              <p>
                Para dudas o reclamos relacionados con privacidad de datos, escribinos a{" "}
                <a href="mailto:info@lem-box.com" className="link-inline fx">
                  info@lem-box.com
                </a>.
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
