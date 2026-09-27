# Fix — Eliminar por Completo el Efecto Destacado de "Lecciones en Video"

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Problema (ver captura del cliente)
La clase `.card--featured` ahora está rellenando toda la tarjeta con el degradado (se ve un bloque sólido celeste/turquesa cubriendo toda la tarjeta, tapando el diseño original de la card), no un glow sutil alrededor del borde como se buscaba. Después de varios intentos (rotación, pulso/respiración, anillo con máscara, degradado giratorio de dos capas), el efecto sigue rompiendo el renderizado de este widget específico.

## Decisión
Eliminar el efecto por completo. No se va a seguir iterando sobre esto ahora mismo — está bloqueando el avance del proyecto y afectando negativamente el sistema de tarjetas.

## Qué eliminar

**HTML** (`inicio.html`): quita la clase `card--featured` del elemento de "Lecciones en video". Debe quedar con las mismas clases base que las otras 5 tarjetas (`feature-card card`, sin el modificador).

**CSS**: elimina por completo, en todos los archivos donde aparezca:
- `.card--featured` y todas sus variaciones (`::before`, `::after`)
- `@keyframes girar-gradiente` (y cualquier `@keyframes` anterior relacionada: `rotar-resplandor`, `girar-anillo`, `respirar-halo`, si quedó algún rastro de intentos previos)
- `@property --gradient-angle`
- `--glow-clr-1`, `--glow-clr-2`, `--glow-clr-3` en `variables.css`, si no se usan en ningún otro lado del proyecto

**Verificación**: la tarjeta de "Lecciones en video" debe verse exactamente igual que las otras 5 (mismo fondo, mismo borde, mismo padding), solo diferenciándose por su ícono, título y descripción — sin ningún efecto visual adicional. El sistema de fade al hacer scroll (`.animate-in`) debe seguir funcionando normal en esta tarjeta, eso no se toca.

## Documentación
- `docs/ERRORES.md`: entrada detallada — se intentó varias veces (rotación con blur, pulso, anillo con máscara, degradado de dos capas) destacar esta tarjeta con un efecto animado, y en cada iteración se generaron bugs visuales (invasión sobre tarjetas vecinas, manchas borrosas, relleno completo de la tarjeta). Se decidió eliminar el efecto por ahora. Si se retoma en el futuro, prototipar en una página aislada antes de aplicarlo directo al grid de producción.
- `docs/guia-componentes.md`: elimina la ficha de `.card--featured`.
- `docs/PENDIENTES.md`: agrega "Retomar highlight visual para 'Lecciones en video' en una fase posterior, con prototipo aislado primero (opcional)".
- `CHANGELOG.md` bajo `Removed`: "Elimina efecto de resplandor animado en lecciones en video tras romper el renderizado de la tarjeta".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: elimina clase card--featured y su efecto de glow por romper el renderizado de la tarjeta`
