# Feature — Panel de Navegación Vertical (Sidebar) en Todas las Vistas Excepto Landing

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Importante: esto reemplaza el prompt anterior de header flotante
Este cambio **supersede** a `docs/specs/prompt-header-flotante.md`. Si ese prompt ya se implementó, deshazlo: ya no va logo flotante arriba a la izquierda ni cluster de 3 íconos arriba a la derecha — ahora el logo vive dentro del sidebar, y "Contacto" pasa a ser un link más del sidebar (no un ícono flotante). Deja una nota en `docs/ERRORES.md` explicando que se reemplazó ese enfoque por este, para que quede el rastro de la decisión.

## Alcance
El sidebar aparece en TODAS las páginas excepto `index.html` (Landing). Esto incluye `login.html` y `registro.html` — el cliente lo pidió así explícitamente, aunque no es lo más común mostrar navegación completa antes de iniciar sesión. Si en algún momento se pide lo contrario, se ajusta después.

## Estructura del sidebar (referencia visual del cliente adjunta)
Fijo a la izquierda, ancho constante, alto completo de la pantalla (`position: fixed; top:0; left:0; height:100vh`), con scroll propio si el contenido de la lista de enlaces no entra.

Contenido, de arriba a abajo:
1. **Logo** de Parla!, arriba del todo.
2. **Enlaces de navegación**, uno por sección, cada uno con ícono (Font Awesome) + texto:
   - Inicio → `inicio.html` (`fa-house`)
   - Lecciones en video → `video.html` (`fa-video`)
   - Podcast → `podcast.html` (`fa-headphones`)
   - Webtoon → `webtoon.html` (`fa-book-open`)
   - Cultura → `cultura.html` (`fa-landmark`)
   - Flashcards → `flashcards.html` (`fa-layer-group`)
   - Quizzes → `quizzes.html` (`fa-circle-question`)
   - Contactos → `contacto.html` (`fa-comment`)

El enlace de la página actual debe verse resaltado (fondo suave + color de texto distinto), usando la paleta ya existente del proyecto — NO uses el morado de la referencia, usa `--color-primary`:

```css
.sidebar-link.is-active {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
  font-weight: var(--fw-bold);
}
```

## Perfil y Salir
"Contacto" ya no es un ícono flotante — ahora es un link del sidebar. "Perfil" y "Salir" siguen existiendo pero como un cluster flotante más chico (solo esos dos), arriba a la derecha, igual que se había definido antes, solo que ahora sin "Contacto" en ese grupo.

## Ajuste de layout en cada página
Como el sidebar es fijo, el contenido principal de cada vista necesita un margen izquierdo igual al ancho del sidebar para no quedar tapado:

```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  overflow-y: auto;
  background: var(--color-bg-card);
  box-shadow: var(--shadow-card);
  padding: var(--space-md);
}

.page-content {
  margin-left: 260px;
}
```

## Responsive — obligatorio
Un sidebar fijo de 260px no funciona en celular. En pantallas angostas (breakpoint móvil ya definido en el proyecto):
- El sidebar se convierte en un panel deslizable (drawer) que se abre con un botón de menú (ícono hamburguesa), no se queda fijo ocupando pantalla.
- Usa la animación de drawer ya documentada en `docs/GUIA-ANIMACIONES.md` (`transform: translateX()` para abrir/cerrar, overlay con fade para oscurecer el fondo).
- En tablet, decide si se mantiene fijo (si hay espacio) o se comporta como en móvil — pruébalo y usa lo que se vea mejor proporcionado.

## Documentación
- `docs/ERRORES.md`: nota de que se reemplazó el header flotante por este sidebar (referencia al prompt anterior).
- `docs/guia-componentes.md`: documenta `.sidebar`, `.sidebar-link`, `.sidebar-link.is-active`, y el comportamiento responsive de drawer.
- `docs/GUIA-PROYECTO.md`: actualiza — toda vista nueva (excepto Landing) debe incluir el sidebar por defecto.
- `docs/decisiones-tecnicas.md`: por qué se llevó el logo y Contacto dentro del sidebar en vez de flotantes.
- `CHANGELOG.md` bajo `Changed`: "Reemplaza header/íconos flotantes por panel de navegación vertical fijo en todas las vistas excepto landing".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`feat: agrega panel de navegación vertical fijo con drawer responsive en todas las vistas excepto landing`
