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
      className="relative band text-brandtext"
      style={{ scrollMarginTop: "var(--nav-h, 80px)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-3">
          <p
            className="eyebrow"
            aria-label="Etiqueta de sección: Cómo funciona"
          >
            Cómo funciona
          </p>
          <div className="eyebrow-rule" aria-hidden />
        </div>

        <h2 id="como-funciona-title" className="h-section">
          Tu envío en 6 pasos claros
        </h2>
        <p className="mt-3 max-w-2xl body-copy">
          Información clara para coordinar cada etapa.
        </p>

        <ol
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-6 items-stretch"
          aria-describedby="como-funciona-title"
        >
          {steps.map((step, idx) => (
            <li
              key={step.id}
              className="group relative overflow-hidden panel step-card p-6 transition-[transform,box-shadow] duration-200 hover:translate-y-[-0.5px] fx-always min-h-[130px]"
              tabIndex={0}
              aria-label={`${idx + 1}. ${step.title}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center step-badge">
                  <span className="step-number">{idx + 1}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="h-card">{step.title}</h3>
                  <p className="mt-1 body-small">{step.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex">
          <a
            href="https://portal.lem-box.com/registro"
            className="mx-auto cta cta-primary transition-colors fx-on-primary"
            aria-label="Crear cuenta en LEM-BOX"
            data-umami-event="cta-howitworks"
          >
            Activá tu dirección
          </a>
        </div>

        <p className="mt-4 text-center meta">
          Una salida semanal • Seguimiento por estados • Soporte humano
        </p>

        <p className="sr-only">Lista de pasos del proceso de envío con soporte por WhatsApp.</p>
      </div>
    </section>
  );
}
