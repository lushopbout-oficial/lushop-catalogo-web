'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/services/sheetsAPI';

const CATEGORIA_LABELS = {
  SNEAKERS:    'Sneakers',
  PRENDAS:     'Prendas',
  ACCESORIOS:  'Accesorios',
  TECH:        'Tech',
};

// Agrupa SKUs en modelos, deduplicando tallas iguales
function groupByModel(products) {
  const map = {};

  products.forEach(p => {
    const key = `${p.marca.trim().toLowerCase()}__${p.modelo.trim().toLowerCase()}`;

    if (!map[key]) {
      map[key] = {
        marca:     p.marca.trim(),
        modelo:    p.modelo.trim(),
        categoria: p.categoria ? p.categoria.trim().toUpperCase() : '',
        segmento:  p.segmento,
        foto_url:  p.foto_url,
        sizes: [],
      };
    }

    if (p.stock > 0) {
      const tallaKey = String(p.talla).trim().toLowerCase();
      const existing = map[key].sizes.find(
        s => String(s.talla).trim().toLowerCase() === tallaKey
      );
      if (existing) {
        existing.stock += p.stock;
      } else {
        map[key].sizes.push({
          sku:          p.sku,
          talla:        p.talla,
          stock:        p.stock,
          precio_venta: Number(p.precio_venta) || 0,
        });
      }
    }
  });

  return Object.values(map)
    .filter(m => m.sizes.length > 0)
    .map(m => ({
      ...m,
      sizes: m.sizes.sort((a, b) => {
        const na = parseFloat(a.talla);
        const nb = parseFloat(b.talla);
        if (isNaN(na) || isNaN(nb)) return String(a.talla).localeCompare(String(b.talla));
        return na - nb;
      }),
    }));
}

// Filtros de marca disponibles
const MARCAS = ['Todos', 'Nike', 'Adidas', 'Jordan', 'Premium'];

export default function ProductGrid({ initialCategory = null }) {
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setActiveCategory] = useState(
    initialCategory ? initialCategory.trim().toUpperCase() : null
  );
  const [activeMarca, setActiveMarca] = useState('Todos');
  const [searchTerm, setSearchTerm]   = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setRawProducts(data);
      } catch (err) {
        console.error('Error cargando productos:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Sincronizar cuando cambia la categoría en la URL (nav clicks)
  useEffect(() => {
    setActiveCategory(initialCategory ? initialCategory.trim().toUpperCase() : null);
    setActiveMarca('Todos');
    setSearchTerm('');
  }, [initialCategory]);

  const groupedProducts = useMemo(() => {
    const lower = searchTerm.toLowerCase();

    const filtered = rawProducts.filter(p => {
      if (activeCategory) {
        const cat = p.categoria ? p.categoria.trim().toUpperCase() : '';
        if (cat !== activeCategory) return false;
      }
      if (activeMarca !== 'Todos') {
        const marcaLow = p.marca ? p.marca.trim().toLowerCase() : '';
        if (!marcaLow.includes(activeMarca.toLowerCase())) return false;
      }
      if (lower) {
        const modeloLow = p.modelo ? p.modelo.toLowerCase() : '';
        const marcaLow  = p.marca  ? p.marca.toLowerCase()  : '';
        if (!modeloLow.includes(lower) && !marcaLow.includes(lower)) return false;
      }
      return true;
    });

    return groupByModel(filtered);
  }, [rawProducts, activeCategory, activeMarca, searchTerm]);

  const tituloSeccion = activeCategory
    ? (CATEGORIA_LABELS[activeCategory] || activeCategory)
    : 'Nuevos Arrivals';

  // Mostrar filtros de marca solo en Sneakers o sin categoría activa
  const mostrarFiltrosMarca =
    !activeCategory || activeCategory === 'SNEAKERS';

  return (
    <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header de sección */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="font-oswald text-4xl lg:text-5xl font-semibold uppercase tracking-wide">
            {tituloSeccion}
          </h2>
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="mt-2 text-xs text-text-secondary uppercase tracking-wider hover:text-accent-silver transition-colors"
            >
              ← Ver todos
            </button>
          )}
        </div>

        {/* Filtros de marca (solo Sneakers o inicio) */}
        {mostrarFiltrosMarca && (
          <div className="flex flex-wrap gap-3">
            {MARCAS.map(marca => (
              <button
                key={marca}
                onClick={() => setActiveMarca(marca)}
                className={`px-5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  activeMarca === marca
                    ? 'bg-accent-silver text-bg-primary border-accent-silver'
                    : 'bg-transparent text-text-secondary border-border-medium hover:bg-accent-silver hover:text-bg-primary hover:border-accent-silver'
                } border`}
              >
                {marca}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buscador */}
      <form onSubmit={e => e.preventDefault()} className="mb-10">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full px-5 py-3 bg-bg-card border border-border-medium text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-silver transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent-silver text-bg-primary text-xs uppercase font-semibold"
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {/* Contador */}
      {!loading && (
        <p className="text-text-secondary text-sm mb-8">
          {groupedProducts.length} {groupedProducts.length === 1 ? 'modelo' : 'modelos'}
          {activeCategory ? ` en ${CATEGORIA_LABELS[activeCategory] || activeCategory}` : ''}
          {activeMarca !== 'Todos' ? ` · ${activeMarca}` : ''}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="spinner" />
        </div>
      )}

      {/* Grid */}
      {!loading && groupedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {groupedProducts.map(group => (
            <ProductCard
              key={`${group.marca}__${group.modelo}`}
              group={group}
            />
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && groupedProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg mb-4">
            No se encontraron productos
            {activeCategory === 'TECH' ? ' — ¡Próximamente! 🔥' : '.'}
          </p>
          <button
            onClick={() => {
              setActiveCategory(null);
              setActiveMarca('Todos');
              setSearchTerm('');
            }}
            className="px-6 py-2 bg-accent-silver text-bg-primary text-sm uppercase tracking-wider font-semibold"
          >
            Ver todos
          </button>
        </div>
      )}
    </section>
  );
}
