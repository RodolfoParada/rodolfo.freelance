---
title: "Correos de WordPress en spam: cómo enviarlos bien con SMTP"
description: "Por qué los correos de tu web no llegan, qué es SMTP y cómo configurar el envío con SPF, DKIM y DMARC para llegar a la bandeja de entrada."
date: 2026-11-06T23:40:00Z
tags: wordpress
categoryName: WordPress
---

Llenaste el formulario de contacto de tu web y nunca llegó el aviso. O un cliente pide recuperar su contraseña y el correo aparece en spam, o no aparece. Pasa mucho en WordPress, y casi nunca es mala suerte.

## Por qué los correos de WordPress se pierden

Por defecto, WordPress envía sus correos usando la función de envío de tu servidor de hosting. El mensaje sale desde una máquina que muchas veces comparten otros sitios, y que no se identifica de forma confiable como tu negocio.

Gmail, Outlook y otros proveedores revisan tres cosas, y WordPress normalmente no las cumple:

- **El remitente no coincide con el servidor real.** Tu web dice que escribe desde `hola@tu-negocio.ejemplo`, pero el correo sale desde un servidor con otro nombre. Para el proveedor, eso se parece a suplantación.
- **La dirección IP es compartida.** Si otro sitio en ese mismo servidor envió spam, tus correos también pueden quedar bloqueados.
- **No hay firmas de verificación.** Los correos enviados así no traen las firmas que permiten comprobar que vienen de tu dominio.

## Qué es SMTP y cómo te ayuda

SMTP es el sistema estándar para enviar correo electrónico. En lugar de que tu web envíe el correo directamente, se conecta a un servicio de correo hecho para eso: el correo de tu empresa o un proveedor de envíos como Brevo, SendGrid o Mailgun. Ese servicio firma cada mensaje y lo entrega con una reputación mucho mejor.

Para configurarlo no necesitas tocar el código de WordPress. Basta con un plugin.

<ol class="blog-steps">
<li>
<p class="blog-steps__meta">Paso 1</p>
<p class="blog-steps__title">Elige el servicio de envío</p>
<p>Si envías pocos correos, como formularios de contacto o avisos internos, tu correo corporativo suele bastar. Si envías muchos, como notificaciones de pedidos en una tienda, conviene un servicio de envío masivo. Revisa en su sitio el límite de envíos de su plan gratuito, porque puede cambiar.</p>
</li>
<li>
<p class="blog-steps__meta">Paso 2</p>
<p class="blog-steps__title">Instala un plugin SMTP</p>
<p>Ve a Plugins &gt; Añadir nuevo y busca WP Mail SMTP, FluentSMTP o Post SMTP. Cualquiera de los tres sirve para este paso.</p>
</li>
<li>
<p class="blog-steps__meta">Paso 3</p>
<p class="blog-steps__title">Configura el remitente y la conexión</p>
<p>Pon como correo remitente una dirección de tu dominio, por ejemplo <code>hola@tu-negocio.ejemplo</code>, y marca la opción para que todos los correos de la web usen esa dirección. Luego ingresa los datos que te entregue tu proveedor: clave de API, o servidor, puerto y usuario si es SMTP manual.</p>
</li>
<li>
<p class="blog-steps__meta">Paso 4</p>
<p class="blog-steps__title">Haz una prueba de envío</p>
<p>Usa la herramienta de prueba del plugin y envía un correo a tu cuenta personal. Si llega a la bandeja de entrada, la conexión funciona.</p>
</li>
</ol>

## SPF, DKIM y DMARC: el paso que muchos olvidan

Configurar SMTP no alcanza por sí solo. Tu dominio también tiene que autorizar a ese servicio de envío, y eso se hace con tres registros en el panel donde administras el DNS (puede ser Cloudflare, cPanel o el panel de tu proveedor de dominio). Si el tema de DNS te suena lejano, en [dominio, hosting y DNS explicados](/blog/dominio-hosting-dns-explicados/) lo revisamos con calma.

- **SPF:** una lista de los servicios autorizados a enviar correo a nombre de tu dominio.
- **DKIM:** una firma digital que permite comprobar que el mensaje no fue alterado en el camino. El proveedor de SMTP te entrega el registro para copiar.
- **DMARC:** la regla que indica qué hacer con los correos que no pasan SPF o DKIM. Para empezar, muchas personas usan una política que solo observa y no bloquea nada, como `v=DMARC1; p=none; rua=mailto:reportes@tu-negocio.ejemplo`.

No hace falta que domines estos registros. Sí conviene que quien administra tu web o tu dominio los configure y los revise.

## Lista de verificación rápida

- ¿Desactivaste el envío nativo de WordPress con un plugin SMTP?
- ¿La dirección remitente del plugin coincide con la cuenta de tu servicio de envío?
- ¿SPF y DKIM están activos en el panel de tu dominio?
- ¿Configuraste una dirección de respuesta (Reply-To) para que el cliente pueda responderte?

Si vendes online, el correo también es parte de la venta. Por eso conviene revisarlo antes de [montar una tienda con WordPress y sus plugins](/blog/como-montar-tienda-wordpress-plugins/), y también antes de dejar un formulario abierto al público, como se explica en [cómo proteger el formulario de tu web de spam](/blog/spam-formularios-fuerza-bruta-proteger-web-pyme/).

## En resumen

Un correo que sale directamente desde tu servidor puede parecer spam para Gmail u Outlook. Usar SMTP y configurar SPF, DKIM y DMARC le da a tu correo una identidad que el proveedor puede verificar. Si el formulario de tu web no te llega, este es el primer lugar donde conviene mirar.

{% blogCta "¿Tu formulario de contacto no te llega?", "Revisamos la configuración de correo de tu WordPress, dejamos SMTP funcionando y te explicamos qué registros faltan.", "Conoce cómo trabajo", "/como-trabajo/" %}
