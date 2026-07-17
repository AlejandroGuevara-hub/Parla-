# Prompt — Documentación Completa del Proyecto

Este proyecto necesita quedar completamente documentado en todo momento, de forma que cualquier programador nuevo (o tú mismo en una sesión futura) entienda todo sin tener que preguntar ni adivinar. Antes de continuar con cualquier tarea nueva, verifica que existan estos archivos en la carpeta `docs/` (créalos si faltan, con el contenido inicial indicado; si ya existen, no los dupliques, solo mantenlos actualizados):

## 1. `docs/ERRORES.md`
Registro de errores que ya se cometieron y cómo se corrigieron, para no repetirlos.
Formato por entrada:
```markdown
### [fecha] Título corto del error
**Qué pasó:** descripción del error.
**Por qué pasó:** causa raíz.
**Cómo se corrigió:** solución aplicada.
**Cómo evitarlo:** regla a seguir en adelante.
```
Cada vez que corrijas un bug o un malentendido de diseño, agrega una entrada aquí ANTES de dar la tarea por cerrada.

## 2. `docs/GUIA-PROYECTO.md`
Explica para qué sirve cada cosa del proyecto, pensado para alguien que nunca lo ha visto.
Debe incluir:
- Estructura de carpetas completa, con una línea explicando qué hay en cada una.
- Qué hace cada archivo `.css` y `.js`.
- Qué hace cada componente reutilizable (dónde está definido y dónde se usa).
- Cómo correr el proyecto localmente.
Actualiza esta guía cada vez que agregues un archivo, carpeta o componente nuevo.

## 3. `docs/decisiones-tecnicas.md` (si no existe, créalo)
Por qué se eligió cada cosa no obvia: por qué esa estructura, por qué ese reemplazo de fuente, por qué esa librería (si se usa alguna), por qué esa convención de nombres. Cada decisión con su justificación en 1-3 líneas.

## 4. `docs/guia-componentes.md` (si no existe, créalo)
Catálogo de componentes reutilizables: botones, tarjetas, barras de progreso, estados (pendiente/en proceso/completado), inputs. Por cada uno: nombre de la clase CSS, dónde está el código, capturas o descripción visual, y en qué páginas se usa.

## 5. `docs/PENDIENTES.md`
Lista de cosas que quedaron a medias, dudas sin resolver, o tareas que dependen de que el cliente entregue algo (ej: el archivo real de la fuente Hatton). Formato simple de checklist con una nota de contexto en cada punto.

## 6. `README.md` (raíz del proyecto, si no existe, créalo)
Puerta de entrada: qué es el proyecto, cómo correrlo, estado actual de la fase, y un índice con enlaces a todos los archivos de `docs/`.

## 7. `CHANGELOG.md` (raíz, si no existe, créalo)
Historial cronológico de cambios, agrupados por fecha, con las categorías `Added`, `Changed`, `Fixed`, `Removed`.

## Regla general
No dejes que ningún dato, decisión, error corregido o funcionamiento quede solo "en tu cabeza" durante la sesión. Si lo hiciste, existe una línea escrita en alguno de estos archivos que lo explica. Si en algún momento no sabes en cuál de estos archivos anotar algo, usa `docs/GUIA-PROYECTO.md` como archivo por defecto y luego reorganiza si hace falta.
