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
- [x] Animaciones de entrada tipo flotar en todas las vistas (ampliadas a más elementos + fade de body)
- [x] Página de Contactos con WhatsApp, fondo e ícono del cliente
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
- Motion design (obligatorio para todo bloque nuevo): `docs/GUIA-ANIMACIONES.md`
- Tareas pendientes: `docs/PENDIENTES.md`

## Reglas fijas que no cambian
- No inventar colores/tipografías fuera de `src/styles/variables.css`.
- Hatton es un placeholder (Fraunces) hasta recibir el archivo real de fuente.
- Todo cambio se documenta y se sube a GitHub (ver `prompts/prompt-commits-github.md`).
- Todo bloque nuevo (sección, componente o página) debe seguir `docs/GUIA-ANIMACIONES.md` (sistema de motion design del proyecto) automáticamente, sin que se lo pidan de nuevo.

## Última actualización
2026-07-31 — Adopta `docs/GUIA-ANIMACIONES.md` como estándar permanente de motion design para todo bloque nuevo.
