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
    - `flipHint()`: genera el indicador visual de flecha `.pillar__hint` para tarjetas giratorias 3D.
    - `bindFlipCard(card)`: enlaza eventos táctiles (`click` en dispositivos sin hover) y de teclado (`Enter`/`Space`) para girar tarjetas 3D (`.is-flipped`).
    - `renderCardsSection(host, config)` y `define(name, render)`.
  - Catálogo de componentes:
    - `<site-header>`: barra de navegación superior; detecta si está en `privacidad.html` para anteponer `index.html` a los enlaces de ancla.
    - `<site-footer>`: pie de página en 4 columnas (`Rodolfo-Freelance`, `EXPLORAR`, `CONTACTO & COBERTURA`, `SÍGUEME`) y barra legal inferior.
    - `<cta-banner>`: banner de llamada a la acción reutilizable (usado en `<hero-section>` y `<about-section>`). Soporta los atributos `title`, `text`, `primary-text`, `primary-href`, `secondary-text`, `secondary-href` y `note` (usar `"none"` para ocultar elementos opcionales).
    - `<hero-section>`: sección `#inicio` con hero, bloque de dolores, 2 pilares en tarjetas 3D flip, métricas, puente a filosofía y `<cta-banner>`.
    - `<about-section>`: sección `#acerca` con intro/manifiesto, 4 pilares en tarjetas 3D flip, sistema de pestañas accesibles (`buildTabs`) y `<cta-banner>`.
    - `<services-section>`: sección `#desarrollo` que agrupa los bloques de **Desarrollo** (`[data-cards="desarrollo"]`) y **Marketing** (`[data-cards="marketing"]`).
    - `<contact-section>`: sección `#contacto` con layout de 2 columnas (panel de confianza `.contact-panel` + formulario `#contact-form`).
    - `<privacy-section>`: sección de Política de Privacidad con banner `.legal-hero`, índice lateral `CONTENIDO` y 8 tarjetas en acordeón (`[data-legal-accordion]`).
- **Tarjetas 3D Flip**:
  - Presentes en **Servicios en 2 Pilares** (`<hero-section>`), **Mis 4 Pilares de Trabajo** (`<about-section>`), y las tarjetas de **Desarrollo** y **Marketing** (`main.js` + `data.js`).
  - Todas incluyen en su cara frontal el indicador visual `.pillar__hint` (generado con `RFKIT.flipHint()`) y soporte de teclado/táctil (`RFKIT.bindFlipCard()`).
- **CSS**:
  - Metodología BEM ligera (`bloque__elemento--modificador`).
  - Colores, espaciados y sombras en `variables.css`. El modo oscuro se declara en `:root[data-theme="dark"]` en `variables.css`.
  - Nunca usar atributos `style="..."` en HTML ni scripts inline: la CSP de `server/index.js` bloquea `unsafe-inline`.

## Seguridad — reglas que NO se deben romper

1. Las credenciales de Gmail **solo** viven en `.env` (nunca en el repo ni en el frontend). Usar siempre una **App Password** de Gmail.
2. No usar `innerHTML` con datos del usuario. En `mailer.js` todo se escapa con `escapeHtml` y `sanitizeHeader`.
3. Mantener en `routes/contact.js` el orden: `contactLimiter → checkOrigin → verifyToken → validators`.
4. Todo endpoint nuevo bajo `/api` debe pasar por el `generalLimiter`.
5. Cualquier cambio en la CSP (`server/index.js`) debe evitar habilitar `unsafe-inline`.

## Puntos de extensión habituales

- **Añadir o editar un servicio**: editar `DESARROLLO` o `MARKETING` en `public/js/data.js`.
- **Reutilizar el banner CTA en otra sección**: insertar `<cta-banner title="..." text="..."></cta-banner>`.
- **Cambiar el destinatario del correo**: variable `MAIL_TO` en `.env`.
- **Nuevas páginas o secciones**: crear un componente en `public/js/components/<nombre>.js` usando `RFKIT.define(...)`, incluirlo con `<script>` en `<head>` y montar la etiqueta en `<main>`.
