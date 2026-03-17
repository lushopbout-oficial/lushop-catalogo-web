# 🔧 GUÍA DE SOLUCIÓN DE PROBLEMAS
## LU Shop+ Catálogo Web

---

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

---

### ❌ PROBLEMA 1: "No se ven los productos"

**Síntomas:**
- El sitio carga pero no aparecen productos
- Sale "No se encontraron productos"
- Grid vacío

**Soluciones:**

**A) Verificar Apps Script API:**
1. Abre la URL del Apps Script en el navegador
2. Agrega al final: `?action=getProducts`
3. ¿Ves un JSON con productos?
   - ✅ SÍ → El problema está en Vercel
   - ❌ NO → El problema está en Apps Script

**Si el problema está en Apps Script:**
1. Abre Google Sheet → Extensiones → Apps Script
2. Verifica que el código del API esté pegado
3. Verifica que esté deployado como "Aplicación web"
4. Verifica que "Quién tiene acceso" sea "Cualquier persona"
5. Re-deploya:
   - Implementar → Administrar implementaciones
   - Editar (ícono lápiz)
   - Nueva versión
   - Implementar

**Si el problema está en Vercel:**
1. Ve a Vercel → Tu proyecto → Settings → Environment Variables
2. Verifica que `NEXT_PUBLIC_SHEETS_API_URL` existe
3. Verifica que la URL sea correcta (debe terminar en `/exec`)
4. Si está mal:
   - Edita la variable
   - Guarda
   - Ve a Deployments
   - En el último deployment, clic en "..." → Redeploy

---

### ❌ PROBLEMA 2: "Error de CORS al cargar productos"

**Síntomas:**
- En la consola del navegador (F12) ves:
  ```
  Access to fetch at '...' has been blocked by CORS policy
  ```

**Solución:**

1. El Apps Script debe estar deployado como "Aplicación web"
2. "Quién tiene acceso" debe ser **"Cualquier persona"**
3. NO debe ser "Solo yo" o "Cualquiera de mi organización"

**Pasos para arreglar:**
1. Apps Script → Implementar → Administrar implementaciones
2. Editar implementación (ícono lápiz)
3. Cambiar "Quién tiene acceso" a "Cualquier persona"
4. Actualizar
5. Probar de nuevo

---

### ❌ PROBLEMA 3: "Las fotos no cargan"

**Síntomas:**
- Los productos aparecen pero sin fotos
- Icono de imagen rota

**Soluciones:**

**A) Verificar permisos de Drive:**
1. Abre Drive → Carpeta Sneakers
2. Clic derecho → Compartir
3. **Cambiar acceso:** "Cualquier persona con el enlace puede ver"
4. Copiar enlace compartido

**B) Verificar formato de URL en Sheet:**
- Formato correcto:
  ```
  https://drive.google.com/uc?export=view&id=TU_ID_AQUI
  ```
- Si tienes otro formato, necesitas extraer el ID y usar el formato de arriba

**C) Verificar que la URL esté en columna M:**
- Abre PRODUCTOS_MAESTRO
- Columna M debe tener la URL completa de cada foto
- Si está vacía → agrega la URL

**D) Si las fotos son de otro sitio (no Drive):**
- Las URLs deben ser públicas
- Deben empezar con `https://`

---

### ❌ PROBLEMA 4: "El carrito no funciona"

**Síntomas:**
- Clic en "Agregar al carrito" no hace nada
- Carrito siempre vacío

**Solución:**

1. Verifica que tienes JavaScript habilitado en el navegador
2. Abre consola del navegador (F12)
3. Busca errores en rojo
4. Si ves errores → manda screenshot

**Posible causa:** localStorage bloqueado
1. Verifica que no estés en modo incógnito
2. Verifica que tu navegador permita cookies
3. Configuración → Privacidad → Permitir cookies

---

### ❌ PROBLEMA 5: "WhatsApp no abre"

**Síntomas:**
- Clic en botón de WhatsApp no hace nada
- O abre WhatsApp pero sin mensaje

**Solución:**

**A) Verificar número en código:**
1. El número debe estar en formato: `19132187736` (sin + ni espacios)
2. Archivo: `src/components/Cart.jsx`
3. Busca: `whatsappNumber = '19132187736'`
4. Verifica que sea correcto

**B) En móvil:**
- Debe tener WhatsApp instalado
- O WhatsApp Web debe estar funcionando

**C) Mensaje muy largo:**
- Si el carrito tiene muchos productos, el mensaje puede ser muy largo
- Algunos navegadores lo bloquean
- Solución: usa carritos más pequeños para testing

---

### ❌ PROBLEMA 6: "El sitio no carga (pantalla blanca)"

**Síntomas:**
- Página completamente blanca
- Nada aparece

**Soluciones:**

**A) Verificar deployment en Vercel:**
1. Ve a Vercel → Deployments
2. Verifica que el último deployment tenga ✅ (verde)
3. Si tiene ❌ (rojo) → clic para ver errores

**B) Errores comunes de build:**
- Error de sintaxis en código
- Falta una dependencia
- Configuración incorrecta

**C) Ver logs:**
1. Vercel → Tu proyecto → último deployment
2. Clic para expandir
3. Lee los logs para ver el error específico
4. Manda screenshot del error

---

### ❌ PROBLEMA 7: "El dominio no funciona (DNS)"

**Síntomas:**
- `lu-shop.com` no carga
- Error "sitio no encontrado"
- Pero la URL de Vercel sí funciona

**Soluciones:**

**A) Esperar propagación DNS:**
- Puede tardar hasta 24 horas
- Normalmente 1-2 horas
- Paciencia

**B) Verificar registros DNS en GoDaddy:**
1. GoDaddy → Dominios → lu-shop.com → DNS
2. Verifica que existan:
   - Registro A: @ → `76.76.21.21`
   - Registro CNAME: www → `cname.vercel-dns.com`
3. Si no existen → créalos
4. Si existen pero diferentes → corrígelos

**C) Verificar en Vercel:**
1. Vercel → Settings → Domains
2. Debe aparecer `lu-shop.com` con ✅
3. Si tiene ⚠️ → sigue las instrucciones

**D) Limpiar caché DNS (tu computadora):**
- Windows: cmd → `ipconfig /flushdns`
- Mac: Terminal → `sudo dscacheutil -flushcache`
- Linux: `sudo systemd-resolve --flush-caches`

---

### ❌ PROBLEMA 8: "Los filtros no funcionan"

**Síntomas:**
- Clic en filtro no cambia productos mostrados

**Solución:**

1. Verifica que los productos en Sheet tengan:
   - Marca en columna C
   - Categoría en columna B
2. Los filtros buscan texto exacto
3. Verifica ortografía (Nike vs nike vs NIKE)

---

### ❌ PROBLEMA 9: "Stock no se actualiza"

**Síntomas:**
- Vendes un producto
- El sitio web sigue mostrándolo disponible

**Explicación:**
- El sitio lee PRODUCTOS_MAESTRO en tiempo real
- Si el stock en Sheet no cambió → el sitio no cambia

**Solución:**
1. Verifica que tu script de ventas (`onFormSubmit`) esté funcionando
2. Verifica que reste stock correctamente
3. El sitio web NO necesita hacer nada, automáticamente lee el Sheet

**Testing:**
1. Cambia manualmente el stock en PRODUCTOS_MAESTRO
2. Recarga el sitio web
3. ¿Se actualizó? ✅ El sistema funciona

---

### ❌ PROBLEMA 10: "Error 500 en producción"

**Síntomas:**
- El sitio muestra "Error 500" o "Internal Server Error"

**Soluciones:**

1. Ve a Vercel → Functions → Ver logs
2. Identifica el error específico
3. Causas comunes:
   - Variable de entorno faltante
   - Error en Apps Script
   - Timeout (Apps Script tarda mucho)

**Fix timeout:**
- Si tienes 200+ productos, el Apps Script puede tardar
- Solución: agregar paginación (contactar soporte)

---

## 🛠️ HERRAMIENTAS DE DEBUGGING

### Consola del Navegador (F12)
- Ver errores JavaScript
- Ver llamadas al API
- Ver respuestas

### Vercel Logs
- Ver errores de build
- Ver errores de runtime
- Ver todas las requests

### Apps Script Logs
1. Apps Script → Ejecuciones
2. Ver todas las ejecuciones
3. Ver errores

---

## 📞 CONTACTO PARA SOPORTE

Si ninguna de estas soluciones funciona:

1. **Captura de pantalla del error**
2. **URL donde ocurre el problema**
3. **Pasos para reproducir**
4. **Qué esperabas que pasara**

Envía por WhatsApp: +1 913-218-7736

---

## ✅ TESTING CHECKLIST

Antes de pedir ayuda, verifica:

- [ ] ¿Apps Script API funciona? (probaste la URL con ?action=getProducts)
- [ ] ¿Vercel deployment tiene ✅?
- [ ] ¿Variable de entorno está configurada?
- [ ] ¿Limpiaste caché del navegador?
- [ ] ¿Probaste en otro navegador?
- [ ] ¿Probaste en modo incógnito?
- [ ] ¿Viste la consola del navegador (F12)?
- [ ] ¿Viste los logs de Vercel?

---

**¡La mayoría de problemas se resuelven con estas soluciones!** 💪
