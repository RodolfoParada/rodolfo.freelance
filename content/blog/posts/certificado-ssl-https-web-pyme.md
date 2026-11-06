---
title: "Certificado SSL y HTTPS: por qué tu web necesita el candado"
description: "Qué es el certificado SSL, qué significa HTTPS y por qué los navegadores advierten cuando un sitio no es seguro. Cómo afecta la confianza de tus clientes y tus contactos."
date: 2026-11-06T23:59:32Z
tags: desarrollo
categoryName: Desarrollo WEB
---

Imagina entrar a una tienda cuya puerta tiene un cartel que dice «Cuidado: este lugar no es seguro». Probablemente darías media vuelta. Eso mismo siente una persona cuando su navegador le advierte que una web no es segura.

Chrome, Safari, Firefox y Edge muestran esas advertencias cuando un sitio no usa conexión cifrada. Eso afecta la confianza del cliente antes de que lea una sola línea de tu propuesta.

## 1. Qué es el certificado SSL y qué es HTTPS

Para entenderlo sin tecnicismos, piensa en cómo viaja la información por internet.

- **HTTP (sin cifrado).** Es como enviar una carta en una postal abierta. Quien esté en el camino, como una red Wi-Fi pública, podría leer lo que se escribe: nombres, mensajes o contraseñas.
- **HTTPS (con certificado SSL).** Es como poner esa carta dentro de una caja fuerte con combinación. Solo el navegador de la persona y el servidor de tu web tienen la clave para abrirla.

El certificado es la credencial digital que confirma que tu dominio es auténtico y activa esa conexión cifrada. En la práctica, hoy se usa el protocolo TLS, pero el nombre SSL sigue siendo el más conocido.

## 2. Por qué los navegadores advierten

Antes, el candado verde era el símbolo de seguridad. Hoy la conexión segura es lo normal, así que los navegadores casi no destacan el candado. En cambio, sí muestran advertencias cuando el sitio no está protegido: un texto de «no seguro» o una pantalla que dice que la conexión no es privada.

Para una persona común, ese mensaje puede sonar a estafa o virus. Por eso conviene que tu web muestre esa señal de confianza desde el primer momento.

## 3. Tres motivos para tener HTTPS

**La confianza del cliente.** Si alguien llega a tu web para pedir una cotización y ve una advertencia, es probable que dude de tu empresa. Quizás no complete el formulario, no deje su teléfono o no compre.

**Tus contactos y tus ventas.** Las visitas que consigues con redes sociales, publicidad o recomendaciones se pierden si el navegador las frena. Una web bien diseñada no ayuda si la gente no se atreve a entrar.

**El posicionamiento en Google.** Google ha señalado HTTPS como una señal para ordenar sus resultados. Su peso es menor que el del contenido, pero entre dos páginas parecidas, la segura tiene ventaja. Además, si las personas salen rápido de tu web por una advertencia, eso también puede jugar en contra.

## 4. «Yo no vendo online»: también necesitas HTTPS

Muchas pymes creen que, si su web es solo informativa, no necesitan certificado. Eso ya no es así, por tres razones:

- **Cualquier formulario maneja datos personales.** Un nombre, un correo o un mensaje son datos de personas.
- **Los navegadores avisan al escribir.** En una web sin HTTPS, muchos navegadores advierten cuando alguien escribe en un campo de texto.
- **Sin cifrado, el contenido puede alterarse.** Una red intermedia podría mostrar publicidad o contenido ajeno a tu web mientras el visitante navega.

La Ley 21.719 sobre datos personales también exige adoptar medidas de seguridad para proteger la información que recibes, según su artículo 14 quinquies. El cifrado de la conexión es una de las medidas más básicas. Puedes revisar el texto completo en la [Biblioteca del Congreso Nacional](https://www.bcn.cl/leychile/navegar?idNorma=1209272).

## Cómo activarlo

En muchos casos, el certificado viene incluido con el hosting o se puede activar desde el panel del proveedor. Antes de contratar, pregunta si lo incluye y si se renueva automáticamente. Una vez activo, asegúrate de que todas las páginas carguen con HTTPS y de que las versiones antiguas redirijan a la nueva dirección. En [dominio, hosting y DNS explicados](/blog/dominio-hosting-dns-explicados/) revisamos qué es cada parte. Si tu sitio además usa una red de distribución de contenido, en [qué es una CDN y cómo hace que tu web cargue rápido](/blog/cdn-web-carga-rapido/) explicamos cómo funciona.

## En resumen

El certificado SSL con HTTPS no es un detalle técnico para grandes empresas. Es lo mínimo para que una web se vea confiable, proteja los datos de quienes escriben y no aparezca con advertencias en el navegador. Revisa hoy si tu sitio carga con HTTPS y, si no, pide a tu proveedor que lo active.

{% blogCta "¿Tu web aparece como no segura en el navegador?", "Revisamos el certificado, la redirección a HTTPS y los formularios de tu sitio, y te explico en simple qué conviene corregir primero.", "Conoce cómo trabajo", "/como-trabajo/" %}
