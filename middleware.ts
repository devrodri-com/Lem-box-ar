// middleware.ts

import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const res = NextResponse.next();
  if (host.endsWith(".com.ar")) res.cookies.set("lem-country","ar",{path:"/"});
  if (host.endsWith(".com.uy")) res.cookies.set("lem-country","uy",{path:"/"});
  return res;
}