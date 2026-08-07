# Prompt — Releer la Documentación Antes de Trabajar

Antes de empezar cualquier tarea nueva (o retomar una sesión), relee la documentación para volver a entrar en contexto sin adivinar. No cambies nada todavía: primero lee, luego ejecuta.

## Qué leer antes de empezar (en este orden)

1. `docs/CONTEXTO.md` — resumen rápido: fase del proyecto, estado de avance, dónde está cada cosa y reglas fijas.
2. `docs/GUIA-PROYECTO.md` — qué hace cada archivo, carpeta y componente; patrones obligatorios de navegación.
3. `docs/guia-componentes.md` — catálogo de componentes reutilizables y dónde se usan.
4. `docs/ERRORES.md` — errores ya cometidos para no repetirlos.
5. `docs/decisiones-tecnicas.md` — por qué se eligieron las decisiones no obvias.
6. `docs/GUIA-ANIMACIONES.md` — sistema de motion design obligatorio para todo bloque nuevo.
7. `CHANGELOG.md` — qué se cambió recientemente y en qué versión está el proyecto.
8. `docs/PENDIENTES.md` — tareas a medias y dependencias del cliente.

Si la tarea tiene un spec propio en `docs/specs/` (por ejemplo `prompt-fix-sidebar-sin-login-registro.md`), léelo también: el spec es la fuente de verdad del alcance de esa tarea.

## Reglas
- Lee solo lo que la tarea requiere. No releas archivos que ya sabes que no cambian.
- IMPORTANTE: no ejecutes la tarea hasta haber leído `docs/CONTEXTO.md` y, si existe, su spec en `docs/specs/`.
- Solemne: los prompts de `prompts/` son instrucciones de proceso; los specs de `docs/specs/` son el alcance concreto de una tarea.
- Al terminar, la documentación debe quedar al día (ver `prompts/prompt-documentacion-completa.md` y `prompts/prompt-memoria-contexto.md`).