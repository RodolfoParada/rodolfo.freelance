# SPEC.md — Especificación funcional

**Proyecto:** Rodolfo-Freelance
**Tipo:** Sitio web de portafolio/servicios freelance con scroll-page, página de Política de Privacidad, página *Cómo trabajo*, blog para pymes + API de contacto.
**Stack:** HTML + CSS + JavaScript vanilla con Web Components nativos (frontend) · Eleventy 3 con Markdown y Nunjucks (blog y *Cómo trabajo*) · Node.js/Express (backend, también como función de Netlify) · Nodemailer + Gmail (correo).

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
     - Bloque de puntos de partida *"Libera tiempo para hacer crecer tu empresa; delega la tecnología y la operación."* con 3 dolores (falta de tiempo, operación atascada, fricción digital), cada uno con su texto. Al pasar el mouse, cada dolor sube, muestra un resplandor naranja y su número se separa y brilla (ver 3.5.1).
     - **Servicios en 2 Pilares**: 2 tarjetas giratorias con el icono de giro (botón `.pillar__hint`) y botón de vuelta (`.pillar__hint--back`). Cada pilar tiene 4 servicios (*Desarrollo* y *Soporte Operativo & Comercial*), con el título y la descripción de cada uno. El pilar principal (*Presencia & Conversión*) tiene en modo claro el mismo fondo oscuro y borde translúcido que el panel de contacto (`.contact-panel`), con el título y el icono de giro en naranja de marca, y el subtítulo en blanco; en modo oscuro conserva su estilo propio.
     - Tres métricas (*100% Código Escalable*, *Optimización Real*, *Acompañamiento Directo*), con borde naranja y check que se enciende al pasar el mouse (ver 3.5.1).
     - `<cta-banner class="hero-cta">`, con margen superior (`--space-xl`) bajo las métricas.
   - `#acerca` (`<about-section>`):
     - Encabezado *Soluciones digitales y soporte operativo para tu negocio.* con la descripción de servicios, seguido de la cita puente *"Desarrollo web a la medida de tu negocio…"* con el enlace *Conoce mi filosofía y principios no negociables →*.
     - **Mis 4 Pilares de Trabajo**: 4 tarjetas giratorias con botón de flecha y de vuelta. Cada una tiene un texto *Qué significa* y *Tu beneficio*.
     - Pestañas accesibles: el `role="tablist"` está en el contenedor de los botones (`.commit-tabs__list`), cada botón tiene `role="tab"` y cada panel es un `div` con `role="tabpanel"`. Pestañas para *Mi Compromiso* (*No Negociable*) y *Cómo abordamos tu proyecto* (*Stack adaptable*). Los títulos van alineados a la izquierda.
     - Cita puente (`.about-bridge`) debajo del encabezado: *"Desarrollo web a la medida de tu negocio…"* con el enlace *Conoce mi filosofía y principios no negociables →* (lleva a `#acerca`). Su borde y su enlace están en naranja oscuro y pasan a naranja de marca al pasar el mouse (ver 3.5.1).
     - Diseño de 2 columnas (`.about-dual`): a la izquierda `<cta-banner>`, a la derecha *Mi Compromiso* arriba y *Cómo abordamos tu proyecto* debajo. En móvil se apilan en una columna.
     - Cita *"Las herramientas se eligen en función del problema, no de la moda."* debajo de las dos columnas.
   - `#desarrollo` (`<services-section>`):
     - Bloque **Desarrollo**: 6 tarjetas giratorias (`flip: true` en `data.js`) **dentro de un carrusel** con flechas ← → a los costados (3 tarjetas visibles en escritorio, 2 en tablet, 1 en móvil; ver 3.7.4). Cada tarjeta centra su título y descripción; la flecha de giro está abajo a la derecha de la cara frontal y el botón de vuelta abajo a la izquierda de la cara trasera.
     - Bloque **Marketing**: etiqueta *Servicios de Asistente Virtual Freelance* y 4 tarjetas en **acordeón** (`accordion: true` en `data.js`). Cada una muestra etiqueta, título y descripción, con una fila *Ver funciones* con un botón redondo **+** que se convierte en **×** al abrir la lista. El título y la descripción quedan centrados entre la etiqueta superior y la línea divisoria. Al abrir o cerrar una tarjeta, la página no se desplaza: la tarjeta se expande en su lugar.
   - `#contacto` (`<contact-section>`): diseño en 2 columnas (`.contact-layout`) que ocupa todo el ancho del contenedor, igual que las tarjetas de las secciones anteriores:
     - Columna izquierda (`.contact-panel`): panel de impacto y confianza en azul corporativo (*Llevemos tu idea al siguiente nivel*), 3 puntos de valor y canales directos a Instagram `@rodolfo.tech.soluciones` y correo `desarrollador.freelance7@gmail.com`.
     - Columna derecha (`.form`): eyebrow *Hablemos de tu proyecto*, texto *Completa tus datos para coordinar una reunión vía Google Meet. Te contactaremos por correo y teléfono para confirmar el horario.* y formulario.
2. **`privacidad.html` (Política de Privacidad v2.0):**
   - Renderizada mediante el componente `<privacy-section>`.
   - Banner superior de ancho completo (`.legal-hero`) que adapta sus colores entre modo claro y oscuro usando tokens.
   - Diseño en dos columnas (`.legal-layout`): índice lateral fijo (`CONTENIDO`) sincronizado con **8 secciones** desplegables en acordeón (`.legal-item`), adecuado a la Ley N° 19.628 y Ley N° 21.719.
3. **Footer (`<site-footer>`):**
   - Modo claro: fondo gris (`#5F6570`) con franja superior naranja de marca. Los textos de acento tienen un naranja más claro (20 % de naranja mezclado con blanco) para llegar a 4,5:1 sobre el gris. Modo oscuro: fondo oscuro (`--color-surface-deep`, igual que las tarjetas) y franja superior del mismo color que la línea inferior del nav (`--color-border`).
   - Diseño en 4 columnas (`Rodolfo-Freelance` + estado de disponibilidad, `EXPLORAR`, `CONTACTO & COBERTURA` con la línea *Servicios 100% remotos para negocios de todo Chile*, `SÍGUEME` con botón de Instagram) + barra inferior con copyright dinámico y enlace a `privacidad.html`.

### 3.2.1 Contenido estático precargado (SEO)
- `index.html` y `privacidad.html` incluyen una **copia estática** del contenido de cada componente dentro de sus etiquetas (`<hero-section>…</hero-section>`, etc.), para que buscadores y rastreadores sin JavaScript lean el texto.
- Al cargar, los componentes reemplazan esa copia con su render (`RFKIT.define` espera al `DOMContentLoaded`; `site-header`, `site-footer` y las grillas de `main.js` usan `replaceChildren`, sin duplicar).
- **Regla:** si cambias un texto de un componente, actualiza también la copia en `index.html` (y `privacidad.html` si aplica). El texto visible debe coincidir en ambas.

### 3.2.2 SEO y metadatos
- `index.html`: título *Rodolfo-Freelance | Desarrollo web y WordPress en Chile*; descripción de 153 caracteres; `canonical` a `https://rodolfofreelance.cl/`; Open Graph y Twitter Card (`summary_large_image`) con imagen `assets/img/og-image.png` (1200×630); bloque JSON-LD `ProfessionalService` (nombre, URL, correo, Instagram, `areaServed` Chile).
- `privacidad.html`: título *Política de Privacidad | Rodolfo-Freelance*; `canonical` y metadatos sociales propios.
- `robots.txt`: permite todo, bloquea `/api/`, permite `Google-Extended`, `ClaudeBot`, `GPTBot` y `PerplexityBot`, y apunta al sitemap.
- `sitemap.xml`: lo genera `plugins/sitemap.js` en cada build. Incluye `/`, `/privacidad.html`, `/como-trabajo/`, las pestañas del blog (con sus páginas) y todos los artículos, con la fecha de cada uno y una prioridad por tipo de página (inicio 1, Cómo trabajo 0,9, pestañas 0,7, artículos 0,6).
- Páginas de Eleventy (blog y *Cómo trabajo*): el `<head>` lo arma `_includes/base.njk` con los datos de `content/_data/site.json`. Ver la sección 3.6.5.

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
- **`<cta-banner>`** (en modo claro, fondo oscuro con resplandores naranja igual que `.contact-panel`; en modo oscuro, degradado propio): título *¿Hablamos de lo que necesita resolver tu negocio?*, botón principal **Agenda tu reunión** (lleva a `#contacto`) y leyenda *Respuesta en menos de 72 horas hábiles · Atención 100% remota para todo Chile*. El botón secundario viene oculto por defecto (`secondary-text="none"`).

### 3.5.1 Interacciones al pasar el mouse (hover)

Reglas comunes:
- El color de acento al pasar el mouse es el naranja de marca (`--color-primary`). En reposo, los bordes usan `--color-border`, salvo donde se indica lo contrario.
- Ninguna tarjeta gira por hover (ver 4, *Giro de tarjetas*).
- Todas las animaciones respetan `prefers-reduced-motion`: sin transición, sin giro ni elevación; solo cambian los colores.

| Elemento | Reposo | Al pasar el mouse |
|---|---|---|
| Cita puente de *Acerca de mí* | Borde izquierdo y enlace en naranja oscuro | Todos los bordes y el enlace en naranja de marca |
| Dolores de la portada | Sin cambio | Sube 6 px, resplandor naranja detrás, número que se separa y brilla, título en naranja (modo oscuro) |
| Tarjetas *Servicios en 2 Pilares* | Borde gris | Borde naranja |
| Métricas de la portada | Borde gris; check naranja tenue | Borde naranja; el check se llena de naranja, gira y brilla |
| Pilares de *Mis 4 Pilares de Trabajo* | Borde gris, número en caja tenue | Borde naranja; el número se llena de naranja, gira y brilla |
| Tarjetas de *Desarrollo* (carrusel) | Borde gris | Borde de la cara naranja; el icono se llena de naranja, gira y brilla; la etiqueta se llena de naranja |
| Tarjetas de *Marketing* (acordeón) | Borde gris | Igual que las de Desarrollo, en su icono y etiqueta |
| Tarjetas de servicio de *Cómo trabajo* | Borde gris | Borde naranja |

- **Contraste pendiente:** el enlace de la cita puente en reposo usa naranja oscuro (`#A93A02`) sobre la tarjeta oscura y da unos 2,7:1, por debajo del mínimo de 4,5:1 de la sección 4. Está aceptado por diseño; si se corrige, usar un tono más claro para el texto y dejar el borde en naranja oscuro.

### 3.6 Blog (`/blog/`)

Blog de guías prácticas para **pymes chilenas**, generado con Eleventy desde `content/blog/`. Las convenciones de implementación están en `CLAUDE.md` (sección *Blog (Eleventy)*).

#### 3.6.1 Portada y pestañas
- Encabezado común a todas las pestañas (`_includes/blog-listing.njk`):
  - Eyebrow: *Blog*.
  - `<h1>`: *Guías prácticas para hacer crecer tu pyme*.
  - Bajada: *Web, marketing, ventas, atención al cliente y administración, para empresas en Chile.*
- Pestañas (`content/_data/blogTabs.json`), en este orden:

  | Pestaña | URL | `tags` de sus artículos |
  |---|---|---|
  | Todos | `/blog/` | (todos los artículos) |
  | WordPress | `/blog/wordpress/` | `wordpress` |
  | Desarrollo WEB | `/blog/desarrollo/` | `desarrollo` |
  | Marketing Digital | `/blog/marketing/` | `marketing` |
  | Prospección Comercial | `/blog/prospeccion/` | `prospeccion` |
  | Atención al Cliente | `/blog/atencion-cliente/` | `atencion-cliente` |
  | Administración & E-Commerce | `/blog/administracion-ecommerce/` | `administracion-ecommerce` |

- La pestaña activa se marca con `.is-active` y `aria-current="page"`. En móvil, las pestañas pasan a varias líneas sin desbordarse.
- Cada pestaña muestra en su primera página **1 artículo destacado** (con la imagen de portada de la pestaña) y **6 tarjetas** en dos filas de tres; las páginas siguientes (`/pagina/N/`) muestran 6 tarjetas. Paginación con *Anterior* / número / *Siguiente*.
- Una pestaña sin artículos muestra *Próximamente.*
- Al final de cada pestaña, bloque de cierre (`.blog-cta` en `blog-listing.njk`):
  - Título: *¿Conversamos sobre tu negocio?*
  - Texto: *Escríbeme y coordinemos una reunión breve para revisar qué necesita tu empresa.*
  - Botón **Agenda tu reunión** (a `/#contacto`) debajo del texto, y botón **Conoce mis servicios** (a `/como-trabajo/`) a la derecha.
- Los artículos se ordenan por fecha y hora (`date`), del más reciente al más antiguo.

#### 3.6.1.1 Cambio de pestaña fluido
- El menú superior y el pie de página vienen en el HTML de cada página del blog y de *Cómo trabajo* (copias estáticas idénticas a lo que dibujan los componentes), así no hay parpadeo mientras carga el JavaScript, y Google ve esos enlaces desde el inicio.
- Transición suave entre páginas del sitio (View Transitions): el menú y las pestañas quedan fijos y el contenido se funde. Sin efecto en navegadores sin soporte o con movimiento reducido.
- La portada de cada pestaña se precarga con prioridad alta; las portadas de las demás pestañas se precargan cuando el navegador está libre, y la página de una pestaña al pasar el mouse sobre ella.
- En Netlify, las imágenes se guardan en la caché del navegador 7 días y las fuentes 1 año.

#### 3.6.2 Imágenes de portada
- Una imagen por pestaña (`image` + `imageAlt` en `blogTabs.json`), WebP de **1200 × 675 px** (16:9), menos de ~110 KB, en `public/assets/img/`, con nombre en minúsculas y guiones.
- Se muestra completa (`object-fit: contain`) sobre fondo azul oscuro. Si el original tiene otra proporción, se ajusta completo y se rellenan los costados con la misma imagen desenfocada (sin recortar contenido).
- Los originales en alta resolución se guardan en `originales/` como respaldo local: la carpeta está en `.gitignore`, así que no se publica ni se sube al repositorio.

| Pestaña | Imagen |
|---|---|
| Todos | `todo.webp` |
| WordPress | `wordpress-orbita.webp` |
| Desarrollo WEB | `desarrollo-banner.webp` |
| Marketing Digital | `marketing-banner.webp` |
| Prospección Comercial | `prospeccion-comercial.webp` |
| Atención al Cliente | `atencion-cliente.webp` |
| Administración & E-Commerce | `soporte-ecommerce.webp` |

#### 3.6.3 Página de artículo (`/blog/<slug>/`, `_includes/post.njk`)
- Diseño en 3 columnas en escritorio, 2 en tablet y 1 en móvil:
  - **Izquierda:** botón **← Atrás** e índice *En este artículo*, generado por `toc.js` a partir de los `##`, que marca la sección que se está leyendo.
  - **Centro:** título (`<h1>`), fecha (*21 de octubre de 2026*) y cuerpo.
  - **Derecha:** *Sigue leyendo*, siempre con 4 artículos: los más recientes **del mismo tema** (sin el actual), completando con otros temas si faltan. Debajo, **Ver todo <tema> →** (pestaña paginada del tema) y **Ver todo el blog →**. Así el lector puede llegar a todos los artículos aunque el blog crezca. Cada artículo es un cuadro clicable que, al pasar el mouse o con foco, se marca con borde azul oscuro (`--color-primary-dark`) y fondo blanco.
- **Botón ← Atrás** (`blog-back.js`):
  - Si el lector llegó desde una pestaña del blog (o una de sus páginas), vuelve exactamente a esa pestaña y página.
  - En cualquier otro caso (Google, enlace directo u otro artículo), va a la pestaña de la categoría del artículo.
  - Sin JavaScript, el enlace apunta a la pestaña de la categoría.
- **Estructura del cuerpo:**
  1. Introducción breve.
  2. Secciones `##`.
  3. *En resumen*.
  4. Bloque CTA (`.blog-cta`), con título y texto propios del tema y botón **Agenda tu reunión** a `/#contacto` (o, en algunos artículos, **Conoce cómo trabajo** a `/como-trabajo/`). Se genera con el shortcode `{% blogCta "Título", "Texto" %}` definido en `eleventy.config.js`, así su diseño se cambia en un solo lugar para los 42 artículos.
- **Componentes disponibles:**
  - Tablas `.blog-table`: encabezado azul y filas alternadas; en móvil cada fila pasa a tarjeta con etiquetas.
  - Pasos numerados `.blog-steps`.
  - Guiones sugeridos `.blog-script`.
  - Bloques de código con desplazamiento horizontal.
  - Diagramas SVG en línea dentro de `<figure>`, accesibles (`role="img"`, `<title>`, `<desc>`), que se adaptan al modo claro y oscuro y se leen en un celular de 390 px.

#### 3.6.4 Contenido editorial
- **Público:** dueños y equipos de pymes en Chile, sin formación técnica.
- **Tono:** cercano, en tuteo, frases cortas, ejemplos chilenos, términos técnicos explicados; sin promesas absolutas ni cifras sin fuente.
- **Exactitud:** la información debe ser real y vigente, en especial la normativa chilena (SII, Ley 21.131, Ley 21.719, SERNAC) y las funciones de las herramientas. Los datos de ejemplo son ficticios y evidentes.
- **Un tema, una pestaña:** no se duplica un mismo artículo en dos pestañas.
- **Enlaces internos:** cada artículo enlaza a 2–4 guías relacionadas con texto descriptivo, y cada artículo recibe al menos un enlace desde otro (ningún artículo huérfano). Estado actual: promedio de 2,1 enlaces internos por artículo, 0 artículos sin enlaces y 0 huérfanos.
- **Enlaces oficiales:** donde un artículo cita una norma, un plazo legal o una herramienta, enlaza a la fuente oficial en su primera mención: Ley 21.131 y Ley 21.719 (BCN), SII (plazo de 8 días corridos desde que la factura llega al SII para reclamarla), SERNAC, NIC Chile, Previred, Google Search Console, PageSpeed Insights, Perfil de Empresa en Google y Microsoft Clarity (26 enlaces en total). Las direcciones se verifican antes de publicarlas.
- **Aspecto de los enlaces del texto:** azules, subrayados y en negrita media; al pasar el mouse, azul oscuro con subrayado más grueso; contorno visible con el teclado.
- **Enlaces externos:** se abren en una pestaña nueva con `rel="noopener noreferrer"`, muestran la marca **↗** y avisan a los lectores de pantalla con un texto oculto («se abre en una pestaña nueva»). Lo aplica automáticamente el transform `external-links` de Eleventy en todas las páginas. Los enlaces internos se abren en la misma pestaña.

#### 3.6.5 SEO del blog
- **Pestañas:**
  - Título propio (`seoTitle`, de 54 a 62 caracteres, por ejemplo *WordPress para pymes: guías prácticas | Rodolfo-Freelance*).
  - Descripción propia (`description`, de 140 a 156 caracteres).
  - Las páginas 2+ agregan *– Página N* al título.
- **Artículos:**
  - El título incluye « | Rodolfo-Freelance» solo si tiene 45 caracteres o menos.
  - La descripción es la del front matter (120 a 160 caracteres).
  - `og:type = article`.
- **Todas las páginas de Eleventy:**
  - `canonical` con su URL absoluta.
  - Open Graph (`og:title`, `og:description`, `og:url`, `og:image`, `og:locale = es_CL`).
  - Twitter Card `summary_large_image`, con la imagen `/assets/img/og-image.png` (1200 × 630).
- Las pestañas y los artículos se publican en el `sitemap.xml` (sección 3.2.2).

### 3.7 Página «Cómo trabajo» (`/como-trabajo/`)

Página de servicios generada con Eleventy (`content/como-trabajo/index.njk`). Convenciones de implementación en `CLAUDE.md` (sección *Página «Cómo trabajo»*).

- **Contenido separado del diseño:** los servicios, procesos y herramientas viven en `content/_data/services.json`, `processes.json` y `tools.json`, y se pintan con componentes Nunjucks reutilizables de `_includes/components/` (`carousel`, `serviceCard`, `processToggle`/`processPanel`, `toolGroups`). Para agregar o cambiar un servicio, un proceso o una herramienta se edita el `.json`; para cambiar el diseño de todas las tarjetas o procesos se edita el componente.
- La reorganización en componentes no cambió el HTML publicado (verificado contra el anterior), por lo que no afecta el funcionamiento ni el SEO.

#### 3.7.1 Hero y SEO
- `<h1>`: *Desarrollo web a medida y soluciones WordPress para negocios en Chile*. Bajada: *Sitios web que se miden, no solo que se ven bien.* Botones **Solicitar una cotización** y **Ver cómo trabajo**.
- Título en Google: *Desarrollo web a medida y WordPress en Chile | Rodolfo-Freelance*.
- Descripción: *Sitios web a medida, WordPress y WooCommerce, analítica y soporte operativo para pymes en Chile: marketing, prospección, atención al cliente y administración.*

#### 3.7.2 Servicios
- Eyebrow *Qué hago*, título *Servicios de desarrollo web, WordPress, marketing digital y gestión administrativa* y bajada *Para que te enfoques en lo importante.*
- Índice con dos enlaces: **Desarrollo Web y WordPress** y **Soporte Operativo**, que llevan a cada bloque.
- **Desarrollo Web y WordPress** (5 tarjetas, en carrusel):

  | Servicio | Guía |
  |---|---|
  | Desarrollo web a medida & MVP | Guía de Desarrollo web |
  | Sitios web en WordPress | Guía de WordPress |
  | Tiendas online con WooCommerce | Guía de tiendas online |
  | Auditoría web, optimización UX y posicionamiento SEO (mejora el sitio actual **sin rehacerlo**) | Guía de SEO y analítica |
  | Rediseño, modernización y optimización de sitios web (cuando el sitio **ya no se puede mejorar con ajustes**) | Guía de Desarrollo web |

- **Soporte operativo para tu negocio** (6 tarjetas con etiqueta de categoría, en carrusel):

  | Etiqueta | Servicio | Guía |
  |---|---|---|
  | Marketing | Gestión de redes sociales y contenidos | Guía de marketing digital |
  | Marketing | Marketing digital, publicidad y canales web | Guía de marketing digital |
  | Ventas | Prospección de clientes, soporte comercial y SDR remoto | Guía de prospección comercial |
  | Atención al cliente | Atención al cliente, soporte posventa y fidelización | Guía de atención al cliente |
  | Administración | Asistente virtual administrativo | Guía de administración |
  | E-commerce | Soporte para tiendas online (E-Commerce) | Guía de e-commerce |

- Cada tarjeta muestra: título, para quién es y qué problema resuelve (2 párrafos), el acordeón **Alcance según requerimiento** (botón **+** que gira a **×**, con la lista de lo que incluye), el enlace **Guía de … →** a la pestaña del blog del tema y **Cotiza Aquí →** al formulario (`/#contacto`). La guía y la cotización siempre están visibles y alineadas en la fila.

#### 3.7.3 Procesos («Cómo trabajo»)
- Bajada: *Cada servicio tiene su propio proceso, con etapas claras para que siempre sepas en qué punto está tu proyecto y qué viene después.*
- Fila de 6 botones de proceso en carrusel, cada uno con su **+**. Al presionar uno se abre debajo su flujo; se abre **un proceso a la vez**. Sin JavaScript se muestran todos.
- Cada flujo tiene un nombre y 5 etapas, en un diagrama CSS: horizontal con flechas en escritorio y vertical en tablet y móvil.

  | Proceso | Nombre del flujo |
  |---|---|
  | Desarrollo web y WordPress | Proceso de desarrollo web en 5 etapas: del diagnóstico al lanzamiento |
  | Auditoría web, UX y SEO | Proceso de auditoría y optimización en 5 etapas: del análisis a la mejora medida |
  | Marketing digital y redes sociales | Proceso de gestión de marketing en 5 etapas: de la estrategia al reporte mensual |
  | Prospección comercial | Proceso de prospección comercial en 5 etapas: del cliente ideal a la reunión agendada |
  | Atención al cliente | Proceso de atención al cliente en 5 etapas: de tus canales ordenados a clientes que vuelven |
  | Soporte administrativo & e-commerce | Proceso de soporte administrativo en 5 etapas: del orden inicial al reporte de gestión |

- Etapas del proceso de desarrollo web: Diagnóstico y requerimientos → Propuesta y cotización → Diseño y desarrollo funcional → Pruebas, ajustes y validación (incluye la medición de visitas y conversiones) → Lanzamiento y acompañamiento (soporte inicial; el plazo aún no está definido).

#### 3.7.4 Carrusel de tarjetas (común con la portada)
- Desplazamiento nativo con `scroll-snap`: dedo, rueda del mouse, teclado (la región recibe foco) y flechas ← → a media altura a los costados.
- Las flechas se rellenan de azul al pasar el mouse o con foco (y crecen levemente, salvo con `prefers-reduced-motion`) y se ocultan en el extremo donde no hay más tarjetas.
- Sin barra de desplazamiento visible y **sin avance automático**.
- Se usa en: Desarrollo de la portada, los dos bloques de servicios y la fila de procesos de *Cómo trabajo*.

#### 3.7.5 Herramientas con las que trabajo
- Bajada: *Elijo la herramienta según tu negocio, no al revés. Estas son las que uso a diario en cada servicio.*
- 5 grupos en columnas (una debajo de otra en móvil), cada herramienta con una frase de para qué le sirve al cliente:

  | Grupo | Herramientas |
  |---|---|
  | Desarrollo web | WordPress, WooCommerce, Node.js |
  | Medición y SEO | Google Analytics 4, Google Search Console, Microsoft Clarity |
  | Marketing | Google Ads, Meta Ads |
  | Ventas y atención | HubSpot, WhatsApp Business |
  | Operación | Google Workspace, Webpay y Mercado Pago |

- Los títulos de grupo usan el color de texto de la sección para mantener el contraste en modo claro y oscuro.

---

## 4. Requisitos no funcionales

- **Responsive**: usable desde 320 px hasta escritorio amplio (`1650px` de contenedor máximo).
- **Accesibilidad**: landmarks, `aria-*` con roles válidos (paneles de pestañas en `div`, no en `article`), contraste mínimo de 4,5:1 (el texto secundario en modo claro es `#4A6679`), botones reales para girar las tarjetas (`Enter`/`Space` sobre la flecha), pestañas (`ArrowLeft`/`ArrowRight`), acordeones (`aria-expanded` o `<details>` nativo), carruseles con botones con nombre y región con nombre, enlaces distinguibles por algo más que el color (subrayado), aviso de pestaña nueva en enlaces externos (texto `.visually-hidden`), skip-link, área táctil mínima de 44 px en los botones de giro y respeto a `prefers-reduced-motion`.
- **Giro de tarjetas**: solo el botón de flecha gira la tarjeta. No hay giro por hover ni por clic en el resto de la tarjeta, y las tarjetas no reciben foco de tabulación. El hover de las tarjetas solo cambia el borde, el brillo o la elevación (ver 3.5.1).
- **Rendimiento**: sin dependencias de frontend ni bundlers. Los scripts de componentes, `kit.js`, `data.js` y `main.js` se cargan con `defer` (no bloquean el render). Solo `theme.js` es síncrono, para evitar que el tema parpadee. Las hojas de estilo son bloqueantes, y es intencional para no mostrar la página sin estilos. El CSS se sirve en un solo archivo (`app.css`, generado por `npm run build:css`) y `main.js` minificado (`main.min.js`). Las portadas del blog pesan menos de ~110 KB cada una. Los carruseles y acordeones usan CSS nativo (`scroll-snap`, `<details>`) y scripts pequeños externos (`svc-carousel.js`, `svc-flows.js`).
- **Token CSRF**: no se pide al cargar la página. Solo se pide justo antes de cada envío del formulario.
- **Privacidad**: tipografía y recursos autoalojados. Medición con Google Tag Manager, Google Analytics 4 y Microsoft Clarity, declarada en la sección 5.2 de la Política de Privacidad (cookies `_ga`, `_ga_<ID>`, `_clck`, `_clsk`).
- **Regla de medición — obligatoria en TODAS las páginas del sitio** (portada, privacidad, *Cómo trabajo*, pestañas del blog, artículos y cualquier página nueva):

  | Herramienta | Cómo se instala | Requisito por página |
  |---|---|---|
  | **Google Tag Manager** (`GTM-WLCDS32G`) | `public/js/trusted-types.js` + `public/js/gtm.js` en el `<head>` (sin `defer`, en ese orden) y el `<noscript>` con el iframe de GTM al inicio del `<body>` | Debe cargarse |
  | **Google Analytics 4** | Se configura **dentro de GTM** (etiqueta de GA4), no con un script propio | Llega con GTM: si GTM está, GA4 mide la página |
  | **Microsoft Clarity** (`ywukiqkuzd`) | `public/js/clarity.js` con `defer` en el `<head>` | Debe cargarse |
  | **Google Search Console** | Se verifica **una vez para el dominio** (no se instala por página) | La página debe ser indexable: estar en `sitemap.xml`, tener `canonical` propio y no llevar `noindex` |

  - Las páginas HTML de `public/` incluyen los scripts a mano; las páginas de Eleventy los heredan de `_includes/base.njk`. **Una página nueva con otra plantilla debe incluirlos también.**
  - **Privacidad en Clarity:** todo formulario lleva `data-clarity-mask="true"` (hoy `#contact-form`, en `contact-section.js` y en su copia estática de `index.html`), para que las grabaciones y mapas de calor nunca muestren lo que escribe el visitante.
  - Los scripts van en archivos externos (nunca en línea) para cumplir la CSP; los dominios de Clarity y Google ya están permitidos en `netlify.toml` y `server/index.js`.
  - Antes de publicar se verifica que **todas** las páginas de `dist/` carguen `gtm.js` y `clarity.js` y figuren en el sitemap (por ejemplo, contando las páginas que los contienen frente al total de páginas).
  - **Estado actual:** se cumple en las 58 páginas (`index.html` y `privacidad.html` a mano; las 56 páginas de Eleventy desde `_includes/base.njk`).
- **Mantenibilidad**: datos separados (`data.js`), tokens de diseño en `variables.css`, componentes modulares en `js/components/`. En el blog, las pestañas se definen en un solo archivo (`blogTabs.json`), los datos del sitio en `site.json` y cada artículo es un `.md` independiente con el CTA final como shortcode (`blogCta`). En *Cómo trabajo*, el contenido está en archivos de datos (`services.json`, `processes.json`, `tools.json`) y el HTML en componentes reutilizables (`_includes/components/`). En la portada, el carrusel es un helper del kit compartido (`RFKIT.carousel`).
- **Despliegue (Netlify)**: `npm run build` (CSS + JS + Eleventy) publica `dist/`; `/api/*` se deriva a la función `netlify/functions/server.js`. Todo archivo nuevo que use el sitio (componentes, partials, datos, scripts, imágenes) debe estar en git: Netlify construye desde GitHub. Antes de publicar se verifica que no haya enlaces rotos, diferencias de mayúsculas/minúsculas en rutas (Netlify las distingue), estilos ni scripts en línea (CSP) ni `id` duplicados.

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
- CMS o editor visual para el blog (los artículos se escriben en Markdown), comentarios en los artículos, buscador interno, multi-idioma, captcha de terceros.
