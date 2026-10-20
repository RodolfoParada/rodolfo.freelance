# CLAUDE.md

Guía para asistentes de IA (Claude/opencode/Antigravity) que trabajen en este repositorio.

## Resumen del proyecto

**Rodolfo-Freelance** es un sitio web de portafolio/servicios freelance con navegación scroll-page y página dedicada de Política de Privacidad (`privacidad.html`), construido con HTML, CSS y JavaScript vanilla mediante **Web Components nativos** en el frontend, y una API Node.js/Express en el backend cuyo trabajo es validar y enviar el formulario de contacto por correo a una cuenta de Gmail usando Nodemailer.

## Arquitectura

```
rodolfofreelance/
├── public/                        # Frontend estático (servido por Express)
│   ├── index.html                 # Página principal (compuesta por Web Components)
│   ├── privacidad.html            # Página de Política de Privacidad (<privacy-section>)
│   ├── css/
│   │   ├── fonts.css              # @font-face (Plus Jakarta Sans autoalojada)
│   │   ├── reset.css              # Normalización base
│   │   ├── variables.css          # Design tokens (paleta 60-30-10 + modo oscuro)
│   │   ├── styles.css             # Layout, tarjetas 3D flip, formulario, footer, acordeón legal
│   │   └── responsive.css         # Media queries (móvil y tablet)
│   ├── js/
│   │   ├── data.js                # Datos estáticos (DESARROLLO: 6 cards, MARKETING: 4 cards)
│   │   ├── theme.js               # Modo claro/oscuro (síncrono en <head>, clave rf-theme)
│   │   ├── core/
│   │   │   └── kit.js             # Helpers compartidos (namespace global RFKIT)
│   │   ├── components/            # Un Web Component reutilizable por archivo
│   │   │   ├── site-header.js     # <site-header> — navbar fija con tema y menú móvil
│   │   │   ├── site-footer.js     # <site-footer> — footer de 4 columnas + barra legal
│   │   │   ├── cta-banner.js      # <cta-banner> — bloque CTA reutilizable con atributos
│   │   │   ├── hero-section.js    # <hero-section> — inicio, dolores, 2 pilares 3D, métricas y CTA
│   │   │   ├── about-section.js   # <about-section> — filosofía, 4 pilares 3D, tabs y CTA
│   │   │   ├── services-section.js# <services-section> — grillas de Desarrollo y Marketing
│   │   │   ├── marketing-section.js# <marketing-section> — grilla independiente opcional
│   │   │   ├── contact-section.js # <contact-section> — panel de impacto azul + formulario
│   │   │   └── privacy-section.js # <privacy-section> — banner legal + índice y acordeón
│   │   └── main.js                # Render de tarjetas [data-cards], menú, scroll-spy, acordeón, form
│   └── assets/
│       ├── fonts/                 # Plus Jakarta Sans (.woff2, subset latin)
│       ├── icons/                 # favicon.svg (cuadrado azul + estrella 8 puntas)
│       └── img/
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
npm run dev          # desarrollo con --watch
npm start            # producción
npm run lint         # (si se añade linter)
```

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
    - `bindFlipCard(card)`: añade el botón de vuelta a la cara trasera (`[class*="__face--back"]`) y enlaza el clic de la flecha (`.pillar__hint`) y del botón de vuelta para alternar/quitar `.is-flipped`. Solo estos botones giran la tarjeta: no hay giro por hover, por foco ni por clic en el resto.
    - `renderCardsSection(host, config)` y `define(name, render)`: `define` renderiza al `DOMContentLoaded` si el documento aún carga (así el HTML precargado ya está leído).
  - Catálogo de componentes:
    - `<site-header>`: barra de navegación superior; detecta si está en `privacidad.html` para anteponer `index.html` a los enlaces de ancla.
    - `<site-footer>`: pie de página en 4 columnas (`Rodolfo-Freelance`, `EXPLORAR`, `CONTACTO & COBERTURA`, `SÍGUEME`) y barra legal inferior. Usa `replaceChildren` para no duplicar la copia estática.
    - `<cta-banner>`: banner de llamada a la acción reutilizable (usado en `<hero-section>` y `<about-section>`). Soporta los atributos `title`, `text`, `primary-text`, `primary-href`, `secondary-text`, `secondary-href` y `note` (usar `"none"` para ocultar elementos opcionales). Valores por defecto: título *¿Hablamos de lo que necesita resolver tu negocio?*, botón **Agenda tu reunión** (`#contacto`), secundario oculto (`secondary-text` = `"none"`) y leyenda de 72 horas hábiles.
    - `<hero-section>`: sección `#inicio` con hero (`<h1>` = etiqueta *DESARROLLO WEB & GESTIÓN OPERATIVA*, línea *Servicios 100% remoto para negocios de todo Chile*, `<h2>` con el título y la descripción, botones **Agenda tu reunión** / **Explorar servicios**), bloque de dolores (3 tarjetas), **Servicios en 2 Pilares** (2 tarjetas giratorias), cita y `<cta-banner>`.
    - `<about-section>`: sección `#acerca` con intro/manifiesto (incluye la pregunta *¿Cuéntame qué necesita tu negocio hoy?* y el botón **Agenda tu reunión**), 4 pilares en tarjetas giratorias, pestañas accesibles (`buildTabs`) y un diseño de 2 columnas (`.about-dual`): `<cta-banner>` a la izquierda y *Mi Compromiso* + *Cómo abordamos tu proyecto* a la derecha.
    - `<services-section>`: sección `#desarrollo` que agrupa los bloques de **Desarrollo** (`[data-cards="desarrollo"]`, tarjetas giratorias) y **Marketing** (etiqueta *Servicios de Asistente Virtual Freelance* + `[data-cards="marketing"]`, tarjetas en acordeón).
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
