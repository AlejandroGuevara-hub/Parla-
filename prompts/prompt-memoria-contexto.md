# Prompt — Memoria de Contexto entre Sesiones

Vas a trabajar en este proyecto en múltiples sesiones distintas. No puedes releer todo el proyecto cada vez que empiezas: es lento y gastas contexto en cosas que ya sabes. En su lugar, sigue este protocolo.

## Al iniciar cualquier sesión
1. Busca y lee ÚNICAMENTE el archivo `docs/CONTEXTO.md` en la raíz del proyecto. Ese archivo es tu resumen rápido: qué es el proyecto, en qué fase vas, qué está hecho, qué falta, y dónde está cada cosa importante.
2. Si `docs/CONTEXTO.md` no existe todavía, créalo ahora mismo con esta plantilla y complétalo con lo que encuentres explorando el proyecto una sola vez:

```markdown
# Contexto del Proyecto — Parla!

## Qué es
Plataforma web para aprender italiano. Público: 20-25 años. Debe sentirse moderna y fácil de usar.

## Fase actual
Fase 1: solo interfaz y navegación. Sin backend, sin base de datos, sin autenticación real, sin panel admin.

## Estado de avance
- [x] Landing Page — hero con fondo real, logo, copy actualizado
- [ ] Login (maqueta)
- [ ] Registro (maqueta)
- [ ] Inicio del estudiante (6 tarjetas)
- [ ] Podcast / Video / Webtoon / Cultura / Flashcards / Quizzes
- [ ] Favoritos

## Dónde está cada cosa
- Tokens de diseño: `src/styles/variables.css`
- Recursos visuales del cliente: `reference/Diego-pagina web/`
- Especificaciones de cada bloque: `docs/specs/`
- Fixes aplicados: ver `CHANGELOG.md`
- Decisiones técnicas y por qué: `docs/decisiones-tecnicas.md`
- Errores ya cometidos (no repetir): `docs/ERRORES.md`
- Qué hace cada componente/archivo: `docs/GUIA-PROYECTO.md`

## Reglas fijas que no cambian
- No inventar colores/tipografías fuera de `src/styles/variables.css`.
- Hatton es un placeholder (Fraunces) hasta recibir el archivo real de fuente.
- Todo cambio se documenta y se sube a GitHub (ver `docs/COMMITS.md`).

## Última actualización
(fecha y qué se hizo en la última sesión)
```

3. Solo si la tarea que te piden lo requiere, abre los archivos específicos mencionados en "Dónde está cada cosa". No abras todo el proyecto por defecto.

## Al terminar cualquier sesión (sin excepción)
Antes de dar la tarea por completada, actualiza `docs/CONTEXTO.md`:
- Marca en "Estado de avance" lo que se completó.
- Actualiza "Última actualización" con la fecha y un resumen de 1-2 líneas de lo que hiciste.
- Si agregaste una regla fija nueva (ej: una nueva convención), añádela a "Reglas fijas".

## Regla general de documentación viva
Cualquier cosa que agregues, cambies o elimines en el proyecto (un archivo, un componente, una decisión de diseño, una carpeta) se refleja de inmediato en la documentación correspondiente. Nunca dejes un cambio sin documentar para "después". Si no tienes tiempo de documentar algo en detalle, al menos deja una línea en `CHANGELOG.md` para que no se pierda el rastro.
