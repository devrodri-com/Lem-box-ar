// src/lib/seo.ts

import type { Metadata, MetadataRoute } from "next";

/** Host canónico de LEM-BOX Argentina: el apex redirige a www. */
export const SITE_URL = "https://www.lem-box.com.ar";

/** Host canónico de LEM-BOX Uruguay: www redirige al apex. */
export const UY_SITE_URL = "https://lem-box.com.uy";

/** Plataforma central, neutral de mercado, para el fallback global. */
export const X_DEFAULT_URL = "https://lem-box.com/acceder";

/** Imagen social de Argentina: copia byte a byte del asset neutral. */
export const OG_IMAGE_PATH = "/og-lem-box-ar.jpg";

export type SeoPath = `/${string}`;
export type MarketScope = "RECIPROCAL" | "ARGENTINA_ONLY";

type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

type SitemapPolicy =
  | {
      indexable: true;
      sitemap: true;
      changeFrequency: SitemapChangeFrequency;
      priority: number;
    }
  | {
      indexable: true;
      sitemap: false;
      sitemapExclusionReason: string;
      changeFrequency?: never;
      priority?: never;
    }
  | {
      indexable: false;
      sitemap: false;
      changeFrequency?: never;
      priority?: never;
    };

type MarketPolicy =
  | {
      marketScope: "RECIPROCAL";
      uruguayEquivalentPath: SeoPath;
    }
  | {
      marketScope: "ARGENTINA_ONLY";
      uruguayEquivalentPath?: never;
    };

export type SeoRouteDefinition = {
  path: SeoPath;
} & SitemapPolicy &
  MarketPolicy;

/**
 * Fuente canónica de rutas SEO públicas. Las rutas futuras exclusivas de
 * Argentina se registran con marketScope ARGENTINA_ONLY y sin equivalente UY.
 */
export const SEO_ROUTES = [
  {
    path: "/",
    marketScope: "RECIPROCAL",
    indexable: true,
    sitemap: true,
    changeFrequency: "weekly",
    priority: 1.0,
    uruguayEquivalentPath: "/",
  },
  {
    path: "/como-funciona",
    marketScope: "ARGENTINA_ONLY",
    indexable: true,
    sitemap: true,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/servicios",
    marketScope: "RECIPROCAL",
    indexable: true,
    sitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
    uruguayEquivalentPath: "/servicios",
  },
  {
    path: "/privacidad",
    marketScope: "RECIPROCAL",
    indexable: true,
    sitemap: true,
    changeFrequency: "monthly",
    priority: 0.3,
    uruguayEquivalentPath: "/privacidad",
  },
  {
    path: "/terminos",
    marketScope: "RECIPROCAL",
    indexable: true,
    sitemap: true,
    changeFrequency: "monthly",
    priority: 0.3,
    uruguayEquivalentPath: "/terminos",
  },
] as const satisfies readonly SeoRouteDefinition[];

function assertRouteRegistry(routes: readonly SeoRouteDefinition[]): void {
  const seenPaths = new Set<string>();

  for (const route of routes) {
    const routePath: string = route.path;
    if (
      !routePath.startsWith("/") ||
      routePath.includes("?") ||
      routePath.includes("#")
    ) {
      throw new Error(`Ruta SEO inválida: ${routePath}`);
    }
    if (routePath !== "/" && routePath.endsWith("/")) {
      throw new Error(`La ruta SEO no debe terminar en slash: ${routePath}`);
    }
    if (seenPaths.has(routePath)) {
      throw new Error(`Ruta SEO duplicada: ${routePath}`);
    }
    seenPaths.add(routePath);

    if (route.marketScope === "RECIPROCAL" && !route.uruguayEquivalentPath) {
      throw new Error(`La ruta recíproca ${routePath} requiere equivalente Uruguay`);
    }
    if (route.marketScope === "ARGENTINA_ONLY" && "uruguayEquivalentPath" in route) {
      throw new Error(`La ruta Argentina-only ${routePath} no admite equivalente Uruguay`);
    }
    if (route.indexable && !route.sitemap && !route.sitemapExclusionReason.trim()) {
      throw new Error(`La exclusión del sitemap requiere una razón: ${routePath}`);
    }
    if (route.sitemap && (route.priority < 0 || route.priority > 1)) {
      throw new Error(`Prioridad de sitemap inválida: ${routePath}`);
    }
  }
}

assertRouteRegistry(SEO_ROUTES);

type RegistryRoute = (typeof SEO_ROUTES)[number];
export type ReciprocalRoute = Extract<RegistryRoute, { marketScope: "RECIPROCAL" }>;
export type ReciprocalRoutePath = ReciprocalRoute["path"];

function absoluteUrl(base: string, pathname: SeoPath): string {
  return pathname === "/" ? base : `${base}${pathname}`;
}

function reciprocalRoute(pathname: ReciprocalRoutePath): ReciprocalRoute {
  const route = SEO_ROUTES.find(
    (candidate): candidate is ReciprocalRoute =>
      candidate.path === pathname && candidate.marketScope === "RECIPROCAL",
  );

  if (!route) {
    throw new Error(`Ruta recíproca no registrada: ${pathname}`);
  }
  return route;
}

/** Metadata regional únicamente para rutas con reciprocidad UY comprobable. */
export function reciprocalAlternates(
  pathname: ReciprocalRoutePath,
): Metadata["alternates"] {
  const route = reciprocalRoute(pathname);
  return {
    canonical: pathname,
    languages: {
      "es-AR": absoluteUrl(SITE_URL, pathname),
      "es-UY": absoluteUrl(UY_SITE_URL, route.uruguayEquivalentPath),
      "x-default": X_DEFAULT_URL,
    },
  };
}

/** Metadata segura para una ruta exclusiva de Argentina: nunca inventa UY. */
export function argentinaOnlyAlternates(
  pathname: SeoPath,
): Metadata["alternates"] {
  return { canonical: pathname };
}

/**
 * `openGraph` se reemplaza igual que `alternates`, así que sin declaración
 * propia toda subruta publica el og:url de la portada. Omitimos title y
 * description a propósito: Next los completa con los de cada página.
 */
export function regionalOpenGraph(pathname: SeoPath): Metadata["openGraph"] {
  return {
    type: "website",
    url: pathname,
    locale: "es_AR",
    siteName: "LEM-BOX Argentina",
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: "LEM-BOX Argentina" }],
  };
}
