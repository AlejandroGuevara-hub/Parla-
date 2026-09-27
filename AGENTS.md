# AGENTS.md — Parla! (aplicar en cada sesión)

Proyecto **100% estático**: HTML + CSS + JS vanilla + JSON. Sin backend, sin base de datos,
sin autenticación real (login/registro son maquetas). **No hay build, tests, lint ni
typecheck** — no hay `package.json`. La verificación es abrir en navegador.

## Cómo correr (IMPORTANTE)

Las páginas de contenido (`video`, `podcast`, `cultura`, `flashcards`, `quizzes`, `perfil`)
usan `fetch('../data/*.json')`. **`file://` falla por CORS**: hay que servir por HTTP.

```bash
python -m http.server 8000        # o: npx http-server .
# luego: http://localhost:8000/src/views/index.html
```

No usar `file://` para probar nada que dependa de JSON. La vista de entrada es `index.html`.

## Arquitectura — dos familias de vistas

**Landing + auth** (`index.html`, `login.html`, `registro.html`): NO tienen sidebar. Cargar
`nav.js` (header móvil + `form[data-navegar]`), `theme.js`, `animations.js`. No cargar los
componentes del sidebar.

**Vistas autenticadas** (`inicio`, `video`, `podcast`, `webtoon`, `cultura`, `flashcards`,
`quizzes`, `contacto`, `perfil`): usan Web Components (módulos ES):

```html
<script type="module" src="../scripts/components/sidebar.js"></script>
<script type="module" src="../scripts/components/user-nav.js"></script>
<parla-sidebar current="inicio"></parla-sidebar>
<parla-user-nav></parla-user-nav>
```

- `<parla-sidebar current="...">` marca el enlace activo. Valores: `inicio`, `video`,
  `podcast`, `webtoon`, `cultura`, `flashcards`, `quizzes`, `contacto`, `perfil`.
- No poner el valor por URL; usar la etiqueta correcta de cada página. Solo cambia ahí la
  clase `.is-active`.

## Web Components (reglas)

- **Light DOM, SIN Shadow DOM.** El CSS global (`variables.css`, `components.css`,
  `styles.css`) sigue peinando los elementos. **No** encapsular estilos dentro del componente.
- Mantener los nombres de clase **idénticos** a los ya existentes en `components.css`
  (`.sidebar`, `.sidebar-link`, `.sidebar-link.is-active`, `.sidebar-overlay`,
  `.sidebar-menu-toggle`, `.floating-user-nav`). Cambiarlos rompe el estilo en todas las páginas.
- El estado del drawer (móvil ≤768px) se maneja dentro de `components/sidebar.js`:
  alterna `.is-open` en `.sidebar` + `.is-visible` en `.sidebar-overlay`.
- El toggle de menú alterna el ícono `fa-bars` ↔ `fa-xmark` y el `aria-label`.

## Trampas que rompen el trabajo si te las pierdes

- **`src/scripts/sidebar.js` (raíz de scripts) es código muerto** — ya no se referencia desde
  ninguna vista (lo reemplazó `components/sidebar.js`). No lo edites para el sidebar: edita
  `src/scripts/components/sidebar.js`.
- **Carpetas raíz `css/` y `js/` están vacías** (restos históricos). Todo el código vive en
  `src/styles/` y `src/scripts/`. No lo pongas ahí.
- **No inventar colores ni tipografías** fuera de `src/styles/variables.css` (única fuente de
  verdad visual). Lo mismo con espaciados (`--space-*`) y tokens `--fs-*`.
- Los breakpoints son **480px, 768px, 1024px**. Al tocar layout responsive revisá los tres
  bloques (hay media queries en `styles.css`).
- Fonts especiales se cargan por vista (DM Serif solo en `index.html`, Cinzel solo en
  `contacto.html`). No las agregues de más.
- El **glow** de la tarjeta "Lecciones en video" (`inicio.html` → `card--featured`) sigue
  activo pese a un spec que pedía eliminarlo. No asumas que se borró: verifica el código.

## Flujo de trabajo obligatorio (documentación viva)

1. **Antes de empezar**: leer `docs/CONTEXTO.md` y, si la tarea tiene spec propio en
   `docs/specs/`, ese spec (es la fuente de verdad del alcance). Ver `prompts/prompt-releer-documentacion.md`.
2. **Cada cambio** documentarlo en la doc que corresponda y en `CHANGELOG.md`. Archivos que se
   actualizan seguido: `docs/CONTEXTO.md` (estado avance + "Última actualización"),
   `docs/GUIA-PROYECTO.md` (árbol/archivos), `docs/guia-componentes.md` (componentes),
   `docs/ERRORES.md` (bugs, formato `Qué pasó / Por qué / Cómo se corrigió / Cómo evitarlo`),
   `docs/decisiones-tecnicas.md` (por qué), `docs/PENDIENTES.md` (a medias), `README.md`.
3. **Antes de commitear**: la doc vinculada debe estar actualizada y entrar en el mismo commit.

## Commits y push (ver `prompts/prompt-commits-github.md`)

- **Conventional Commits, tipo en inglés** (`feat`, `fix`, `docs`, `refactor`, `chore`, …),
  **título en español, minúscula, sin punto final**. Ej: `fix: corrige superposicion de boton en sidebar movil`.
- Un commit = un cambio lógico. No mezclar `feat` con `fix` ajeno en el mismo commit.
- Push a `origin/main` al terminar cada tarea. Si el push falla por autorización ("Invalid
  username or token"/password auth), no es culpa tuyo: puede requerir que el repo local
  vuelva a autenticar. Reportar el comando exacto al usuario para push manual.
