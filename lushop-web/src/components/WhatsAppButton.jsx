"use client";
import React from 'react';
// Importamos el icono de WhatsApp desde lucide-react para un look más limpio
import { MessageCircle } from 'lucide-react'; 

export default function WhatsAppButton() {
  // CONFIGURACIÓN: Tu número y mensaje personalizado
  const numero = "+521234567890"; // Reemplaza con tu número real
  const mensaje = "Hola LU SHOP+, me interesa un producto del catálogo.";
  const link = `https://wa.me/${numero.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      // CLASES DE TAILWIND PARA EL EFECTO CRISTAL PREMIUM
      className="
        fixed bottom-8 right-8 z-50 
        flex items-center gap-3 
        p-4 pr-6
        /* 1. Fondo Traslúcido (Blanco con 10% de opacidad) */
        bg-white/10 
        /* 2. Desenfoque de Fondo (Glassmorphism) */
        backdrop-blur-md 
        /* 3. Borde fino y sutil (Gris/Blanco con 20% opacidad) */
        border border-white/20 
        /* 4. Sombra suave para dar profundidad */
        shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] 
        /* 5. Forma y Transiciones */
        rounded-full 
        text-black 
        transition-all duration-500 ease-out 
        /* 6. Efecto Hover: Menos desenfoque, fondo un poco más oscuro y sube un poco */
        hover:bg-black/5 hover:backdrop-blur-sm hover:-translate-y-1 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]
        group
      "
      aria-label="Contactar por WhatsApp"
    >
      {/* Icono de WhatsApp Estilizado (reemplaza el icono verde chillante) */}
      <div className="relative flex h-6 w-6 items-center justify-center">
        {/* Usamos el icono de Lucide en negro para minimalismo */}
        <MessageCircle className="w-6 h-6 text-black transition-transform duration-300 group-hover:scale-110" />
        
        {/* Un pequeño punto de notificación sutil (opcional) */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/20 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black/40"></span>
        </span>
      </div>

      {/* Texto del botón (Opcional, pero ayuda a la conversión) */}
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-black">
        WhatsApp 
      </span>
    </a>
  );
}
