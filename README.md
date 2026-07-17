<div align="center">
  <img src="src/assets/images/logo.png" alt="Parla! logo" width="80">
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
| [`src/views/index.html`](src/views/index.html) | Landing Page con hero, showcase y sección de características |
| [`src/views/login.html`](src/views/login.html) | Inicio de sesión (maqueta visual) |
| [`src/views/registro.html`](src/views/registro.html) | Registro de nuevo usuario (maqueta visual) |
| [`src/views/inicio.html`](src/views/inicio.html) | Placeholder post-login |

## Cómo visualizar

Abre cualquier archivo `.html` desde `src/views/` en el navegador o usa un servidor local desde la raíz:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server .
```

Luego visita `http://localhost:8000/src/views/index.html`.

## Stack técnico

- **HTML5** semántico y accesible (labels, focus visible, landmarks)
- **CSS3** con [variables de diseño](src/styles/variables.css) propias (colores, tipografías, espaciados)
- **JavaScript** vanilla solo para navegación e interacciones de UI
- **Google Fonts**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (títulos, reemplazo temporal de Hatton) y [Poppins](https://fonts.google.com/specimen/Poppins) (cuerpo)
- **Responsive design**: mobile-first con breakpoints en 480px, 768px y 1024px

## Estructura del proyecto

```
├── src/
│   ├── views/        ← Páginas HTML (Vistas)
│   ├── components/   ← Fragmentos HTML reutilizables
│   ├── styles/       ← CSS (variables, componentes, estilos de página)
│   ├── scripts/      ← JavaScript (controladores)
│   ├── data/         ← Datos de ejemplo estáticos (JSON)
│   └── assets/       ← Imágenes e iconos del sitio
├── reference/        ← Material original del cliente (sin modificar)
├── docs/             ← Documentación técnica y especificaciones
├── prompts/          ← Historial de prompts de cada sesión
├── .gitignore
├── README.md
└── CHANGELOG.md
```

## Documentación

| Archivo | Contenido |
|---|---|
| [`docs/CONTEXTO.md`](docs/CONTEXTO.md) | Resumen rápido del proyecto |
| [`docs/decisiones-tecnicas.md`](docs/decisiones-tecnicas.md) | Decisiones de arquitectura y diseño |
| [`docs/guia-componentes.md`](docs/guia-componentes.md) | Catálogo de componentes reutilizables |
| [`docs/GUIA-PROYECTO.md`](docs/GUIA-PROYECTO.md) | Guía completa de estructura y archivos |
| [`docs/ERRORES.md`](docs/ERRORES.md) | Errores cometidos y cómo se corrigieron |
| [`docs/PENDIENTES.md`](docs/PENDIENTES.md) | Tareas pendientes y blockers |
| [`CHANGELOG.md`](CHANGELOG.md) | Historial de cambios por versión |

## Licencia

Todos los derechos reservados &copy; 2026 Parla!
