# Feature — Página de Perfil (Ejemplo, sin Funcionalidad Real)

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Contexto
Hoy el ícono "Perfil" (flotante, arriba a la derecha, junto a "Salir") no tiene página de destino. Se crea `src/views/perfil.html` como vista de ejemplo — sin edición real, sin guardar nada, solo para mostrar cómo se vería. Coherente con el resto de Fase 1: sin backend, sin base de datos, sin cuentas reales.

## Contenido de ejemplo (usa datos de ejemplo, mismo criterio que las otras secciones)
Crea `src/data/perfil.json`:
```json
{
  "nombre": "Sofía Ramírez",
  "correo": "sofia.ramirez@ejemplo.com",
  "miembroDesde": "Marzo 2026",
  "nivel": "A2 · Elemental",
  "avatarIniciales": "SR",
  "estadisticas": {
    "leccionesCompletadas": 18,
    "rachaDias": 6,
    "horasDeEstudio": 12
  }
}
```

## Estructura de la página
Sigue usando el sidebar y el tema claro/oscuro ya implementados (esta es una vista de usuario autenticado más).

1. **Encabezado de perfil**: avatar circular (si no hay foto real, usa las iniciales del nombre sobre un círculo de color, como `avatarIniciales`), nombre, correo, "Miembro desde" y el nivel de italiano como una insignia (usa el mismo estilo de badge que ya se usa en Lecciones/Podcast/etc. para estados).
2. **Tarjetas de estadísticas** (reutiliza el estilo de tarjeta ya existente): lecciones completadas, racha de días, horas de estudio — 3 tarjetas simples en fila (o apiladas en móvil).
3. **Sección "Información personal"**: muestra nombre y correo en modo solo lectura, con un botón "Editar perfil" que es solo visual (no hace nada al hacer clic — no hay formulario funcional en esta fase). Si quieres, al hacer clic puede mostrar un mensaje simple tipo "Esta función estará disponible próximamente", sin más lógica.
4. **Sección "Preferencias"** (opcional, mantenla simple): un par de toggles visuales de ejemplo (ej. "Notificaciones por correo"), sin funcionalidad de guardado real — el toggle puede cambiar de estado visualmente al hacer clic, pero no persiste nada.

## Conecta el ícono de "Perfil"
En todas las vistas donde aparece el cluster flotante "Perfil / Salir" (o dentro del sidebar si terminó viviendo ahí), cambia el `href="#"` de "Perfil" para que apunte a `perfil.html`.

## Consistencia visual
- Usa los tokens de `variables.css`, el sidebar, el tema claro/oscuro, y el sistema de animaciones (`docs/GUIA-ANIMACIONES.md`) igual que en las demás vistas — nada de esto es nuevo, solo se reutiliza.
- No agregues formularios que parezcan funcionales de verdad (que no generen la expectativa de que algo se guarda) — todo debe leerse claramente como una vista de ejemplo/demostración.

## Documentación
- `docs/GUIA-PROYECTO.md`: agrega `perfil.html` y `src/data/perfil.json` a la lista de vistas y datos.
- `docs/guia-componentes.md`: documenta el avatar con iniciales y las tarjetas de estadísticas.
- `docs/PENDIENTES.md`: agrega "Perfil: conectar edición real y guardado de preferencias cuando exista backend".
- `CHANGELOG.md` bajo `Added`: "Crea página de Perfil de ejemplo, sin funcionalidad real".
- `docs/CONTEXTO.md`: actualiza estado de avance.

## Commit
`feat: agrega pagina de perfil de ejemplo sin funcionalidad real`
