# Changelog — Parla!

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
