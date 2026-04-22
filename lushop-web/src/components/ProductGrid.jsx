'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/services/sheetsAPI';

const CATEGORIA_LABELS = { SNEAKERS:'Sneakers', PRENDAS:'Prendas', ACCESORIOS:'Accesorios', TECH:'Tech' };
const MARCAS = ['Todos', 'Nike', 'Adidas', 'Jordan', 'Premium'];

function groupByModel(products) {
  const map = {};
  products.forEach(p => {
    const key = `${p.marca.trim().toLowerCase()}__${p.modelo.trim().toLowerCase()}`;
    if (!map[key]) {
      map[key] = { marca:p.marca.trim(), modelo:p.modelo.trim(),
        categoria:p.categoria?p.categoria.trim().toUpperCase():'',
        segmento:p.segmento, foto_url:p.foto_url, sizes:[] };
    }
    if (p.stock > 0) {
      const tk = String(p.talla).trim().toLowerCase();
      const ex = map[key].sizes.find(s => String(s.talla).trim().toLowerCase()===tk);
      if (ex) { ex.stock += p.stock; }
      else { map[key].sizes.push({ sku:p.sku, talla:p.talla, stock:p.stock, precio_venta:Number(p.precio_venta)||0 }); }
    }
  });
  return Object.values(map).filter(m=>m.sizes.length>0).map(m=>({
    ...m, sizes:m.sizes.sort((a,b)=>{ const na=parseFloat(a.talla),nb=parseFloat(b.talla); return (isNaN(na)||isNaN(nb))?String(a.talla).localeCompare(String(b.talla)):na-nb; })
  }));
}

export default function ProductGrid({ initialCategory = null }) {
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory?initialCategory.trim().toUpperCase():null);
  const [activeMarca, setActiveMarca] = useState('Todos');
  const [searchTerm, setSearchTerm]   = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try { setRawProducts(await getProducts()); }
      catch(e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    setActiveCategory(initialCategory?initialCategory.trim().toUpperCase():null);
    setActiveMarca('Todos'); setSearchTerm('');
  }, [initialCategory]);

  const groupedProducts = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = rawProducts.filter(p => {
      if (activeCategory && (p.categoria||'').trim().toUpperCase()!==activeCategory) return false;
      if (activeMarca!=='Todos' && !(p.marca||'').trim().toLowerCase().includes(activeMarca.toLowerCase())) return false;
      if (lower) { const m=(p.modelo||'').toLowerCase(),b=(p.marca||'').toLowerCase(); if(!m.includes(lower)&&!b.includes(lower)) return false; }
      return true;
    });
    return groupByModel(filtered);
  }, [rawProducts, activeCategory, activeMarca, searchTerm]);

  const titulo = activeCategory?(CATEGORIA_LABELS[activeCategory]||activeCategory):'Lo más buscado';
  const mostrarMarcas = !activeCategory || activeCategory==='SNEAKERS';

  return (
    <section id="productos" className="bg-bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-text-secondary mb-2 font-medium">Destacados</p>
            <div className="flex items-center gap-6">
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase tracking-tight text-text-primary">
                {titulo}
              </h2>
              {activeCategory && (
                <button onClick={() => setActiveCategory(null)}
                  className="text-[11px] uppercase tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 border-b border-transparent hover:border-text-secondary pb-0.5">
                  ← Volver
                </button>
              )}
            </div>
            {!loading && (
              <p className="text-text-secondary text-sm mt-1">{groupedProducts.length} modelos</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {mostrarMarcas && (
              <div className="flex flex-wrap gap-2">
                {MARCAS.map(marca => (
                  <button key={marca} onClick={() => setActiveMarca(marca)}
                    className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.15em] font-medium border transition-all duration-200 ${
                      activeMarca===marca
                        ? 'bg-text-primary text-white border-text-primary'
                        : 'bg-transparent text-text-secondary border-border-light hover:border-text-secondary hover:text-text-primary'
                    }`}>
                    {marca}
                  </button>
                ))}
              </div>
            )}
            <button className="text-[11px] uppercase tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 whitespace-nowrap">
              Ver todo
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="mb-10 max-w-xs">
          <div className="relative">
            <input type="text" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full bg-transparent border-b border-border-medium text-text-primary text-sm py-2.5 pr-7 placeholder-text-secondary focus:outline-none focus:border-text-primary transition-colors duration-200" />
            {searchTerm ? (
              <button onClick={()=>setSearchTerm('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            ) : (
              <svg className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && <div className="flex justify-center py-24"><div className="spinner"/></div>}

        {/* Grid */}
        {!loading && groupedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groupedProducts.map(group => (
              <ProductCard key={`${group.marca}__${group.modelo}`} group={group} />
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {!loading && groupedProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-text-secondary mb-6">{activeCategory==='TECH'?'🔥 Próximamente':'Sin resultados'}</p>
            <button onClick={()=>{setActiveCategory(null);setActiveMarca('Todos');setSearchTerm('');}}
              className="text-[11px] uppercase tracking-[0.2em] border-b border-text-primary text-text-primary pb-0.5 hover:opacity-60 transition-opacity">
              Ver todos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
