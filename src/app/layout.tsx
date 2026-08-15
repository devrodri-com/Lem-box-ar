// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavbarDesktop from "@/components/hooks/NavbarDesktop";
import NavbarMobile from "@/components/hooks/NavbarMobile";
import Footer from "@/components/Footer";
import { SITE_URL, reciprocalAlternates, regionalOpenGraph } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#02120F",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LEM-BOX — Logística Miami ↔ Argentina",
    template: "%s | LEM-BOX Argentina",
  },
  description:
    "Comprás en EE.UU. y recibís en Argentina. Recepción y consolidación con fotos. Salidas semanales desde Miami.",
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
    title: "LEM-BOX Argentina — Envíos rápidos desde Miami",
    description:
      "Comprás en EE.UU. y recibís en Argentina. Recepción y consolidación con fotos. Salidas semanales desde Miami.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEM-BOX Argentina — Envíos rápidos desde Miami",
    description:
      "Comprás en EE.UU. y recibís en Argentina. Recepción y consolidación con fotos. Salidas semanales desde Miami.",
    images: ["/og-lem-box-ar.jpg"],
  },
};

function Header() {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <>
          <Header />
          {children}
          <Footer />
        </>
      </body>
    </html>
  );
}
