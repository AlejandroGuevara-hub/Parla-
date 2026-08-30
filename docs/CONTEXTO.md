# Contexto del Proyecto — Parla!

## Qué es
Plataforma web para aprender italiano. Público: 20-25 años. Debe sentirse moderna y fácil de usar.

## Fase actual
Fase 1: solo interfaz y navegación. Sin backend, sin base de datos, sin autenticación real, sin panel admin.

## Estado de avance
- [x] Landing Page — hero con fondo real, logo, copy actualizado
- [x] Login (maqueta visual)
- [x] Registro (maqueta visual)
- [x] Selector de tema claro/oscuro flotante con persistencia
- [x] Inicio del estudiante (6 tarjetas con imágenes reales del cliente)
- [x] Páginas de contenido (5) — Lecciones, Podcast, Cultura, Flashcards, Quizzes con banner, listas/grids, estados y datos JSON
- [x] Página de detalle de lección (plantilla dinámica `leccion-detalle.html?id=...`)
- [x] Página de detalle de episodio (plantilla dinámica `episodio-detalle.html?id=...`, reproductor y transcripción simulados)
- [x] Webtoon (placeholder — pendiente definición de contenido)
- [x] Página de Perfil de ejemplo (avatar, stats, info, preferencias — sin funcionalidad real)
- [x] Página de Contactos con WhatsApp, fondo e ícono del cliente
- [x] Animaciones de entrada tipo flotar en todas las vistas (ampliadas a más elementos + fade de body)
- [x] Sidebar de navegación vertical (fijo, drawer en móvil) en vistas autenticadas (excepto Landing, Login y Registro)
- [ ] Contenido real de Webtoon
- [ ] Barra de progreso
- [ ] Favoritos

## Dónde está cada cosa
- Tokens de diseño: `src/styles/variables.css`
- Componentes reutilizables: `src/styles/components.css`; estilos de página: `src/styles/styles.css`
- Scripts: `src/scripts/nav.js` (header móvil + `data-navegar`), `src/scripts/sidebar.js` (drawer), `src/scripts/theme.js` (tema), `src/scripts/animations.js` (entradas/parallax/imágenes)
- Imágenes del sitio: `src/assets/images/` (logo, hero, fondos, fotos de las 6 tarjetas, contacto)
- Recursos visuales del cliente: `reference/Diego-pagina web/`
- Especificaciones/alcances de cada bloque y fix: `docs/specs/`
- Fixes aplicados: ver `CHANGELOG.md`
- Decisiones técnicas y por qué: `docs/decisiones-tecnicas.md`
- Errores ya cometidos (no repetir): `docs/ERRORES.md`
- Qué hace cada componente/archivo: `docs/GUIA-PROYECTO.md`
- Motion design (obligatorio para todo bloque nuevo): `docs/GUIA-ANIMACIONES.md`
- Tareas pendientes: `docs/PENDIENTES.md`
- Instrucciones de proceso (no son specs): `prompts/`

## Reglas fijas que no cambian
- No inventar colores/tipografías fuera de `src/styles/variables.css`.
- Hatton es un placeholder (Fraunces) hasta recibir el archivo real de fuente.
- Todo cambio se documenta y se sube a GitHub (ver `prompts/prompt-commits-github.md`).
- Todo bloque nuevo (sección, componente o página) debe seguir `docs/GUIA-ANIMACIONES.md` (sistema de motion design del proyecto) automáticamente, sin que se lo pidan de nuevo.

## Última actualización
2026-08-08 — Página de detalle de episodio (`episodio-detalle.html?id=`) como plantilla dinámica: portada placeholder, reproductor y transcripción simulados (skeleton). Episodios de `podcast.html` enlazan a su detalle. CHANGELOG 1.19.17.
