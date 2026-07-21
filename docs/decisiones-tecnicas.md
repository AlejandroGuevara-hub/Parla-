# Decisiones técnicas — Parla!

## Bloque 1 — Landing Page, Login y Registro

### Estructura de archivos
Se optó por una estructura plana y estándar: HTML en raíz, CSS y JS en subcarpetas. Sin
frameworks ni bundlers, porque la Fase 1 es solo prototipado estático.

### CSS sin frameworks
No se usó Bootstrap, Tailwind ni ningún framework CSS. Todo se construyó con variables
CSS propias (`variables.css`) y componentes modulares (`components.css`). Esto mantiene
el control total sobre el diseño y evita deuda técnica innecesaria en esta fase.

### Fraunces como reemplazo de Hatton
La tipografía Hatton (títulos) es de pago y no está disponible. Se usa Fraunces
(Google Fonts) como reemplazo temporal, manteniendo el espíritu editorial/serif.
El cambio se hace exclusivamente en `--font-display` dentro de `variables.css`;
cuando llegue el archivo real de Hatton, solo se actualiza esa variable.

### Navegación con atributo data-navegar
Los formularios usan `data-navegar="destino.html"` en lugar de acción real de backend.
El JS (`nav.js`) captura el submit, previene el envío y redirige. Esto hace explícito
que no hay backend y facilita cambiar destinos después.

### Mobile-first
Los estilos base asumen móvil (sin media query) y se adaptan hacia arriba con
breakpoints en 480px, 768px y 1024px, según especificación.

### Sin autenticación real
Login y registro son pantallas puramente visuales. Los botones "Iniciar sesión" y
"Crear cuenta" no validan ningún campo, pero siguen un flujo real: registro navega
a login, y login navega a inicio. Esto cumple con la regla de "prototipo clicable
sin backend" y refleja mejor la experiencia real de registro.

### Font Awesome para íconos en lugar de SVG propios
Se eligió Font Awesome vía CDN para los íconos del selector de tema porque:
- No requiere empaquetar ni mantener assets de íconos propios.
- CDN con caché del navegador: se carga una vez y se reusa en todas las páginas.
- La API de clases (`fas fa-moon` / `fas fa-sun`) es declarativa y fácil de cambiar desde JS.
- Es una dependencia externa estándar con soporte a largo plazo; si en el futuro se necesita migrar, solo se cambia el CDN y las clases.

### Tokens de color nuevos para tarjetas del dashboard
Se agregaron 2 tokens de color nuevos para los círculos de las tarjetas de Flashcards y Quizzes en el dashboard de inicio:

- `--color-accent-gold: #C9974A` — Derivado de la gama cálida de la paleta (entre `--color-cream` y `--color-accent`). Se aclara a `#D4A94E` en modo oscuro para mantener contraste sobre fondo `#2A2E32`.
- `--color-secondary-dark: #5F7A8C` — Variante más profunda de `--color-secondary`, dentro de la misma familia azul grisácea. Se aclara a `#7A94A6` en modo oscuro.

Se crearon solo 2 tokens nuevos (máximo permitido) y se documentan para evitar inventar colores sin relación con la paleta existente.

### Token `--feature-card-max-w` para ancho máximo de tarjetas
Se agregó `--feature-card-max-w: 280px` en `variables.css` para limitar el ancho de las tarjetas del dashboard de inicio. El valor se eligió porque:
- Es cercano al ancho de las tarjetas del mockup del cliente (referencia `--card-frame-w: 316.7px` para el frame completo, pero 280px para el contenido interno de la tarjeta).
- Permite que 3 tarjetas quepan cómodamente en una fila (~280px × 3 + gaps ≈ 900px) dentro del contenedor de 1200px.
- `auto-fit` con `minmax(240px, 280px)` da un rango estrecho que mantiene las tarjetas compactas incluso en viewports intermedios.

### Resplandor giratorio en tarjeta destacada (conic-gradient + blur)
Se eligió un `conic-gradient` animado con difuminado (`filter: blur`) para la tarjeta de Lecciones en video en lugar de un `box-shadow` pulsante porque:
- El degradado cónico giratorio da la sensación de un resplandor que "recorre" el borde, lo que comunica movimiento direccional y atención sin ser agresivo.
- `filter: blur` sobre el pseudo-elemento suaviza el gradiente para que se vea como un brillo ambiental, no como un borde sólido girando (que sería más brusco).
- `isolation: isolate` en la tarjeta evita que el glow se salga de contexto y afecte visualmente a las tarjetas vecinas.
- La animación se detiene con `prefers-reduced-motion: reduce` para respetar las preferencias de accesibilidad del usuario. Si solo se usara un `box-shadow` pulsante no haría falta animación, pero no comunicaría direccionalidad ni destacaría tanto visualmente.

### localStorage para persistencia del tema
Se usa `localStorage` (clave `parla-theme`) en lugar de no persistir el tema porque:
- La preferencia de tema claro/oscuro es una elección del usuario que debe mantenerse entre páginas y sesiones.
- `localStorage` es síncrono y está disponible inmediatamente, lo que permite un script inline en `<head>` que aplica el tema antes del primer render, eliminando el parpadeo.
- No requiere backend ni cookies; es la solución más liviana para Fase 1.

## Estructura de carpetas

```
/
├── src/                           ← Código fuente del sitio
│   ├── views/                     ← Páginas HTML (Vistas)
│   │   ├── index.html             # Landing Page
│   │   ├── login.html             # Inicio de sesión
│   │   ├── registro.html          # Registro
│   │   └── inicio.html            # Placeholder post-login
│   ├── styles/                    ← CSS (antes "css/")
│   │   ├── variables.css          # Design tokens (colores, tipografías, espaciados)
│   │   ├── components.css         # Componentes reutilizables (btn, input, card)
│   │   └── styles.css             # Estilos de página y layout
│   ├── scripts/                   ← JavaScript / Controladores (antes "js/")
│   │   └── nav.js                 # Navegación e interacciones de UI
│   ├── components/                ← Fragmentos HTML reutilizables
│   ├── data/                      ← Datos de ejemplo estáticos (JSON)
│   └── assets/                    ← Imágenes e iconos del sitio
│       └── images/
│           ├── logo.png           # Logo oficial del cliente
│           ├── hero.png           # Imagen compuesta (podcast/webtoon/cultura)
│           └── hero-bg.jpg        # Fondo del hero
├── reference/                     ← Material original del cliente (sin modificar)
│   ├── Diego-pagina web/
│   ├── Requerimientos de la Fase 1.pdf
│   └── Documento senza titolo(1).pdf
├── docs/
│   ├── CONTEXTO.md
│   ├── ERRORES.md
│   ├── GUIA-PROYECTO.md
│   ├── PENDIENTES.md
│   ├── decisiones-tecnicas.md
│   ├── guia-componentes.md
│   └── specs/                     ← Especificaciones de cada bloque
│       └── instrucciones-opencode-bloque1.md
├── prompts/                       ← Historial de prompts de cada sesión
├── .gitignore
├── README.md
└── CHANGELOG.md
```
