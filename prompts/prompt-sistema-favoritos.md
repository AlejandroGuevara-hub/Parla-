# Feature — Sistema de Favoritos (con localStorage)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Decisiones ya tomadas (no las vuelvas a preguntar)
- Se guarda en `localStorage` (mismo criterio ya usado para el tema claro/oscuro) — sin esto la función no tiene sentido, y sigue sin requerir backend ni base de datos.
- Solo se puede marcar como favorito desde la página de **detalle** de cada contenido (no desde las tarjetas/listas).
- **Flashcards queda fuera de esta ronda**: todavía no existe una página de detalle de mazo individual. Anota en `docs/PENDIENTES.md` que se agregará favoritos ahí cuando exista esa página.
- Los tipos que sí entran ahora: Lecciones en video, Podcast, Webtoon, Cultura, Quizzes.

## Separa el trabajo en varios commits, en este orden
1. `feat: crea modulo favoritos.js con guardado en localStorage`
2. `feat: agrega boton de favorito en leccion-detalle y episodio-detalle`
3. `feat: agrega boton de favorito en webtoon-lector y cultura-lector`
4. `feat: agrega boton de favorito en quiz-detalle`
5. `feat: crea pagina favoritos.html con panel y filtros por categoria`
6. `feat: agrega enlace de favoritos al sidebar`
7. `docs: documenta el sistema de favoritos y actualiza pendientes y contexto`

---

## 1. `src/scripts/favoritos.js` — módulo compartido
```javascript
const CLAVE = 'parla-favoritos';

export function obtenerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

export function esFavorito(tipo, id) {
  return obtenerFavoritos().some(f => f.tipo === tipo && f.id === id);
}

export function alternarFavorito(item) {
  // item: { tipo, id, titulo, subtitulo, imagen, url }
  const favoritos = obtenerFavoritos();
  const indice = favoritos.findIndex(f => f.tipo === item.tipo && f.id === item.id);
  if (indice >= 0) {
    favoritos.splice(indice, 1);
  } else {
    favoritos.push({ ...item, fechaGuardado: new Date().toISOString() });
  }
  localStorage.setItem(CLAVE, JSON.stringify(favoritos));
  return indice < 0; // true si se agregó, false si se quitó
}
```
Envuelve `localStorage` en `try/catch` siempre — si está bloqueado o lleno, no debe romper la página, solo fallar silenciosamente.

## 2. Botón de favorito en cada página de detalle
En `leccion-detalle.html`, `episodio-detalle.html`, `webtoon-lector.html` (favorito por episodio completo), `cultura-lector.html` (favorito por capítulo completo), y `quiz-detalle.html`, agrega junto al título:

```html
<button class="favorito-toggle" aria-label="Agregar a favoritos">
  <i class="fa-regular fa-star"></i>
</button>
```
```javascript
import { esFavorito, alternarFavorito } from '../scripts/favoritos.js';

const item = {
  tipo: 'leccion', // 'podcast' | 'webtoon' | 'cultura' | 'quiz' segun la pagina
  id: idActual,
  titulo: contenido.titulo,
  subtitulo: '...', // texto corto descriptivo segun el tipo
  imagen: '...', // ruta a una imagen representativa, usa placeholder si no hay
  url: 'leccion-detalle.html?id=' + idActual,
};

function actualizarIconoFavorito() {
  const activo = esFavorito(item.tipo, item.id);
  const icono = document.querySelector('.favorito-toggle i');
  icono.classList.toggle('fa-regular', !activo);
  icono.classList.toggle('fa-solid', activo);
}

actualizarIconoFavorito();

document.querySelector('.favorito-toggle').addEventListener('click', () => {
  alternarFavorito(item);
  actualizarIconoFavorito();
});
```
El ícono de estrella cambia de contorno (`fa-regular`) a relleno (`fa-solid`) según esté guardado o no — usa `--color-primary` o un dorado/ámbar para el estado activo, consistente con la paleta.

## 3. `src/views/favoritos.html`
Estructura, de arriba a abajo:

1. **Encabezado**: "Mis favoritos" + descripción corta.
2. **Barra horizontal de categorías**: "Todos", "Lecciones", "Podcast", "Webtoon", "Cultura", "Quizzes" — pestañas tipo botón, la activa resaltada con `--color-primary`, filtran la lista de abajo sin recargar la página.
3. **Lista de favoritos**: lee `obtenerFavoritos()`, filtra según la pestaña activa, y muestra cada uno como una fila: miniatura (`imagen`), título, subtítulo, etiqueta del tipo, fecha guardado (formateada tipo "Guardado el 12/05/2026"), y una estrella rellena a la derecha — al hacer clic en la estrella, se quita de favoritos y la fila desaparece de la lista al instante.
4. **Estado vacío**: si no hay favoritos (en general, o en la categoría seleccionada), muestra un mensaje simple ("Aún no tienes favoritos guardados aquí") en vez de una lista en blanco.

Cada fila de la lista, al hacer clic (fuera de la estrella), navega a la `url` guardada del ítem.

## 4. Enlace en el sidebar
Agrega "Favoritos" a la lista de enlaces del sidebar (`fa-star` como ícono), apuntando a `favoritos.html`.

## Verificación
- Marcar/desmarcar favorito en cualquiera de las 5 páginas de detalle actualiza el ícono al instante y persiste al recargar la página.
- `favoritos.html` muestra todo lo guardado, con las pestañas filtrando correctamente por tipo.
- Quitar un favorito desde el panel lo saca también de la página de detalle original (verifica volviendo a esa página).
- Si `localStorage` está vacío, se ve el estado vacío, no un error.

## Documentación
- `docs/GUIA-PROYECTO.md`: agrega `favoritos.html` y `favoritos.js`.
- `docs/guia-componentes.md`: documenta `.favorito-toggle`, las pestañas de categoría, y el estado vacío.
- `docs/decisiones-tecnicas.md`: por qué favoritos usa `localStorage` (a diferencia del progreso, que es solo visual) — es una colección curada por el usuario, sin persistencia no cumple su función.
- `docs/PENDIENTES.md`: agrega "favoritos en Flashcards, cuando exista página de detalle de mazo".
- `CHANGELOG.md`: una entrada por cada commit de la lista de arriba.
- `docs/CONTEXTO.md`: actualiza estado.
