// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ResponsiveHeader from "@/components/header/ResponsiveHeader";
import Footer from "@/components/Footer";
import { SITE_URL, reciprocalAlternates, regionalOpenGraph } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

const brandSans = Source_Sans_3({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

const brandMono = IBM_Plex_Mono({
  variable: "--font-brand-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const viewport: Viewport = {
  themeColor: "#02120F",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Envíos desde Miami a Argentina — LEM-BOX",
    template: "%s | LEM-BOX Argentina",
  },
  description:
    "Recibimos tus compras en Miami, registramos cada paquete con fotos, consolidamos y reempacamos, y coordinamos una salida semanal hacia Argentina.",
  alternates: reciprocalAlternates("/"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#02120F" },
    ],
  },
  openGraph: {
    ...regionalOpenGraph("/"),
    title: "Envíos desde Miami a Argentina — LEM-BOX",
    description:
      "Recibimos tus compras en Miami, registramos cada paquete con fotos, consolidamos y reempacamos, y coordinamos una salida semanal hacia Argentina.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Envíos desde Miami a Argentina — LEM-BOX",
    description:
      "Recibimos tus compras en Miami, registramos cada paquete con fotos, consolidamos y reempacamos, y coordinamos una salida semanal hacia Argentina.",
    images: ["/og-lem-box-ar.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${brandSans.variable} ${brandMono.variable}`}>
      <body className="antialiased">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "LEM-BOX",
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            email: "info@lem-box.com",
            telephone: "+1-754-465-3318",
            address: {
              "@type": "PostalAddress",
              streetAddress: "20200 NW 2nd Ave, Unit 108",
              addressLocality: "Miami",
              addressRegion: "FL",
              postalCode: "33169",
              addressCountry: "US",
            },
          }}
        />
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "LEM-BOX Argentina",
            url: SITE_URL,
            inLanguage: "es-AR",
          }}
        />
        <ResponsiveHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
