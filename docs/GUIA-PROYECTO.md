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
│   │   ├── video.html          # Lecciones en video (banner + acordeón de módulos/lecciones)
│   │   ├── leccion-detalle.html# Plantilla dinámica: renderiza 1 lección según ?id= (no hay un .html por lección)
│   │   ├── podcast.html        # Podcast (banner + lista de episodios con transcripción)
│   │   ├── episodio-detalle.html# Plantilla dinámica: renderiza 1 episodio según ?id= (reproductor y transcripción simulados)
│   │   ├── webtoon.html        # Placeholder: Webtoon
│   │   ├── cultura.html        # Cultura (banner + lista de temas con estados)
│   │   ├── flashcards.html     # Flashcards (banner + grid de mazos con progreso)
│   │   ├── quizzes.html        # Quizzes (banner + lista de quizzes con puntaje)
│   │   ├── quiz-detalle.html   # Plantilla dinámica: quiz jugable según ?id= (usa quiz-engine.js)
│   │   ├── perfil.html         # Perfil de ejemplo (avatar, stats, info, preferencias)
│   │   └── contacto.html       # Contacto: WhatsApp, fondo e ícono del cliente
│   ├── styles/                 ← CSS
│   │   ├── variables.css       # Design tokens
│   │   ├── components.css      # Componentes reutilizables
│   │   └── styles.css          # Estilos de página y layout
│   ├── scripts/                ← JavaScript
│   │   ├── nav.js              # Header móvil (landing) + captura de form[data-navegar]
│   │   ├── sidebar.js          # Drawer del sidebar (vistas autenticadas)
│   │   ├── theme.js            # Tema claro/oscuro con persistencia
│   │   ├── animations.js       # animate-in (IntersectionObserver), parallax hero, blur de imágenes
│   │   └── quiz-engine.js      # Motor de quiz: preguntas, respuestas, puntaje (módulo ES)
│   ├── components/             ← Fragmentos HTML reutilizables (futuro)
│   ├── data/                   ← Datos de ejemplo estáticos (JSON) para secciones de contenido
│   │   ├── lecciones.json      # Módulos y lecciones con estados (completado/en-progreso/pendiente)
│   │   ├── podcast.json        # Episodios con duración, estado y transcripción
│   │   ├── cultura.json        # Temas culturales con estados
│   │   ├── flashcards.json     # Mazos con total/dominadas y barra de progreso
│   │   ├── quizzes.json        # Quizzes con preguntas, estado y puntaje
│   │   ├── perfil.json         # Datos de perfil de ejemplo (nombre, correo, nivel, estadísticas)
│   └── assets/                 ← Imágenes e iconos
│       └── images/
│           ├── logo.png
│           ├── hero.png
│           ├── hero-bg.jpg
│           ├── podcast.png     # Foto tarjeta Podcast (origen: 7.png)
│           ├── webtoon.png     # Foto tarjeta Webtoon (origen: 6.png)
│           ├── cultura.png     # Foto tarjeta Cultura (origen: 8.png)
│           ├── video.png       # Foto tarjeta Lecciones en video (origen: 4.png)
│           ├── flashcards.png  # Foto tarjeta Flashcards (origen: 3.png)
│           ├── quizzes.png     # Foto tarjeta Quizzes (origen: 5.png)
│           ├── contact-bg.png     # Fondo página de Contactos
│           └── contact-icon.png   # Ícono decorativo teléfono+corazón
├── reference/                  ← Material CRUDO del cliente (NO se sube al repo)
│   ├── Diego-pagina web/       # Fotos, mockups, fuentes y requerimientos por parte
│   ├── Requerimientos de la Fase 1.pdf
│   └── Documento senza titolo(1).pdf
├── docs/                       ← Documentación
│   ├── CONTEXTO.md             # Resumen rápido del proyecto
│   ├── ERRORES.md              # Errores cometidos y solución
│   ├── GUIA-PROYECTO.md        # Esta guía
│   ├── GUIA-ANIMACIONES.md     # Sistema de motion design obligatorio
│   ├── PENDIENTES.md           # Tareas pendientes
│   ├── decisiones-tecnicas.md  # Decisiones de diseño/arquitectura
│   ├── guia-componentes.md     # Catálogo de componentes CSS
│   └── specs/                  # Especificaciones de cada bloque/fix (historial de tareas)
│       ├── instrucciones-opencode-bloque1.md
│       └── prompt-*.md         # Un spec por bloque o fix (15+ archivos)
├── prompts/                    ← Instrucciones de proceso (protocolos, no specs)
│   ├── prompt-releer-documentacion.md
│   ├── prompt-documentacion-completa.md
│   ├── prompt-commits-github.md
│   └── prompt-memoria-contexto.md
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
| `src/scripts/nav.js` | Menú mobile toggle del header de la Landing + captura de form[data-navegar] (login/registro). Se carga solo en `index.html`, `login.html` y `registro.html`. |
| `src/scripts/components/sidebar.js` | Web Component `<parla-sidebar>`: renderiza el sidebar (logo + 8 enlaces), recibe `current` para marcar activo, incluye toggle/overlay drawer móvil. Se carga en vistas autenticadas (9 vistas). |
| `src/scripts/components/user-nav.js` | Web Component `<parla-user-nav>`: renderiza el cluster flotante "Perfil / Salir". Se carga en vistas autenticadas (9 vistas). |
| `src/scripts/theme.js` | Selector de tema claro/oscuro con persistencia en localStorage (clave `parla-theme`). Se carga en las 11 vistas. |
| `src/scripts/animations.js` | Marca `js-animations-ready` y `page-loaded` en `<body>`, agrega `is-visible` a `.animate-in` vía IntersectionObserver (con delay escalonado), parallax sutil del hero y blur+fade (`img-load`/`img-loaded`) a todas las `<img>`. MutationObserver detecta `.animate-in` e `<img>` añadidos dinámicamente (fetch). Respeta `prefers-reduced-motion`. Se carga en las 11 vistas. |

## Cómo correr el proyecto

Abrir en navegador directo:
```
src/views/index.html
```

O con servidor local (requerido para páginas que usan `fetch()` a JSON en `src/data/`):
```bash
python -m http.server 8000
# luego http://localhost:8000/src/views/index.html
```

> **Nota:** `reference/` es material del cliente que **no se sube al repositorio** (está en `.gitignore`). Un clon nuevo del repo **no la tendrá**; todo lo necesario para correr el sitio (imágenes, JSON, CSS, JS) vive en `src/`. La carpeta `reference/` queda solo como consulta local.

## Patrón obligatorio: navegación con Web Components

Toda vista autenticada debe usar los Web Components para el sidebar y el cluster de usuario, **no HTML duplicado**.

### `<parla-sidebar>`
Web Component nativo (light DOM, sin Shadow DOM) definido en `src/scripts/components/sidebar.js`.

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

**Comportamiento drawer (≤768px):** click en `.sidebar-menu-toggle` alterna `.is-open` en `.sidebar` y `.is-visible` en `.sidebar-overlay`. Click en overlay cierra. Escape cierra (si se agrega listener global en el componente).

### `<parla-user-nav>`
Web Component nativo (light DOM) definido en `src/scripts/components/user-nav.js`.

**Uso:**
```html
<script type="module" src="../scripts/components/user-nav.js"></script>
<parla-user-nav></parla-user-nav>
```

**Renderizado interno (light DOM):**
- `<nav class="floating-user-nav">` con dos enlaces: Perfil (`perfil.html`, icono `fa-user`) y Salir (`index.html`, icono `fa-right-from-bracket`).

### Cómo se usa en cada página autenticada
En `inicio.html`, `video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`, `contacto.html`, `perfil.html`:

```html
<script type="module" src="../scripts/components/sidebar.js"></script>
<script type="module" src="../scripts/components/user-nav.js"></script>
<parla-sidebar current="inicio"></parla-sidebar>
<parla-user-nav></parla-user-nav>
```

Cambia el valor de `current` según la página (`"video"`, `"podcast"`, etc.).

Las excepciones sin sidebar son: `index.html` (Landing), `login.html` y `registro.html` (páginas pre-login).

## Carga de contenido dinámico (JSON + fetch)

Las 5 secciones de contenido (`video.html`, `podcast.html`, `cultura.html`, `flashcards.html`, `quizzes.html`) cargan sus datos desde archivos JSON en `src/data/` mediante `fetch()`. Esto permite:

- Separar contenido de presentación (fácil actualizar textos sin tocar HTML).
- Escalar a futuro backend sin reescribir la UI.
- Usar `fetch()` requiere servir el proyecto por HTTP (no `file://`); ver "Cómo correr el proyecto".

## Patrón de plantilla dinámica (leccion-detalle.html)

`leccion-detalle.html` es **una sola página** que renderiza el contenido de cualquier lección según un
parámetro de URL: `leccion-detalle.html?id=l3`. No existe un `.html` por lección.

**Cómo funciona:**
1. Lee el `id` con `URLSearchParams`.
2. Hace `fetch()` de `src/data/lecciones.json`.
3. Busca la lección recorriendo `modulos[].lecciones` (aplana la lista en un array plano con su módulo).
4. Si existe → renderiza; si no → mensaje "Lección no encontrada" + botón a `video.html`.

**Navegación prev/next:** se calcula desde el array plano de lecciones (índice ± 1), cruzando
módulos. En la primera/última lección el botón correspondiente se deshabilita (`--disabled`).

**Por qué así:** agregar una lección nueva a `lecciones.json` la hace aparecer automáticamente en
`video.html` (los links se generan del mismo JSON) **y** ya resulta accesible en su detalle, sin
crear archivos nuevos. Ver `docs/decisiones-tecnicas.md`.

El mismo patrón es replicable a futuro para Podcast/Cultura/Flashcards/Quizzes.

## Quiz jugable (quiz-detalle.html + quiz-engine.js)

`quiz-detalle.html?id=<id>` renderiza un quiz jugable de `src/data/quizzes.json`. La lógica del quiz
(estado, pregunta actual, respuestas, puntaje) vive separada en `src/scripts/quiz-engine.js`, un
módulo ES que se importa con `import { crearQuizEngine } from '../scripts/quiz-engine.js'`.

**Motor (`crearQuizEngine(preguntas)`):** devuelve `obtenerPreguntaActual`, `obtenerIndice`,
`obtenerTotal`, `seleccionarRespuesta(i)`, `verificarRespuestaActual`,
`hayPreguntaSiguiente`, `avanzar` y `obtenerResultadoFinal`. Todo el estado vive en memoria;
no se guarda al salir o recargar.

**Página:** carga el quiz por `?id=`, crea el motor y renderiza encabezado (título + temporizador
visual fijo `⏱ 04:15`), barra de progreso (pregunta X de Y + %), pregunta, opciones (radio
personalizado) y botón "Verificar respuesta" → "Siguiente pregunta"/"Ver resultados". Al terminar
muestra resumen "X / Y" con "Reintentar" (reinicia el motor) y "Volver a Quizzes".

**Texto seguro:** la pregunta y las opciones se insertan con `textContent` (no `innerHTML`
concatenado), para evitar inyección si el contenido viniera de otra fuente.
