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
      map[key] = { 
        marca:p.marca.trim(), 
        modelo:p.modelo.trim(),
        categoria:p.categoria?p.categoria.trim().toUpperCase():'',
        segmento:p.segmento, 
        foto_url:p.foto_url, 
        sizes:[] 
      };
    }
    if (p.stock > 0) {
      const tk = String(p.talla).trim().toLowerCase();
      const ex = map[key].sizes.find(s => String(s.talla).trim().toLowerCase()===tk);
      if (ex) { ex.stock += p.stock; }
      else { map[key].sizes.push({ sku:p.sku, talla:p.talla, stock:p.stock, precio_venta:Number(p.precio_venta)||0 }); }
    }
  });
  return Object.values(map).filter(m=>m.sizes.length>0).map(m=>({
    ...m, sizes:m.sizes.sort((a,b)=>{ 
      const na=parseFloat(a.talla),nb=parseFloat(b.talla); 
      return (isNaN(na)||isNaN(nb))?String(a.talla).localeCompare(String(b.talla)):na-nb; 
    })
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
      if (lower) { 
        const m=(p.modelo||'').toLowerCase(),b=(p.marca||'').toLowerCase(); 
        if(!m.includes(lower)&&!b.includes(lower)) return false; 
      }
      return true;
    });
    return groupByModel(filtered);
  }, [rawProducts, activeCategory, activeMarca, searchTerm]);

  const titulo = activeCategory?(CATEGORIA_LABELS[activeCategory]||activeCategory):'Lo más buscado';
  const mostrarMarcas = !activeCategory || activeCategory==='SNEAKERS';

  return (
    <section id="productos" className="bg-[#F9F8F6] py-12 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">

        {/* --- HEADER --- */}
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-2 font-bold">Catálogo Exclusivo</p>
              <h2 className="font-oswald text-4xl lg:text-6xl font-bold uppercase tracking-tight text-black leading-none">
                {titulo}
              </h2>
            </div>
            {!loading && (
              <p className="hidden md:block text-black/40 text-xs font-medium tracking-widest uppercase">
                {groupedProducts.length} Modelos Disponibles
              </p>
            )}
          </div>

          {/* Filtros y Buscador */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {mostrarMarcas && MARCAS.map(marca => (
                <button 
                  key={marca} 
                  onClick={() => setActiveMarca(marca)}
                  className={`px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-full border ${
                    activeMarca===marca
                    ? 'bg-black text-white border-black shadow-lg shadow-black/20'
                    : 'bg-white text-black/50 border-black/5 hover:border-black/20 hover:text-black'
                  }`}
                >
                  {marca}
                </button>
              ))}
            </div>

            {/* Buscador Minimalista */}
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                value={searchTerm} 
                onChange={e=>setSearchTerm(e.target.value)}
                placeholder="BUSCAR..."
                className="w-full bg-black/5 border-none text-black text-[11px] font-bold tracking-widest py-3 px-4 rounded-sm placeholder-black/30 focus:ring-1 focus:ring-black/10 transition-all" 
              />
              <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* --- LOADING --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin"/>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold animate-pulse">Actualizando Stock...</p>
          </div>
        )}

        {/* --- GRID DE PRODUCTOS (Aquí está el cambio clave) --- */}
        {!loading && groupedProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 lg:gap-8">
            {groupedProducts.map(group => (
              <ProductCard key={`${group.marca}__${group.modelo}`} group={group} />
            ))}
          </div>
        )}

        {/* --- SIN RESULTADOS --- */}
        {!loading && groupedProducts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-black/40 text-xs font-bold uppercase tracking-[0.3em] mb-8">
              {activeCategory==='TECH' ? '🔥 Lanzamiento Próximamente' : 'No encontramos modelos'}
            </p>
            <button 
              onClick={()=>{setActiveCategory(null);setActiveMarca('Todos');setSearchTerm('');}}
              className="px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors"
            >
              Ver Catálogo Completo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
