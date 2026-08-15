#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const BUILD_ARTIFACT = ".next/prerender-manifest.json";
const EXPECTED_MANIFEST_VERSION = 4;
const HOME_ROUTE = "/";

function reportFailure(reason, mode = "DYNAMIC_OR_NOT_PRERENDERED") {
  console.error("BUILD_OUTPUT_VERIFICATION=FAIL");
  console.error(`BUILD_ARTIFACT=${BUILD_ARTIFACT}`);
  console.error(`HOME_ROUTE=${HOME_ROUTE}`);
  console.error(`HOME_BUILD_MODE=${mode}`);
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

  if (!Object.prototype.hasOwnProperty.call(manifest.routes, HOME_ROUTE)) {
    reportFailure("HOME_ROUTE_NOT_PRERENDERED");
    return;
  }

  if (manifest.routes[HOME_ROUTE]?.srcRoute !== HOME_ROUTE) {
    reportFailure("HOME_ROUTE_PRERENDER_ENTRY_INVALID", "BUILD_ARTIFACT_INVALID");
    return;
  }

  console.log("BUILD_OUTPUT_VERIFICATION=PASS");
  console.log(`BUILD_ARTIFACT=${BUILD_ARTIFACT}`);
  console.log(`BUILD_ARTIFACT_VERSION=${manifest.version}`);
  console.log(`HOME_ROUTE=${HOME_ROUTE}`);
  console.log("HOME_BUILD_MODE=STATIC");
}

await main();
