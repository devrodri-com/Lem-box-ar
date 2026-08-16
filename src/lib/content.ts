// src/lib/content.ts

export type Step = { title: string; description: string; step?: number; icon?: string };
export type BenefitItem = { title: string; description: string; icon?: string };
export type FAQItem = { q: string; a: string };

export const siteContent = {
  about: {
    title: "Quiénes somos",
    subtitle: "Somos operador logístico desde Miami → Argentina.",
    body: [
      "Recepción documentada, consolidación y reempaque en Miami.",
      "Una salida semanal hacia Argentina.",
    ],
  },
  benefits: [
    {
      title: "Seguimiento claro por estados",
      description: "Consultá en el sistema los estados recibido, consolidado, en tránsito y en destino.",
      icon: "truck",
    },
    {
      title: "Una salida semanal",
      description: "El cierre es el jueves a las 12 PM, hora de Miami.",
      icon: "plane",
    },
    {
      title: "Consolidación y reempaque incluidos",
      description: "Preparamos los paquetes según las necesidades de cada operación.",
      icon: "shield",
    },
    {
      title: "Logística para terceros",
      description: "Fulfillment y preparación de pedidos para sellers de e-commerce en EE.UU.",
      icon: "warehouse",
    },
    {
      title: "Atención directa",
      description: "Atención directa por WhatsApp y correo, sin intermediarios.",
      icon: "message-circle",
    },
    {
      title: "Recepción documentada en Miami",
      description: "Registramos fotos del contenido y la etiqueta de llegada, el nombre y el tracking visible.",
      icon: "package",
    },
  ],
  process: [
    {
      step: 1,
      title: "Consulta antes de comprar",
      description: "Confirmá que el producto puede enviarse y conocé las condiciones de la operación.",
      icon: "user-plus",
    },
    {
      step: 2,
      title: "Dirección de recepción en Miami",
      description: "Usá la dirección de recepción indicada para tu operación.",
      icon: "box",
    },
    {
      step: 3,
      title: "Recepción documentada",
      description: "Registramos el paquete con fotos, nombre y tracking visible.",
      icon: "plane",
    },
    {
      step: 4,
      title: "Consolidación y reempaque",
      description: "Ambos servicios están incluidos según las necesidades de la operación.",
      icon: "box",
    },
    {
      step: 5,
      title: "Despacho semanal",
      description: "Despachamos una vez por semana y actualizamos los estados.",
      icon: "plane",
    },
    {
      step: 6,
      title: "Coordinación en Argentina",
      description: "Acordamos entrega, retiro, agencia o transporte según cada caso.",
      icon: "home",
    },
  ],
  faqs: [
    {
      q: "¿Cuánto tarda el envío?",
      a: "Después del cierre y los controles, normalmente la entrega puede empezar a coordinarse entre el martes y el miércoles de la semana siguiente. No es un plazo garantizado y puede variar según la operación.",
    },
    {
      q: "¿Puedo rastrear mi paquete?",
      a: "Podés consultar en el sistema los estados recibido, consolidado, en tránsito y en destino.",
    },
    {
      q: "¿Qué tipo de productos puedo enviar?",
      a: "Consultanos antes de comprar para confirmar que el producto puede enviarse y conocer las condiciones de la operación.",
    },
  ],
} as const;

export const getContent = () => siteContent;
