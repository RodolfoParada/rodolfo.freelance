---
title: "Dominio, hosting y DNS explicados en simple: la analogía de la casa"
description: "Qué son el dominio, el hosting y el DNS, cómo se relacionan y qué cuidar al contratarlos para que tu negocio no dependa de nadie más."
date: 2026-10-21
tags: desarrollo
categoryName: Desarrollo WEB
---

Cuando una pyme decide tener su primera página web, el mundo técnico suele llegar con muchas palabras confusas: dominio .cl, hosting compartido, servidor dedicado, registros DNS, zona A, CNAME. Muchos proveedores venden todo en un mismo paquete, y eso hace que parezca una sola cosa.

No lo es. Son tres piezas distintas que trabajan juntas. Y entenderlas no requiere saber de informática. Basta con pensar en una tienda física.

## La analogía de la casa

Imagina que quieres abrir un local para atender a tus clientes. Necesitas tres cosas:

- **El local.** Es el espacio donde guardas tus productos, tus muebles y todo lo que ofreces. En internet, eso es el **hosting**: un computador conectado todo el día que guarda los archivos de tu web, como los textos, las fotos, la base de datos y, a veces, los correos. Sin hosting, tu web no tiene dónde existir.
- **La dirección.** Es el nombre con el que la gente te encuentra y te recomienda, por ejemplo, tuempresa.cl. Eso es el **dominio**. Sin él, tus clientes tendrían que recordar una serie de números, como 192.168.1.1, para entrar a tu sitio.
- **El GPS.** Es lo que traduce la dirección en la ubicación exacta del local. En internet, ese papel lo cumple el **DNS**. Cuando alguien escribe tuempresa.cl, el DNS busca en qué servidor está alojada tu web y lleva al visitante hasta allí en una fracción de segundo.

## Qué considerar en cada parte

**El dominio.** No se compra para siempre: se registra por uno, dos o cinco años y hay que renovarlo.

- Los dominios .cl se gestionan a través de [NIC Chile](https://nic.cl/).
- Los dominios globales (.com, .net, .org) se compran en registradores acreditados, como Namecheap o GoDaddy, entre otros.

Mi recomendación más importante: registra el dominio a nombre de tu empresa, o a tu nombre, y usa un correo al que tengas acceso permanente. No dejes que un diseñador o una agencia lo inscriba a su nombre. Si la relación termina mal, recuperar tu dirección puede ser un trámite largo y complicado.

**El hosting.** Del hosting depende qué tan rápido carga tu sitio y si aguanta cuando entran muchas personas a la vez. Hay tres tipos comunes:

- **Hosting compartido.** Es como arrendar una pieza en un edificio grande: compartes recursos con otros sitios. Es lo más económico y sirve bien para una web institucional con poco tráfico. El riesgo es que, si un vecino satura el servidor, tu sitio también se pone lento.
- **Servidor virtual (VPS) o en la nube.** Es como tener un departamento propio: los recursos son tuyos y no dependen de otros. Conviene si tienes una tienda en WooCommerce, un sistema de cotizaciones activo o si no puedes permitirte caídas.
- **Plataformas estáticas, como Netlify o Vercel.** Sirven muy bien para sitios corporativos y blogs que no necesitan base de datos. El contenido se distribuye en varios servidores del mundo y requiere poco mantenimiento.

**El DNS.** Casi nunca tendrás que tocarlo, pero es lo que permite que cada parte cumpla su papel. Puedes tener el dominio en un lugar, la web en otro y los correos en un tercero, y el DNS los conecta.

Algunos registros que vas a escuchar:

- **Registro A o CNAME:** indica a qué servidor debe ir tu web cuando alguien escribe www.tuempresa.cl.
- **Registros MX:** indican a qué plataforma deben llegar los correos de @tuempresa.cl.
- **Registros TXT:** sirven para verificar que el sitio es tuyo en herramientas como [Google Search Console](https://search.google.com/search-console/about), y para proteger tus correos contra el spam.

## Errores que suelen salir caros

- **Dejar vencer el dominio.** Si no renuevas a tiempo, puede quedar disponible para cualquiera. Activa la renovación automática o pon un recordatorio.
- **Elegir el hosting más barato para una tienda.** Ahorrar un poco al mes puede costar bastante en ventas si el carrito de compras se queda pegado en el peor momento.
- **Usar el correo del mismo hosting del sitio.** Muchos planes económicos incluyen correos gratis, pero si el servidor se cae o termina en listas de spam, tu empresa puede quedarse sin recibir presupuestos. Conviene tener el correo en una plataforma profesional e independiente, como Google Workspace.

Si vas a tener correos con tu propio dominio, en [correo @tuempresa.cl o @gmail.com](/blog/correo-corporativo-dominio-cl-vs-gmail/) te explico por qué conviene. Y para no depender de un solo proveedor, revisa [cómo respaldar tu web fuera del servidor](/blog/copias-de-seguridad-web-github-railway/).

## En resumen

- El **dominio** es tu nombre y tu dirección.
- El **hosting** es el espacio donde viven tu web y tus archivos.
- El **DNS** es lo que conecta el nombre con el espacio.

Entender esta separación te permite cambiar de proveedor cuando lo necesites, elegir la mejor opción para tus correos y mantener el control de la identidad digital de tu negocio.

Si tienes dudas sobre cómo está armado tu sitio o qué conviene cambiar, puedes ver [cómo trabajo y qué incluye cada etapa](/como-trabajo/).

{% blogCta "¿Tu dominio o tu hosting no están donde deberían?", "Lo revisamos juntos. Te digo qué está bien, qué conviene ordenar y qué cuidar para que tu negocio no dependa de nadie.", "Conoce cómo trabajo", "/como-trabajo/" %}
