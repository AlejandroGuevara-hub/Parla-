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
