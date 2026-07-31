# Guía de Motion Design — Parla!

> **Documento permanente.** Esta guía es la referencia de motion design del proyecto y se aplica automáticamente a CUALQUIER sección nueva que se construya (video, podcast, webtoon, cultura, flashcards, quizzes y lo que venga después), sin que haga falta pedirlo de nuevo cada vez.

---

## Regla más importante — no es negociable

**No rediseñar la interfaz.** La identidad visual ya está definida (paleta de `variables.css`, tipografías, estructura de cada vista, componentes ya construidos). No cambiar colores, tipografías, estructura, distribución, dimensiones ni apariencia de marca. El único objetivo es agregar una capa de movimiento sobre lo que ya existe — motion design puro sobre una interfaz terminada.

## Integración con lo que ya existe — no duplicar, extender

El proyecto ya tiene base de motion design construida y **no se debe crear un sistema paralelo** — se amplía y refina el existente:

- `.animate-in` + `js-animations-ready` (fade + flotar + blur al hacer scroll, con `IntersectionObserver` en `src/scripts/animations.js`).
- Fade de carga de página completa (`body.page-loaded`).
- Hover de tarjetas con elevación + sombra + color de borde (`--shadow-card-hover`), sin rebotes ni rotación.
- `prefers-reduced-motion` respetado en todos los componentes.
- Parallax extremadamente sutil del hero al hacer scroll (JS).
- Header sticky que se encoge al hacer scroll (`.site-header--scrolled`).
- Imágenes con blur + fade al terminar de cargar (`.img-load` / `.img-loaded`).

---

## Filosofía del movimiento

Las animaciones deben transmitir elegancia, calidad, fluidez, naturalidad, sensación premium. El usuario nunca debe pensar "qué animaciones tan llamativas" — debe pensar "qué agradable se siente usar esta página". El movimiento ayuda a dirigir la atención, nunca distrae.

## Reglas generales

Usar CSS y JavaScript cuando haga falta. Priorizar animar `transform`, `opacity`, `filter`, `clip-path`. Evitar animar `width`, `height`, `top`, `left`, `margin` (cuestan más rendimiento).

**Duraciones:**
- Microinteracciones: 200–350ms
- Hover: 250–400ms
- Entrada de secciones: 500–800ms
- Animaciones narrativas: hasta 900ms

**Curvas:** `ease-out` o `cubic-bezier(0.22, 1, 0.36, 1)`.

**Respetar `prefers-reduced-motion` siempre.**

## Animación al cargar la página

El contenido no aparece de golpe. Orden: fondo → imagen principal → título → subtítulo → botones → elementos decorativos, cada uno con un pequeño retraso respecto al anterior. Cada aparición combina opacidad + desplazamiento vertical leve + escala muy sutil.

## Aparición de secciones al hacer scroll

Con `IntersectionObserver` (ya existe la base). Cada sección anima solo la primera vez que entra al viewport. Combina `opacity` + `translateY` + `blur`. No repetir al volver a subir el scroll.

## Animación escalonada (stagger)

Cuando una sección tenga varios elementos similares (tarjetas, categorías), cada uno aparece con un pequeño retraso respecto al anterior. Ya existe en el grid de Inicio y en el sistema `.animate-in` (delay incremental por índice).

## Hero

Entrada progresiva. Si hay imagen grande, parallax extremadamente sutil al hacer scroll (desplazamiento pequeño, casi imperceptible). Elementos decorativos pueden tener un flotado muy lento tipo respiración — sin movimientos exagerados.

## Navbar

El header es sticky. Al hacer scroll: reduce ligeramente su altura, fondo más sólido (con `backdrop-filter` sutil), sombra un poco mayor. Todo con transición suave. Implementado con la clase `.site-header--scrolled` agregada por JS.

## Tarjetas

Hover: elevación leve, sombra suave, zoom muy pequeño en la imagen si la tiene, aparición progresiva de botones secundarios si existen. Nunca rebotes, nunca rotación.

## Botones

Hover: ampliación leve, más sombra, transición de color con la paleta ya existente. Active: reducción leve de escala. Focus: indicador visible (accesibilidad) — usar `:focus-visible`.

## CTA principal

El botón principal destacado del hero puede tener una animación permanente muy sutil (brillo que recorre el botón). Debe durar varios segundos y no distraer.

## Formularios (Login, Registro)

Al enfocar un campo: resaltar el borde con el color primario ya existente, aumentar ligeramente la sombra, transición suave.

## Chips, filtros, categorías (cuando existan en Flashcards/Quizzes)

Selección animada en color de fondo, color de texto e indicador activo. Nada instantáneo.

## Imágenes

Al terminar de cargar una imagen, quitar el placeholder progresivamente con blur + fade. Nunca de forma abrupta.

## Scroll

Desplazamiento suave para enlaces internos (anclas), velocidad natural.

## Footer

Al entrar al viewport, columnas con aparición escalonada, no todo junto.

## Skeleton loading (para cuando haya contenido que simule carga)

Efecto shimmer usando la paleta ya existente. Nada invasivo.

## Rendimiento

Animaciones fluidas, evitar las costosas. Usar `will-change` solo donde realmente aporte.

## Compatibilidad

Debe funcionar bien en escritorio, tablet y celular, sin romper el responsive ya construido.

---

## Lo que NO aplica todavía en este proyecto (queda guardado para cuando exista)

Modal, drawer/panel lateral, carrito, favoritos y carruseles no existen aún en Fase 1. Cuando esos componentes se construyan, aplicar esta guía automáticamente:

- **Modal / Drawer:** entrada con fade del fondo + deslizamiento del panel (opacity + translateY/X), curva `cubic-bezier(0.22, 1, 0.36, 1)`, 300–400ms. Cierre con la misma duración invertida.
- **Favoritos:** microinteracción de marcado (escala tipo pop de 0.8→1.1→1 en ~200ms) y transición de color del ícono.
- **Carruseles:** deslizamiento con ease-out de 400–600ms, indicadores con transición de color y escala.
- **Chips/Filtros/Categorías:** ver sección "Chips, filtros, categorías" arriba.
