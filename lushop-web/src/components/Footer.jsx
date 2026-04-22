import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="font-oswald text-xl font-bold tracking-[0.12em] uppercase mb-4">
              LU SHOP+
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-[200px]">
              Sneakers, ropa y accesorios premium para un estilo único como tú.
            </p>
            <div className="flex gap-4">
              {['IG', 'WA', 'TK'].map(s => (
                <button key={s} className="w-8 h-8 border border-white/20 text-white/40 hover:border-white hover:text-white transition-colors text-[10px] font-bold flex items-center justify-center">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-5">Navegación</p>
            {['Inicio', 'Sneakers', 'Prendas', 'Accesorios'].map(item => (
              <Link key={item} href="/" className="block text-sm text-white/60 hover:text-white transition-colors mb-3">
                {item}
              </Link>
            ))}
          </div>

          {/* Ayuda */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-5">Ayuda</p>
            {['Preguntas frecuentes', 'Envíos y devoluciones', 'Métodos de pago', 'Contacto'].map(item => (
              <p key={item} className="text-sm text-white/60 mb-3">{item}</p>
            ))}
          </div>

          {/* Contacto */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-5">Contacto</p>
            <p className="text-sm text-white/60 mb-3">WhatsApp: +1 913-218-7736</p>
            <p className="text-sm text-white/60 mb-3">lushopbout@gmail.com</p>
            <p className="text-sm text-white/60">lu-shop.com</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/30">© 2025 LU SHOP+. Todos los derechos reservados.</p>
          <p className="text-[11px] text-white/30">Hecho con pasión · Hecho para destacar.</p>
        </div>
      </div>
    </footer>
  );
}
