# Remix Ordena e Imprime - Organizador de Fotos para Impresión

Aplicación web para maquetar, ordenar e imprimir fotos en cuadrículas de tamaño credencial, infantil, pasaporte, 10x15 cm y tamaños personalizados. Exporta a PDF de alta resolución, documento de Word (.docx) y permite impresión directa.

---

## 🚀 Despliegue en GitHub Pages

El proyecto ya está 100% configurado para funcionar en **GitHub Pages** gracias a la ruta base relativa (`base: './'` en `vite.config.ts`).

Tienes **dos formas sencillas** de publicarlo:

### Opción 1: Automático con GitHub Actions (Recomendada)

1. Sube tu código a un repositorio en **GitHub**.
2. En tu repositorio de GitHub, ve a **Settings** (Configuración) > **Pages**.
3. En la sección **Build and deployment** > **Source**, selecciona **GitHub Actions**.
4. ¡Listo! Cada vez que hagas `git push` a la rama `main` o `master`, el archivo `.github/workflows/deploy.yml` compilará y publicará la aplicación automáticamente en tu enlace de GitHub Pages (`https://tu-usuario.github.io/tu-repositorio/`).

---

### Opción 2: Despliegue manual con un comando (`npm run deploy`)

Si prefieres desplegar directamente desde tu terminal a la rama `gh-pages`:

1. Asegúrate de tener tu repositorio remoto configurado:
   ```bash
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Ejecuta el comando:
   ```bash
   npm run deploy
   ```
3. En GitHub, ve a **Settings** > **Pages** y selecciona la rama **gh-pages** como origen.

---

## 💻 Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
