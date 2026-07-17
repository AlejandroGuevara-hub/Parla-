# Instrucciones para OPENCODE — Bloque 1: Landing, Login, Registro

## Contexto
Proyecto: Parla! — plataforma para aprender italiano.
Fase actual: Fase 1, solo diseño y prototipo clicable. Sin backend, sin base de datos, sin autenticación real.

## Qué construir
Tres páginas HTML estáticas, enlazadas entre sí solo por navegación (sin validar nada):

1. `index.html` — Landing Page
2. `login.html` — Inicio de sesión
3. `registro.html` — Registro
4. `inicio.html` — placeholder vacío por ahora, solo para que los botones de Login/Registro tengan destino real

## Reglas técnicas
- HTML5 semántico + CSS3 (sin frameworks) + JS vanilla solo para navegación e interacciones simples.
- Usar exclusivamente las variables definidas en `css/variables.css` (adjunto). No crear colores ni tamaños nuevos fuera de ese archivo.
- Mobile-first. Breakpoints: 480px (móvil), 768px (tablet), 1024px (escritorio).
- Botón "Iniciar sesión" en `login.html` → redirige a `inicio.html` sin validar campos.
- Botón "Crear cuenta" en `registro.html` → redirige a `inicio.html` sin validar campos.
- Todo formulario debe tener labels asociados y foco de teclado visible (accesibilidad).

## Landing Page (`index.html`)
- Hero con la foto de la mujer caminando por la calle italiana (imagen de referencia entregada por el cliente) como imagen principal.
- Logo Parla! visible en el header.
- Texto que comunique la propuesta: aprender italiano con podcast, webtoon y cultura (según Documento de identidad del proyecto).
- Dos botones claros: "Iniciar sesión" y "Registrarme".

## Login (`login.html`)
- Campos: correo, contraseña.
- Botón primario "Iniciar sesión" (color `--color-primary`).
- Enlace a `registro.html` para quien no tiene cuenta.

## Registro (`registro.html`)
- Campos: nombre, correo, contraseña, confirmar contraseña.
- Botón primario "Crear cuenta".
- Enlace a `login.html` para quien ya tiene cuenta.

## Componentes reutilizables a crear ahora (van en `css/components.css`)
- `.btn-primary` / `.btn-secondary`
- `.input-field` (campo de formulario con label)
- `.logo` (versión header, tamaño reducido del logo oficial)

## Documentación obligatoria al terminar este bloque
- Actualizar `README.md`: cómo abrir las 3 páginas localmente.
- Agregar entrada en `CHANGELOG.md` bajo `Added`: "Landing Page, Login y Registro (solo maqueta, sin backend)".
- Agregar en `docs/decisiones-tecnicas.md`: nota de que Hatton es un placeholder (Fraunces) hasta recibir el archivo de fuente real.
- Commit en GitHub: `feat: landing page, login y registro (prototipo sin backend)`.

## Entregable esperado
`index.html`, `login.html`, `registro.html`, `inicio.html` (vacío), `css/variables.css`, `css/components.css`, `css/styles.css`, `js/nav.js`.
