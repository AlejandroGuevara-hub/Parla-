# Feature — Webtoons: Lista de Episodios + Lector con Scroll

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Sigue el patrón de plantilla dinámica ya usado en `docs/specs/prompt-plantilla-leccion-detalle.md`.

## Decisiones ya tomadas (no las vuelvas a preguntar)
- El diálogo va quemado en la imagen de cada panel (no hay capa de texto HTML superpuesta, no hay traducción interactiva por ahora).
- Cada panel lleva un `alt` de accesibilidad con el texto transcrito, para lectores de pantalla — esto no cambia el diseño visual, es solo el atributo `alt` de la imagen.
- Los paneles cargan con `loading="lazy"` para no traer todo el episodio de golpe.
- La barra de progreso de lectura es visual y de sesión — se reinicia al recargar, no se guarda en ningún lado.
- No hay imágenes reales todavía para los paneles — usa el mismo criterio que en Podcast: si no hay archivo real, dilo en `docs/PENDIENTES.md` y usa un placeholder visual (un bloque con el ícono de webtoon) en su lugar, no inventes ni busques imágenes.

## Separa el trabajo en varios commits, en este orden
1. `feat: agrega episodios y paneles de ejemplo a webtoon.json`
2. `feat: construye lista de episodios en webtoon.html`
3. `feat: crea pagina webtoon-lector.html con scroll de paneles`
4. `feat: agrega lazy-load y animacion de entrada por panel`
5. `feat: agrega barra de progreso de lectura visual`
6. `feat: agrega navegacion entre episodios`
7. `docs: documenta el sistema de webtoons y actualiza pendientes y contexto`

---

## 1. `src/data/webtoon.json`
```json
{
  "continuar": { "episodioTitulo": "Episodio 1 · Pidiendo direcciones" },
  "episodios": [
    {
      "id": "w1",
      "titulo": "Episodio 1 · Pidiendo direcciones",
      "estado": "pendiente",
      "paneles": [
        { "id": "p1", "imagen": "webtoon/w1-panel-01.jpg", "alt": "Un chico pregunta en italiano: ¿Dónde está la estación?" },
        { "id": "p2", "imagen": "webtoon/w1-panel-02.jpg", "alt": "Una chica responde: Derecho y luego a la izquierda." },
        { "id": "p3", "imagen": "webtoon/w1-panel-03.jpg", "alt": "El chico dice: Muchas gracias." },
        { "id": "p4", "imagen": "webtoon/w1-panel-04.jpg", "alt": "La chica responde: De nada, hasta pronto." }
      ]
    }
  ]
}
```
Si no existen todavía los archivos de imagen reales en `src/assets/webtoon/`, cada panel debe mostrar un placeholder visual (bloque con degradado + ícono de libro/webtoon, mismo criterio que se usó para el placeholder de imagen de Podcast) en vez de una imagen rota.

## 2. `webtoon.html` — lista de episodios
Misma estructura que ya tienen Podcast/Cultura: banner "Continuar" + lista de episodios con estado (leído/en progreso/pendiente), cada uno enlazando a `webtoon-lector.html?id=<su-id>`.

## 3. `src/views/webtoon-lector.html` — el lector
URL: `webtoon-lector.html?id=w1`. Hace `fetch()` de `webtoon.json`, busca el episodio por `id`, y renderiza sus paneles en orden, uno debajo del otro, en una columna centrada de ancho fijo (como un cómic vertical real, no a todo el ancho de la pantalla en escritorio):

```html
<figure class="webtoon-panel">
  <img src="../assets/webtoon/w1-panel-01.jpg" alt="Un chico pregunta en italiano: ¿Dónde está la estación?" loading="lazy" class="animate-in">
</figure>
```

- Cada `.webtoon-panel` usa el sistema `.animate-in` ya existente (fade + flotar al entrar en pantalla), aplicado individualmente a cada panel a medida que se hace scroll — no todos de una vez.
- `loading="lazy"` en cada `<img>`, sin excepción.
- Ancho máximo del panel: usa un valor cómodo para lectura (ej. `max-width: 500px`, centrado), no ocupa toda la pantalla en escritorio.

## 4. Barra de progreso de lectura (visual, de sesión)
Fija en la parte superior de la página (debajo del sidebar si aplica), se llena según cuánto se ha scrolleado dentro del episodio:

```javascript
window.addEventListener('scroll', () => {
  const contenedor = document.querySelector('.webtoon-paneles');
  const scrollTotal = contenedor.scrollHeight - window.innerHeight;
  const scrollActual = window.scrollY;
  const porcentaje = Math.min(100, Math.max(0, (scrollActual / scrollTotal) * 100));
  document.querySelector('.webtoon-progreso__barra').style.width = `${porcentaje}%`;
});
```
No se guarda en `localStorage` ni en ningún lado — al recargar la página vuelve a 0%.

## 5. Navegación entre episodios
Al final del episodio (después del último panel): botones "← Episodio anterior" / "Episodio siguiente →" según el orden en `webtoon.json`, y un botón para volver a `webtoon.html`. Mismo criterio que en lecciones/podcast/quiz.

## Verificación
- Al abrir un episodio, los paneles se van revelando con la animación de entrada mientras se hace scroll, no aparecen todos de golpe.
- La barra de progreso sube conforme se hace scroll y llega a 100% al final del episodio.
- Recargar la página reinicia la barra a 0% (confirma que no se guardó nada).
- Un episodio nuevo agregado a `webtoon.json` (con sus paneles) funciona automáticamente en `webtoon-lector.html`, sin tocar código.
- Si faltan imágenes reales, se ve el placeholder visual, nunca una imagen rota.

## Documentación
- `docs/GUIA-PROYECTO.md`: agrega `webtoon-lector.html` y `src/data/webtoon.json`.
- `docs/guia-componentes.md`: documenta `.webtoon-panel`, la barra de progreso de lectura, y el placeholder de panel sin imagen.
- `docs/decisiones-tecnicas.md`: por qué el diálogo va quemado en la imagen (decisión del cliente, evita problemas de posicionamiento de texto sobre imagen) y por qué se mantiene el `alt` de accesibilidad aunque no haya texto interactivo.
- `docs/PENDIENTES.md`: agrega "reemplazar placeholders por arte real de los paneles de webtoon".
- `CHANGELOG.md`: una entrada por cada commit de la lista de arriba.
- `docs/CONTEXTO.md`: actualiza estado.
