---
title: Cómo montar una tienda con WordPress y qué plugins usar
description: Requisitos de hosting, WooCommerce, pasarelas de pago en Chile, caché, analítica, seguridad y SEO para tu tienda en WordPress.
date: 2026-10-21
tags: wordpress
categoryName: WordPress
image: /assets/img/wordpress-orbita.webp
imageAlt: Logo de WordPress con planetas girando a su alrededor
---

Una tienda rápida y segura en WordPress no depende de instalar muchos plugins, sino de elegir una base sólida y solo los necesarios para vender con seguridad, buena velocidad y pasarelas de pago locales.

A continuación te explico, paso a paso, qué preparar antes de vender y qué plugins vale la pena usar para ponerla en marcha.

## 1. La base antes de instalar plugins: Hosting y entorno técnico

Antes de configurar WordPress, conviene asegurarse de que el hosting cumpla con algunos mínimos para que la tienda funcione bien cuando tenga varios clientes comprando al mismo tiempo:

- **Versión de PHP:** usa PHP 8.2 o superior. Las versiones nuevas son más rápidas y consumen menos memoria, lo que se nota en el carrito.
- **Memoria de PHP (Memory Limit):** WooCommerce recomienda al menos 256 MB, y 512 MB si esperas bastante tráfico. Se configura en `wp-config.php` o `php.ini`.
- **Certificado SSL (HTTPS):** es necesario para cifrar los datos de pago y para que el navegador no marque el sitio como inseguro.
- **Tema liviano:** evita los constructores visuales muy cargados de código innecesario. Temas como Astra o GeneratePress, o el editor nativo de bloques, suelen cargar rápido.

Si no quieres encargarte del hosting ni de esta configuración técnica, [cómo trabajo y qué incluye cada etapa](/como-trabajo/) explica cómo lo hago yo.

## 2. El motor central del e-commerce

### WooCommerce

Es el plugin oficial para convertir WordPress en una tienda completa.

- **Qué resuelve:** el catálogo de productos (simples, variables o digitales), el inventario, los impuestos, las zonas de envío y el estado de cada pedido.
- **Buenas prácticas:** revisa las opciones de WooCommerce en Ajustes > Avanzado y desactiva las funciones de seguimiento que no uses, para que la base de datos cargue menos consultas.

## 3. Pasarelas de pago indispensables (Chile y Latinoamérica)

Para cobrar compras reales necesitas pasarelas conectadas a la banca local:

- **Transbank Webpay Plus (oficial):** cobra con tarjetas de débito (Redcompra), crédito y prepago nacionales, y también en cuotas.
- **Mercado Pago para WooCommerce:** ofrece integración rápida con tarjetas, transferencias y dinero en cuenta de Mercado Pago, con acreditación ágil.
- **Flow / Fintoc:** alternativas para pagar por transferencia bancaria de forma automática.

## 4. Rendimiento y caché (crucial para no ralentizar el carrito)

Un error común es aplicar caché agresiva a las páginas de compra. El plugin de caché debe excluir `/carrito/`, `/finalizar-compra/` y `/mi-cuenta/`.

- **WP Rocket (de pago) o LiteSpeed Cache** (si tu hosting usa LiteSpeed): comprimen CSS y JavaScript, cargan las imágenes solo cuando se ven y excluyen automáticamente las cookies de WooCommerce.
- **Alternativa gratuita:** WP Super Cache o Cache Enabler, con un poco de optimización manual.

## 5. Medición, analítica y seguimiento de conversiones

Saber qué productos miran tus clientes y en qué paso abandonan la compra es clave para vender más:

- **Google Tag Manager para WordPress (GTM4WP) o el plugin oficial de GTM:** te permiten instalar el contenedor y enviar a Google Analytics 4 los eventos de comercio electrónico, como `view_item`, `add_to_cart` y `purchase`, con los montos exactos de cada venta.
- **[Microsoft Clarity](https://clarity.microsoft.com/):** muestra grabaciones de navegación y mapas de calor, útiles para detectar en qué se traban tus clientes, como botones que no responden, campos confusos o problemas en el celular.

Si prefieres que alguien deje esta medición lista desde el inicio, puedes revisar [qué incluye la configuración de analítica en cada proyecto](/como-trabajo/).

## 6. Seguridad y transaccionalidad

Las tiendas suelen recibir ataques automáticos a formularios y carritos:

- **WP Mail SMTP o FluentSMTP:** por defecto WordPress envía los correos con la función `mail()` de PHP, y muchos de esos correos terminan en spam, incluidas las confirmaciones de compra. Un plugin SMTP los envía a través de servicios autenticados como SendGrid, Brevo, Gmail API o Amazon SES.
- **Wordfence Security:** protege contra intentos de adivinar contraseñas en `/wp-login.php`, bloquea direcciones IP sospechosas y avisa si alguien modifica archivos del núcleo de WordPress.

## 7. SEO técnico y datos estructurados

- **Rank Math SEO o Yoast SEO:** crean el `sitemap.xml` automáticamente, te dejan personalizar títulos y descripciones de cada producto y agregan datos estructurados (Schema Product) con precio y disponibilidad. Esto ayuda a que Google muestre mejor tus productos, aunque no garantiza un resultado especial.

Para elegir la base visual de tu tienda, te puede servir [cómo elegir el tema de WordPress correcto](/blog/elegir-tema-wordpress-negocio/). Y cuando ya esté funcionando, la [guía de caché en WordPress para no romper tu tienda](/blog/guia-tecnica-cache-wordpress-tienda/) te ayuda a que cargue rápido sin afectar el carrito ni los pagos.

{% blogCta "¿Quieres una tienda así sin tener que armarla tú?", "Te cuento cómo trabajo, qué incluye cada etapa y cómo empezamos.", "Conoce cómo trabajo", "/como-trabajo/" %}
