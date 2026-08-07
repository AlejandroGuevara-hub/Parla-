# Fix — El Resplandor se ve como una Mancha Borrosa (Blob)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Esto reemplaza por completo la técnica usada en `docs/specs/prompt-fix-fade-general-y-fluidez.md` (punto 2) para la tarjeta "Lecciones en video".

## Problema (ver captura del cliente)
El resplandor actual se ve como una mancha grande, borrosa y desparejada que cuelga fuera de la tarjeta, en vez de un brillo prolijo alrededor del borde. Esto pasa porque la técnica de `conic-gradient` + `blur(12px)` + `inset(-4px)` genera una forma irregular y demasiado grande, sobre todo porque el segmento de color brillante ocupa un arco muy ancho (25% del círculo).

## Solución: borde animado con máscara, en vez de sombra borrosa
Cambia de técnica por completo. En vez de un pseudo-elemento borroso detrás de la tarjeta, crea un anillo delgado exactamente sobre el borde de la tarjeta, usando `mask` para que solo se vea el anillo (no un relleno ni una mancha), y rota ese anillo con `transform: rotate()` (no animes el gradiente en sí, rota el elemento completo — esto funciona en todos los navegadores modernos sin necesitar soporte especial).

Elimina todo el CSS anterior de `.card--featured::before` y `@keyframes rotar-resplandor`, y reemplázalo por esto:

```css
.card--featured {
  position: relative;
  z-index: 1; /* se mantiene: menor que .card (z-index: 2), no lo cambies */
  overflow: visible;
}

.card--featured::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  padding: 2px; /* grosor del anillo animado */
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    var(--color-primary) 12%,
    transparent 24%
  );
  /* esto hace que SOLO se vea el anillo (borde), no el relleno del cuadrado */
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
  animation: girar-anillo 3s linear infinite;
}

@keyframes girar-anillo {
  to { transform: rotate(360deg); }
}
```

Notas clave:
- El arco brillante ahora es angosto (12% del círculo, no 25%) — se ve como una luz que recorre el borde, no como un bloque grande.
- No lleva `blur()` de 12px. Si quieres un poquito de suavidad, usa como máximo `filter: blur(1.5px)` en el `::before` — nunca más de eso, o vuelve a verse como mancha.
- El `mask-composite: exclude` es lo que logra que solo se vea el anillo delgado y no un cuadrado relleno detrás de la tarjeta.
- Sigue rotando de forma continua y fluida (`linear`, sin pausas), como se pidió antes — esto no cambia.

## Verificación antes de dar por terminado
- El brillo se ve como un anillo delgado recorriendo el borde de la tarjeta, no como una mancha o sombra grande.
- No se sale de forma notoria hacia las tarjetas vecinas (arriba ni al lado).
- Se sigue viendo fluido, sin pausas ni efecto de "respiración".

## Documentación
- `docs/ERRORES.md`: nueva entrada — el resplandor con blur grande se veía como una mancha borrosa; se corrigió con un anillo animado con máscara en vez de una sombra difusa.
- `docs/guia-componentes.md`: actualiza la ficha de `.card--featured` con la técnica nueva (borde con máscara, no sombra borrosa).
- `docs/decisiones-tecnicas.md`: explica por qué se prefirió `mask-composite: exclude` + `transform: rotate()` sobre animar el ángulo del gradiente directamente (mejor soporte de navegadores, sin necesitar `@property`).
- `CHANGELOG.md` bajo `Fixed`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: reemplaza resplandor borroso por anillo animado con máscara en lecciones en video`
