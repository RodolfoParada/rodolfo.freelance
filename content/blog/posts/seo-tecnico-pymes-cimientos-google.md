---
title: "SEO técnico para pymes: 6 bases para que Google encuentre tu web"
description: "Rastreo, indexación, sitemap, enlaces internos, velocidad y datos estructurados: qué son, por qué importan y cómo revisarlos gratis en la web de tu pyme."
date: 2026-10-21T22:00:00Z
tags: marketing
categoryName: Marketing Digital
---

Cuando se habla de aparecer en Google, casi siempre se piensa en escribir buenos textos, elegir palabras clave o conseguir que otros sitios te enlacen. Todo eso importa. Pero hay algo que muchas pymes descubren tarde: puedes tener el mejor contenido, y si Google no logra leer bien tu web, simplemente no apareces.

De eso se encarga el **SEO técnico**: revisar que la base de tu web esté ordenada, sea rápida y se entienda bien, tanto para Google como para las herramientas de inteligencia artificial que hoy también buscan información.

Suena complejo, pero no lo es tanto. En este artículo te explico, en simple, las seis bases que conviene revisar para que tu inversión en la web no quede escondida.

## Cómo llega tu web a los resultados de Google

Antes de entrar en detalle, conviene entender el camino que sigue Google para mostrar una página. Son tres pasos:

<figure>
<svg viewBox="0 0 480 380" width="440" role="img" aria-labelledby="seo-flow-title seo-flow-desc" fill="none" stroke="currentColor" stroke-width="1.5">
  <title id="seo-flow-title">Cómo llega tu web a Google</title>
  <desc id="seo-flow-desc">Tres pasos. Uno, rastreo: Google recorre tu web y lee sus páginas; influyen el archivo robots.txt y el sitemap. Dos, indexación: Google decide si guarda la página en su catálogo; se revisa en Search Console. Tres, resultados: Google muestra tu página a quien busca; influyen la calidad del contenido y la velocidad.</desc>
  <rect x="1" y="4" width="478" height="104" rx="14" fill="currentColor" fill-opacity="0.04"/>
  <rect x="1" y="138" width="478" height="104" rx="14" fill="currentColor" fill-opacity="0.04"/>
  <rect x="1" y="272" width="478" height="104" rx="14" fill="currentColor" fill-opacity="0.14" stroke-width="2.5"/>
  <path d="M240 112 V132 M233 125 L240 132 L247 125"/>
  <path d="M240 246 V266 M233 259 L240 266 L247 259"/>
  <g fill="currentColor" stroke="none">
    <text x="24" y="40" font-size="21" font-weight="800">1. Rastreo</text>
    <text x="24" y="68" font-size="17">Google recorre tu web y lee sus páginas.</text>
    <text x="24" y="94" font-size="15" font-weight="700">Influyen: robots.txt y sitemap</text>
    <text x="24" y="174" font-size="21" font-weight="800">2. Indexación</text>
    <text x="24" y="202" font-size="17">Decide si guarda la página en su catálogo.</text>
    <text x="24" y="228" font-size="15" font-weight="700">Se revisa en: Google Search Console</text>
    <text x="24" y="308" font-size="21" font-weight="800">3. Resultados</text>
    <text x="24" y="336" font-size="17">Muestra tu página a quien te busca.</text>
    <text x="24" y="362" font-size="15" font-weight="700">Influyen: calidad del contenido y velocidad</text>
  </g>
</svg>
<figcaption><p>Si falla el primer o el segundo paso, no importa qué tan bueno sea tu contenido: Google no podrá mostrarlo.</p></figcaption>
</figure>

## 1. Rastreo: dejar que Google entre a tu web

Para saber qué ofreces, Google envía programas automáticos, llamados **robots** o *crawlers*, que recorren tu web página por página. Si algo les bloquea el paso, no pueden leer tu contenido.

### El archivo robots.txt

Es un archivo de texto que está en la dirección principal de tu web, por ejemplo `tudominio.cl/robots.txt`. Le indica a los buscadores qué partes pueden recorrer y cuáles no.

- **Lo correcto:** dejar abiertas tus páginas públicas y bloquear solo zonas privadas, como el panel de administración o el carrito de compras.
- **El error más grave:** que después de un rediseño quede por descuido la línea `Disallow: /`. Esa línea le pide a todos los buscadores que no recorran ninguna página de tu web, y con el tiempo tu sitio puede desaparecer de los resultados.

Un detalle importante: robots.txt controla qué se **recorre**, no qué se **muestra**. Si quieres que una página no aparezca en Google, la herramienta correcta es la etiqueta `noindex`, que te explico en el siguiente punto.

## 2. Indexación: entrar al catálogo de Google

Rastrear e indexar no son lo mismo:

- **Rastrear** es cuando Google visita tu página y lee su contenido.
- **Indexar** es cuando Google decide guardarla en su catálogo para mostrarla a quien busque algo relacionado.

Google no indexa todo lo que visita. Si una página tiene poco contenido, repite lo que ya está en otra o tiene problemas técnicos, puede quedar fuera.

### Cómo ayudar a Google a indexar bien

- **Etiqueta canónica:** si tienes la misma página en varias direcciones parecidas (por ejemplo, con y sin parámetros de campaña), esta etiqueta le indica a Google cuál es la versión principal. Así evitas que varias copias compitan entre sí y se repartan la visibilidad.
- **Etiqueta noindex:** úsala en páginas que no tiene sentido mostrar en Google, como la página de agradecimiento después de enviar un formulario. Ojo: noindex no protege información privada; solo le pide a Google que no la muestre.
- **Google Search Console:** es la herramienta gratuita de Google para revisar tu web. Con la opción «Inspeccionar URL» puedes comprobar si una página aparece como **«La URL está en Google»**.

## 3. El sitemap: un mapa de tu web para Google

El **sitemap** es un archivo (normalmente `tudominio.cl/sitemap.xml`) que lista las páginas importantes de tu web y cuándo se actualizaron por última vez.

En vez de esperar a que Google descubra tus páginas nuevas siguiendo enlace por enlace, el sitemap le entrega la lista completa.

- **Buenas prácticas:** incluye solo páginas que funcionan y que quieres mostrar. Nada de enlaces rotos, redirecciones ni páginas con noindex.
- **Envíalo a Search Console:** en la sección «Sitemaps» puedes enviarlo y revisar si Google lo leyó sin errores. No garantiza que Google indexe todo de inmediato, pero sí le ayuda a encontrar más rápido lo que publicas.

Si tu web está en WordPress, plugins como Yoast SEO o Rank Math generan el sitemap automáticamente.

## 4. Estructura de la web y enlaces internos

La forma en que organizas tus páginas y cómo las enlazas entre sí le dice a Google qué es lo más importante de tu negocio.

<figure>
<svg viewBox="0 0 480 404" width="440" role="img" aria-labelledby="seo-tree-title seo-tree-desc" fill="none" stroke="currentColor" stroke-width="1.5">
  <title id="seo-tree-title">Estructura recomendada de una web de pyme</title>
  <desc id="seo-tree-desc">Desde la página de inicio salen dos secciones: servicios, que es la página principal del tema, y blog. De servicios salen dos páginas: desarrollo web y analítica digital. Del blog salen dos artículos, y cada artículo tiene un enlace interno hacia la página de servicio relacionada.</desc>
  <path d="M240 68 V99 H130 V130 M240 99 H350 V130"/>
  <path d="M130 178 V214 H63 V250 M130 214 H181 V250"/>
  <path d="M350 178 V214 H299 V250 M350 214 H417 V250"/>
  <rect x="165" y="20" width="150" height="48" rx="12" fill="currentColor" fill-opacity="0.04"/>
  <rect x="40" y="130" width="180" height="48" rx="12" fill="currentColor" fill-opacity="0.14" stroke-width="2.5"/>
  <rect x="260" y="130" width="180" height="48" rx="12" fill="currentColor" fill-opacity="0.04"/>
  <rect x="8" y="250" width="110" height="56" rx="12" fill="currentColor" fill-opacity="0.04"/>
  <rect x="126" y="250" width="110" height="56" rx="12" fill="currentColor" fill-opacity="0.04"/>
  <rect x="244" y="250" width="110" height="56" rx="12" fill="currentColor" fill-opacity="0.04"/>
  <rect x="362" y="250" width="110" height="56" rx="12" fill="currentColor" fill-opacity="0.04"/>
  <g stroke-dasharray="5 5">
    <path d="M299 306 C299 346 181 346 181 312"/>
    <path d="M417 306 C417 378 63 378 63 312"/>
  </g>
  <path d="M175 318 L181 310 L187 318 M57 318 L63 310 L69 318"/>
  <g fill="currentColor" stroke="none" text-anchor="middle">
    <text x="240" y="43" font-size="20" font-weight="800">Inicio</text>
    <text x="240" y="61" font-size="15">tudominio.cl</text>
    <text x="130" y="153" font-size="20" font-weight="800">Servicios</text>
    <text x="130" y="171" font-size="15">Página principal</text>
    <text x="350" y="153" font-size="20" font-weight="800">Blog</text>
    <text x="350" y="171" font-size="15">Artículos y guías</text>
    <text x="63" y="274" font-size="16" font-weight="700">Desarrollo</text>
    <text x="63" y="292" font-size="16" font-weight="700">web</text>
    <text x="181" y="274" font-size="16" font-weight="700">Analítica</text>
    <text x="181" y="292" font-size="16" font-weight="700">digital</text>
    <text x="299" y="274" font-size="16">Artículo</text>
    <text x="299" y="292" font-size="16">de métricas</text>
    <text x="417" y="274" font-size="16">Artículo</text>
    <text x="417" y="292" font-size="16">sobre webs</text>
  </g>
  <path d="M110 393 H150" stroke-dasharray="5 5"/>
  <text x="160" y="398" font-size="16" fill="currentColor" stroke="none">Enlaces del blog hacia tus servicios</text>
</svg>
<figcaption><p>Una estructura clara: pocas secciones principales, páginas ordenadas bajo cada una y artículos del blog que enlazan a tus servicios.</p></figcaption>
</figure>

- **Que todo esté cerca:** como regla práctica, tus páginas más importantes deberían estar a no más de tres clics desde la página de inicio. Mientras más escondida está una página, menos importante le parece a Google y más le cuesta encontrarla a tus clientes.
- **Enlaza tus artículos con tus servicios:** si escribes en tu blog sobre cómo mejorar una tienda online, agrega dentro del texto un enlace a tu página de servicios relacionada. Esos enlaces ayudan a Google a entender qué páginas son las más importantes y llevan a tus lectores directo a lo que vendes.

## 5. Velocidad y Core Web Vitals

Google mide la experiencia de las personas en tu web con tres indicadores llamados **Core Web Vitals**. Forman parte de lo que Google evalúa para ordenar los resultados. No pesan más que un buen contenido, pero cuando dos páginas son parecidas, la experiencia puede marcar la diferencia. Y, sobre todo, una web lenta espanta clientes.

- **LCP (velocidad de carga):** cuánto tarda en aparecer lo más grande de la pantalla, como la foto principal o el título. **Meta: 2,5 segundos o menos.**
- **INP (rapidez de respuesta):** cuánto tarda la página en reaccionar cuando alguien toca un botón o abre un menú. **Meta: 200 milisegundos o menos.**
- **CLS (estabilidad visual):** si mientras lees, una imagen o un banner carga tarde y empuja el texto hacia abajo, haciendo que toques algo por error. **Meta: 0,1 o menos.**

Para una pyme, mejorar estos números suele pasar por usar imágenes livianas, en formato WebP o AVIF, activar la caché y evitar constructores o plugins que cargan más código del necesario. Si tu web está en WordPress, en [por qué tu WordPress carga lento](/blog/por-que-wordpress-carga-lento/) te explico las causas más comunes. Y como Google revisa sobre todo la versión para celulares, también te puede servir [diseño mobile-first](/blog/diseno-mobile-first-web-pymes/).

## 6. Datos estructurados: explicarle tu negocio a Google

Las personas leemos una web mirando su diseño, sus textos y sus fotos. Google y las herramientas de inteligencia artificial, en cambio, entienden mejor la información cuando viene ordenada en un formato estándar.

Los **datos estructurados** son un pequeño bloque de código, invisible para tus visitas, que le explica a los buscadores quién eres, qué haces y dónde atiendes. Se escriben siguiendo el vocabulario de Schema.org, normalmente en formato JSON-LD. Por ejemplo:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tu Empresa",
  "url": "https://tudominio.cl",
  "logo": "https://tudominio.cl/logo.png",
  "areaServed": {
    "@type": "Country",
    "name": "Chile"
  },
  "sameAs": [
    "https://www.instagram.com/tuempresa",
    "https://www.linkedin.com/company/tuempresa"
  ]
}
</script>
```

Si tu negocio atiende en un local físico, conviene usar el tipo `LocalBusiness`, con tu dirección, teléfono y horario.

### Qué ganas con esto

- **Resultados más llamativos en Google:** con el tipo de datos correcto, Google puede mostrar información extra, como el precio y la disponibilidad de tus productos, o mostrar tu logo y tus datos de contacto. Ojo con lo que prometen algunas agencias: desde 2023 Google solo muestra las preguntas frecuentes desplegables para sitios de gobierno y de salud, y no muestra las estrellas de reseñas que una empresa publica sobre sí misma.
- **Que te entiendan mejor:** los datos estructurados ayudan a Google, y también a herramientas de inteligencia artificial como ChatGPT, Gemini o Perplexity, a entender con claridad qué hace tu negocio y dónde. No garantizan que te recomienden, pero eliminan dudas sobre quién eres.

## Lista de revisión para tu web

Esta tabla resume las seis bases, qué resuelve cada una y cómo revisarla gratis:

<div class="blog-table">
<table>
<caption>Las 6 bases del SEO técnico y cómo revisarlas</caption>
<thead>
<tr>
<th scope="col">Base</th>
<th scope="col">Qué resuelve</th>
<th scope="col">Cómo revisarla</th>
</tr>
</thead>
<tbody>
<tr>
<td>Rastreo (robots.txt)</td>
<td data-label="Qué resuelve">Que Google pueda entrar a tus páginas públicas.</td>
<td data-label="Cómo revisarla">Abre tudominio.cl/robots.txt y confirma que no diga <code>Disallow: /</code>.</td>
</tr>
<tr>
<td>Indexación</td>
<td data-label="Qué resuelve">Que tus páginas importantes aparezcan en Google.</td>
<td data-label="Cómo revisarla">«Inspeccionar URL» en Google Search Console.</td>
</tr>
<tr>
<td>Sitemap</td>
<td data-label="Qué resuelve">Que Google encuentre rápido tus páginas nuevas.</td>
<td data-label="Cómo revisarla">Sección «Sitemaps» en Search Console, sin errores.</td>
</tr>
<tr>
<td>Estructura y enlaces internos</td>
<td data-label="Qué resuelve">Que Google y tus clientes entiendan qué es lo más importante.</td>
<td data-label="Cómo revisarla">Recorre tu web: ¿llegas a cada servicio en tres clics o menos?</td>
</tr>
<tr>
<td>Core Web Vitals</td>
<td data-label="Qué resuelve">Que tu web cargue rápido y no salte en el celular.</td>
<td data-label="Cómo revisarla">Google PageSpeed Insights, con la pestaña de celular.</td>
</tr>
<tr>
<td>Datos estructurados</td>
<td data-label="Qué resuelve">Que Google y la IA entiendan quién eres y qué ofreces.</td>
<td data-label="Cómo revisarla">Prueba de resultados enriquecidos de Google.</td>
</tr>
</tbody>
</table>
</div>

## En resumen

El SEO técnico no se hace una sola vez y se olvida. Es como la mantención de un auto: si la base está bien cuidada, todo lo demás funciona mejor.

Con una web que Google puede recorrer sin bloqueos, páginas bien indexadas, una estructura clara, buena velocidad y datos estructurados, le das a tu negocio la mejor oportunidad de aparecer cuando un cliente busca lo que ofreces.

<div class="blog-cta">
  <div>
    <p class="blog-cta__title">¿Google está viendo tu web como debería?</p>
    <p class="blog-cta__text">Reviso las seis bases del SEO técnico de tu sitio, corrijo lo que esté bloqueando tu visibilidad y te explico en simple qué cambió y por qué.</p>
  </div>
  <a class="btn btn--primary" href="/#contacto">Agenda tu reunión</a>
</div>
