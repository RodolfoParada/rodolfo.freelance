# SPEC.md — Especificación funcional

**Proyecto:** Rodolfo-Freelance
**Tipo:** Sitio web de portafolio/servicios freelance con scroll-page, página de Política de Privacidad + API de contacto.
**Stack:** HTML + CSS + JavaScript vanilla con Web Components nativos (frontend) · Node.js/Express (backend) · Nodemailer + Gmail (correo).

---

## 1. Objetivo

Presentar los servicios de desarrollo web y soporte operativo/marketing de **Rodolfo-Freelance** y permitir que los visitantes soliciten un diagnóstico o cotización mediante un formulario que se envía por correo a una cuenta de Gmail, cumpliendo buenas prácticas de seguridad y la normativa chilena de protección de datos personales (Ley N° 19.628 y Ley N° 21.719).

---

## 2. Usuarios y casos de uso

- **Visitante**: recorre el sitio, explora los servicios interactivos (tarjetas 3D giratorias), consulta la Política de Privacidad en vista acordeón y envía una solicitud de contacto.
- **Rodolfo (propietario)**: recibe los mensajes estructurados en su Gmail y responde directamente desde allí.

---

## 3. Requisitos funcionales

### 3.1 Navegación
- Barra de navegación fija (`<site-header>`) con los enlaces: **Inicio**, **Acerca de mí**, **Servicios**, y el botón **Contáctame** (`.navbar__link--cta`).
- El enlace de la sección visible se resalta automáticamente (scroll-spy). El botón **Contáctame** conserva su contraste visual (`--color-on-primary` sobre `--color-primary`) tanto activo como en `:hover`.
- En móvil, la navbar se colapsa en un menú hamburguesa accesible (`aria-expanded`, cierre con `Esc` y al pulsar un enlace).
- Cuando se navega desde `privacidad.html`, los enlaces de header y footer redirigen automáticamente a `index.html#<seccion>`.

### 3.2 Secciones y páginas
1. **`index.html` (Landing principal):**
   - `#inicio` (`<hero-section>`): hero con propuesta de valor y CTAs, bloque de empatía/dolores (3 tarjetas), **Servicios en 2 Pilares** (2 tarjetas 3D flip con indicador visual de flecha `.pillar__hint`), métricas clave, puente a la filosofía y banner de cierre reutilizable `<cta-banner>`.
   - `#acerca` (`<about-section>`): encabezado (filosofía y método), manifiesto, **Mis 4 Pilares de Trabajo** (4 tarjetas 3D flip con indicador `.pillar__hint`), pestañas accesibles (`role="tablist"`) para *Mi Compromiso No Negociable* y *Cómo abordamos tu proyecto (Stack adaptable)*, cita destacada y `<cta-banner>`.
   - `#desarrollo` (`<services-section>`): bloques de **Desarrollo** (6 tarjetas 3D flip alimentadas por `DESARROLLO` en `data.js`) y **Marketing** (4 tarjetas 3D flip alimentadas por `MARKETING` en `data.js`), todas con indicador visual `.pillar__hint`.
   - `#contacto` (`<contact-section>`): diseño en 2 columnas (`.contact-layout`):
     - Columna izquierda (`.contact-panel`): panel de impacto y confianza en azul corporativo (*Llevemos tu idea al siguiente nivel*, 3 puntos de valor y canales directos a Instagram `@rodolfo.tech.soluciones` y correo `desarrollador.freelance7@gmail.com`).
     - Columna derecha (`.form`): formulario de cotización y consulta.
2. **`privacidad.html` (Política de Privacidad v2.0):**
   - Renderizada mediante el componente `<privacy-section>`.
   - Banner superior de ancho completo (`.legal-hero`) que adapta sus colores entre modo claro y oscuro usando tokens (`--color-primary`, `--color-secondary-strong`, `--color-on-primary`).
   - Diseño en dos columnas (`.legal-layout`): índice lateral fijo (`CONTENIDO`) sincronizado con 8 tarjetas desplegables en acordeón (`.legal-item`), adecuado a la Ley N° 19.628 y Ley N° 21.719.
3. **Footer (`<site-footer>`):**
   - Diseño en 4 columnas (`Rodolfo-Freelance` + estado de disponibilidad, `EXPLORAR`, `CONTACTO & COBERTURA`, `SÍGUEME` con botón de Instagram y degradado oficial en `:hover`) + barra inferior con copyright dinámico y enlace a `privacidad.html`.

### 3.3 Formulario de contacto
- Campos:
  - `name` (obligatorio, 2–80 caracteres).
  - `phone` (opcional, con prefijo visual separado `+56 9` con bandera de Chile + input numérico `8765 4321`).
  - `email` (obligatorio, formato email válido, máx. 120 caracteres).
  - `subject` (obligatorio, selector `<select>` agrupado en *Desarrollo*, *Marketing & Operaciones* y *Otro / Consulta general*).
  - `message` (obligatorio, 10–2000 caracteres con contador en vivo `Límite 2000 caracteres`).
  - `attachment` (opcional, selector de archivo de referencia cuyo nombre se envía como `attachmentName`).
  - `privacy` (checkbox obligatorio con enlace a `privacidad.html` en nueva pestaña `target="_blank"`).
  - `marketingOptin` (checkbox opcional para comunicaciones comerciales).
- Campo **honeypot** invisible (`website`) como trampa anti-bots.
- Recuadro de confianza con ícono de escudo verde y compromiso de respuesta en menos de 24 horas hábiles.
- Envío mediante `fetch` POST a `/api/contact` con cabecera `X-CSRF-Token`.

### 3.4 Correo (Gmail)
- El backend envía el mensaje a la cuenta configurada en `MAIL_TO`.
- `Reply-To` = correo del visitante, para responder directamente.
- Incluye: Nombre, Teléfono (si se indicó), Correo, Servicio, Referencia adjunta (si se seleccionó), preferencia de Comunicaciones comerciales (`Sí` / `No`) y el detalle del mensaje.
- Cuerpo en texto plano y HTML con el contenido **escapado** (`escapeHtml`) y cabeceras sanitizadas (`sanitizeHeader`).

### 3.5 Marca, tema y componentes
- **Título de la pestaña**: `Rodolfo - Freelance` (y `Política de Privacidad | Rodolfo - Freelance` en `privacidad.html`).
- **Favicon**: `assets/icons/favicon.svg`, cuadrado azul `#3368A0` con estrella blanca de 8 puntas.
- **`theme-color`**: `#3368A0`.
- **Tipografía**: Plus Jakarta Sans autoalojada (woff2, subset latin, pesos 400–800); sin fuentes ni recursos de terceros.
- **Tema claro/oscuro**: conmutable desde la navbar, aplica `data-theme` en `<html>`, respeta `prefers-color-scheme` y persiste en `localStorage` (clave `rf-theme`).
- **Componentes reutilizables**: Web Components nativos en light DOM en `js/components/` (`site-header`, `site-footer`, `cta-banner`, `hero-section`, `about-section`, `services-section`, `marketing-section`, `contact-section`, `privacy-section`) apoyados en el kit compartido `js/core/kit.js` (`RFKIT`).

---

## 4. Requisitos no funcionales

- **Responsive**: usable desde 320 px hasta escritorio amplio (`1650px` de contenedor máximo).
- **Accesibilidad**: landmarks, `aria-*`, soporte de teclado en tarjetas 3D (`Enter`/`Space`), pestañas (`ArrowLeft`/`ArrowRight`) y acordeón (`aria-expanded`), skip-link y respeto a `prefers-reduced-motion`.
- **Rendimiento**: sin dependencias de frontend ni bundlers.
- **Privacidad**: tipografía y recursos autoalojados; sin rastreadores de terceros.
- **Mantenibilidad**: datos separados (`data.js`), tokens de diseño en `variables.css`, componentes modulares en `js/components/`.

---

## 5. Seguridad (requisitos obligatorios)

| Control | Implementación |
|---|---|
| Secretos fuera del código | `.env` + `dotenv`; `.env` en `.gitignore` |
| Envío de correo | App Password de Gmail (nunca la contraseña real) |
| Cabeceras HTTP | `helmet` + CSP restrictiva (sin `unsafe-inline`) |
| Rate limiting | `express-rate-limit` general (100/15 min) y de contacto (5/15 min) |
| Validación de entrada | `express-validator` (tipo, longitud, formato email, booleanos) |
| Anti-CSRF | Double-submit cookie (`rf_csrf`) httpOnly + SameSite=Strict |
| Origen | Verificación de `Origin`/`Referer` contra `ALLOWED_ORIGINS` |
| Anti-spam | Honeypot (`website`) + rate limit estricto |
| Escape de salida | `escapeHtml` y `sanitizeHeader` en `mailer.js`; `textContent` en el DOM |
| Fugas de información | Mensajes de error genéricos; `x-powered-by` desactivado |
| HTTPS/HSTS | HSTS activo en producción; `trust proxy` |

---

## 6. API

### `GET /api/csrf`
Devuelve `{ token }` y establece la cookie httpOnly `rf_csrf`.

### `GET /api/health`
Devuelve `{ ok: true, status: "up" }`.

### `POST /api/contact`
- Middleware: `contactLimiter → checkOrigin → verifyToken → validators`.
- Body JSON: `{ name, phone, email, subject, message, attachmentName, marketingOptin, website }`.
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
  icon: string,      // Ej: "</>", "WP", "UX", "MKT"
  badge: string,     // Ej: "Desarrollo Web a Medida"
  title: string,     // Título principal de la tarjeta
  text: string,      // Bajada descriptiva (cara frontal)
  flip: boolean,     // Habilita giro 3D e indicador de flecha .pillar__hint
  items: string[]    // Lista de puntos "Etiqueta: descripción" (cara posterior)
}
```

---

## 8. Fuera de alcance (v1)

- Panel de administración o base de datos de mensajes.
- Autenticación de usuarios.
- Blog/CMS, multi-idioma, captcha de terceros.
