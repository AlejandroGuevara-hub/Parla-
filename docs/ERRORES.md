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
