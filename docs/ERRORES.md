# Errores cometidos — Parla!

### [2026-07-17] variables.css duplicado en raíz y css/
**Qué pasó:** Existían dos archivos `variables.css` idénticos: uno en la raíz del proyecto y otro en `css/`. Esto causaba confusión sobre cuál era la fuente de verdad.

**Por qué pasó:** En la primera tarea se copió `variables.css` de la raíz a `css/` para usarlo como parte del sistema de diseño, pero nunca se eliminó el original.

**Cómo se corrigió:** Se verificó que ambos archivos eran idénticos (mismo hash), se eliminó el de la raíz y se conservó el de `src/styles/variables.css` (antes `css/variables.css`).

**Cómo evitarlo:** No mantener dos copias del mismo archivo. Si un archivo se mueve a una nueva ubicación, eliminar el original. Registrar en `docs/ERRORES.md`.

### [2026-07-20] Sección de funcionalidades ubicada en Landing Page en vez de Inicio del estudiante
**Qué pasó:** Las tarjetas de Podcast, Webtoon y Cultura (sección "¿Qué quieres aprender hoy?") estaban en `src/views/index.html` (Landing Page, antes de iniciar sesión). Debían estar en `src/views/inicio.html` (panel del estudiante, después de iniciar sesión).

**Por qué pasó:** En la construcción inicial se confundió la Landing (vitrina pública) con el panel del estudiante autenticado. La sección se puso en el lugar equivocado y no se distinguió correctamente entre el contenido pre-login y post-login.

**Cómo se corrigió:** Se eliminó la sección `.features` de `src/views/index.html` y se reconstruyó `src/views/inicio.html` con header de usuario autenticado (iconos de Perfil, Contacto, Salir) y un grid de tarjetas funcionales. Las 3 tarjetas existentes se migraron a Inicio y se reemplazaron los emojis por íconos de Font Awesome.

**Cómo evitarlo:** Antes de crear una sección, verificar si pertenece al flujo pre-login (Landing, Registro, Login) o post-login (Inicio del estudiante). Documentar la pertenencia de cada sección en `docs/GUIA-PROYECTO.md`.

### [2026-07-20] Tarjetas de inicio sin ancho máximo definido y flujo de registro incorrecto
**Qué pasó:** Dos problemas:
1. Las tarjetas del dashboard en `inicio.html` no tenían un ancho máximo fijo, por lo que se estiraban a todo el ancho disponible y el texto definía su tamaño. También heredaban subrayado del enlace (`<a>`) en algunos navegadores.
2. El flujo de registro saltaba directamente de `registro.html` a `inicio.html` sin pasar por `login.html`, lo que no es fiel a un flujo real de registro.

**Por qué pasó:** 
1. No se definió un `max-width` en las tarjetas ni se usó `auto-fit` en el grid. El subrayado venía del comportamiento por defecto del navegador sobre el `<a>`.
2. En la construcción inicial se configuró `data-navegar="inicio.html"` en el formulario de registro, sin considerar el paso intermedio de login.

**Cómo se corrigió:**
1. Se agregó `--feature-card-max-w: 280px` en `variables.css`, se cambió el grid a `auto-fit, minmax(240px, ...)` con `justify-content: center`, y se eliminó `text-decoration: underline` del enlace reemplazando la retroalimentación hover por un borde primario (`box-shadow: 0 0 0 2px var(--color-primary)`).
2. Se cambió `data-navegar="inicio.html"` a `data-navegar="login.html"` en `registro.html`.

**Cómo evitarlo:** Al crear tarjetas en un grid, definir siempre un ancho máximo para evitar que se estiren. Verificar el flujo de navegación completo (registro → login → inicio) antes de configurar los `data-navegar`.

### [2026-07-20] Resplandor de tarjeta destacada se solapaba con tarjetas vecinas
**Qué pasó:** El resplandor animado (conic-gradient + blur) de la tarjeta "Lecciones en video" se veía por delante de las tarjetas Podcast (arriba) y Flashcards (al lado), tapando sus bordes. El efecto decorativo se desbordaba de su caja y, al no tener control de apilamiento entre tarjetas, se superponía visualmente a las vecinas.

**Por qué pasó:** `.card--featured` tenía `z-index: 0` y las tarjetas normales (`.card`) no tenían z-index explícito, por lo que todas compartían el mismo nivel de apilamiento automático. El desenfoque del resplandor (`blur: 12px`) se extendía 4px fuera de la tarjeta (`inset: -4px`) y, al estar en el mismo nivel que las vecinas, ganaba visualmente la que aparecía después en el flujo HTML — pero el glow se escapaba y se superponía.

**Cómo se corrigió:** 
- Se agregó `position: relative; z-index: 2` a `.card` (todas las tarjetas normales tienen un nivel alto).
- Se cambió `.card--featured` a `z-index: 1` (menor que las tarjetas vecinas), de modo que su `::before` con `z-index: -1` queda siempre detrás de cualquier tarjeta normal.
- Se eliminó `padding: 4px` innecesario del `::before`.

**Cómo evitarlo:** Toda tarjeta con efecto decorativo que se desborde de su caja (glow, sombra extendida, etc.) debe llevar z-index menor que las tarjetas normales, nunca al revés. Establecer siempre un z-index explícito en las tarjetas base para tener control de apilamiento.

### [2026-07-20] Tarjetas duplicadas de Podcast/Webtoon/Cultura en la Landing tras reestructuración
**Qué pasó:** En la sección compuesto de `src/views/index.html` se incluyeron 3 tarjetas (Podcast, Webtoon, Cultura) con ícono, título y descripción, duplicando el contenido que ya existía en `src/views/inicio.html` (Inicio del estudiante). La Landing Page debe ser solo una vitrina pública, no debe tener las tarjetas funcionales del dashboard autenticado.
**Por qué pasó:** Al rediseñar la sección compuesto (`prompt-rediseno-composite-landing.md`) se interpretó que la fila de íconos pequeños debajo de la imagen compuesta (que sí son parte del gráfico y se quedan) eran estas tarjetas grandes. Se copiaron las 3 tarjetas desde `inicio.html` sin verificar que ya pertenecían al flujo post-login.
**Cómo se corrigió:** Se eliminó el bloque `div.composite-section__icons` completo de `index.html`, incluyendo las 3 tarjetas y sus estilos asociados que ya no se usan en esa vista.
**Cómo evitarlo:** Antes de agregar contenido a la Landing, verificar si ya existe en el dashboard de Inicio (post-login). La Landing solo debe mostrar hero, sección compuesto (imagen + título + párrafo) y footer — nada del dashboard de funciones.

### [2026-07-20] Resplandor de tarjeta destacada se veía como mancha borrosa (blob)
**Qué pasó:** El efecto de resplandor en la tarjeta de Lecciones en video (`.card--featured`) se veía como una mancha grande, borrosa y desparejada que colgaba fuera de la tarjeta, en vez de un brillo prolijo alrededor del borde. El cliente lo reportó como visualmente incorrecto.
**Por qué pasó:** La técnica de `conic-gradient` + `filter: blur(12px)` + `inset: -4px` generaba una forma irregular porque el segmento de color brillante ocupaba un arco muy ancho (25% del círculo) y el blur de 12px extendía el color mucho más allá del borde de la tarjeta, creando una mancha amorfa.
**Cómo se corrigió:** Se reemplazó por un anillo delgado animado con `mask-composite: exclude`: el pseudo-elemento tiene `padding: 2px` que define el grosor del anillo, y la máscara recorta todo excepto ese borde. El arco se redujo a 12% del círculo. Sin `filter: blur`. El resultado es un anillo nítido que recorre el borde.
**Cómo evitarlo:** Para efectos de borde animado, preferir `mask-composite: exclude` sobre degradados borrosos. Si se necesita blur, usar máximo `filter: blur(1.5px)` — nunca 12px para este tipo de efecto.

### [2026-07-29] Fondo de foto en composite-section sin validación del cliente
**Qué pasó:** Se agregó `background-image: url(hero-bg.jpg)` al `.composite-section` para que la sección tuviera el mismo fondo que el hero, replicando la misma convención visual. El cliente no lo pidió.

**Por qué pasó:** Se asumió que la sección debía tener el mismo fondo del hero por consistencia visual, pero no se consultó ni se documentó como decisión pendiente de validación.

**Cómo se corrigió:** Se eliminó el `background-image` del `.composite-section`, dejando que herede el fondo del `body` (`var(--color-bg)`).

**Cómo evitarlo:** No agregar fondos decorativos a secciones sin confirmación del cliente. Si se desea explorar una variante visual, hacerlo en un branch o documentarlo como propuesta en `docs/` antes de implementarlo.

### [2026-07-29] Imagen compuesta envuelta en tarjeta con hover no solicitado
**Qué pasó:** La imagen `hero.png` dentro de `.composite-section` estaba envuelta en un `<div class="card">` que heredaba los estilos de `.card:hover` (translateY, sombra elevada, borde primario). El cliente nunca pidió hover ni interacción en esa imagen.

**Por qué pasó:** Se trató la imagen compuesta como una tarjeta funcional en vez de un elemento decorativo de fondo. Se agregó el wrapper `.card` para darle fondo blanco y sombra, sin considerar que `.card` tiene hover definido globalmente.

**Cómo se corrigió:** Se eliminó el wrapper `.card` y la imagen pasó a ser `.composite-section__bg` con posicionamiento absoluto a la izquierda de la sección (sin hover, sin interacción).

**Cómo evitarlo:** No envolver imágenes decorativas en contenedores que tengan estados de interacción (`:hover`, `:focus`). Si una imagen solo cumple función decorativa/visual, usar posicionamiento directo sin capas de interacción.

### [2026-07-20] Hover de tarjetas se veía como borde de selección forzada
**Qué pasó:** `.feature-card__link:hover` usaba `box-shadow: 0 0 0 2px var(--color-primary)`, que se veía como una línea sólida gruesa de selección, no como un hover cuidado.
**Por qué pasó:** Se usó un borde simulado con box-shadow sin difuminar (blur 0) como retroalimentación de hover, sin transición de transformación ni cambio de sombra. Al ser un borde sólido de 2px, se veía como si la tarjeta estuviera "seleccionada" en vez de "interactuable".
**Cómo se corrigió:** Se eliminó `feature-card__link:hover` y se reemplazó por hover en `.card` con `transform: translateY(-4px)`, `box-shadow: var(--shadow-card-hover)` y `border-color: var(--color-primary)`, todo con transición suave de 0.2s. El foco por teclado se maneja con `:focus-visible` en vez de `:focus`, para que el anillo solo aparezca en navegación por teclado y no al hacer clic con el mouse.
**Cómo evitarlo:** Para hover en tarjetas, preferir un levantamiento sutil (translateY + sombra elevada + cambio de borde) sobre bordes sólidos simulados con box-shadow sin blur.
