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
│   │   └── nav.js              # Navegación e interacciones
│   ├── components/             ← Fragmentos HTML reutilizables (futuro)
│   ├── data/                   ← Datos de ejemplo estáticos (futuro)
│   └── assets/                 ← Imágenes e iconos
│       └── images/
│           ├── logo.png
│           ├── hero.png
│           ├── hero-bg.jpg
│           ├── contact-bg.png     # Fondo página de Contactos
│           └── contact-icon.png   # Ícono decorativo teléfono+corazón
├── reference/                  ← Material CRUDO del cliente (no tocar)
│   ├── Diego-pagina web/
│   ├── Requerimientos de la Fase 1.pdf
│   └── Documento senza titolo(1).pdf
├── docs/                       ← Documentación
│   ├── CONTEXTO.md             # Resumen rápido del proyecto
│   ├── ERRORES.md              # Errores cometidos y solución
│   ├── GUIA-PROYECTO.md        # Esta guía
│   ├── PENDIENTES.md           # Tareas pendientes
│   ├── decisiones-tecnicas.md  # Decisiones de diseño/arquitectura
│   ├── guia-componentes.md     # Catálogo de componentes CSS
│   └── specs/                  # Especificaciones de cada bloque
│       └── instrucciones-opencode-bloque1.md
├── prompts/                    ← Historial de prompts de cada sesión
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
| `src/scripts/nav.js` | Menú mobile toggle + captura de submit de formularios con `data-navegar`. |
| `src/scripts/sidebar.js` | Drawer del sidebar: abrir/cerrar con toggle, overlay y tecla Escape. |
| `src/scripts/theme.js` | Selector de tema claro/oscuro con persistencia en localStorage. |

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
