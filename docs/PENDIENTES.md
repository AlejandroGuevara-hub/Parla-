# Tareas pendientes — Parla!

- [x] **Inicio del estudiante** — Construir la pantalla principal del estudiante con las 6 tarjetas (Lecciones, Podcast, Webtoon, Cultura, Flashcards, Quizzes). Completado: header de usuario autenticado, grid de tarjetas, cada tarjeta enlaza a su página (aún sin construir).
- [x] **Páginas placeholder (6)** — Páginas individuales creadas con marcador de posición y navegación continua. Pendiente desarrollar el contenido real de cada una:
  - `src/views/video.html` — **COMPLETADO**: banner + acordeón de módulos/lecciones con estados.
  - `src/views/podcast.html` — **COMPLETADO**: banner + lista de episodios con estados y transcripción.
  - `src/views/webtoon.html` — **PLACEHOLDER**: definir contenido (formato webtoon ilustrado pendiente).
  - `src/views/cultura.html` — **COMPLETADO**: banner + lista de temas con estados.
  - `src/views/flashcards.html` — **COMPLETADO**: banner + grid de mazos con barra de progreso.
  - `src/views/quizzes.html` — **COMPLETADO**: banner + lista de quizzes con estados y puntaje.
- [ ] **Conectar audio real y transcripción real por episodio cuando el cliente los entregue** — El reproductor y la transcripción en `episodio-detalle.html` son simulados (botón de play visual, barra en 0%, transcripción con skeleton).
- [ ] **Conectar video real en leccion-detalle.html** — El reproductor de video de la página de detalle de lección es un placeholder visual (ícono de play); falta integrar los archivos de video reales cuando el cliente los entregue.
- [ ] **Definir contenido de Webtoon** — Sección pendiente de diseño y datos (formato webtoon ilustrado). Mantener como placeholder hasta que se defina.
- [ ] **Retomar el glow de "Lecciones en video"** — El spec `docs/specs/prompt-eliminar-card-featured.md` ordena eliminar por completo el efecto `.card--featured` (glow) por romper el renderizado de la tarjeta, pero **el spec nunca se aplicó**: el glow sigue activo en el código (`inicio.html:79` + `styles.css` + tokens `--glow-clr-*`). Decisión: si se retoma, prototipar en una página aislada antes de aplicarlo directo al grid de producción.
- [ ] **Barra de progreso** — Agregar barra de progreso general en el dashboard de inicio.
- [ ] **Favoritos** — Implementar sistema de favoritos en las tarjetas.
- [ ] **Fuente Hatton** — Esperando que el cliente entregue el archivo real de la fuente Hatton para reemplazar el placeholder Fraunces.
- [ ] **Perfil: conectar edición real y guardado de preferencias cuando exista backend**.
- [ ] **@property CSS** — La técnica de glow actual usa `@property --gradient-angle` para interpolar suavemente el ángulo del degradado. Si algún navegador de prueba no lo soporta, el degradado se ve igual pero la animación salta en vez de ser continua (sin interpolación suave). Evaluar si es necesario un polyfill o fallback cuando se amplíe el soporte de navegadores.