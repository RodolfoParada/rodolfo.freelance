# Rodolfo-Freelance

Sitio web de portafolio y servicios profesionales (**Desarrollo Web & Soporte Operativo / Marketing**) con navegación scroll-page, página de Política de Privacidad interactiva y formulario de contacto conectado a Gmail.

- **Frontend:** HTML, CSS y JavaScript vanilla estructurado con **Web Components nativos** en light DOM (sin frameworks ni bundlers).
- **Backend:** Node.js + Express + Nodemailer (Gmail con App Password).
- **Seguridad:** Helmet/CSP estricta (sin `unsafe-inline`), rate limiting, validación y sanitización en cliente/servidor, anti-CSRF (`rf_csrf`) y honeypot.

## Requisitos

- Node.js >= 18
- Una cuenta de Gmail con **contraseña de aplicación** habilitada.

## Puesta en marcha

```bash
npm install
cp .env.example .env    # edita .env y completa tus datos
npm run dev             # desarrollo (--watch)
# o
npm start               # producción
```

Luego abre <http://localhost:3000> (y <http://localhost:3000/privacidad.html> para la Política de Privacidad).

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (por defecto 3000). |
| `NODE_ENV` | `development` o `production`. |
| `GMAIL_USER` | Cuenta de Gmail que envía el correo. |
| `GMAIL_APP_PASSWORD` | App Password del correo (16 caracteres). |
| `MAIL_FROM_NAME` | Nombre visible del remitente. |
| `MAIL_TO` | Destinatario de los mensajes del formulario. |
| `ALLOWED_ORIGINS` | Orígenes permitidos para el API (separados por coma). |

### Generar una App Password de Gmail

1. Activa la verificación en dos pasos en tu cuenta de Google.
2. Entra en <https://myaccount.google.com/apppasswords>.
3. Crea una contraseña de aplicación y pégala en `GMAIL_APP_PASSWORD`.

## Estructura del proyecto

```
public/                         # Frontend estático (servido por Express)
  index.html                    # Página principal (compuesta por Web Components)
  privacidad.html               # Página de Política de Privacidad v2.0 (<privacy-section>)
  css/                          # fonts, reset, variables, styles, responsive
  js/
    data.js                     # Catálogo de servicios (DESARROLLO: 6 cards, MARKETING: 4 cards)
    theme.js                    # Modo claro/oscuro (síncrono en <head>, clave rf-theme)
    core/kit.js                 # Kit de utilidades compartidas (namespace global RFKIT)
    components/                 # Web Components reutilizables (1 archivo por componente)
      site-header.js            # <site-header>
      site-footer.js            # <site-footer>
      cta-banner.js             # <cta-banner>
      hero-section.js           # <hero-section>
      about-section.js          # <about-section>
      services-section.js       # <services-section>
      marketing-section.js      # <marketing-section>
      contact-section.js        # <contact-section>
      privacy-section.js        # <privacy-section>
    main.js                     # Render de tarjetas, menú, scroll-spy, acordeón legal y formulario
  assets/
    fonts/                      # Plus Jakarta Sans (.woff2, subset latin)
    icons/favicon.svg           # Cuadrado azul con estrella de 8 puntas
    img/
server/                         # API Express (config, mailer, middleware, routes)
.env.example                    # Plantilla de variables de entorno
CLAUDE.md                       # Guía técnica para asistentes de IA
SPEC.md                         # Especificación funcional y de seguridad
PLAN.md                         # Plan de implementación por fases
```

## Arquitectura de Componentes Reutilizables

Tanto `index.html` como `privacidad.html` se construyen íntegramente mediante **Web Components** nativos en `public/js/components/`, apoyados en el kit compartido `public/js/core/kit.js` (`RFKIT`):

### `index.html`
```html
<site-header></site-header>

<main id="main">
  <hero-section></hero-section>
  <about-section></about-section>
  <services-section></services-section>
  <contact-section></contact-section>
</main>

<site-footer></site-footer>
```

### `privacidad.html`
```html
<site-header></site-header>

<main id="main">
  <privacy-section></privacy-section>
</main>

<site-footer></site-footer>
```

### Catálogo de componentes y reutilización
- **`<cta-banner>` (`cta-banner.js`):** Bloque de llamada a la acción reutilizable presente en **Inicio** (`<hero-section>`) y **Acerca de mí** (`<about-section>`). Acepta atributos opcionales (`title`, `text`, `primary-text`, `primary-href`, `secondary-text`, `secondary-href`, `note`). Por defecto muestra el botón **Agenda tu reunión** (lleva a `#contacto`) y oculta el botón secundario (`secondary-text="none"`):
  ```html
  <cta-banner
    title="¿Hablamos de lo que necesita resolver tu negocio?"
    primary-text="Agenda tu reunión"
    primary-href="#contacto"></cta-banner>
  ```
- **Tarjetas giratorias e indicador de giro (`RFKIT.flipHint`, `RFKIT.flipBackHint` y `RFKIT.bindFlipCard`):**
  - Las tarjetas de **Servicios en 2 Pilares** (Inicio), **Mis 4 Pilares de Trabajo** (Acerca de mí) y **Desarrollo** (6 servicios) giran en 3D con el botón de flecha de la cara frontal; el botón de la cara trasera las devuelve a su estado inicial.
  - Solo esos botones giran la tarjeta: no hay giro al pasar el cursor ni al hacer clic en el resto. Los botones tienen un área táctil de 44 px y funcionan con teclado (`Enter`/`Espacio`).
- **Servicios de Marketing en acordeón:** las 4 tarjetas de **Marketing** muestran la etiqueta, el título y la descripción, con una fila *Ver funciones* y un botón **+** que despliega sus funciones (se convierte en **×** al abrir).
- **`<contact-section>` (`contact-section.js`):**
  - **Panel izquierdo (`.contact-panel`):** Tarjeta de confianza en azul corporativo (*Llevemos tu idea al siguiente nivel*), 3 pilares de servicio y enlaces directos a Instagram (`@rodolfo.tech.soluciones`) y correo (`desarrollador.freelance7@gmail.com`).
  - **Formulario derecho (`#contact-form`):** Nombre completo (2–30 caracteres), Teléfono con bloque separado `+56 9` y bandera chilena, Correo electrónico, selector de servicio (`<select>`), detalles del proyecto con contador de 2000 caracteres, hasta 3 archivos de referencia (10 MB en total), checkbox obligatorio de Política de Privacidad (`target="_blank"`), checkbox opcional de comunicaciones comerciales y sello de confianza con respuesta en menos de 72 horas hábiles.
  - Antes de enviar pide un token CSRF nuevo, así que el formulario funciona aunque la página lleve mucho tiempo abierta.
- **Correo recibido:** el asunto es `<nombre> para Rodolfo - Freelance`, el cuerpo HTML muestra los datos en una tabla con el mensaje destacado y los archivos adjuntos llegan como archivos reales.
- **`<privacy-section>` (`privacy-section.js`):**
  - Encabezado de ancho completo (`.legal-hero`) que adapta sus colores en modo claro y oscuro usando las variables del tema, seguido de un diseño en 2 columnas con índice lateral (`CONTENIDO`) sincronizado con 8 tarjetas desplegables en acordeón (adecuado a la Ley N° 19.628 y Ley N° 21.719).
- **`<site-footer>` (`site-footer.js`):**
  - Pie de página en 4 columnas (`Rodolfo-Freelance` con badge de disponibilidad, `EXPLORAR`, `CONTACTO & COBERTURA`, y `SÍGUEME` con botón de Instagram y degradado oficial en hover) más barra legal inferior.

## Tipografía y Paleta de Colores (Regla 60-30-10)

Se utiliza **Plus Jakarta Sans** autoalojada en `public/assets/fonts/` (woff2, pesos 400–800).

| Proporción | Color | Hex (Claro) | Hex (Oscuro) | Uso |
|---|---|---|---|---|
| 60% | Base visual | `#F2EFE7` | `#131A23` | Fondo general del sitio (`--color-bg`) |
| 30% | Azul corporativo | `#3368A0` | `#6BA6D6` | Estructura, textos principales, títulos y acentos primarios (`--color-primary`) |
| 30% | Azul acero | `#66A3BF` | `#66A3BF` | Bordes activos, badges y degradados secundarios (`--color-secondary`) |
| 10% | Menta pálido / salvia | `#C8DFDB` | `#C8DFDB` | Transiciones suaves, etiquetas y detalles (`--color-accent`) |

## Modo oscuro

- Botón de alternancia (sol/luna) en `<site-header>`.
- Respeta `prefers-color-scheme` y persiste la elección en `localStorage` (`rf-theme`).
- `public/js/theme.js` se ejecuta de forma síncrona en `<head>` para evitar FOUC sin requerir scripts inline.

## Despliegue en Netlify (Serverless)

El proyecto ya incluye la configuración necesaria para desplegarse como funciones Serverless en **Netlify** sin dejar de funcionar en modo local (`npm run dev` / `npm start`):

- **[netlify.toml](netlify.toml)**: Define `publish = "public"`, `functions = "netlify/functions"` y las reglas `[[redirects]]` hacia `/.netlify/functions/server`.
- **[netlify/functions/server.js](netlify/functions/server.js)**: Envuelve la aplicación Express (`server/index.js`) con `serverless-http`.
- En el panel de Netlify (**Site configuration → Environment variables**), configura `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `MAIL_FROM_NAME`, `MAIL_TO`, `NODE_ENV=production` y `ALLOWED_ORIGINS` con la URL de tu sitio en Netlify.

## Notas de seguridad

- Nunca subas `.env` al repositorio.
- El envío de correo ocurre únicamente en el backend; el frontend no maneja secretos.
- En producción usa HTTPS y define `ALLOWED_ORIGINS` con tu dominio real.

http://localhost:3000/blog/