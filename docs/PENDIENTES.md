# Tareas pendientes — Parla!

## Fase 1 — COMPLETADA ✓
- [x] Landing Page — hero con fondo real, logo, copy actualizado
- [x] Login (maqueta visual) + Registro (maqueta visual) + flujo registro → login → inicio
- [x] Selector de tema claro/oscuro flotante con persistencia (localStorage)
- [x] Inicio del estudiante (6 tarjetas funcionales con imágenes reales del cliente)
- [x] Lecciones en video — banner + acordeón de módulos/lecciones con estados
- [x] Lección detalle — plantilla dinámica `leccion-detalle.html?id=...`
- [x] Podcast — banner + lista de episodios con play visual, duración, estado, transcripción
- [x] Episodio detalle — plantilla dinámica `episodio-detalle.html?id=...` (reproductor y transcripción simulados)
- [x] Webtoon — lista de episodios + lector `webtoon-lector.html?id=...` (paneles scroll vertical, lazy-load, animación, barra de progreso)
- [x] Cultura — lista de capítulos + lector `cultura-lector.html?id=...` (PDF.js, canvas, zoom, pantalla completa, sidebar secciones, barra de progreso)
- [x] Flashcards — banner + grid de mazos con barra de progreso
- [x] Quizzes — banner + lista de quizzes + quiz jugable `quiz-detalle.html?id=...` (quiz-engine.js)
- [x] Perfil — avatar, stats, info, preferencias (demo)
- [x] Contactos — fondo e ícono del cliente, WhatsApp
- [x] Sidebar navegación vertical (fijo en desktop, drawer en móvil) en vistas autenticadas
- [x] Sistema de favoritos (localStorage) — botón estrella en 5 páginas de detalle + `favoritos.html` con filtros
- [x] Animaciones de entrada (`.animate-in`), parallax hero, blur+fade imágenes, hover/focus
- [x] Documentación completa: CONTEXTO, GUIA-PROYECTO, guia-componentes, ERRORES, decisiones-tecnicas, GUIA-ANIMACIONES, PENDIENTES, CHANGELOG, README

## Fase 2 — Pendiente (requiere backend/base de datos)
- [ ] Autenticación real (login/registro con validación, JWT/sesión, recuperación de contraseña)
- [ ] Backend: API REST/GraphQL, base de datos (PostgreSQL/SQLite), almacenamiento de progreso y favoritos
- [ ] Panel administrativo: gestión de contenidos (CRUD lecciones, podcasts, webtoons, cultura, flashcards, quizzes), usuarios, estadísticas
- [ ] Contenido real: videos de lecciones, audio de podcast con transcripción real, arte de webtoons, PDFs de cultura
- [ ] Barra de progreso del estudiante persistente (sincronizada con backend)
- [ ] Sistema de favoritos con sincronización servidor
- [ ] Fuente Hatton real (reemplaza Fraunces placeholder)
- [ ] Conectar audio real en Podcast (botones de play funcionales + transcripción real)
- [ ] Conectar video real en leccion-detalle.html
- [ ] Reemplazar placeholders por arte real de los paneles de webtoon
- [ ] Perfil: conectar edición real y guardado de preferencias
- [ ] Temporizador real en quiz-detalle.html
- [ ] Guardar resultados de quiz (persistencia en backend)
- [ ] @property CSS: evaluar polyfill/fallback para navegadores sin soporte

## Dependencias del cliente (bloquean Fase 2)
- [ ] Archivo real de fuente Hatton
- [ ] Videos de lecciones
- [ ] Audio de podcast + transcripciones
- [ ] Arte real de webtoons (paneles)
- [ ] PDFs de cultura (ya hay uno de ejemplo en `src/assets/cultura/`)