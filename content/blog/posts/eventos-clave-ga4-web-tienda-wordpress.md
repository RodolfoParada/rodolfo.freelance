---
title: "Lista de eventos de GA4 para tu web y tu tienda"
description: "Nombres de los eventos que GA4 registra en WordPress, cuáles configurar para captar clientes y cómo leer el embudo de una tienda."
date: 2026-11-06T23:59:28Z
tags: wordpress
categoryName: WordPress
---

Saber cuántas personas entran a tu web es solo una parte de la historia. Lo que ayuda a decidir es saber qué hacen después: qué leen, dónde se detienen y qué botones tocan antes de escribirte o comprar.

En Google Analytics 4 (GA4), todo se mide con **eventos**: señales que se registran cada vez que alguien hace algo en el sitio. No hace falta medir cada clic. Basta con los eventos que marcan el camino hacia un contacto o una venta. Si todavía no tienes claro por qué conviene medir eventos y no solo visitas, en [por qué medir solo visitas te engaña](/blog/medir-eventos-clave-no-solo-visitas/) lo explicamos.

## Eventos que GA4 registra solos

Según cómo esté configurada tu cuenta, GA4 puede registrar automáticamente algunas acciones de lectura:

- **Páginas vistas (`page_view`).** Muestra qué artículos, páginas de servicio o fichas de producto llaman la atención.
- **Desplazamiento (`scroll`).** Se registra cuando el visitante llega cerca del final de la página, alrededor del 90 %. Sirve para saber si realmente leen o se van al principio.
- **Búsquedas dentro del sitio (`view_search_results`).** Muestra qué escriben las personas en el buscador de tu web. Es una buena pista de lo que buscan y no encuentran.
- **Clics hacia otros sitios (`click`).** Registra cuándo alguien sale de tu web hacia una red social u otro enlace externo.
- **Descargas de archivos (`file_download`).** Muestra qué PDF, catálogo o ficha técnica despierta interés.

## Eventos para captar clientes

Si tu objetivo es que te contraten o te escriban, conviene configurar estos eventos. A diferencia de los anteriores, no siempre se registran solos: hay que definirlos según tu formulario o tu sistema de contacto.

- **Envío de formulario (`generate_lead`).** Es el evento más valioso de una web de servicios. Se registra cuando alguien envía una consulta, un presupuesto o una solicitud de reunión.
- **Videos (`video_start` y `video_complete`).** Si tienes una presentación o una demostración en video, muestra cuántas personas empiezan a verlo y cuántas llegan hasta el final. Esto depende de la plataforma donde esté alojado.

## Eventos para tiendas online

En una tienda, la compra ocurre en pasos. Medir cada uno permite ver en qué momento se pierden las ventas:

| Evento | Qué significa | Para qué sirve |
|---|---|---|
| `view_item` | La persona abre la ficha de un producto. | Ver cuáles productos atraen más. |
| `add_to_cart` | Pulsa «Añadir al carrito». | Medir el interés real antes de pagar. |
| `view_cart` | Revisa su carrito. | Detectar si lo usa como lista temporal. |
| `begin_checkout` | Empieza el proceso de pago. | Saber cuántas personas tienen intención de comprar. |
| `purchase` | Completa la compra. | Calcular ventas, valor del pedido y resultados de campañas. |

Estos eventos suelen venir configurados con los plugins de tienda o con Google Tag Manager. Si tu tienda usa WooCommerce, en [cómo montar una tienda en WordPress con sus plugins](/blog/como-montar-tienda-wordpress-plugins/) revisamos las herramientas que conviene usar.

## Cómo leer los números

Tener los eventos activos sirve si comparas unos con otros. Tres relaciones ayudan a encontrar dónde se pierde la gente:

- **Entre la ficha y el carrito.** Si muchas personas abren un producto (`view_item`) pero pocas lo añaden (`add_to_cart`), quizás falta información: fotos claras, precios comprensibles o datos sobre envíos y plazos.
- **Entre el inicio del pago y la compra.** Si muchas personas empiezan el pago (`begin_checkout`) pero pocas compran (`purchase`), conviene revisar costos de envío que aparecen al final, formas de pago limitadas o un formulario con demasiados datos obligatorios.
- **Entre el contenido y el contacto.** Si un artículo tiene muchas lecturas pero casi no genera `generate_lead`, el contenido atrae visitas, pero quizás le falta una invitación clara a escribir.

## Un cuidado antes de empezar

Los eventos no deben enviar datos personales, como correos, teléfonos o nombres de quienes llenan un formulario. Esa información debe quedar fuera de la medición. Además, la medición con cookies debe respetar el consentimiento de la persona. La [Ley 21.719](https://www.bcn.cl/leychile/navegar?idNorma=1209272) sobre datos personales empieza a regir el 1 de diciembre de 2026, así que conviene revisar esto antes de esa fecha.

**Nota sobre la ley:** a la fecha, la Ley 21.719 rige desde el 1 de diciembre de 2026. Hay un proyecto en el Congreso que propone postergar su entrada en vigencia al 15 de octubre de 2027. Revisaremos este texto si el proyecto se aprueba.

## En resumen

No necesitas medir todo. Con unos pocos eventos bien configurados, puedes saber si tu web cumple su función: recibir consultas y vender. Empieza por el contacto o la compra, revisa las relaciones entre pasos y corrige lo que más frena a tus clientes.

{% blogCta "¿Tu web o tu tienda mide lo que realmente importa?", "Revisamos juntos qué eventos conviene configurar en GA4 y te explico qué significan tus números en lenguaje simple.", "Conoce cómo trabajo", "/como-trabajo/" %}
