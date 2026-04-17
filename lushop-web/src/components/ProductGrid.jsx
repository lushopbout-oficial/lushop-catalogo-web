'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { getProducts, searchProducts } from '@/services/sheetsAPI';

// ─── Agrupa un array flat de SKUs en un array de modelos ────────────────────
function groupByModel(products) {
  const map = {};

  products.forEach(p => {
    const key = `${p.marca.trim().toLowerCase()}__${p.modelo.trim().toLowerCase()}`;

    if (!map[key]) {
      map[key] = {
        marca:     p.marca,
        modelo:    p.modelo,
        categoria: p.categoria,
        segmento:  p.segmento,
        foto_url:  p.foto_url,
        sizes: [],
      };
    }

    if (p.stock > 0) {
      map[key].sizes.push({
        sku:          p.sku,
        talla:        p.talla,
        stock:        p.stock,
        precio_venta: p.precio_venta,
      });
    }
  });

  return Object.values(map)
    .filter(m => m.sizes.length > 0)
    .map(m => ({
      ...m,
      sizes: m.sizes.sort((a, b) => parseFloat(a.talla) - parseFloat(b.talla)),
    }));
}
// ────────────────────────────────────────────────────────────────────────────

export default function ProductGrid({ initialCategory = null }) {
  const [rawProducts, setRawProducts]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeFilter, setActiveFilter] = useState(initialCategory || 'Todos');
  const [searchTerm, setSearchTerm]     = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setRawProducts(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filter) => {
    setActiveFilter(filter);
    setLoading(true);
    try {
      if (filter === 'Todos') {
        const data = await getProducts();
        setRawProducts(data);
      } else {
        const data = await searchProducts({ marca: filter });
        setRawProducts(data);
      }
    } catch (error) {
      console.error('Error filtrando:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      loadProducts();
      return;
    }
    setLoading(true);
    try {
      const data = await searchProducts({ search: searchTerm });
      setRawProducts(data);
    } catch (error) {
      console.error('Error buscando:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedProducts = useMemo(() => {
    const filtered = searchTerm
      ? rawProducts.filter(
          p =>
            p.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.marca.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : rawProducts;

    return groupByModel(filtered);
  }, [rawProducts, searchTerm]);

  return (
    <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h2 className="font-oswald text-4xl lg:text-5xl font-semibold uppercase tracking-wide">
          Nuevos Arrivals
        </h2>

        <div className="flex flex-wrap gap-3">
          {['Todos', 'Nike', 'Adidas', 'Jordan', 'Premium'].map(filter => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-accent-silver text-bg-primary border-accent-silver'
                  : 'bg-transparent text-text-secondary border-border-medium hover:bg-accent-silver hover:text-bg-primary hover:border-accent-silver'
              } border`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-10">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full px-5 py-3 bg-bg-card border border-border-medium text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-silver transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent-silver text-bg-primary text-xs uppercase font-semibold"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="spinner" />
        </div>
      )}

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

      {!loading && groupedProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg">
            No se encontraron productos.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('Todos');
              loadProducts();
            }}
            className="mt-4 px-6 py-2 bg-accent-silver text-bg-primary text-sm uppercase tracking-wider font-semibold"
          >
            Ver todos
          </button>
        </div>
      )}
    </section>
  );
}
