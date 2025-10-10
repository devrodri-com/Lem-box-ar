// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarDesktop from "@/components/hooks/NavbarDesktop";
import NavbarMobile from "@/components/hooks/NavbarMobile";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lem-box.com.uy"),
  title: {
    default: "LEM-BOX — Logística Miami ↔ Argentina",
    template: "%s | LEM-BOX Argentina",
  },
  description:
    "Comprás en EE.UU. y recibís en Argentina. Recepción y consolidación con fotos. Salidas semanales desde Miami.",
  alternates: {
    canonical: "https://lem-box.com.uy",
    languages: {
      "es-UY": "https://lem-box.com.uy",
      "es-AR": "https://lem-box.com.ar",
      "x-default": "https://lem-box.com",
    },
  },
  themeColor: "#02120F",
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
    type: "website",
    url: "/",
    siteName: "LEM-BOX Argentina",
    title: "LEM-BOX Argentina — Envíos rápidos desde Miami",
    description:
      "Comprás en EE.UU. y recibís en Argentina. Recepción y consolidación con fotos. Salidas semanales desde Miami.",
    images: [{ url: "/og-lem-box-uy.jpg?v=3", width: 1200, height: 630, alt: "LEM-BOX Argentina" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEM-BOX Argentina — Envíos rápidos desde Miami",
    description:
      "Comprás en EE.UU. y recibís en Argentina. Recepción y consolidación con fotos. Salidas semanales desde Miami.",
    images: ["/og-lem-box-uy.jpg?v=3"],
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
