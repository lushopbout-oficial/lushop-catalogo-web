'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CATEGORIAS = [
  { label: 'Sneakers',    value: 'SNEAKERS',    activo: true  },
  { label: 'Prendas',     value: 'PRENDAS',     activo: true  },
  { label: 'Accesorios',  value: 'ACCESORIOS',  activo: true  },
  { label: 'Tech',        value: 'TECH',        activo: false }, // próximamente
];

export default function Header() {
  const { getItemCount, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/98 backdrop-blur-xl border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-silver to-white rounded flex items-center justify-center text-lg transition-transform group-hover:scale-110">
              🛍
            </div>
            <h1 className="font-oswald text-2xl font-bold tracking-wider text-text-primary">
              LU SHOP+
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {CATEGORIAS.map(cat => (
              cat.activo ? (
                <Link
                  key={cat.value}
                  href={`/?categoria=${cat.value}`}
                  className="nav-link text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
                >
                  {cat.label}
                </Link>
              ) : (
                <span
                  key={cat.value}
                  title="Próximamente"
                  className="text-sm uppercase tracking-wider text-text-secondary/40 cursor-not-allowed flex items-center gap-1"
                >
                  {cat.label}
                  <span className="text-[10px] border border-text-secondary/30 px-1 rounded">
                    soon
                  </span>
                </span>
              )
            ))}

            {/* Carrito */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative px-5 py-2 border border-border-medium text-text-primary text-sm uppercase tracking-wider hover:bg-accent-silver hover:text-bg-primary hover:border-accent-silver transition-all"
            >
              Carrito
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent-gold text-bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                  {getItemCount()}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-text-primary p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border-light pt-4">
            {CATEGORIAS.map(cat => (
              cat.activo ? (
                <Link
                  key={cat.value}
                  href={`/?categoria=${cat.value}`}
                  className="text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ) : (
                <span
                  key={cat.value}
                  className="text-sm uppercase tracking-wider text-text-secondary/40 flex items-center gap-2"
                >
                  {cat.label}
                  <span className="text-[10px] border border-text-secondary/30 px-1 rounded">soon</span>
                </span>
              )
            ))}
            <button
              onClick={() => { setIsOpen(true); setMenuOpen(false); }}
              className="text-left px-4 py-2 border border-border-medium text-text-primary text-sm uppercase tracking-wider hover:bg-accent-silver hover:text-bg-primary transition-all"
            >
              Carrito ({getItemCount()})
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
