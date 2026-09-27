# Fix — Sin Sidebar ni Botón de Menú en Login/Registro también en Móvil

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Esto complementa `docs/specs/prompt-fix-sidebar-sin-login-registro.md`: esa corrección sacó el sidebar fijo de escritorio, pero hay que confirmar que tampoco aparezca su versión móvil (el botón de menú/hamburguesa que abre el drawer) en estas dos páginas.

## Cambio
En `login.html` y `registro.html`, en NINGÚN tamaño de pantalla (celular, tablet, escritorio) debe existir:
- El sidebar fijo (ya corregido en escritorio).
- El botón de menú/hamburguesa que abre el drawer en móvil.
- El drawer mismo y su overlay.

Verifica en las herramientas de desarrollador, probando en los 3 breakpoints (móvil, tablet, escritorio), que estas dos páginas no muestren ningún rastro del sidebar en ninguna de sus formas.

## Qué revisar
Si el botón de menú se agrega de forma global (por ejemplo, incluido automáticamente en todas las páginas menos `index.html`, sin excluir `login.html` y `registro.html`), corrige esa condición para que también las excluya a ellas, igual que ya se hizo con el sidebar de escritorio.

## Documentación
- `docs/ERRORES.md`: nota — al sacar el sidebar de escritorio en login/registro, quedó pendiente sacar también el botón de menú de la versión móvil; se corrige aquí.
- `docs/guia-componentes.md`: confirma que la condición de exclusión cubre las 3 formas (sidebar fijo, botón de menú, drawer).
- `CHANGELOG.md` bajo `Fixed`: "Quita el botón de menú/drawer móvil del sidebar en login y registro".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: quita boton de menu y drawer movil del sidebar en login y registro`
