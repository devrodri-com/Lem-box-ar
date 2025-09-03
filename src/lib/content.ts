// src/lib/content.ts

import type { Country } from "./country";
export type Step = { title: string; description: string; step?: number; icon?: string };
export type BenefitItem = { title: string; description: string; icon?: string };
export type FAQItem = { q: string; a: string };

export const siteContentByCountry = {
  uy: {
    about: {
      title: "Quiénes somos",
      subtitle: "Somos operador logístico desde Miami → Uruguay.",
      body: [
        "Recepción y consolidación en Miami Gardens.",
        "Salidas aéreas semanales a Montevideo.",
      ],
    },
    benefits: [
      {
        title: "Envíos rápidos y seguros",
        description: "Consolidación inteligente + tracking en tiempo real para entregas rápidas y seguras.",
        icon: "truck",
      },
      {
        title: "Envío aéreo semanal",
        description: "Dos vuelos semanales desde Miami con cut-offs claros, para cumplir plazos reales.",
        icon: "plane",
      },
      {
        title: "Cuidado del paquete",
        description: "Reempaque y refuerzo especial para envíos frágiles o de alto valor.",
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
        title: "Casillero privado en Miami",
        description: "Cada cliente tiene una dirección exclusiva en Miami con fotos al recibir la carga para mayor control y transparencia.",
        icon: "package",
      },
    ],
    process: [
      {
        step: 1,
        title: "Registro y creación de cuenta",
        description: "Crea tu cuenta para empezar a enviar paquetes desde Miami a Uruguay.",
        icon: "user-plus",
      },
      {
        step: 2,
        title: "Recepción y consolidación",
        description: "Recibimos tus paquetes en Miami y los consolidamos para optimizar el envío.",
        icon: "box",
      },
      {
        step: 3,
        title: "Envío aéreo semanal",
        description: "Realizamos envíos a Montevideo cada semana para garantizar rapidez.",
        icon: "plane",
      },
      {
        step: 4,
        title: "Entrega en destino",
        description: "Recibe tus paquetes en la dirección que elijas en Uruguay.",
        icon: "home",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto tarda el envío?",
        a: "El envío tarda aproximadamente 7 días desde Miami hasta Montevideo.",
      },
      {
        q: "¿Puedo rastrear mi paquete?",
        a: "Sí, ofrecemos seguimiento en tiempo real para todos los envíos.",
      },
      {
        q: "¿Qué tipo de productos puedo enviar?",
        a: "Aceptamos la mayoría de productos, excepto aquellos prohibidos por la ley.",
      },
    ],
  },
  ar: {
    about: {
      title: "Quiénes somos",
      subtitle: "Somos operador logístico desde Miami → Argentina.",
      body: [
        "Recepción y consolidación en Miami Gardens.",
        "Salidas aéreas semanales a Buenos Aires.",
      ],
    },
    benefits: [
      {
        title: "Envíos rápidos y seguros",
        description: "Consolidación inteligente + tracking en tiempo real para entregas rápidas y seguras.",
        icon: "truck",
      },
      {
        title: "Envío aéreo semanal",
        description: "Dos vuelos semanales desde Miami con cut-offs claros, para cumplir plazos reales.",
        icon: "plane",
      },
      {
        title: "Cuidado del paquete",
        description: "Reempaque y refuerzo especial para envíos frágiles o de alto valor.",
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
        title: "Casillero privado en Miami",
        description: "Cada cliente tiene una dirección exclusiva en Miami con fotos al recibir la carga para mayor control y transparencia.",
        icon: "package",
      },
    ],
    process: [
      {
        step: 1,
        title: "Registro y creación de cuenta",
        description: "Crea tu cuenta para empezar a enviar paquetes desde Miami a Argentina.",
        icon: "user-plus",
      },
      {
        step: 2,
        title: "Recepción y consolidación",
        description: "Recibimos tus paquetes en Miami y los consolidamos para optimizar el envío.",
        icon: "box",
      },
      {
        step: 3,
        title: "Envío aéreo semanal",
        description: "Realizamos envíos a Buenos Aires cada semana para garantizar rapidez.",
        icon: "plane",
      },
      {
        step: 4,
        title: "Entrega en destino",
        description: "Recibe tus paquetes en la dirección que elijas en Argentina.",
        icon: "home",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto tarda el envío?",
        a: "El envío tarda aproximadamente 7 días desde Miami hasta Buenos Aires.",
      },
      {
        q: "¿Puedo rastrear mi paquete?",
        a: "Sí, ofrecemos seguimiento en tiempo real para todos los envíos.",
      },
      {
        q: "¿Qué tipo de productos puedo enviar?",
        a: "Aceptamos la mayoría de productos, excepto aquellos prohibidos por la ley.",
      },
    ],
  },
} as const;

export const getContent = (c: Country) => siteContentByCountry[c];