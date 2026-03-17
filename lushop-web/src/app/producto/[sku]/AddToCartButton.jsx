'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (product.stock <= 0) {
    return (
      <button
        disabled
        className="w-full py-5 bg-bg-secondary border border-border-light text-text-secondary cursor-not-allowed uppercase tracking-wider font-semibold"
      >
        Agotado
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full py-5 bg-accent-silver text-bg-primary hover:bg-white transition-all uppercase tracking-wider font-bold text-lg flex items-center justify-center gap-3 group"
    >
      <svg
        className="w-6 h-6 transition-transform group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      Agregar al Carrito
    </button>
  );
}
