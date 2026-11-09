# Paso a paso — publicar en un REPOSITORIO NUEVO

Este proyecto está listo para GitHub Pages. **No modifiques UI-UX ni taller8-uiux-mobile.**

## 1. Crear repositorio nuevo

1. Abre https://github.com/new
2. Propietario: `santkd16`.
3. Nombre: `recycle-today-australia-colombia`.
4. Visibilidad: **Public**.
5. Crear repositorio vacío (**sin marcar README, .gitignore ni licencia**, ya están los archivos de la página).

## 2. Subir archivos de la carpeta descomprimida

Abre una terminal **dentro de `RECYCLE_TODAY_WEB`** y ejecuta:

```powershell
git init -b main
git add .
git commit -m "Add final intercultural English presentation"
git remote add origin https://github.com/santkd16/recycle-today-australia-colombia.git
git push -u origin main
```

Puedes usar la subida de archivos de GitHub, pero ten en cuenta que necesitas conservar el archivo oculto `.nojekyll` y la carpeta oculta `.github/workflows/deploy.yml`; con Git son más fáciles de incluir.

## 3. Habilitar GitHub Pages

1. Abre https://github.com/santkd16/recycle-today-australia-colombia/settings/pages
2. En **Build and deployment / Source**, selecciona **GitHub Actions**.
3. Abre la pestaña **Actions** y el flujo **Deploy English presentation**.
4. Usa **Run workflow** (si el workflow había fallado antes de habilitar Pages).
5. Espera a que el workflow muestre el estado verde **Success**.
6. Entonces abre: https://santkd16.github.io/recycle-today-australia-colombia/

## 4. Personalizar el video del equipo

En `script.js`, cambia el valor:

```javascript
const VIDEO_ID = 'fYzPZtXPSZg';
```

Sustituye los 11 caracteres entre comillas por el ID del video **original y público** del grupo. Después ejecuta:

```powershell
git add .
git commit -m "Add our own campaign video"
git push
```

El sitio publicará el video y actualizará automáticamente el QR. El video predeterminado es un **material de referencia de Naciones Unidas/UNEP**, no una grabación del grupo.

## 5. Probar exposición

- Abre la página y pulsa **Present** para mostrar solo las cinco secciones.
- Utiliza las flechas izquierda/derecha, Inicio/Fin y Esc para navegar.
- Pulsa **Script** para repasar el podcast de las tres personas.
- La grabación del podcast requiere permiso de micrófono y guarda un archivo WebM **en el computador**, no en YouTube.
- Las fotos, los mapas, el video y el QR requieren acceso a internet.