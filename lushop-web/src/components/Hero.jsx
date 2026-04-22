'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    label:    'Nuevos Arrivals',
    titulo:   'Eleva tu\nestilo.',
    subtitulo:'Sneakers premium.\nPrecios accesibles.',
    imagen:   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80',
    bg:       '#f0ede8',
  },
  {
    label:    'Nueva Colección',
    titulo:   'Hecho para\ndestacar.',
    subtitulo:'Modelos exclusivos\nseleccionados para ti.',
    imagen:   'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&q=80',
    bg:       '#e8ecf0',
  },
  {
    label:    'Colección Premium',
    titulo:   'Estilo sin\ncompromisos.',
    subtitulo:'Las mejores marcas\na tu alcance.',
    imagen:   'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=80',
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
    }, 400);
  };

  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden transition-colors duration-700"
      style={{ background: slide.bg, minHeight: '88vh' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full">
        <div className="flex items-center min-h-[88vh] gap-8">

          {/* Lado izquierdo — texto */}
          <div className="flex-1 py-20 z-10">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-text-primary opacity-40" />
              <span
                className="text-[10px] uppercase tracking-[0.3em] text-text-secondary font-medium transition-opacity duration-300"
                style={{ opacity: animating ? 0 : 1 }}
              >
                {slide.label}
              </span>
            </div>

            {/* Título */}
            <h1
              className="font-oswald text-6xl sm:text-7xl lg:text-[82px] font-bold leading-none mb-6 tracking-tight text-text-primary transition-all duration-500"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(16px)' : 'translateY(0)',
                whiteSpace: 'pre-line',
              }}
            >
              {slide.titulo}
            </h1>

            {/* Subtítulo */}
            <p
              className="text-text-secondary text-base leading-relaxed mb-10 max-w-xs transition-all duration-500 delay-75"
              style={{
                opacity: animating ? 0 : 1,
                whiteSpace: 'pre-line',
              }}
            >
              {slide.subtitulo}
            </p>

            {/* CTA */}
            <button
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-3 bg-text-primary text-white text-[11px] uppercase tracking-[0.2em] px-8 py-4 font-semibold hover:bg-black transition-all duration-300"
            >
              Explorar Catálogo
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Slide indicators */}
            <div className="flex items-center gap-4 mt-16">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="flex items-center gap-3 group"
                >
                  <span className={`text-[11px] font-medium transition-colors duration-300 ${i === current ? 'text-text-primary' : 'text-text-secondary/40'}`}>
                    0{i + 1}
                  </span>
                  <div className="h-px transition-all duration-500 bg-text-primary"
                    style={{ width: i === current ? '32px' : '16px', opacity: i === current ? 1 : 0.2 }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Lado derecho — imagen */}
          <div
            className="hidden lg:flex flex-1 items-center justify-center relative"
            style={{ minHeight: '88vh' }}
          >
            <div
              className="relative w-full transition-all duration-500"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateX(20px) scale(0.97)' : 'translateX(0) scale(1)',
                height: '70vh',
              }}
            >
              <Image
                src={slide.imagen}
                alt={slide.titulo}
                fill
                className="object-contain object-center drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
