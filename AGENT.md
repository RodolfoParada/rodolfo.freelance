# AGENT.md

Guía rápida para agentes de IA que trabajen en este repositorio. Es un resumen: el detalle está en `CLAUDE.md` (convenciones, arquitectura y reglas de cada sección) y en `SPEC.md` (requisitos funcionales). Si algo aquí contradice esos archivos, manda `CLAUDE.md`.

## Qué es

Sitio de Rodolfo-Freelance: portafolio y servicios freelance para pymes chilenas.
- **Frontend:** HTML, CSS y JS vanilla con Web Components nativos en light DOM (`public/`).
- **Blog y «Cómo trabajo»:** generados con Eleventy desde `content/` (Markdown y Nunjucks).
- **Backend:** API Express en `server/` que valida el formulario de contacto y lo envía por Gmail (Nodemailer). El frontend no tiene secretos.
- **Despliegue:** Netlify, que ejecuta `npm run build` y publica `dist/`.

## Comandos

```bash
npm install            # dependencias
npm run build          # CSS + JS + Eleventy (lo que corre Netlify)
npm run build:css      # tras editar cualquier CSS de public/css/
npx @11ty/eleventy     # solo dist/ (artículos y plantillas)
npm start              # producción local (http://localhost:3000)
```

## Reglas que no se deben romper

1. **El servidor sirve `dist/`, no `public/`.** Después de editar `public/`, corre `npm run build` antes de probar. Si no, el cambio no se ve.
2. **Netlify instala con `NODE_ENV=production`, que omite `devDependencies`.** Todo lo que el build necesita (`clean-css`, `terser`, `@11ty/eleventy`) debe estar en `dependencies`. Antes de subir cambios de dependencias: `NODE_ENV=production npm ci && npm run build`.
3. **`app.css` y `main.min.js` son generados.** No se editan a mano. `app.css` sale minificado con `clean-css` (nivel 1), así que en git aparece como una sola línea.
4. **Seguridad:**
   - Credenciales de Gmail solo en `.env`, con App Password.
   - Nada de `innerHTML` con datos del usuario. Usa `RFKIT.fragment()` o plantillas estáticas.
   - No usar `style="..."` ni scripts inline en HTML (la CSP bloquea `unsafe-inline`).
   - Orden de middlewares en `routes/contact.js`: `contactLimiter → checkOrigin → verifyToken → validators`.
   - Un cambio de CSP se hace en `server/index.js` **y** en `netlify.toml`, a la vez.
5. **GTM, GA4 y Clarity** deben cargarse en todas las páginas (`gtm.js` y `clarity.js`). GTM y Trusted Types van en el `<head>` sin `defer`, en ese orden. `theme.js` es síncrono a propósito.
6. **Textos del HTML precargado:** si cambias un componente en `public/js/components/`, actualiza también la copia estática en `public/index.html` (y `privacidad.html` si aplica). El header y el footer tienen además un partial en `_includes/partials/`. Las copias deben coincidir.
7. **Accesibilidad y contraste (4,5:1):**
   - Texto naranja: `--color-text-accent`. Fondo de botones: `--color-action`.
   - `--color-primary` (`#FF5F01`) es solo para bordes, resplandores y franjas. No usarlo para texto.
   - Los ajustes de contraste son solo para modo claro. El modo oscuro queda como está en `feature/naranja-oscuro`.
8. **Tema:** por defecto arranca en oscuro. La elección del visitante se guarda en `localStorage` (`rf-theme`) y tiene prioridad.
9. **Hover:** solo color, borde o brillo. Las tarjetas de giro (flip) **no** giran por hover; solo lo hace el botón de flecha. Toda animación respeta `prefers-reduced-motion`.
10. **Scroll snap:** la sección con acordeones (`.section:has(.card--accordion)`) no es punto de ajuste. Sin eso, al cerrar un acordeón la página salta.
11. **Iconos de giro:** arrows-rotate, 26 px, en todas las tarjetas (regla general `.pillar__arrow`).

## Dónde está qué

| Qué | Dónde |
|---|---|
| Tokens de color y modo oscuro | `public/css/variables.css` |
| Estilos (fuente) | `public/css/styles.css`, `responsive.css`, `fonts.css`, `reset.css` |
| Componentes de la portada y secciones | `public/js/components/` |
| Helpers compartidos (`RFKIT`) | `public/js/core/kit.js` |
| Datos de servicios de la portada | `public/js/data.js` |
| Tema claro/oscuro | `public/js/theme.js` |
| Contenido del blog | `content/blog/posts/*.md`, `content/_data/blogTabs.json` |
| «Cómo trabajo» | `content/como-trabajo/index.njk`, `content/_data/*.json` |
| Pie y menú estáticos | `_includes/partials/` |
| API y correo | `server/` |
| Headers y redirects de Netlify | `netlify.toml` |

## Convenciones

- **Idioma:** código en inglés; textos visibles en español (tuteo, lenguaje sencillo para dueños de pymes).
- **Commits:** no hacer commit ni push sin que el usuario lo pida. Las ramas de trabajo actuales son `main` y `feature/naranja-oscuro` (PR #21).
- **Documentación:** al cambiar comportamiento, actualiza `SPEC.md` y `CLAUDE.md` en la misma tarea.
- **Verificación visual:** después de cambiar CSS o componentes, revisa la página con `npm run build` y, si es posible, en el navegador en modo claro y oscuro.
- **Blog:** cada artículo lleva front matter completo, 2 a 4 enlaces internos, enlaces externos solo a fuentes verificadas y el CTA final con `blogCta`. Detalle en `CLAUDE.md`, sección «Blog (Eleventy)».

## Memoria
-al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
-Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su porqué) y errores a evitar
-Mantenlo brevo máximo 50 líneas: resume o elimina lo que ya no aporte.
-si algo se convierte en una regbla permanente, propón moverlo a `AGENTS.md` en lugar de dejarlo en la memoria.
_
- No guardes nunca datos sensibles (claves, tokens, datos personales)