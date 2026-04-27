'use client';

import { useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    label:    'Concepto Total',
    titulo:   'Tu estilo,\ncompleto.',
    subtitulo: 'Sneakers, prendas y tecnología en un solo lugar. La curaduría más exclusiva para tu outfit diario.',
    imagen:   '/hero/hero-lifestyle.JPG', // Ruta actualizada
    bg:       '#f0ede8',
  },
  {
    label:    'Sneakers de Culto',
    titulo:   'Hecho para\ndestacar.',
    subtitulo: 'Los clásicos que nunca mueren y los lanzamientos más recientes. Encuentra tu par ideal.',
    imagen:   '/hero/hero-sneakers.JPG', // Ruta actualizada
    bg:       '#e8ecf0',
  },
  {
    label:    'Accesorios & Tech',
    titulo:   'Tecnología\ny Detalles.',
    subtitulo: 'Complementos que definen tu día a día. Calidad y diseño en cada accesorio.',
    imagen:   '/hero/hero-accessories.JPG', // Ruta actualizada
    bg:       '#ece8f0',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx) => {
    if (idx === current || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 500);
  };

  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden transition-colors duration-1000"
      style={{ background: slide.bg, minHeight: '90vh' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center min-h-[90vh] gap-12">

          {/* Texto */}
          <div className="flex-1 py-16 z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
              <div className="w-10 h-px bg-black opacity-20" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold transition-opacity duration-500"
                    style={{ opacity: animating ? 0 : 1 }}>
                {slide.label}
              </span>
            </div>

            <h1
              className="font-oswald text-7xl sm:text-8xl lg:text-[100px] font-bold leading-[0.85] mb-8 tracking-tighter text-black transition-all duration-700 ease-out"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(40px)' : 'translateY(0)',
                whiteSpace: 'pre-line',
              }}
            >
              {slide.titulo}
            </h1>

            <p
              className="text-gray-600 text-lg mb-12 max-w-sm mx-auto lg:mx-0 transition-all duration-700 delay-100"
              style={{ opacity: animating ? 0 : 1, whiteSpace: 'pre-line' }}
            >
              {slide.subtitulo}
            </p>

            <button
              onClick={scrollToProducts}
              className="group relative inline-flex items-center gap-4 bg-black text-white text-[12px] uppercase tracking-[0.3em] px-10 py-5 font-bold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <span className="relative z-10">Explorar Catálogo</span>
              <svg className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {/* Indicadores */}
            <div className="flex items-center justify-center lg:justify-start gap-5 mt-20">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className="flex items-center gap-3 group">
                  <span className={`text-[11px] font-bold transition-colors ${i === current ? 'text-black' : 'text-gray-300'}`}>0{i + 1}</span>
                  <div className="h-[2px] transition-all duration-500 bg-black"
                       style={{ width: i === current ? '40px' : '15px', opacity: i === current ? 1 : 0.2 }} />
                </button>
              ))}
            </div>
          </div>

          {/* Imagen con animación float */}
          <div className="flex-1 w-full flex items-center justify-center relative min-h-[50vh] lg:min-h-[90vh]">
            <div
              className="relative w-full aspect-square lg:aspect-auto lg:h-[75vh] transition-all duration-700 ease-out animate-float"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateX(30px) scale(0.9)' : 'translateX(0) scale(1)',
              }}
            >
              <Image
                src={slide.imagen}
                alt={slide.titulo}
                fill
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
