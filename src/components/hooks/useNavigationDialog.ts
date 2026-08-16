"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

const DESKTOP_MEDIA_QUERY = "(min-width: 1280px)";
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

type BackgroundState = {
  element: HTMLElement;
  inert: boolean;
  ariaHidden: string | null;
};

function isVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
}

export function useNavigationDialog(desktopFocusRef?: RefObject<HTMLElement | null>) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);
  const focusDesktopRef = useRef(false);

  const openDialog = useCallback(() => {
    restoreFocusRef.current = true;
    focusDesktopRef.current = false;
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const trigger = triggerRef.current;
    const desktopFocus = desktopFocusRef?.current;
    const body = document.body;
    const root = document.documentElement;
    const scrollPosition = window.scrollY;
    const bodyStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    const rootOverflow = root.style.overflow;
    const background: BackgroundState[] = [...body.children]
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element !== dialog && !element.contains(dialog),
      )
      .map((element) => ({
        element,
        inert: element.inert,
        ariaHidden: element.getAttribute("aria-hidden"),
      }));

    background.forEach(({ element }) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const focusFrame = window.requestAnimationFrame(() => {
      const initialFocus = dialog.querySelector<HTMLElement>("[data-initial-focus]");
      (initialFocus ?? dialog).focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(isVisible);
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1);
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      background.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      });
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyStyle.overflow;
      body.style.position = bodyStyle.position;
      body.style.top = bodyStyle.top;
      body.style.left = bodyStyle.left;
      body.style.right = bodyStyle.right;
      body.style.width = bodyStyle.width;
      window.scrollTo(0, scrollPosition);

      if (focusDesktopRef.current) {
        window.requestAnimationFrame(() => desktopFocus?.focus());
      } else if (restoreFocusRef.current) {
        window.requestAnimationFrame(() => trigger?.focus());
      }
      restoreFocusRef.current = true;
      focusDesktopRef.current = false;
    };
  }, [closeDialog, desktopFocusRef, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const desktop = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const closeAtDesktop = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        focusDesktopRef.current = true;
        closeDialog(false);
      }
    };

    closeAtDesktop(desktop);
    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, [closeDialog, desktopFocusRef, isOpen]);

  return {
    isOpen,
    openDialog,
    closeDialog,
    triggerRef,
    dialogRef,
  };
}
