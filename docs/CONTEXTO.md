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
- [x] Inicio del estudiante (6 tarjetas)
- [x] Páginas placeholder (6) — con navegación completa
- [ ] Contenido real de cada sección (video, podcast, webtoon, cultura, flashcards, quizzes)
- [ ] Barra de progreso
- [ ] Favoritos

## Dónde está cada cosa
- Tokens de diseño: `src/styles/variables.css`
- Recursos visuales del cliente: `reference/Diego-pagina web/`
- Especificaciones de cada bloque: `docs/specs/`
- Fixes aplicados: ver `CHANGELOG.md`
- Decisiones técnicas y por qué: `docs/decisiones-tecnicas.md`
- Errores ya cometidos (no repetir): `docs/ERRORES.md`
- Qué hace cada componente/archivo: `docs/GUIA-PROYECTO.md`
- Tareas pendientes: `docs/PENDIENTES.md`

## Reglas fijas que no cambian
- No inventar colores/tipografías fuera de `src/styles/variables.css`.
- Hatton es un placeholder (Fraunces) hasta recibir el archivo real de fuente.
- Todo cambio se documenta y se sube a GitHub (ver `prompts/prompt-commits-github.md`).

## Última actualización
2026-07-20 — Crea 6 páginas placeholder para las secciones (video, podcast, webtoon, cultura, flashcards, quizzes) con header de usuario, marcador de posición y botón de volver. Conecta las tarjetas de Inicio como hipervínculos reales a cada página.
