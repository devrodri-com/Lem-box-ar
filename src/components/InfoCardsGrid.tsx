// src/components/InfoCardsGrid.tsx
import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type InfoCardItem = {
  title: string;
  description?: string;
  icon?: string; // nombre del ícono de lucide-react
  step?: number; // usado cuando variant = "steps"
  imageSrc?: string; // usado cuando variant = "media"
};

export type InfoCardsGridProps = {
  items: InfoCardItem[];
  variant?: "default" | "steps" | "media";
  className?: string;
};

export default function InfoCardsGrid({
  items,
  variant = "default",
  className = "",
}: InfoCardsGridProps) {
  return (
    <div
      className={[
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className,
      ].join(" ")}
      role="list"
    >
      {items.map((it, i) => {
        const iconMap = Icons as unknown as Record<string, LucideIcon>;
        const IconCmp: LucideIcon =
          it.icon && iconMap[it.icon] ? iconMap[it.icon] : Icons.Info;

        if (variant === "media" && it.imageSrc) {
          // Card con imagen de cabecera (brand-friendly)
          return (
            <article
              role="listitem"
              key={`${it.title}-${i}`}
              className="group overflow-hidden panel-flat transition card-hover"
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
                <div className="absolute inset-0 media-scrim" />
              </div>
              <div className="p-5">
                <h3 className="h-card">
                  {it.title}
                </h3>
                <p className="mt-1 body-small">
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
            className="group panel p-5 transition-shadow card-hover"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center icon-chip">
                <IconCmp className="size-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="h-card">
                  {variant === "steps" && typeof it.step === "number"
                    ? `Paso ${it.step} — `
                    : null}
                  {it.title}
                </h3>
                <p className="mt-1 body-small">
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
