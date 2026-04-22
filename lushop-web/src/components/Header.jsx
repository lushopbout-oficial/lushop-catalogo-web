'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CATEGORIAS = [
  { label: 'Inicio',     href: '/'                    },
  { label: 'Sneakers',   href: '/?categoria=SNEAKERS'  },
  { label: 'Prendas',    href: '/?categoria=PRENDAS'   },
  { label: 'Accesorios', href: '/?categoria=ACCESORIOS'},
];

export default function Header() {
  const { getItemCount, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Barra de anuncio */}
      <div className="bg-black text-white text-center py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold">
        🚚 Envío gratis en compras mayores a $2,500 MXN
      </div>

      {/* Header con Glassmorphism */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-md border-b border-black/5 py-1' 
            : 'bg-white py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* Logo */}
            <Link href="/" className="font-oswald text-2xl font-bold tracking-[0.2em] text-black uppercase hover:opacity-70 transition-opacity">
              LU SHOP<span className="text-gray-400">+</span>
            </Link>

            {/* Nav desktop con indicador animado */}
            <nav className="hidden lg:flex items-center gap-10">
              {CATEGORIAS.map(cat => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="group relative text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors duration-300 font-bold"
                >
                  {cat.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-300 cursor-not-allowed flex items-center gap-1.5 font-bold">
                Tech
                <span className="text-[8px] border border-current px-1 py-0.5 rounded-sm">soon</span>
              </span>
            </nav>

            {/* Íconos */}
            <div className="flex items-center gap-6">
              <button className="text-gray-500 hover:text-black transition-transform hover:scale-110 hidden sm:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="relative text-gray-500 hover:text-black transition-transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-[8px] font-bold animate-pulse">
                    {getItemCount()}
                  </span>
                )}
              </button>

              {/* Menú móvil */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-black">
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-64 pb-6' : 'max-h-0'}`}>
            <nav className="flex flex-col gap-5 pt-4 border-t border-gray-100">
              {CATEGORIAS.map(cat => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
