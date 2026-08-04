

import type { MetadataRoute } from "next";
import { RECIPROCAL_ROUTES, SITE_URL } from "@/lib/seo";

// Solo páginas indexables. Las anclas de la portada (#quienes-somos, #beneficios,
// #como-funciona, #contacto) no son URLs propias y duplicaban la home.
const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/servicios": 0.8,
  "/privacidad": 0.3,
  "/terminos": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return RECIPROCAL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: PRIORITY[route],
  }));
}
