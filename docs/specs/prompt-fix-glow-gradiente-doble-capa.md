# Fix — Nueva Técnica de Glow: Degradado Giratorio de Dos Capas

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero. Esto reemplaza por completo la técnica de `docs/specs/prompt-fix-anillo-mascara.md` (el anillo con máscara). Elimina ese CSS entero (`.card--featured::before` con `mask-composite`, `@keyframes girar-anillo`) y todo rastro de las versiones anteriores (pulso/respiración, resplandor con blur grande). Solo debe quedar la técnica nueva.

## Código de referencia (aportado por el cliente, esta es la base — no te desvíes de su esencia)
```css
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.card::before,
.card::after {
  content: "";
  position: absolute;
  inset: -0.5rem;
  z-index: -1;
  background: conic-gradient(
    from var(--gradient-angle),
    var(--clr-3),
    var(--clr-4),
    var(--clr-5),
    var(--clr-4),
    var(--clr-3)
  );
  border-radius: inherit;
  animation: rotation 20s linear infinite;
}

.card::after {
  filter: blur(3.5rem);
}

@keyframes rotation {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
```

Qué hace esta técnica y por qué es la que se usa ahora (no un pulso, no un "rotativo" tipo cometa con hueco):
- El degradado cónico cubre el 360° completo con color (sin tramos transparentes), así que al animar el ángulo no se ve como una luz puntual girando — se ve como un brillo ambiental que cambia de tono suavemente alrededor de toda la tarjeta.
- Dos capas: `::before` da un borde de color nítido pegado a la tarjeta; `::after` es la misma idea pero con blur fuerte, dando el resplandor ambiental hacia afuera.
- La animación mueve el ángulo del degradado con `@property` (interpolación suave del ángulo), no el tamaño ni la opacidad — por eso no se siente como pulso/respiración.

## Adaptación obligatoria al proyecto (el código de referencia es de una demo con una sola tarjeta grande, la nuestra es un grid de 6 tarjetas juntas)

**1. Colores** — no uses `--clr-1` a `--clr-5` del ejemplo. Deriva 3 tonos a partir de `--color-primary` ya existente, para no inventar colores nuevos sueltos:
```css
--glow-clr-1: color-mix(in srgb, var(--color-primary) 60%, black);
--glow-clr-2: var(--color-primary);
--glow-clr-3: color-mix(in srgb, var(--color-primary) 60%, white);
```

**2. Tamaño e inset reducidos** — el ejemplo usa `inset: -0.5rem` y `blur(3.5rem)` porque su tarjeta ocupa el 60% de la altura de pantalla y está sola. Nuestras tarjetas son más chicas y están en un grid apretado. Empieza con valores mucho menores y ajusta a ojo:
```css
inset: -0.25rem;      /* en vez de -0.5rem */
filter: blur(1.25rem); /* en vez de blur(3.5rem) */
```
Ve subiendo el blur de a poco y revisando en pantalla — el objetivo es un resplandor ambiental parejo alrededor de la tarjeta, sin invadir visualmente a Podcast (arriba) ni a Flashcards (al lado).

**3. Contención de z-index — esto es obligatorio, no opcional.** El código de referencia usa `z-index: -1` sin ningún control de apilamiento porque en la demo no hay tarjetas vecinas. En nuestro proyecto SÍ las hay, así que mantén la regla ya establecida:
```css
.card {
  position: relative;
  z-index: 2; /* todas las tarjetas normales */
}

.card--featured {
  position: relative;
  z-index: 1; /* menor que .card, para que el glow nunca tape a las vecinas */
}
```

## Código final esperado (estructura, ajusta blur/inset a ojo)
```css
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.card--featured::before,
.card--featured::after {
  content: "";
  position: absolute;
  inset: -0.25rem;
  z-index: -1;
  border-radius: inherit;
  background: conic-gradient(
    from var(--gradient-angle),
    var(--glow-clr-1),
    var(--glow-clr-2),
    var(--glow-clr-3),
    var(--glow-clr-2),
    var(--glow-clr-1)
  );
  animation: girar-gradiente 20s linear infinite;
}

.card--featured::after {
  filter: blur(1.25rem);
}

@keyframes girar-gradiente {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
```

## Verificación
- Se ve como un resplandor ambiental que cambia de tono suavemente, no como una mancha que respira ni como una luz puntual girando con hueco.
- No invade visualmente a Podcast ni a Flashcards en ningún momento del ciclo de 20s.
- Funciona en navegadores modernos (Chrome, Edge, Safari reciente). Si `@property` no es soportado en algún navegador de prueba, el degradado igual se ve, solo sin la interpolación suave del ángulo — no es bloqueante para Fase 1, déjalo anotado en `docs/PENDIENTES.md` si lo notas.

## Documentación
- `docs/guia-componentes.md`: reemplaza la ficha de `.card--featured` con esta técnica nueva (degradado giratorio de dos capas, colores derivados de `--color-primary`).
- `docs/decisiones-tecnicas.md`: por qué se adoptó esta técnica (aportada como referencia directa del cliente) sobre la del anillo con máscara, y qué valores se ajustaron respecto al original (inset, blur) y por qué.
- `CHANGELOG.md` bajo `Changed`.
- `docs/CONTEXTO.md`: actualiza estado.

## Commit
`fix: reemplaza técnica de glow por degradado giratorio de dos capas basado en referencia del cliente`
