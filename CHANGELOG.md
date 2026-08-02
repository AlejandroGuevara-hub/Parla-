# Changelog — Parla!

## [1.18.0] — 2026-08-02

### Changed
- Reemplaza header/íconos flotantes por panel de navegación vertical fijo en todas las vistas excepto landing. Nuevo `.sidebar` (260px fijo a la izquierda, logo arriba + 8 enlaces con ícono, enlace activo con `--color-primary`), `.sidebar-link`/`.sidebar-link.is-active`, `.sidebar-toggle` (hamburguesa) y `.sidebar-overlay` (drawer responsive ≤768px con `translateX` + fade, cierre por overlay/Escape) — nuevo `src/scripts/sidebar.js`. Contenido con `.page-content { margin-left: 260px }`.
- "Contacto" pasa de ícono flotante de WhatsApp a enlace del sidebar (`fa-comment`); el cluster flotante queda solo con Perfil y Salir; el logo flotante (`.floating-logo`) se elimina (el logo vive en el sidebar).
- Aplica a `inicio.html`, `login.html`, `registro.html`, `contacto.html` y los 6 placeholders. La Landing (`index.html`) no cambia.

## [1.17.0] — 2026-08-02

### Changed
- Elimina header tradicional en vistas de usuario autenticado; logo e íconos quedan flotantes y fijos al hacer scroll. Nuevos componentes `.floating-logo` (arriba a la izquierda, enlaza a `index.html`) y `.floating-user-nav` (arriba a la derecha: Perfil / Contacto con ícono de WhatsApp / Salir) en `components.css`, con fondo tipo píldora y `position: fixed`. En móvil (≤480px) las etiquetas se ocultan y quedan solo íconos.
- Aplica a `inicio.html`, `contacto.html` y los 6 placeholders. En `contacto.html` se retiró el logo grande del hero (144px) en favor del logo flotante. La Landing (`index.html`), `login.html` y `registro.html` no cambian.

## [1.16.0] — 2026-08-02

### Changed
- Reemplaza íconos por imágenes reales en las 6 tarjetas de inicio, según diseño original del cliente. Copia `3-8.png` de `reference/Diego-pagina web/Parte/2.inicio del estudiante/Fotos/` a `src/assets/images/` con nombres descriptivos (`podcast.png`, `webtoon.png`, `cultura.png`, `video.png`, `flashcards.png`, `quizzes.png`).
- Elimina los círculos `.icon` de Font Awesome y los estilos `.feature-card .icon*`. La tarjeta ahora es: imagen (4px de espacio lateral exactos, `--card-image-h`, `object-fit: cover`, `border-radius: inherit`) → título → descripción.
- Consolida `--feature-card-max-w` en `--card-frame-w: 316.7px` (ancho de frame del mockup); el grid usa `minmax(240px, var(--card-frame-w))`.

## [1.15.0] — 2026-07-31

### Changed
- Elimina la barra del header en las 8 vistas (landing y vistas autenticadas). Los botones de navegación quedan flotando en la esquina superior derecha sin fondo ni borde, en la posición donde estaba la barra. Se desplazan con la página al hacer scroll.
- `.site-header` pasa a contenedor invisible (`position: absolute` + `pointer-events: none`; el `nav` recupera `pointer-events: auto`). Elimina la clase `.site-header--scrolled` (CSS y JS) y ajusta `.hero` a `min-height: 100vh`.

## [1.14.0] — 2026-07-31

### Added
- Sistema de motion design permanente adoptado como estándar del proyecto: nueva guía `docs/GUIA-ANIMACIONES.md` que se aplica automáticamente a toda sección futura. Amplía el sistema existente: entradas `.animate-in` con blur, parallax sutil del hero al hacer scroll, header sticky que se encoge al hacer scroll (`.site-header--scrolled`), blur+fade de imágenes al cargar (`.img-load`/`.img-loaded`), hover/active/focus en botones, shimmer permanente en el CTA del hero, stagger de entrada en footers y transición suave de focus en inputs.
- Aparición escalonada de footers en las 8 vistas (clase `animate-in`).

### Changed
- Sección compuesto de la Landing: grid `30% / 70%` en desktop y `40% / 60%` en móvil (imagen 70%, título con overlay `4.6rem` / `1.25rem`, párrafo `1.2rem` / `0.6rem` debajo de la imagen). La sección ocupa el ancho completo (sin max-width).
- Hero de la Landing: contenido desplazado a la derecha (`margin-left: 50%`), título `4.5rem` en dos líneas con `letter-spacing` (blanco + teal), subtítulo `1.5rem` partido con `<br>` y botón grande (`.btn-lg`).
- Logo ampliado 300% (108px en hero, 144px en contacto, 108px en formularios) y eliminado del header en 8 vistas; los botones de iniciar sesión/registrarse quedan alineados a la derecha (`margin-left: auto`).

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

## [1.13.0] — 2026-07-20

### Fixed
- Corrige hover de tarjetas: reemplaza borde sólido simulado por levantamiento sutil (translateY), sombra elevada y cambio de borde con transición suave. Usa `:focus-visible` para foco por teclado.

## [1.12.0] — 2026-07-20

### Changed
- Baja opacidad del glow en lecciones en video (::before a 0.6, ::after a 0.35) para mejorar legibilidad del texto de la tarjeta.

## [1.11.0] — 2026-07-20

### Changed
- Reemplaza técnica de glow por degradado giratorio de dos capas basado en referencia del cliente (conic-gradient 360° con @property e interpolación de ángulo, inset -0.25rem, blur 1.25rem). Agrega 3 tokens `--glow-clr-1/2/3` en variables.css.

## [1.10.0] — 2026-07-20

### Fixed
- Reemplaza resplandor borroso (conic-gradient + blur 12px) por anillo animado con máscara en tarjeta de Lecciones en video. El efecto se veía como una mancha (blob) en vez de un brillo prolijo en el borde.

## [1.9.0] — 2026-07-20

### Changed
- Amplía animaciones `.animate-in` a más elementos (imágenes, botones, encabezados, bloques de texto) en todas las vistas. Agrega fade de carga de página completa (`body` opacity 0 → 1 con `page-loaded`).
- Reemplaza halo pulsante por resplandor giratorio fluido en tarjeta de Lecciones en video (rotación continua con `linear` en vez de `ease-in-out`).

## [1.8.0] — 2026-07-20

### Added
- Crea página de Contactos (`contacto.html`) con fondo del cliente, título en Cinzel Decorative, ícono decorativo, número y botón de WhatsApp. Conecta el ícono de Contacto del header de usuario autenticado a la nueva página.

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
