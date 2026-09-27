# Feature — Contenido de Lecciones, Podcast, Cultura, Flashcards y Quizzes

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Decisiones ya tomadas (no las vuelvas a preguntar)
- Cada sección tiene un layout adaptado a su tipo de contenido, no un layout único repetido 5 veces.
- El contenido de ejemplo vive en archivos JSON dentro de `src/data/`, uno por sección.
- Los estados de progreso (completado / en curso / pendiente) son solo visuales, con datos fijos de ejemplo en el JSON — nada se guarda ni se actualiza con la interacción del usuario en esta fase.

## Nota de alcance
Esta tarea NO incluye Webtoon — sigue como placeholder ("en desarrollo") hasta que se defina su contenido por separado. Si no está ya en `docs/PENDIENTES.md`, agrégalo ahí.

## Cómo cargar los datos
Cada página hace `fetch()` de su propio JSON en `src/data/` y renderiza el contenido con JavaScript (no lo hardcodees directo en el HTML, así se puede ampliar después sin tocar la estructura). Como esto requiere servir el proyecto por HTTP (no abrir el HTML directo con `file://`, o `fetch` falla por CORS), documenta en `README.md` cómo levantar un servidor local simple para probar (por ejemplo `npx serve` o equivalente).

## Componente compartido: banner "Continuar"
Las 5 secciones (menos Webtoon) llevan arriba un banner destacado tipo "continúa donde quedaste", con el mismo estilo visual pero texto adaptado:
- Lecciones: "Continúa tu aprendizaje" → módulo y lección actual + barra de progreso % + botón "Continuar".
- Podcast: "Sigue escuchando" → episodio actual + botón "Reproducir".
- Cultura: "Sigue explorando" → tema actual + botón "Ver tema".
- Flashcards: "Repasa tu próximo mazo" → mazo sugerido + botón "Repasar".
- Quizzes: "Tu próximo quiz" → quiz sugerido + botón "Empezar".

Usa la paleta ya existente (`--color-primary` como acento del banner, no el morado de ninguna referencia previa) y el mismo componente de tarjeta/banner reutilizado en las 5, solo cambiando el texto y el ícono según la sección.

---

## 1. Lecciones en Video (`video.html`)
Estructura: banner "Continuar" + lista de módulos expandibles/colapsables (acordeón), cada módulo con lecciones adentro.

`src/data/lecciones.json`:
```json
{
  "continuar": { "moduloTitulo": "Módulo 2 · Lección 3", "detalle": "La hora y las expresiones de tiempo", "progreso": 65 },
  "modulos": [
    {
      "id": "m1",
      "titulo": "Módulo 1",
      "subtitulo": "¡Empecemos!",
      "estado": "completado",
      "lecciones": [
        { "id": "l1", "titulo": "Lección 1 · Saludos", "estado": "completado" },
        { "id": "l2", "titulo": "Lección 2 · Presentarse", "estado": "completado" },
        { "id": "l3", "titulo": "Lección 3 · Los artículos", "estado": "completado" }
      ]
    },
    {
      "id": "m2",
      "titulo": "Módulo 2",
      "subtitulo": "La vida cotidiana",
      "estado": "en-progreso",
      "lecciones": [
        { "id": "l4", "titulo": "Lección 1 · La familia", "estado": "completado" },
        { "id": "l5", "titulo": "Lección 2 · Los números", "estado": "completado" },
        { "id": "l6", "titulo": "Lección 3 · La hora", "estado": "en-progreso", "progreso": 65 },
        { "id": "l7", "titulo": "Lección 4 · El tiempo libre", "estado": "pendiente" }
      ]
    }
  ]
}
```
Íconos por estado: completado = check verde, en-progreso = círculo naranja (con % si aplica), pendiente = círculo vacío gris. Cada módulo tiene una insignia de estado ("Completado" / "En progreso") y una flecha para expandir/colapsar (esto sí es interacción de UI, no de datos — se puede abrir/cerrar sin que se guarde nada).

## 2. Podcast (`podcast.html`)
Estructura: banner "Continuar" + lista de episodios (no módulos, lista plana), cada uno con título, duración, ícono de reproducir, e indicador de si tiene transcripción.

`src/data/podcast.json`:
```json
{
  "continuar": { "episodioTitulo": "Episodio 4 · En el mercado", "duracion": "12:30" },
  "episodios": [
    { "id": "e1", "titulo": "Episodio 1 · Saludos", "duracion": "8:15", "estado": "escuchado", "transcripcion": true },
    { "id": "e2", "titulo": "Episodio 2 · En el café", "duracion": "10:02", "estado": "escuchado", "transcripcion": true },
    { "id": "e3", "titulo": "Episodio 3 · Pidiendo direcciones", "duracion": "9:40", "estado": "en-progreso", "transcripcion": true },
    { "id": "e4", "titulo": "Episodio 4 · En el mercado", "duracion": "12:30", "estado": "pendiente", "transcripcion": true }
  ]
}
```
Cada fila: ícono de play + título + duración + estado (escuchado/pendiente) a la derecha. El botón de play es visual, no necesita reproducir audio real en esta fase (no hay archivos de audio del cliente todavía) — déjalo como estado visual y anota en `docs/PENDIENTES.md` que falta conectar audio real.

## 3. Cultura (`cultura.html`)
Estructura: banner "Continuar" + lista de temas (como la tarjeta chica de referencia), cada uno con ícono, título y estado.

`src/data/cultura.json`:
```json
{
  "continuar": { "temaTitulo": "Tema 2 · Historia del Renacimiento" },
  "temas": [
    { "id": "t1", "titulo": "Tema 1 · Arte y pintura", "estado": "completado" },
    { "id": "t2", "titulo": "Tema 2 · Historia del Renacimiento", "estado": "en-progreso" },
    { "id": "t3", "titulo": "Tema 3 · Gastronomía italiana", "estado": "pendiente" }
  ]
}
```
Cada tema es una fila simple (sin acordeón, no tiene sub-lecciones): ícono de estado + título. Puede incluir un link "Ver todos" si la lista es más larga de lo que se muestra por defecto.

## 4. Flashcards (`flashcards.html`)
Estructura: banner "Continuar" + grid de mazos (no lista, tarjetas tipo grid como las de Inicio), cada mazo con título, cantidad de tarjetas, y cuántas domina el usuario (dato fijo de ejemplo).

`src/data/flashcards.json`:
```json
{
  "continuar": { "mazoTitulo": "Mazo 2 · Verbos comunes" },
  "mazos": [
    { "id": "mz1", "titulo": "Mazo 1 · Saludos y presentaciones", "totalTarjetas": 20, "dominadas": 20, "estado": "completado" },
    { "id": "mz2", "titulo": "Mazo 2 · Verbos comunes", "totalTarjetas": 30, "dominadas": 12, "estado": "en-progreso" },
    { "id": "mz3", "titulo": "Mazo 3 · Vocabulario de viaje", "totalTarjetas": 25, "dominadas": 0, "estado": "pendiente" }
  ]
}
```
Cada mazo muestra una barra de progreso (`dominadas / totalTarjetas`), igual visualmente a la barra del banner "Continuar" de Lecciones, para mantener consistencia.

## 5. Quizzes (`quizzes.html`)
Estructura: banner "Continuar" + lista de quizzes, cada uno con título, cantidad de preguntas, estado, y puntaje si ya se completó.

`src/data/quizzes.json`:
```json
{
  "continuar": { "quizTitulo": "Quiz · Módulo 2" },
  "quizzes": [
    { "id": "q1", "titulo": "Quiz · Módulo 1", "preguntas": 10, "estado": "completado", "puntaje": "9/10" },
    { "id": "q2", "titulo": "Quiz · Módulo 2", "preguntas": 10, "estado": "pendiente" },
    { "id": "q3", "titulo": "Quiz · Cultura general", "preguntas": 8, "estado": "pendiente" }
  ]
}
```

---

## Consistencia visual (aplica a las 5)
- Usa los tokens ya existentes de `variables.css` para colores, tipografías y espaciados — no inventes nuevos sin necesidad.
- Respeta el sidebar y el tema claro/oscuro ya implementados: verifica que el nuevo contenido se vea bien en ambos temas.
- Aplica el sistema de animaciones (`docs/GUIA-ANIMACIONES.md`): entrada con fade+flotar, stagger en las listas/grids, hover en mazos y tarjetas.

## Documentación
- `docs/GUIA-PROYECTO.md`: agrega los 5 archivos de `src/data/` y qué contiene cada uno.
- `docs/guia-componentes.md`: documenta el banner "Continuar", los ítems de lista con estado, y el grid de mazos de Flashcards.
- `docs/PENDIENTES.md`: agrega "conectar audio real en Podcast" y "definir contenido de Webtoon".
- `docs/decisiones-tecnicas.md`: por qué el contenido vive en JSON y se carga con `fetch()` en vez de estar hardcodeado.
- `CHANGELOG.md` bajo `Added`: "Construye el contenido de Lecciones, Podcast, Cultura, Flashcards y Quizzes con datos de ejemplo en JSON".
- `docs/CONTEXTO.md`: actualiza estado de avance.

## Commit
`feat: construye contenido de lecciones, podcast, cultura, flashcards y quizzes con datos json`
