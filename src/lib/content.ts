export type ProcessStepId =
  | "consulta"
  | "direccion"
  | "recepcion"
  | "consolidacion"
  | "despacho"
  | "seguimiento"
  | "argentina"
  | "almacenaje";

export type ProcessStep = {
  id: ProcessStepId;
  number: number;
  shortTitle: string;
  summary: string;
  title: string;
  detail: string;
  proof: readonly string[];
  note?: string;
};

export type TrackingState = {
  id: "recibido" | "consolidado" | "en-transito" | "en-destino";
  label: string;
  description: string;
};

export type BenefitVisualKey =
  | "states"
  | "consolidation"
  | "reception"
  | "warehouse"
  | "support";

export type BenefitItem = {
  id: string;
  title: string;
  value: string;
  description: string;
  visualKey: BenefitVisualKey;
  href: string;
  linkLabel: string;
};

export type FAQItem = { q: string; a: string };

export const TRACKING_STATES = [
  { id: "recibido", label: "Recibido", description: "El paquete llegó al depósito y quedó registrado." },
  { id: "consolidado", label: "Consolidado", description: "Quedó preparado dentro de la operación." },
  { id: "en-transito", label: "En tránsito", description: "Salió de Miami hacia Argentina." },
  { id: "en-destino", label: "En destino", description: "Llegó y comienza la coordinación final." },
] as const satisfies readonly TrackingState[];

/**
 * Única fuente del proceso. La Home toma seis referencias de este arreglo y
 * `/como-funciona` desarrolla los ocho módulos, sin mantener copias paralelas.
 */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: "consulta",
    number: 1,
    shortTitle: "Consultá antes de comprar",
    summary: "Confirmá que el producto puede enviarse.",
    title: "Qué necesitás antes de empezar",
    detail: "Antes de comprar, escribinos para confirmar que el producto puede enviarse y conocer las condiciones de tu operación.",
    proof: ["Consulta previa", "WhatsApp o email"],
  },
  {
    id: "direccion",
    number: 2,
    shortTitle: "Usá tu dirección en Miami",
    summary: "La dirección indicada para tu operación.",
    title: "Tu dirección de recepción en Miami",
    detail: "Usá en la tienda la dirección de recepción en Miami indicada para tu operación, junto con tu nombre tal como fue registrado.",
    proof: ["Indicada según la operación", "Recepción en Miami"],
  },
  {
    id: "recepcion",
    number: 3,
    shortTitle: "Registramos el paquete",
    summary: "Fotos del contenido, etiqueta y tracking visible.",
    title: "Recepción y registro documentados",
    detail: "Cuando llega, registramos fotos del contenido y de la etiqueta de llegada, junto con el nombre y el tracking visible.",
    proof: ["Fotos de contenido y etiqueta", "Registro en el sistema"],
    note: "El paquete puede abrirse e inspeccionarse para documentar la recepción, según los Términos y Condiciones.",
  },
  {
    id: "consolidacion",
    number: 4,
    shortTitle: "Consolidamos y reempacamos",
    summary: "Juntamos compras según la operación.",
    title: "Consolidación y reempaque",
    detail: "Si reunís compras de varias tiendas, las consolidamos en un solo envío y las reempacamos cuando la operación lo requiere.",
    proof: ["Incluidos según la operación", "Varias compras, un envío"],
  },
  {
    id: "despacho",
    number: 5,
    shortTitle: "Despachamos semanalmente",
    summary: "El cierre es el jueves a las 12 PM, hora de Miami.",
    title: "El despacho semanal",
    detail: "Hay una salida semanal hacia Argentina. El cierre de recepción es el jueves a las 12:00 PM, hora de Miami; lo que llega después queda para la salida siguiente.",
    proof: ["Una salida semanal", "Cierre jueves 12 PM, Miami"],
    note: "Después del cierre se realizan el despacho y los controles. Los plazos posteriores varían según la operación y no están garantizados.",
  },
  {
    id: "seguimiento",
    number: 6,
    shortTitle: "Seguimos cada estado",
    summary: "Recibido, consolidado, en tránsito y en destino.",
    title: "Seguimiento por estados",
    detail: "El sistema muestra cuatro hitos concretos de la operación para que sepas en qué punto está tu envío.",
    proof: ["Cuatro estados", "Consulta en el sistema"],
  },
  {
    id: "argentina",
    number: 7,
    shortTitle: "Coordinamos en Argentina",
    summary: "Acordamos entrega, retiro, agencia o transporte.",
    title: "Coordinación en Argentina",
    detail: "Cuando el envío está en destino, acordamos con vos la alternativa aplicable: entrega, retiro, agencia o transporte según cada caso.",
    proof: ["Se acuerda con vos", "Según cada operación"],
  },
  {
    id: "almacenaje",
    number: 8,
    shortTitle: "Almacenamos cuando hace falta",
    summary: "Hasta 90 días corridos desde la recepción.",
    title: "Almacenamiento ordinario",
    detail: "El plazo máximo de almacenamiento ordinario es de 90 días corridos desde la recepción de la mercadería en Miami.",
    proof: ["Hasta 90 días", "Desde la recepción en Miami"],
    note: "Vencido ese plazo se aplica el procedimiento informado en los Términos y Condiciones; el vencimiento no implica abandono automático.",
  },
];

export const HOME_PROCESS_STEP_IDS = [
  "consulta",
  "direccion",
  "recepcion",
  "consolidacion",
  "despacho",
  "argentina",
] as const satisfies readonly ProcessStepId[];

export const BENEFITS = [
  {
    id: "seguimiento-estados",
    title: "Seguimiento claro por estados",
    value: "Sabés en qué punto está tu envío.",
    description: "Consultá en el sistema los estados recibido, consolidado, en tránsito y en destino.",
    visualKey: "states",
    href: "/como-funciona#seguimiento",
    linkLabel: "Cómo seguimos tu envío",
  },
  {
    id: "consolidacion-reempaque",
    title: "Consolidación y reempaque incluidos",
    value: "Varias compras pueden viajar en una sola operación.",
    description: "Preparamos los paquetes según las necesidades de cada operación.",
    visualKey: "consolidation",
    href: "/como-funciona#consolidacion",
    linkLabel: "Qué incluye la consolidación",
  },
  {
    id: "recepcion-documentada",
    title: "Recepción documentada en Miami",
    value: "Ves qué llegó antes de que siga el recorrido.",
    description: "Registramos fotos del contenido y la etiqueta de llegada, el nombre y el tracking visible.",
    visualKey: "reception",
    href: "/como-funciona#recepcion",
    linkLabel: "Cómo documentamos la recepción",
  },
  {
    id: "logistica-terceros",
    title: "Logística para terceros",
    value: "Tu operación en EE.UU. tiene apoyo desde Miami.",
    description: "Almacenamiento, preparación de pedidos y reporte mensual para sellers de e-commerce.",
    visualKey: "warehouse",
    href: "/servicios#fulfillment",
    linkLabel: "Ver logística para e-commerce",
  },
  {
    id: "atencion-directa",
    title: "Atención directa",
    value: "Hablás con nuestro equipo durante la operación.",
    description: "Atención por WhatsApp y correo en horas hábiles.",
    visualKey: "support",
    href: "/#contacto",
    linkLabel: "Escribinos",
  },
] as const satisfies readonly BenefitItem[];

export const FAQS = [
  {
    q: "¿Cuánto tarda el envío?",
    a: "Después del cierre y los controles, la coordinación puede empezar normalmente entre el martes y el miércoles de la semana siguiente. No es un plazo garantizado y puede variar según la operación.",
  },
  { q: "¿Puedo rastrear mi paquete?", a: "Podés consultar en el sistema los estados recibido, consolidado, en tránsito y en destino." },
  { q: "¿Qué tipo de productos puedo enviar?", a: "Consultanos antes de comprar para confirmar que el producto puede enviarse y conocer las condiciones de la operación." },
] as const satisfies readonly FAQItem[];

export const siteContent = {
  about: {
    title: "Quiénes somos",
    subtitle: "Somos operador logístico desde Miami → Argentina.",
    body: ["Recepción documentada, consolidación y reempaque en Miami.", "Una salida semanal hacia Argentina."],
  },
  benefits: BENEFITS,
  process: PROCESS_STEPS,
  faqs: FAQS,
} as const;

export const getContent = () => siteContent;
