'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Determinar badge
  const getBadge = () => {
    if (product.segmento === 'Premium') {
      return { text: 'PREMIUM', color: 'bg-accent-gold' };
    }
    if (product.stock <= 2) {
      return { text: `${product.stock} DISPONIBLES`, color: 'bg-accent-silver' };
    }
    return null;
  };

  const badge = getBadge();

  return (
    <Link href={`/producto/${product.sku}`}>
      <div className="group bg-bg-card border border-border-light overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:border-accent-silver hover:shadow-2xl hover:shadow-accent-silver/10">
        {/* Image Container */}
        <div className="relative h-80 bg-bg-secondary overflow-hidden">
          <Image
            src={product.foto_url || '/placeholder.jpg'}
            alt={product.modelo}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge */}
          {badge && (
            <div className={`absolute top-4 right-4 ${badge.color} text-bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider`}>
              {badge.text}
            </div>
          )}

          {/* Stock Indicator */}
          {product.stock > 2 && (
            <div className="absolute bottom-4 left-4 bg-accent-silver/95 text-bg-primary px-3 py-1.5 text-xs font-semibold tracking-wide">
              {product.stock} Disponibles
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Brand */}
          <div className="text-xs text-text-secondary uppercase tracking-widest mb-2 font-semibold">
            {product.marca}
          </div>

          {/* Model Name */}
          <h3 className="font-oswald text-xl font-semibold mb-2 text-text-primary leading-tight tracking-wide">
            {product.modelo}
          </h3>

          {/* Size */}
          <p className="text-sm text-text-secondary mb-4">
            Talla: {product.talla}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border-light">
            {/* Price */}
            <div className="font-oswald text-3xl font-bold text-accent-silver">
              <span className="text-lg opacity-80">$</span>
              {product.precio_venta.toLocaleString()}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 border border-accent-silver text-accent-silver text-xs uppercase tracking-wider font-semibold transition-all hover:bg-accent-silver hover:text-bg-primary"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
