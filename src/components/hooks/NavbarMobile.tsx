// src/components/header/NavbarMobile.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useHeaderBehavior } from "@/components/hooks/useHeaderBehavior";
import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";

// IDs oficiales de secciones
const SECTION_IDS = [
  "hero",
  "quienes-somos",
  "beneficios",
  "como-funciona",
  "servicios",
  "contacto",
] as const;

const NAV_ITEMS: { id: (typeof SECTION_IDS)[number]; label: string }[] = [
  { id: "hero", label: "Inicio" },
  { id: "quienes-somos", label: "Quiénes somos" },
  { id: "beneficios", label: "Beneficios" },
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

export default function NavbarMobile() {
  const ids = useMemo(() => SECTION_IDS.slice(), []);
  const { activeId } = useHeaderBehavior({ threshold: 10, ids, rootMargin: "-35% 0px -55% 0px" });
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="md:hidden fixed inset-x-0 top-0 z-[100] h-16 bg-[#005f40]/10 backdrop-blur-xl backdrop-saturate-150 border-b border-transparent">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Ir al inicio" className="inline-flex items-center">
          <img src="/logo.png" alt="LEM-BOX" className="h-7 w-auto" />
        </Link>

        {/* Trigger */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center size-10 rounded-lg bg-white/10 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40"
        >
          <span className="sr-only">Menú</span>
          {/* simple burger */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Panel */}
      {open && mounted &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-[#0f1a17] text-white flex flex-col" role="dialog" aria-modal="true">
            <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
              <Link href="/" aria-label="Ir al inicio" className="inline-flex items-center" onClick={() => setOpen(false)}>
                <img src="/logo.png" alt="LEM-BOX" className="h-7 w-auto" />
              </Link>
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center size-10 rounded-lg bg-white/15 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav aria-label="Navegación móvil" className="flex-1 overflow-y-auto">
              <ul className="flex flex-col p-4 gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const active = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.id === "servicios" ? "/servicios" : `/#${item.id}`}
                        className={[
                          "block w-full px-3 py-3 rounded-xl transition-colors whitespace-nowrap",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#eb6618]",
                          active ? "text-[#eb6618] bg-white/5 visited:text-[#eb6618]" : "text-white hover:text-white hover:bg-white/5 visited:text-white",
                        ].join(" ")}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <a
                    href="https://www.instagram.com/lem_box/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-white hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#eb6618]"
                    onClick={() => setOpen(false)}
                  >
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5491151141467"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-white hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#eb6618]"
                    onClick={() => setOpen(false)}
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://lem-box.com/Tracking/web/#/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex w-full items-center justify-center h-11 px-5 rounded-full border border-white/30 text-sm font-semibold text-white/90 no-underline hover:border-[#eb6618] hover:text-[#eb6618] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40 transition"
                  >
                    Iniciar sesión
                  </a>
                </li>
                <li>
                  <a
                    href="https://lem-box.com/Tracking/web/#/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex w-full items-center justify-center h-11 px-5 rounded-full bg-[#eb6618] text-white visited:!text-white hover:!text-white active:!text-white text-sm font-semibold no-underline hover:bg-[#d15612] focus-visible:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618]/40 shadow-sm transition"
                  >
                    Registrarse
                  </a>
                </li>
              </ul>
            </nav>
          </div>,
          document.body
        )
      }
    </header>
  );
}