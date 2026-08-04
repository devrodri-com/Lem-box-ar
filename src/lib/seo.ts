// src/lib/seo.ts

import type { Metadata } from "next";

/** Host canónico de LEM-BOX Argentina: el apex redirige a www. */
export const SITE_URL = "https://www.lem-box.com.ar";

/** Host canónico de LEM-BOX Uruguay: www redirige al apex. */
export const UY_SITE_URL = "https://lem-box.com.uy";

/** Plataforma central, neutral de mercado, para el fallback global. */
export const X_DEFAULT_URL = "https://lem-box.com/acceder";

/** Imagen social de Argentina: copia byte a byte del asset neutral. */
export const OG_IMAGE_PATH = "/og-lem-box-ar.jpg";

/** Rutas indexables con equivalente regional en Uruguay. */
export const RECIPROCAL_ROUTES = [
  "/",
  "/servicios",
  "/privacidad",
  "/terminos",
] as const;

export type ReciprocalRoute = (typeof RECIPROCAL_ROUTES)[number];

/**
 * Next reemplaza `alternates` completo cuando una ruta lo declara, sin
 * combinarlo con el del layout. Cada página indexable tiene que publicar su
 * canonical y sus alternates propios o hereda los de la portada.
 */
export function regionalAlternates(pathname: ReciprocalRoute): Metadata["alternates"] {
  return {
    canonical: pathname,
    languages: {
      "es-AR": `${SITE_URL}${pathname}`,
      "es-UY": `${UY_SITE_URL}${pathname}`,
      "x-default": X_DEFAULT_URL,
    },
  };
}

/**
 * `openGraph` se reemplaza igual que `alternates`, así que sin declaración
 * propia toda subruta publica el og:url de la portada. Omitimos title y
 * description a propósito: Next los completa con los de cada página.
 */
export function regionalOpenGraph(pathname: ReciprocalRoute): Metadata["openGraph"] {
  return {
    type: "website",
    url: pathname,
    locale: "es_AR",
    siteName: "LEM-BOX Argentina",
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: "LEM-BOX Argentina" }],
  };
}
