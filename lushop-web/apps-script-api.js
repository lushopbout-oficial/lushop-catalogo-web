// ============================================
// GOOGLE APPS SCRIPT - API PARA LUSHOP WEB
// ============================================
// Este script crea una API REST para que tu sitio web
// pueda leer productos desde PRODUCTOS_MAESTRO

// IMPORTANTE: Este código va en tu Google Apps Script
// (el mismo donde tienes las otras funciones)

// ============================================
// FUNCIÓN PRINCIPAL - WEB APP
// ============================================

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    switch(action) {
      case 'getProducts':
        return getProductsAPI();
      
      case 'getProduct':
        return getProductAPI(e.parameter.sku);
      
      case 'search':
        return searchProductsAPI(e.parameter);
      
      case 'checkStock':
        return checkStockAPI(e.parameter.sku, e.parameter.qty);
      
      default:
        return createJSONResponse({ error: 'Acción no válida' }, 400);
    }
  } catch (error) {
    return createJSONResponse({ error: error.toString() }, 500);
  }
}

// ============================================
// API: OBTENER TODOS LOS PRODUCTOS
// ============================================

function getProductsAPI() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PRODUCTOS_MAESTRO');
    
    if (!sheet) {
      return createJSONResponse({ error: 'Hoja PRODUCTOS_MAESTRO no encontrada' }, 404);
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return createJSONResponse({ products: [] });
    }
    
    // Obtener todos los datos (columnas A-M)
    const data = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    
    const products = data
      .filter(row => row[0] && row[5] > 0) // SKU existe y Stock > 0
      .map(row => ({
        sku: row[0],
        categoria: row[1],
        marca: row[2],
        modelo: row[3],
        talla: row[4].toString(),
        stock: row[5],
        precio_venta: row[7],
        segmento: row[11],
        foto_url: row[12] || '',
      }));
    
    return createJSONResponse({ products });
  } catch (error) {
    return createJSONResponse({ error: error.toString() }, 500);
  }
}

// ============================================
// API: OBTENER UN PRODUCTO POR SKU
// ============================================

function getProductAPI(sku) {
  try {
    if (!sku) {
      return createJSONResponse({ error: 'SKU requerido' }, 400);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PRODUCTOS_MAESTRO');
    
    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    
    const productRow = data.find(row => row[0] === sku);
    
    if (!productRow) {
      return createJSONResponse({ error: 'Producto no encontrado' }, 404);
    }
    
    const product = {
      sku: productRow[0],
      categoria: productRow[1],
      marca: productRow[2],
      modelo: productRow[3],
      talla: productRow[4].toString(),
      stock: productRow[5],
      costo_compra: productRow[6],
      precio_venta: productRow[7],
      margen_pesos: productRow[8],
      margen_porcentaje: productRow[9],
      proveedor: productRow[10],
      segmento: productRow[11],
      foto_url: productRow[12] || '',
    };
    
    return createJSONResponse({ product });
  } catch (error) {
    return createJSONResponse({ error: error.toString() }, 500);
  }
}

// ============================================
// API: BUSCAR PRODUCTOS
// ============================================

function searchProductsAPI(params) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PRODUCTOS_MAESTRO');
    
    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    
    let products = data
      .filter(row => row[0] && row[5] > 0)
      .map(row => ({
        sku: row[0],
        categoria: row[1],
        marca: row[2],
        modelo: row[3],
        talla: row[4].toString(),
        stock: row[5],
        precio_venta: row[7],
        segmento: row[11],
        foto_url: row[12] || '',
      }));
    
    // Filtrar por categoría
    if (params.categoria) {
      products = products.filter(p => p.categoria === params.categoria);
    }
    
    // Filtrar por marca
    if (params.marca) {
      products = products.filter(p => p.marca === params.marca);
    }
    
    // Búsqueda por texto
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      products = products.filter(p => 
        p.modelo.toLowerCase().includes(searchLower) ||
        p.marca.toLowerCase().includes(searchLower)
      );
    }
    
    return createJSONResponse({ products });
  } catch (error) {
    return createJSONResponse({ error: error.toString() }, 500);
  }
}

// ============================================
// API: VERIFICAR STOCK
// ============================================

function checkStockAPI(sku, quantity) {
  try {
    if (!sku || !quantity) {
      return createJSONResponse({ error: 'SKU y cantidad requeridos' }, 400);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PRODUCTOS_MAESTRO');
    
    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
    
    const productRow = data.find(row => row[0] === sku);
    
    if (!productRow) {
      return createJSONResponse({ available: false, message: 'Producto no encontrado' });
    }
    
    const stock = productRow[5];
    const available = stock >= parseInt(quantity);
    
    return createJSONResponse({
      available,
      stock_actual: stock,
      cantidad_solicitada: parseInt(quantity),
    });
  } catch (error) {
    return createJSONResponse({ error: error.toString() }, 500);
  }
}

// ============================================
// UTILIDAD: CREAR RESPUESTA JSON
// ============================================

function createJSONResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Headers CORS para permitir requests desde tu sitio web
  if (statusCode !== 200) {
    // Nota: Apps Script no permite custom status codes en doGet
    // pero incluimos el error en el response
    data.statusCode = statusCode;
  }
  
  return output;
}

// ============================================
// INSTRUCCIONES DE DEPLOYMENT
// ============================================

/*
CÓMO DEPLOYEAR ESTE SCRIPT COMO WEB APP:

1. Apps Script → Editor
2. Pegar este código AL FINAL de tu código existente
3. Guardar (💾)
4. Click en "Implementar" → "Nueva implementación"
5. Tipo: Aplicación web
6. Descripción: "API LuShop Web"
7. Ejecutar como: Yo
8. Quién tiene acceso: Cualquier persona
9. Click "Implementar"
10. COPIAR LA URL QUE TE DA
11. Esa URL la usarás en el archivo .env del sitio web

EJEMPLO DE URL:
https://script.google.com/macros/s/AKfycby.../exec

*/
