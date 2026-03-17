# ✅ CHECKLIST DE DEPLOYMENT
## LU Shop+ Catálogo Web

**Usa esta lista para asegurarte de que todo esté configurado correctamente.**

---

## 📦 ANTES DE EMPEZAR:

- [ ] Tengo el código descargado y descomprimido
- [ ] Tengo acceso a Google Sheet (LuShop-Sistema Inventario)
- [ ] Tengo acceso a GoDaddy (lu-shop.com)
- [ ] Tengo 2-3 horas disponibles
- [ ] Navegador Chrome instalado
- [ ] Internet estable

---

## 🔐 CUENTAS NECESARIAS:

- [ ] ✅ Cuenta GitHub creada
- [ ] ✅ Cuenta Vercel creada
- [ ] ✅ Gmail configurado (mismo del Sheet)

---

## 📁 GITHUB SETUP:

- [ ] Repositorio creado (`lushop-catalogo-web`)
- [ ] Código subido completamente
- [ ] Todos los archivos visibles en GitHub
- [ ] Sin errores en la subida

**Verificar carpetas principales:**
- [ ] `/src` existe
- [ ] `/public` existe
- [ ] `package.json` existe
- [ ] `README.md` existe

---

## 🔌 APPS SCRIPT API:

- [ ] Código del API pegado en Apps Script
- [ ] Código guardado (💾)
- [ ] Deployado como "Aplicación web"
- [ ] "Quién tiene acceso" = "Cualquier persona"
- [ ] URL del API copiada y guardada
- [ ] Probado con `?action=getProducts` (veo JSON con productos)

**URL debe verse así:**
```
https://script.google.com/macros/s/AKfycby.../exec
```

---

## 🚀 VERCEL DEPLOYMENT:

- [ ] Proyecto importado desde GitHub
- [ ] Framework detectado (Next.js)
- [ ] Variable de entorno agregada:
  - Name: `NEXT_PUBLIC_SHEETS_API_URL`
  - Value: [URL del Apps Script]
- [ ] Deployment iniciado
- [ ] Deployment completado ✅
- [ ] Sin errores en build
- [ ] Sitio accesible en URL de Vercel

**URL temporal debe verse así:**
```
https://lushop-catalogo-web.vercel.app
```

---

## 🌐 DOMINIO (GoDaddy):

- [ ] Dominio agregado en Vercel
- [ ] Registro A creado en GoDaddy:
  - Tipo: A
  - Nombre: @
  - Valor: 76.76.21.21
- [ ] Registro CNAME creado:
  - Tipo: CNAME
  - Nombre: www
  - Valor: cname.vercel-dns.com
- [ ] DNS guardados en GoDaddy
- [ ] Esperando propagación (1-24h)
- [ ] Dominio funcionando (https://lu-shop.com)

---

## ✅ VERIFICACIÓN FUNCIONAL:

### PÁGINA PRINCIPAL:
- [ ] Hero section se ve correctamente
- [ ] Fondo de sneakers carga
- [ ] Botón "Explorar Catálogo" funciona
- [ ] Productos se muestran en grid
- [ ] Fotos de productos cargan
- [ ] Precios correctos
- [ ] Stock correcto

### NAVEGACIÓN:
- [ ] Header visible
- [ ] Logo/nombre se ve
- [ ] Menú funciona (Sneakers, Kids, etc.)
- [ ] Botón "Carrito" funciona
- [ ] Menú móvil funciona (hamburguesa)

### PRODUCTOS:
- [ ] Puedo ver lista de productos
- [ ] Click en producto abre página individual
- [ ] Página individual muestra toda la info
- [ ] Botón "Agregar al Carrito" funciona
- [ ] Stock se muestra correctamente

### CARRITO:
- [ ] Se abre al hacer click
- [ ] Muestra productos agregados
- [ ] Puedo cambiar cantidades (+/-)
- [ ] Puedo eliminar productos
- [ ] Subtotal calcula bien
- [ ] Envío calcula bien:
  - [ ] Gratis si > $2,500
  - [ ] 50% si $1,500-$2,499
  - [ ] Completo si < $1,500
- [ ] Total es correcto

### CHECKOUT:
- [ ] Botón WhatsApp visible
- [ ] Click abre WhatsApp
- [ ] Mensaje incluye productos
- [ ] Mensaje incluye cantidades
- [ ] Mensaje incluye precios
- [ ] Mensaje incluye total
- [ ] Número correcto: +1 913-218-7736

### FILTROS Y BÚSQUEDA:
- [ ] Filtros por marca funcionan
- [ ] Búsqueda por texto funciona
- [ ] Resultados se muestran correctamente

### RESPONSIVE:
- [ ] Se ve bien en desktop
- [ ] Se ve bien en tablet
- [ ] Se ve bien en móvil
- [ ] Menú móvil funciona
- [ ] Carrito funciona en móvil
- [ ] WhatsApp funciona en móvil

### FOOTER:
- [ ] Footer visible
- [ ] Links funcionan
- [ ] Información correcta
- [ ] Redes sociales correctas

### WHATSAPP BUTTON:
- [ ] Botón flotante visible
- [ ] Se ve en todas las páginas
- [ ] Click abre WhatsApp
- [ ] Mensaje predeterminado correcto

---

## 🔍 TESTING AVANZADO:

### PERFORMANCE:
- [ ] Sitio carga en < 3 segundos
- [ ] Imágenes optimizadas
- [ ] Sin errores en consola (F12)
- [ ] Sin warnings importantes

### SEO:
- [ ] Título en pestaña correcto
- [ ] Favicon visible
- [ ] Meta description presente
- [ ] URLs amigables

### INTEGRACIÓN:
- [ ] Productos desde Sheet funcionan
- [ ] Stock en tiempo real funciona
- [ ] Agregar producto a Sheet → aparece en sitio
- [ ] Cambiar stock en Sheet → se refleja en sitio

---

## 🆘 SI ALGO FALLA:

1. **No entres en pánico** 😅
2. **Identifica qué parte falló** (usar este checklist)
3. **Ve a TROUBLESHOOTING.md** para soluciones
4. **Revisa consola del navegador** (F12)
5. **Revisa logs de Vercel**
6. **Contacta soporte** si necesario

---

## 📸 DOCUMENTACIÓN:

Toma screenshots de:
- [ ] GitHub repository (código subido)
- [ ] Apps Script deployment (URL visible)
- [ ] Vercel dashboard (deployment exitoso)
- [ ] Sitio funcionando (home page)
- [ ] GoDaddy DNS (registros configurados)

**Guarda estos screenshots** por si necesitas referencia después.

---

## 🎉 AL COMPLETAR TODO:

### ¡FELICIDADES! TU SITIO ESTÁ VIVO 🚀

**Ahora puedes:**
- ✅ Compartir link con clientes
- ✅ Publicar en redes sociales
- ✅ Agregar a biografía de Instagram/Facebook
- ✅ Usar en tarjetas de presentación
- ✅ ¡EMPEZAR A VENDER!

**Próximos pasos:**
1. Agregar Google Analytics (opcional)
2. Personalizar diseño (ver PERSONALIZACION.md)
3. Agregar más productos
4. Promocionar en redes
5. ¡Crecer el negocio!

---

## 💪 MANTENIMIENTO REGULAR:

**Diario:**
- [ ] Verificar que el sitio carga
- [ ] Verificar stock actualizado

**Semanal:**
- [ ] Agregar productos nuevos
- [ ] Actualizar fotos
- [ ] Revisar analytics

**Mensual:**
- [ ] Backup de Google Sheet
- [ ] Revisar errores en Vercel
- [ ] Actualizar contenido

---

**¡TODO LISTO PARA EL ÉXITO!** 🔥💰
