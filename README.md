# Parla! — Aprende italiano

Plataforma web para aprender italiano mediante lecciones en video, podcast con
transcripción, webtoons, cultura, flashcards y quizzes.

## Estado actual

**Fase 1 — Prototipo clicable (solo frontend)**

Páginas construidas:
- `index.html` — Landing Page
- `login.html`  — Inicio de sesión (maqueta, sin backend)
- `registro.html` — Registro (maqueta, sin backend)
- `inicio.html` — Placeholder post-login

## Cómo abrir el proyecto

No requiere servidor. Abre cualquiera de estos archivos en tu navegador:

```
index.html
login.html
registro.html
inicio.html
```

O usa un servidor local simple (recomendado para evitar problemas de CORS con
Google Fonts):

```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server .
```

Luego abre `http://localhost:8000`.

## Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla (solo navegación e interacciones de UI)
- Google Fonts: Fraunces (títulos) y Poppins (cuerpo)

Sin frameworks, sin backend, sin base de datos.
