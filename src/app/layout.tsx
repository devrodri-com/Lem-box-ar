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
  title: "LEM-BOX — Logística Miami ↔ Uruguay",
  description:
    "Envíos aéreos semanales desde Miami. Recepción, consolidación y entrega en Uruguay con atención personalizada.",
  alternates: {
    canonical: "https://lem-box.com.uy",
    languages: {
      "es-UY": "https://lem-box.com.uy",
      "es-AR": "https://lem-box.com.ar",
      "x-default": "https://lem-box.com",
    },
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
