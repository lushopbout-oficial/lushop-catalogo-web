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
      {/* Announcement bar */}
      <div className="bg-bg-dark text-text-light text-center py-2.5 text-[11px] uppercase tracking-[0.25em] font-medium">
        🚚 Envío gratis en compras mayores a $2,500 MXN
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-bg-secondary transition-all duration-300"
        style={{ boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* Logo */}
            <Link href="/" className="font-oswald text-xl font-bold tracking-[0.12em] text-text-primary uppercase">
              LU SHOP+
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {CATEGORIAS.map(cat => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="text-[12px] uppercase tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
                >
                  {cat.label}
                </Link>
              ))}
              <span className="text-[12px] uppercase tracking-[0.15em] text-text-secondary/40 cursor-not-allowed flex items-center gap-1.5">
                Tech
                <span className="text-[9px] border border-current px-1 py-0.5 rounded-sm opacity-60">soon</span>
              </span>
            </nav>

            {/* Íconos derecha */}
            <div className="flex items-center gap-4">
              {/* Buscar */}
              <button className="text-text-secondary hover:text-text-primary transition-colors hidden sm:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Carrito */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-bg-dark text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                    {getItemCount()}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-px bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-px bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-64 pb-6' : 'max-h-0'}`}>
            <nav className="flex flex-col gap-5 pt-4 border-t border-border-light">
              {CATEGORIAS.map(cat => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="text-sm uppercase tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors"
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
