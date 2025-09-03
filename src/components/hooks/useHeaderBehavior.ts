// src/components/hooks/useHeaderBehavior.ts
"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;        // px de scroll para activar shrink
  ids?: string[];            // ids de secciones para el spy
  rootMargin?: string;       // margen del viewport para el spy
  minRatio?: number;         // umbral de visibilidad
};

/**
 * Hook único para el header:
 *  - isShrunk: true si window.scrollY > threshold (con rAF para evitar flicker)
 *  - activeId: sección visible detectada vía IntersectionObserver
 *  No tiene side-effects visuales: solo estado.
 */
export function useHeaderBehavior({
  threshold = 10,
  ids = [],
  rootMargin = "-35% 0px -55% 0px",
  minRatio = 0.2,
}: Options = {}) {
  const [isShrunk, setIsShrunk] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const raf = useRef<number>(0);

  // Shrink on scroll (con rAF)
  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        setIsShrunk(window.scrollY > threshold);
        raf.current = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // inicializa
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [threshold]);

  // Scroll spy
  useEffect(() => {
    if (!ids.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= minRatio)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
          return;
        }
        const first = entries.find((e) => e.isIntersecting);
        if (first) setActiveId(first.target.id);
      },
      {
        root: null,
        rootMargin,
        threshold: [0, minRatio, 0.5, 0.75, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, rootMargin, minRatio]);

  return { isShrunk, activeId };
}