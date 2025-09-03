// src/lib/country.ts

export type Country = "uy" | "ar";
export const getCountryFromHost = (host: string): Country =>
  host.endsWith(".com.ar") ? "ar" : "uy";