# Fix — Quitar el Sidebar de Login y Registro

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Esto corrige el alcance definido en `docs/specs/prompt-sidebar-navegacion.md`.

## Cambio
El panel de navegación vertical (sidebar) NO debe aparecer en `login.html` ni en `registro.html`. Son las únicas dos excepciones además de `index.html`, que ya estaba excluida desde el inicio.

Alcance final del sidebar:
- **Con sidebar**: `inicio.html`, `contacto.html`, `video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`.
- **Sin sidebar**: `index.html`, `login.html`, `registro.html`.

## Qué hacer
1. Quita el HTML del sidebar de `login.html` y `registro.html`.
2. Quita el `margin-left` (o el ajuste de layout que se le haya dado a `.page-content` por el sidebar) en esas dos vistas — deben volver a verse centradas/con su layout original, sin el espacio reservado a la izquierda.
3. Verifica que el flujo de navegación siga intacto: `registro.html` → `login.html` → `inicio.html` (donde recién ahí aparece el sidebar).

## Documentación
- `docs/guia-componentes.md`: actualiza la lista de vistas donde aplica el sidebar.
- `docs/GUIA-PROYECTO.md`: corrige el alcance documentado.
- `CHANGELOG.md` bajo `Fixed`: "Quita el sidebar de login y registro, no debía estar ahí".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: quita el sidebar de login y registro`
