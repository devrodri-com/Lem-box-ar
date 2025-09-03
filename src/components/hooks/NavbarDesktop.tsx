// src/components/header/NavbarDesktop.tsx
"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useHeaderBehavior } from "@/components/hooks/useHeaderBehavior";
import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

// IDs oficiales de secciones
const SECTION_IDS = [
  "hero",
  "quienes-somos",
  "beneficios",
  "como-funciona",
  "contacto",
] as const;

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Inicio", href: "/#hero" },
  { label: "Quiénes somos", href: "/#quienes-somos" },
  { label: "Beneficios", href: "/#beneficios" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/#contacto" },
];

export default function NavbarDesktop() {
  const ids = useMemo(() => SECTION_IDS.slice(), []);
  const { isShrunk, activeId } = useHeaderBehavior({
    threshold: 10,
    ids,
    rootMargin: "-35% 0px -55% 0px",
  });
  const pathname = usePathname();

  const [hash, setHash] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setHash(window.location.hash ? window.location.hash.slice(1) : null);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      setHash(window.location.hash ? window.location.hash.slice(1) : null);
    } else {
      // Leaving home: clear section highlight
      setHash(null);
    }
  }, [pathname]);

  // Typed CSS variable for nav height
  const navStyle: CSSProperties & { ["--nav-h"]?: string } = {
    ["--nav-h"]: isShrunk ? "64px" : "80px",
  };

  return (
    <header
      role="banner"
      className={[
        "fixed inset-x-0 top-0 z-[100]",
        "transition-all duration-200",
        // Glass base (branding)
        "bg-[#005f40]/10 backdrop-blur-xl backdrop-saturate-150",
        // Altura dinámica con shrink
        isShrunk ? "h-16" : "h-20",
        // Sombra + borde sutil solo en shrink
        isShrunk
          ? "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] border-b border-white/10"
          : "shadow-none border-b border-transparent",
      ].join(" ")}
      style={navStyle}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Ir al inicio"
          className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#eb6618]"
        >
          {/* Ajusta el src a tu logo real en /public */}
          <img
            src="/logo.png"
            alt="LEM-BOX"
            className={[
              "transition-all duration-200",
              isShrunk ? "h-6 md:h-7" : "h-7 md:h-8",
              "w-auto",
            ].join(" ")}
          />
        </Link>

        {/* Nav centrado (desktop) */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-6">
            {NAV_ITEMS.map((item) => {
              const id = item.href.includes("#") ? item.href.split("#")[1] : undefined;
              const isHash = Boolean(id);
              let isActive = false;
              if (isHash) {
                // On home, prefer explicit hash; fallback to observer
                if (pathname === "/") {
                  isActive = hash ? hash === id : activeId === id;
                } else {
                  isActive = false;
                }
              } else {
                // Highlight full-page routes like /servicios
                isActive = pathname === item.href;
              }
              const classes = [
                "px-2 py-2 rounded-lg text-[15px] font-medium no-underline whitespace-nowrap",
                "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#eb6618]",
                isActive
                  ? "text-[#eb6618]"
                  : "text-white/90 hover:text-white",
              ].join(" ");
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={classes}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      const targetId = id;
                      if (targetId) setHash(targetId);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Acciones (derecha) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Placeholders de redes / CTAs. Ajusta hrefs reales */}
          <a
            href="https://www.instagram.com/lem_box/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de LEM-BOX"
            className="inline-flex items-center justify-center p-2 rounded-md text-white/90 no-underline hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005f40]/40 transition"
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/17544653318"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de LEM-BOX"
            className="inline-flex items-center justify-center p-2 rounded-md text-white/90 no-underline hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005f40]/40 transition"
            title="WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>
          <a
            href="https://lem-box.com/Tracking/web/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-5 rounded-full border border-white/30 text-sm font-semibold text-white/90 no-underline hover:border-[#eb6618] hover:text-[#eb6618] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40 transition"
          >
            Iniciar sesión
          </a>
          <a
            href="https://lem-box.com/Tracking/web/#/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-[#eb6618] text-white visited:!text-white hover:!text-white active:!text-white text-sm font-semibold no-underline hover:bg-[#d15612] focus-visible:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40 shadow-sm transition"
          >
            Registrarse
          </a>
        </div>
      </div>
    </header>
  );
}
