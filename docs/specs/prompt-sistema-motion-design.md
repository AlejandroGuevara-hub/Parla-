# Sistema de Motion Design — Implementar Ahora + Guardar como Guía Permanente

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Instrucción doble
1. **Implementa ahora** todo lo de esta guía que aplique a lo que ya existe en el proyecto (Landing, Login, Registro, Inicio del estudiante, páginas placeholder, Contactos).
2. **Guarda esta guía completa como archivo permanente** en `docs/GUIA-ANIMACIONES.md`. No es una tarea de una sola vez: es la referencia de motion design que se debe aplicar automáticamente a CUALQUIER sección nueva que se construya de aquí en adelante en el proyecto (video, podcast, webtoon, cultura, flashcards, quizzes, y lo que venga después), sin que haga falta pedirlo de nuevo cada vez.

## Regla más importante — no es negociable
**No rediseñes la interfaz.** La identidad visual ya está definida (paleta de `variables.css`, tipografías, estructura de cada vista, componentes ya construidos). No cambies colores, tipografías, estructura, distribución, dimensiones ni apariencia de marca. El único objetivo es agregar una capa de movimiento sobre lo que ya existe — no es una tarea de rediseño, es motion design puro sobre una interfaz terminada.

## Integración con lo que ya existe — no dupliques, extiende
El proyecto ya tiene una base de esto construida:
- `.animate-in` + `js-animations-ready` (fade + flotar al hacer scroll, con `IntersectionObserver`, ver `docs/specs/prompt-animaciones-entrada.md` y `docs/specs/prompt-fix-fade-general-y-fluidez.md`).
- Fade de carga de página completa (`body.page-loaded`).
- Hover de tarjetas con elevación + sombra + color de borde (ver `docs/specs/prompt-fix-hover-tarjetas.md`), usando `--shadow-card-hover`.
- `prefers-reduced-motion` ya respetado en varios componentes.

No crees un sistema paralelo. **Amplía y refina el que ya existe** con las especificaciones de esta guía (por ejemplo: el fade+flotar actual debe sumarle `blur` como se pide abajo; el hover de tarjetas actual ya cumple casi todo lo que pide esta guía, solo revisa que no tenga rebotes ni rotación).

---

# Filosofía del movimiento
Las animaciones deben transmitir elegancia, calidad, fluidez, naturalidad, sensación premium. El usuario nunca debe pensar "qué animaciones tan llamativas" — debe pensar "qué agradable se siente usar esta página". El movimiento ayuda a dirigir la atención, nunca distrae.

# Reglas generales
Usa CSS y JavaScript cuando haga falta. Prioriza animar `transform`, `opacity`, `filter`, `clip-path`. Evita animar `width`, `height`, `top`, `left`, `margin` (cuestan más rendimiento).

Duraciones:
- Microinteracciones: 200–350ms
- Hover: 250–400ms
- Entrada de secciones: 500–800ms
- Animaciones narrativas: hasta 900ms

Curvas: `ease-out` o `cubic-bezier(0.22, 1, 0.36, 1)`.

Respeta `prefers-reduced-motion` siempre (ya está la base hecha, mantenla en cada componente nuevo).

# Animación al cargar la página
El contenido no aparece de golpe. Orden: fondo → imagen principal → título → subtítulo → botones → elementos decorativos, cada uno con un pequeño retraso respecto al anterior. Cada aparición combina opacidad + desplazamiento vertical leve + escala muy sutil.

# Aparición de secciones al hacer scroll
Con `IntersectionObserver` (ya existe la base). Cada sección anima solo la primera vez que entra al viewport. Combina `opacity` + `translateY` + `blur`. No repetir al volver a subir el scroll.

# Animación escalonada (stagger)
Cuando una sección tenga varios elementos similares (tarjetas, categorías), cada uno aparece con un pequeño retraso respecto al anterior (esto ya existe parcialmente en el grid de Inicio, verifica que siga el mismo criterio).

# Hero
Entrada progresiva. Si hay imagen grande, parallax extremadamente sutil al hacer scroll (desplazamiento pequeño, casi imperceptible). Elementos decorativos pueden tener un flotado muy lento tipo respiración — sin movimientos exagerados.

# Navbar
Si el header es sticky (revisa si lo es en el proyecto): al hacer scroll, reduce ligeramente su altura, fondo más sólido, `backdrop-filter` sutil, sombra un poco mayor. Todo con transición suave.

# Tarjetas
Hover: elevación leve, sombra suave, zoom muy pequeño en la imagen si la tiene, aparición progresiva de botones secundarios si existen. Nunca rebotes, nunca rotación.

# Botones
Hover: ampliación leve, más sombra, transición de color con la paleta ya existente. Active: reducción leve de escala. Focus: indicador visible (accesibilidad) — usa `:focus-visible` como ya se definió para las tarjetas.

# CTA principal
Si hay un botón principal destacado, puede tener una animación permanente muy sutil (brillo que recorre el botón, gradiente animado, reflejo leve). Debe durar varios segundos y no distraer.

# Formularios (Login, Registro)
Al enfocar un campo: resalta el borde con el color primario ya existente, aumenta ligeramente la sombra, transición suave.

# Chips, filtros, categorías (cuando existan en Flashcards/Quizzes más adelante)
Selección animada en color de fondo, color de texto e indicador activo. Nada instantáneo.

# Imágenes
Al terminar de cargar una imagen, quita el placeholder progresivamente con blur + fade. Nunca de forma abrupta.

# Scroll
Desplazamiento suave para enlaces internos (anclas), velocidad natural.

# Footer
Al entrar al viewport, columnas con aparición escalonada, no todo junto.

# Skeleton loading (para cuando haya contenido que simule carga)
Efecto shimmer usando la paleta ya existente. Nada invasivo.

# Rendimiento
Animaciones fluidas, evita las costosas. Usa `will-change` solo donde realmente aporte.

# Compatibilidad
Debe funcionar bien en escritorio, tablet y celular, sin romper el responsive ya construido.

## Lo que NO aplica todavía en este proyecto (queda guardado para cuando exista)
Modal, drawer/panel lateral, carrito, favoritos y carruseles no existen aún en Fase 1. No los implementes ahora — quedan documentados en `docs/GUIA-ANIMACIONES.md` para aplicarse automáticamente el día que esos componentes se construyan.

---

## Documentación
- Crea `docs/GUIA-ANIMACIONES.md` con el contenido completo de esta guía (arriba de todo, "Filosofía del movimiento" en adelante), como referencia permanente del proyecto.
- `docs/decisiones-tecnicas.md`: nota de que se adoptó este sistema de motion design como estándar del proyecto, y que reemplaza/amplía los sistemas puntuales anteriores.
- `docs/guia-componentes.md`: actualiza cada componente que reciba animación nueva (tarjetas, botones, formularios, hero).
- `CHANGELOG.md` bajo `Added`: "Implementa sistema de motion design en toda la interfaz existente y lo documenta como guía permanente".
- `docs/CONTEXTO.md`: agrega en "Reglas fijas que no cambian" — toda sección nueva debe seguir `docs/GUIA-ANIMACIONES.md` por defecto, sin que se lo pidan de nuevo.

## Commit
`feat: implementa sistema de motion design y lo documenta como guía permanente del proyecto`
