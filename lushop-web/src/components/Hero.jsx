'use client';

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600)',
          filter: 'brightness(0.3) contrast(1.1)',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary/85 to-bg-secondary/70" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-6">
          Sneakers{' '}
          <span className="bg-gradient-to-r from-accent-silver to-white bg-clip-text text-transparent">
            Premium
          </span>
          <br />
          Precios Accesibles
        </h1>

        <p className="text-lg sm:text-xl text-text-secondary mb-10 font-light leading-relaxed">
          Marcas reconocidas, modelos exclusivos y calidad garantizada.
          <br />
          Envío gratis en compras mayores a $2,500 MXN
        </p>

        <button
          onClick={scrollToProducts}
          className="relative px-10 py-4 bg-accent-silver text-bg-primary font-semibold text-sm uppercase tracking-widest overflow-hidden group transition-all hover:shadow-xl hover:shadow-accent-silver/20 hover:-translate-y-1"
        >
          <span className="relative z-10">Explorar Catálogo</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-accent-silver"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
