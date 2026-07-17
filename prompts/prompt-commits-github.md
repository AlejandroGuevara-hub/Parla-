# Prompt — Commits y Subida a GitHub

Cada vez que termines una tarea (un feature, un fix, un cambio de documentación, un refactor), debes subirlo a GitHub siguiendo esta convención. No dejes cambios sin commitear al terminar una sesión.

## Estándar de tipos (Conventional Commits, nombres en inglés — son parte del estándar y no se traducen)
- `feat`: funcionalidad o sección nueva
- `fix`: corrección de un error
- `docs`: cambios solo en documentación
- `style`: cambios de formato/estilo visual que no afectan lógica (espacios, CSS, orden)
- `refactor`: reorganización de código sin cambiar su comportamiento
- `perf`: mejora de rendimiento
- `test`: agregar o corregir pruebas
- `chore`: tareas de mantenimiento (dependencias, configuración)
- `build`: cambios que afectan el proceso de construcción del proyecto
- `revert`: revertir un commit anterior

## Formato del mensaje (título en español, siguiendo el estándar)
```
tipo: descripción corta en español, en minúscula, sin punto final

Descripción más detallada en español explicando:
- qué se hizo exactamente
- por qué se hizo (si no es obvio)
- qué archivos o secciones se vieron afectados
```

### Ejemplos
```
feat: agrega estructura de landing page con hero y navegación

Se crea index.html con header, sección hero y sección de tarjetas.
Se conecta con src/styles/variables.css para colores y tipografías.
Archivos: src/views/index.html, src/styles/styles.css, src/styles/components.css
```

```
fix: corrige estructura y assets de landing hero

El fondo del hero usaba una imagen genérica en vez de la foto real
del cliente. Se reemplaza por Sitio web de belleza...jpg y se saca
la imagen ChatGPT Image... a una sección aparte, fuera del hero.
Archivos: index.html, css/styles.css
```

```
docs: actualiza guía de componentes con nuevo botón primario

Se documenta .btn-primary en docs/guia-componentes.md: variables
que usa, dónde está definido y en qué páginas aparece.
Archivos: docs/guia-componentes.md
```

## Reglas
- Un commit = un cambio lógico. No mezcles un `feat` con un `fix` no relacionado en el mismo commit.
- Nunca uses mensajes vagos como "cambios", "ajustes", "update". Siempre describe qué y por qué.
- Antes de cada commit, confirma que la documentación relacionada (`CHANGELOG.md` y el `docs/*.md` que corresponda) ya está actualizada — el commit debe incluir tanto el código como su documentación.
- Haz `push` a GitHub al finalizar cada tarea aprobada, no acumules varios días de trabajo sin subir.
- Si un commit corrige algo registrado en `docs/ERRORES.md`, menciona en el cuerpo del mensaje a qué error corresponde.
