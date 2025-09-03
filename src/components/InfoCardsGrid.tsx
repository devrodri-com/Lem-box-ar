// src/components/InfoCardsGrid.tsx
"use client";

import Image from "next/image";
import * as Icons from "lucide-react";

export type InfoCardItem = {
  title: string;
  description: string;
  icon?: string; // nombre del ícono de lucide-react
  step?: number; // usado cuando variant = "steps"
  imageSrc?: string; // usado cuando variant = "media"
};

export default function InfoCardsGrid({
  items,
  variant = "default",
  className = "",
}: {
  items: InfoCardItem[];
  variant?: "default" | "steps" | "media";
  className?: string;
}) {
  return (
    <div
      className={[
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className,
      ].join(" ")}
      role="list"
    >
      {items.map((it, i) => {
        const IconCmp = (it.icon && (Icons as any)[it.icon]) || Icons.Info;

        if (variant === "media" && it.imageSrc) {
          // Card con imagen de cabecera (brand-friendly)
          return (
            <article
              role="listitem"
              key={`${it.title}-${i}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:bg-white/10"
            >
              <div className="relative h-40 md:h-44">
                <Image
                  src={it.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/40" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
                  <IconCmp className="size-4" aria-hidden="true" />
                  <span className="sr-only">{it.title}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base md:text-lg font-semibold text-white">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm md:text-base text-white/80">
                  {it.description}
                </p>
              </div>
            </article>
          );
        }

        // Variantes existentes (default/steps)
        return (
          <article
            role="listitem"
            key={`${it.title}-${i}`}
            className="group rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur transition-shadow hover:bg-white/10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#005f40]/20">
                <IconCmp className="size-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-white">
                  {variant === "steps" && typeof it.step === "number"
                    ? `Paso ${it.step} — `
                    : null}
                  {it.title}
                </h3>
                <p className="mt-1 text-sm md:text-base text-white/80">
                  {it.description}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}