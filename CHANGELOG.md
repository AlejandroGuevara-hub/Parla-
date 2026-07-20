# Changelog — Parla!

## [1.2.0] — 2026-07-20

### Fixed
- Migra sección de funcionalidades "¿Qué quieres aprender hoy?" de `index.html` (Landing) a `inicio.html` (Inicio del estudiante). Las tarjetas de Podcast, Webtoon y Cultura estaban en la vista pre-login en vez de la vista post-login.
- Reemplaza emojis por íconos de Font Awesome en las tarjetas.

### Added
- Header de usuario autenticado en `inicio.html` con iconos de Perfil (`fa-user`), Contacto (`fa-envelope`) y Salir (`fa-right-from-bracket`).
- Estilos `.user-nav` para navegación de usuario y `.feature-card__link` para tarjetas cliqueables.
- Sección `.dashboard` con título "Bienvenido" y subtítulo "¿Qué quieres aprender hoy?".

### Changed
- `index.html` ahora solo contiene hero y showcase (sin sección de características).

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
