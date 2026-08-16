type Step = {
  id: number;
  title: string;
  desc: string;
};

const steps: Step[] = [
  { id: 1, title: "Consultá antes de comprar", desc: "Confirmá que el producto puede enviarse y conocé las condiciones." },
  { id: 2, title: "Usá tu dirección en Miami", desc: "Enviá la compra a la dirección de recepción indicada." },
  { id: 3, title: "Registramos el paquete", desc: "Cargamos fotos del contenido y la etiqueta, tu nombre y el tracking." },
  { id: 4, title: "Consolidamos y reempacamos", desc: "Ambos servicios están incluidos según las necesidades de la operación." },
  { id: 5, title: "Despachamos semanalmente", desc: "Actualizamos los estados desde recibido hasta en destino." },
  { id: 6, title: "Coordinamos en Argentina", desc: "Acordamos entrega, retiro, agencia o transporte según cada caso." },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative bg-[#02120f] text-[#e6f6f1] border-t border-white/5"
      style={{ scrollMarginTop: "var(--nav-h, 80px)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-3">
          <p
            className="text-[12px] uppercase tracking-[0.18em] text-emerald-200/70"
            aria-label="Etiqueta de sección: Cómo funciona"
          >
            Cómo funciona
          </p>
          <div className="mt-2 h-px w-10 bg-emerald-300/25" aria-hidden />
        </div>

        <h2 id="como-funciona-title" className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          Tu envío en 6 pasos claros
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] sm:text-base text-emerald-100/85 leading-relaxed md:leading-7">
          Información clara para coordinar cada etapa.
        </p>

        <ol
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-6 items-stretch"
          aria-describedby="como-funciona-title"
        >
          {steps.map((step, idx) => (
            <li
              key={step.id}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.05] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-[transform,box-shadow] duration-200 hover:translate-y-[-0.5px] focus:outline-none focus:ring-2 focus:ring-emerald-300/40 min-h-[130px] backdrop-saturate-150 hover:border-emerald-400/35"
              tabIndex={0}
              aria-label={`${idx + 1}. ${step.title}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-transparent">
                  <span className="text-[14.5px] font-medium text-white">{idx + 1}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-emerald-100/90">{step.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex">
          <a
            href="https://portal.lem-box.com/registro"
            className="mx-auto inline-flex items-center justify-center rounded-xl bg-emerald-500/90 px-5 py-3 text-sm font-semibold text-[#02120f] hover:bg-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02120f]"
            aria-label="Crear cuenta en LEM-BOX"
            data-umami-event="cta-howitworks"
          >
            Activá tu dirección
          </a>
        </div>

        <p className="mt-4 text-center text-[13.5px] md:text-[14px] text-emerald-100/70">
          Una salida semanal • Seguimiento por estados • Soporte humano
        </p>

        <p className="sr-only">Lista de pasos del proceso de envío con soporte por WhatsApp.</p>
      </div>
    </section>
  );
}
