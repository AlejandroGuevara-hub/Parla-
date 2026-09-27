# Refactor — Sidebar y Cluster de Usuario como Web Components

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Este refactor no cambia nada visual ni de comportamiento — el sidebar y el cluster "Perfil/Salir" deben verse y funcionar exactamente igual que ahora. Lo único que cambia es que dejan de estar copiados en cada archivo HTML y pasan a vivir en un solo lugar.

## Por qué
El sidebar y el cluster de usuario están duplicados en 8 archivos HTML. Varias correcciones anteriores (sidebar, hover, responsive) tuvieron que revisarse página por página porque un cambio no se reflejaba igual en todas. Un Web Component nativo resuelve esto: se define una sola vez, se usa con una etiqueta en cada página.

**No se usa Shadow DOM.** El proyecto ya tiene todo el CSS en hojas de estilo globales (`variables.css`, `components.css`) usando clases (`.sidebar`, `.sidebar-link`, etc.). Si se usara Shadow DOM habría que duplicar ese CSS dentro del componente. En su lugar, se usa **light DOM** (el Custom Element solo inyecta HTML normal, sin encapsular estilos), así el CSS global existente lo sigue peinando exactamente igual que ahora.

## Componente 1: `<parla-sidebar>`
Archivo nuevo: `src/scripts/components/sidebar.js`

Responsabilidades:
- Renderiza el HTML del sidebar (logo + lista de enlaces) que hoy está copiado en cada página.
- Recibe un atributo `current` con el nombre de la página activa (ej. `current="inicio"`), y le pone la clase `is-active` al link correspondiente — no lo detectes adivinando la URL, es más frágil.
- Incluye también el botón de menú/hamburguesa y el comportamiento de drawer para móvil (abrir/cerrar, overlay), tal como ya está definido en `docs/specs/prompt-sidebar-navegacion.md`.

```javascript
class ParlaSidebar extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';

    const links = [
      { page: 'inicio', href: 'inicio.html', icon: 'fa-house', label: 'Inicio' },
      { page: 'video', href: 'video.html', icon: 'fa-video', label: 'Lecciones en video' },
      { page: 'podcast', href: 'podcast.html', icon: 'fa-headphones', label: 'Podcast' },
      { page: 'webtoon', href: 'webtoon.html', icon: 'fa-book-open', label: 'Webtoon' },
      { page: 'cultura', href: 'cultura.html', icon: 'fa-landmark', label: 'Cultura' },
      { page: 'flashcards', href: 'flashcards.html', icon: 'fa-layer-group', label: 'Flashcards' },
      { page: 'quizzes', href: 'quizzes.html', icon: 'fa-circle-question', label: 'Quizzes' },
      { page: 'contacto', href: 'contacto.html', icon: 'fa-comment', label: 'Contactos' },
    ];

    this.innerHTML = `
      <button class="sidebar-menu-toggle" aria-label="Abrir menú">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div class="sidebar-overlay"></div>
      <aside class="sidebar">
        <img class="sidebar__logo" src="../assets/logo.png" alt="Parla!">
        <nav>
          ${links.map(link => `
            <a href="${link.href}" class="sidebar-link ${link.page === current ? 'is-active' : ''}">
              <i class="fa-solid ${link.icon}"></i>
              <span>${link.label}</span>
            </a>
          `).join('')}
        </nav>
      </aside>
    `;

    this.querySelector('.sidebar-menu-toggle').addEventListener('click', () => {
      this.querySelector('.sidebar').classList.toggle('is-open');
      this.querySelector('.sidebar-overlay').classList.toggle('is-visible');
    });

    this.querySelector('.sidebar-overlay').addEventListener('click', () => {
      this.querySelector('.sidebar').classList.remove('is-open');
      this.querySelector('.sidebar-overlay').classList.remove('is-visible');
    });
  }
}

customElements.define('parla-sidebar', ParlaSidebar);
```
Ajusta rutas (`href`, `src` del logo) según la estructura real de carpetas del proyecto, y mantén los nombres de clase (`sidebar`, `sidebar-link`, `is-active`, etc.) IDÉNTICOS a los que ya existen en `components.css`, para que el CSS actual siga aplicando sin cambios.

## Componente 2: `<parla-user-nav>`
Archivo nuevo: `src/scripts/components/user-nav.js`

Renderiza el cluster flotante "Perfil / Salir":
```javascript
class ParlaUserNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="floating-user-nav">
        <a href="perfil.html" aria-label="Perfil"><i class="fa-solid fa-user"></i><span>Perfil</span></a>
        <a href="index.html" aria-label="Salir"><i class="fa-solid fa-right-from-bracket"></i><span>Salir</span></a>
      </div>
    `;
  }
}

customElements.define('parla-user-nav', ParlaUserNav);
```

## Cómo se usa en cada página
En `inicio.html`, `contacto.html`, `video.html`, `podcast.html`, `webtoon.html`, `cultura.html`, `flashcards.html`, `quizzes.html`, `perfil.html` (todas menos `index.html`, `login.html`, `registro.html`):

```html
<script type="module" src="../scripts/components/sidebar.js"></script>
<script type="module" src="../scripts/components/user-nav.js"></script>
...
<parla-sidebar current="inicio"></parla-sidebar>
<parla-user-nav></parla-user-nav>
```
Cambia el valor de `current` en cada página según corresponda (`"video"`, `"podcast"`, etc.).

## Migración — quita el HTML duplicado
En cada una de las 9 páginas, borra el bloque de HTML del sidebar y del cluster de usuario que hoy está copiado directo, y reemplázalo por las dos etiquetas de arriba. No dejes ambas versiones conviviendo.

## Verificación
- Las 9 páginas se ven y funcionan exactamente igual que antes (mismo sidebar, mismo drawer en móvil, mismo cluster de usuario).
- El link activo del sidebar corresponde a la página actual en cada una.
- Un cambio futuro en `sidebar.js` (por ejemplo, agregar un link nuevo) se refleja automáticamente en las 9 páginas sin tocar cada HTML por separado — pruébalo agregando y quitando un link de prueba para confirmar.

## Documentación
- `docs/GUIA-PROYECTO.md`: documenta los dos Web Components, dónde están y cómo se usan.
- `docs/guia-componentes.md`: reemplaza la documentación del sidebar/cluster duplicado por la de estos componentes.
- `docs/decisiones-tecnicas.md`: por qué Web Components nativos sin Shadow DOM (evita duplicar CSS, cero dependencias externas, soporte nativo en todos los navegadores modernos) en vez de un framework como React o un sistema de plantillas con build step.
- `CHANGELOG.md` bajo `Changed`: "Convierte sidebar y cluster de usuario en Web Components para eliminar duplicación entre páginas".
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`refactor: convierte sidebar y cluster de usuario en web components reutilizables`
