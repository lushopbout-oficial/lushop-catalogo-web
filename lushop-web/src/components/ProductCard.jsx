'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const formatPrice = (num) =>
  Math.round(Number(num) || 0).toLocaleString('es-MX');

export default function ProductCard({ group }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(group.sizes[0]);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize) return;
    addToCart({
      sku:          selectedSize.sku,
      marca:        group.marca,
      modelo:       group.modelo,
      categoria:    group.categoria,
      segmento:     group.segmento,
      foto_url:     group.foto_url,
      talla:        selectedSize.talla,
      stock:        selectedSize.stock,
      precio_venta: selectedSize.precio_venta,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const totalStock = group.sizes.reduce((sum, s) => sum + s.stock, 0);
  const isPremium = group.segmento === 'Premium';

  return (
    <div
      className="group relative bg-bg-card overflow-hidden transition-all duration-700"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
    >
      {/* Imagen */}
      <Link href={`/producto/${selectedSize.sku}`} className="block">
        <div className="relative overflow-hidden bg-bg-secondary" style={{ aspectRatio: '4/3' }}>
          <Image
            src={group.foto_url || '/placeholder.jpg'}
            alt={group.modelo}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay al hover */}
          <div
            className="absolute inset-0 bg-bg-primary transition-opacity duration-500"
            style={{ opacity: hovered ? 0.15 : 0 }}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isPremium && (
              <span className="bg-accent-gold text-bg-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                Premium
              </span>
            )}
            {totalStock <= 2 && (
              <span className="bg-white text-bg-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                {totalStock} disponibles
              </span>
            )}
          </div>

          {/* Botón rápido al hover — aparece desde abajo */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-500"
            style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)' }}
          >
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-bg-primary hover:bg-accent-silver'
              }`}
            >
              {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </Link>

      {/* Info del producto */}
      <div className="p-5">

        {/* Marca */}
        <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] mb-2 font-medium">
          {group.marca}
        </p>

        {/* Modelo */}
        <h3 className="font-oswald text-lg font-semibold text-white uppercase tracking-wide mb-4 leading-tight">
          {group.modelo}
        </h3>

        {/* Selector tallas */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {group.sizes.map(size => (
              <button
                key={size.sku}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[36px] px-2 py-1 text-[11px] font-medium border transition-all duration-200 ${
                  selectedSize.sku === size.sku
                    ? 'border-white bg-white text-bg-primary'
                    : 'border-border-light text-text-secondary hover:border-border-medium hover:text-white'
                }`}
              >
                {size.talla}
              </button>
            ))}
          </div>
        </div>

        {/* Precio + línea separadora */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light">
          <div className="font-oswald text-2xl font-bold text-white">
            <span className="text-sm text-text-secondary mr-0.5">$</span>
            {formatPrice(selectedSize.precio_venta)}
            <span className="text-xs text-text-secondary ml-1 font-normal">MXN</span>
          </div>

          {/* Ícono de carrito — versión desktop (el botón principal está en hover) */}
          <button
            onClick={handleAddToCart}
            className={`p-2 border transition-all duration-300 ${
              added
                ? 'border-green-500 text-green-500'
                : 'border-border-light text-text-secondary hover:border-white hover:text-white'
            }`}
            title="Agregar al carrito"
          >
            {added ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

