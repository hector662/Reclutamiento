# Mercanto · Pipeline de talento

Tablero de reclutamiento para el equipo de Mercanto: candidatos, CVs, comentarios y status del proceso.

## Cómo está armado

- `index.html` — el tablero completo (una sola página, sin build).
- `api/evaluar.js` — función de Vercel que convierte las notas de Granola en un borrador de evaluación.
- `api/rubricas.js` — las guías de entrevista de BDR y KAM, transcritas de los Sheets.

Los datos de los candidatos viven en un Google Sheet detrás de un Apps Script
(`API_URL` en `index.html`): el tablero lee con `GET` y guarda con `POST`.

## Deploy en Vercel

Vercel detecta `index.html` y la carpeta `api/` automáticamente, sin configuración de build.
Cada push a la rama principal actualiza el sitio.

## Evaluar con IA

En la ficha de cada candidato, cada evaluador tiene un botón **Evaluar con IA**: pegas
las notas o el transcript de Granola y el borrador se precarga en su sección
—estrellas, decisión y comentario— calificado contra la guía de BDR o de KAM según
el rol del candidato. **No guarda nada**: quien entrevistó revisa y le da Guardar.

Requiere una variable de entorno en el proyecto de Vercel:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Si la llave está ligada a una identidad (en vez de a un workspace), la API pide
además el workspace en el que actúa. En ese caso se agrega también:

```
ANTHROPIC_WORKSPACE_ID=wrkspc_...
```

Con una llave normal creada desde el Console esa segunda variable no hace falta.

Para cambiar las preguntas o cómo pesan en las estrellas del tablero, se edita
`api/rubricas.js` (cada bloque declara a qué criterio —Cultura, Experiencia,
Comunicación, Potencial— contribuye).
