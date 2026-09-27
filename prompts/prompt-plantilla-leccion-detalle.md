# Feature — Página de Detalle de Lección (Plantilla Dinámica)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Objetivo
Que cada lección tenga su propia página sin necesidad de crear un archivo `.html` nuevo cada vez que se agregue una lección a `lecciones.json`. Se logra con UNA sola página plantilla que lee el contenido según un parámetro en la URL.

## Archivo nuevo
`src/views/leccion-detalle.html`

## Cómo funciona
La URL lleva el id de la lección como parámetro: `leccion-detalle.html?id=l3`. La página, al cargar:
1. Lee el `id` de la URL con `URLSearchParams`.
2. Hace `fetch()` de `src/data/lecciones.json`.
3. Busca esa lección dentro de todos los módulos (recorre el array `modulos` y dentro cada `lecciones`).
4. Si la encuentra, renderiza su contenido. Si no la encuentra (id inválido), muestra un mensaje simple de "Lección no encontrada" con un botón para volver a `video.html`.

```javascript
const params = new URLSearchParams(window.location.search);
const idLeccion = params.get('id');

fetch('../data/lecciones.json')
  .then(res => res.json())
  .then(data => {
    let leccionEncontrada = null;
    let moduloDeLaLeccion = null;

    for (const modulo of data.modulos) {
      const encontrada = modulo.lecciones.find(l => l.id === idLeccion);
      if (encontrada) {
        leccionEncontrada = encontrada;
        moduloDeLaLeccion = modulo;
        break;
      }
    }

    if (leccionEncontrada) {
      renderizarLeccion(leccionEncontrada, moduloDeLaLeccion, data);
    } else {
      renderizarNoEncontrada();
    }
  });
```

## Contenido de la página (cuando la lección existe)
- Nombre del módulo al que pertenece + título de la lección.
- Un placeholder de reproductor de video (no hay archivos de video reales todavía — usa un bloque visual tipo "video" con un ícono de play, y anota en `docs/PENDIENTES.md` que falta conectar video real).
- Estado de la lección (completada / en progreso / pendiente), con el mismo estilo de badge ya usado en `video.html`.
- Botón "Marcar como completada" — solo visual, no guarda nada (igual criterio que el resto del proyecto en esta fase).
- Navegación "← Lección anterior" / "Lección siguiente →", calculada a partir del orden de las lecciones en el JSON (si es la primera o la última lección, ese botón se deshabilita u oculta).
- Botón para volver a `video.html`.

## Conecta los enlaces desde la lista de lecciones
En `video.html`, cada lección de la lista debe ser un link real a su página de detalle:
```html
<a href="leccion-detalle.html?id=l1">Lección 1 · Saludos</a>
```
Genera estos enlaces dinámicamente a partir del mismo `lecciones.json` (ya que `video.html` también carga ese archivo) — no los hardcodees, así una lección nueva agregada al JSON aparece automáticamente en la lista Y ya tiene su link funcional a `leccion-detalle.html`.

## Verificación
- Al agregar una lección nueva de prueba en `lecciones.json` (sin tocar ningún HTML), debe: (1) aparecer en la lista de `video.html`, y (2) abrir correctamente en `leccion-detalle.html?id=<su-id>` con su contenido.
- Navegar entre "Lección anterior" / "Lección siguiente" funciona en el orden correcto, incluso cruzando de un módulo a otro.
- Un `id` inexistente en la URL muestra el mensaje de "no encontrada", no una página rota o en blanco.

## Documentación
- `docs/GUIA-PROYECTO.md`: agrega `leccion-detalle.html` y explica el patrón de "plantilla dinámica" para que quede claro por qué no hay un archivo por lección.
- `docs/decisiones-tecnicas.md`: por qué se usa una plantilla con parámetro de URL en vez de un archivo HTML por lección — escala sin generar archivos nuevos, y es coherente con que el contenido ya vive en JSON.
- `docs/PENDIENTES.md`: agrega "conectar video real en leccion-detalle.html".
- `CHANGELOG.md` bajo `Added`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`feat: agrega pagina plantilla de detalle de leccion para escalar sin crear archivos nuevos`

---

## Nota para más adelante
Este mismo patrón (una plantilla + parámetro de URL) se puede repetir para Podcast (episodio-detalle.html), Cultura (tema-detalle.html), Flashcards (mazo-detalle.html) y Quizzes (quiz-detalle.html), si se quiere el mismo comportamiento ahí. No está incluido en este prompt — si lo quieres, pídemelo aparte y armo esos también.
