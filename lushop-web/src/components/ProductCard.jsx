'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

// Formatea precio en MXN sin decimales
const formatPrice = (num) =>
  Math.round(Number(num) || 0).toLocaleString('es-MX');

export default function ProductCard({ group }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(group.sizes[0]);
  const [added, setAdded] = useState(false);

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

  const badge = (() => {
    if (group.segmento === 'Premium')
      return { text: 'PREMIUM', cls: 'bg-accent-gold text-bg-primary' };
    if (totalStock <= 2)
      return { text: `${totalStock} DISPONIBLES`, cls: 'bg-accent-silver text-bg-primary' };
    return null;
  })();

  return (
    <div className="group bg-bg-card border border-border-light overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-accent-silver hover:shadow-2xl hover:shadow-accent-silver/10">

      {/* Imagen */}
      <Link href={`/producto/${selectedSize.sku}`} className="block">
        <div className="relative h-80 bg-bg-secondary overflow-hidden cursor-pointer">
          <Image
            src={group.foto_url || '/placeholder.jpg'}
            alt={group.modelo}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {badge && (
            <div className={`absolute top-4 right-4 ${badge.cls} px-3 py-1.5 text-xs font-bold uppercase tracking-wider`}>
              {badge.text}
            </div>
          )}

          {totalStock > 2 && (
            <div className="absolute bottom-4 left-4 bg-accent-silver/95 text-bg-primary px-3 py-1.5 text-xs font-semibold tracking-wide">
              {totalStock} Disponibles
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-6">
        <div className="text-xs text-text-secondary uppercase tracking-widest mb-2 font-semibold">
          {group.marca}
        </div>

        <h3 className="font-oswald text-xl font-semibold mb-4 text-text-primary leading-tight tracking-wide">
          {group.modelo}
        </h3>

        {/* Selector de tallas */}
        <div className="mb-4">
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">
            Talla:&nbsp;
            <span className="text-text-primary font-semibold">
              {selectedSize.talla}
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {group.sizes.map(size => (
              <button
                key={size.sku}
                onClick={() => setSelectedSize(size)}
                title={`Stock: ${size.stock}`}
                className={`px-3 py-1 text-xs font-semibold border transition-all ${
                  selectedSize.sku === size.sku
                    ? 'bg-accent-silver text-bg-primary border-accent-silver'
                    : 'bg-transparent text-text-secondary border-border-medium hover:border-accent-silver hover:text-text-primary'
                }`}
              >
                {size.talla}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light">
          <div className="font-oswald text-3xl font-bold text-accent-silver">
            <span className="text-lg opacity-80">$</span>
            {formatPrice(selectedSize.precio_venta)}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-5 py-2 border text-xs uppercase tracking-wider font-semibold transition-all ${
              added
                ? 'bg-green-600 border-green-600 text-white'
                : 'border-accent-silver text-accent-silver hover:bg-accent-silver hover:text-bg-primary'
            }`}
          >
            {added ? '✓ Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
