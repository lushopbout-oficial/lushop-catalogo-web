'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/services/sheetsAPI';

// ─── Agrupa SKUs en modelos, deduplicando tallas iguales ────────────────────
function groupByModel(products) {
  const map = {};

  products.forEach(p => {
    // Clave normalizada: sin espacios extra, sin diferencia de mayúsculas
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
      // Deduplicar por talla: si ya existe esa talla, sumar stock
      const tallaKey = String(p.talla).trim().toLowerCase();
      const existing = map[key].sizes.find(
        s => String(s.talla).trim().toLowerCase() === tallaKey
      );

      if (existing) {
        existing.stock += p.stock; // misma talla, 2 SKUs → sumar stock
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
        // Si no son números (ej: "Pequeña", "Mediana") ordenar alfabético
        if (isNaN(na) || isNaN(nb)) return String(a.talla).localeCompare(String(b.talla));
        return na - nb;
      }),
    }));
}
// ────────────────────────────────────────────────────────────────────────────

export default function ProductGrid({ initialCategory = null }) {
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading]         = useState(true);

  // Categoría desde el nav (SNEAKERS / KIDS / HOMBRE / MUJER / null)
  const [activeCategory, setActiveCategory] = useState(
    initialCategory ? initialCategory.trim().toUpperCase() : null
  );

  // Filtro de marca (botones: Todos / Nike / Adidas / Jordan / Premium)
  const [activeMarca, setActiveMarca] = useState('Todos');

  // Búsqueda por texto
  const [searchTerm, setSearchTerm] = useState('');

  // Carga todos los productos UNA sola vez
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

  // Sincronizar categoría si cambia la prop (navegación entre rutas)
  useEffect(() => {
    setActiveCategory(initialCategory ? initialCategory.trim().toUpperCase() : null);
    setActiveMarca('Todos');
    setSearchTerm('');
  }, [initialCategory]);

  // ── Filtrado + agrupación en memoria (sin re-fetch) ──────────────────────
  const groupedProducts = useMemo(() => {
    const lower = searchTerm.toLowerCase();

    const filtered = rawProducts.filter(p => {
      // 1. Filtro de categoría (nav)
      if (activeCategory) {
        const cat = p.categoria ? p.categoria.trim().toUpperCase() : '';
        if (cat !== activeCategory) return false;
      }

      // 2. Filtro de marca (botones)
      if (activeMarca !== 'Todos') {
        const marcaLow = p.marca ? p.marca.trim().toLowerCase() : '';
        if (!marcaLow.includes(activeMarca.toLowerCase())) return false;
      }

      // 3. Búsqueda por texto
      if (lower) {
        const modeloLow = p.modelo ? p.modelo.toLowerCase() : '';
        const marcaLow  = p.marca  ? p.marca.toLowerCase()  : '';
        if (!modeloLow.includes(lower) && !marcaLow.includes(lower)) return false;
      }

      return true;
    });

    return groupByModel(filtered);
  }, [rawProducts, activeCategory, activeMarca, searchTerm]);
  // ─────────────────────────────────────────────────────────────────────────

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="font-oswald text-4xl lg:text-5xl font-semibold uppercase tracking-wide">
            {activeCategory ? activeCategory : 'Nuevos Arrivals'}
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

        {/* Filtros de marca */}
        <div className="flex flex-wrap gap-3">
          {['Todos', 'Nike', 'Adidas', 'Jordan', 'Premium'].map(marca => (
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
      </div>

      {/* Buscador */}
      <form onSubmit={handleSearch} className="mb-10">
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
              ✕ Limpiar
            </button>
          )}
        </div>
      </form>

      {/* Contador de resultados */}
      {!loading && (
        <p className="text-text-secondary text-sm mb-8">
          {groupedProducts.length} {groupedProducts.length === 1 ? 'modelo' : 'modelos'}
          {activeCategory ? ` en ${activeCategory}` : ''}
          {activeMarca !== 'Todos' ? ` · ${activeMarca}` : ''}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="spinner" />
        </div>
      )}

      {/* Grid de productos — 1 card por modelo */}
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
            No se encontraron productos.
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
