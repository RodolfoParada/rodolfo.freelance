# PLAN.md — Plan de implementación

Plan por fases para construir, refinar y desplegar **Rodolfo-Freelance**.
El estado refleja el avance actual del repositorio.

---

## Fase 0 — Preparación del entorno
- [x] Verificar Node.js (`>=18`) y npm.
- [x] Definir estructura de carpetas (`public/` y `server/`).
- [x] Crear repositorio e inicializar control de versiones.

## Fase 1 — Frontend base y arquitectura de componentes (HTML/CSS/JS)
- [x] `index.html` y `privacidad.html` estructurados íntegramente con Web Components en light DOM.
- [x] `css/reset.css` y `css/variables.css` (design tokens, paleta 60-30-10 y modo oscuro).
- [x] `css/styles.css` y `css/responsive.css` (layout, tarjetas 3D flip, formulario en 2 columnas, footer de 4 columnas, acordeón legal).
- [x] `js/core/kit.js` (`RFKIT`) con utilidades reutilizables (`fragment`, `el`, `attr`, `sectionShell`, `sectionHeader`, `blockTitle`, `flipHint`, `bindFlipCard`, `renderCardsSection`, `define`).
- [x] `js/data.js` con el catálogo detallado de **Desarrollo** (6 tarjetas) y **Marketing** (4 tarjetas).
- [x] `js/main.js`: render dinámico de tarjetas, menú móvil, scroll-spy, acordeón legal (`setupLegalAccordion`), reveal y envío de formulario.
- [x] `assets/icons/favicon.svg` (cuadrado azul `#3368A0` + estrella de 8 puntas).

## Fase 2 — Componentes Web reutilizables (`public/js/components/`)
- [x] `<site-header>` (`site-header.js`): barra de navegación fija con soporte multi-página y selector de tema.
- [x] `<site-footer>` (`site-footer.js`): pie de página en 4 columnas con estado de disponibilidad, cobertura nacional, contacto, botón de Instagram con degradado en hover y enlace a Política de Privacidad.
- [x] `<cta-banner>` (`cta-banner.js`): componente CTA configurable y reutilizado en `#inicio` y `#acerca`.
- [x] `<hero-section>` (`hero-section.js`): propuesta de valor, dolores frecuentes, **Servicios en 2 Pilares** con giro 3D e indicador de flecha, métricas clave, puente a filosofía y `<cta-banner>`.
- [x] `<about-section>` (`about-section.js`): filosofía, manifiesto, **Mis 4 Pilares de Trabajo** con giro 3D e indicador de flecha, pestañas interactivas (Compromiso y Stack) y `<cta-banner>`.
- [x] `<services-section>` (`services-section.js`): grillas de **Desarrollo** y **Marketing** con tarjetas 3D flip e indicador visual `.pillar__hint`.
- [x] `<contact-section>` (`contact-section.js`): layout de 2 columnas con panel de impacto azul corporativo y formulario completo.
- [x] `<privacy-section>` (`privacy-section.js`): página de Política de Privacidad v2.0 con banner `.legal-hero` adaptable a modo claro/oscuro, índice lateral `CONTENIDO` y 8 secciones en acordeón (Ley N° 19.628 y Ley N° 21.719).

## Fase 3 — Formulario de contacto (frontend)
- [x] Campos: nombre, teléfono con prefijo `+56 9` y bandera chilena, correo, selector de servicio (`<select>`), detalles del proyecto con contador de 2000 caracteres y adjunto de referencia opcional.
- [x] Casilla obligatoria de Política de Privacidad (`target="_blank"`) y casilla opcional de comunicaciones comerciales (`marketingOptin`).
- [x] Honeypot anti-bots (`website`).
- [x] Estados de envío (cargando, éxito, error) e integración `fetch` con `X-CSRF-Token`.

## Fase 4 — Backend seguro (Express)
- [x] `server/config.js`: lectura y validación de `.env`.
- [x] `server/mailer.js`: transporte Gmail + `escapeHtml` + `sanitizeHeader` + `Reply-To` (incluyendo teléfono, adjunto de referencia y preferencia comercial).
- [x] `server/middleware/rateLimit.js`: límite general (`100/15m`) y de contacto (`5/15m`).
- [x] `server/middleware/csrf.js`: double-submit token en cookie `rf_csrf` (`httpOnly`, `SameSite=Strict`).
- [x] `server/middleware/origin.js`: verificación de `Origin`/`Referer`.
- [x] `server/routes/contact.js`: validación con `express-validator` + envío.
- [x] `server/index.js`: helmet/CSP estricta, estáticos, montaje de la API y manejo de errores.

## Fase 5 — Configuración, secretos y documentación
- [x] `package.json`, `.env.example` y `.gitignore`.
- [x] `CLAUDE.md`, `SPEC.md`, `PLAN.md` y `README.md` actualizados al funcionamiento actual.

## Fase 6 — Verificación local
- [x] `npm install` y configuración de `.env`.
- [x] Verificación de `/api/health`, `/api/csrf` y envío de correo en `/api/contact`.
- [x] Verificación de tarjetas 3D, componente `<cta-banner>`, formulario y acordeón en `privacidad.html`.

## Fase 7 — Despliegue (producción)
- [ ] Elegir hosting (VPS, Railway, Render, etc.) con HTTPS.
- [ ] Configurar variables de entorno reales en el host (`NODE_ENV=production`).
- [ ] Ajustar `ALLOWED_ORIGINS` al dominio real.
- [ ] Verificar HSTS y CSP en el entorno productivo.
- [ ] Configurar monitoreo de logs y respaldos de la App Password.

---

## Mejoras futuras (backlog)
- [ ] Captcha (hCaptcha/Turnstile) como refuerzo anti-spam.
- [ ] i18n (español/inglés).
- [ ] Sección de portafolio con casos de éxito reales.
- [ ] Analítica respetuosa de la privacidad (sin cookies de terceros).
