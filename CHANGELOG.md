# Changelog — Parla!

## [1.19.19] — 2026-08-08

### Fixed
- Imagen de fondo del hero ya no se desborda ni deja franja gris arriba al scrollear. Se quitó el `scale(1.08)` del parallax (sobredimensionaba la imagen, que desbordaba el hero y dejaba ver el fondo del `body`), y en su lugar `hero__bg` tiene sangrado propio (`top/bottom: -30px`) para cubrir siempre el hero aunque el parallax la desplace hasta 24px.

## [1.19.18] — 2026-08-08

### Fixed
- Parallax del hero de la Landing: se corrige el cálculo del avance. Antes usaba `avance = scrollY - inicio` (posición fija), que crecía al scrollear y desplazaba la imagen hacia abajo hasta recortarla/achicarla dentro del hero (`overflow: hidden`). Ahora el avance deriva de la posición del hero en el viewport (`getBoundingClientRect().top`), la imagen se mueve más lenta que el contenido (factor 0.2, acotado a 0–24px) y solo cuando el hero sube — ya no se recorta ni se achica.

## [1.19.17] — 2026-08-08

### Added
- Página de detalle de episodio (`episodio-detalle.html`) como plantilla dinámica: lee `?id=` de la URL, hace `fetch()` de `src/data/podcast.json`, busca el episodio por id y renderiza su contenido. Incluye portada placeholder con degradado (`.episodio-imagen-placeholder`), reproductor simulado (`.reproductor-simulado`): botón play/pausa que solo alterna el ícono y barra de progreso en 0% (sin audio real), transcripción simulada con skeleton (`.skeleton-line`, shimmer respetando `prefers-reduced-motion`), y navegación anterior/siguiente desde el orden del JSON. Si el id no existe, muestra "Episodio no encontrado".
- `podcast.html`: cada fila de episodio es ahora un link a `episodio-detalle.html?id=<id>`, generado dinámicamente del mismo JSON.

## [1.19.16] — 2026-08-08

### Added
- Página de detalle de lección (`leccion-detalle.html`) como plantilla dinámica: lee `?id=` de la URL con `URLSearchParams`, hace `fetch()` de `src/data/lecciones.json`, busca la lección recorriendo los módulos y renderiza su contenido (módulo, título, placeholder de reproductor de video, badge de estado, botón "Marcar como completada" visual y navegación anterior/siguiente calculada desde el orden de las lecciones). Si el `id` no existe, muestra "Lección no encontrada". No hay un `.html` por lección: agregar una lección a `lecciones.json` la hace aparecer en `video.html` y en su detalle sin crear archivos.
- `video.html`: cada lección de la lista es ahora un link a `leccion-detalle.html?id=<id>`, generado dinámicamente del mismo JSON.

## [1.19.15] — 2026-08-08

### Fixed
- Corrige superposición del botón de menú con el logo del sidebar en móvil (≤768px):
  - Añadido `padding-top: 4.5rem` a `.sidebar` para reservar espacio del botón fijo.
  - El botón de menú (`.sidebar-menu-toggle`) cambia a ícono "X" (`fa-xmark`) al abrir el drawer y vuelve a hamburguesa (`fa-bars`) al cerrar, con `aria-label` dinámico ("Abrir menú" / "Cerrar menú").
  - Añadido cierre por tecla Escape.
  - `z-index` del botón ajustado a 60 (por encima del sidebar).

## [1.19.14] — 2026-08-08

### Changed
- Convierte sidebar y cluster de usuario en Web Components reutilizables (`<parla-sidebar>`, `<parla-user-nav>`) en `src/scripts/components/`. Elimina HTML duplicado en 9 páginas (`inicio`, `video`, `podcast`, `webtoon`, `cultura`, `flashcards`, `quizzes`, `contacto`, `perfil`). Usa light DOM (sin Shadow DOM) para reutilizar CSS global existente. Atributo `current` en `<parla-sidebar>` marca el enlace activo. Scripts cargados como módulos ES (`type="module"`).

## [1.19.13] — 2026-08-08

### Added
- Crea página de Perfil de ejemplo (`perfil.html`) sin funcionalidad real: avatar con iniciales, nombre/correo/nivel, 3 tarjetas de estadísticas (lecciones, racha, horas), información personal de solo lectura con botón "Editar" (solo alerta), preferencias con toggles visuales (notificaciones, recordatorios, tema auto) sin persistencia. Datos en `src/data/perfil.json`. Conecta el ícono "Perfil" del cluster flotante y el sidebar a `perfil.html` en todas las vistas autenticadas. CSS: `.profile-avatar`, `.profile-header`, `.stat-card`, `.profile-info`, `.preference-toggle`, `.profile-edit-btn`.

## [1.19.12] — 2026-08-08

### Added
- Construye el contenido de Lecciones, Podcast, Cultura, Flashcards y Quizzes con datos de ejemplo en JSON (`src/data/*.json`). Cada página hace `fetch()` de su JSON y renderiza dinámicamente:
  - `video.html`: banner "Continuar" + acordeón de módulos/lecciones con estados (completado/en-progreso/pendiente) y % en lección actual.
  - `podcast.html`: banner "Continuar" + lista de episodios (play visual, duración, estado escuchado/en-progreso/pendiente, transcripción).
  - `cultura.html`: banner "Continuar" + lista de temas con estados.
  - `flashcards.html`: banner "Continuar" + grid de mazos con barra de progreso (dominadas/total) y estado.
  - `quizzes.html`: banner "Continuar" + lista de quizzes (preguntas, estado, puntaje si completado).
- Componentes CSS nuevos: `.continue-banner`, `.module-card`/acordeón, `.episode-item`, `.topic-item`, `.deck-card` (grid), `.quiz-item`, iconos de estado (`.estado-icon`).
- Datos JSON en `src/data/`: `lecciones.json`, `podcast.json`, `cultura.json`, `flashcards.json`, `quizzes.json`.
- `README.md`: actualizado con instrucciones de servidor local para `fetch()`.

## [1.19.11] — 2026-08-08

### Changed
- Refuerza efecto hover de las tarjetas de inicio para que se sientan flotando/levitando: `.feature-card` con transición propia `0.35s cubic-bezier(0.22, 1, 0.36, 1)` (curva de `GUIA-ANIMACIONES`, reemplaza la de `.card`); dentro de `@media (hover: hover)` el hover eleva `translateY(-10px) scale(1.02)` con sombra `0 20px 30px rgba(0,0,0,0.18)` y la imagen hace `scale(1.04)`. `.feature-card__link` gana `overflow: hidden` para contener el zoom de la imagen en el marco redondeado; imagen con transición. No aplica en touch (sin hover real), respeta `prefers-reduced-motion`.

## [1.19.10] — 2026-08-08

### Changed
- Tarjetas de inicio muestran 2 por fila en móvil (≤480px), con tamaño reducido: grid `repeat(2, 1fr)` con `gap: var(--space-sm)` (3 filas de 2 en vez de 6 filas de 1), tarjeta con padding `var(--space-sm) 4px var(--space-xs) 4px`, imagen a `120px` de alto, título `0.9rem` y descripción `0.7rem`. Tablet y escritorio no cambian.

## [1.19.9] — 2026-08-08

### Changed
- Auditoría completa de documentación: se revisa y actualiza README y todos los archivos de docs/ para reflejar el estado real del proyecto. README reescrito (qué es, cómo correr, estructura completa, las 11 vistas, funcionalidades, pendientes, índice de docs); GUIA-PROYECTO (árbol y scripts al día, incluye `animations.js`, imágenes de tarjetas y specs); guia-componentes (fichas corregidas: `card`/`nav-toggle`/`hero__subtitle`/composite móvil/tema en 11 vistas, header `.btn-whatsapp`, nota de auditoría en `card--featured`); ERRORES (entrada del spec de glow nunca aplicado); decisiones-tecnicas (grid composite real 30/70, título 2.25rem, estructura de carpetas completa); PENDIENTES (Contactos marcado construido, glow spec no aplicado).

## [1.19.8] — 2026-08-06

### Changed
- Aumenta la separación superior de los botones en login y registro: `.auth-card form .btn-primary` gana `margin-top: var(--space-lg)` (antes sin margen propio). Los formularios no usan las clases `.login-form`/`.registro-form`, el selector real es el de arriba; el espaciado entre campos (`--space-sm`) no cambia.

## [1.19.7] — 2026-08-06

### Changed
- Reduce drásticamente el tamaño del h2 y p de la sección compuesto de la Landing: título base a `--fs-heading-composite` `2.25rem` (token ajustado de `3.5rem`; solo lo usa ese componente), párrafo base a `0.8125rem`; responsive `.composite-section h2` `1.5rem` (≤1024px) / `1.25rem` (≤480px) y `.composite-section p` `0.6875rem` (≤1024px) / `0.625rem` (≤480px).

## [1.19.6] — 2026-08-06

### Fixed
- Reduce el tamaño de h2 y p de la sección compuesto de la Landing de forma independiente, con selectores de etiqueta combinados con la clase de la sección (`.composite-section h2` / `.composite-section p`, especificidad 0,1,1) en vez de las clases internas: título `2.25rem` (≤1024px) y `1.75rem` (≤480px); párrafo `0.8rem` (≤1024px) y `0.75rem` (≤480px). Se elimina el `font-size` muerto del bloque ≤768px del composite (lo controlan los bloques ≤1024/≤480).

## [1.19.5] — 2026-08-06

### Changed
- Reduce tamaños en responsive de la Landing: hero más compacto (título `2.25rem` y subtítulo `0.85rem` en ≤1024px; `1.5rem`/`0.8rem` en ≤480px; botón `.hero .btn-primary` a `0.8rem`/`0.75rem` con padding reducido), composite-section (`2.5rem`/`0.85rem` en ≤1024px; `2rem`/`0.8rem` en ≤480px) y footer (`0.6875rem` en ≤480px). Solo selectores de la Landing; los tokens globales de `variables.css` no se tocan.
- Logo de Login y Registro más chico en responsive: imagen a `32px` (≤1024px) y `26px` (≤480px), texto "Parla!" a `1.1rem`/`0.95rem`. No afecta el logo de otras vistas (`.hero__logo`, `.sidebar__logo`).

## [1.19.4] — 2026-08-06

### Fixed
- Corrige el posicionamiento de `.hero__content` a la derecha en responsive: el `@media (max-width: 768px)` lo reseteaba a `margin-left: 0; max-width: none` (bloque a ancho completo pegado a la izquierda). Ahora `margin-left: auto; width: fit-content; max-width: 70%` lo pega al borde derecho angosto en tablet y móvil (85% en ≤480px). `.hero` es `flex` (fila), así que la alineación correcta es en el eje principal. Desktop no cambia.

## [1.19.3] — 2026-08-06

### Docs
- Crea `prompts/prompt-releer-documentacion.md` (protocolo de entrada: releer CONTEXTO/GUIA-PROYECTO/guia-componentes/ERRORES/decisiones/GUIA-ANIMACIONES/CHANGELOG/PENDIENTES y el spec de la tarea antes de ejecutar).
- Crea `docs/specs/prompt-fix-sidebar-sin-login-registro.md` (alcance final del sidebar: sin él en index/login/registro, incluidas las 3 formas — fijo, botón de menú y drawer/overlay — en todos los breakpoints).

## [1.19.2] — 2026-08-06

### Fixed
- Confirma que el sidebar no aparezca en login/registro en ningún formato: además del panel fijo ya excluido, no hay botón de menú (`.sidebar-toggle`), drawer ni overlay en `login.html` y `registro.html` en ningún breakpoint (móvil, tablet, escritorio). Esas vistas no incluyen el markup del sidebar ni cargan `src/scripts/sidebar.js` (solo `nav.js`, `theme.js`, `animations.js`). La exclusión cubre las 3 formas del sidebar.

## [1.19.1] — 2026-08-05

### Changed
- Traslada el texto del hero de la Landing más a la derecha: `margin-left` pasa de `50%` a `58%` en desktop y de `35%` a `42%` en el breakpoint ≤1024px.

## [1.19.0] — 2026-08-05

### Changed
- Sistema responsive de la Landing: el contenido del hero (texto principal a la derecha) deja de saltar de `margin-left: 50%` a `0` — nuevo breakpoint intermedio ≤1024px con `margin-left: 35%`, `max-width: 520px`, título `3.5rem` y subtítulo `1.25rem` (posteriormente ajustado a `58%`/`42%` en `1.19.1`).
- Botones más pequeños en general: `.btn` base pasa a `0.625rem 1.25rem` con fuente `--fs-caption` (antes `0.75rem 1.5rem` + `--fs-body`); `.btn-sm` a `0.4rem 0.875rem` con fuente `0.6875rem`; `.btn-lg` a `1rem 2.5rem` con fuente `1.125rem` (antes `1.25rem 3.5rem` + `1.25rem`); `.btn-whatsapp` a `0.75rem 1.75rem` con fuente `1rem`.
- Título de la sección compuesto (h2 "Olvídate de memorizar reglas"): ahora usa el token `--fs-heading-composite` (`3.5rem`) en vez del valor hardcodeado `4.6rem`.
- Móvil (≤480px): título del hero reducido a `1.5rem` (antes `1.75rem`) y `.btn-lg` más compacto (`0.875rem 2rem` + fuente `1rem`) manteniendo `width: 100%`.

## [1.18.1] — 2026-08-02

### Fixed
- Quita el sidebar de login y registro, no debía estar ahí. El alcance final del sidebar es solo las vistas autenticadas (`inicio.html`, `contacto.html` y los 6 placeholders); `index.html`, `login.html` y `registro.html` quedan sin sidebar. Login/registro vuelven a su layout original centrado (sin `margin-left` de `.page-content`), sin overlay ni hamburguesa, y sin el cluster flotante Perfil/Salir (no tiene sentido pre-login).

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

## [1.4.0] — 2026-07-20

### Added
- Agrega resplandor animado giratorio a la tarjeta de Lecciones en video para marcarla como tarea principal: clase `.card--featured` con `conic-gradient` de `--color-primary`, `filter: blur(12px)` y animación `rotar-resplandor` de 4s. Respeta `prefers-reduced-motion`.

## [1.3.0] — 2026-07-20

### Added
- Crea 6 páginas placeholder funcionales para las secciones: `video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`. Cada una con header de usuario autenticado, ícono de sección, mensaje de marcador de posición y botón de volver.
- Conecta las 6 tarjetas del dashboard en `inicio.html` como hipervínculos reales a sus páginas correspondientes (reemplaza `href="#"`).

## [1.2.2] — 2026-07-20

### Fixed
- Corrige flujo de registro: el botón "Crear cuenta" ahora navega a `login.html` en vez de `inicio.html`.

## [1.2.1] — 2026-07-20

### Fixed
- Corrige ancho de tarjetas en dashboard de inicio: agrega `--feature-card-max-w: 280px` y cambia grid a `auto-fit` con `justify-content: center` para que las tarjetas sean angostas, centradas y no se estiren al ancho disponible.
- Elimina subrayado heredado del enlace en tarjetas; cambia retroalimentación hover a borde `box-shadow: 0 0 0 2px var(--color-primary)`.

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