"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// --- CONFIGURACIÓN DE LOS SLIDES (NUEVOS FONDOS PARA PNG) ---
const SLIDES = [
  {
    label:    'Curaduría Streetwear',
    titulo:   'El Arte del\nStreetwear.',
    subtitulo:'Descubre la selección más exclusiva de sneakers y prendas de diseño.',
    // Ruta a tu nueva imagen PNG sin fondo
    imagen:   '/hero/hero-lifestyle.PNG', 
    // --- ESTE ES EL CAMBIO CLAVE ---
    // Un tono crema muy suave y cálido que haga resaltar la prenda y combine con tu header
    bg:       '#F5F3EF', 
    btnText:  'Explorar Colección',
    btnLink:  '#shop-now',
  },
  {
    label:    'Sneakers de Culto',
    titulo:   'Hechos para\nSobresalir.',
    subtitulo:'Clásicos atemporales y los drops más recientes. Tu próximo par está aquí.',
    imagen:   '/hero/hero-sneakers.PNG',
    // Un gris claro y frío para que los colores de los sneakers (como los New Balance azules) resalten
    bg:       '#EAECEF',
    btnText:  'Ver Sneakers',
    btnLink:  '#sneakers',
  },
  {
    label:    'Accesorios Minimalistas',
    titulo:   'Detalles que\nDefinen.',
    subtitulo:'Completa tu outfit con tecnología y accesorios de alta gama.',
    imagen:   '/hero/hero-accessories.PNG',
    // Un tono lavanda/gris muy sutil para darle una vibra "Tech" y premium
    bg:       '#E5E3ED',
    btnText:  'Ver Accesorios',
    btnLink:  '#accessories',
  },
];

// --- COMPONENTE PRINCIPAL ---
export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); // Cambia cada 8 segundos
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section 
      // Agregamos una transición suave de color para cuando cambie el slide
      className="relative w-full h-[85vh] lg:h-[90vh] overflow-hidden transition-colors duration-1000"
      // Aquí aplicamos el color de fondo dinámico definido en el objeto SLIDES
      style={{ backgroundColor: slide.bg }}
    >
      
      {/* --- EFECTO DE CRISTAL SUPERIOR (Para conectar con tu Header) --- */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-white/5 backdrop-blur-[2px] z-20 pointer-events-none" />

      {/* --- CONTENIDO DEL SLIDE (ANIMADO) --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-10 flex items-center justify-center pt-24 pb-16"
        >
          <div className="max-w-[1700px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* TEXTO */}
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start">
              
              {/* Etiqueta Premium */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full border border-black/5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-black/50" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/60 pt-0.5">
                  {slide.label}
                </span>
              </motion.div>

              {/* Título (Usando Oswald para el look premium) */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                className="font-oswald text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-black leading-[1.05]"
              >
                {slide.titulo.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </motion.h1>

              {/* Subtítulo */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
                className="text-base md:text-lg text-black/80 max-w-xl font-light leading-relaxed"
              >
                {slide.subtitulo}
              </motion.p>

              {/* Botón CTA (Minimalista y Negro) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
                className="pt-6"
              >
                <Link href={slide.btnLink} className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gray-800 rounded-sm">
                  <ShoppingBag className="w-4 h-4 text-white" />
                  {slide.btnText}
                </Link>
              </motion.div>
            </div>

            {/* IMAGEN (NUEVO AJUSTE PARA PNG) */}
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-center h-[35vh] lg:h-[60vh]"
            >
              {/* Contenedor de la imagen sin fondo (quitamos bordes y sombras para minimalismo extremo) */}
              <div className="relative w-full h-full max-w-2xl group">
                {/* Imagen PNG cargada desde /public/hero/ */}
                <img 
                  src={slide.imagen} 
                  alt={slide.titulo}
                  // Usamos object-contain para que el producto transparente no se corte
                  className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  // Eliminamos el efecto overlay sutil porque ahora queremos que el PNG flote
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- CONTROLES DE NAVEGACIÓN (SÚPER MINIMALISTAS) --- */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2">
        {/* Botón Prev */}
        <button onClick={prevSlide} className="p-3 bg-white/20 text-black/60 hover:bg-white/50 hover:text-black transition-all border border-black/5 rounded-sm">
          <ArrowLeft className="w-4 h-4" />
        </button>
        {/* Botón Next */}
        <button onClick={nextSlide} className="p-3 bg-white/20 text-black/60 hover:bg-white/50 hover:text-black transition-all border border-black/5 rounded-sm">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* --- INDICADORES (LÍNEAS) --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1 transition-all duration-300 rounded-full ${i === currentSlide ? 'w-12 bg-black' : 'w-4 bg-black/20 hover:bg-black/40'}`} />
        ))}
      </div>

    </section>
  );
}
