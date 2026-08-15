# Guía del Proyecto — Parla!

## Estructura de carpetas (esquema tipo MVC adaptado)

El proyecto sigue una estructura conceptual tipo MVC adaptada a frontend estático:

- **Views** → `src/views/` — Las páginas HTML.
- **Controllers** → `src/scripts/` — Los scripts JS que manejan navegación e interacción.
- **Models/Data** → `src/data/` — Datos de ejemplo en JSON (para Fase 2 en adelante).
- **Styles** → `src/styles/` — CSS (variables, componentes, página).
- **Assets** → `src/assets/` — Imágenes e iconos del sitio.

```
/
├── src/                        ← Código fuente del sitio
│   ├── views/                  ← Páginas HTML
│   │   ├── index.html          # Landing Page (pre-login: hero + showcase)
│   │   ├── login.html          # Inicio de sesión (maqueta)
│   │   ├── registro.html       # Registro (maqueta)
│   │   ├── inicio.html         # Inicio del estudiante (post-login: dashboard con 6 tarjetas)
│   │   ├── video.html          # Placeholder: Lecciones en video
│   │   ├── podcast.html        # Placeholder: Podcast
│   │   ├── webtoon.html        # Placeholder: Webtoon
│   │   ├── cultura.html        # Placeholder: Cultura
│   │   ├── flashcards.html     # Placeholder: Flashcards
│   │   ├── quizzes.html        # Placeholder: Quizzes
│   │   └── contacto.html       # Contacto: WhatsApp, fondo e ícono del cliente
│   ├── styles/                 ← CSS
│   │   ├── variables.css       # Design tokens
│   │   ├── components.css      # Componentes reutilizables
│   │   └── styles.css          # Estilos de página y layout
│   ├── scripts/                ← JavaScript
│   │   ├── nav.js              # Header móvil (landing) + captura de form[data-navegar]
│   │   ├── sidebar.js          # Drawer del sidebar (vistas autenticadas)
│   │   ├── theme.js            # Tema claro/oscuro con persistencia
│   │   └── animations.js       # animate-in (IntersectionObserver), parallax hero, blur de imágenes
│   ├── components/             ← Fragmentos HTML reutilizables (futuro)
│   ├── data/                   ← Datos de ejemplo estáticos (futuro)
│   └── assets/                 ← Imágenes e iconos
│       └── images/
│           ├── logo.png
│           ├── hero.png
│           ├── hero-bg.jpg
│           ├── podcast.png     # Foto tarjeta Podcast (origen: 7.png)
│           ├── webtoon.png     # Foto tarjeta Webtoon (origen: 6.png)
│           ├── cultura.png     # Foto tarjeta Cultura (origen: 8.png)
│           ├── video.png       # Foto tarjeta Lecciones en video (origen: 4.png)
│           ├── flashcards.png  # Foto tarjeta Flashcards (origen: 3.png)
│           ├── quizzes.png     # Foto tarjeta Quizzes (origen: 5.png)
│           ├── contact-bg.png     # Fondo página de Contactos
│           └── contact-icon.png   # Ícono decorativo teléfono+corazón
├── reference/                  ← Material CRUDO del cliente (no tocar)
│   ├── Diego-pagina web/       # Fotos, mockups, fuentes y requerimientos por parte
│   ├── Requerimientos de la Fase 1.pdf
│   └── Documento senza titolo(1).pdf
├── docs/                       ← Documentación
│   ├── CONTEXTO.md             # Resumen rápido del proyecto
│   ├── ERRORES.md              # Errores cometidos y solución
│   ├── GUIA-PROYECTO.md        # Esta guía
│   ├── GUIA-ANIMACIONES.md     # Sistema de motion design obligatorio
│   ├── PENDIENTES.md           # Tareas pendientes
│   ├── decisiones-tecnicas.md  # Decisiones de diseño/arquitectura
│   ├── guia-componentes.md     # Catálogo de componentes CSS
│   └── specs/                  # Especificaciones de cada bloque/fix (historial de tareas)
│       ├── instrucciones-opencode-bloque1.md
│       └── prompt-*.md         # Un spec por bloque o fix (15+ archivos)
├── prompts/                    ← Instrucciones de proceso (protocolos, no specs)
│   ├── prompt-releer-documentacion.md
│   ├── prompt-documentacion-completa.md
│   ├── prompt-commits-github.md
│   └── prompt-memoria-contexto.md
├── .gitignore
├── README.md                   ← Puerta de entrada
└── CHANGELOG.md                ← Historial de cambios
```

## Archivos CSS

| Archivo | Propósito |
|---|---|
| `src/styles/variables.css` | Tokens de diseño: colores, tipografías, espaciados, sombras. Única fuente de verdad visual. |
| `src/styles/components.css` | Componentes reutilizables: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-whatsapp`, `.input-field`, `.logo`, `.card`, `.form-toggle`, `.auth-form`. |
| `src/styles/styles.css` | Estilos de página: reset, header, hero, showcase, contact page, dashboard, auth pages, footer, responsive. |

## Archivos JS

| Archivo | Propósito |
|---|---|
| `src/scripts/nav.js` | Menú mobile toggle del header de la Landing + captura de submit de formularios con `data-navegar` (login/registro). Se carga solo en `index.html`, `login.html` y `registro.html`. |
| `src/scripts/sidebar.js` | Drawer del sidebar: abrir/cerrar con toggle, overlay y tecla Escape. Guard `if (!sidebar || !toggle || !overlay) return;`. Se carga solo en las vistas autenticadas (8 vistas). |
| `src/scripts/theme.js` | Selector de tema claro/oscuro con persistencia en localStorage (clave `parla-theme`). Se carga en las 11 vistas. |
| `src/scripts/animations.js` | Marca `js-animations-ready` y `page-loaded` en `<body>`, agrega `is-visible` a `.animate-in` vía IntersectionObserver (con delay escalonado), parallax sutil del hero y blur+fade (`img-load`/`img-loaded`) a todas las `<img>`. Respeta `prefers-reduced-motion`. Se carga en las 11 vistas. |

## Cómo correr el proyecto

Abrir en navegador directo:
```
src/views/index.html
```

O con servidor local:
```bash
python -m http.server 8000
# luego http://localhost:8000/src/views/index.html
```

## Patrón obligatorio: navegación con sidebar

Toda vista nueva debe incluir el sidebar por defecto, **no un header tradicional**, con estas excepciones: `index.html` (Landing), `login.html` y `registro.html` (páginas pre-login sin navegación).

- `<aside class="sidebar" id="sidebar">` fijo a la izquierda (`260px`, `height: 100vh`): logo arriba + lista `.sidebar-links` con los 8 enlaces (Inicio, Lecciones en video, Podcast, Webtoon, Cultura, Flashcards, Quizzes, Contactos). El enlace de la página actual lleva `.is-active`.
- `<div class="sidebar-overlay">` + `<button class="sidebar-toggle">` (hamburguesa) para el drawer en móvil (≤768px): el sidebar se desliza con `translateX`, overlay con fade; se cierra con clic en overlay o Escape (`src/scripts/sidebar.js`).
- Cluster flotante arriba a la derecha: `<nav class="floating-user-nav">` con `<ul class="user-nav">` (solo Perfil y Salir).
- El contenido principal va en `<main class="page-content">` (margen izquierdo de 260px en desktop, 0 en móvil).

CSS único en `src/styles/components.css` y `src/styles/styles.css`. Respeta `prefers-reduced-motion`.

La Landing (`index.html`) mantiene su propio nav de pre-login ("Iniciar sesión"/"Registrarme"); `login.html` y `registro.html` tampoco llevan sidebar — son las tres excepciones.
