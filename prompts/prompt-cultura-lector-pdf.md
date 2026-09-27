# Feature — Lector de PDF para Cultura (con PDF.js)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Sigue el patrón de plantilla dinámica ya usado en `docs/specs/prompt-plantilla-leccion-detalle.md`.

## Decisiones ya tomadas (no las vuelvas a preguntar)
- Se agrega **PDF.js** vía CDN (primera dependencia externa del proyecto) para poder dibujar el PDF en un `<canvas>` propio y construir controles 100% personalizados (zoom, navegación, capítulos) — un `<iframe>` con el visor nativo del navegador no permite este nivel de control visual.
- El cliente tiene un PDF real para usar como contenido de ejemplo.
- El progreso mostrado (capítulos completados, secciones completadas) es visual, con datos fijos de ejemplo en el JSON — no hay tracking real de lectura, mismo criterio que el resto del proyecto en esta fase.

## Separa el trabajo en varios commits, en este orden
1. `feat: agrega pdf.js via cdn y configura el worker`
2. `feat: extiende cultura.json con capitulos, secciones y ruta al pdf`
3. `feat: crea pagina cultura-lector.html con renderizado de pdf en canvas`
4. `feat: agrega controles de zoom y navegacion de pagina`
5. `feat: agrega sidebar de capitulos y secciones con navegacion a pagina especifica`
6. `feat: agrega barra de progreso visual con datos de ejemplo`
7. `feat: conecta cultura.html con cultura-lector.html`
8. `docs: documenta el lector de pdf y actualiza pendientes y contexto`

---

## 1. Agrega PDF.js vía CDN
En `cultura-lector.html` (no en las demás páginas, solo donde se usa):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.js"></script>
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
</script>
```
Verifica la versión más reciente estable disponible en cdnjs al momento de implementar, y usa esa (no una vieja al azar).

## 2. Ubicación del PDF real
El cliente va a colocar el archivo en `src/assets/cultura/` (ej. `src/assets/cultura/capitulo-1-storie-tradizioni.pdf`). No lo generes ni lo inventes — solo referencia esa ruta en el JSON, el archivo lo pone el cliente directamente en esa carpeta.

## 3. Extiende `src/data/cultura.json`
Reemplaza la lista plana de `temas` que existía antes por una estructura de capítulos con secciones adentro (mismo espíritu que `lecciones.json`, con módulos y lecciones):

```json
{
  "capitulos": [
    {
      "id": "c1",
      "titulo": "Capitolo 1",
      "subtitulo": "Storie e Tradizioni",
      "archivoPdf": "cultura/capitulo-1-storie-tradizioni.pdf",
      "capitulosCompletados": 1,
      "capitulosTotal": 5,
      "secciones": [
        { "id": "s1", "titulo": "1.1 L'eredità orale", "pagina": 3, "estado": "completado" },
        { "id": "s2", "titulo": "1.2 Miti del Mediterraneo", "pagina": 7, "estado": "pendiente" },
        { "id": "s3", "titulo": "1.3 Rituali e Calendari Festivi", "pagina": 11, "estado": "pendiente" },
        { "id": "s4", "titulo": "1.4 L'eredità orale", "pagina": 15, "estado": "pendiente" }
      ]
    }
  ]
}
```
Ajusta los números de página (`pagina`) según el PDF real que ponga el cliente — son solo de ejemplo acá.

## 4. `src/views/cultura-lector.html`
URL: `cultura-lector.html?id=c1`. Estructura, de arriba a abajo:

1. **Breadcrumb**: "Cultura > [subtítulo del capítulo]", con "Cultura" como link de vuelta a `cultura.html`.
2. **Barra de controles** (sticky arriba del contenido):
   - Zoom: botones `-` / `+` con el porcentaje actual al medio.
   - Botón de pantalla completa (usa la Fullscreen API del navegador).
   - Navegación de página: flecha anterior, input numérico editable con la página actual, "/ total de páginas", flecha siguiente.
3. **Área del PDF**: un `<canvas>` donde PDF.js dibuja la página actual.
4. **Sidebar de secciones** (a la derecha en escritorio, debajo o como drawer en móvil): lista de las secciones del capítulo (1.1, 1.2, etc.), cada una con un ícono de estado (completado/pendiente, mismo estilo ya usado en Lecciones). Al hacer clic en una sección, salta directo a su `pagina` en el PDF.
5. **Barra de progreso inferior**: "X de Y capítulos completados" y, aparte, "Progreso del capítulo: X de Y secciones completas" — ambos con los datos fijos del JSON, sin cálculo real.

### Lógica base de PDF.js
```javascript
let pdfDoc = null;
let paginaActual = 1;
let escala = 1.2;

pdfjsLib.getDocument(rutaDelPdf).promise.then(pdf => {
  pdfDoc = pdf;
  renderizarPagina(paginaActual);
});

function renderizarPagina(numero) {
  pdfDoc.getPage(numero).then(pagina => {
    const viewport = pagina.getViewport({ scale: escala });
    const canvas = document.querySelector('.pdf-canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const contexto = canvas.getContext('2d');
    pagina.render({ canvasContext: contexto, viewport });
  });
}
```
Los botones de zoom cambian `escala` y vuelven a llamar `renderizarPagina(paginaActual)`. Los botones de página anterior/siguiente cambian `paginaActual` (respetando los límites 1 y `pdfDoc.numPages`) y vuelven a renderizar. El clic en una sección del sidebar hace lo mismo, saltando directo al número de `pagina` de esa sección.

## Estilo visual
Usa los tokens ya existentes de `variables.css` (colores, tipografías, sombras) para la barra de controles y el sidebar — no uses el morado de la referencia, usa `--color-primary`. Los íconos (zoom, pantalla completa, flechas) van con Font Awesome, consistente con el resto del proyecto.

## Responsive
En móvil, el sidebar de secciones se comporta como drawer (mismo patrón ya usado en el sidebar principal de navegación) en vez de estar fijo al costado — el PDF necesita todo el ancho disponible en pantallas chicas.

## 5. Conecta `cultura.html`
Actualiza la lista de `cultura.html` para mostrar los capítulos (ya no "temas" sueltos) y enlazar cada uno a `cultura-lector.html?id=<su-id>`.

## Verificación
- El PDF real del cliente se ve correctamente dentro del `<canvas>`, con controles de zoom funcionando.
- La navegación de página (flechas + input numérico) funciona y no se pasa de los límites del documento.
- Al hacer clic en una sección del sidebar, salta a la página correcta del PDF.
- Pantalla completa funciona y se puede salir de ella.
- En móvil, el sidebar de secciones se abre como drawer, no rompe el layout.

## Documentación
- `docs/GUIA-PROYECTO.md`: agrega `cultura-lector.html` y explica que usa PDF.js.
- `docs/guia-componentes.md`: documenta la barra de controles, el sidebar de secciones y sus estilos.
- `docs/decisiones-tecnicas.md`: por qué se agregó PDF.js como primera dependencia externa (necesaria para controles personalizados que un `<iframe>` nativo no permite), y por qué se carga desde CDN en vez de instalarse localmente (consistente con Font Awesome, ya cargado igual).
- `docs/PENDIENTES.md`: si el PDF real del cliente todavía no está en `src/assets/cultura/`, anótalo como pendiente.
- `CHANGELOG.md`: una entrada por cada commit de la lista de arriba.
- `docs/CONTEXTO.md`: actualiza estado.
