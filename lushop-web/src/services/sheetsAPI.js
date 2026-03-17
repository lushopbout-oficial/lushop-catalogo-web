// Servicio para conectar con Google Sheets (tu inventario)

// IMPORTANTE: Esta URL la configurarás después con tu Apps Script
const SHEETS_API_URL = process.env.NEXT_PUBLIC_SHEETS_API_URL || '';

/**
 * Obtener todos los productos activos
 */
export async function getProducts() {
  try {
    if (!SHEETS_API_URL) {
      // Datos de ejemplo para desarrollo local
      return getDemoProducts();
    }

    const response = await fetch(`${SHEETS_API_URL}?action=getProducts`, {
      cache: 'no-store', // Siempre datos frescos
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error en getProducts:', error);
    return getDemoProducts(); // Fallback a datos demo
  }
}

/**
 * Buscar productos con filtros
 */
export async function searchProducts(filters = {}) {
  try {
    if (!SHEETS_API_URL) {
      return filterDemoProducts(filters);
    }

    const params = new URLSearchParams({
      action: 'search',
      ...filters,
    });

    const response = await fetch(`${SHEETS_API_URL}?${params}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Error al buscar productos');
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error en searchProducts:', error);
    return filterDemoProducts(filters);
  }
}

/**
 * Obtener un producto por SKU
 */
export async function getProductBySKU(sku) {
  try {
    if (!SHEETS_API_URL) {
      const products = getDemoProducts();
      return products.find(p => p.sku === sku) || null;
    }

    const response = await fetch(
      `${SHEETS_API_URL}?action=getProduct&sku=${sku}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Error al obtener producto');
    }

    const data = await response.json();
    return data.product || null;
  } catch (error) {
    console.error('Error en getProductBySKU:', error);
    return null;
  }
}

/**
 * Verificar stock disponible
 */
export async function checkStock(sku, quantity) {
  try {
    if (!SHEETS_API_URL) {
      return true; // En demo siempre hay stock
    }

    const response = await fetch(
      `${SHEETS_API_URL}?action=checkStock&sku=${sku}&qty=${quantity}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Error al verificar stock');
    }

    const data = await response.json();
    return data.available || false;
  } catch (error) {
    console.error('Error en checkStock:', error);
    return false;
  }
}

// ==================================================
// DATOS DEMO (para desarrollo y pruebas locales)
// ==================================================

function getDemoProducts() {
  return [
    {
      sku: 'SNK-002-25.5',
      categoria: 'SNEAKERS',
      marca: 'Nike',
      modelo: 'Air Max 270',
      talla: '25.5',
      stock: 5,
      precio_venta: 1400,
      foto_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      segmento: 'Medio',
    },
    {
      sku: 'SNK-003-22',
      categoria: 'SNEAKERS',
      marca: 'Nike',
      modelo: 'Dunk Low Rosa',
      talla: '22',
      stock: 3,
      precio_venta: 1900,
      foto_url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600',
      segmento: 'Premium',
    },
    {
      sku: 'SNK-004-22.5',
      categoria: 'SNEAKERS',
      marca: 'Adidas',
      modelo: 'Superstar Verde',
      talla: '22.5',
      stock: 2,
      precio_venta: 1250,
      foto_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
      segmento: 'Medio',
    },
    {
      sku: 'SNK-005-27.5',
      categoria: 'SNEAKERS',
      marca: 'Nike Jordan',
      modelo: 'Air Jordan 1 Retro',
      talla: '27.5',
      stock: 1,
      precio_venta: 2100,
      foto_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
      segmento: 'Premium',
    },
    {
      sku: 'SNK-006-26',
      categoria: 'SNEAKERS',
      marca: 'AMIRI',
      modelo: 'Blanco Late',
      talla: '26',
      stock: 2,
      precio_venta: 2500,
      foto_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
      segmento: 'Premium',
    },
    {
      sku: 'SNK-007-24',
      categoria: 'SNEAKERS',
      marca: 'New Balance',
      modelo: '9060 Blanco',
      talla: '24',
      stock: 4,
      precio_venta: 1800,
      foto_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600',
      segmento: 'Medio',
    },
  ];
}

function filterDemoProducts(filters) {
  let products = getDemoProducts();

  if (filters.categoria) {
    products = products.filter(p => p.categoria === filters.categoria);
  }

  if (filters.marca) {
    products = products.filter(p => p.marca === filters.marca);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(p => 
      p.modelo.toLowerCase().includes(searchLower) ||
      p.marca.toLowerCase().includes(searchLower)
    );
  }

  return products;
}
