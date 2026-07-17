<div align="center">
  <img src="assets/images/logo.png" alt="Parla! logo" width="80">
  <h1 align="center">Parla! — Aprende italiano</h1>
  <p align="center">
    Plataforma web para aprender italiano de forma real, ligera y entretenida.
    <br>
    Lecciones en video · Podcast con transcripción · Webtoons · Cultura · Flashcards · Quizzes
  </p>
</div>

---

## Estado del proyecto

**Fase 1 — Prototipo clicable (solo frontend)**

Construcción de interfaz y navegación. Sin backend, sin base de datos, sin autenticación real.

### Páginas disponibles

| Página | Descripción |
|---|---|
| [`index.html`](index.html) | Landing Page con hero, showcase y sección de características |
| [`login.html`](login.html) | Inicio de sesión (maqueta visual) |
| [`registro.html`](registro.html) | Registro de nuevo usuario (maqueta visual) |
| [`inicio.html`](inicio.html) | Placeholder post-login |

## Cómo visualizar

Abre cualquier archivo `.html` directamente en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server .
```

Luego visita `http://localhost:8000`.

## Stack técnico

- **HTML5** semántico y accesible (labels, focus visible, landmarks)
- **CSS3** con [variables de diseño](css/variables.css) propias (colores, tipografías, espaciados)
- **JavaScript** vanilla solo para navegación e interacciones de UI
- **Google Fonts**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (títulos, reemplazo temporal de Hatton) y [Poppins](https://fonts.google.com/specimen/Poppins) (cuerpo)
- **Responsive design**: mobile-first con breakpoints en 480px, 768px y 1024px

## Documentación

| Archivo | Contenido |
|---|---|
| [`docs/decisiones-tecnicas.md`](docs/decisiones-tecnicas.md) | Decisiones de arquitectura y diseño |
| [`docs/guia-componentes.md`](docs/guia-componentes.md) | Catálogo de componentes reutilizables |
| [`CHANGELOG.md`](CHANGELOG.md) | Historial de cambios por versión |

## Licencia

Todos los derechos reservados &copy; 2026 Parla!
