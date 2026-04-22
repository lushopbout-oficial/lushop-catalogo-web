'use client';

import Image from 'next/image';

export default function DarkBanner() {
  return (
    <section className="bg-bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[500px]">

          {/* Texto */}
          <div className="py-16 lg:py-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-white opacity-30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">
                Nueva Colección
              </span>
            </div>
            <h2 className="font-oswald text-5xl lg:text-6xl font-bold text-white uppercase leading-tight mb-6">
              Diseñados<br />para<br />destacar.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-xs">
              Modelos exclusivos seleccionados para quienes pisan distinto.
            </p>
            <button
              onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 border border-white/30 text-white text-[11px] uppercase tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-black transition-all duration-400 font-semibold"
            >
              Ver Colección
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Imagen */}
          <div className="relative hidden lg:block h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
              alt="Colección destacada"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
