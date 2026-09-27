# Feature — Página de Detalle de Episodio (Podcast)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Sigue el mismo patrón de `docs/specs/prompt-plantilla-leccion-detalle.md`: una sola página plantilla + parámetro de URL, no un archivo por episodio.

## Archivo nuevo
`src/views/episodio-detalle.html`

## Cómo funciona
Igual que la lección: URL con parámetro `episodio-detalle.html?id=e1`, la página hace `fetch()` de `src/data/podcast.json`, busca el episodio por `id` dentro del array `episodios`, y renderiza su contenido. Si no lo encuentra, muestra "Episodio no encontrado" con botón para volver a `podcast.html`.

## Todo es simulado — solo formas gráficas, sin contenido ni audio real
Orden de arriba hacia abajo:

### 1. Imagen relacionada al audio
No hay fotos reales por episodio todavía. Usa un bloque gráfico (no una foto): una tarjeta con fondo en degradado usando los colores ya existentes del proyecto, con un ícono grande de Font Awesome al centro (audífonos o nota musical, `fa-headphones` o `fa-music`), a modo de placeholder visual — no busques ni inventes una imagen real por episodio.

```html
<div class="episodio-imagen-placeholder">
  <i class="fa-solid fa-headphones"></i>
</div>
```
```css
.episodio-imagen-placeholder {
  width: 100%;
  height: 240px;
  border-radius: var(--radius-card);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.episodio-imagen-placeholder i {
  font-size: 4rem;
  color: white;
  opacity: 0.9;
}
```

### 2. Botón y reproductor de audio (simulado)
No hay archivo de audio real — todo es visual. El botón de play/pausa cambia de ícono al hacer clic, pero no reproduce nada:

```html
<div class="reproductor-simulado">
  <button class="reproductor-simulado__play" aria-label="Reproducir">
    <i class="fa-solid fa-play"></i>
  </button>
  <div class="reproductor-simulado__barra">
    <div class="reproductor-simulado__progreso"></div>
  </div>
  <span class="reproductor-simulado__duracion">0:00 / <span data-duracion></span></span>
</div>
```
```javascript
const boton = document.querySelector('.reproductor-simulado__play');
const icono = boton.querySelector('i');
let reproduciendo = false;

boton.addEventListener('click', () => {
  reproduciendo = !reproduciendo;
  icono.classList.toggle('fa-play', !reproduciendo);
  icono.classList.toggle('fa-pause', reproduciendo);
  // No hay audio real conectado — esto es solo el estado visual del botón.
});
```
La duración mostrada sale del campo `duracion` del episodio en el JSON. La barra de progreso queda visualmente en 0% (no avanza, no hay audio real que la mueva).

### 3. Transcripción (simulada con skeleton)
No hay transcripción real todavía. Usa el estilo de skeleton/shimmer ya documentado en `docs/GUIA-ANIMACIONES.md`, simulando varias líneas de texto, para dejar claro que es un espacio reservado, no texto real:

```html
<div class="transcripcion-placeholder">
  <div class="skeleton-line" style="width: 90%"></div>
  <div class="skeleton-line" style="width: 95%"></div>
  <div class="skeleton-line" style="width: 80%"></div>
  <div class="skeleton-line" style="width: 88%"></div>
</div>
```
Usa el mismo efecto shimmer ya definido para skeleton loading en el resto del proyecto, con la paleta existente.

## Navegación
Igual que en lecciones: botones "← Episodio anterior" / "Episodio siguiente →" según el orden del JSON, y un botón para volver a `podcast.html`.

## Conecta los enlaces desde la lista de episodios
En `podcast.html`, cada fila de episodio debe ser un link real, generado dinámicamente desde el mismo `podcast.json`:
```html
<a href="episodio-detalle.html?id=e1">Episodio 1 · Saludos</a>
```

## Verificación
- Al abrir cualquier episodio desde la lista, se ve: imagen placeholder con ícono, reproductor simulado (el botón cambia de play a pausa visualmente), y transcripción tipo skeleton.
- Un episodio nuevo agregado a `podcast.json` aparece automáticamente en la lista y ya tiene su página funcional, sin crear ningún archivo nuevo.
- Nada intenta reproducir audio real ni falla por buscar un archivo que no existe.

## Documentación
- `docs/GUIA-PROYECTO.md`: agrega `episodio-detalle.html`.
- `docs/guia-componentes.md`: documenta `.episodio-imagen-placeholder`, `.reproductor-simulado` y el uso de skeleton en la transcripción.
- `docs/PENDIENTES.md`: agrega "conectar audio real y transcripción real por episodio cuando el cliente los entregue".
- `docs/decisiones-tecnicas.md`: por qué se simula el reproductor y la transcripción en vez de dejarlos vacíos — mantiene la experiencia completa del prototipo sin contenido real.
- `CHANGELOG.md` bajo `Added`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`feat: agrega pagina de detalle de episodio con reproductor y transcripcion simulados`
