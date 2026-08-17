// src/components/InfoBar.tsx

import { Plane, MessageCircle, Clock, DollarSign } from "lucide-react";

const ITEMS = [
  { Icon: Plane, title: "Una salida semanal", desc: "De Miami hacia Argentina" },
  { Icon: Clock, title: "Cierre jueves 12 PM", desc: "Hora de Miami" },
  { Icon: DollarSign, title: "Seguimiento por estados", desc: "Desde recibido hasta en destino" },
  { Icon: MessageCircle, title: "Atención directa", desc: "WhatsApp y email" },
];

export default function InfoBar() {
  return (
    <section className="band-soft">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ Icon, title, desc }, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-4 md:px-6 md:py-5 md:border-r band-soft-divider last:border-r-0">
            <Icon className="w-5 h-5 md:w-6 md:h-6 icon-on-light" />
            <div><div className="band-soft-title">{title}</div><div className="band-soft-meta">{desc}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
