# 🛍️ LU Shop+ | Catálogo Web Profesional

Sitio web profesional para LU Shop+ conectado automáticamente a Google Sheets.

## ✨ Características

- ✅ Catálogo de productos automático desde Google Sheets
- ✅ Stock en tiempo real
- ✅ Carrito de compras funcional
- ✅ Checkout por WhatsApp
- ✅ Calculadora de envío automática
- ✅ Diseño responsive (móvil y desktop)
- ✅ 100% gratis (hosting en Vercel)

## 🚀 Tecnologías

- **Frontend:** Next.js 14 + React
- **Estilos:** Tailwind CSS
- **Backend:** Google Sheets API via Apps Script
- **Hosting:** Vercel (gratis)
- **Dominio:** lu-shop.com

## 📦 Contenido del Proyecto

```
lushop-web/
├── src/
│   ├── app/              # Páginas Next.js
│   ├── components/       # Componentes React
│   ├── context/          # Estado global (Cart)
│   ├── services/         # API Google Sheets
│   └── styles/           # Estilos CSS
├── public/               # Archivos estáticos
├── package.json          # Dependencias
├── tailwind.config.js    # Configuración Tailwind
└── next.config.js        # Configuración Next.js
```

## 🎯 Cómo Funciona

```
PRODUCTOS_MAESTRO (Google Sheets)
         ↓
  Google Apps Script API
         ↓
    Sitio Web (Next.js)
         ↓
   Cliente ve catálogo
         ↓
  Agrega al carrito
         ↓
  Checkout WhatsApp
```

## 📋 Instalación

**VER ARCHIVO:** `SETUP_PASO_A_PASO.md`

Ese archivo contiene instrucciones detalladas con screenshots para:
1. Crear cuenta GitHub
2. Subir el código
3. Crear cuenta Vercel
4. Deployment
5. Configurar Apps Script
6. Conectar dominio

## 🔧 Desarrollo Local (opcional)

Si quieres probar localmente antes de deployear:

```bash
# Instalar dependencias
npm install

# Copiar .env.example a .env.local
cp .env.example .env.local

# Ejecutar en modo desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

El sitio se deploya automáticamente en Vercel cuando subes cambios a GitHub.

## 📞 Soporte

Para preguntas o problemas:
- WhatsApp: +1 913-218-7736
- Revisa `TROUBLESHOOTING.md` para problemas comunes

## 📄 Licencia

© 2026 LU Shop+. Todos los derechos reservados.

---

**Desarrollado con ❤️ para LU Shop+**
