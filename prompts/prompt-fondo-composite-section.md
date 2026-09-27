# Fix — Fondo de Foto en "Composite Section" (Landing)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Esto ajusta la sección `.composite-section` en `src/views/index.html` (la que tiene el título "Olvídate de memorizar reglas", la imagen compuesta de audífonos/webtoon/columna, y el párrafo debajo).

## Cambio
Usa `hero-bg.jpg` (la misma imagen que ya está en `src/assets/`, usada como fondo del hero) como imagen de fondo de toda la sección `.composite-section`. Todo el contenido de la sección (título, tarjeta con la imagen compuesta + íconos, párrafo) debe quedar visualmente por encima de ese fondo.

```css
.composite-section {
  position: relative;
  background-image: url("../assets/hero-bg.jpg"); /* ajusta la ruta relativa según dónde esté el archivo */
  background-size: cover;
  background-position: center;
}
```

## Tratamiento del contenido sobre el fondo
Sigue la misma convención ya usada en el hero: **sin overlay oscuro sobre la foto** (la imagen se ve siempre a plena claridad), y usa `text-shadow` para que el título y el párrafo se lean bien encima:

```css
.composite-section__title,
.composite-section__paragraph {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}
```

La tarjeta que contiene la imagen compuesta + la fila de íconos (Podcast/Webtoon/Cultura) debe seguir viéndose como una tarjeta clara flotando sobre la foto — mantenle su fondo blanco/claro y su sombra (usa `--shadow-card` o `--shadow-card-hover` si hace falta más presencia) para que se note que está por encima del fondo, no mezclada con él.

## Verificación
- El fondo de foto cubre toda la sección sin deformarse ni recortarse mal en móvil/tablet/escritorio.
- El título y el párrafo se leen bien sobre la foto en cualquier tamaño de pantalla.
- La tarjeta con la imagen compuesta se distingue claramente como un elemento flotando sobre el fondo, no se pierde contra la foto.

## Documentación
- `docs/decisiones-tecnicas.md`: por qué se reutiliza `hero-bg.jpg` en esta sección (consistencia visual con el hero) y por qué no se usa overlay oscuro (misma convención ya establecida en el sitio).
- `docs/guia-componentes.md`: actualiza la ficha de `.composite-section` con el nuevo fondo.
- `CHANGELOG.md` bajo `Changed`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`feat: agrega fondo de foto a composite-section con texto y tarjeta superpuestos`
