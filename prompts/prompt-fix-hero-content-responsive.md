# Spec — Fix: hero__content a la derecha en responsive

## Problema
El bloque de texto del hero (`div.hero__content`) debía quedar angosto y pegado al lado derecho, pero en tablet/móvil seguía a ancho completo, pegado a la izquierda (captura del cliente inspeccionada con devtools).

## Causa raíz
1. El `@media (max-width: 768px)` de `src/styles/styles.css` reseteaba `.hero__content { margin-left: 0; margin-right: 0; max-width: none; }`, anulando cualquier desplazamiento y devolviendo el bloque a ancho completo.
2. `.hero` es `display: flex` con `flex-direction: row` (por defecto). Para alinear un flex hijo a la derecha en el eje principal se usa `margin-left: auto` en el hijo; `align-items` solo actúa sobre el eje cruzado (vertical) y no mueve el bloque horizontalmente.

## Solución aplicada
En `src/styles/styles.css`:

```css
@media (max-width: 1024px) {
  .hero__content {
    margin-left: auto;
    margin-right: 0;
    max-width: 70%;
    width: fit-content;
  }
}

@media (max-width: 768px) {
  .hero__content {
    margin-left: auto;
    margin-right: 0;
    max-width: 70%;
    width: fit-content;
  }
}

@media (max-width: 480px) {
  .hero__content {
    max-width: 85%;
  }
}
```

- Desktop (>1024px) no cambia: `margin-left: 58%`.
- `width: fit-content` evita que el bloque ocupe todo el ancho disponible.
- Mantiene `text-shadow` (legibilidad sobre la foto).

## Verificación
- Tablet y móvil: `div.hero__content` se ve más angosto que el hero y pegado al borde derecho.
- Texto legible sobre la foto (mantiene el `text-shadow`).
- Desktop sin cambios.

## Documentación asociada
- `docs/ERRORES.md` — entrada [2026-08-06].
- `CHANGELOG.md` — `## [1.19.4]` bajo `Fixed`.
- `docs/CONTEXTO.md` — última actualización.
- `docs/guia-componentes.md` — sección `.hero__content`.

## Commit
`fix: corrige posicionamiento de hero__content a la derecha en responsive`