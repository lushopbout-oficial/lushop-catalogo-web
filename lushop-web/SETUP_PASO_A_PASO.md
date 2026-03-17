# 📘 GUÍA DE INSTALACIÓN PASO A PASO
## LU Shop+ Catálogo Web

**Tiempo estimado:** 2-3 horas
**Nivel:** Principiante (sin conocimientos técnicos requeridos)

---

## 📋 CHECKLIST PRE-INICIO

Antes de empezar, verifica que tienes:

- [ ] ✅ Computadora con internet estable
- [ ] ✅ Navegador Chrome (recomendado)
- [ ] ✅ Acceso a tu Google Sheet (LuShop-Sistema Inventario)
- [ ] ✅ Acceso a GoDaddy (para configurar DNS del dominio)
- [ ] ✅ Email de Gmail (el mismo del Sheet)
- [ ] ✅ 2-3 horas sin interrupciones

---

# PARTE 1: CREAR CUENTA GITHUB (15 min)

## ¿Qué es GitHub?
Es donde se almacenará el código de tu sitio web (como Google Drive pero para código).

## PASO 1.1: Ir a GitHub

1. Abre Chrome
2. Ve a: **https://github.com**
3. Arriba a la derecha, clic en **"Sign up"**

## PASO 1.2: Crear cuenta

1. **Email:** Usa tu Gmail (el mismo del Sheet)
   ```
   Ejemplo: lushopbout@gmail.com
   ```

2. **Password:** Crea una contraseña segura
   - Mínimo 15 caracteres
   - Usa mayúsculas, minúsculas, números
   - Guárdala en un lugar seguro

3. **Username:** Elige un nombre de usuario
   ```
   Ejemplo: lushop-oficial
   ```

4. Clic en **"Continue"**

5. **Verificación:** Completa el puzzle/verificación

6. **Email verification:** 
   - GitHub te enviará un código a tu email
   - Revisa tu bandeja de entrada
   - Copia el código
   - Pégalo en GitHub

7. ✅ **¡Cuenta creada!**

## PASO 1.3: Configurar perfil (opcional pero recomendado)

1. Sube una foto de perfil (logo de LU Shop si tienes)
2. Nombre: "LU Shop+"
3. Clic en **"Save"**

---

# PARTE 2: SUBIR CÓDIGO A GITHUB (20 min)

## PASO 2.1: Crear nuevo repositorio

1. En GitHub, clic en el **+** (arriba a la derecha)
2. Clic en **"New repository"**

3. **Configuración:**
   - **Repository name:** `lushop-catalogo-web`
   - **Description:** "Catálogo web profesional LU Shop+"
   - **Visibilidad:** ✅ **Public** (debe ser público para Vercel gratis)
   - **NO marcar** "Add a README file"
   - Clic en **"Create repository"**

## PASO 2.2: Descargar el código

1. Descarga el archivo `lushop-web.zip` que te proporcioné
2. Guárdalo en Escritorio o Descargas
3. **Descomprime** el archivo (clic derecho → Extraer aquí)
4. Deberías tener una carpeta llamada `lushop-web`

## PASO 2.3: Subir archivos a GitHub

**MÉTODO FÁCIL (Recomendado):**

1. En GitHub, en tu repositorio recién creado
2. Verás una pantalla que dice "Quick setup"
3. Abajo hay un link: **"uploading an existing file"**
4. Clic en ese link

5. **Arrastra toda la carpeta `lushop-web`** a la ventana
   - O clic en "choose your files" y selecciona TODO lo de la carpeta

6. Espera que suba (puede tardar 1-2 minutos)

7. Abajo en "Commit changes":
   - Mensaje: "Initial commit - código completo"
   - Clic en **"Commit changes"**

8. ✅ **¡Código subido!**

---

# PARTE 3: CONFIGURAR GOOGLE APPS SCRIPT API (30 min)

## ¿Por qué esto?
Para que el sitio web pueda leer productos desde tu Google Sheet.

## PASO 3.1: Abrir Apps Script

1. Abre tu Google Sheet: "LuShop-Sistema Inventario"
2. **Extensiones** → **Apps Script**

## PASO 3.2: Agregar código del API

1. En el editor de Apps Script
2. **Baja hasta el final** del código que ya tienes
3. **Pega el código** del archivo `apps-script-api.js` (que te di)
   - Ubicación: en la carpeta del proyecto
   - Cópialo completo
   - Pégalo AL FINAL del código existente

4. **Guardar** (💾 disquete)

## PASO 3.3: Deployar como Web App

1. Arriba a la derecha, clic en **"Implementar"** → **"Nueva implementación"**

2. **Tipo de implementación:**
   - Clic en el ícono de engranaje ⚙️
   - Selecciona: **"Aplicación web"**

3. **Configuración:**
   - **Descripción:** "API LuShop Web"
   - **Ejecutar como:** Yo
   - **Quién tiene acceso:** **Cualquier persona**

4. Clic en **"Implementar"**

5. **Autorizar acceso:**
   - Clic en "Autorizar acceso"
   - Selecciona tu cuenta
   - Si aparece "Google no ha verificado esta aplicación":
     - Clic en "Avanzado"
     - Clic en "Ir a... (no seguro)"
   - Clic en "Permitir"

6. **COPIAR LA URL:**
   - Te aparecerá una URL larga
   - Ejemplo: `https://script.google.com/macros/s/AKfycby.../exec`
   - **COPIA ESTA URL COMPLETA**
   - Guárdala en un archivo de texto (la necesitarás pronto)

7. Clic en **"Listo"**

## PASO 3.4: Probar que funciona

1. Abre una nueva pestaña en Chrome
2. Pega la URL que copiaste
3. Al final, agrega: `?action=getProducts`
   - Ejemplo completo: `https://script.google.com/.../exec?action=getProducts`
4. Enter
5. Deberías ver un JSON con tus productos
6. Si ves productos → ✅ **¡Funciona!**
7. Si ves error → Revisa el código que pegaste en Apps Script

---

# PARTE 4: CREAR CUENTA VERCEL (10 min)

## ¿Qué es Vercel?
Hosting gratis donde vivirá tu sitio web.

## PASO 4.1: Ir a Vercel

1. Ve a: **https://vercel.com**
2. Clic en **"Sign Up"** (arriba a la derecha)

## PASO 4.2: Conectar con GitHub

1. **Selecciona:** "Continue with GitHub"
2. **Autoriza** Vercel para acceder a tu GitHub
3. Si GitHub pide confirmación → Clic en **"Authorize Vercel"**

## PASO 4.3: Configurar cuenta

1. **Nombre del equipo:** LU Shop (o el que prefieras)
2. **Plan:** ✅ **Hobby (Free)** - $0/mes
3. Clic en **"Continue"**

4. ✅ **¡Cuenta creada!**

---

# PARTE 5: DEPLOYEAR SITIO WEB (15 min)

## PASO 5.1: Importar proyecto desde GitHub

1. En Vercel, clic en **"Add New..."** → **"Project"**

2. **Import Git Repository:**
   - Verás tu repositorio: `lushop-catalogo-web`
   - Clic en **"Import"**

## PASO 5.2: Configurar proyecto

1. **Project Name:** lushop-catalogo-web (puedes dejarlo así)

2. **Framework Preset:** Next.js (debería detectarlo automático)

3. **Root Directory:** ./ (dejar por defecto)

4. **Build and Output Settings:** (dejar todo por defecto)

5. **Environment Variables:** ⚠️ **IMPORTANTE**
   - Clic en "Environment Variables"
   - Agregar variable:
     - **Name:** `NEXT_PUBLIC_SHEETS_API_URL`
     - **Value:** [PEGA AQUÍ LA URL del Apps Script que copiaste antes]
       ```
       Ejemplo: https://script.google.com/macros/s/AKfycby.../exec
       ```
   - Clic en **"Add"**

6. Clic en **"Deploy"**

## PASO 5.3: Esperar deployment

1. Vercel empezará a construir tu sitio
2. Verás logs en pantalla (es normal)
3. **Espera 2-5 minutos**
4. Cuando termine verás: ✅ "Congratulations!"

## PASO 5.4: Ver tu sitio

1. Vercel te dará una URL temporal:
   ```
   https://lushop-catalogo-web.vercel.app
   ```
2. **Clic en "Visit"** para ver tu sitio
3. ✅ **¡Tu sitio está vivo!**

## PASO 5.5: Probar funcionalidades

1. ¿Se ven los productos? ✅
2. ¿Puedes agregar al carrito? ✅
3. ¿Funciona el botón de WhatsApp? ✅
4. ¿Se ve bien en móvil? ✅

---

# PARTE 6: CONECTAR TU DOMINIO (30 min)

## PASO 6.1: En Vercel

1. En tu proyecto en Vercel
2. Clic en **"Settings"** (arriba)
3. En el menú lateral, clic en **"Domains"**
4. Clic en **"Add"**
5. Escribe: `lu-shop.com`
6. Clic en **"Add"**

## PASO 6.2: Configurar DNS en GoDaddy

1. Vercel te mostrará instrucciones
2. Te pedirá agregar un registro **A** y/o **CNAME**

3. **Ir a GoDaddy:**
   - https://godaddy.com
   - Iniciar sesión
   - **Mis Productos** → **Dominios**
   - Clic en `lu-shop.com`
   - Clic en **"DNS"** o **"Administrar DNS"**

4. **Agregar registros:**

   **Registro A:**
   - Tipo: A
   - Nombre: @
   - Valor: `76.76.21.21` (IP de Vercel)
   - TTL: 600 (o el menor disponible)
   - Guardar

   **Registro CNAME (www):**
   - Tipo: CNAME
   - Nombre: www
   - Valor: `cname.vercel-dns.com`
   - TTL: 600
   - Guardar

## PASO 6.3: Esperar propagación

1. La configuración DNS tarda en propagarse
2. **Tiempo:** 10 minutos - 24 horas (normalmente 1-2 horas)
3. Mientras esperas, tu sitio sigue funcionando en la URL de Vercel

## PASO 6.4: Verificar dominio

1. Después de 1-2 horas
2. Visita: `https://lu-shop.com`
3. Si ves tu sitio → ✅ **¡Funciona!**
4. Si no funciona → Espera más tiempo o revisa DNS

---

# PARTE 7: VERIFICACIÓN FINAL (10 min)

## CHECKLIST COMPLETO:

- [ ] ✅ Sitio carga en https://lu-shop.com
- [ ] ✅ Se ven productos desde tu Google Sheet
- [ ] ✅ Puedes agregar productos al carrito
- [ ] ✅ Carrito muestra productos correctos
- [ ] ✅ Calculadora de envío funciona
- [ ] ✅ Botón WhatsApp funciona y abre chat
- [ ] ✅ Sitio se ve bien en móvil
- [ ] ✅ Sitio se ve bien en desktop
- [ ] ✅ Filtros funcionan
- [ ] ✅ Búsqueda funciona
- [ ] ✅ Página individual de producto funciona

---

# 🎉 ¡FELICIDADES!

**Tu sitio web está VIVO y funcionando.**

---

# 📝 NOTAS IMPORTANTES:

## Actualizar productos:
1. Agregas/editas productos en PRODUCTOS_MAESTRO
2. ¡El sitio se actualiza automáticamente!
3. No necesitas hacer nada más

## Actualizar fotos:
1. Subes foto a Drive
2. Pegas link en columna M (Foto_URL)
3. ¡Aparece automáticamente en el sitio!

## Cambiar diseño/contenido:
1. Editas código en GitHub
2. Vercel deploya automáticamente
3. Cambios visibles en 1-2 minutos

---

# 🆘 ¿PROBLEMAS?

Ver archivo: `TROUBLESHOOTING.md`

---

# 📞 SOPORTE:

WhatsApp: +1 913-218-7736

---

**¡A vender!** 🚀💰
