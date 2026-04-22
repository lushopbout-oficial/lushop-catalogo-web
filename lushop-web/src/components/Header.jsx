'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CATEGORIAS = [
  { label: 'Sneakers',   value: 'SNEAKERS',   activo: true  },
  { label: 'Prendas',    value: 'PRENDAS',    activo: true  },
  { label: 'Accesorios', value: 'ACCESORIOS', activo: true  },
  { label: 'Tech',       value: 'TECH',       activo: false },
];

export default function Header() {
  const { getItemCount, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // Header se vuelve sólido al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.97)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-bg-primary text-xs font-bold">L</span>
            </div>
            <span className="font-oswald text-xl font-bold tracking-[0.15em] text-white uppercase">
              LU Shop+
            </span>
          </Link>

          {/* Nav desktop — centrado */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {CATEGORIAS.map(cat =>
              cat.activo ? (
                <Link
                  key={cat.value}
                  href={`/?categoria=${cat.value}`}
                  className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 font-medium"
                >
                  {cat.label}
                </Link>
              ) : (
                <span
                  key={cat.value}
                  className="text-[11px] uppercase tracking-[0.2em] text-white/20 cursor-not-allowed flex items-center gap-1.5"
                >
                  {cat.label}
                  <span className="text-[9px] border border-white/20 px-1 py-0.5 rounded-sm text-white/30">soon</span>
                </span>
              )
            )}
          </nav>

          {/* Derecha: carrito + menu */}
          <div className="flex items-center gap-4">

            {/* Carrito */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-[11px] uppercase tracking-[0.15em] hidden sm:block font-medium">
                Carrito
              </span>
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-bg-primary rounded-full flex items-center justify-center text-[9px] font-bold">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white/70 hover:text-white transition-colors p-1"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-500"
          style={{ maxHeight: menuOpen ? '400px' : '0' }}
        >
          <nav className="flex flex-col gap-6 py-8 border-t border-white/10">
            {CATEGORIAS.map(cat =>
              cat.activo ? (
                <Link
                  key={cat.value}
                  href={`/?categoria=${cat.value}`}
                  className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ) : (
                <span key={cat.value} className="text-sm uppercase tracking-[0.2em] text-white/20 flex items-center gap-2">
                  {cat.label}
                  <span className="text-[10px] border border-white/20 px-1.5 py-0.5 rounded text-white/25">Próximamente</span>
                </span>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

