# Feature — Eliminar Header, Logo e Íconos Quedan Flotantes y Fijos

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Alcance
Esto aplica a todas las vistas de usuario autenticado: `inicio.html`, `contacto.html`, y las 6 páginas placeholder (`video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`). NO aplica a `index.html` (Landing), `login.html` ni `registro.html` — esas mantienen su header actual con "Iniciar sesión"/"Registrarme".

## Cambio
Elimina el `<header>` como bloque/barra en estas vistas (sin fondo de barra superior, sin borde inferior de header). En su lugar:

- **Logo**: queda flotante, fijo en la esquina superior izquierda de la pantalla.
- **Perfil / Contacto / Salir**: quedan flotantes, fijos en la esquina superior derecha de la pantalla, agrupados igual que antes.

Ambos grupos deben:
- Permanecer visibles y en la misma posición mientras el usuario hace scroll hacia abajo (no se van con el contenido).
- Verse bien sobre cualquier fondo que haya detrás (fotos, fondo oscuro del tema, etc.) — dales un fondo propio tipo "pastilla" sutil para que no se pierdan contra el contenido:

```css
.floating-logo,
.floating-user-nav {
  position: fixed;
  top: var(--space-sm);
  z-index: 50;
  background: var(--color-bg-card);
  border-radius: 999px;
  box-shadow: var(--shadow-card);
  padding: var(--space-xs) var(--space-sm);
}

.floating-logo {
  left: var(--space-sm);
}

.floating-user-nav {
  right: var(--space-sm);
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}
```

Ajusta el `z-index` para que quede por encima del contenido normal de la página, pero revisa que no choque con el botón de tema claro/oscuro (que ya es flotante, esquina inferior derecha — no hay conflicto de posición, pero confirma que ambos se vean bien juntos).

## Reutilización
No copies este bloque distinto en cada archivo por separado sin criterio: define una sola vez el CSS de `.floating-logo` / `.floating-user-nav` en `src/styles/components.css`, y replica el mismo HTML en las 8 vistas afectadas. Si en el futuro se agregan más vistas de usuario autenticado, deben usar este mismo patrón por defecto (déjalo anotado en `docs/GUIA-PROYECTO.md`).

## Verificación
- En las 8 vistas, el logo y los 3 íconos siguen visibles en sus esquinas mientras se hace scroll hasta el final de la página.
- No tapan contenido importante al cargar la página (revisa que el contenido superior de cada vista no quede escondido debajo).
- Responsive: en móvil, siguen siendo legibles y no se superponen entre sí ni con el botón de tema.

## Documentación
- `docs/guia-componentes.md`: documenta `.floating-logo` y `.floating-user-nav`, en qué vistas se usan y por qué reemplazan al header tradicional.
- `docs/decisiones-tecnicas.md`: por qué se eliminó el header como barra y se pasó a elementos flotantes fijos.
- `docs/GUIA-PROYECTO.md`: nota de que toda vista nueva de usuario autenticado debe usar este patrón, no un header tradicional.
- `CHANGELOG.md` bajo `Changed`: "Elimina header tradicional en vistas de usuario autenticado; logo e íconos quedan flotantes y fijos al hacer scroll".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`feat: elimina header y convierte logo e íconos de usuario en elementos flotantes fijos`
