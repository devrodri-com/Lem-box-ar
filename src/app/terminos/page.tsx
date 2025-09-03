// src/app/terminos/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | LEM-BOX",
  description:
    "Condiciones de uso de LEM-BOX. Reglas de registro, uso del servicio, limitaciones de responsabilidad y enlaces a terceros.",
  robots: { index: true },
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <main className="bg-[#02120f] text-[#e6f6f1]" aria-labelledby="terminos-title">
      <section className="relative scroll-mt-24 border-b border-white/5 pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h1 id="terminos-title" className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-emerald-100/80 max-w-3xl">
            Este documento establece los términos aplicables al uso del sitio y de los servicios de LEM-BOX. Al acceder o utilizar
            nuestros servicios, el usuario acepta estas condiciones.
          </p>

          <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-emerald-100/85">
            <section>
              <h2 className="text-xl font-semibold text-white">1. Aceptación de los Términos</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <p>
                El uso del sitio y de los servicios de LEM-BOX implica la aceptación plena de estos Términos y de la{" "}
                <a href="/privacidad" className="underline hover:text-white">Política de Privacidad</a>.
                Si el usuario no está de acuerdo, deberá abstenerse de utilizar el servicio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">2. Registro de Usuario</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <ul className="list-disc list-inside marker:text-emerald-300/70 mt-2 space-y-1">
                <li>El registro requiere datos personales exactos, completos y actualizados.</li>
                <li>Cada usuario obtiene una dirección en Miami única e intransferible.</li>
                <li>La cuenta es personal e intransferible; está prohibido tener múltiples cuentas.</li>
                <li>El usuario es responsable por la confidencialidad de sus credenciales y por toda actividad de su cuenta.</li>
                <li>El usuario debe notificar de inmediato cualquier uso no autorizado.</li>
                <li>LEM-BOX puede rechazar o cancelar registros ante incumplimientos o inconsistencias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">3. Uso de los Servicios</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <ul className="list-disc list-inside marker:text-emerald-300/70 mt-2 space-y-1">
                <li>Los servicios incluyen almacenaje, consolidación y envío de mercancías.</li>
                <li>El usuario es responsable por la licitud del contenido de sus envíos y por contar con documentación válida.</li>
                <li>Está prohibido enviar bienes ilícitos, peligrosos o restringidos por normativa aduanera o de transporte.</li>
                <li>LEM-BOX puede inspeccionar paquetes cuando así lo requieran autoridades competentes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4. Modificaciones de estos Términos</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <p>
                LEM-BOX podrá actualizar estos Términos. Las modificaciones serán publicadas en el sitio y entrarán en vigencia desde
                su publicación. Si el usuario no acepta las modificaciones, deberá comunicarlo y cerrar su cuenta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">5. Enlaces a sitios de terceros</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <p>
                El sitio puede contener enlaces a páginas de terceros. LEM-BOX no controla ni es responsable por sus contenidos o políticas.
                El uso de sitios enlazados es bajo exclusivo riesgo del usuario.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">6. Protección de datos</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <p>
                Los datos personales se tratan conforme a la{" "}
                <a href="/privacidad" className="underline hover:text-white">Política de Privacidad</a>. Implementamos medidas de seguridad
                y no almacenamos contraseñas en texto plano.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">7. Limitación de responsabilidad</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <ul className="list-disc list-inside marker:text-emerald-300/70 mt-2 space-y-1">
                <li>LEM-BOX no es responsable por retrasos, daños o pérdidas causados por terceros, aduanas o fuerza mayor.</li>
                <li>No respondemos por información inexacta proporcionada por los usuarios.</li>
                <li>No garantizamos disponibilidad continua del sitio; pueden existir interrupciones técnicas.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">8. Legislación aplicable</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <p>
                Estos Términos se rigen por la legislación aplicable y los tribunales competentes del lugar donde LEM-BOX presta
                el servicio o donde se entregue la mercancía, según corresponda.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">9. Contacto</h2>
              <div className="mt-2 h-px w-10 bg-white/10"></div>
              <p>
                Para consultas relacionadas con estos Términos, escribinos a{" "}
                <a href="mailto:info@lem-box.com" className="underline hover:text-white">info@lem-box.com</a>.
              </p>
            </section>

            <p className="text-xs text-emerald-100/60 mt-8">
              Última actualización: {new Date().toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
