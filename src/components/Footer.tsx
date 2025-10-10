// src/components/Footer.tsx
import Link from "next/link";
export default function Footer() {
    return (
      <footer role="contentinfo" className="bg-[#0f1a17] text-white/80">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
                <path d="M4.5 7.5 12 3l7.5 4.5v9L12 21l-7.5-4.5v-9Z" className="fill-white/5 stroke-emerald-400/70" strokeWidth="1.25"/>
                <path d="M12 3v18M4.5 7.5 12 12l7.5-4.5" className="stroke-emerald-400/70" strokeWidth="1.25" fill="none"/>
              </svg>
              <div className="text-white font-semibold text-xl tracking-tight">LEM-BOX</div>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              Gestión integral desde Miami: envíos rápidos a Argentina y logística para tu e-commerce en EE. UU.
            </p>
          </div>
  
          {/* Navegación */}
          <nav aria-label="Enlaces del sitio">
            <div className="text-white font-medium">Sitio</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href={{ pathname: "/", hash: "hero" }} className="hover:text-white transition-colors duration-200">Inicio</Link></li>
              <li><Link href={{ pathname: "/", hash: "quienes-somos" }} className="hover:text-white transition-colors duration-200">Quiénes somos</Link></li>
              <li><Link href={{ pathname: "/", hash: "beneficios" }} className="hover:text-white transition-colors duration-200">Beneficios</Link></li>
              <li><Link href={{ pathname: "/", hash: "como-funciona" }} className="hover:text-white transition-colors duration-200">Cómo funciona</Link></li>
              <li><Link href={{ pathname: "/", hash: "contacto" }} className="hover:text-white transition-colors duration-200">Contacto</Link></li>
            </ul>
          </nav>
  
          {/* Contacto */}
          <div>
            <div className="text-white font-medium">Contacto</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a
                  href="https://wa.me/17544653318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  +1 (754) 465-3318 (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@lem-box.com"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Enviar email a info@lem-box.com"
                >
                  info@lem-box.com
                </a>
              </li>
              <li>
                <address className="not-italic" itemScope itemType="http://schema.org/PostalAddress">
                  <span itemProp="streetAddress">20200 NW 2nd Ave, Unit 108</span><br />
                  <span itemProp="addressLocality">Miami</span>, <span itemProp="addressRegion">FL</span> <span itemProp="postalCode">33169</span>
                </address>
              </li>
            </ul>
          </div>
  
          {/* Legales */}
          <div>
            <div className="text-white font-medium">Legales</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a href="/privacidad" className="hover:text-white transition-colors duration-200">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos" className="hover:text-white transition-colors duration-200">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-white/60 text-center">
            © {new Date().getFullYear()} LEM-BOX. Todos los derechos reservados. · Made with 💻 by <a href="https://devrodri.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Rodrigo Opalo</a>
          </div>
        </div>
      </footer>
    );
  }