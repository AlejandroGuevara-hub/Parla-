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
- `.btn-lg` — Versión grande para hero/CTA.

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

### `.hero__title` / `.hero__title-line1` / `.hero__title-line2`
Título del hero en dos líneas con colores distintos: línea 1 blanca, línea 2 teal
(`--color-primary`). Usa `text-shadow` para legibilidad sobre la foto.

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
Subtítulo del hero en Poppins negrita, blanco con `text-shadow`.

```html
<p class="hero__subtitle">De forma real, ligera y entretenida.</p>
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
Modificador que agrega un resplandor animado giratorio alrededor de una tarjeta. Se usa exclusivamente en la tarjeta de **Lecciones en video** para marcarla como tarea principal/sugerida.

```html
<article class="feature-card card card--featured">
```

**Comportamiento:**
- Un pseudo-elemento `::before` con `conic-gradient` de `--color-primary` se posiciona detrás de la tarjeta y rota infinitamente con la animación `rotar-resplandor` (4s por vuelta).
- `z-index: 0` en la tarjeta crea un contexto de apilamiento que, junto con `z-index: -1` en el pseudo-elemento, sitúa el resplandor detrás del contenido de la tarjeta.
- `filter: blur(12px)` difumina el degradado para que se vea como un brillo suave, no un borde sólido.
- Respeta `prefers-reduced-motion`: si el usuario tiene reducción de movimiento activada, la animación se detiene (resplandor fijo).

**Variable de color:** `--color-primary` (teal del proyecto, sin introducir colores nuevos).

**Dónde se usa:** Solo en `inicio.html` — tarjeta de Lecciones en video.
