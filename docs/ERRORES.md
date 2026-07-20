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
