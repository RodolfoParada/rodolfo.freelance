# CLAUDE.md

Guía para asistentes de IA (Claude/opencode/Antigravity) que trabajen en este repositorio.

## Resumen del proyecto

**Rodolfo-Freelance** es un sitio web de portafolio/servicios freelance con navegación scroll-page y página dedicada de Política de Privacidad (`privacidad.html`), construido con HTML, CSS y JavaScript vanilla mediante **Web Components nativos** en el frontend, y una API Node.js/Express en el backend cuyo trabajo es validar y enviar el formulario de contacto por correo a una cuenta de Gmail usando Nodemailer.

Además tiene un **blog para pymes** (`/blog/`) y la página **Cómo trabajo** (`/como-trabajo/`), generados con **Eleventy** a partir de Markdown y plantillas Nunjucks. Las reglas del blog están en la sección [Blog (Eleventy)](#blog-eleventy) y las de la página de servicios en [Página «Cómo trabajo»](#página-cómo-trabajo).

## Arquitectura

```
rodolfofreelance/
├── content/                       # Fuente de Eleventy (blog y Cómo trabajo)
│   ├── _data/
│   │   ├── blogTabs.json          # Pestañas del blog (slug, nombre visible, URL), en orden
│   │   ├── site.json              # URL, nombre del sitio e imagen para compartir (SEO)
│   │   ├── services.json          # Cómo trabajo: bloques y tarjetas de servicio
│   │   ├── processes.json         # Cómo trabajo: procesos y sus etapas
│   │   └── tools.json             # Cómo trabajo: herramientas agrupadas por área
│   ├── blog/
│   │   ├── index.njk              # Pestaña "Todos" (+ index.11tydata.js: imagen y paginación)
│   │   ├── <pestaña>/index.njk    # Una carpeta por pestaña (+ index.11tydata.js)
│   │   └── posts/                 # Un .md por artículo (+ posts.11tydata.json: layout y URL)
│   └── como-trabajo/index.njk     # Página de servicios: tarjetas en carrusel, procesos y herramientas
├── _includes/
│   ├── components/                # Componentes Nunjucks reutilizables (macros)
│   │   ├── carousel.njk           # carousel(opts): carrusel con flechas ← → (envuelve tarjetas con {% call %})
│   │   ├── service-card.njk       # serviceCard(card, services): tarjeta de servicio
│   │   ├── process.njk            # processToggle(p) y processPanel(p): botón y panel de un proceso
│   │   └── tools.njk              # toolGroups(tools): grupos de herramientas
│   ├── base.njk                   # <head> (título, descripción, canonical, Open Graph), header y footer
│   ├── blog-listing.njk           # Portada de cada pestaña: título, pestañas, destacado, grilla, paginación
│   └── post.njk                   # Artículo: botón Atrás, índice lateral, cuerpo y "Sigue leyendo"
├── eleventy.config.js             # Colecciones, filtros de fecha, shortcode {% blogCta %} y copia de public/ a dist/
├── plugins/sitemap.js             # Genera dist/sitemap.xml en cada build
├── scripts/                       # build-css.js (une el CSS en app.css) y build-js.js (minifica main.js)
├── netlify/functions/server.js    # La API Express como función de Netlify (/api/*)
├── originales/                    # Imágenes originales en alta resolución: solo locales (en .gitignore, no se publican ni se suben a git)
├── dist/                          # Sitio generado (no editar, no se sube a git)
├── public/                        # Frontend estático (se copia tal cual a dist/)
│   ├── index.html                 # Página principal (compuesta por Web Components)
│   ├── privacidad.html            # Página de Política de Privacidad (<privacy-section>)
│   ├── css/
│   │   ├── fonts.css              # @font-face (Plus Jakarta Sans autoalojada)
│   │   ├── reset.css              # Normalización base
│   │   ├── variables.css          # Design tokens (paleta 60-30-10 + modo oscuro)
│   │   ├── styles.css             # Layout, tarjetas 3D flip, formulario, footer, acordeón legal, blog
│   │   ├── responsive.css         # Media queries (móvil y tablet)
│   │   └── app.css                # GENERADO por scripts/build-css.js: no editar a mano
│   ├── js/
│   │   ├── data.js                # Datos estáticos (DESARROLLO: 6 cards, MARKETING: 4 cards)
│   │   ├── theme.js               # Modo claro/oscuro (síncrono en <head>, clave rf-theme)
│   │   ├── toc.js                 # Índice lateral de los artículos ("En este artículo")
│   │   ├── blog-back.js           # Botón "Atrás" del artículo: vuelve a la pestaña de origen
│   │   ├── svc-carousel.js        # Carrusel compartido ([data-carousel]): flechas ← → sobre scroll-snap
│   │   ├── svc-flows.js           # Cómo trabajo: abre un proceso a la vez desde su botón en el carrusel
│   │   ├── core/
│   │   │   └── kit.js             # Helpers compartidos (namespace global RFKIT)
│   │   ├── components/            # Un Web Component reutilizable por archivo
│   │   │   ├── site-header.js     # <site-header> — navbar fija con tema y menú móvil
│   │   │   ├── site-footer.js     # <site-footer> — footer de 4 columnas + barra legal
│   │   │   ├── cta-banner.js      # <cta-banner> — bloque CTA reutilizable con atributos
│   │   │   ├── hero-section.js    # <hero-section> — inicio, dolores, 2 pilares 3D, métricas y CTA
│   │   │   ├── about-section.js   # <about-section> — filosofía, 4 pilares 3D, tabs y CTA
│   │   │   ├── services-section.js# <services-section> — Desarrollo (en carrusel) y Marketing
│   │   │   ├── marketing-section.js# <marketing-section> — grilla independiente opcional
│   │   │   ├── contact-section.js # <contact-section> — panel de impacto azul + formulario
│   │   │   └── privacy-section.js # <privacy-section> — banner legal + índice y acordeón
│   │   ├── main.js                # Render de tarjetas [data-cards], menú, scroll-spy, acordeón, form
│   │   └── main.min.js            # GENERADO por scripts/build-js.js: no editar a mano
│   └── assets/
│       ├── fonts/                 # Plus Jakarta Sans (.woff2, subset latin)
│       ├── icons/                 # favicon.svg (cuadrado azul + estrella 8 puntas)
│       └── img/                   # Portadas del blog (1200×675) y og-image.png (1200×630)
├── server/
│   ├── index.js                   # App Express, helmet, CSP, static, montaje de rutas
│   ├── config.js                  # Lectura de .env y validación
│   ├── mailer.js                  # Transporte Gmail + envío + escapeHtml / sanitizeHeader
│   ├── middleware/
│   │   ├── csrf.js                # Double-submit cookie token (rf_csrf)
│   │   ├── origin.js              # Verificación de Origin/Referer
│   │   └── rateLimit.js           # Limitadores general (100/15m) y de contacto (5/15m)
│   └── routes/
│       └── contact.js             # Validación (express-validator) + envío
├── .env.example
├── .gitignore
├── package.json
└── CLAUDE.md  SPEC.md  PLAN.md  README.md
```

El frontend **no** contiene secretos. Todo el envío de correo ocurre en el backend.

## Comandos

```bash
npm install          # instalar dependencias
cp .env.example .env # configurar variables (completar valores)
npm run dev          # build completo + servidor con --watch (http://localhost:3000)
npm start            # producción
npm run build        # build:css + build:js + build:site (lo que corre Netlify)
npm run build:css    # regenera public/css/app.css después de editar cualquier CSS
npx @11ty/eleventy   # regenera solo dist/ (rápido, al editar artículos o plantillas)
npm run lint         # (si se añade linter)
```

Netlify ejecuta `npm run build` y publica `dist/` desde lo que está en GitHub: todo archivo nuevo que use el sitio (componentes, datos, imágenes, scripts) debe estar en git o el build fallará.

`npm run dev` no vigila los artículos: después de editar un `.md`, una plantilla o el CSS, vuelve a correr `npx @11ty/eleventy` (y `npm run build:css` si tocaste CSS) y recarga el navegador con Ctrl + Shift + R.

## Convenciones de código y componentes reutilizables

- **Idioma de código**: variables y funciones en inglés; textos visibles en español.
- **Arquitectura de Web Components (`public/js/components/`)**:
  - Todo bloque estructural o sección es un **Web Component nativo** en **light DOM** registrado mediante `RFKIT.define(name, render)`.
  - `public/js/core/kit.js` expone el namespace global `RFKIT` con:
    - `fragment(html)`: crea un `DocumentFragment` desde un template string estático.
    - `el(tag, className, text)`: crea un elemento DOM con `textContent` seguro.
    - `attr(host, name, fallback)`: lee atributos de configuración del custom element.
    - `sectionShell(id, modifiers)` y `sectionHeader(eyebrow, title, lead)`.
    - `blockTitle(title, subtitle)`: genera encabezados `<h2 class="block__title">`.
    - `flipHint()`: genera el botón de flecha `<button class="pillar__hint">` (aria-label "Ver detalles") que gira la tarjeta.
    - `flipBackHint()`: genera el botón de vuelta `<button class="pillar__hint pillar__hint--back">` (aria-label "Volver") para la cara trasera.
    - `carousel(track, labels)`: envuelve una grilla (con `id` y clase `svc-carousel__track`) en el carrusel compartido con sus flechas ← →; `labels = { prev, next }` es opcional. La página debe cargar `svc-carousel.js`.
    - `bindFlipCard(card)`: añade el botón de vuelta a la cara trasera (`[class*="__face--back"]`) y enlaza el clic de la flecha (`.pillar__hint`) y del botón de vuelta para alternar/quitar `.is-flipped`. Solo estos botones giran la tarjeta: no hay giro por hover, por foco ni por clic en el resto.
    - `renderCardsSection(host, config)` y `define(name, render)`: `define` renderiza al `DOMContentLoaded` si el documento aún carga (así el HTML precargado ya está leído).
  - Catálogo de componentes:
    - `<site-header>`: barra de navegación superior; detecta si está en `privacidad.html` para anteponer `index.html` a los enlaces de ancla.
    - `<site-footer>`: pie de página en 4 columnas (`Rodolfo-Freelance`, `EXPLORAR`, `CONTACTO & COBERTURA`, `SÍGUEME`) y barra legal inferior. Usa `replaceChildren` para no duplicar la copia estática.
    - `<cta-banner>`: banner de llamada a la acción reutilizable (usado en `<hero-section>` y `<about-section>`). Soporta los atributos `title`, `text`, `primary-text`, `primary-href`, `secondary-text`, `secondary-href` y `note` (usar `"none"` para ocultar elementos opcionales). Valores por defecto: título *¿Hablamos de lo que necesita resolver tu negocio?*, botón **Agenda tu reunión** (`#contacto`), secundario oculto (`secondary-text` = `"none"`) y leyenda de 72 horas hábiles.
    - `<hero-section>`: sección `#inicio` con hero (`<h1>` = etiqueta *DESARROLLO WEB & GESTIÓN OPERATIVA*, línea *Servicios 100% remoto para negocios de todo Chile*, `<h2>` con el título y la descripción, botones **Agenda tu reunión** / **Explorar servicios**), bloque de dolores (3 tarjetas), **Servicios en 2 Pilares** (2 tarjetas giratorias), cita y `<cta-banner>`.
    - `<about-section>`: sección `#acerca` con intro/manifiesto (incluye la pregunta *¿Cuéntame qué necesita tu negocio hoy?* y el botón **Agenda tu reunión**), 4 pilares en tarjetas giratorias, pestañas accesibles (`buildTabs`) y un diseño de 2 columnas (`.about-dual`): `<cta-banner>` a la izquierda y *Mi Compromiso* + *Cómo abordamos tu proyecto* a la derecha.
    - `<services-section>`: sección `#desarrollo` que agrupa los bloques de **Desarrollo** (`[data-cards="desarrollo"]`, tarjetas giratorias **dentro de un carrusel**: la grilla lleva `.svc-carousel__track` y el componente la envuelve con `carousel()` y sus flechas) y **Marketing** (etiqueta *Servicios de Asistente Virtual Freelance* + `[data-cards="marketing"]`, tarjetas en acordeón, sin carrusel). La copia estática de `index.html` repite la estructura del carrusel.
    - `<contact-section>`: sección `#contacto` con layout de 2 columnas (panel de confianza `.contact-panel` + formulario `#contact-form`). Eyebrow *Hablemos de tu proyecto* y texto de coordinación por Google Meet.
    - `<privacy-section>`: sección de Política de Privacidad con banner `.legal-hero`, índice lateral `CONTENIDO` y 8 tarjetas en acordeón (`[data-legal-accordion]`).
- **Tarjetas giratorias (flip)**:
  - Presentes en **Servicios en 2 Pilares** (`<hero-section>`), **Mis 4 Pilares de Trabajo** (`<about-section>`) y **Desarrollo** (`main.js` + `data.js`, flag `flip: true`).
  - Solo el botón de flecha gira la tarjeta: `RFKIT.flipHint()` (cara frontal, abajo a la derecha) y `RFKIT.flipBackHint()` (cara trasera, abajo a la izquierda, lo añade `bindFlipCard`). Ni el hover ni el clic en el resto de la tarjeta la giran, y las tarjetas no llevan `tabIndex`.
  - En Desarrollo, `.card--flip .card__face--front` centra el título y la descripción entre la etiqueta y el borde; la altura mínima es 14rem (`.grid[data-cards="desarrollo"] .card__inner3d`).
  - Las tarjetas de **Marketing** (`main.js` + `data.js`, flag `accordion: true`) usan un **acordeón** ("Ver funciones" con un botón **+**/×, `.card--accordion`, `aria-expanded`). `equalizeAccordionCards()` iguala la altura de los resúmenes cerrados y `.card__summary` centra el título y la descripción entre la etiqueta y la línea divisoria.
  - El botón de flecha tiene un área táctil mínima de 44 px (`.pillar__hint`).
- **CSS**:
  - Metodología BEM ligera (`bloque__elemento--modificador`).
  - Colores, espaciados y sombras en `variables.css`. El modo oscuro se declara en `:root[data-theme="dark"]` en `variables.css`.
  - Nunca usar atributos `style="..."` en HTML ni scripts inline: la CSP de `server/index.js` bloquea `unsafe-inline`.
  - Edita los archivos fuente (`styles.css`, etc.) y luego corre `npm run build:css`: el sitio carga `app.css`, que se genera.

## Blog (Eleventy)

El blog vive en `content/` y se genera en `dist/`. Está dirigido a **pymes chilenas**: dueños de negocio sin formación técnica.

### Pestañas

- Las pestañas se definen en `content/_data/blogTabs.json` (orden = orden visible). Hoy: Todos, WordPress, Desarrollo WEB, Marketing Digital, Prospección Comercial, Atención al Cliente y Administración & E-Commerce.
- Cada pestaña tiene una carpeta `content/blog/<slug>/` con:
  - `index.njk`: front matter con `title`, `activeTab`, `seoTitle` y `description` (para Google), e `{% include "blog-listing.njk" %}`.
  - `index.11tydata.js`: `tabImage`, `tabImageAlt`, `firstUrl`, `pageBase`, la paginación sobre `collections.<slug>` y el `permalink`. Copia uno existente y cambia el slug.
- Cada página de pestaña muestra 1 artículo destacado + 6 tarjetas (7 en total); las páginas siguientes muestran 6 (`/blog/<slug>/pagina/N/`).
- El título y la bajada del blog son los mismos en todas las pestañas: están en `_includes/blog-listing.njk`.

### Artículos

- Un archivo por artículo en `content/blog/posts/<slug>.md`. La URL queda en `/blog/<slug>/`. El slug va en minúscula, con guiones y sin tildes.
- Front matter obligatorio:
  ```yaml
  title: "Título claro, idealmente de menos de 65 caracteres"
  description: "120 a 160 caracteres: qué aprende el lector. Es la descripción en Google."
  date: 2026-10-21T23:40:00Z
  tags: <slug de la pestaña>      # wordpress, desarrollo, marketing, prospeccion, atencion-cliente, administracion-ecommerce
  categoryName: <nombre visible>  # igual al "name" de blogTabs.json
  ```
- **Orden:** se ordena por `date`, del más nuevo al más antiguo. Si varios artículos tienen el mismo día, usa la hora (`T23:40:00Z`) para fijar cuál sale destacado.
- **Estructura:** introducción breve → secciones `##` (alimentan el índice lateral) → `## En resumen` → bloque CTA al final. Usa `###` dentro de una sección.
- **CTA final** (obligatorio, propio del tema del artículo), con el shortcode `blogCta` (definido en `eleventy.config.js`; genera el bloque `.blog-cta`):
  ```njk
  {% blogCta "Pregunta que conecte con el problema del artículo", "Qué haces tú por el lector, en una o dos frases." %}
  ```
  Por defecto el botón es **Agenda tu reunión** a `/#contacto`. Para otro botón: `{% blogCta "Título", "Texto", "Conoce cómo trabajo", "/como-trabajo/" %}`. No uses comillas dobles dentro de los textos.
- **Enlaces internos:** cada artículo enlaza a 2 o 3 artículos relacionados con `[texto](/blog/<slug>/)`. Verifica que el slug exista.

### Componentes para artículos (en `styles.css`)

Dentro de un `.md`, los bloques HTML no pueden tener líneas en blanco por dentro (si las tienen, Markdown los rompe).

- **Tabla** (`.blog-table`): en móvil cada fila se convierte en tarjeta; cada celda, salvo la primera, lleva `data-label` igual a su encabezado.
  ```html
  <div class="blog-table">
  <table>
  <caption>Título de la tabla</caption>
  <thead>
  <tr>
  <th scope="col">Columna 1</th>
  <th scope="col">Columna 2</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>Fila</td>
  <td data-label="Columna 2">Valor</td>
  </tr>
  </tbody>
  </table>
  </div>
  ```
- **Pasos numerados** (`.blog-steps`): `<ol class="blog-steps">` con un `<li>` por paso; dentro, `<p class="blog-steps__meta">` (opcional, por ejemplo "Día 1"), `<p class="blog-steps__title">` y párrafos. Dentro de un `<li>` los enlaces van en HTML (`<a href>`), no en Markdown.
- **Guion o mensaje sugerido** (`.blog-script`): `<p class="blog-script">«Texto…»</p>`.
- **Bloques de código**: Markdown con triple acento grave; tienen desplazamiento horizontal propio en móvil.
- **Listas**: Markdown normal, con el inicio en negrita (`- **Idea:** explicación`).

### Diagramas (SVG en línea)

Los diagramas se dibujan como SVG dentro del `.md`, envueltos en `<figure>` con `<figcaption><p>…</p></figcaption>`. No uses dibujos de texto (ASCII).

- Base: `<svg viewBox="0 0 480 H" width="440" role="img" aria-labelledby="id-title id-desc" fill="none" stroke="currentColor" stroke-width="1.5">` con `<title id>` y `<desc id>` (descripción completa para lectores de pantalla). Los `id` deben ser únicos en la página.
- **Colores:** usa `currentColor` (sigue el modo claro/oscuro) con `fill-opacity` (0.04 cajas normales, 0.14 caja destacada con `stroke-width="2.5"`). Los círculos numerados van en `#3368A0` con texto `#FFFFFF`. **No pongas texto blanco sobre `currentColor`**: desaparece en modo oscuro.
- **Legible en móvil:** el SVG se reduce a ~73 % en un celular de 390 px. Usa al menos 19–21 px en títulos y 17–18 px en textos, y diseños **verticales** (pasos en filas, embudos, líneas de tiempo). Evita poner 3 o más columnas de texto lado a lado.
- Solo atributos de presentación (`fill`, `stroke`, `font-size`…). Nunca `style="…"` ni `<script>`: la CSP los bloquea.
- Antes de dar por terminado un diagrama, revísalo con una captura en 390 px y en modo oscuro (por ejemplo, Chrome sin interfaz: `google-chrome --headless=new --window-size=390,4000 --screenshot=… URL` y `--blink-settings=preferredColorScheme=0` para el modo oscuro).

### Imágenes de portada

- Una por pestaña, en `public/assets/img/`, configurada en `tabImage` y `tabImageAlt` del `index.11tydata.js` de la pestaña.
- **Formato final:** WebP de **1200 × 675 px** (16:9) y menos de ~110 KB. Se muestra completa (`object-fit: contain`).
- Si la imagen original tiene otra proporción (por ejemplo 1536 × 1024), **no la recortes si pierde contenido**: ajústala completa al alto de 675 px, céntrala y rellena los costados con la misma imagen desenfocada y algo oscurecida.
- Guarda el original en `originales/<nombre>-original.webp`. Esa carpeta está en `.gitignore`: no se publica ni se sube a GitHub, así que es solo un respaldo local (respáldala también fuera del proyecto si la necesitas).
- **Nombres de archivo:** minúsculas, palabras separadas por guion, sin espacios, tildes, `ñ`, `&` ni guion bajo (`atencion-cliente.webp`). Netlify distingue mayúsculas de minúsculas.

### SEO

- `_includes/base.njk` arma el `<head>` de todas las páginas de Eleventy: `<title>`, `description`, `canonical`, Open Graph y Twitter Card, con los datos de `content/_data/site.json`.
- Título: usa `seoTitle` si existe; si no, `title` + « | Rodolfo-Freelance» cuando el título tiene 45 caracteres o menos (los largos van sin la marca para que Google no los corte). Las páginas 2+ agregan «– Página N».
- Los artículos se marcan como `og:type = article` (desde `posts.11tydata.json`).
- `plugins/sitemap.js` genera `sitemap.xml` con todas las páginas. Si agregas una pestaña, súmala también a la expresión regular de `priorityFor`.

### Contenido y tono

- Escribe para **personas** (dueños de pymes), no para especialistas: frases cortas, tuteo, ejemplos chilenos y términos técnicos explicados la primera vez (con el término en inglés entre paréntesis si es útil).
- Tono cercano y suave: sin promesas absolutas, sin cifras sin fuente y sin jerga de agencia.
- **Verifica que la información sea correcta y actual** antes de publicar, en especial normativa chilena (SII, Ley 21.131 de pago a 30 días, Ley 21.719 de datos personales que rige desde diciembre de 2026, SERNAC), funciones de herramientas (Google, WhatsApp Business, HubSpot…) y requisitos de Google. Si un dato no se puede confirmar, suavízalo o recomienda verificarlo.
- Datos de ejemplo siempre ficticios y evidentes (`Nombre Apellido`, `Distribuidora Ejemplo SpA`, `+56 9 0000 0000`, RUT `76.xxx.xxx-x`). Nunca teléfonos, correos o dominios que puedan ser reales.
- Para no duplicar contenido, un mismo texto no se publica en dos pestañas.

## Página «Cómo trabajo»

`content/como-trabajo/index.njk` (Eleventy, `/como-trabajo/`). Usa estilos `svc-*` de `styles.css` y carga `svc-flows.js` y `svc-carousel.js` al final del archivo (scripts externos con `defer`, por la CSP).

**El contenido no se edita en el HTML:** la página arma los bloques con los componentes de `_includes/components/` a partir de los datos de `content/_data/`:

| Para cambiar… | Edita |
|---|---|
| Una tarjeta de servicio (título, textos, alcance, guía) o agregar/quitar una | `services.json` → `groups[].cards[]` |
| El texto común «Alcance según requerimiento» o «Cotiza Aquí» | `services.json` → `scopeTitle` y `quote` |
| Un proceso, su nombre de flujo o sus etapas | `processes.json` |
| Una herramienta o un grupo | `tools.json` |
| La estructura HTML de una tarjeta, proceso, carrusel o grupo | El componente en `_includes/components/` (cambia todas las instancias a la vez) |

Campos de una tarjeta en `services.json`: `id` (opcional, ancla), `tag` (opcional, etiqueta de categoría), `title`, `titleNowrap` (opcional, parte del título que no debe cortarse, como «(E-Commerce)»), `texts` (párrafos), `scope` (lista del alcance) y `guide` (`href`, `text` sin la flecha). Los textos van como texto plano: Nunjucks escapa los caracteres especiales (`&` → `&amp;`).

### Estructura

1. **Hero** (`.svc-hero`): `<h1>` *Desarrollo web a medida y soluciones WordPress para negocios en Chile*. El título y la descripción para Google van en `seoTitle` y `description` del front matter.
2. **Servicios** (`.svc-section`):
   - Eyebrow *Qué hago*, `<h2>` *Servicios de desarrollo web, WordPress, marketing digital y gestión administrativa* y bajada *Para que te enfoques en lo importante.*
   - Índice `.svc-index` (estilo `.blog-tab`) con dos enlaces: **Desarrollo Web y WordPress** (`#desarrollo-web`) y **Soporte Operativo** (`#soporte-operativo`).
   - Dos bloques, cada uno con su `<h3 class="svc-group-title" id="…">` y un carrusel de tarjetas:
     - **Desarrollo Web y WordPress** (`#carrusel-desarrollo`, 5 tarjetas).
     - **Soporte operativo para tu negocio** (`#carrusel-soporte`, 6 tarjetas, cada una con su etiqueta `.svc-card__tag`: Marketing, Ventas, Atención al cliente, Administración o E-commerce, e `id` para enlazarla).
3. **Cómo trabajo** (`#como-trabajo`, `.svc-section--alt`): una fila de 6 botones de proceso en carrusel (`.svc-carousel__track--tabs`) y debajo un panel por proceso (`.svc-flow`) con el nombre del flujo y el diagrama de 5 etapas.
4. **Herramientas con las que trabajo** (`.svc-tech`): 5 grupos (`.svc-tech__group` con `<h3>` y `<dl>`): Desarrollo web, Medición y SEO, Marketing, Ventas y atención, Operación.
5. **CTA final** (`.svc-cta`).

Jerarquía de títulos: `h1` → `h2` por sección → `h3` por bloque, proceso o grupo → `h4` por tarjeta o etapa. No te saltes niveles.

### Tarjeta de servicio (`.svc-card`)

Cada tarjeta sigue la misma estructura (ordena así el contenido que te pasen: título, para quién, qué problema resuelve, qué incluye, guía y cotización):

```html
<article class="svc-card" id="opcional">
  <p class="svc-card__tag">Categoría</p>                <!-- solo en Soporte operativo -->
  <h4 class="svc-card__title">Nombre del servicio con palabras que busca el cliente</h4>
  <p class="svc-card__text">Para quién es y qué problema tiene.</p>
  <p class="svc-card__text">Qué haces tú y qué resultado obtiene.</p>
  <details class="svc-scope">
    <summary class="svc-scope__toggle">Alcance según requerimiento<span class="card__toggle-icon" aria-hidden="true"></span></summary>
    <ul class="svc-card__list">
      <li>…</li>
    </ul>
  </details>
  <a class="svc-card__link" href="/blog/<pestaña>/">Guía de … →</a>
  <a class="svc-card__price svc-card__price--link" href="/#contacto">Cotiza Aquí →</a>
</article>
```

- Una tarjeta = **un servicio y un problema**. Si el texto mezcla dos clientes o dos problemas distintos (por ejemplo, sitio web y tienda online), sepáralo en dos tarjetas.
- El problema se resume en 1 o 2 frases (no en bloques largos). Términos técnicos en palabras simples («adaptado a celulares», no «responsive»); una sigla nueva se explica la primera vez (MVP, GEO).
- «Alcance según requerimiento» es un `<details>` nativo: sin JavaScript, accesible con teclado y legible por Google aunque esté cerrado. El ícono **+** es el de Marketing (`.card__toggle-icon`) y gira a **×** con `[open]`.
- La guía va en singular («Guía de …») y enlaza a la pestaña del blog del tema. «Cotiza Aquí →» siempre lleva a `/#contacto`.
- El enlace de la guía tiene `margin-top: auto`: queda fijo al fondo y alineado en toda la fila, aunque la tarjeta tenga poco texto.

### Carrusel (`.svc-carousel`, compartido con la portada)

```html
<div class="svc-carousel" data-carousel>
  <h3 class="svc-group-title" id="…">Título</h3>
  <div class="svc-carousel__viewport">
    <button class="svc-carousel__btn svc-carousel__btn--prev" type="button" data-carousel-prev aria-controls="ID" aria-label="Servicio anterior"><span aria-hidden="true">←</span></button>
    <button class="svc-carousel__btn svc-carousel__btn--next" type="button" data-carousel-next aria-controls="ID" aria-label="Servicio siguiente"><span aria-hidden="true">→</span></button>
    <div class="svc-grid svc-carousel__track" id="ID" role="region" aria-label="…" tabindex="0">…tarjetas…</div>
  </div>
</div>
```

- El desplazamiento es CSS (`scroll-snap`): dedo, rueda del mouse y teclado. 3 tarjetas visibles en escritorio, 2 en tablet y 1 (con un borde de la siguiente) en móvil. Sin barra de desplazamiento visible.
- Las flechas van a los costados, a media altura; se rellenan de azul al pasar el mouse o con foco, y **se ocultan en el extremo** donde no hay más tarjetas (`svc-carousel.js`). Nunca hay avance automático.
- Las tarjetas de una fila mantienen la misma altura (la de la más alta del carrusel), para que «Guía» y «Cotiza Aquí» queden alineados.
- `svc-carousel.js` se inicia en `DOMContentLoaded` (después de que los componentes y `main.js` dibujan las tarjetas) y se actualiza si cambian. En la portada también acepta `.grid[data-cards].svc-carousel__track`.

### Procesos (`#como-trabajo`)

- Cada proceso tiene un botón en la fila (`<h3 class="svc-flow__title"><button class="svc-flow__toggle" id="proceso-x-boton" aria-expanded aria-controls="proceso-x">`) y un panel `<div class="svc-flow" id="proceso-x" role="region" aria-labelledby="proceso-x-boton" data-flow-panel>`.
- `svc-flows.js` cierra todos al cargar y abre **uno a la vez** (el botón abierto se pinta de azul y su **+** gira a **×**). Sin JavaScript se ven todos abiertos. Un enlace a `#proceso-x` abre ese proceso.
- Cada panel: `<p class="svc-flow__name">` con el **nombre del flujo** («Proceso de … en 5 etapas: de … a …») y un `<ol class="svc-steps">` de 5 `<li class="svc-step">` (número `.svc-step__num` + `.svc-step__body` con `<h4>` y texto).
- El diagrama es solo CSS: horizontal con flechas en escritorio y línea de tiempo vertical en tablet y móvil (`@media (max-width: 1024px)`). La última etapa lleva un anillo.
- Procesos actuales: Desarrollo web y WordPress, Auditoría web UX y SEO, Marketing digital y redes sociales, Prospección comercial, Atención al cliente, Soporte administrativo & e-commerce.

## Seguridad — reglas que NO se deben romper

1. Las credenciales de Gmail **solo** viven en `.env` (nunca en el repo ni en el frontend). Usar siempre una **App Password** de Gmail.
2. No usar `innerHTML` con datos del usuario. En `mailer.js` todo se escapa con `escapeHtml` y `sanitizeHeader`.
3. Mantener en `routes/contact.js` el orden: `contactLimiter → checkOrigin → verifyToken → validators`.
4. Todo endpoint nuevo bajo `/api` debe pasar por el `generalLimiter`.
   - El formulario pide un token CSRF nuevo (`loadCsrfToken()`) antes de cada envío; no reutilizar el token de la carga inicial.
5. Cualquier cambio en la CSP (`server/index.js`) debe evitar habilitar `unsafe-inline`. La misma política está en `netlify.toml` (`[[headers]]`) para los archivos estáticos: cámbialas juntas.
6. Trusted Types está activo: el HTML dinámico solo se inserta con `RFKIT.fragment()` (política `rf-html`) y con plantillas estáticas. No uses `innerHTML` con datos del usuario.
7. No añadas atributos `style="..."` al HTML precargado (`index.html`, `privacidad.html`): la CSP los bloquea. Los estilos dinámicos van por JavaScript (CSSOM).
8. La protección del texto (`user-select: none` en `body` y el bloqueo de `copy`/`cut` en `main.js`) excluye los campos del formulario. No la quites sin revisar la accesibilidad.
9. Accesibilidad: el `role="tablist"` va en el contenedor de los botones `role="tab"` (`.commit-tabs__list`), no en el contenedor exterior. Los paneles `role="tabpanel"` son `div`, no `article`. El texto secundario debe cumplir 4,5:1 de contraste: usa `--color-muted` de `variables.css` y no bajes su opacidad.

## Puntos de extensión habituales

- **Añadir o editar un servicio**: editar `DESARROLLO` o `MARKETING` en `public/js/data.js`.
- **Reutilizar el banner CTA en otra sección**: insertar `<cta-banner title="..." text="..."></cta-banner>`. Los textos por defecto (título, botón **Agenda tu reunión**, leyenda de 72 horas hábiles) están en `DEFAULTS` de `cta-banner.js`.
- **Correo del formulario**: el asunto y el cuerpo se construyen en `server/mailer.js` (`sendContactEmail`); el HTML usa tablas y estilos en línea.
- **Cambiar el destinatario del correo**: variable `MAIL_TO` en `.env`.
- **Cambiar un texto de un componente**: actualizar también la copia estática en `public/index.html` (y `public/privacidad.html` si aplica), porque el HTML precargado es el que leen los buscadores.
- **Nuevas páginas o secciones**: crear un componente en `public/js/components/<nombre>.js` usando `RFKIT.define(...)`, incluirlo con `<script src="..." defer>` en `<head>` (sin `defer` bloquea el render; `theme.js` es la única excepción) y montar la etiqueta en `<main>`.
- **Nuevo artículo del blog**: crear `content/blog/posts/<slug>.md` con el front matter y la estructura de [Artículos](#artículos), correr `npx @11ty/eleventy` y revisar en `http://localhost:3000/blog/<slug>/` (celular y modo oscuro si tiene diagramas o tablas).
- **Nueva pestaña del blog**:
  1. Agregar `{ "slug", "name", "url" }` a `content/_data/blogTabs.json`.
  2. Copiar una carpeta de pestaña (`content/blog/<slug>/index.njk` + `index.11tydata.js`) y cambiar el slug en `activeTab`, `firstUrl`, `pageBase`, `collections.<slug>` y `permalink`, además de `title`, `seoTitle` y `description`.
  3. Sumar el slug a la expresión regular de `priorityFor` en `plugins/sitemap.js`.
  4. Los artículos de la pestaña usan `tags: <slug>` y `categoryName` igual al `name`.
  El botón "Atrás" (`blog-back.js`) la reconoce sola, porque lee `blogTabs.json`.
- **Cambiar el nombre visible de una pestaña**: cambiar `name` en `blogTabs.json`, `title` en su `index.njk` y `categoryName` en sus artículos. No cambies el slug (rompe las URL).
- **Imagen de portada de una pestaña**: seguir [Imágenes de portada](#imágenes-de-portada) y configurar `tabImage`/`tabImageAlt`.
- **Nuevo servicio en «Cómo trabajo»**: agregar un objeto a `groups[].cards` en `content/_data/services.json`, siguiendo [Tarjeta de servicio](#tarjeta-de-servicio-svc-card). El componente y el carrusel lo acomodan solos.
- **Nuevo proceso en «Cómo trabajo»**: agregar un objeto a `content/_data/processes.json` (`id` que empiece con `proceso-`, `title`, `name` y `steps`). El botón, el panel y su conexión accesible se generan solos, y `svc-flows.js` lo reconoce.
- **Carrusel en otra página de Eleventy**: `{% from "components/carousel.njk" import carousel %}` y `{% call carousel({ id, label, title, titleId }) %}…{% endcall %}`; carga `svc-carousel.js` con `defer` en esa página.
- **Carrusel en un Web Component**: `RFKIT.carousel(grilla)` (la grilla con `id` y clase `svc-carousel__track`), cargar `svc-carousel.js` con `defer` y actualizar también la copia estática del HTML.
- **Antes de dar por terminado un cambio de estructura**, compara el HTML generado con el anterior: si solo cambiaste cómo se arma (componentes, datos) y no el contenido, el `dist/` debe quedar idéntico (salvo espacios). Así el funcionamiento y el SEO no cambian.
