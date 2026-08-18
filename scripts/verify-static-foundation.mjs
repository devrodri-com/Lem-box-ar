#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const EXPECTED_PAGE_ROUTES = [
  "/",
  "/como-funciona",
  "/privacidad",
  "/servicios",
  "/terminos",
];
const EXPECTED_APP_PATHS = [
  "/_not-found/page",
  "/api/contact/route",
  "/apple-icon.png/route",
  "/como-funciona/page",
  "/favicon.ico/route",
  "/icon.png/route",
  "/manifest.webmanifest/route",
  "/page",
  "/privacidad/page",
  "/robots.txt/route",
  "/servicios/page",
  "/sitemap.xml/route",
  "/terminos/page",
];
const EXPECTED_BENEFITS = 5;
const EXPECTED_HOME_PROCESS_NODES = 6;
const EXPECTED_PROCESS_DETAILS = 8;
const failures = [];

const fail = (rule, detail) => failures.push(`${rule}: ${detail}`);
const read = (path) => readFileSync(join(ROOT, path), "utf8");

function walk(directory) {
  return readdirSync(join(ROOT, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function pageRoutes() {
  return walk("src/app")
    .filter((path) => path.endsWith("/page.tsx") || path === "src/app/page.tsx")
    .map((path) => {
      const local = relative(join(ROOT, "src/app"), join(ROOT, path));
      return local === "page.tsx" ? "/" : `/${local.replace(/\/page\.tsx$/, "")}`;
    })
    .sort();
}

function count(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function checkSourceContract() {
  const actualRoutes = pageRoutes();
  if (JSON.stringify(actualRoutes) !== JSON.stringify(EXPECTED_PAGE_ROUTES)) {
    fail("public-route-set", `actual=${actualRoutes.join(",")}`);
  }

  const content = read("src/lib/content.ts");
  const benefitBlock = content.match(/export const BENEFITS = \[([\s\S]*?)\] as const/)?.[1] ?? "";
  const homeIds = content.match(/export const HOME_PROCESS_STEP_IDS = \[([\s\S]*?)\] as const/)?.[1] ?? "";
  const processBlock = content.match(/export const PROCESS_STEPS:[\s\S]*?= \[([\s\S]*?)\n\];/)?.[1] ?? "";
  if (count(benefitBlock, /\bid:\s*"/g) !== EXPECTED_BENEFITS) fail("benefit-count", "expected=5");
  if (count(homeIds, /"(?:consulta|direccion|recepcion|consolidacion|despacho|argentina)"/g) !== EXPECTED_HOME_PROCESS_NODES) {
    fail("home-process-count", "expected=6");
  }
  if (count(processBlock, /\bid:\s*"/g) !== EXPECTED_PROCESS_DETAILS) fail("process-detail-count", "expected=8");

  const routeSources = [
    "src/app/page.tsx",
    "src/app/como-funciona/page.tsx",
    "src/components/Hero.tsx",
    "src/components/benefits/BenefitModules.tsx",
    "src/components/process/ProcessRail.tsx",
    "src/components/process/ProcessDetail.tsx",
    "src/components/route/RouteInstrument.tsx",
    "src/components/route-foundation.module.css",
  ].map(read).join("\n");
  for (const forbidden of ["/media/beneficios/", "IntersectionObserver", "@keyframes", "framer-motion", "motion/react", "requestAnimationFrame("]) {
    if (routeSources.includes(forbidden)) fail("static-only", `forbidden=${forbidden}`);
  }
  for (const futureRoute of ["/calculadora", "/casos", "/faq", "/recursos", "/calculadora-consolidacion"]) {
    if (routeSources.includes(`href=\"${futureRoute}`)) fail("future-link", `forbidden=${futureRoute}`);
  }
}

function checkBuildContract() {
  const manifestPath = ".next/server/app-paths-manifest.json";
  if (!existsSync(join(ROOT, manifestPath))) {
    fail("build-artifact", `missing=${manifestPath}`);
    return;
  }
  const manifest = JSON.parse(read(manifestPath));
  const actual = Object.keys(manifest).sort();
  if (JSON.stringify(actual) !== JSON.stringify([...EXPECTED_APP_PATHS].sort())) {
    fail("app-path-count", `count=${actual.length}; paths=${actual.join(",")}`);
  }

  const home = read(".next/server/app/index.html");
  const process = read(".next/server/app/como-funciona.html");
  if (!home.includes("Envíos desde Miami a Argentina, con cada etapa clara")) fail("home-h1", "missing");
  if (count(home, /data-benefit-id=/g) !== EXPECTED_BENEFITS) fail("built-benefit-count", "expected=5");
  if (count(home, /data-process-node=/g) !== EXPECTED_HOME_PROCESS_NODES) fail("built-home-process-count", "expected=6");
  if (count(process, /data-process-detail=/g) !== EXPECTED_PROCESS_DETAILS) fail("built-process-detail-count", "expected=8");
  if (!process.includes("BreadcrumbList") || !home.includes('WebSite') || !home.includes('Organization')) {
    fail("structured-data", "required types missing from prerendered HTML");
  }
  if (!home.includes("data-analytics-event") || !process.includes("data-analytics-event")) {
    fail("analytics-contract", "neutral attributes missing from prerendered HTML");
  }
  if (home.includes("/media/beneficios/") || process.includes("/media/beneficios/")) {
    fail("runtime-sora-reference", "forbidden asset reference found");
  }
}

checkSourceContract();
checkBuildContract();

if (failures.length) {
  console.error("STATIC_FOUNDATION_VERIFICATION=FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("STATIC_FOUNDATION_VERIFICATION=PASS");
  console.log(`PUBLIC_ROUTE_COUNT=${EXPECTED_PAGE_ROUTES.length}`);
  console.log(`APP_PATH_COUNT=${EXPECTED_APP_PATHS.length}`);
  console.log(`BENEFIT_COUNT=${EXPECTED_BENEFITS}`);
  console.log(`HOME_PROCESS_NODE_COUNT=${EXPECTED_HOME_PROCESS_NODES}`);
  console.log(`PROCESS_DETAIL_COUNT=${EXPECTED_PROCESS_DETAILS}`);
}
