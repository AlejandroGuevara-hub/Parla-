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
- `.btn-lg` — Versión grande para hero/CTA: `padding: 1rem 2.5rem; font-size: 1.125rem`.

**Dónde se usa:** `index.html` (hero actions), `login.html`, `registro.html`, `inicio.html` y los 6 placeholders (botón "Volver al inicio"), `contacto.html` (`.btn-whatsapp`).

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
Enlace con logo + texto. Logo 300% más grande que versión original (108px alto, texto 4.5rem). Se eliminó del header de todas las vistas; solo se conserva en formularios de autenticación (`login.html`, `registro.html`). Responsive: `32px` de alto con texto `1.1rem` (≤1024px) y `26px` / `0.95rem` (≤480px) — solo en login/registro, el resto de páginas no se afecta.

```html
<a href="index.html" class="logo">
  <img src="../assets/images/logo.png" alt="Parla! logo">
  <span>Parla!</span>
</a>
```

**Dónde se usa:** Solo en `src/views/login.html` y `src/views/registro.html` (dentro de `.auth-card`).

---

### `.card`
Tarjeta con borde suave, fondo blanco y sombra.

```html
<div class="card">...</div>
```

**Dónde se usa:** `.feature-card` en `inicio.html` (dashboard del estudiante), `.auth-card` en login/registro.

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

**Botón primario del formulario:** `.auth-card form .btn-primary` lleva `margin-top: var(--space-lg)` para separarlo del último campo del formulario.

---

### `.nav-toggle` + `.nav-links`
Menú de navegación responsive con toggle para móvil. Los `.nav-links` se ocultan
en móvil y se muestran al hacer clic en `.nav-toggle`.

**Dónde se usa:** Header de `index.html` (Landing). En `inicio.html` y el resto de vistas autenticadas el header fue reemplazado por el `.sidebar`.

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
Es una imagen independiente (no un enlace). Tamaño 300% mayor: `height: 108px`.

```html
<img class="hero__logo" src="../assets/images/logo.png" alt="Parla!">
```

**Dónde se usa:** `index.html` — sección hero.

---

### `.hero__content`
Contenedor del título, subtítulo y CTA del hero. Desplazado a la derecha (`margin-left: 58%; margin-right: auto`), `text-align: left`, `line-height: 1.4`. En tablet y móvil (≤1024px, ≤768px) se alinea al borde derecho con `margin-left: auto` + `width: fit-content` y `max-width: 70%` (85% en ≤480px), de modo que el bloque queda más angosto que el hero completo y pegado a la derecha en vez de ocupar todo el ancho.

**Tamaños responsive del hero:**
- `.hero__title`: `4.5rem` desktop → `2.25rem` (≤1024px) → `2rem` (≤768px) → `1.5rem` (≤480px).
- `.hero__subtitle`: `1.5rem` desktop → `0.85rem` (≤1024px) → `0.8rem` (≤480px).
- CTA `.hero .btn-primary`: `0.8rem`/`--space-xs --space-sm` (≤1024px) → `0.75rem`/`--space-xs --space-xs` (≤480px).

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
Título del hero en dos líneas con colores distintos: línea 1 blanca (`letter-spacing: 0.05em`), línea 2 teal (`--color-primary`, `letter-spacing: 0.08em`). `font-size: 4.5rem` (desktop), `2.25rem` (≤1024px), `2rem` (≤768px) y `1.5rem` (≤480px); `line-height: 1.4`. Usa `text-shadow` para legibilidad sobre la foto.

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

**Dónde se usa:** Todas las 11 vistas (Landing, login, registro, inicio, contacto y los 6 placeholders).

---

### `.hero__subtitle`
Subtítulo del hero en Poppins negrita, blanco con `text-shadow`. Dividido en dos líneas vía `<br>`: "De forma real, ligera / y entretenida." `font-size: 1.5rem` (desktop), `0.85rem` (≤1024px) y `0.8rem` (≤480px).

```html
<p class="hero__subtitle">De forma real, ligera<br>y entretenida.</p>
```

**Dónde se usa:** `index.html` — sección hero.

---

### `.feature-card` y `.feature-card__link`
Tarjeta de sección en el dashboard de inicio. Es un `<article>` con clase `.card` que contiene un enlace que envuelve todo el contenido: imagen arriba, después el título, después la descripción (sin ícono circular — reemplazado por las fotos reales del cliente).

```html
<article class="feature-card card">
  <a href="podcast.html" class="feature-card__link">
    <img class="feature-card__image" src="../assets/images/podcast.png" alt="">
    <h3>Podcast</h3>
    <p>Episodios con transcripción para mejorar tu comprensión auditiva.</p>
  </a>
</article>
```

**Imágenes reales** (copiadas de `reference/Diego-pagina web/Parte/2.inicio del estudiante/Fotos/`):

| Tarjeta | Archivo en `src/assets/images/` | Archivo original |
|---|---|---|
| Lecciones en video | `video.png` | `4.png` |
| Podcast | `podcast.png` | `7.png` |
| Cultura | `cultura.png` | `8.png` |
| Webtoon | `webtoon.png` | `6.png` |
| Flashcards | `flashcards.png` | `3.png` |
| Quizzes | `quizzes.png` | `5.png` |

**Medidas:** imagen `width: calc(100% - 8px)` → exactamente 4px de espacio a cada lado del borde de la tarjeta; alto `--card-image-h: 240px` con `object-fit: cover`; `border-radius: inherit` (mismo radio que la tarjeta). Espaciado: `--space-md` entre borde superior de la tarjeta y la imagen, `--space-sm` entre imagen y título (margin de la imagen), `--space-xs` entre título y descripción (`h3` margin-bottom), `--space-sm` hasta el borde inferior. Todo centrado.

**Ancho máximo:** `--card-frame-w: 316.7px` (unifica el ancho de tarjeta del mockup; `--feature-card-max-w` fue eliminado). El grid usa `auto-fit, minmax(240px, var(--card-frame-w))` para tarjetas centradas, 3 columnas en escritorio, 2 en tablet y 1 en móvil sin media queries.

**Móvil (≤480px):** el grid pasa a `repeat(2, 1fr)` con `gap: var(--space-sm)` — 2 tarjetas por fila (3 filas de 2) en vez de 1. Las tarjetas se compactan: padding `var(--space-sm) 4px var(--space-xs) 4px`, imagen a `120px` de alto, título a `0.9rem` y descripción a `0.7rem`.

**Retroalimentación hover:** Las tarjetas no tienen subrayado. Al pasar el mouse, la tarjeta se eleva `translateY(-4px)`, eleva su sombra y cambia su borde (`.card:hover`).

**Hover "levitar" reforzado (solo widgets de Inicio):** `.feature-card` define su propia transición (`0.35s cubic-bezier(0.22, 1, 0.36, 1)`, curva de `GUIA-ANIMACIONES`) que reemplaza la de `.card`, y dentro de `@media (hover: hover)` (solo mouse real) el hover eleva la tarjeta `translateY(-10px) scale(1.02)` con sombra profunda `0 20px 30px rgba(0,0,0,0.18)`, mientras la imagen hace `scale(1.04)`. El contenedor `.feature-card__link` tiene `overflow: hidden` para que el zoom de la imagen no se salga del marco redondeado. En celular (sin `hover: hover`) no aplica, evitando que el toque deje la tarjeta "pegada" elevada. Respeta `prefers-reduced-motion` (transición anulada).

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

**Nota de auditoría:** existe el spec `docs/specs/prompt-eliminar-card-featured.md` que ordena eliminar este efecto por completo (rompía el renderizado de la tarjeta), pero **no se aplicó**: el código sigue teniendo `.card--featured`, el CSS y los tokens `--glow-clr-*`. El glow es el estado real actual del proyecto. Ver `docs/PENDIENTES.md`.

---

## Bloque 2 — Componentes de secciones de contenido

### `.continue-banner`
Banner destacado tipo "continúa donde te quedaste", usado en las 5 secciones de contenido (Lecciones, Podcast, Cultura, Flashcards, Quizzes). Mismo estilo visual, texto e ícono adaptados por sección.

```html
<div class="continue-banner animate-in">
  <div class="continue-banner__icon"><i class="fas fa-video"></i></div>
  <div class="continue-banner__content">
    <span class="continue-banner__label">Continúa tu aprendizaje</span>
    <h2 class="continue-banner__title">Módulo 2 · Lección 3</h2>
    <p class="continue-banner__detail">La hora y las expresiones de tiempo</p>
    <div class="continue-banner__progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
      <div class="continue-banner__progress-bar" style="width: 65%"></div>
    </div>
    <span class="continue-banner__progress-text">65% completado</span>
  </div>
  <button class="btn btn-primary continue-banner__btn">Continuar</button>
</div>
```

**Partes:**
- `.continue-banner__icon` — círculo 48px con ícono de la sección (color primario).
- `.continue-banner__content` — etiqueta (`.continue-banner__label`), título (`.continue-banner__title`), detalle opcional (`.continue-banner__detail`), barra de progreso (`.continue-banner__progress` + `.continue-banner__progress-bar`) y texto de progreso.
- `.continue-banner__btn` — botón primario (CTA).
- Responsive ≤480px: apila vertical, centra, botón 100% ancho.

**Dónde se usa:** `video.html`, `podcast.html`, `cultura.html`, `flashcards.html`, `quizzes.html`.

---

### `.module-card` / `.lessons-list` (Lecciones — acordeón)
Tarjeta de módulo con header clicable que expande/colapsa la lista de lecciones.

```html
<article class="module-card">
  <header class="module-card__header">
    <div class="module-card__icon"><i class="fas fa-check-circle estado-completado"></i></div>
    <div class="module-card__titles">
      <h2 class="module-card__title">Módulo 1</h2>
      <p class="module-card__subtitle">¡Empecemos!</p>
    </div>
    <span class="module-card__badge">Completado</span>
    <button class="module-card__toggle" aria-expanded="false"><i class="fas fa-chevron-down"></i></button>
  </header>
  <ul class="lessons-list" hidden>
    <li class="lesson-item"><span class="estado-icon estado-completado"></span><span>Lección 1 · Saludos</span></li>
  </ul>
</article>
```

**Comportamiento:** click en `.module-card__header` alterna `hidden` en `.lessons-list` y rota el chevron. JS simple en cada página (no hay componente reutilizable global).

**Estados de lección (`.lesson-item`):** icono + título + % opcional (en-progreso). Iconos: completado (check verde), en-progreso (círculo naranja), pendiente (círculo gris).

**Dónde se usa:** `video.html`.

---

### `.episode-item` (Podcast — lista)
Fila de episodio: botón play + info (icono estado + título + transcripción) + duración + estado.

```html
<li class="episode-item">
  <button class="episode-item__play"><i class="fas fa-play"></i></button>
  <div class="episode-item__info">
    <span class="estado-icon estado-escuchado"></span>
    <span class="episode-item__title">Episodio 1 · Saludos</span>
    <span class="episode-item__transcripcion"><i class="fas fa-file-alt"></i> Transcripción</span>
  </div>
  <span class="episode-item__duracion">8:15</span>
  <span class="episode-item__estado">Escuchado</span>
</li>
```

**Estados:** escuchado (check verde), en-progreso (círculo naranja), pendiente (círculo gris). Botón play visual (no reproduce audio real en Fase 1).

**Dónde se usa:** `podcast.html`.

---

### `.topic-item` (Cultura — lista)
Fila simple: icono estado + título + estado.

```html
<li class="topic-item">
  <span class="estado-icon estado-completado"></span>
  <span class="topic-item__title">Tema 1 · Arte y pintura</span>
  <span class="topic-item__estado">Completado</span>
</li>
```

**Dónde se usa:** `cultura.html`.

---

### `.deck-card` (Flashcards — grid de mazos)
Grid responsivo de tarjetas de mazo: header (icono + título), barra de progreso (dominadas/total), estado, botón "Repasar".

```html
<article class="deck-card">
  <div class="deck-card__header">
    <span class="estado-icon estado-en-progreso"></span>
    <h2 class="deck-card__title">Mazo 2 · Verbos comunes</h2>
  </div>
  <div class="deck-card__progress">
    <div class="deck-card__progress-bar-wrap"><div class="deck-card__progress-bar" style="width: 40%"></div></div>
    <span class="deck-card__progress-text">12 / 30 tarjetas</span>
  </div>
  <span class="deck-card__estado">En progreso</span>
  <button class="btn btn-primary deck-card__btn">Repasar</button>
</article>
```

**Grid:** `repeat(auto-fit, minmax(260px, 1fr))` → 3 columnas desktop, 2 tablet, 1 móvil. Hover: elevación + sombra + borde primario.

**Dónde se usa:** `flashcards.html`.

---

### `.quiz-item` (Quizzes — lista)
Fila: icono estado + info (título + preguntas) + estado + puntaje (si completado) + botón.

```html
<li class="quiz-item">
  <span class="estado-icon estado-completado"></span>
  <div class="quiz-item__info">
    <span class="quiz-item__title">Quiz · Módulo 1</span>
    <span class="quiz-item__meta">10 preguntas</span>
  </div>
  <span class="quiz-item__estado">Completado</span>
  <span class="quiz-item__puntaje">9/10</span>
  <button class="btn btn-primary quiz-item__btn">Reintentar</button>
</li>
```

**Dónde se usa:** `quizzes.html`.

---

### Iconos de estado (`.estado-icon`)
Componente compartido para todos los estados visuales:

```html
<i class="fas fa-check-circle estado-icon estado-completado" aria-label="Completado"></i>
<i class="fas fa-circle-notch estado-icon estado-progreso" aria-label="En progreso"></i>
<i class="far fa-circle estado-icon estado-pendiente" aria-label="Pendiente"></i>
```

**Variantes:**
- `.estado-completado` — verde (`--color-state-done`).
- `.estado-progreso` — teal primario (`--color-primary`).
- `.estado-pendiente` — gris muted (`--color-text-muted`).
- Podcast usa `.estado-escuchado` (alias de completado) y `.estado-progreso` / `.estado-pendiente`.

**Dónde se usa:** Todas las secciones de contenido.

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
- `.composite-section__title`: ocupa toda la primera fila (`grid-column: 1 / -1`), alineado a la izquierda con `justify-self: start`. `font-size: var(--fs-heading-composite)` (`2.25rem`), `letter-spacing: 0.05em`. Dividido en dos líneas vía `<span>` con `display: block`. Sin `text-shadow` en tema claro; solo en modo oscuro (`[data-theme="dark"]`). Responsive (selector `.composite-section h2`, independiente del párrafo): `1.5rem` (≤1024px), `1.25rem` (≤480px).
- `.composite-section__paragraph`: columna 2, fila 2 (debajo de la imagen, alineada con ella). `font-size: 0.8125rem`. Responsive (selector `.composite-section p`, independiente del título): `0.6875rem` (≤1024px), `0.625rem` (≤480px).
- La sección ocupa el ancho completo del viewport (sin `max-width`); el grid desktop es `30% 70%` y el padding solo izquierdo/superior/inferior (`var(--space-lg) 0 var(--space-lg) var(--space-md)`).
- En móvil (≤768px): grid cambia a `40% 60%` / 2 filas. Imagen a la derecha (col2, fila1), título superpuesto con `z-index: 1`, párrafo en col2 fila2 bajo la imagen. El bloque ≤768 ya **no** define tamaños de fuente (los eliminó el fix `1.19.6`): el título y el párrafo heredan los del bloque ≤1024px (`1.5rem` / `0.6875rem`) y luego el de ≤480px (`1.25rem` / `0.625rem`).

**Tokens usados:** `--color-heading-gold`, `--font-heading-composite`, `--ls-heading-composite`, `--color-text-navy`, `--fs-body-composite`, `--lh-body-composite`.

**Dónde se usa:** Solo en `index.html` — sección compuesto debajo del hero.

---

### `.animate-in`
Sistema de animación de entrada tipo "flotar + blur": el elemento empieza desplazado 24px hacia abajo, opaco y con `blur(6px)`, y al entrar en pantalla se desliza a su posición final mientras se hace visible y nítido. Se complementa con un fade de carga de página completa (clase `page-loaded` en `<body>`).

**Cómo funciona:**
- El CSS define `opacity: 0`, `transform: translateY(24px)` y `filter: blur(6px)` por defecto.
- Al cargar la página, `animations.js` agrega `js-animations-ready` al `<body>` y escucha `DOMContentLoaded` para agregar `page-loaded`, que dispara el fade de entrada del body (`opacity: 0` → `opacity: 1` en 0.4s).
- `IntersectionObserver` detecta cuándo cada `.animate-in` entra en el viewport (threshold 0.15) y agrega `.is-visible`, activando la transición a opacidad 1, posición original y blur 0.
- Sin JS (fallback), `body:not(.js-animations-ready) .animate-in` lo deja todo visible desde el inicio (incluido `filter: none`). El body también tiene `body:not(.js-animations-ready) { opacity: 1; }`.
- Efecto cascada: cada elemento recibe un `transitionDelay` incremental (index % 6 × 80ms) para que aparezcan en secuencia.
- Respeta `prefers-reduced-motion`: sin transición, desplazamiento ni blur, body visible de inmediato.

**Alcance:** Aplicado a secciones, tarjetas, botones, encabezados, bloques de texto y footers en todas las vistas, incluyendo hero con entrada progresiva (título → subtítulo → CTA), navs flotantes superiores y contenedores de contacto. Cobertura completa del sitio.

**JS asociado:** `src/scripts/animations.js` — IntersectionObserver, asignación de delay, fade de body, parallax hero, blur+fade de imágenes.

---

### `.img-load` / `.img-loaded`
Imágenes con blur + fade al terminar de cargar: `animations.js` agrega `.img-load` a todas las `<img>`; al dispararse `load` (o `error`) agrega `.img-loaded`, transicionando de `blur(6px)` + opacidad 0 a nítidas en 0.6s. Sin JS, las imágenes se ven normales (la clase la agrega el propio script).

---

### `.sidebar`
Panel de navegación vertical fijo a la izquierda. Se usa en: `inicio.html`, `contacto.html` y los 6 placeholders. NO aplica en `index.html` (Landing), `login.html` ni `registro.html`. `position: fixed`, ancho `260px`, `height: 100vh`, `overflow-y: auto` (scroll propio si la lista no entra), fondo `--color-bg-card`, `box-shadow: var(--shadow-card)`, `z-index: 200`.

**Contenido (de arriba a abajo):** logo de Parla! (`.sidebar__logo`, 48px, enlaza a `index.html`) y lista `.sidebar-links` con 8 enlaces (ícono Font Awesome + texto): Inicio (`fa-house`), Lecciones en video (`fa-video`), Podcast (`fa-headphones`), Webtoon (`fa-book-open`), Cultura (`fa-landmark`), Flashcards (`fa-layer-group`), Quizzes (`fa-circle-question`), Contactos (`fa-comment`).

### `.sidebar-link` y `.sidebar-link.is-active`
Enlace individual del sidebar: ícono + texto con `gap: var(--space-sm)`, `border-radius: var(--radius-button)`, transición suave de color/fondo. Hover y `:focus-visible`: `--color-primary` sobre fondo `color-mix` al 8%. La página actual usa `.is-active`: fondo `color-mix(in srgb, var(--color-primary) 12%, transparent)`, texto `--color-primary` y `font-weight: var(--fw-bold)`.

**Dónde se usa:** `inicio.html`, `contacto.html` y los 6 placeholders. NO aplica en `index.html` (Landing), `login.html` ni `registro.html` (páginas pre-login sin navegación).

**Exclusión completa:** las 3 formas del sidebar (panel fijo, botón de menú `.sidebar-toggle` y drawer `.sidebar-overlay`) no existen en ninguna de esas vistas en ningún breakpoint (móvil, tablet o escritorio); tampoco cargan `sidebar.js`.

---

### `<parla-sidebar>` (Web Component)

Web Component nativo (light DOM, sin Shadow DOM) definido en `src/scripts/components/sidebar.js`. Reemplaza el HTML duplicado del sidebar en cada página.

**Uso:**
```html
<script type="module" src="../scripts/components/sidebar.js"></script>
<parla-sidebar current="inicio"></parla-sidebar>
```

**Atributos:**
- `current` (requerido): página activa (`"inicio"`, `"video"`, `"podcast"`, `"webtoon"`, `"cultura"`, `"flashcards"`, `"quizzes"`, `"contacto"`, `"perfil"`). Marca el enlace correspondiente con `.is-active`.

**Renderizado interno (light DOM, usa clases CSS existentes):**
- `<button class="sidebar-menu-toggle">` (hamburguesa, visible ≤768px)
- `<div class="sidebar-overlay">`
- `<aside class="sidebar">` con logo (`<a class="sidebar__logo">` → `index.html`) y `<nav>` con 8 enlaces `.sidebar-link` (iconos `fa-solid`). El enlace activo lleva `.is-active`.

**Comportamiento drawer (≤768px):** click en `.sidebar-menu-toggle` alterna `.is-open` en `.sidebar` y `.is-visible` en `.sidebar-overlay`. Click en overlay cierra. Escape cierra.

**Dónde se usa:** `inicio.html`, `video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`, `contacto.html`, `perfil.html`. NO en `index.html`, `login.html`, `registro.html`.

---

### `<parla-user-nav>` (Web Component)

Web Component nativo (light DOM, sin Shadow DOM) definido en `src/scripts/components/user-nav.js`. Reemplaza el cluster flotante duplicado.

**Uso:**
```html
<script type="module" src="../scripts/components/user-nav.js"></script>
<parla-user-nav></parla-user-nav>
```

**Renderizado interno (light DOM):**
- `<nav class="floating-user-nav">` con dos enlaces: Perfil (`perfil.html`, icono `fa-user`) y Salir (`index.html`, icono `fa-right-from-bracket`).

**Móvil (≤480px):** las etiquetas (`span`) se ocultan y los botones quedan como íconos de 36px; la píldora se acerca al borde (`--space-xs`). Así no se superpone con la hamburguesa del sidebar.

**Dónde se usa:** mismas 9 vistas que `<parla-sidebar>`.

---

### `.site-header`
Contenedor invisible de navegación flotante (solo Landing). Ya no es una barra: sin fondo, sin borde, sin sticky. `position: absolute` arriba con `pointer-events: none` (no bloquea clics del contenido) y `z-index: 100`. Los botones (`nav` con `margin-left: auto` + `pointer-events: auto`) quedan flotando en la esquina superior derecha, exactamente donde estaría la barra. Se desplazan con la página al hacer scroll.

**Variantes:**
- Landing (`index.html`): `.nav-links` con "Iniciar sesión" + botón "Registrarme"; en móvil se pliega en hamburguesa (`.nav-toggle`) con dropdown que se despliega bajo el header.

**Nota:** la clase `.site-header--scrolled` fue eliminada (no aplica sin barra). Las vistas que no son la Landing usan `.sidebar` (ver arriba).

---

### `.btn`
Botón base. No usar directamente; usar las variantes `.btn-primary` o `.btn-secondary`.

**Comportamiento motion:**
- `:hover`: `translateY(-2px) scale(1.03)` + `--shadow-card-hover` + cambio de color de fondo/borde (paleta existente). 300ms.
- `:active`: `scale(0.97)` (presión física).
- `:focus-visible`: anillo de 2px `--color-primary` con offset 2px (solo teclado).
- CTA del hero (`.hero .btn-primary`): brillo permanente sutil que recorre el botón cada 4.5s (`::after` con gradiente blanco translúcido, desactivado con `prefers-reduced-motion`).

**Variantes:**
- `.btn-primary` — Fondo teal (`--color-primary`), texto blanco.
- `.btn-secondary` — Borde teal, texto teal, fondo transparente.
- `.btn-lg` — Versión grande para hero/CTA: `padding: 1rem 2.5rem; font-size: 1.125rem`.

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

---

### `.profile-avatar` / `.profile-header`
Encabezado de la página de Perfil con avatar circular de iniciales (si no hay foto real) y metadatos.

```html
<div class="profile-header">
  <div class="profile-avatar" aria-hidden="true">SR</div>
  <div class="profile-header__info">
    <h2 class="profile-header__name">Sofía Ramírez</h2>
    <p class="profile-header__email">sofia.ramirez@ejemplo.com</p>
    <div class="profile-header__meta">
      <span class="profile-header__member">Miembro desde Marzo 2026</span>
      <span class="profile-header__badge">A2 · Elemental</span>
    </div>
  </div>
</div>
```

**Partes:**
- `.profile-avatar` — círculo 80px (72px en móvil) con gradiente primario/secondary, iniciales en blanco, `font-family: var(--font-display)`.
- `.profile-header__name` — nombre completo, `var(--font-display)` 1.75rem.
- `.profile-header__email` — correo, Poppins.
- `.profile-header__meta` — "Miembro desde" + badge de nivel (`.profile-header__badge`, mismo estilo que badges de módulos: fondo 10% primario, texto primario, pill radius).

**Dónde se usa:** `perfil.html`.

---

### `.stat-card`
Tarjeta de estadística simple (icono + valor grande + etiqueta), usada en grid de 3 en Perfil.

```html
<article class="stat-card">
  <span class="stat-card__icon"><i class="fas fa-book-open"></i></span>
  <div class="stat-card__value">18</div>
  <div class="stat-card__label">Lecciones completadas</div>
</article>
```

**Estilo:** tarjeta con hover (elevación + sombra + borde primario). Grid responsivo: `repeat(auto-fit, minmax(160px, 1fr))` → 3 en desktop, 1 en móvil.

**Iconos sugeridos:** `fa-book-open` (lecciones), `fa-fire` (racha), `fa-clock` (horas).

**Dónde se usa:** `perfil.html` (sección de estadísticas).

---

### `.profile-info`
Lista de campos de solo lectura (label + valor) para la sección "Información personal".

```html
<div class="profile-info">
  <div class="profile-info__item">
    <span class="profile-info__label">Nombre</span>
    <span class="profile-info__value">Sofía Ramírez</span>
  </div>
</div>
```

**Estilo:** items con fondo tarjeta, label uppercase caption muted, valor body text. Solo lectura, sin inputs.

**Dónde se usa:** `perfil.html`.

---

### `.preference-toggle`
Toggle visual (role="switch") para preferencias, sin persistencia real.

```html
<button class="preference-toggle" role="switch" aria-checked="true" aria-label="Activar notificaciones">
  <span class="preference-toggle__thumb"></span>
</button>
```

**Estilo:** píldora 48x28px, thumb 24px con sombra. `aria-checked="true"` → fondo primario, thumb desplazado 20px. Click alterna `aria-checked` (solo visual, no persiste). Respeta `role="switch"` para accesibilidad.

**Dónde se usa:** `perfil.html` (sección Preferencias).

---

### `.profile-edit-btn`
Botón primario ancho completo en la sección "Información personal". Al click muestra alerta "Esta función estará disponible próximamente" (sin formulario real).

**Dónde se usa:** `perfil.html`.
