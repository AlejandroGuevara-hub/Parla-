# Feature — Imágenes Reales en los Widgets de Inicio del Estudiante

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Contexto
Las 6 tarjetas de `inicio.html` hoy tienen un ícono de Font Awesome en un círculo de color. Este cambio las lleva de vuelta al estilo original del mockup del cliente: una foto arriba, después el título, después la descripción — sin ícono circular.

## Imágenes a usar
Ubicación: `Diego-pagina web/Parte/2.Inicio del estudiante/Fotos/`

| Tarjeta | Archivo |
|---|---|
| Lecciones en video | `4.png` |
| Podcast | `7.png` |
| Cultura | `8.png` |
| Webtoons | `6.png` |
| Flashcards | `3.png` |
| Quizzes | `5.png` |

**Nota:** la última vez que se revisó esta carpeta, `Fotos` solo tenía un archivo `.zip` comprimido, no los PNG sueltos. Si te encuentras con eso, extrae el zip primero y confirma que los nombres coincidan con la tabla de arriba antes de continuar; si los nombres reales son distintos, avisa antes de asumir cuál va con cuál.

## Estructura de cada tarjeta (cambia el orden interno, no la tarjeta en sí)
```
[ tarjeta ]
  espacio generoso arriba
  imagen (esquinas redondeadas, mismo radio que la tarjeta)
  espacio
  título
  descripción
  espacio abajo
```
Quita el ícono circular de Font Awesome de las 6 tarjetas — ya no va, lo reemplaza la foto.

## Medidas — usa los tokens que ya existen en `variables.css`, no inventes nuevos
Ya estaban reservados para esto desde el inicio del proyecto:
```css
--card-image-w: 300px;
--card-image-h: 240px;
--card-frame-w: 316.7px;
--card-frame-h: 422px;
```
Revisa si el ancho máximo de tarjeta que se usa hoy (`--feature-card-max-w`, agregado en `docs/specs/prompt-fix-tarjetas-y-flujo-registro.md`) coincide con `--card-frame-w`. Si no coincide, unifica en un solo token (`--card-frame-w`) y elimina el duplicado, dejando nota en `docs/decisiones-tecnicas.md` de por qué se consolidaron.

## Espaciado exacto pedido por el cliente
- Entre los bordes laterales de la imagen y los bordes laterales de la tarjeta: **4px** de espacio, nada más (la imagen debe verse casi a todo el ancho de la tarjeta).
- Entre el borde superior de la tarjeta y el borde superior de la imagen: espacio generoso (usa `--space-sm` o `--space-md`, el que se vea mejor proporcionado — no lo dejes en 4px, ahí sí debe respirar).
- Entre imagen y título, entre título y descripción, y hasta el borde inferior de la tarjeta: mantén el mismo criterio de espaciado ya usado en el resto de tarjetas del proyecto (`--space-xs` / `--space-sm` según corresponda), consistente entre las 6.

```css
.feature-card {
  padding: var(--space-md) 4px var(--space-sm) 4px;
  /* ajusta arriba/abajo a ojo comparando con la referencia, los 4px laterales son fijos */
}

.feature-card__image {
  width: calc(100% - 8px); /* 4px de cada lado */
  height: var(--card-image-h);
  object-fit: cover;
  border-radius: inherit;
  margin: 0 auto;
  display: block;
}
```

## Lo que no cambia
- El comportamiento de hover, el hipervínculo de cada tarjeta a su página, el sistema de fade/stagger al hacer scroll (`.animate-in`) — todo eso sigue funcionando igual, solo cambia el contenido interno de la tarjeta.
- Tipografía y color de título/descripción, tal como están hoy.

## Documentación
- `docs/guia-componentes.md`: actualiza la ficha de las 6 tarjetas — ya no llevan ícono, llevan imagen; documenta la ruta de cada imagen.
- `docs/decisiones-tecnicas.md`: nota de la consolidación de tokens de ancho de tarjeta, si aplicó.
- `CHANGELOG.md` bajo `Changed`: "Reemplaza íconos por imágenes reales en las 6 tarjetas de inicio, según diseño original del cliente".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`feat: agrega imágenes reales a las 6 tarjetas de inicio del estudiante`
