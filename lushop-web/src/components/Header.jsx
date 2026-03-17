'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/?categoria=SNEAKERS"
              className="nav-link text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
            >
              Sneakers
            </Link>
            <Link
              href="/?categoria=KIDS"
              className="nav-link text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
            >
              Kids
            </Link>
            <Link
              href="/?categoria=HOMBRE"
              className="nav-link text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
            >
              Hombre
            </Link>
            <Link
              href="/?categoria=MUJER"
              className="nav-link text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
            >
              Mujer
            </Link>

            {/* Cart Button */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-text-primary p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border-light pt-4">
            <Link
              href="/?categoria=SNEAKERS"
              className="text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Sneakers
            </Link>
            <Link
              href="/?categoria=KIDS"
              className="text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Kids
            </Link>
            <Link
              href="/?categoria=HOMBRE"
              className="text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Hombre
            </Link>
            <Link
              href="/?categoria=MUJER"
              className="text-sm uppercase tracking-wider text-text-secondary hover:text-accent-silver transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Mujer
            </Link>
            <button
              onClick={() => {
                setIsOpen(true);
                setMenuOpen(false);
              }}
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
