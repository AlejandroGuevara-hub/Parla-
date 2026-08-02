# Guía del Proyecto — Parla!

## Estructura de carpetas (esquema tipo MVC adaptado)

El proyecto sigue una estructura conceptual tipo MVC adaptada a frontend estático:

- **Views** → `src/views/` — Las páginas HTML.
- **Controllers** → `src/scripts/` — Los scripts JS que manejan navegación e interacción.
- **Models/Data** → `src/data/` — Datos de ejemplo en JSON (para Fase 2 en adelante).
- **Styles** → `src/styles/` — CSS (variables, componentes, página).
- **Assets** → `src/assets/` — Imágenes e iconos del sitio.

```
/
├── src/                        ← Código fuente del sitio
│   ├── views/                  ← Páginas HTML
│   │   ├── index.html          # Landing Page (pre-login: hero + showcase)
│   │   ├── login.html          # Inicio de sesión (maqueta)
│   │   ├── registro.html       # Registro (maqueta)
│   │   ├── inicio.html         # Inicio del estudiante (post-login: dashboard con 6 tarjetas)
│   │   ├── video.html          # Placeholder: Lecciones en video
│   │   ├── podcast.html        # Placeholder: Podcast
│   │   ├── webtoon.html        # Placeholder: Webtoon
│   │   ├── cultura.html        # Placeholder: Cultura
│   │   ├── flashcards.html     # Placeholder: Flashcards
│   │   ├── quizzes.html        # Placeholder: Quizzes
│   │   └── contacto.html       # Contacto: WhatsApp, fondo e ícono del cliente
│   ├── styles/                 ← CSS
│   │   ├── variables.css       # Design tokens
│   │   ├── components.css      # Componentes reutilizables
│   │   └── styles.css          # Estilos de página y layout
│   ├── scripts/                ← JavaScript
│   │   └── nav.js              # Navegación e interacciones
│   ├── components/             ← Fragmentos HTML reutilizables (futuro)
│   ├── data/                   ← Datos de ejemplo estáticos (futuro)
│   └── assets/                 ← Imágenes e iconos
│       └── images/
│           ├── logo.png
│           ├── hero.png
│           ├── hero-bg.jpg
│           ├── contact-bg.png     # Fondo página de Contactos
│           └── contact-icon.png   # Ícono decorativo teléfono+corazón
├── reference/                  ← Material CRUDO del cliente (no tocar)
│   ├── Diego-pagina web/
│   ├── Requerimientos de la Fase 1.pdf
│   └── Documento senza titolo(1).pdf
├── docs/                       ← Documentación
│   ├── CONTEXTO.md             # Resumen rápido del proyecto
│   ├── ERRORES.md              # Errores cometidos y solución
│   ├── GUIA-PROYECTO.md        # Esta guía
│   ├── PENDIENTES.md           # Tareas pendientes
│   ├── decisiones-tecnicas.md  # Decisiones de diseño/arquitectura
│   ├── guia-componentes.md     # Catálogo de componentes CSS
│   └── specs/                  # Especificaciones de cada bloque
│       └── instrucciones-opencode-bloque1.md
├── prompts/                    ← Historial de prompts de cada sesión
├── .gitignore
├── README.md                   ← Puerta de entrada
└── CHANGELOG.md                ← Historial de cambios
```

## Archivos CSS

| Archivo | Propósito |
|---|---|
| `src/styles/variables.css` | Tokens de diseño: colores, tipografías, espaciados, sombras. Única fuente de verdad visual. |
| `src/styles/components.css` | Componentes reutilizables: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-whatsapp`, `.input-field`, `.logo`, `.card`, `.form-toggle`, `.auth-form`. |
| `src/styles/styles.css` | Estilos de página: reset, header, hero, showcase, contact page, dashboard, auth pages, footer, responsive. |

## Archivos JS

| Archivo | Propósito |
|---|---|
| `src/scripts/nav.js` | Menú mobile toggle + captura de submit de formularios con `data-navegar`. |
| `src/scripts/theme.js` | Selector de tema claro/oscuro con persistencia en localStorage. |

## Cómo correr el proyecto

Abrir en navegador directo:
```
src/views/index.html
```

O con servidor local:
```bash
python -m http.server 8000
# luego http://localhost:8000/src/views/index.html
```

## Patrón obligatorio: navegación en vistas de usuario autenticado

Toda vista nueva de usuario autenticado (dashboard, secciones, etc.) debe usar este patrón por defecto, **no un header tradicional**:

- Logo flotante fijo arriba a la izquierda: `<a class="floating-logo">` (enlace a `index.html`).
- Navegación de usuario flotante fija arriba a la derecha: `<nav class="floating-user-nav">` con `<ul class="user-nav">` (Perfil / Contacto / Salir).

Ambos permanecen fijos al hacer scroll (`position: fixed`), con fondo tipo píldora (`--color-bg-card` + `border-radius: 999px`) para verse sobre cualquier fondo. CSS único en `src/styles/components.css`. En móvil (≤480px) las etiquetas de los botones se ocultan y quedan solo íconos.

La Landing (`index.html`) mantiene su propio nav de pre-login ("Iniciar sesión"/"Registrarme") — no usar el patrón de autenticado allí.
