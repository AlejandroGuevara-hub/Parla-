# Spec — Fix: Sin Sidebar ni Botón de Menú en Login/Registro

## Contexto
El sidebar de navegación vertical aplica solo a las vistas autenticadas. La Landing (`index.html`) siempre estuvo excluida. El panel fijo se quitó de escritorio en `login.html` y `registro.html`, pero la exclusión debía cubrir también su versión móvil (botón de menú/hamburguesa que abre el drawer, el drawer y su overlay).

## Alcance final del sidebar

- **Con sidebar**: `inicio.html`, `contacto.html`, `video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`.
- **Sin sidebar**: `index.html`, `login.html`, `registro.html`.

## Qué se corrigió

1. Se quitó el HTML del sidebar de `login.html` y `registro.html` (panel fijo).
2. Se quitó el `margin-left` de `.page-content` en esas dos vistas — volvieron a su layout original centrado (`.auth-page` / `.auth-card`), sin espacio reservado a la izquierda.
3. Se confirmó que en ningún tamaño de pantalla (móvil, tablet, escritorio) aparezca:
   - El sidebar fijo.
   - El botón de menú `.sidebar-toggle` (hamburguesa) que abre el drawer.
   - El drawer `.sidebar` en su forma móvil ni el overlay `.sidebar-overlay`.
4. Se verificó el flujo de navegación intacto: `registro.html` → `login.html` → `inicio.html` (el sidebar aparece recién ahí).

## Por qué no había botón global en móvil

El sidebar y su toggle se incluyen por markup explícito por vista; no existe inyección global por JS ni por CSS. `login.html` y `registro.html` no incluyen ese markup y tampoco cargan `src/scripts/sidebar.js` (solo `nav.js`, `theme.js` y `animations.js`). Además, `sidebar.js` tiene un guard inicial — `if (!sidebar || !toggle || !overlay) return;` — que lo inutiliza sin esos elementos. Por eso la exclusión de las 3 formas (fijo, botón de menú, drawer/overlay) ya queda cubierta por la ausencia total del componente en esas páginas.

## Código actual

`src/scripts/sidebar.js:10` → guard que evita operar sin sidebar/toggle/overlay.

## Cómo verificar

Abrir `login.html` y `registro.html` en las herramientas de desarrollador y probar los 3 breakpoints (móvil ≤768px, tablet 769–1024px, escritorio >1024px): no debe haber ningún rastro del sidebar en ninguna de sus formas (ni el panel, ni la hamburguesa, ni el drawer).

## Documentación asociada

- `docs/ERRORES.md` — entrada [2026-08-06] con la confirmación de las 3 formas.
- `docs/guia-componentes.md` — sección `.sidebar`: "Exclusión completa: las 3 formas del sidebar no existen en index/login/registro en ningún breakpoint".
- `CHANGELOG.md` — categoría `Fixed`, versión correspondiente (`1.18.1` lo de escritorio y `1.19.2` la confirmación móvil).
- `docs/CONTEXTO.md` — estado y última actualización.
- `docs/GUIA-PROYECTO.md` — patrón de navegación con las 3 excepciones.

## Commit

`fix: quita el sidebar de login y registro` (escritorio) y `fix: quita boton de menu y drawer movil del sidebar en login y registro` (confirmación móvil).