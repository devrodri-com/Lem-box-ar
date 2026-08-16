"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useHeaderBehavior } from "@/components/hooks/useHeaderBehavior";
import { useNavigationDialog } from "@/components/hooks/useNavigationDialog";

const DIALOG_ID = "compact-navigation-dialog";
const DIALOG_TITLE_ID = "compact-navigation-title";
const SECTION_IDS = ["hero", "quienes-somos", "beneficios", "como-funciona", "contacto"] as const;

const NAV_ITEMS = [
  { label: "Inicio", href: "/#hero", sectionId: "hero" },
  { label: "Quiénes somos", href: "/#quienes-somos", sectionId: "quienes-somos" },
  { label: "Beneficios", href: "/#beneficios", sectionId: "beneficios" },
  { label: "Cómo funciona", href: "/#como-funciona", sectionId: "como-funciona" },
  { label: "Servicios", href: "/servicios", sectionId: null },
  { label: "Contacto", href: "/#contacto", sectionId: "contacto" },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];

function useLocationHash(pathname: string) {
  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    const updateHash = () => {
      setHash(pathname === "/" && window.location.hash ? window.location.hash.slice(1) : null);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return hash;
}

function HeaderNavLink({
  item,
  active,
  compact = false,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  compact?: boolean;
  onNavigate?: (item: NavItem) => void;
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? (item.sectionId ? "location" : "page") : undefined}
      onClick={() => onNavigate?.(item)}
      className={[
        "rounded-lg font-medium no-underline whitespace-nowrap transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]",
        compact ? "block w-full px-3 py-3" : "px-2 py-2 text-[15px]",
        active
          ? `${compact ? "bg-white/5 " : ""}text-[#eb6618] visited:text-[#eb6618]`
          : "text-white/90 hover:text-white visited:text-white",
      ].join(" ")}
    >
      {item.label}
    </Link>
  );
}

export default function ResponsiveHeader() {
  const pathname = usePathname();
  const hash = useLocationHash(pathname);
  const { isShrunk, activeId } = useHeaderBehavior({
    threshold: 10,
    ids: SECTION_IDS,
    rootMargin: "-35% 0px -55% 0px",
  });
  const logoRef = useRef<HTMLAnchorElement>(null);
  const { isOpen, openDialog, closeDialog, triggerRef, dialogRef } = useNavigationDialog(logoRef);
  const previousPathname = useRef(pathname);
  const pendingNavigationFocus = useRef<string | "page" | null>(null);

  const isActive = useCallback(
    (item: NavItem) => {
      if (item.sectionId) {
        return pathname === "/" && (hash ? hash === item.sectionId : activeId === item.sectionId);
      }
      return pathname === item.href;
    },
    [activeId, hash, pathname],
  );

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      closeDialog(false);
    }
  }, [closeDialog, pathname]);

  useEffect(() => {
    const focusTarget = pendingNavigationFocus.current;
    if (!focusTarget) return;

    const frame = window.requestAnimationFrame(() => {
      const target = focusTarget === "page"
        ? document.querySelector<HTMLElement>("main h1") ?? document.querySelector<HTMLElement>("main")
        : document.getElementById(focusTarget);

      if (!target) return;

      const previousTabIndex = target.getAttribute("tabindex");
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener(
        "blur",
        () => {
          if (previousTabIndex === null) target.removeAttribute("tabindex");
          else target.setAttribute("tabindex", previousTabIndex);
        },
        { once: true },
      );
      pendingNavigationFocus.current = null;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const closeForHashNavigation = () => closeDialog(false);
    window.addEventListener("hashchange", closeForHashNavigation);
    return () => window.removeEventListener("hashchange", closeForHashNavigation);
  }, [closeDialog, isOpen]);

  const closeForNavigation = (item: NavItem) => {
    pendingNavigationFocus.current = item.sectionId ?? "page";
    closeDialog(false);
  };

  const closeForHomeNavigation = () => {
    pendingNavigationFocus.current = "hero";
    closeDialog(false);
  };

  const closeForExternalNavigation = () => closeDialog(true);

  const dialog = isOpen ? (
    <div
      id={DIALOG_ID}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={DIALOG_TITLE_ID}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] flex flex-col bg-[#0f1a17] text-white xl:hidden"
    >
      <h2 id={DIALOG_TITLE_ID} className="sr-only">
        Menú de navegación
      </h2>
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <Link
          href="/"
          aria-label="Ir al inicio"
          onClick={closeForHomeNavigation}
          className="inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
        >
          <Image
            src="/logo.png"
            alt="LEM-BOX"
            width={1200}
            height={400}
            sizes="120px"
            className="h-10 w-auto"
          />
        </Link>
        <button
          type="button"
          aria-label="Cerrar menú"
          data-initial-focus
          onClick={() => closeDialog(true)}
          className="inline-flex size-11 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav aria-label="Navegación principal" className="flex-1 overflow-y-auto overscroll-contain">
        <ul className="flex flex-col gap-0.5 p-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <HeaderNavLink item={item} active={isActive(item)} compact onNavigate={closeForNavigation} />
            </li>
          ))}
          <li>
            <a
              href="https://www.instagram.com/lem_box/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeForExternalNavigation}
              className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-3 text-white no-underline hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
            >
              <Instagram aria-hidden="true" className="size-5" />
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/17544653318"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeForExternalNavigation}
              className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-3 text-white no-underline hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
            >
              <FaWhatsapp aria-hidden="true" className="size-5" />
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href="https://portal.lem-box.com/acceder"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeForExternalNavigation}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white/90 no-underline transition hover:border-[#eb6618] hover:text-[#eb6618] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
            >
              Iniciar sesión
            </a>
          </li>
          <li>
            <a
              href="https://portal.lem-box.com/registro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeForExternalNavigation}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#eb6618] px-5 text-sm font-semibold text-white no-underline shadow-sm transition visited:!text-white hover:bg-[#d15612] hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
            >
              Registrarse
            </a>
          </li>
        </ul>
      </nav>
    </div>
  ) : null;

  return (
    <header
      data-shrunk={isShrunk ? "true" : "false"}
      className={[
        "fixed inset-x-0 top-0 z-[100] h-16 transition-all duration-200",
        "bg-[#005f40]/10 backdrop-blur-xl backdrop-saturate-150",
        isShrunk
          ? "xl:h-16 border-b border-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent shadow-none xl:h-20",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link
          ref={logoRef}
          href="/"
          aria-label="Ir al inicio"
          className="inline-flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
        >
          <Image
            src="/logo.png"
            alt="LEM-BOX"
            width={1200}
            height={400}
            priority
            sizes="(min-width: 1280px) 144px, 120px"
            className={[
              "h-10 w-auto transition-all duration-200",
              isShrunk ? "xl:h-9" : "xl:h-12",
            ].join(" ")}
          />
        </Link>

        <button
          ref={triggerRef}
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls={DIALOG_ID}
          aria-haspopup="dialog"
          onClick={openDialog}
          className="ml-auto inline-flex size-11 items-center justify-center rounded-lg bg-white/10 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17] xl:hidden"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <nav aria-label="Navegación principal" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <HeaderNavLink item={item} active={isActive(item)} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <a
            href="https://www.instagram.com/lem_box/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de LEM-BOX"
            title="Instagram"
            className="inline-flex size-11 items-center justify-center rounded-md text-white/90 no-underline transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
          >
            <Instagram aria-hidden="true" className="size-5" />
          </a>
          <a
            href="https://wa.me/17544653318"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de LEM-BOX"
            title="WhatsApp"
            className="inline-flex size-11 items-center justify-center rounded-md text-white/90 no-underline transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
          >
            <FaWhatsapp aria-hidden="true" className="size-5" />
          </a>
          <a
            href="https://portal.lem-box.com/acceder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-white/30 px-5 text-sm font-semibold text-white/90 no-underline transition hover:border-[#eb6618] hover:text-[#eb6618] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
          >
            Iniciar sesión
          </a>
          <a
            href="https://portal.lem-box.com/registro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#eb6618] px-5 text-sm font-semibold text-white no-underline shadow-sm transition visited:!text-white hover:bg-[#d15612] hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6618] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a17]"
          >
            Registrarse
          </a>
        </div>
      </div>

      {dialog && createPortal(dialog, document.body)}
    </header>
  );
}
