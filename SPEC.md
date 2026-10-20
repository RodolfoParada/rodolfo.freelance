# SPEC.md — Especificación funcional

**Proyecto:** Rodolfo-Freelance
**Tipo:** Sitio web de portafolio/servicios freelance con scroll-page, página de Política de Privacidad + API de contacto.
**Stack:** HTML + CSS + JavaScript vanilla con Web Components nativos (frontend) · Node.js/Express (backend) · Nodemailer + Gmail (correo).

---

## 1. Objetivo

Presentar los servicios de desarrollo web y soporte operativo/comercial de **Rodolfo-Freelance** y permitir que los visitantes agenden una reunión o soliciten una propuesta mediante un formulario que se envía por correo a una cuenta de Gmail, cumpliendo buenas prácticas de seguridad y la normativa chilena de protección de datos personales (Ley N° 19.628 y Ley N° 21.719).

---

## 2. Usuarios y casos de uso

- **Visitante**: recorre el sitio, gira las tarjetas de Inicio y Acerca de mí con su botón de flecha, despliega los servicios de Marketing en acordeón, consulta la Política de Privacidad y envía una solicitud de contacto.
- **Rodolfo (propietario)**: recibe los mensajes en su Gmail, con los datos en una tabla y el mensaje destacado, y responde directamente desde allí.

---

## 3. Requisitos funcionales

### 3.1 Navegación
- Barra de navegación fija (`<site-header>`) con los enlaces: **Inicio**, **Acerca de mí**, **Servicios** y el botón **Contáctame** (`.navbar__link--cta`).
- El enlace de la sección visible se resalta automáticamente (scroll-spy). El botón **Contáctame** conserva su contraste visual (`--color-on-primary` sobre `--color-primary`) tanto activo como en `:hover`.
- En móvil, la navbar se colapsa en un menú hamburguesa accesible (`aria-expanded`, cierre con `Esc` y al pulsar un enlace).
- Cuando se navega desde `privacidad.html`, los enlaces de header y footer redirigen automáticamente a `index.html#<seccion>`.

### 3.2 Secciones y páginas
1. **`index.html` (Landing principal):**
   - `#inicio` (`<hero-section>`):
     - `<h1>`: etiqueta *DESARROLLO WEB & GESTIÓN OPERATIVA* (es el único `<h1>` de la página).
     - Línea de ubicación debajo de la etiqueta: *Servicios 100% remoto para negocios de todo Chile*.
     - `<h2>` del título: *Menos complejidad. Más tecnología útil, eficiencia y control.* seguido de la descripción de servicios.
     - Botones: **Agenda tu reunión** (lleva a `#contacto`) y **Explorar servicios** (lleva a `#desarrollo`).
     - Bloque de puntos de partida *"Libera tiempo para hacer crecer tu empresa; delega la tecnología y la operación."* con 3 dolores (falta de tiempo, operación atascada, fricción digital), cada uno con su texto.
     - **Servicios en 2 Pilares**: 2 tarjetas giratorias con la flecha de giro (botón `.pillar__hint`) y botón de vuelta (`.pillar__hint--back`). Cada pilar tiene 4 servicios (*Desarrollo* y *Soporte Operativo & Comercial*), con el título y la descripción de cada uno.
     - Cita de cierre y `<cta-banner>`.
   - `#acerca` (`<about-section>`):
     - Encabezado *Soluciones digitales y soporte operativo para tu negocio.* con la descripción de servicios.
     - Manifiesto con cita destacada, párrafo de método y pregunta *¿Cuéntame qué necesita tu negocio hoy?* con el botón **Agenda tu reunión** (lleva a `#contacto`).
     - **Mis 4 Pilares de Trabajo**: 4 tarjetas giratorias con botón de flecha y de vuelta. Cada una tiene un texto *Qué significa* y *Tu beneficio*.
     - Pestañas accesibles: el `role="tablist"` está en el contenedor de los botones (`.commit-tabs__list`), cada botón tiene `role="tab"` y cada panel es un `div` con `role="tabpanel"`. Pestañas para *Mi Compromiso* (*No Negociable*) y *Cómo abordamos tu proyecto* (*Stack adaptable*). Los títulos van alineados a la izquierda.
     - Diseño de 2 columnas (`.about-dual`): a la izquierda `<cta-banner>`, a la derecha *Mi Compromiso* arriba y *Cómo abordamos tu proyecto* debajo. En móvil se apilan en una columna.
     - Cita *"Las herramientas se eligen en función del problema, no de la moda."* debajo de las dos columnas.
   - `#desarrollo` (`<services-section>`):
     - Bloque **Desarrollo**: 6 tarjetas giratorias (`flip: true` en `data.js`). Cada tarjeta centra su título y descripción; la flecha de giro está abajo a la derecha de la cara frontal y el botón de vuelta abajo a la izquierda de la cara trasera.
     - Bloque **Marketing**: etiqueta *Servicios de Asistente Virtual Freelance* y 4 tarjetas en **acordeón** (`accordion: true` en `data.js`). Cada una muestra etiqueta, título y descripción, con una fila *Ver funciones* con un botón redondo **+** que se convierte en **×** al abrir la lista. El título y la descripción quedan centrados entre la etiqueta superior y la línea divisoria.
   - `#contacto` (`<contact-section>`): diseño en 2 columnas (`.contact-layout`):
     - Columna izquierda (`.contact-panel`): panel de impacto y confianza en azul corporativo (*Llevemos tu idea al siguiente nivel*), 3 puntos de valor y canales directos a Instagram `@rodolfo.tech.soluciones` y correo `desarrollador.freelance7@gmail.com`.
     - Columna derecha (`.form`): eyebrow *Hablemos de tu proyecto*, texto *Completa tus datos para coordinar una reunión vía Google Meet. Te contactaremos por correo y teléfono para confirmar el horario.* y formulario.
2. **`privacidad.html` (Política de Privacidad v2.0):**
   - Renderizada mediante el componente `<privacy-section>`.
   - Banner superior de ancho completo (`.legal-hero`) que adapta sus colores entre modo claro y oscuro usando tokens.
   - Diseño en dos columnas (`.legal-layout`): índice lateral fijo (`CONTENIDO`) sincronizado con **8 secciones** desplegables en acordeón (`.legal-item`), adecuado a la Ley N° 19.628 y Ley N° 21.719.
3. **Footer (`<site-footer>`):**
   - Diseño en 4 columnas (`Rodolfo-Freelance` + estado de disponibilidad, `EXPLORAR`, `CONTACTO & COBERTURA` con la línea *Servicios 100% remotos para negocios de todo Chile*, `SÍGUEME` con botón de Instagram) + barra inferior con copyright dinámico y enlace a `privacidad.html`.

### 3.2.1 Contenido estático precargado (SEO)
- `index.html` y `privacidad.html` incluyen una **copia estática** del contenido de cada componente dentro de sus etiquetas (`<hero-section>…</hero-section>`, etc.), para que buscadores y rastreadores sin JavaScript lean el texto.
- Al cargar, los componentes reemplazan esa copia con su render (`RFKIT.define` espera al `DOMContentLoaded`; `site-header`, `site-footer` y las grillas de `main.js` usan `replaceChildren`, sin duplicar).
- **Regla:** si cambias un texto de un componente, actualiza también la copia en `index.html` (y `privacidad.html` si aplica). El texto visible debe coincidir en ambas.

### 3.2.2 SEO y metadatos
- `index.html`: título *Rodolfo-Freelance | Desarrollo web y WordPress en Chile*; descripción de 153 caracteres; `canonical` a `https://rodolfofreelance.cl/`; Open Graph y Twitter Card (`summary_large_image`) con imagen `assets/img/og-image.png` (1200×630); bloque JSON-LD `ProfessionalService` (nombre, URL, correo, Instagram, `areaServed` Chile).
- `privacidad.html`: título *Política de Privacidad | Rodolfo-Freelance*; `canonical` y metadatos sociales propios.
- `robots.txt`: permite todo, bloquea `/api/`, permite `Google-Extended`, `ClaudeBot`, `GPTBot` y `PerplexityBot`, y apunta al sitemap.
- `sitemap.xml`: lista `/` y `/privacidad.html` con `lastmod` 2026-10-19.

### 3.3 Formulario de contacto
- Campos:
  - `name` (obligatorio, 2–30 caracteres; se muestra en mayúsculas).
  - `phone` (opcional, prefijo visual `+56 9` con bandera de Chile + input de 8 dígitos con máscara `1234 5678`; rechaza secuencias y dígitos repetidos).
  - `email` (obligatorio, formato email válido, con corrección de dominios mal escritos como `gmial.com`).
  - `subject` (obligatorio, `<select>` agrupado en *Desarrollo*, *Marketing & Operaciones* y *Otro / Consulta general*).
  - `message` (obligatorio, 10–2000 caracteres con contador en vivo).
  - `attachment` (opcional, hasta **3 archivos** y **10 MB** en total; las imágenes de más de 1,2 MB se comprimen en el navegador). Se envían en Base64 y su nombre aparece como *Referencia adjunta*.
  - `privacy` (checkbox obligatorio con enlace a `privacidad.html` en nueva pestaña `target="_blank"`).
  - `marketingOptin` (checkbox opcional para comunicaciones comerciales).
- Campo **honeypot** invisible (`website`) como trampa anti-bots.
- Recuadro de confianza con compromiso de respuesta en **menos de 72 horas hábiles**.
- Antes de cada envío el formulario pide un **token CSRF nuevo** (`GET /api/csrf`), para que funcione aunque la página haya estado abierta durante horas.
- Envío mediante `fetch` POST a `/api/contact` con cabecera `X-CSRF-Token`.
- Los campos **permiten pegar**. Teléfono y correo se limpian después de pegar (solo dígitos y en minúsculas, respectivamente). Al terminar, el formulario muestra un modal de confirmación.

### 3.4 Correo (Gmail)
- El backend envía el mensaje a la cuenta configurada en `MAIL_TO`.
- **Asunto:** `<nombre> para Rodolfo - Freelance` (por ejemplo, *RODOLFO para Rodolfo - Freelance*).
- `Reply-To` = correo del visitante, para responder directamente.
- **Cuerpo HTML** con estilo de marca: encabezado azul *Nuevo mensaje desde Rodolfo-Freelance*, datos en tabla (Nombre, Teléfono si se indicó, Correo, Servicio, Referencia adjunta si se seleccionó, Comunicaciones comerciales `Sí`/`No`), el mensaje dentro de un recuadro y un pie con la instrucción de responder al correo. Usa tablas y estilos en línea para compatibilidad con Gmail.
- **Cuerpo en texto plano** con los mismos datos.
- Los archivos adjuntos se incluyen en el correo como archivos reales (no solo el nombre).
- Todo el contenido se **escapa** (`escapeHtml`) y las cabeceras se sanitizan (`sanitizeHeader`).

### 3.5 Marca, tema y componentes
- **Título de la pestaña**: `Rodolfo - Freelance` (y `Política de Privacidad | Rodolfo - Freelance` en `privacidad.html`).
- **Favicon**: `assets/icons/favicon.svg`, cuadrado azul `#3368A0` con estrella blanca de 8 puntas.
- **`theme-color`**: `#3368A0`.
- **Tipografía**: Plus Jakarta Sans autoalojada (woff2, subset latin, pesos 400–800); sin fuentes ni recursos de terceros.
- **Tema claro/oscuro**: conmutable desde la navbar, aplica `data-theme` en `<html>`, respeta `prefers-color-scheme` y persiste en `localStorage` (clave `rf-theme`).
- **Derechos de autor**: el pie de página indica *"© <año> Rodolfo-Freelance. Todos los derechos reservados."*
- **Componentes reutilizables**: Web Components nativos en light DOM en `js/components/` (`site-header`, `site-footer`, `cta-banner`, `hero-section`, `about-section`, `services-section`, `marketing-section`, `contact-section`, `privacy-section`) apoyados en el kit compartido `js/core/kit.js` (`RFKIT`).
- **`<cta-banner>`**: título *¿Hablamos de lo que necesita resolver tu negocio?*, botón principal **Agenda tu reunión** (lleva a `#contacto`) y leyenda *Respuesta en menos de 72 horas hábiles · Atención 100% remota para todo Chile*. El botón secundario viene oculto por defecto (`secondary-text="none"`).

---

## 4. Requisitos no funcionales

- **Responsive**: usable desde 320 px hasta escritorio amplio (`1650px` de contenedor máximo).
- **Accesibilidad**: landmarks, `aria-*` con roles válidos (paneles de pestañas en `div`, no en `article`), contraste mínimo de 4,5:1 (el texto secundario en modo claro es `#4A6679`), botones reales para girar las tarjetas (`Enter`/`Space` sobre la flecha), pestañas (`ArrowLeft`/`ArrowRight`), acordeones (`aria-expanded`), skip-link, área táctil mínima de 44 px en los botones de giro y respeto a `prefers-reduced-motion`.
- **Giro de tarjetas**: solo el botón de flecha gira la tarjeta. No hay giro por hover ni por clic en el resto de la tarjeta, y las tarjetas no reciben foco de tabulación.
- **Rendimiento**: sin dependencias de frontend ni bundlers. Los scripts de componentes, `kit.js`, `data.js` y `main.js` se cargan con `defer` (no bloquean el render). Solo `theme.js` es síncrono, para evitar que el tema parpadee. Las hojas de estilo son bloqueantes, y es intencional para no mostrar la página sin estilos.
- **Token CSRF**: no se pide al cargar la página. Solo se pide justo antes de cada envío del formulario.
- **Privacidad**: tipografía y recursos autoalojados. Medición con Google Tag Manager, Google Analytics 4 y Microsoft Clarity, declarada en la sección 5.2 de la Política de Privacidad (cookies `_ga`, `_ga_<ID>`, `_clck`, `_clsk`).
- **Mantenibilidad**: datos separados (`data.js`), tokens de diseño en `variables.css`, componentes modulares en `js/components/`.

---

## 5. Seguridad (requisitos obligatorios)

| Control | Implementación |
|---|---|
| Secretos fuera del código | `.env` + `dotenv`; `.env` en `.gitignore` |
| Envío de correo | App Password de Gmail (nunca la contraseña real) |
| Cabeceras HTTP | `helmet` + CSP restrictiva (sin `unsafe-inline`) |
| Rate limiting | `express-rate-limit` general (100/15 min) y de contacto (5/15 min) |
| Validación de entrada | `express-validator` (tipo, longitud, formato email, booleanos, adjuntos) |
| Anti-CSRF | Double-submit cookie (`rf_csrf`) httpOnly + SameSite=Strict, válida 1 hora; token nuevo antes de cada envío |
| Origen | Verificación de `Origin`/`Referer` contra `ALLOWED_ORIGINS` |
| Anti-spam | Honeypot (`website`) + rate limit estricto |
| Escape de salida | `escapeHtml` y `sanitizeHeader` en `mailer.js`; `textContent` en el DOM |
| Fugas de información | Mensajes de error genéricos; `x-powered-by` desactivado |
| HTTPS/HSTS | HSTS (1 año, `includeSubDomains`, `preload`) en producción (Express) y en `netlify.toml` para los archivos estáticos; `trust proxy` |
| CSP en archivos estáticos | `netlify.toml` aplica la CSP a todas las páginas (`default-src 'self'`, sin `unsafe-inline`, `frame-ancestors 'none'`). Express la aplica a la API. Ambas deben mantenerse iguales. |
| Trusted Types | `require-trusted-types-for 'script'` y `trusted-types rf-html`. Todo HTML dinámico pasa por la política `rf-html` de `kit.js`, usada solo con plantillas estáticas. |
| Aislamiento y clickjacking | `Cross-Origin-Opener-Policy: same-origin`, `X-Frame-Options: DENY` y `frame-ancestors 'none'`. |
| Protección del contenido | El texto no se puede seleccionar ni copiar (`user-select: none` en `body` y evento `copy`/`cut` cancelado), salvo en los campos del formulario. Es una dificultad, no una protección total. |

---

## 6. API

### `GET /api/csrf`
Devuelve `{ token }` y establece la cookie httpOnly `rf_csrf`.

### `GET /api/health`
Devuelve `{ ok: true, status: "up" }`.

### `POST /api/contact`
- Middleware: `contactLimiter → checkOrigin → verifyToken → validators`.
- Body JSON: `{ name, phone, email, subject, message, attachmentName, attachments, marketingOptin, website }`. `attachments` es un arreglo de hasta 3 objetos `{ filename, contentType, size, content }` (Base64).
- Respuestas:
  - `200` `{ ok: true, message }` — enviado (o honeypot activado).
  - `422` `{ ok: false, message, errors[] }` — validación fallida.
  - `403` `{ ok: false, message }` — CSRF/origen inválido.
  - `429` `{ ok: false, message }` — demasiadas peticiones.
  - `502` `{ ok: false, message }` — fallo al enviar el correo.

---

## 7. Estructura de datos (frontend — `public/js/data.js`)

```js
// Tarjeta de servicio (DESARROLLO / MARKETING)
{
  icon: string,       // Ej: "</>", "WP", "UX", "MKT"
  badge: string,      // Ej: "Desarrollo Web a Medida"
  title: string,      // Título principal de la tarjeta
  text: string,       // Bajada descriptiva (cara frontal)
  flip: boolean,      // DESARROLLO: giro 3D con botón de flecha
  accordion: boolean, // MARKETING: acordeón "Ver funciones"
  items: string[]     // Lista de puntos "Etiqueta: descripción" (cara posterior o acordeón)
}
```

---

## 8. Fuera de alcance (v1)

- Panel de administración o base de datos de mensajes.
- Autenticación de usuarios.
- Blog/CMS, multi-idioma, captcha de terceros.
