# Guía de componentes — Parla!

## Bloque 1 — Componentes creados

### `.btn`
Botón base. No usar directamente; usar las variantes `.btn-primary` o `.btn-secondary`.

```html
<a href="..." class="btn btn-primary">Texto</a>
<button class="btn btn-secondary">Texto</button>
```

**Variantes:**
- `.btn-primary` — Fondo teal (`--color-primary`), texto blanco.
- `.btn-secondary` — Borde teal, texto teal, fondo transparente.
- `.btn-lg` — Versión grande para hero/CTA: `padding: 1.25rem 3.5rem; font-size: 1.25rem`.

**Dónde se usa:** `index.html` (hero actions), `login.html`, `registro.html`, header nav.

---

### `.input-field`
Contenedor de campo de formulario con label.

```html
<div class="input-field">
  <label for="email">Correo electrónico</label>
  <input type="email" id="email" name="email" ...>
</div>
```

**Dónde se usa:** `login.html` y `registro.html`.

---

### `.logo`
Enlace con logo + texto, para header y formularios.

```html
<a href="index.html" class="logo">
  <img src="../assets/images/logo.png" alt="Parla! logo">
  <span>Parla!</span>
</a>
```

**Dónde se usa:** Header de `src/views/index.html` y `src/views/inicio.html`, encabezado de `src/views/login.html` y `src/views/registro.html`.

---

### `.card`
Tarjeta con borde suave, fondo blanco y sombra.

```html
<div class="card">...</div>
```

**Dónde se usa:** `.feature-card` en landing page, `.auth-card` en login/registro.

**Comportamiento hover/focus:**
- `:hover`: levanta la tarjeta 4px con `translateY(-4px)`, eleva la sombra (`--shadow-card-hover`) y cambia el borde a `--color-primary`. Transición suave de 0.2s.
- `:focus-visible`: anillo de 2px sólido `--color-primary` con offset 2px, solo visible en navegación por teclado (no al hacer clic con mouse).

---

### `.form-toggle`
Enlace para alternar entre login y registro.

```html
<p class="form-toggle">
  ¿No tienes cuenta? <a href="registro.html">Regístrate aquí</a>
</p>
```

**Dónde se usa:** `login.html` y `registro.html`.

---

### `.auth-form` / `.auth-page` / `.auth-card`
Contenedores para páginas de autenticación (layout centrado vertical y horizontalmente).

**Dónde se usa:** `login.html` y `registro.html`.

---

### `.nav-toggle` + `.nav-links`
Menú de navegación responsive con toggle para móvil. Los `.nav-links` se ocultan
en móvil y se muestran al hacer clic en `.nav-toggle`.

**Dónde se usa:** Header de `index.html` e `inicio.html`.

---

## Bloque 1 (revisión) — Componentes de hero agregados

### `.hero__bg`
Imagen de fondo a plena cobertura dentro del hero. Usa `object-fit: cover` para
cubrir toda la sección sin distorsión. Es decorativa (`alt=""`).

```html
<img class="hero__bg" src="../assets/images/hero-bg.jpg" alt="">
```

**Dónde se usa:** `index.html` — sección hero.

---

### `.hero__logo`
Logo de Parla! posicionado en la esquina superior izquierda del hero, sobre el fondo.
Es una imagen independiente (no un enlace), a diferencia del `.logo` del header.

```html
<img class="hero__logo" src="../assets/images/logo.png" alt="Parla!">
```

**Dónde se usa:** `index.html` — sección hero.

---

### `.hero__content`
Contenedor del título, subtítulo y CTA del hero. El borde izquierdo del contenedor se alinea con la mitad de la página (`margin-left: 50%; margin-right: auto`). `text-align: left`, `line-height: 1.4`. En móvil se reinician los márgenes.

```html
<div class="hero__content animate-in">
  <h1 class="hero__title">
    <span class="hero__title-line1">Aprende</span>
    <span class="hero__title-line2">italiano</span>
  </h1>
  <p class="hero__subtitle">De forma real, ligera<br>y entretenida.</p>
  <a href="registro.html" class="btn btn-primary btn-lg">Comienza el recorrido</a>
</div>
```

**Dónde se usa:** `index.html` — sección hero.

---

### `.hero__title` / `.hero__title-line1` / `.hero__title-line2`
Título del hero en dos líneas con colores distintos: línea 1 blanca (`letter-spacing: 0.05em`), línea 2 teal (`--color-primary`, `letter-spacing: 0.08em`). `font-size: 4.5rem`, `line-height: 1.4`. Usa `text-shadow` para legibilidad sobre la foto.

```html
<h1 class="hero__title">
  <span class="hero__title-line1">Aprende</span>
  <span class="hero__title-line2">italiano</span>
</h1>
```

**Dónde se usa:** `index.html` — sección hero.

---

### `.theme-toggle`
Botón flotante en esquina inferior derecha que alterna entre tema claro y oscuro.

```html
<button class="theme-toggle" id="themeToggle" aria-label="Cambiar a tema oscuro">
  <i class="fas fa-moon"></i>
</button>
```

**Comportamiento:**
- `position: fixed` — siempre visible sin importar el scroll.
- Cambia `data-theme="dark"` en `<html>` y guarda la preferencia en `localStorage` (clave `parla-theme`).
- Ícono: `fa-moon` (tema claro activo) / `fa-sun` (tema oscuro activo). Depende de Font Awesome.
- `aria-label` se actualiza dinámicamente según el estado.

**Variables que usa:** `--color-bg-card`, `--color-text`, `--shadow-card-hover`, `--color-primary` (foco).

**JS asociado:** `src/scripts/theme.js` — lógica de alternancia y persistencia.

**Dónde se usa:** Todas las vistas (`index.html`, `login.html`, `registro.html`, `inicio.html`).

---

### `.hero__subtitle`
Subtítulo del hero en Poppins negrita, blanco con `text-shadow`. Dividido en dos líneas vía `<br>`: "De forma real, ligera / y entretenida."

```html
<p class="hero__subtitle">De forma real, ligera<br>y entretenida.</p>
```

**Dónde se usa:** `index.html` — sección hero.

---

### `.feature-card` y `.feature-card__link`
Tarjeta de sección en el dashboard de inicio. Es un `<article>` con clase `.card` que contiene un enlace que envuelve todo el contenido.

```html
<article class="feature-card card">
  <a href="#" class="feature-card__link">
    <div class="icon podcast"><i class="fas fa-headphones"></i></div>
    <h3>Podcast</h3>
    <p>Episodios con transcripción para mejorar tu comprensión auditiva.</p>
  </a>
</article>
```

**Tokens de color para cada círculo `.icon`:**

| Tarjeta | Clase CSS | Token de color |
|---|---|---|
| Lecciones en video | `.video` | `--color-primary` |
| Podcast | `.podcast` | `--color-accent-olive` |
| Webtoon | `.webtoon` | `--color-accent` |
| Cultura | `.culture` | `--color-secondary` |
| Flashcards | `.flashcards` | `--color-accent-gold` |
| Quizzes | `.quizzes` | `--color-secondary-dark` |

**Ancho máximo:** `--feature-card-max-w: 280px` (definido en `variables.css`). El grid usa `auto-fit, minmax(240px, var(--feature-card-max-w))` para que las tarjetas sean angostas, centradas, y se adapten a 3 columnas en escritorio, 2 en tablet y 1 en móvil sin media queries.

**Retroalimentación hover:** Las tarjetas no tienen subrayado. Al pasar el mouse, se muestra un borde `box-shadow: 0 0 0 2px var(--color-primary)` y la tarjeta eleva su sombra (`.card:hover`).

**Dónde se usa:** `inicio.html` — dashboard grid.

---

### `.card--featured`
Modificador que agrega un resplandor ambiental giratorio de dos capas alrededor de la tarjeta (degradado cónico con interpolación de ángulo vía `@property`). Se usa exclusivamente en la tarjeta de **Lecciones en video** para marcarla como tarea principal/sugerida.

```html
<article class="feature-card card card--featured">
```

**Comportamiento:**
- `::before`: borde de color nítido con gradiente giratorio basado en 3 tonos derivados de `--color-primary` (`--glow-clr-1` oscuro, `--glow-clr-2` base, `--glow-clr-3` claro). El degradado cubre el 360° completo (sin tramos transparentes), por lo que se ve como un brillo ambiental que cambia de tono suavemente. Opacidad 0.6.
- `::after`: mismo gradiente pero con `opacity: 0.35` y `filter: blur(1.25rem)`, que da el resplandor ambiental difuso y discreto hacia afuera.
- La animación `girar-gradiente` (20s por vuelta, `linear`) mueve el ángulo del gradiente usando `@property`, logrando interpolación suave sin pausas ni efecto de respiración.
- `z-index: 1` en la tarjeta (menor que `z-index: 2` de las tarjetas normales) asegura que el glow nunca se superponga a tarjetas vecinas.
- `z-index: -1` en los pseudo-elementos los sitúa detrás del contenido de la tarjeta.
- Respeta `prefers-reduced-motion`: si el usuario tiene reducción de movimiento activada, la animación se detiene (glow fijo).

**Variables de color:** `--glow-clr-1`, `--glow-clr-2`, `--glow-clr-3` (definidas en `variables.css`, derivadas de `--color-primary`).

**Dónde se usa:** Solo en `inicio.html` — tarjeta de Lecciones en video.

---

### `.composite-section`
Sección debajo del hero en la Landing Page. Layout en grid de 2 columnas (30% / 70%) con dos filas, sin padding derecho para que la imagen toque el borde de la página.

```html
<section class="composite-section animate-in" aria-label="Sección compuesto">
  <img class="composite-section__bg" src="../assets/images/hero.png" alt="">
  <h2 class="composite-section__title">
    Olvídate
    <span>de memorizar reglas.</span>
  </h2>
  <p class="composite-section__paragraph">...</p>
</section>
```

**Comportamiento:**
- Grid: `grid-template-columns: 30% 70%; grid-template-rows: auto auto`.
- Sin `max-width` ni `padding-right` — la sección cubre todo el viewport horizontal y la imagen queda pegada al borde derecho.
- `.composite-section__bg`: columna 2, fila 1. Ancho 100% de su celda (70% de la sección), alto automático (aspect ratio natural). Sin hover ni interacción.
- `.composite-section__title`: ocupa toda la primera fila (`grid-column: 1 / -1`), alineado a la izquierda con `justify-self: start`. `font-size: 3rem`, `letter-spacing: 0.05em`. Dividido en dos líneas vía `<span>`. Sin `text-shadow` en tema claro; solo en modo oscuro (`[data-theme="dark"]`).
- `.composite-section__paragraph`: columna 2, fila 2 (debajo de la imagen, alineada con ella). `font-size: 1rem`.
- En móvil (≤768px): grid cambia a `40% 60%` / 2 filas. Imagen a la derecha (col2, fila1), título (1.25rem) puede superponerse, párrafo (0.6rem) en col2 fila2 bajo la imagen.

**Tokens usados:** `--color-heading-gold`, `--font-heading-composite`, `--ls-heading-composite`, `--color-text-navy`, `--fs-body-composite`, `--lh-body-composite`.

**Dónde se usa:** Solo en `index.html` — sección compuesto debajo del hero.

---

### `.animate-in`
Sistema de animación de entrada tipo "flotar": el elemento empieza desplazado 24px hacia abajo y opaco, y al entrar en pantalla se desliza a su posición final mientras se hace visible. Se complementa con un fade de carga de página completa (clase `page-loaded` en `<body>`).

**Cómo funciona:**
- El CSS define `opacity: 0` y `transform: translateY(24px)` por defecto.
- Al cargar la página, `animations.js` agrega `js-animations-ready` al `<body>` y escucha `DOMContentLoaded` para agregar `page-loaded`, que dispara el fade de entrada del body (`opacity: 0` → `opacity: 1` en 0.4s).
- `IntersectionObserver` detecta cuándo cada `.animate-in` entra en el viewport (threshold 0.15) y agrega `.is-visible`, activando la transición a opacidad 1 y posición original.
- Sin JS (fallback), `body:not(.js-animations-ready) .animate-in` lo deja todo visible desde el inicio. El body también tiene `body:not(.js-animations-ready) { opacity: 1; }` para que sea visible sin JS.
- Efecto cascada: cada elemento recibe un `transitionDelay` incremental (index % 6 × 80ms) para que aparezcan en secuencia.
- Respeta `prefers-reduced-motion`: sin transición ni desplazamiento, body visible de inmediato.

**Alcance:** Aplicado a secciones, tarjetas, imágenes, botones, encabezados y bloques de texto en todas las vistas — no solo a contenedores grandes. Cobertura completa del sitio.

**JS asociado:** `src/scripts/animations.js` — IntersectionObserver, asignación de delay, fade de body.

---

### `.btn-whatsapp`
Botón tipo pastilla redondeada (50px border-radius) con color verde WhatsApp (`#25D366`) e ícono de marca. Se usa exclusivamente en la página de Contactos.

```html
<a class="btn btn-whatsapp" href="https://wa.me/573182534487" target="_blank" rel="noopener">
  <i class="fa-brands fa-whatsapp"></i>
  Escríbenos en WhatsApp
</a>
```

**Comportamiento:**
- Color de fondo: `--color-whatsapp` (`#25D366`), texto blanco.
- Ícono de Font Awesome: `fa-brands fa-whatsapp`.
- Hover/active: reduce opacidad al 85% (sin cambio de color).
- Se abre en pestaña nueva con `target="_blank" rel="noopener"`.

**Token usado:** `--color-whatsapp` (definido en `variables.css`).

**Dónde se usa:** Solo en `contacto.html`.
