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

### Halo pulsante en tarjeta destacada (box-shadow animado)
Se reemplazó el resplandor giratorio (conic-gradient + blur en pseudo-elemento) por un halo de blur pulsante (`box-shadow` animado) porque:
- Es más simple: no necesita pseudo-elemento, no necesita máscara de desborde, y el `box-shadow` se mantiene naturalmente dentro del contexto de apilamiento sin fugas visuales.
- El `box-shadow` crece y decrece suavemente entre 14px y 30px de desenfoque, lo que da un efecto de "respiración" que destaca la tarjeta sin ser agresivo ni distraer.
- Al no tener pseudo-elemento con `inset: -4px`, no hay riesgo de que el efecto se salga de su caja y se superponga a tarjetas vecinas — el `box-shadow` respeta los límites del `z-index` de la tarjeta.
- Se introdujo `--color-primary-rgb` en `variables.css` para poder usar el color primario con transparencia en `rgba()`, necesario para el `box-shadow`.

**Nota posterior:** El halo pulsante se reemplazó por un resplandor giratorio fluido porque el pulso tipo "respiración" se sentía entrecortado debido a la pausa perceptible en cada extremo del ciclo (ease-in-out). La rotación continua con `linear` no tiene pausas y se percibe más fluida. Se mantuvo la regla de apilamiento (`.card` z-index: 2, `.card--featured` z-index: 1) desde el primer intento.

### Anillo animado con máscara (en vez de resplandor borroso)
El resplandor con `conic-gradient` + `blur(12px)` + `inset: -4px` se veía como una mancha grande y borrosa (blob) en vez de un brillo prolijo alrededor del borde. Se reemplazó por un anillo delgado animado usando `mask-composite: exclude` porque:
- La máscara (`-webkit-mask` con `mask-composite: exclude`) permite que solo se vea el borde (anillo de 2px), no el relleno del pseudo-elemento. Esto da un resultado nítido, no una mancha.
- El arco brillante se redujo a 12% del círculo (vs. 25% antes), por lo que se ve como una luz angosta recorriendo el borde, no como un bloque grande.
- Se eliminó `filter: blur` — el anillo es nítido y no produce el efecto de mancha.
- Se prefirió `mask-composite: exclude` + `transform: rotate()` sobre animar el ángulo del gradiente con `@property` porque la primera técnica funciona en todos los navegadores modernos sin necesitar la propiedad experimental `@property` de CSS, que aún tiene soporte limitado.

**Nota posterior:** Esta técnica del anillo con máscara se reemplazó por el degradado giratorio de dos capas (ver sección siguiente), porque el cliente aportó una referencia directa que se acerca más a lo que visualmente quiere: un resplandor ambiental parejo y cambiante, no una luz puntual recorriendo el borde.

### Degradado giratorio de dos capas (técnica actual, aportada por el cliente)
Se adoptó esta técnica como reemplazo definitivo del glow de la tarjeta destacada porque:
- El degradado cónico cubre el 360° completo sin tramos transparentes, por lo que al animar el ángulo se ve como un brillo ambiental que cambia de tono suavemente, no como una luz puntual girando.
- Dos capas: `::before` da un borde de color nítido; `::after` con `blur(1.25rem)` da el resplandor difuso hacia afuera. Esto crea profundidad sin manchas grandes.
- La animación usa `@property --gradient-angle` para interpolar suavemente el ángulo, evitando el efecto de "tick" que tendría animar `transform: rotate()` sobre un gradiente estático.
- El código base fue aportado por el cliente como referencia directa; se adaptó al proyecto reduciendo `inset` de -0.5rem a -0.25rem y `blur` de 3.5rem a 1.25rem porque nuestras tarjetas son más pequeñas y están en un grid apretado de 6 tarjetas.
- Se crearon 3 tokens de color derivados de `--color-primary`: `--glow-clr-1` (60% + black), `--glow-clr-2` (base), `--glow-clr-3` (60% + white), para no inventar colores nuevos sueltos.
- Si el navegador no soporta `@property`, el degradado se ve igual pero sin interpolación suave del ángulo — la animación salta en vez de ser continua. No es bloqueante para Fase 1; se documentó en `docs/PENDIENTES.md`.

### Fade de página completa y ampliación de animaciones
Se agregó un fade de entrada a nivel de `<body>` (`opacity: 0` → `opacity: 1` con transición de 0.4s) para que la página no aparezca de golpe al cargar. El sistema convive con `.animate-in`: el body fade es independiente de las animaciones de elementos individuales. También se amplió `.animate-in` a más elementos (imágenes, botones, encabezados, bloques de texto) para que el fade se sienta en toda la página, no solo en contenedores grandes.

### Tokens nuevos para la sección compuesto de la Landing

Se agregaron 7 tokens nuevos en `variables.css` para la sección compuesto (dos columnas debajo del hero):

- **Colores:** `--color-heading-gold: #c9a55c` (título dorado), `--color-text-navy: #2c3e50` (párrafo azul marino). En modo oscuro, `--color-heading-gold` se aclara a `#d4a94e` y `--color-text-navy` a `#B5B0A6` para mantener contraste.
- **Tipografía:** `--fs-heading-composite: 2.375rem` (38px), `--ls-heading-composite: -0.5px`, `--lh-heading-composite: 1.1`, `--fs-body-composite: 0.9375rem` (15px), `--lh-body-composite: 2.5`.

### Nota sobre el letter-spacing del párrafo compuesto

El cliente anotó un valor de `-20` para el `letter-spacing` del párrafo "Aprende italiano mediante experiencias reales...". A 15px, `-20px` de letter-spacing haría que los caracteres se solaparan casi por completo, resultando ilegible. Se interpretó este valor como un error de anotación (posiblemente -2.0px mal escrito o una convención diferente) y se ajustó a `-0.2px`, que es un valor perceptualmente razonable para negrita a 15px. Si el cliente confirma otro valor, se actualiza en `--ls-body-composite` (token no creado porque solo se usa una vez; se aplica inline en el CSS del párrafo).

### DM Serif Display para el título compuesto
El título "Olvídate de memorizar reglas." usa `DM Serif Display` en lugar del placeholder Fraunces (que reemplaza a Hatton en el resto del sitio) porque:
- El cliente indicó explícitamente esta fuente para este título específico, diferenciándolo del resto del sistema.
- DM Serif Display es una fuente real, gratuita y disponible en Google Fonts, a diferencia de Hatton que sigue siendo de pago y pendiente de entrega.
- Al ser una fuente serif con personalidad similar a Fraunces pero con un peso óptico más contrastado, funciona mejor en tamaños grandes (56px) para titulares destacados.
- Se creó el token `--font-heading-composite: "DM Serif Display", serif` para aislar esta elección y poder cambiarla sin afectar el resto del sistema tipográfico.

### Página de Contactos — ampliación de alcance fuera de Fase 1
La página `contacto.html` se agregó por solicitud directa del cliente después de cerrada la lista original de pantallas de Fase 1 (que incluía solo Landing, Login, Registro, Inicio del estudiante y 6 subsecciones). Se documenta aquí como una ampliación de alcance.

### Cinzel Decorative para el título de Contacto
El título "ACOMPAÑAMIENTO CONTINUO" en la página de Contactos usa `Cinzel Decorative` porque:
- El cliente indicó explícitamente esta fuente para este título específico.
- Cinzel Decorative es una fuente real, gratuita y disponible en Google Fonts, con un estilo decorativo/epigráfico que se diferencia del resto de las fuentes del sistema (Hatton/Fraunces para títulos generales, DM Serif Display para el título compuesto, Poppins para cuerpo).
- Se creó el token `--font-display-decorative: "Cinzel Decorative", serif` para aislar esta elección.

### Regla de apilamiento para tarjetas con efectos decorativos
Se estableció como regla general del proyecto que toda tarjeta con un efecto decorativo que se desborde de su caja (glow, sombra extendida, borde animado) debe tener un `z-index` explícito menor que las tarjetas normales. Esto se implementó así:
- `.card` (tarjetas normales): `z-index: 2`
- `.card--featured` (tarjeta con glow): `z-index: 1`

El `z-index: 1` en la tarjeta destacada crea un contexto de apilamiento donde su `::before` con `z-index: -1` queda detrás de su propio contenido, y al ser 1 < 2, todo el conjunto (tarjeta + glow) queda por debajo de cualquier tarjeta vecina. Esto evita que futuros efectos decorativos similares repitan el error de superponerse a elementos vecinos.

### IntersectionObserver para animaciones de entrada (vs. animar todo al cargar)
Se eligió `IntersectionObserver` en lugar de animar todos los elementos al cargar la página porque:
- Los elementos que están debajo del pliegue (below the fold) no deberían animarse hasta que el usuario haga scroll y realmente los vea. Animar todo al cargar desperdiciaría recursos y distraería al usuario con movimiento fuera de su viewport.
- `IntersectionObserver` es nativo del navegador, no requiere librerías externas, y permite desobservar cada elemento después de su primera animación (`observer.unobserve()`), lo que evita recalculos innecesarios.
- El fallback sin JS (`body:not(.js-animations-ready)`) asegura que si el script falla o tarda, el contenido se muestra completamente visible sin depender de la animación. Esto es progresivo: la animación es una mejora, no un requisito.

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
