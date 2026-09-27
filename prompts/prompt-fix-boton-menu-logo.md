# Fix — Botón de Menú se Superpone al Logo del Sidebar (Móvil)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Corrige `docs/specs/prompt-sidebar-navegacion.md` / `docs/specs/prompt-web-components-sidebar.md`.

## Problema (ver captura del cliente)
En móvil, con el drawer abierto, el botón de menú (hamburguesa) queda encimado justo sobre el logo del sidebar — ambos ocupan la misma esquina superior izquierda.

## Solución — dos partes

### 1. Dar espacio propio al logo (arregla el problema en cualquier estado)
El botón de menú es un elemento fijo aparte, con su propio espacio reservado. El sidebar necesita un `padding-top` que lo libere, para que el logo nunca empiece en el mismo punto donde está el botón:

```css
.sidebar-menu-toggle {
  position: fixed;
  top: var(--space-sm);
  left: var(--space-sm);
  width: 44px;
  height: 44px;
  z-index: 60; /* por encima del sidebar */
}

.sidebar {
  padding-top: 4.5rem; /* deja libre el espacio del botón + un margen, ajusta a ojo */
}
```

### 2. El botón se convierte en "X" al abrir (mejora de interacción, recomendado)
En vez de dejar la hamburguesa visible encima del drawer abierto, que cambie a un ícono de cerrar y quede claro que es el control para cerrar:

```javascript
const toggle = this.querySelector('.sidebar-menu-toggle');
const icon = toggle.querySelector('i');

toggle.addEventListener('click', () => {
  const isOpen = this.querySelector('.sidebar').classList.toggle('is-open');
  this.querySelector('.sidebar-overlay').classList.toggle('is-visible');
  icon.classList.toggle('fa-bars', !isOpen);
  icon.classList.toggle('fa-xmark', isOpen);
  toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
```

## Verificación
- Con el drawer cerrado, el botón de menú se ve solo, sin tocar el logo (que está fuera de pantalla).
- Con el drawer abierto, el logo aparece completo debajo del botón, sin encimarse, y el botón ahora muestra una "X".
- Al tocar la "X" o el overlay, el drawer se cierra y el ícono vuelve a ser la hamburguesa.

## Documentación
- `docs/ERRORES.md`: nueva entrada — el botón de menú se superponía al logo del sidebar en móvil por no tener espacio reservado; se corrigió con `padding-top` en el sidebar y convirtiendo el botón en ícono de cerrar al abrir.
- `docs/guia-componentes.md`: actualiza la ficha del sidebar con este comportamiento.
- `CHANGELOG.md` bajo `Fixed`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: corrige superposicion de boton de menu y logo en sidebar movil`
