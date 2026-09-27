# Fix — hero__content Sigue sin Moverse a la Derecha en Responsive

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. El cambio de `docs/specs/prompt-fix-hero-content-responsive.md` no se aplicó visualmente — el bloque de texto sigue ocupando casi todo el ancho del hero, pegado a la izquierda (ver captura del cliente, inspeccionada con devtools: `div.hero__content` sigue casi a ancho completo).

## Por qué probablemente no funcionó
`margin-left: auto` y `max-width` no mueven nada si el elemento sigue teniendo `width: 100%` (o `flex: 1` sin límite) por alguna regla existente con más especificidad, o si el contenedor padre (`.hero`) tiene `display: flex` con `flex-direction: column` y no hay `align-items` que empuje el hijo hacia la derecha. Revisa el CSS existente antes de aplicar el fix — no agregues otra capa de reglas sin saber por qué la anterior no tomó efecto.

## Qué revisar y corregir
1. Confirma si `.hero` es `display: flex`. Si `.hero__content` es un elemento flex directo dentro de un `.hero` con `flex-direction: column`, la forma correcta de alinearlo a la derecha es con `align-self` en el hijo o `align-items` en el padre, no `margin-left: auto` solo:
```css
@media (max-width: 1024px) {
  .hero {
    align-items: flex-end; /* empuja hero__content hacia la derecha */
  }

  .hero__content {
    width: fit-content;   /* que no ocupe todo el ancho disponible */
    max-width: 70%;
    text-align: right;
  }
}

@media (max-width: 480px) {
  .hero__content {
    max-width: 85%;
  }
}
```
2. Si `.hero__content` tiene `width: 100%` en alguna regla base (fuera de la media query) con más especificidad que la nueva, esa es la causa — ajusta ahí directamente en vez de pelear con overrides.
3. Después de aplicar, verifica en el inspector (como en la captura) que el ancho real del elemento sea menor al del contenedor y que quede pegado al borde derecho, no ocupando todo el espacio.

## Verificación
- En tablet y móvil, `hero__content` se ve claramente más angosto que el hero completo y pegado al lado derecho.
- El texto sigue siendo legible sobre la foto (mantiene el `text-shadow` ya definido).
- En escritorio no cambia nada.

## Documentación
- `docs/ERRORES.md`: nueva entrada — el primer intento de mover `hero__content` a la derecha no funcionó porque el elemento seguía con ancho completo por una regla existente; se corrigió usando `align-items`/`align-self` según cómo está estructurado el contenedor flex, en vez de depender solo de `margin-left: auto`.
- `CHANGELOG.md` bajo `Fixed`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: corrige posicionamiento de hero__content a la derecha en responsive`
