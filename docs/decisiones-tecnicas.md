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
"Crear cuenta" navegan directamente a `inicio.html` sin validar ningún campo.
Esto cumple con la regla de "prototipo clicable sin backend".

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
