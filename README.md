<div align="center">
  <img src="src/assets/images/logo.png" alt="Parla! logo" width="80">
  <h1 align="center">Parla! — Aprende italiano</h1>
  <p align="center">
    Plataforma web para aprender italiano de forma real, ligera y entretenida.
    <br>
    Lecciones en video · Podcast con transcripción · Webtoons · Cultura · Flashcards · Quizzes
  </p>
</div>

---

## Qué es Parla!

Plataforma web para aprender italiano dirigida a un público de 20-25 años. Debe sentirse
moderna, ligera y fácil de usar. El proyecto está en **Fase 1: prototipo clicable** — solo
interfaz y navegación, sin backend, sin base de datos y sin autenticación real. Los
formularios de login y registro son maquetas visuales que navegan entre sí (registro →
login → inicio) sin validar datos.

## Cómo correr el proyecto localmente

El proyecto es 100% estático (HTML + CSS + JS vanilla). **Las 5 secciones de contenido (Lecciones, Podcast, Cultura, Flashcards, Quizzes) cargan sus datos mediante `fetch()` desde `src/data/*.json`, por lo que requieren servir el proyecto por HTTP** (abrir el HTML directo con `file://` falla por CORS).

Desde la raíz del proyecto:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server .
# o npx serve
```

Luego visita `http://localhost:8000/src/views/index.html`.

## Stack técnico

- **HTML5** semántico y accesible (labels, `:focus-visible`, landmarks).
- **CSS3** con [design tokens propios](src/styles/variables.css) (colores, tipografías, espaciados, sombras). Única fuente de verdad visual: no se inventan colores/fuentes fuera de ahí.
- **JavaScript** vanilla, sin frameworks ni bundlers, solo para navegación e interacciones de UI.
- **Google Fonts**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (títulos, reemplazo temporal de Hatton), [Poppins](https://fonts.google.com/specimen/Poppins) (cuerpo), [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) (título compuesto de la landing) y [Cinzel Decorative](https://fonts.google.com/specimen/Cinzel+Decorative) (título de Contactos). Cada fuente se carga solo en la vista que la usa.
- **Font Awesome 6.5.2** vía CDN para los íconos (sidebar, tema, WhatsApp).
- **Responsive design**: breakpoints en 480px, 768px y 1024px.

## Estructura de carpetas

```
├── src/
│   ├── views/        ← Las 11 páginas HTML del sitio
│   ├── styles/       ← CSS: variables.css (tokens), components.css (reutilizables), styles.css (página)
│   ├── scripts/      ← JS: nav.js, sidebar.js, theme.js, animations.js
│   ├── assets/images/← Imágenes del sitio (logo, hero, fondo, fotos de tarjetas, contacto)
│   ├── components/   ← (reservado) fragmentos HTML reutilizables — aún no existe
│   └── data/         ← Datos de ejemplo estáticos (JSON) para secciones de contenido
│       ├── lecciones.json      # Módulos y lecciones con estados
│       ├── podcast.json        # Episodios con duración, estado y transcripción
│       ├── cultura.json        # Temas culturales con estados
│       ├── flashcards.json     # Mazos con total/dominadas y barra de progreso
│       ├── quizzes.json        # Quizzes con preguntas, estado y puntaje
│       └── perfil.json         # Datos de perfil de ejemplo (nombre, correo, nivel, estadísticas)
├── reference/        ← Material original del cliente (sin modificar): PDFs, zip y carpeta con fotos/mockups
├── docs/             ← Documentación técnica, especificaciones y guías
├── prompts/          ← Instrucciones de proceso (protocolos para cada tipo de tarea)
├── .gitignore
├── README.md
└── CHANGELOG.md      ← Historial de cambios por versión
```

## Vistas existentes

| Página | Descripción |
|---|---|
| [`src/views/index.html`](src/views/index.html) | **Landing Page** (pre-login): hero con fondo real, logo, CTA y sección compuesto (imagen + título + párrafo). No tiene sidebar. |
| [`src/views/login.html`](src/views/login.html) | **Inicio de sesión** (maqueta visual, sin backend). Navega a `inicio.html`. No tiene sidebar. |
| [`src/views/registro.html`](src/views/registro.html) | **Registro** (maqueta visual). Navega a `login.html` (flujo real registro → login). No tiene sidebar. |
| [`src/views/inicio.html`](src/views/inicio.html) | **Inicio del estudiante** (post-login): dashboard con 6 tarjetas funcionales que enlazan a sus páginas. Con sidebar. |
| [`src/views/video.html`](src/views/video.html) | **Lecciones en video**: banner "Continuar" + acordeón de módulos/lecciones con estados y progreso. Con sidebar. Carga `src/data/lecciones.json`. |
| [`src/views/podcast.html`](src/views/podcast.html) | **Podcast**: banner "Continuar" + lista de episodios con play visual, duración, estado y transcripción. Con sidebar. Carga `src/data/podcast.json`. |
| [`src/views/webtoon.html`](src/views/webtoon.html) | Placeholder de **Webtoon** (pendiente definición de contenido). Con sidebar. |
| [`src/views/cultura.html`](src/views/cultura.html) | **Cultura**: banner "Continuar" + lista de temas con estados. Con sidebar. Carga `src/data/cultura.json`. |
| [`src/views/flashcards.html`](src/views/flashcards.html) | **Flashcards**: banner "Continuar" + grid de mazos con barra de progreso (dominadas/total). Con sidebar. Carga `src/data/flashcards.json`. |
| [`src/views/quizzes.html`](src/views/quizzes.html) | **Quizzes**: banner "Continuar" + lista de quizzes con preguntas, estado y puntaje. Con sidebar. Carga `src/data/quizzes.json`. |
| [`src/views/perfil.html`](src/views/perfil.html) | **Perfil** (ejemplo): avatar con iniciales, nombre/correo/nivel, 3 stats, info personal y preferencias visuales (sin funcionalidad real). Con sidebar. Carga `src/data/perfil.json`. |
| [`src/views/contacto.html`](src/views/contacto.html) | **Contactos**: fondo e ícono del cliente, número de teléfono y botón de WhatsApp. Con sidebar. |

## Funcionalidades ya implementadas

- **Sidebar de navegación vertical**: panel fijo de 260px a la izquierda con logo arriba y 8
  enlaces (Inicio, Lecciones en video, Podcast, Webtoon, Cultura, Flashcards, Quizzes,
  Contactos). En móvil (≤768px) se convierte en drawer con hamburguesa y overlay, controlado
  por `src/scripts/sidebar.js`. **Aplica solo a las vistas autenticadas** (`inicio.html`,
  `contacto.html` y los 6 placeholders). **No aplica** en la Landing (`index.html`) ni en
  `login.html`/`registro.html` (páginas pre-login) — en ninguna de sus 3 formas (panel fijo,
  botón de menú ni drawer/overlay).
- **Cluster flotante de usuario** (`.floating-user-nav`): Perfil y Salir, arriba a la derecha,
  solo en vistas con sidebar.
- **Tema claro/oscuro**: botón flotante en la esquina inferior derecha en las 11 vistas, con
  persistencia en `localStorage` (clave `parla-theme`) y script inline en `<head>` que pre-aplica
  el tema antes del primer render para evitar parpadeo (`src/scripts/theme.js`).
- **Sistema de animaciones**: entradas `.animate-in` con fade + flotar + blur vía
  `IntersectionObserver`, fade de carga de página, parallax sutil del hero, blur+fade de
  imágenes, y hover/active/focus en botones y tarjetas. Todo documentado y obligatorio en
  [`docs/GUIA-ANIMACIONES.md`](docs/GUIA-ANIMACIONES.md). Respeta `prefers-reduced-motion`.
- **Diseño responsive**: breakpoints en 480px, 768px y 1024px. Hero con contenido a la derecha
  en desktop y angosto pegado al borde derecho en tablet/móvil; tarjetas del dashboard en grid
  `auto-fit`; sidebar con drawer en móvil.

## Qué NO está implementado todavía

- Contenido real de **Webtoon** — hoy es placeholder (pendiente definición por el cliente).
- Barra de progreso del estudiante.
- Sistema de favoritos.
- Autenticación real (login/registro son maquetas visuales).
- La fuente Hatton (se usa Fraunces como reemplazo temporal).
- Conectar audio real en Podcast (botones de play son visuales).
- Detalles y dependencias del cliente: ver [`docs/PENDIENTES.md`](docs/PENDIENTES.md).

## Índice de documentación

| Archivo | Contenido |
|---|---|
| [`docs/CONTEXTO.md`](docs/CONTEXTO.md) | Resumen rápido: fase, estado de avance, dónde está cada cosa, reglas fijas |
| [`docs/GUIA-PROYECTO.md`](docs/GUIA-PROYECTO.md) | Guía completa: estructura de carpetas, archivos, patrón obligatorio de navegación |
| [`docs/guia-componentes.md`](docs/guia-componentes.md) | Catálogo de componentes reutilizables y dónde se usan |
| [`docs/GUIA-ANIMACIONES.md`](docs/GUIA-ANIMACIONES.md) | Sistema de motion design obligatorio para todo bloque nuevo |
| [`docs/decisiones-tecnicas.md`](docs/decisiones-tecnicas.md) | Decisiones de arquitectura y diseño (y por qué) |
| [`docs/ERRORES.md`](docs/ERRORES.md) | Errores ya cometidos, causa y solución — no repetir |
| [`docs/PENDIENTES.md`](docs/PENDIENTES.md) | Tareas a medias, dependencias del cliente y blockers |
| [`CHANGELOG.md`](CHANGELOG.md) | Historial de cambios por versión |
| [`docs/specs/`](docs/specs/) | Especificaciones/alcances de cada bloque y fix (historial de prompts de tareas) |
| [`prompts/`](prompts/) | Instrucciones de proceso (releer documentación, documentación completa, commits, memoria) |

## Licencia

Todos los derechos reservados &copy; 2026 Parla!