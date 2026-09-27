# Fix — Limpieza de Repositorio: .gitignore, Migración de Assets y Untrack

## Antes de empezar
Usa `prompts/prompt-releer-documentacion.md` primero.

## Orden obligatorio — no saltear pasos
Hacer esto en el orden equivocado rompe imágenes en producción. Sigue el orden exacto.

## Paso 1: Audita y migra imágenes que apuntan directo a `reference/`
Busca en todo el proyecto (`grep` o búsqueda de texto en `src/views/*.html` y `src/styles/*.css`) cualquier referencia a rutas dentro de `reference/` o `Diego-pagina web/` — se sabe que al menos existen en:
- `contacto.html` (imagen de fondo y el ícono decorativo de teléfono+corazón)
- Las 6 tarjetas de `inicio.html` (imágenes `3.png` a `8.png`)

Por cada una: copia el archivo real a `src/assets/` con un nombre claro (ej. `contacto-bg.jpg`, `icono-telefono-corazon.png`, `card-lecciones.png`, etc.), y actualiza el `src`/`url()` en el HTML/CSS para que apunte a la nueva ubicación en `src/assets/`, no a `reference/`.

**No sigas al paso 2 sin terminar esto.** Verifica visualmente que Contactos e Inicio se sigan viendo igual después de mover los archivos.

## Paso 2: Configura `.gitignore`
Revisa el `.gitignore` actual y agrégale (sin borrar lo que ya tenga, combina):

```gitignore
# Material de referencia del cliente — assets crudos, no código de producción
/reference/

# Archivos comprimidos sueltos
*.zip

# Archivos de bloqueo de LibreOffice/Office
.~lock.*#

# Sistema operativo
.DS_Store
Thumbs.db

# Editores
.vscode/
.idea/

# Dependencias (por si se instala algo con npm más adelante)
node_modules/

# Logs
*.log

# Variables de entorno (por si se agregan más adelante)
.env
.env.local
```

## Paso 3: Quita del control de versiones lo que ya esté subido
`.gitignore` solo evita que se agreguen archivos NUEVOS — si `reference/` ya se subió en un commit anterior, hay que sacarlo explícitamente del tracking (esto no borra los archivos del disco, solo deja de versionarlos):

```bash
git rm -r --cached reference/
git rm --cached *.zip 2>/dev/null
git commit -m "chore: deja de versionar carpeta reference y archivos temporales"
```

**Nota para el cliente:** esto saca los archivos del tracking de aquí en adelante, pero no los borra del historial de commits pasados (siguen ahí si alguien revisa versiones viejas). Si en algún momento se necesita borrarlos también del historial completo, es una operación aparte (`git filter-repo` o BFG Repo-Cleaner) — avísame si llegado el caso la necesitas, no la hagas por tu cuenta sin avisar porque reescribe el historial.

## Paso 4: Deja la regla para que no vuelva a pasar
Agrega a `docs/CONTEXTO.md`, sección "Reglas fijas que no cambian":
> Nunca hacer `git add` sobre `reference/`, archivos `.zip`, o archivos de bloqueo. Toda imagen usada en el sitio real vive en `src/assets/`, nunca se referencia directo desde `reference/`. Antes de cualquier `git add .`, confirmar que `.gitignore` está cubriendo estas rutas.

## Documentación
- `docs/decisiones-tecnicas.md`: por qué `reference/` no se versiona (son assets crudos del cliente, no código; mantiene el repositorio liviano) y por qué toda imagen de producción vive en `src/assets/`.
- `docs/ERRORES.md`: registra que algunas páginas quedaron referenciando imágenes directo desde `reference/`, lo cual hubiera roto el sitio al ignorar esa carpeta; se corrigió migrando esos archivos a `src/assets/` antes de agregar el `.gitignore`.
- `docs/GUIA-PROYECTO.md`: aclara que `reference/` es solo material de consulta local, no se sube al repositorio, y que un clon nuevo del repositorio no la tendrá — todo lo necesario para correr el sitio vive en `src/`.
- `README.md`: nota breve de que `reference/` es material del cliente que no viene incluido al clonar el repositorio.
- `CHANGELOG.md` bajo `Changed`: "Migra imágenes usadas en producción a src/assets y configura .gitignore para excluir material de referencia".
- `docs/CONTEXTO.md`: actualiza estado.

## Commits (en este orden)
1. `fix: migra imagenes de contacto e inicio desde reference a src/assets`
2. `chore: agrega y configura gitignore`
3. `chore: deja de versionar carpeta reference y archivos temporales`
