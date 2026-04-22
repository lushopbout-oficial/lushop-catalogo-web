export default function TrustBar() {
  const items = [
    { icon: '◎', title: 'Calidad garantizada',    sub: 'Productos 100% originales y verificados.' },
    { icon: '◈', title: 'Precios justos',         sub: 'Sneakers premium a precios accesibles.'   },
    { icon: '◻', title: 'Envío seguro',           sub: 'Envíos a todo México rápidos y seguros.'  },
    { icon: '◑', title: 'Atención personalizada', sub: 'Te ayudamos a encontrar lo que buscas.'   },
  ];

  return (
    <section className="border-t border-b border-border-light bg-bg-secondary py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(item => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="text-xl text-text-secondary flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <p className="text-[12px] font-semibold text-text-primary uppercase tracking-wider mb-1">{item.title}</p>
                <p className="text-[12px] text-text-secondary leading-relaxed">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
