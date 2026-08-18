#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const BUILD_ARTIFACT = ".next/prerender-manifest.json";
const EXPECTED_MANIFEST_VERSION = 4;
const EXPECTED_STATIC_ROUTES = ["/", "/como-funciona"];

function reportFailure(reason, mode = "DYNAMIC_OR_NOT_PRERENDERED") {
  console.error("BUILD_OUTPUT_VERIFICATION=FAIL");
  console.error(`BUILD_ARTIFACT=${BUILD_ARTIFACT}`);
  console.error(`EXPECTED_STATIC_ROUTES=${EXPECTED_STATIC_ROUTES.join(",")}`);
  console.error(`BUILD_MODE=${mode}`);
  console.error(`ERROR=${reason}`);
  process.exitCode = 1;
}

async function main() {
  let manifestText;

  try {
    manifestText = await readFile(BUILD_ARTIFACT, "utf8");
  } catch {
    reportFailure("PRERENDER_MANIFEST_MISSING", "BUILD_ARTIFACT_MISSING");
    return;
  }

  let manifest;

  try {
    manifest = JSON.parse(manifestText);
  } catch {
    reportFailure("PRERENDER_MANIFEST_INVALID_JSON", "BUILD_ARTIFACT_INVALID");
    return;
  }

  if (manifest === null || typeof manifest !== "object" || Array.isArray(manifest)) {
    reportFailure("PRERENDER_MANIFEST_SCHEMA_INVALID", "BUILD_ARTIFACT_INVALID");
    return;
  }

  if (manifest.version !== EXPECTED_MANIFEST_VERSION) {
    reportFailure("PRERENDER_MANIFEST_UNSUPPORTED_VERSION", "BUILD_ARTIFACT_INVALID");
    return;
  }

  if (
    manifest.routes === null ||
    typeof manifest.routes !== "object" ||
    Array.isArray(manifest.routes)
  ) {
    reportFailure("PRERENDER_MANIFEST_ROUTES_INVALID", "BUILD_ARTIFACT_INVALID");
    return;
  }

  for (const route of EXPECTED_STATIC_ROUTES) {
    if (!Object.prototype.hasOwnProperty.call(manifest.routes, route)) {
      reportFailure(`ROUTE_NOT_PRERENDERED:${route}`);
      return;
    }

    if (manifest.routes[route]?.srcRoute !== route) {
      reportFailure(`ROUTE_PRERENDER_ENTRY_INVALID:${route}`, "BUILD_ARTIFACT_INVALID");
      return;
    }
  }

  console.log("BUILD_OUTPUT_VERIFICATION=PASS");
  console.log(`BUILD_ARTIFACT=${BUILD_ARTIFACT}`);
  console.log(`BUILD_ARTIFACT_VERSION=${manifest.version}`);
  console.log(`STATIC_ROUTES=${EXPECTED_STATIC_ROUTES.join(",")}`);
  console.log("BUILD_MODE=STATIC");
}

await main();
