# Tareas pendientes — Parla!

- [x] **Inicio del estudiante** — Construir la pantalla principal del estudiante con las 6 tarjetas (Lecciones, Podcast, Webtoon, Cultura, Flashcards, Quizzes). Completado: header de usuario autenticado, grid de tarjetas, cada tarjeta enlaza a su página (aún sin construir).
- [x] **Páginas placeholder (6)** — Páginas individuales creadas con marcador de posición y navegación continua. Pendiente desarrollar el contenido real de cada una:
  - `src/views/video.html` — desarrollar contenido de lecciones en video
  - `src/views/podcast.html` — desarrollar contenido de podcast con transcripción
  - `src/views/webtoon.html` — desarrollar contenido de webtoons ilustrados
  - `src/views/cultura.html` — desarrollar contenido de cultura italiana
  - `src/views/flashcards.html` — desarrollar sistema de flashcards
  - `src/views/quizzes.html` — desarrollar sistema de quizzes
- [x] **Página de Contactos** — Construida (`src/views/contacto.html`) con número de teléfono y botón de WhatsApp. Fue una ampliación de alcance solicitada por el cliente.
- [ ] **Retomar el glow de "Lecciones en video"** — El spec `docs/specs/prompt-eliminar-card-featured.md` ordena eliminar por completo el efecto `.card--featured` (glow) por romper el renderizado de la tarjeta, pero **el spec nunca se aplicó**: el glow sigue activo en el código (`inicio.html:79` + `styles.css` + tokens `--glow-clr-*`). Decisión: si se retoma, prototipar en una página aislada antes de aplicarlo directo al grid de producción.
- [ ] **Barra de progreso** — Agregar barra de progreso general en el dashboard de inicio.
- [ ] **Favoritos** — Implementar sistema de favoritos en las tarjetas.
- [ ] **Fuente Hatton** — Esperando que el cliente entregue el archivo real de la fuente Hatton para reemplazar el placeholder Fraunces.
- [ ] **@property CSS** — La técnica de glow actual usa `@property --gradient-angle` para interpolar suavemente el ángulo del degradado. Si algún navegador de prueba no lo soporta, el degradado se ve igual pero la animación salta en vez de ser continua (sin interpolación suave). Evaluar si es necesario un polyfill o fallback cuando se amplíe el soporte de navegadores.