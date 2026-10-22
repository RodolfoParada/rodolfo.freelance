---
title: "Mapas de calor: cómo ver dónde hacen clic y dónde se traban tus clientes"
description: "Los mapas de calor muestran con colores dónde tocan, hasta dónde bajan y dónde se traban tus visitas. Te explico cómo usarlos gratis para vender más."
date: 2026-10-21T21:00:00Z
tags: desarrollo
categoryName: Desarrollo WEB
---

Revisar tablas de números en Google Analytics no es la tarea favorita de nadie que administra un negocio. Puedes ver que el 65% de las visitas se va sin interactuar o que el 80% no completa tu formulario. Eso te dice que algo anda mal, pero no te dice **qué parte de tu web** está fallando.

Para responder esa pregunta existen los **mapas de calor**. Son una imagen de tu propia web pintada con colores, desde el azul hasta el rojo, que te muestra dónde tocan, hasta dónde bajan y en qué partes se detienen tus visitas.

En vez de adivinar por qué la gente no compra ni cotiza, puedes ver cómo usan tu web personas reales, sin saber quiénes son. En este artículo te explico cómo funcionan, qué tipos existen y cómo usarlos para mejorar tus ventas.

## Cómo funciona un mapa de calor

Imagina una cámara térmica en el pasillo de una tienda. Los lugares por donde más pasa la gente y los productos que más tocan se ven en rojo. Los rincones a los que nadie va quedan en azul.

En tu web pasa lo mismo:

- **Zonas rojas o cálidas:** donde hay más actividad, es decir, más clics, más toques con el dedo o más personas que llegan a verlas.
- **Zonas azules o frías:** las partes que pasan desapercibidas, que la gente salta o que casi nadie alcanza a ver.

Lo mejor es que termina con las discusiones de gustos, del tipo «a mí me gusta el botón aquí» o «yo creo que el texto se entiende». En su lugar tienes evidencia de cómo usan tu web tus clientes.

## Los tres tipos de mapas de calor

Herramientas como [Microsoft Clarity](https://clarity.microsoft.com/), que es gratuita, o Hotjar, que tiene un plan gratuito limitado, ofrecen distintos tipos de mapas. Estos son los más útiles:

<figure>
<svg viewBox="0 0 480 590" width="440" role="img" aria-labelledby="heatmap-title heatmap-desc" fill="none" stroke="currentColor" stroke-width="1.5">
  <title id="heatmap-title">Los tres tipos de mapas de calor</title>
  <desc id="heatmap-desc">Tres pantallas de celular con la misma página. En la primera, mapa de clics, hay manchas rojas sobre el botón principal y sobre una imagen que no es un enlace. En la segunda, mapa de desplazamiento, la pantalla pasa de rojo arriba a azul abajo, porque cada vez menos personas bajan. En la tercera, mapa de áreas, cada bloque de la página está coloreado según cuánta interacción recibe.</desc>
  <defs>
    <radialGradient id="hm-hot">
      <stop offset="0" stop-color="#E5484D" stop-opacity="0.95"/>
      <stop offset="0.45" stop-color="#F59E0B" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#FACC15" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hm-scroll" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#E5484D"/>
      <stop offset="0.35" stop-color="#F59E0B"/>
      <stop offset="0.6" stop-color="#FACC15"/>
      <stop offset="1" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  <g>
    <rect x="20" y="10" width="110" height="180" rx="14"/>
    <rect x="60" y="17" width="30" height="4" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none"/>
    <g fill="currentColor" stroke="none" fill-opacity="0.14">
      <rect x="30" y="30" width="90" height="10" rx="3"/>
      <rect x="30" y="48" width="90" height="40" rx="4"/>
      <rect x="30" y="98" width="90" height="4" rx="2"/>
      <rect x="30" y="108" width="78" height="4" rx="2"/>
      <rect x="30" y="118" width="84" height="4" rx="2"/>
      <rect x="30" y="164" width="90" height="4" rx="2"/>
      <rect x="30" y="174" width="70" height="4" rx="2"/>
    </g>
    <rect x="45" y="134" width="60" height="18" rx="9"/>
    <circle cx="75" cy="143" r="20" fill="url(#hm-hot)" stroke="none"/>
    <circle cx="98" cy="66" r="15" fill="url(#hm-hot)" stroke="none"/>
  </g>
  <g>
    <rect x="20" y="205" width="110" height="180" rx="14"/>
    <rect x="25" y="210" width="100" height="170" rx="10" fill="url(#hm-scroll)" fill-opacity="0.75" stroke="none"/>
    <g fill="#1B1B1B" stroke="none" font-size="13" font-weight="700">
      <text x="34" y="232">100%</text>
      <text x="34" y="300">50%</text>
      <text x="34" y="370">20%</text>
    </g>
  </g>
  <g>
    <rect x="20" y="400" width="110" height="180" rx="14"/>
    <rect x="60" y="407" width="30" height="4" rx="2" fill="currentColor" fill-opacity="0.3" stroke="none"/>
    <g stroke="none">
      <rect x="30" y="420" width="90" height="12" rx="3" fill="#3B82F6" fill-opacity="0.55"/>
      <rect x="30" y="438" width="90" height="40" rx="4" fill="#F59E0B" fill-opacity="0.8"/>
      <rect x="30" y="486" width="90" height="28" rx="4" fill="#3B82F6" fill-opacity="0.35"/>
      <rect x="30" y="522" width="90" height="22" rx="11" fill="#E5484D" fill-opacity="0.85"/>
      <rect x="30" y="552" width="90" height="18" rx="4" fill="#3B82F6" fill-opacity="0.2"/>
    </g>
  </g>
  <g fill="currentColor" stroke="none">
    <text x="148" y="52" font-size="22" font-weight="800">1. Mapa de clics</text>
    <text x="148" y="84" font-size="18">Muestra dónde tocan</text>
    <text x="148" y="108" font-size="18">o hacen clic. Revela los</text>
    <text x="148" y="132" font-size="18">«clics muertos»: lo que</text>
    <text x="148" y="156" font-size="18">parece botón y no lo es.</text>
    <text x="148" y="259" font-size="22" font-weight="800">2. Mapa de desplazamiento</text>
    <text x="148" y="291" font-size="18">Muestra hasta dónde bajan.</text>
    <text x="148" y="315" font-size="18">Rojo: lo ve casi todo el mundo.</text>
    <text x="148" y="339" font-size="18">Azul: lo ven muy pocas personas.</text>
    <text x="148" y="442" font-size="22" font-weight="800">3. Mapa de áreas</text>
    <text x="148" y="474" font-size="18">Muestra qué bloques de</text>
    <text x="148" y="498" font-size="18">la página reciben más</text>
    <text x="148" y="522" font-size="18">interacción, para</text>
    <text x="148" y="546" font-size="18">compararlos entre sí.</text>
  </g>
</svg>
<figcaption><p>La misma página vista con los tres mapas: dónde tocan, hasta dónde bajan y qué bloques reciben más atención.</p></figcaption>
</figure>

### 1. Mapa de clics

Registra cada clic con el mouse en el computador y cada toque con el dedo en el celular.

**Lo que suele descubrir:** los **clics muertos**. Es muy común ver manchas rojas sobre fotos, títulos en negrita o íconos que parecen botones, pero no llevan a ninguna parte. La persona toca esperando que pase algo, no pasa nada, y piensa que tu web no funciona.

### 2. Mapa de desplazamiento

Muestra qué porcentaje de las visitas llega a cada parte de la página a medida que bajan por ella.

**Lo que suele descubrir:** hasta dónde llega realmente la gente. Casi todos ven la parte superior, pero es común que solo una minoría llegue al final. Si pusiste tu botón de WhatsApp, tus testimonios o tu formulario al final de la página, puede que la mayoría de tus visitas nunca los vea.

### 3. Mapa de áreas o de movimiento

Microsoft Clarity incluye un **mapa de áreas**, que suma los clics por bloque completo de la página. Por ejemplo, cuántos clics recibe todo el menú, toda la galería o toda la sección de precios. Así puedes comparar qué secciones atraen más.

Otras herramientas, como Hotjar, ofrecen además un **mapa de movimiento**, que registra por dónde pasa el mouse en el computador. El movimiento del mouse suele acompañar en parte a la mirada, así que sirve como pista, no como prueba. Te puede mostrar si la atención se va hacia un banner animado o un menú recargado en vez de quedarse en tus servicios y precios.

## Cuatro problemas que puedes detectar en 10 minutos

Después de un par de semanas recopilando datos, una revisión rápida puede mostrarte errores que quien diseñó la web no ve:

- **Pensar que la gente lee todo.** Si escribiste ocho párrafos sobre la historia de tu empresa y el mapa muestra que la mayoría pasa de largo, conviene resumirlo en tres ideas cortas.
- **Botones difíciles de alcanzar en el celular.** Si filtras el mapa para ver solo celulares, puedes revisar si tu botón principal queda al alcance del pulgar o en una esquina incómoda.
- **Enlaces que alejan de la venta.** Si llevas visitas desde anuncios a una página de ventas y el mapa muestra clics hacia tus redes sociales u otros enlaces, estás perdiendo personas que ya estaban por cotizar.
- **Campos del formulario que traban a la gente.** Las grabaciones de visitas muestran en qué campo la persona duda o abandona. Por ejemplo, cuando pides el RUT o el teléfono como obligatorios en una primera consulta.

Si te interesa justamente mejorar la versión para celulares, en [diseño mobile-first](/blog/diseno-mobile-first-web-pymes/) te explico qué revisar.

## Google Analytics y los mapas de calor se complementan

Google Analytics te dice **qué** está pasando. El mapa de calor te ayuda a entender **por qué**. Estos son tres ejemplos de cómo se ven los mismos problemas con cada herramienta:

<div class="blog-table">
<table>
<caption>Lo que te dice cada herramienta ante el mismo problema</caption>
<thead>
<tr>
<th scope="col">Situación</th>
<th scope="col">Google Analytics te dice…</th>
<th scope="col">El mapa de calor te muestra…</th>
</tr>
</thead>
<tbody>
<tr>
<td>Página de servicios</td>
<td data-label="Google Analytics te dice…">Las personas pasan en promedio 45 segundos en la página.</td>
<td data-label="El mapa de calor te muestra…">Que muchos tocan una y otra vez una foto que no se agranda.</td>
</tr>
<tr>
<td>Pago en la tienda online</td>
<td data-label="Google Analytics te dice…">El 75% abandona en el paso del despacho.</td>
<td data-label="El mapa de calor te muestra…">Que presionan varias veces el costo de envío porque no termina de calcularse.</td>
</tr>
<tr>
<td>Formulario de contacto</td>
<td data-label="Google Analytics te dice…">Solo el 1,2% de las visitas envía el formulario.</td>
<td data-label="El mapa de calor te muestra…">Que en el celular el botón de enviar queda tan abajo que pocos llegan a verlo.</td>
</tr>
</tbody>
</table>
</div>

Si quieres entender mejor los números de Google Analytics, en [visitas, usuarios, tiempo en página y conversiones](/blog/metricas-web-visitas-usuarios-conversiones/) te explico cómo leerlos.

## Cómo empezar sin gastar

Muchas pymes no usan mapas de calor porque creen que son herramientas caras para grandes empresas. Hoy no es así:

- **Microsoft Clarity es gratis.** No tiene planes pagados y funciona bien con el tráfico de cualquier pyme. Se instala en pocos minutos, directamente en tu web o con Google Tag Manager. Además de los mapas, incluye grabaciones de visitas y detecta solo los momentos de frustración, como los **clics de rabia**: cuando alguien toca varias veces seguidas algo que no responde. Las grabaciones se guardan por 30 días, así que conviene marcar como favoritas las que quieras conservar.
- **Cuida la privacidad.** Clarity oculta por defecto lo que la gente escribe en los campos de texto, como contraseñas, teléfonos o datos de tarjetas, y no identifica a las personas. Aun así, debes informarlo en la política de privacidad de tu web. Ten en cuenta que en Chile la nueva [Ley 21.719](https://www.bcn.cl/leychile/navegar?idNorma=1209272) de protección de datos personales entra en vigencia en diciembre de 2026, así que es un buen momento para revisar qué datos recoge tu web y cómo lo comunicas.

Si tu web está hecha en WordPress, en [cómo usar Microsoft Clarity en WordPress](/blog/clarity-wordpress-visitas-no-compran/) te explico la instalación paso a paso.

## En resumen

Mejorar tu web no se trata de rediseñarla cada seis meses según lo que a alguien le parece. Con los mapas de calor puedes basar cada cambio en cómo la usan tus clientes: quitar lo que confunde, poner los botones donde la gente los busca y despejar el camino para que más personas compren o te pidan una cotización.

{% blogCta "¿Quieres ver tu web con los ojos de tus clientes?", "Instalo Microsoft Clarity en tu sitio, reviso los mapas de calor y las grabaciones, y te entrego una lista clara de cambios para que más visitas terminen escribiéndote o comprando." %}
