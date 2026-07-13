# Mercanto · Pipeline de talento

Tablero de reclutamiento para el equipo de Mercanto: candidatos, CVs, comentarios y status del proceso.

## Deploy en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a https://vercel.com/new
3. Importa ese repositorio (Vercel detecta `index.html` automáticamente, no necesita configuración de build).
4. Click en "Deploy".

Listo. Cada vez que subas un cambio a la rama principal del repo, Vercel actualiza el sitio solo.

## Nota sobre los datos

Este archivo usa `window.storage`, una API que solo funciona dentro de artefactos de Claude.ai.
Fuera de Claude (en Vercel), esas líneas de guardado/carga de candidatos no van a funcionar —
hay que reemplazarlas por una base de datos real (por ejemplo Supabase, Firebase, o una API propia)
antes de usarlo en producción con datos compartidos de verdad.
