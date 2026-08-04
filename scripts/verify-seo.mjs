#!/usr/bin/env node
// scripts/verify-seo.mjs
//
// Verifica los contratos regionales de LEM-BOX Argentina.
//
//   node scripts/verify-seo.mjs                     -> contrato estático (fuentes)
//   node scripts/verify-seo.mjs --url <base>        -> además, HTML realmente servido
//   node scripts/verify-seo.mjs --url <base> --peer <uy>  -> además, reciprocidad real
//
// En preview el canonical y los alternates siguen apuntando al host de
// producción (metadataBase es fijo): eso es lo correcto, así que se contrastan
// contra SITE_URL, no contra la base que se está fetcheando.
//
// Sin dependencias externas.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SITE_URL = "https://www.lem-box.com.ar";
const UY_SITE_URL = "https://lem-box.com.uy";
const X_DEFAULT_URL = "https://lem-box.com/acceder";
const OG_IMAGE_PATH = "/og-lem-box-ar.jpg";
const ROUTES = ["/", "/servicios", "/privacidad", "/terminos"];

// Next normaliza la raíz sin barra final al resolverla contra metadataBase.
// "https://host" y "https://host/" son el mismo recurso (RFC 3986), y ambos
// repos normalizan igual, así que la reciprocidad sigue casando literalmente.
const abs = (base, route) => (route === "/" ? base : `${base}${route}`);

const failures = [];
const fail = (rule, detail) => failures.push(`${rule}: ${detail}`);
const read = (p) => readFileSync(join(ROOT, p), "utf8");

/* ---------------------------------------------------------------- estático */

function checkContractModule() {
  const src = read("src/lib/seo.ts");
  if (!src.includes(`export const SITE_URL = "${SITE_URL}"`)) {
    fail("canonical-host", `src/lib/seo.ts debe fijar SITE_URL en ${SITE_URL}`);
  }
  if (!/SITE_URL = "https:\/\/www\./.test(src)) {
    fail("canonical-www", "el host canónico AR tiene que incluir www");
  }
  if (!src.includes(`export const X_DEFAULT_URL = "${X_DEFAULT_URL}"`)) {
    fail("x-default", `x-default debe ser ${X_DEFAULT_URL}`);
  }
}

// Único lugar donde una URL .com.uy es legítima: el alternate hreflang es-UY.
function checkNoUruguayHosts() {
  const files = [
    "src/app/layout.tsx",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/app/servicios/page.tsx",
    "src/app/privacidad/page.tsx",
    "src/app/terminos/page.tsx",
  ];
  for (const f of files) {
    if (read(f).includes("com.uy")) {
      fail("uy-host-leak", `${f} referencia com.uy fuera del alternate es-UY`);
    }
  }
  const seo = read("src/lib/seo.ts");
  const uyHits = [...seo.matchAll(/com\.uy/g)].length;
  if (uyHits !== 1 || !seo.includes(`export const UY_SITE_URL = "${UY_SITE_URL}"`)) {
    fail("uy-host-leak", "src/lib/seo.ts solo puede nombrar com.uy en UY_SITE_URL");
  }
}

function checkRobotsAndSitemap() {
  const robots = read("src/app/robots.ts");
  if (!robots.includes("${SITE_URL}/sitemap.xml")) {
    fail("robots-sitemap", "robots.ts debe declarar el sitemap bajo el host AR");
  }
  const sitemap = read("src/app/sitemap.ts");
  if (!sitemap.includes("RECIPROCAL_ROUTES") || !sitemap.includes("SITE_URL")) {
    fail("sitemap-host", "sitemap.ts debe derivarse de SITE_URL y las rutas indexables");
  }
  if (stripComments(sitemap).includes("#")) {
    fail("sitemap-fragments", "el sitemap no debe publicar anclas: duplican la home");
  }
}

const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

function checkManifest() {
  const manifest = JSON.parse(read("src/app/manifest.webmanifest"));
  const blob = JSON.stringify(manifest);
  if (/LEM-BOX UY/.test(blob) || /Uruguay/.test(blob)) {
    fail("manifest-market", "el manifest AR no puede identificar el mercado uruguayo");
  }
  if (manifest.short_name !== "LEM-BOX AR") {
    fail("manifest-market", `short_name inesperado: ${manifest.short_name}`);
  }
  if (manifest.lang !== "es-AR") {
    fail("manifest-market", `lang inesperado: ${manifest.lang}`);
  }
  for (const key of ["id", "name", "description", "start_url"]) {
    if (!manifest[key]) fail("manifest-market", `falta ${key} en el manifest`);
  }
}

function checkVisibleCopy() {
  const about = read("src/components/AboutSection.tsx");
  if (about.includes("EE.UU. ↔ Uruguay") || /↔ \{.*Uruguay/.test(about)) {
    fail("market-copy", "AboutSection no puede publicar «EE.UU. ↔ Uruguay» en AR");
  }
  if (!about.includes("EE.UU. ↔ Argentina")) {
    fail("market-copy", "AboutSection debe publicar «EE.UU. ↔ Argentina»");
  }
}

// Next reemplaza `alternates` entero: cada ruta tiene que declarar el suyo o
// hereda el de la portada y todas las subrutas colapsan en canonical "/".
function checkPerRouteAlternates() {
  for (const route of ROUTES) {
    const file = route === "/" ? "src/app/layout.tsx" : `src/app${route}/page.tsx`;
    const src = read(file);
    if (!src.includes(`regionalAlternates("${route}")`)) {
      fail("route-alternates", `${file} debe declarar regionalAlternates("${route}")`);
    }
    if (!src.includes(`regionalOpenGraph("${route}")`)) {
      fail("route-og-url", `${file} debe declarar regionalOpenGraph("${route}") o hereda el og:url de la portada`);
    }
  }
}

function checkOgAsset() {
  const path = join(ROOT, "public", OG_IMAGE_PATH.slice(1));
  if (!existsSync(path)) return fail("og-asset", `falta public${OG_IMAGE_PATH}`);
  const dims = jpegSize(readFileSync(path));
  if (!dims || dims.width !== 1200 || dims.height !== 630) {
    fail("og-asset", `el asset social debe ser JPEG 1200x630, es ${dims?.width}x${dims?.height}`);
  }
  const layout = read("src/app/layout.tsx");
  if (!layout.includes(`"${OG_IMAGE_PATH}"`) || layout.includes("og-lem-box-uy")) {
    fail("og-image", `Open Graph y Twitter deben servir ${OG_IMAGE_PATH}`);
  }
}

/** Lee ancho/alto del marcador SOF de un JPEG, sin dependencias. */
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    const isSOF = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSOF) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  return null;
}

/* -------------------------------------------------------------------- live */

const attr = (tag, name) =>
  tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? null;

const linksOf = (html, rel) =>
  [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((t) => attr(t, "rel")?.toLowerCase() === rel);

const metaOf = (html, prop) =>
  [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .find((t) => (attr(t, "property") ?? attr(t, "name"))?.toLowerCase() === prop)
    ?.match(/content="([^"]*)"/i)?.[1] ?? null;

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { res, body: await res.text(), finalUrl: res.url };
}

async function checkLive(base) {
  for (const route of ROUTES) {
    const url = `${base}${route === "/" ? "/" : route}`;
    const { res, body } = await get(url);
    if (!res.ok) {
      fail("live-route", `${url} devolvió ${res.status}`);
      continue;
    }

    const canonical = linksOf(body, "canonical").map((t) => attr(t, "href"))[0];
    if (canonical !== abs(SITE_URL, route)) {
      fail("live-canonical", `${route}: canonical ${canonical}, esperado ${abs(SITE_URL, route)}`);
    }
    if (canonical?.includes("com.uy")) {
      fail("live-canonical", `${route}: canonical apunta a Uruguay`);
    }

    const alts = Object.fromEntries(
      linksOf(body, "alternate").map((t) => [attr(t, "hreflang"), attr(t, "href")])
    );
    const expected = {
      "es-AR": abs(SITE_URL, route),
      "es-UY": abs(UY_SITE_URL, route),
      "x-default": X_DEFAULT_URL,
    };
    for (const [lang, href] of Object.entries(expected)) {
      const got = alts[lang];
      if (!got) fail("live-hreflang", `${route}: falta hreflang ${lang}`);
      else if (got !== href) {
        fail("live-hreflang", `${route}: hreflang ${lang} = ${got}, esperado ${href}`);
      }
    }

    const ogUrl = metaOf(body, "og:url");
    if (ogUrl !== abs(SITE_URL, route)) {
      fail("live-og-url", `${route}: og:url ${ogUrl}, esperado ${abs(SITE_URL, route)}`);
    }

    for (const prop of ["og:image", "twitter:image"]) {
      const img = metaOf(body, prop);
      if (!img?.endsWith(OG_IMAGE_PATH)) fail("live-og-image", `${route}: ${prop} = ${img}`);
      if (img?.includes("com.uy")) fail("live-og-image", `${route}: ${prop} apunta a Uruguay`);
    }

    if (metaOf(body, "og:locale") !== "es_AR") {
      fail("live-og-locale", `${route}: og:locale = ${metaOf(body, "og:locale")}`);
    }

    // Cualquier rastro de Uruguay salvo el alternate es-UY deliberado. El
    // <head> es lo que consumen los buscadores; el payload RSC del <body>
    // reitera los mismos tags y produciría falsos positivos.
    const head = body.split("</head>")[0].replace(/<link\b[^>]*hreflang="es-UY"[^>]*>/gi, "");
    if (/lem-box\.com\.uy/.test(head)) {
      fail("live-uy-leak", `${route}: el <head> nombra lem-box.com.uy fuera del hreflang es-UY`);
    }
    // Copy visible: fuera de <script>, donde vive el payload serializado.
    const visible = body.replace(/<script[\s\S]*?<\/script>/gi, "");
    if (/EE\.UU\. ↔ Uruguay/.test(visible)) {
      fail("live-market-copy", `${route}: publica «EE.UU. ↔ Uruguay»`);
    }
  }

  const robots = await get(`${base}/robots.txt`);
  if (!robots.body.includes(`${SITE_URL}/sitemap.xml`) || robots.body.includes("com.uy")) {
    fail("live-robots", `robots.txt declara: ${robots.body.match(/Sitemap:.*/)?.[0]}`);
  }

  const sitemap = await get(`${base}/sitemap.xml`);
  const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.some((l) => l.includes("com.uy"))) fail("live-sitemap", "el sitemap contiene URLs UY");
  if (locs.some((l) => !l.startsWith(SITE_URL))) fail("live-sitemap", "el sitemap publica URLs fuera del host AR");
  if (locs.some((l) => l.includes("#"))) fail("live-sitemap", "el sitemap contiene anclas");
  if (locs.some((l) => /localhost|vercel\.app/.test(l))) fail("live-sitemap", "el sitemap filtra hosts de preview");
  if (new Set(locs).size !== locs.length) fail("live-sitemap", "el sitemap tiene duplicados");
  if (locs.length !== ROUTES.length) fail("live-sitemap", `el sitemap lista ${locs.length} URLs, esperadas ${ROUTES.length}`);

  const manifest = await get(`${base}/manifest.webmanifest`);
  if (/LEM-BOX UY|Uruguay/.test(manifest.body)) fail("live-manifest", "el manifest identifica Uruguay");

  const og = await fetch(`${base}${OG_IMAGE_PATH}`);
  if (!og.ok) fail("live-og-asset", `${OG_IMAGE_PATH} devolvió ${og.status}`);
  else {
    const dims = jpegSize(Buffer.from(await og.arrayBuffer()));
    if (dims?.width !== 1200 || dims?.height !== 630) {
      fail("live-og-asset", `el asset servido mide ${dims?.width}x${dims?.height}`);
    }
  }
}

/** Cada alternate es-UY tiene que devolver el hreflang es-AR inverso. */
async function checkReciprocity(peer) {
  for (const route of ROUTES) {
    const { res, body } = await get(`${peer}${route === "/" ? "/" : route}`);
    if (!res.ok) {
      fail("reciprocity", `${peer}${route} devolvió ${res.status}`);
      continue;
    }
    const back = linksOf(body, "alternate")
      .map((t) => [attr(t, "hreflang"), attr(t, "href")])
      .find(([lang]) => lang === "es-AR")?.[1];
    if (!back) fail("reciprocity", `${peer}${route} no publica hreflang es-AR de vuelta`);
    else if (back !== abs(SITE_URL, route)) {
      fail("reciprocity", `${peer}${route} devuelve es-AR hacia ${back}, esperado ${abs(SITE_URL, route)}`);
    }
  }
}

/* -------------------------------------------------------------------- main */

checkContractModule();
checkNoUruguayHosts();
checkRobotsAndSitemap();
checkManifest();
checkVisibleCopy();
checkPerRouteAlternates();
checkOgAsset();

const urlIndex = process.argv.indexOf("--url");
if (urlIndex !== -1) {
  const base = process.argv[urlIndex + 1]?.replace(/\/$/, "");
  if (!base) {
    fail("usage", "--url requiere una base, p.ej. --url https://preview.vercel.app");
  } else {
    await checkLive(base);
    const peerIndex = process.argv.indexOf("--peer");
    if (peerIndex !== -1) {
      await checkReciprocity(process.argv[peerIndex + 1].replace(/\/$/, ""));
    }
  }
}

if (failures.length) {
  console.error(`verify:seo — ${failures.length} contrato(s) incumplido(s):\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("verify:seo — identidad de mercado Argentina OK");
