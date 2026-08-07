# Fix — Bajar Opacidad del Glow en "Lecciones en Video"

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Ajusta la técnica de `docs/specs/prompt-fix-glow-gradiente-doble-capa.md`, sin cambiar su esencia (sigue siendo el degradado giratorio de dos capas).

## Qué cambiar
El efecto se ve demasiado protagonista y le resta atención al título y la descripción de la tarjeta. Baja la opacidad de las dos capas para que el glow quede como un detalle sutil, no como lo primero que se ve:

```css
.card--featured::before {
  opacity: 0.6; /* borde nítido, algo más presente */
}

.card--featured::after {
  opacity: 0.35; /* resplandor difuminado, más discreto — es el que más "ruido" genera */
  filter: blur(1.25rem);
}
```

Ajusta estos dos valores a ojo hasta que el texto de la tarjeta ("Lecciones en video" y su descripción) se lea con la misma claridad que en las otras 5 tarjetas, y el glow se perciba como un acento, no como el elemento dominante.

## Verificación
- El texto de la tarjeta se lee tan claro como en las tarjetas sin efecto.
- El glow sigue siendo reconocible (no lo bajes tanto que desaparezca), solo menos llamativo.
- Sigue sin invadir a Podcast ni a Flashcards.

## Documentación
- `docs/guia-componentes.md`: actualiza los valores de opacidad en la ficha de `.card--featured`.
- `CHANGELOG.md` bajo `Changed`: "Baja opacidad del glow en lecciones en video para mejorar legibilidad".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: baja opacidad del glow en lecciones en video para mejorar legibilidad del texto`
