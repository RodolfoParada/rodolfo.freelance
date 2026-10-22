---
title: "Guía técnica de caché en WordPress: cómo optimizar sin romper tu tienda"
description: "Cómo usar la caché en WordPress sin romper el carrito, el checkout ni los pagos con Webpay en tu tienda WooCommerce."
date: 2026-10-21
tags: wordpress
categoryName: WordPress
---

Cuando administras un negocio o una tienda online en WordPress, la velocidad no es solo un capricho técnico: es lo que define si una persona compra o se cansa y se va a la competencia.

Todos recomiendan instalar un plugin de caché para que la web vuele. Sin embargo, en una tienda online (sobre todo con WooCommerce), la caché es un arma de doble filo: si la configuras a ciegas, puedes terminar mostrando el carrito de un cliente a otra persona, romper los botones de pago con Webpay o impedir que los productos se agreguen a la orden.

A continuación, revisamos cómo funciona la caché, explicada sin rodeos, y la configuración para acelerar tu tienda con estabilidad.

## 1. ¿Qué es la caché y por qué rompe carritos si se usa mal?

Para entender el problema, piensa en dos tipos de páginas dentro de tu sitio:

- **Páginas estáticas (aptas para caché agresiva):** la portada, la página de contacto, el catálogo general o un artículo de blog. Todos los visitantes ven exactamente el mismo contenido. La caché guarda una copia del HTML ya procesado y la entrega de inmediato, sin consultar la base de datos.
- **Páginas dinámicas y privadas (nunca deben cachearse):** el carrito, el proceso de pago (checkout), "Mi cuenta" y los formularios de cotización. Cada usuario tiene datos propios: sus productos, su dirección y su sesión de compra.

Si el plugin guarda una copia del carrito cuando Juan agrega una polera, María podría ver esa misma polera al entrar. Y si se cachean los scripts de seguridad de WordPress (los nonces), la confirmación del pago puede fallar.

## 2. Las 3 reglas para proteger tu tienda

Para optimizar sin generar errores en las ventas, tu sistema de caché debe cumplir tres reglas.

### Regla 1: excluir las URLs de compra

En la configuración de exclusión de páginas (Never Cache URLs), indica:

- `/carrito/*` (o `/cart/*`)
- `/finalizar-compra/*` (o `/checkout/*`)
- `/mi-cuenta/*` (o `/my-account/*`)

### Regla 2: excluir las cookies de sesión de WooCommerce

Los plugins de caché modernos, como LiteSpeed Cache o WP Rocket, suelen detectarlas automáticamente. De todas formas, conviene verificar que nunca se guarde en caché la página de un usuario que tenga estas cookies:

- `woocommerce_cart_hash`
- `woocommerce_items_in_cart`
- `wp_woocommerce_session_*`

Cuando un visitante agrega un producto, el sistema detecta estas cookies y entrega contenido actualizado, para que el menú muestre el contador del carrito con el número correcto.

### Regla 3: revisar la opción de combinar JavaScript en el pago

La opción "Minify / Combine JS" puede romper pasarelas de pago como Webpay Plus, Mercado Pago o las billeteras digitales.

Puedes minificar los archivos, pero en general no conviene combinarlos en uno solo si tu sitio ya funciona con HTTP/2 o HTTP/3, porque esos protocolos cargan varios archivos de forma eficiente. Si tienes problemas en el pago, desactiva esa opción primero.

## 3. Configuración según tu hosting

### Escenario A: servidores con LiteSpeed (LiteSpeed Cache)

Si tu proveedor usa LiteSpeed Web Server, tienes el mejor escenario para una tienda:

- En **Caché > Configuración de caché**, activa la caché general y la caché para móviles.
- En la pestaña de **WooCommerce**, verifica que esté activada la opción para excluir el carrito y el checkout.
- En **ESI** (Edge Side Includes), si tu tema lo permite, el icono del carrito en la cabecera puede actualizarse sin recargar toda la página.

### Escenario B: servidores estándar (WP Rocket o WP Super Cache)

- **Con WP Rocket:** detecta WooCommerce y excluye las páginas críticas por defecto. Solo asegúrate de no activar la carga diferida (lazy load) en los scripts de las pasarelas de pago.
- **Con plugins gratuitos, como WP Super Cache:** en los ajustes avanzados, agrega manualmente las páginas de WooCommerce a la lista de exclusión y usa el modo de entrega estándar.

Si prefieres que alguien configure esto por ti, puedes revisar [cómo trabajo y qué incluye cada etapa](/como-trabajo/).

## 4. Lista de comprobación después de los cambios

Antes de dar por terminada la optimización, haz esta prueba en una ventana de incógnito, como si fueras un comprador:

1. **Navega por la portada:** debe cargar rápido y verse bien.
2. **Agrega un producto al carrito:** revisa que el contador de la cabecera se actualice de inmediato.
3. **Entra al carrito y al checkout:** confirma que los campos de envío funcionan con normalidad y que lo que escribes no aparece en otra ventana.
4. **Haz una prueba de pago:** llega hasta la pantalla de la pasarela para comprobar que el formulario y la conexión segura responden sin errores ni pantallas en blanco.

La caché es solo una de las causas de una web lenta; las demás están en [por qué tu WordPress carga lento](/blog/por-que-wordpress-carga-lento/). Y para entender cómo influye la velocidad en tu posición en Google, revisa [SEO técnico para pymes](/blog/seo-tecnico-pymes-cimientos-google/).

{% blogCta "¿Tu tienda necesita una revisión de velocidad y pagos?", "Te cuento cómo trabajo, qué incluye cada etapa y cómo empezamos.", "Conoce cómo trabajo", "/como-trabajo/" %}
