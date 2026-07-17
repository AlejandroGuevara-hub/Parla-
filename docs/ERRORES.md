# Errores cometidos — Parla!

### [2026-07-17] variables.css duplicado en raíz y css/
**Qué pasó:** Existían dos archivos `variables.css` idénticos: uno en la raíz del proyecto y otro en `css/`. Esto causaba confusión sobre cuál era la fuente de verdad.

**Por qué pasó:** En la primera tarea se copió `variables.css` de la raíz a `css/` para usarlo como parte del sistema de diseño, pero nunca se eliminó el original.

**Cómo se corrigió:** Se verificó que ambos archivos eran idénticos (mismo hash), se eliminó el de la raíz y se conservó el de `src/styles/variables.css` (antes `css/variables.css`).

**Cómo evitarlo:** No mantener dos copias del mismo archivo. Si un archivo se mueve a una nueva ubicación, eliminar el original. Registrar en `docs/ERRORES.md`.
