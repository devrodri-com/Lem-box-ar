// src/components/InfoBar.tsx

import { Plane, MessageCircle, Clock, DollarSign } from "lucide-react";

const ITEMS = [
  { Icon: Plane, title: "Salidas semanales", desc: "Desde Miami" },
  { Icon: MessageCircle, title: "Atención directa", desc: "WhatsApp & Email" },
  { Icon: Clock, title: "+10 años", desc: "Experiencia comprobada" },
  { Icon: DollarSign, title: "Precios claros", desc: "Sin sorpresas" },
];

export default function InfoBar() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ Icon, title, desc }, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-4 md:px-6 md:py-5 md:border-r border-gray-200 last:border-r-0">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#005f40]" />
            <div><div className="text-sm font-medium text-gray-900">{title}</div><div className="text-xs text-gray-600">{desc}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}