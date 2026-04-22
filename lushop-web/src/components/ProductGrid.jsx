'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/services/sheetsAPI';

const CATEGORIA_LABELS = {
  SNEAKERS:   'Sneakers',
  PRENDAS:    'Prendas',
  ACCESORIOS: 'Accesorios',
  TECH:       'Tech',
};

const MARCAS = ['Todos', 'Nike', 'Adidas', 'Jordan', 'Premium'];

function groupByModel(products) {
  const map = {};
  products.forEach(p => {
    const key = `${p.marca.trim().toLowerCase()}__${p.modelo.trim().toLowerCase()}`;
    if (!map[key]) {
      map[key] = {
        marca: p.marca.trim(), modelo: p.modelo.trim(),
        categoria: p.categoria ? p.categoria.trim().toUpperCase() : '',
        segmento: p.segmento, foto_url: p.foto_url, sizes: [],
      };
    }
    if (p.stock > 0) {
      const tk = String(p.talla).trim().toLowerCase();
      const ex = map[key].sizes.find(s => String(s.talla).trim().toLowerCase() === tk);
      if (ex) { ex.stock += p.stock; }
      else { map[key].sizes.push({ sku: p.sku, talla: p.talla, stock: p.stock, precio_venta: Number(p.precio_venta) || 0 }); }
    }
  });
  return Object.values(map).filter(m => m.sizes.length > 0).map(m => ({
    ...m,
    sizes: m.sizes.sort((a, b) => {
      const na = parseFloat(a.talla), nb = parseFloat(b.talla);
      if (isNaN(na) || isNaN(nb)) return String(a.talla).localeCompare(String(b.talla));
      return na - nb;
    }),
  }));
}

export default function ProductGrid({ initialCategory = null }) {
  const [rawProducts, setRawProducts]         = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [activeCategory, setActiveCategory]   = useState(
    initialCategory ? initialCategory.trim().toUpperCase() : null
  );
  const [activeMarca, setActiveMarca]         = useState('Todos');
  const [searchTerm, setSearchTerm]           = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try { setRawProducts(await getProducts()); }
      catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    setActiveCategory(initialCategory ? initialCategory.trim().toUpperCase() : null);
    setActiveMarca('Todos');
    setSearchTerm('');
  }, [initialCategory]);

  const groupedProducts = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = rawProducts.filter(p => {
      if (activeCategory) {
        if ((p.categoria || '').trim().toUpperCase() !== activeCategory) return false;
      }
      if (activeMarca !== 'Todos') {
        if (!(p.marca || '').trim().toLowerCase().includes(activeMarca.toLowerCase())) return false;
      }
      if (lower) {
        const m = (p.modelo || '').toLowerCase(), b = (p.marca || '').toLowerCase();
        if (!m.includes(lower) && !b.includes(lower)) return false;
      }
      return true;
    });
    return groupByModel(filtered);
  }, [rawProducts, activeCategory, activeMarca, searchTerm]);

  const titulo = activeCategory ? (CATEGORIA_LABELS[activeCategory] || activeCategory) : 'Nuevos Arrivals';
  const mostrarMarcas = !activeCategory || activeCategory === 'SNEAKERS';

  return (
    <section id="productos" className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

      {/* Header sección */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
        <div>
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="text-[10px] text-text-secondary uppercase tracking-[0.2em] hover:text-white transition-colors mb-3 flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
          )}
          <h2 className="font-oswald text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white">
            {titulo}
          </h2>
          {!loading && (
            <p className="text-text-secondary text-sm mt-2">
              {groupedProducts.length} {groupedProducts.length === 1 ? 'modelo' : 'modelos'}
            </p>
          )}
        </div>

        {/* Filtros de marca */}
        {mostrarMarcas && (
          <div className="flex flex-wrap gap-2">
            {MARCAS.map(marca => (
              <button
                key={marca}
                onClick={() => setActiveMarca(marca)}
                className={`px-5 py-2 text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${
                  activeMarca === marca
                    ? 'bg-white text-bg-primary border-white'
                    : 'bg-transparent text-text-secondary border-border-light hover:border-border-medium hover:text-white'
                }`}
              >
                {marca}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buscador minimalista */}
      <div className="mb-12 max-w-sm">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar modelo o marca..."
            className="w-full bg-transparent border-b border-border-medium text-white text-sm py-3 pr-8 placeholder-text-secondary focus:outline-none focus:border-white transition-colors duration-300"
          />
          {searchTerm ? (
            <button onClick={() => setSearchTerm('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <svg className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-32">
          <div className="spinner" />
        </div>
      )}

      {/* Grid */}
      {!loading && groupedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-light">
          {groupedProducts.map(group => (
            <div key={`${group.marca}__${group.modelo}`} className="bg-bg-primary">
              <ProductCard group={group} />
            </div>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && groupedProducts.length === 0 && (
        <div className="text-center py-32">
          <p className="text-text-secondary text-lg mb-6">
            {activeCategory === 'TECH' ? '🔥 Próximamente' : 'No se encontraron productos'}
          </p>
          <button
            onClick={() => { setActiveCategory(null); setActiveMarca('Todos'); setSearchTerm(''); }}
            className="text-[11px] uppercase tracking-[0.2em] text-white border-b border-white pb-0.5 hover:text-text-secondary hover:border-text-secondary transition-colors"
          >
            Ver todos
          </button>
        </div>
      )}
    </section>
  );
}
