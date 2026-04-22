'use client';

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">

      {/* Imagen fondo full bleed */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out scale-105 hover:scale-100"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800)',
          filter: 'brightness(0.25)',
        }}
      />

      {/* Línea decorativa izquierda */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-silver opacity-30" />

      {/* Contenido — alineado izquierda, estilo editorial */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full">

        {/* Label superior */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-accent-silver" />
          <span className="text-accent-silver text-xs uppercase tracking-[0.3em] font-medium">
            Nueva Colección 2025
          </span>
        </div>

        {/* Título principal */}
        <h1 className="font-oswald text-6xl sm:text-7xl lg:text-[7rem] font-bold uppercase leading-none mb-6 tracking-tight">
          <span className="block text-white">Sneakers</span>
          <span className="block text-accent-silver">Premium</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-text-secondary text-base sm:text-lg mb-12 max-w-md leading-relaxed font-light">
          Marcas exclusivas. Modelos únicos.<br />
          Envío gratis en compras mayores a $2,500 MXN.
        </p>

        {/* Botones */}
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToProducts}
            className="group relative px-10 py-4 border border-white text-white text-xs uppercase tracking-[0.2em] font-semibold overflow-hidden transition-all duration-500 hover:text-bg-primary"
          >
            <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative">Explorar Catálogo</span>
          </button>

          <button
            onClick={scrollToProducts}
            className="text-text-secondary text-xs uppercase tracking-[0.2em] hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <span>Ver todo</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-12 mt-20 pt-12 border-t border-border-light">
          {[
            { num: '250+', label: 'Modelos' },
            { num: '15+', label: 'Marcas' },
            { num: '100%', label: 'Garantizado' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-oswald text-2xl font-bold text-white">{stat.num}</div>
              <div className="text-text-secondary text-xs uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Número decorativo derecho */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 writing-mode-vertical">
        <span className="text-white/5 font-oswald text-[12rem] font-bold leading-none select-none">
          LU
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent-silver/50 animate-pulse" />
        <span className="text-text-secondary text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
