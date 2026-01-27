# frankografía

Portfolio personal de fotografía.  
Un sitio estático, minimalista y editorial, enfocado en la imagen como protagonista.

El proyecto presenta una selección curada de trabajos en distintas categorías (retrato, street, landscape, wildlife), junto con una breve introducción personal y datos de contacto.

Diseñado para ser rápido, accesible y fácil de mantener.

---

## ✨ Características

- Landing page editorial
- Galería responsive con grid asimétrico
- Curaduría por categorías
- Light / Dark mode
- Diseño minimalista, centrado en la fotografía
- Performance-first (sin backend, sin runtime innecesario)
- SEO básico + Open Graph
- Deployable como sitio estático en cualquier VPS

---

## 🛠️ Tecnologías utilizadas

### Core
- **Astro** — Static Site Generator
- **TypeScript** — Tipado estático en componentes y lógica
- **CSS moderno** — Variables, Grid, Flexbox

### UI / UX
- **React (Astro Islands)** — Interactividad puntual (galería, modal)
- **CSS Grid** — Layout asimétrico y editorial
- **SVG inline** — Isotipo escalable y performante
- **Dark / Light mode** — Basado en CSS variables + `prefers-color-scheme`

### Assets & Performance
- **astro:assets** — Optimización de imágenes
- **Lazy loading** — Carga progresiva
- **Static output** — HTML/CSS/JS planos

### Infraestructura
- **Build estático** (`astro build`)
- **Nginx** (recomendado para producción)
- **VPS friendly** — No requiere Node en runtime

---

## 🧱 Arquitectura del proyecto

```
src/
├── assets/
│   ├── images/
│   └── logo_isotipo.svg
├── components/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
├── styles/
│   └── global.css
└── lib/
    └── loadPhotos.ts
```

---

## 🚀 Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
```

---

## 🌐 Deploy

El proyecto genera un bundle completamente estático en `/dist`.

Ejemplo:

```bash
npm run build
rsync -avz dist/ usuario@vps:/var/www/frankografia
```

---

## 📄 Licencia

Uso personal.  
Las imágenes y el contenido visual son propiedad del autor.
