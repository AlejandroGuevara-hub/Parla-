# Fix — Corregir el Hover de las Tarjetas (se ve como "seleccionado")

## Aclaración
Esto es independiente de `docs/specs/prompt-eliminar-card-featured.md` (esa sigue en pie: hay que quitar igual la clase `card--featured` y su glow roto). Este prompt es sobre otro problema: TODAS las tarjetas (no solo la que tenía el glow) muestran una línea/borde sólido al pasar el mouse que se ve como una selección forzada, no como un hover cuidado. Se ve en la captura sobre la tarjeta "Quizzes", que nunca tuvo el efecto de glow — así que es un estilo de `:hover` o `:focus` que afecta a todas las tarjetas por igual y hay que arreglarlo ahí.

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Qué hacer
1. Busca en el CSS el estilo actual de `.card:hover` / `.feature-card:hover` / `:focus` que está generando ese borde sólido grueso. Revísalo y reemplázalo.
2. En vez de un borde sólido llamativo, usa un hover sutil apoyado en el token que ya existe en `variables.css` (`--shadow-card-hover`), que hasta ahora no se estaba usando:

```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-primary);
}
```

3. Para navegación por teclado, mantén un estado de foco visible pero igual de cuidado (no quites el foco por accesibilidad, solo que no se vea como una selección brusca):

```css
.card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

Usa `:focus-visible` (no `:focus` a secas) para que el anillo de foco solo aparezca en navegación por teclado, no cada vez que alguien hace clic con el mouse — así se evita justamente el efecto de "se ve mal seleccionada" que reportó el cliente al pasar el mouse.

## Verificación
- Al pasar el mouse sobre cualquiera de las 6 tarjetas, se ve un levantamiento sutil + sombra suave + borde que cambia de color, no una línea gruesa tipo selección.
- Al navegar con `Tab` (teclado), se ve un anillo de foco claro y accesible, distinto del hover de mouse.
- El comportamiento es igual en las 6 tarjetas, no solo en algunas.

## Documentación
- `docs/guia-componentes.md`: documenta el estado `:hover` y `:focus-visible` de `.card`, y que ahora usan `--shadow-card-hover`.
- `docs/ERRORES.md`: nota breve — el hover anterior se veía como una selección forzada por un borde sólido sin transición; se corrigió con transform + shadow + color de borde suave.
- `CHANGELOG.md` bajo `Fixed`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: corrige hover de tarjetas para que no se vea como una selección forzada`
