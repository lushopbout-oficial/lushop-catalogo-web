'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Check, Plus } from 'lucide-react';

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
      sku: selectedSize.sku, marca: group.marca, modelo: group.modelo,
      categoria: group.categoria, segmento: group.segmento,
      foto_url: group.foto_url, talla: selectedSize.talla,
      stock: selectedSize.stock, precio_venta: selectedSize.precio_venta,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const totalStock = group.sizes.reduce((sum, s) => sum + s.stock, 0);
  const isPremium = group.segmento === 'Premium';

  return (
    <div className="group relative flex flex-col bg-white rounded-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      
      {/* --- ÁREA DE IMAGEN --- */}
      <Link href={`/producto/${selectedSize.sku}`} className="relative block aspect-square overflow-hidden rounded-t-xl bg-[#fcfcfc]">
        <Image
          src={group.foto_url || '/placeholder.jpg'}
          alt={group.modelo}
          fill
          className="object-contain p-4 md:p-8 transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Badges Flotantes - Ubicación Estratégica para no tapar el centro */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none z-10">
          {isPremium && (
            <span className="bg-black/5 backdrop-blur-md border border-black/5 text-black/50 text-[7px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-sm">
              Premium
            </span>
          )}
          
          {totalStock === 1 && (
            <span className="bg-red-500/10 backdrop-blur-md border border-red-500/10 text-red-600 text-[7px] font-black uppercase tracking-[0.1em] px-2 py-1 rounded-sm">
              Única
            </span>
          )}
        </div>
      </Link>

      {/* --- INFO DEL PRODUCTO --- */}
      <div className="flex flex-col flex-grow p-4 md:p-6">
        {/* Marca y Modelo */}
        <div className="mb-4">
          <p className="text-[9px] text-black/40 font-bold uppercase tracking-[0.3em] mb-1">
            {group.marca}
          </p>
          <h3 className="font-oswald text-sm md:text-lg font-bold text-black uppercase tracking-tight leading-tight line-clamp-2">
            {group.modelo}
          </h3>
        </div>

        {/* Selector de Tallas */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {group.sizes.map(size => (
            <button
              key={size.sku}
              onClick={() => setSelectedSize(size)}
              className={`
                min-w-[32px] h-8 px-2 flex items-center justify-center
                text-[10px] font-bold transition-all duration-300 rounded-md border
                ${selectedSize.sku === size.sku
                  ? 'bg-black border-black text-white'
                  : 'bg-transparent border-black/5 text-black/40 hover:border-black/20 hover:text-black'
                }
              `}
            >
              {size.talla}
            </button>
          ))}
        </div>

        {/* Footer de Tarjeta: Precio y Botón */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/[0.03]">
          <div className="flex flex-col">
            <span className="text-[9px] text-black/30 font-bold uppercase tracking-widest">Precio</span>
            <div className="font-oswald text-lg md:text-xl font-black text-black">
              ${formatPrice(selectedSize.precio_venta)}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`
              relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-500
              ${added 
                ? 'bg-green-500 text-white rotate-[360deg]' 
                : 'bg-black text-white hover:bg-gray-800 active:scale-90 shadow-lg shadow-black/10'
              }
            `}
          >
            {added ? <Check size={18} /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
