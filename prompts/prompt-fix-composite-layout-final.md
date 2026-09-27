# Fix — Layout Final de Composite Section + Quitar Hover No Solicitado

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Este prompt es la versión final y definitiva del layout de `.composite-section` en `src/views/index.html` — reemplaza el resultado actual, que no coincide con la referencia del cliente.

## 1. Quitar el efecto hover que se agregó sin haber sido pedido
La tarjeta con la imagen compuesta tiene un borde cian que aparece como hover/foco — esto no se pidió en ningún momento. Búscalo y elimínalo (revisa si `.composite-section__image-wrap`, o el contenedor de la imagen, quedó heredando estilos de `.card:hover` o algo similar por error) y no lo repitas.

**Documenta este error en `docs/ERRORES.md`**: se agregó un efecto de hover/borde no solicitado en la imagen del compuesto de la landing; regla para el futuro — no agregar estados de interacción (`:hover`, `:focus`) a un elemento a menos que se pida explícitamente.

## 2. Layout exacto (referencia adjunta — sigue esto al pixel, no la interpretación libre)
Estructura en grid de 2 columnas:

```
| título (izquierda, ~30% ancho) | imagen (derecha, ~70% ancho) |
|                                  | párrafo (alineado bajo la imagen) |
```

- **Título** "Olvídate de memorizar reglas.": columna izquierda, tamaño grande (más grande que intentos anteriores — round que ocupe visualmente un peso similar al de la imagen). Si el tamaño hace que el texto se extienda más allá de su columna, déjalo superponerse por encima de la imagen (no lo encojas para que quepa).
- **Imagen compuesta + fila de íconos** (Podcast/Webtoon/Cultura): columna derecha, ocupando la mayoría del ancho de la sección.
- **Párrafo** "Aprende italiano mediante experiencias...": va DEBAJO de la imagen, alineado con el borde izquierdo de la imagen (no con el título, no a todo el ancho de la sección).

```css
.composite-section {
  position: relative;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-areas:
    "title    image"
    "..empty.. paragraph";
  column-gap: var(--space-lg);
  align-items: start;
}

.composite-section__title {
  grid-area: title;
  position: relative;
  z-index: 2; /* puede superponerse a la imagen */
  font-family: "DM Serif Display", serif;
  font-size: 3.5rem; /* grande, ajustar a ojo comparando con la referencia */
  color: var(--color-heading-gold);
  max-width: none;
}

.composite-section__image-wrap {
  grid-area: image;
  position: relative;
  z-index: 1;
}

.composite-section__paragraph {
  grid-area: paragraph;
}
```

En móvil, colapsa a una sola columna en este orden: título, luego imagen, luego párrafo — sin superposición forzada en pantallas angostas (ahí sí puede ir todo apilado normal).

## Verificación
- Layout idéntico a la referencia: título grande a la izquierda superpuesto o casi tocando la imagen, imagen grande a la derecha, párrafo alineado bajo la imagen.
- Sin ningún borde/hover extra en la imagen.
- Responsive: se apila bien en móvil sin que el título tape contenido de forma ilegible.

## Documentación
- `docs/ERRORES.md`: la entrada del hover no solicitado (punto 1).
- `docs/guia-componentes.md`: actualiza la ficha de `.composite-section` con el grid final de 2 columnas.
- `CHANGELOG.md` bajo `Fixed`: "Corrige layout de composite-section para que coincida con la referencia y elimina hover no solicitado".
- `docs/CONTEXTO.md`: actualiza estado.

## Commits (separados)
1. `fix: elimina hover no solicitado en imagen de composite-section`
2. `fix: corrige layout de composite-section para que coincida con la referencia del cliente`
