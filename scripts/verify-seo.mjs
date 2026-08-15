#!/usr/bin/env node
// scripts/verify-seo.mjs
//
// Verifica los contratos regionales de LEM-BOX Argentina.
//
//   node scripts/verify-seo.mjs
//   node scripts/verify-seo.mjs --url <base>
//   node scripts/verify-seo.mjs --url <base> --peer <uy>
//
// Sin dependencias externas. El lector del registro conoce únicamente el
// formato acotado de SEO_ROUTES; no intenta interpretar TypeScript general.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SITE_URL = "https://www.lem-box.com.ar";
const UY_SITE_URL = "https://lem-box.com.uy";
const X_DEFAULT_URL = "https://lem-box.com/acceder";
const OG_IMAGE_PATH = "/og-lem-box-ar.jpg";
const THEME_COLOR = "#02120F";
const EXPECTED_CURRENT_ROUTES = ["/", "/servicios", "/privacidad", "/terminos"];

const failures = [];
const fail = (rule, detail) => failures.push(`${rule}: ${detail}`);
const read = (path) => readFileSync(join(ROOT, path), "utf8");
const seoSource = read("src/lib/seo.ts");

const stringProperty = (source, property) =>
  source.match(new RegExp(`${property}:\\s*"([^"]*)"`))?.[1];
const booleanProperty = (source, property) => {
  const value = source.match(new RegExp(`${property}:\\s*(true|false)`))?.[1];
  return value === undefined ? undefined : value === "true";
};
const numberProperty = (source, property) => {
  const value = source.match(new RegExp(`${property}:\\s*([0-9.]+)`))?.[1];
  return value === undefined ? undefined : Number(value);
};

function parseRouteRegistry(source) {
  const block = source.match(
    /export const SEO_ROUTES = \[([\s\S]*?)\]\s+as const satisfies readonly SeoRouteDefinition\[\];/,
  )?.[1];
  if (!block) {
    fail("route-registry", "no se encontró SEO_ROUTES con el contrato tipado esperado");
    return [];
  }

  const objects = [...block.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);
  if (!objects.length) fail("route-registry", "SEO_ROUTES está vacío o no se pudo leer");
  return objects.map((object) => ({
    path: stringProperty(object, "path"),
    marketScope: stringProperty(object, "marketScope"),
    indexable: booleanProperty(object, "indexable"),
    sitemap: booleanProperty(object, "sitemap"),
    changeFrequency: stringProperty(object, "changeFrequency"),
    priority: numberProperty(object, "priority"),
    uruguayEquivalentPath: stringProperty(object, "uruguayEquivalentPath"),
    sitemapExclusionReason: stringProperty(object, "sitemapExclusionReason"),
  }));
}

const ROUTES = parseRouteRegistry(seoSource);
const INDEXABLE_ROUTES = ROUTES.filter((route) => route.indexable);
const SITEMAP_ROUTES = ROUTES.filter((route) => route.sitemap);
const RECIPROCAL_ROUTES = ROUTES.filter((route) => route.marketScope === "RECIPROCAL");

const cleanPath = (path) =>
  typeof path === "string" &&
  path.startsWith("/") &&
  !path.includes("?") &&
  !path.includes("#") &&
  (path === "/" || !path.endsWith("/"));
const canonicalUrl = (base, path) => (path === "/" ? base : `${base}${path}`);
const sitemapUrl = (path) => `${SITE_URL}${path}`;

function checkRouteRegistry() {
  const seen = new Set();
  for (const route of ROUTES) {
    if (!cleanPath(route.path)) fail("route-path", `path inválido: ${route.path}`);
    if (seen.has(route.path)) fail("route-duplicate", `path duplicado: ${route.path}`);
    seen.add(route.path);

    if (!["RECIPROCAL", "ARGENTINA_ONLY"].includes(route.marketScope)) {
      fail("route-market-scope", `${route.path}: marketScope inválido ${route.marketScope}`);
    }
    if (route.marketScope === "RECIPROCAL" && !cleanPath(route.uruguayEquivalentPath)) {
      fail("reciprocal-equivalent", `${route.path}: falta equivalente Uruguay válido`);
    }
    if (route.marketScope === "ARGENTINA_ONLY" && route.uruguayEquivalentPath !== undefined) {
      fail("ar-only-uy", `${route.path}: una ruta Argentina-only no admite equivalente Uruguay`);
    }
    if (route.indexable === undefined || route.sitemap === undefined) {
      fail("route-index-policy", `${route.path}: indexable y sitemap deben ser explícitos`);
    }
    if (!route.indexable && route.sitemap) {
      fail("route-index-policy", `${route.path}: una ruta no indexable no puede entrar al sitemap`);
    }
    if (route.indexable && !route.sitemap && !route.sitemapExclusionReason) {
      fail("sitemap-drift", `${route.path}: exclusión del sitemap sin decisión explícita`);
    }
    if (route.sitemap) {
      if (!route.changeFrequency) fail("sitemap-contract", `${route.path}: falta changeFrequency`);
      if (route.priority === undefined || route.priority < 0 || route.priority > 1) {
        fail("sitemap-contract", `${route.path}: priority inválida ${route.priority}`);
      }
    }
  }

  const actual = ROUTES.map((route) => route.path).sort();
  const expected = [...EXPECTED_CURRENT_ROUTES].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail("phase-public-routes", `rutas ${actual.join(", ")}; esperadas ${expected.join(", ")}`);
  }
  for (const route of ROUTES) {
    if (EXPECTED_CURRENT_ROUTES.includes(route.path) && route.marketScope !== "RECIPROCAL") {
      fail("phase-route-classification", `${route.path} debe ser RECIPROCAL en AR-03B1`);
    }
  }
}

function functionBody(source, name) {
  const start = source.indexOf(`export function ${name}`);
  const open = source.indexOf("{", start);
  if (start === -1 || open === -1) return null;
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(open + 1, index);
  }
  return null;
}

function checkMetadataHelpers() {
  const reciprocal = functionBody(seoSource, "reciprocalAlternates");
  const argentinaOnly = functionBody(seoSource, "argentinaOnlyAlternates");
  if (!reciprocal) fail("reciprocal-helper", "falta reciprocalAlternates");
  else {
    for (const token of ['"es-AR"', '"es-UY"', '"x-default"', "UY_SITE_URL"]) {
      if (!reciprocal.includes(token)) fail("reciprocal-helper", `falta ${token}`);
    }
  }
  if (!argentinaOnly) fail("ar-only-helper", "falta argentinaOnlyAlternates");
  else if (/es-UY|UY_SITE_URL|uruguayEquivalentPath|x-default/.test(argentinaOnly)) {
    fail("ar-only-uy", "argentinaOnlyAlternates inventa una relación con Uruguay");
  }

  for (const route of INDEXABLE_ROUTES) {
    const file = route.path === "/" ? "src/app/layout.tsx" : `src/app${route.path}/page.tsx`;
    if (!existsSync(join(ROOT, file))) {
      fail("route-file", `${route.path}: falta ${file}`);
      continue;
    }
    const source = read(file);
    const helper = route.marketScope === "RECIPROCAL"
      ? "reciprocalAlternates"
      : "argentinaOnlyAlternates";
    if (!source.includes(`${helper}("${route.path}")`)) {
      fail("route-alternates", `${file} debe declarar ${helper}("${route.path}")`);
    }
    if (!source.includes(`regionalOpenGraph("${route.path}")`)) {
      fail("route-og-url", `${file} debe declarar regionalOpenGraph("${route.path}")`);
    }
  }
}

const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

function checkContractModule() {
  if (!seoSource.includes(`export const SITE_URL = "${SITE_URL}"`)) {
    fail("canonical-host", `SITE_URL debe ser ${SITE_URL}`);
  }
  if (!seoSource.includes(`export const UY_SITE_URL = "${UY_SITE_URL}"`)) {
    fail("uy-host", `UY_SITE_URL debe ser ${UY_SITE_URL}`);
  }
  if (!seoSource.includes(`export const X_DEFAULT_URL = "${X_DEFAULT_URL}"`)) {
    fail("x-default", `X_DEFAULT_URL debe ser ${X_DEFAULT_URL}`);
  }
}

function checkRobotsAndSitemap() {
  const robots = read("src/app/robots.ts");
  if (!robots.includes("${SITE_URL}/sitemap.xml")) {
    fail("robots-sitemap", "robots.ts debe declarar el sitemap bajo SITE_URL");
  }
  const sitemap = read("src/app/sitemap.ts");
  if (!sitemap.includes("SEO_ROUTES") || !sitemap.includes("route.sitemap")) {
    fail("sitemap-registry", "sitemap.ts debe derivarse y filtrarse desde SEO_ROUTES");
  }
  if (/RECIPROCAL_ROUTES|const\s+(?:ROUTES|PRIORITY)\b/.test(sitemap)) {
    fail("sitemap-registry", "sitemap.ts conserva una lista manual paralela");
  }
  if (stripComments(sitemap).includes("#")) {
    fail("sitemap-fragments", "sitemap.ts no debe publicar anclas");
  }
}

function walkSource(directory) {
  return readdirSync(join(ROOT, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walkSource(path);
    return /\.[cm]?[jt]sx?$/.test(entry.name) ? [path] : [];
  });
}

function checkArgentinaOnlyRuntime() {
  if (existsSync(join(ROOT, "middleware.ts"))) fail("market-middleware", "middleware.ts debe eliminarse");
  if (existsSync(join(ROOT, "src/lib/country.ts"))) fail("market-country", "country.ts debe eliminarse");

  const publicSources = walkSource("src").filter((path) => !path.startsWith("src/app/api/"));
  for (const path of publicSources) {
    const source = read(path);
    if (/getCountryFromHost|lem-country|siteContentByCountry/.test(source)) {
      fail("market-runtime", `${path} conserva resolución regional legacy`);
    }
    if (/host\.endsWith\(\s*["']\.com\.ar["']\s*\)[\s\S]{0,100}["']uy["']/.test(source)) {
      fail("uy-fallback", `${path} conserva fallback uy`);
    }
  }

  for (const path of ["src/app/page.tsx", "src/components/AboutSection.tsx"]) {
    const source = read(path);
    if (/from\s+["']next\/headers["']|\bheaders\s*\(|\bcookies\s*\(/.test(source)) {
      fail("dynamic-home", `${path} consume APIs dinámicas de request`);
    }
  }

  const content = read("src/lib/content.ts");
  if (/\buy\s*:\s*\{/.test(content) || !content.includes("export const siteContent =")) {
    fail("uy-content", "content.ts debe contener una única fuente Argentina-only");
  }
}

function pageRoutes() {
  return walkSource("src/app")
    .filter((path) => path.endsWith("/page.tsx") || path === "src/app/page.tsx")
    .map((path) => {
      const relativePath = relative(join(ROOT, "src/app"), join(ROOT, path));
      return relativePath === "page.tsx" ? "/" : `/${relativePath.replace(/\/page\.tsx$/, "")}`;
    });
}

function checkPublicRoutes() {
  const actual = pageRoutes().sort();
  const expected = [...EXPECTED_CURRENT_ROUTES].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail("phase-public-files", `páginas públicas ${actual.join(", ")}; esperadas ${expected.join(", ")}`);
  }
}

function checkViewport() {
  const layout = read("src/app/layout.tsx");
  if (!layout.includes("export const viewport: Viewport") || !layout.includes(`themeColor: "${THEME_COLOR}"`)) {
    fail("theme-color", `themeColor debe migrarse a viewport y conservar ${THEME_COLOR}`);
  }
  if ((layout.match(/themeColor:/g) ?? []).length !== 1) {
    fail("theme-color", "themeColor debe existir una sola vez, fuera de metadata");
  }
}

function checkManifestAndVisibleCopy() {
  const manifest = JSON.parse(read("src/app/manifest.webmanifest"));
  if (manifest.short_name !== "LEM-BOX AR" || manifest.lang !== "es-AR") {
    fail("manifest-market", "el manifest debe conservar identidad Argentina");
  }
  for (const key of ["id", "name", "description", "start_url"]) {
    if (!manifest[key]) fail("manifest-market", `falta ${key} en el manifest`);
  }
  const about = read("src/components/AboutSection.tsx");
  if (!about.includes("EE.UU. ↔ Argentina") || about.includes("EE.UU. ↔ Uruguay")) {
    fail("market-copy", "AboutSection debe publicar únicamente Argentina");
  }
}

function jpegSize(buffer) {
  let index = 2;
  while (index < buffer.length) {
    if (buffer[index] !== 0xff) return null;
    const marker = buffer[index + 1];
    const length = buffer.readUInt16BE(index + 2);
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSof) {
      return { height: buffer.readUInt16BE(index + 5), width: buffer.readUInt16BE(index + 7) };
    }
    index += 2 + length;
  }
  return null;
}

function checkOgAsset() {
  const path = join(ROOT, "public", OG_IMAGE_PATH.slice(1));
  if (!existsSync(path)) return fail("og-asset", `falta public${OG_IMAGE_PATH}`);
  const dimensions = jpegSize(readFileSync(path));
  if (dimensions?.width !== 1200 || dimensions?.height !== 630) {
    fail("og-asset", `el asset debe medir 1200x630, mide ${dimensions?.width}x${dimensions?.height}`);
  }
}

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? null;
const linksOf = (html, rel) =>
  [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attr(tag, "rel")?.toLowerCase() === rel);
const metaOf = (html, property) =>
  [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => (attr(tag, "property") ?? attr(tag, "name"))?.toLowerCase() === property)
    ?.match(/content="([^"]*)"/i)?.[1] ?? null;

async function get(url) {
  const response = await fetch(url, { redirect: "follow" });
  return { response, body: await response.text() };
}

async function checkLive(base) {
  for (const route of INDEXABLE_ROUTES) {
    const url = `${base}${route.path === "/" ? "/" : route.path}`;
    const { response, body } = await get(url);
    if (!response.ok) {
      fail("live-route", `${url} devolvió ${response.status}`);
      continue;
    }

    const canonical = linksOf(body, "canonical").map((tag) => attr(tag, "href"))[0];
    if (canonical !== canonicalUrl(SITE_URL, route.path)) {
      fail("live-canonical", `${route.path}: ${canonical}`);
    }
    const alternates = Object.fromEntries(
      linksOf(body, "alternate").map((tag) => [attr(tag, "hreflang"), attr(tag, "href")]),
    );
    if (route.marketScope === "RECIPROCAL") {
      const expected = {
        "es-AR": canonicalUrl(SITE_URL, route.path),
        "es-UY": canonicalUrl(UY_SITE_URL, route.uruguayEquivalentPath),
        "x-default": X_DEFAULT_URL,
      };
      for (const [language, href] of Object.entries(expected)) {
        if (alternates[language] !== href) {
          fail("live-hreflang", `${route.path}: ${language} = ${alternates[language]}, esperado ${href}`);
        }
      }
    } else if (alternates["es-UY"] || Object.values(alternates).some((href) => href?.includes("com.uy"))) {
      fail("live-ar-only-uy", `${route.path}: publica alternate Uruguay`);
    }

    if (metaOf(body, "og:url") !== canonicalUrl(SITE_URL, route.path)) {
      fail("live-og-url", `${route.path}: ${metaOf(body, "og:url")}`);
    }
    if (metaOf(body, "og:locale") !== "es_AR") {
      fail("live-og-locale", `${route.path}: ${metaOf(body, "og:locale")}`);
    }
    for (const property of ["og:image", "twitter:image"]) {
      const image = metaOf(body, property);
      if (!image?.endsWith(OG_IMAGE_PATH) || image.includes("com.uy")) {
        fail("live-og-image", `${route.path}: ${property} = ${image}`);
      }
    }
    if (metaOf(body, "theme-color") !== THEME_COLOR) {
      fail("live-theme-color", `${route.path}: ${metaOf(body, "theme-color")}`);
    }

    const visible = body.replace(/<script[\s\S]*?<\/script>/gi, "");
    if (/EE\.UU\. ↔ Uruguay/.test(visible)) {
      fail("live-market-copy", `${route.path}: publica Uruguay`);
    }
  }

  const robots = await get(`${base}/robots.txt`);
  if (!robots.body.includes(`${SITE_URL}/sitemap.xml`) || robots.body.includes("com.uy")) {
    fail("live-robots", "robots.txt no conserva el host Argentina");
  }

  const sitemap = await get(`${base}/sitemap.xml`);
  const locations = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedLocations = SITEMAP_ROUTES.map((route) => sitemapUrl(route.path));
  if (JSON.stringify(locations) !== JSON.stringify(expectedLocations)) {
    fail("live-sitemap", `URLs ${locations.join(", ")}; esperadas ${expectedLocations.join(", ")}`);
  }
  if (new Set(locations).size !== locations.length) fail("live-sitemap", "contiene duplicados");
  if (locations.some((location) => /#|\?|com\.uy|localhost|vercel\.app/.test(location))) {
    fail("live-sitemap", "contiene una URL inválida o de otro mercado");
  }

  const manifest = await get(`${base}/manifest.webmanifest`);
  if (/LEM-BOX UY|Uruguay/.test(manifest.body)) fail("live-manifest", "identifica Uruguay");
  const og = await fetch(`${base}${OG_IMAGE_PATH}`);
  if (!og.ok) fail("live-og-asset", `${OG_IMAGE_PATH} devolvió ${og.status}`);
  else {
    const dimensions = jpegSize(Buffer.from(await og.arrayBuffer()));
    if (dimensions?.width !== 1200 || dimensions?.height !== 630) {
      fail("live-og-asset", `mide ${dimensions?.width}x${dimensions?.height}`);
    }
  }
}

async function checkReciprocity(peer) {
  for (const route of RECIPROCAL_ROUTES) {
    const peerPath = route.uruguayEquivalentPath;
    const { response, body } = await get(`${peer}${peerPath === "/" ? "/" : peerPath}`);
    if (!response.ok) {
      fail("reciprocity", `${peer}${peerPath} devolvió ${response.status}`);
      continue;
    }
    const back = linksOf(body, "alternate")
      .map((tag) => [attr(tag, "hreflang"), attr(tag, "href")])
      .find(([language]) => language === "es-AR")?.[1];
    const expected = canonicalUrl(SITE_URL, route.path);
    if (back !== expected) fail("reciprocity", `${peerPath}: es-AR = ${back}, esperado ${expected}`);
  }
}

checkContractModule();
checkRouteRegistry();
checkMetadataHelpers();
checkRobotsAndSitemap();
checkArgentinaOnlyRuntime();
checkPublicRoutes();
checkViewport();
checkManifestAndVisibleCopy();
checkOgAsset();

const urlIndex = process.argv.indexOf("--url");
if (urlIndex !== -1) {
  const base = process.argv[urlIndex + 1]?.replace(/\/$/, "");
  if (!base) fail("usage", "--url requiere una base");
  else {
    await checkLive(base);
    const peerIndex = process.argv.indexOf("--peer");
    if (peerIndex !== -1) {
      const peer = process.argv[peerIndex + 1]?.replace(/\/$/, "");
      if (!peer) fail("usage", "--peer requiere una base");
      else await checkReciprocity(peer);
    }
  }
}

if (failures.length) {
  console.error(`verify:seo — ${failures.length} contrato(s) incumplido(s):\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
console.log(
  `verify:seo — Argentina-only OK (${ROUTES.length} rutas; ${RECIPROCAL_ROUTES.length} recíprocas; ${ROUTES.length - RECIPROCAL_ROUTES.length} exclusivas AR)`,
);
