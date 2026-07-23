# Changelog — Parla!

## [1.2.0] — 2026-07-20

### Fixed
- Migra sección de funcionalidades "¿Qué quieres aprender hoy?" de `index.html` (Landing) a `inicio.html` (Inicio del estudiante). Las tarjetas de Podcast, Webtoon y Cultura estaban en la vista pre-login en vez de la vista post-login.
- Reemplaza emojis por íconos de Font Awesome en las tarjetas.

### Added
- Header de usuario autenticado en `inicio.html` con iconos de Perfil (`fa-user`), Contacto (`fa-envelope`) y Salir (`fa-right-from-bracket`).
- Estilos `.user-nav` para navegación de usuario y `.feature-card__link` para tarjetas cliqueables.
- Sección `.dashboard` con título "Bienvenido" y subtítulo "¿Qué quieres aprender hoy?".
- Tarjetas de Lecciones en video, Flashcards y Quizzes en el dashboard (6 tarjetas total).
- 2 tokens de color nuevos: `--color-accent-gold` (Flashcards) y `--color-secondary-dark` (Quizzes) en `variables.css`.
- Estilos de círculo `.icon.video`, `.icon.flashcards`, `.icon.quizzes` en `styles.css`.

### Changed
- `index.html` ahora solo contiene hero y showcase (sin sección de características).

## [1.2.1] — 2026-07-20

### Fixed
- Corrige ancho de tarjetas en dashboard de inicio: agrega `--feature-card-max-w: 280px` y cambia grid a `auto-fit` con `justify-content: center` para que las tarjetas sean angostas, centradas y no se estiren al ancho disponible.
- Elimina subrayado heredado del enlace en tarjetas; cambia retroalimentación hover a borde `box-shadow: 0 0 0 2px var(--color-primary)`.

## [1.2.2] — 2026-07-20

### Fixed
- Corrige flujo de registro: el botón "Crear cuenta" ahora navega a `login.html` en vez de `inicio.html`.

## [1.3.0] — 2026-07-20

### Added
- Crea 6 páginas placeholder funcionales para las secciones: `video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`. Cada una con header de usuario autenticado, ícono de sección, mensaje de marcador de posición y botón de volver.
- Conecta las 6 tarjetas del dashboard en `inicio.html` como hipervínculos reales a sus páginas correspondientes (reemplaza `href="#"`).

## [1.4.0] — 2026-07-20

### Added
- Agrega resplandor animado giratorio a la tarjeta de Lecciones en video para marcarla como tarea principal: clase `.card--featured` con `conic-gradient` de `--color-primary`, `filter: blur(12px)` y animación `rotar-resplandor` de 4s. Respeta `prefers-reduced-motion`.

## [1.7.0] — 2026-07-20

### Changed
- Ajusta ancho de imagen compuesta al 65% del contenedor con `aspect-ratio: 7 / 4`.
- Agranda título a 56px (3.5rem) con fuente DM Serif Display y token `--font-heading-composite`.

### Removed
- Elimina tarjetas duplicadas de Podcast/Webtoon/Cultura en la sección compuesto de la Landing (ya existían en `inicio.html`).

## [1.6.0] — 2026-07-20

### Changed
- Rediseña sección del compuesto en landing: layout de dos columnas, título "Olvídate de memorizar reglas." y párrafo nuevos. Agrega 7 tokens nuevos en variables.css (`--color-heading-gold`, `--color-text-navy`, `--fs-heading-composite`, `--fs-body-composite`, `--ls-heading-composite`, `--lh-heading-composite`, `--lh-body-composite`).

## [1.5.0] — 2026-07-20

### Fixed
- Corrige apilamiento del resplandor en `.card--featured`: agrega `z-index: 2` a `.card` y cambia `.card--featured` a `z-index: 1` para que el glow nunca se superponga a tarjetas vecinas.

### Added
- Sistema de animaciones de entrada tipo "flotar" (`.animate-in`) con `IntersectionObserver` en todas las vistas. Los elementos aparecen con un desplazamiento vertical y fade-in al entrar en pantalla, con efecto cascada entre tarjetas. Nuevo archivo: `src/scripts/animations.js`.

### Changed
- Reemplaza resplandor giratorio (conic-gradient + pseudo-elemento) por halo de blur pulsante (`box-shadow` animado) en tarjeta de Lecciones en video. Agrega `--color-primary-rgb` en `variables.css`.

## [1.1.0] — 2026-07-19

### Added
- Selector de tema claro/oscuro flotante en todas las vistas (`index.html`, `login.html`, `registro.html`, `inicio.html`).
- Botón `.theme-toggle` con posición fija en esquina inferior derecha, alterna entre `fa-moon` y `fa-sun` (Font Awesome).
- Persistencia de preferencia en `localStorage` (clave `parla-theme`) con script inline en `<head>` para evitar parpadeo.
- Bloque `[data-theme="dark"]` en `src/styles/variables.css` con paleta oscura basada en los tokens existentes.
- `src/scripts/theme.js`: lógica de alternancia y sincronización de ícono/aria-label.
- Documentación del componente en `docs/guia-componentes.md` y decisión técnica en `docs/decisiones-tecnicas.md`.

## [1.0.0] — 2026-07-17

### Added
- Landing Page (`index.html`) con hero, logo, CTA y sección de características.
- Login (`login.html`) con campos de correo y contraseña (solo maqueta, sin backend).
- Registro (`registro.html`) con campos de nombre, correo, contraseña y confirmación (solo maqueta, sin backend).
- Placeholder de inicio (`inicio.html`) para navegación post-login.
- Sistema de diseño con variables CSS (`css/variables.css`).
- Componentes reutilizables (`css/components.css`): botones, inputs, logo, tarjetas.
- Estilos de página (`css/styles.css`): layout, hero, formularios, responsive.
- Navegación con JS vanilla (`js/nav.js`): menú mobile toggle y envío ficticio de formularios.
- Documentación técnica: `docs/decisiones-tecnicas.md` y `docs/guia-componentes.md`.

### Fixed
- Corrige estructura de hero en Landing Page: fondo con imagen de referencia (`hero-bg.jpg`), logo repetido dentro del hero, imagen compuesta de ChatGPT movida a sección independiente (`showcase`) debajo del hero.

### Changed
- Actualiza copy del hero (título "Aprende italiano", subtítulo "De forma real, ligera y entretenida.", botón "Comienza el recorrido") y elimina overlay de fondo. Imagen de fondo ahora visible a plena claridad con `text-shadow` sobre el texto para legibilidad. Hero reestructurado con nomenclatura BEM (`.hero__bg`, `.hero__logo`, `.hero__content`, `.hero__title`, `.hero__subtitle`).

### Changed
- Reestructura el proyecto a esquema tipo MVC: HTML (`src/views/`), CSS (`src/styles/`), JS (`src/scripts/`), assets (`src/assets/`), reference/ del cliente separado, prompts/ y docs/specs/ organizados. Rutas internas corregidas (CSS, JS, imágenes). `variables.css` duplicado eliminado. Documentación creada/actualizada: `CONTEXTO.md`, `ERRORES.md`, `GUIA-PROYECTO.md`, `PENDIENTES.md`.
