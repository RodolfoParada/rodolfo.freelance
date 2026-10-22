---
title: "Cómo usar Microsoft Clarity en WordPress para entender por qué tus visitas no compran"
description: "Cómo instalar Microsoft Clarity en WordPress y usar sus grabaciones y mapas de calor para encontrar en qué se traban tus clientes."
date: 2026-10-21
tags: wordpress
categoryName: WordPress
---

Tienes visitas en tu sitio. Los anuncios traen gente, la oferta parece buena, pero al final del mes las ventas o las cotizaciones no llegan como esperabas.

Google Analytics 4 te ayuda a ver qué está pasando: cuántas personas entran, qué páginas miran y dónde se van. Lo que no te dice es por qué. Qué vio el cliente, en qué parte se confundió, qué botón no le respondió o por qué cerró la pestaña justo antes de pagar.

Para eso sirve [Microsoft Clarity](https://clarity.microsoft.com/). Es una herramienta gratuita que te muestra grabaciones anónimas de la navegación y mapas de calor, es decir, dónde hacen clic y hasta dónde bajan las personas. Te explico cómo instalarla en WordPress y qué mirar para encontrar las fallas.

## Clarity no reemplaza a Analytics, lo complementa

Google Analytics te entrega números: cuántos abandonaron el carrito o cuántos salieron en la página de pago. Clarity te muestra la escena: un visitante intentando tocar el botón de pagar desde su celular, y un menú que lo tapa sin que se dé cuenta.

Algunas cosas que me parecen útiles de Clarity:

- Es gratuita, y no tienes que preocuparte por un límite de visitas que te obligue a pagar de un día para otro.
- Oculta por defecto lo que la gente escribe en los campos de texto, así que no se graban contraseñas ni datos de tarjetas.
- Detecta comportamientos raros sin que tengas que buscarlos: clics repetidos, clics en cosas que no hacen nada o personas que vuelven atrás enseguida.

## Las señales de frustración que conviene revisar

En el panel de Clarity aparecen algunos indicadores que llaman la atención rápido:

- **Clics de rabia (rage clicks):** la persona hace clic muchas veces, muy rápido, sobre lo mismo. Suele pasar cuando algo parece un botón y no hace nada, o cuando el botón real tarda demasiado en responder.
- **Clics muertos (dead clicks):** la persona toca un texto, un ícono o una imagen esperando que pase algo, y no pasa nada.
- **Desplazamiento excesivo:** sube y baja muy rápido por la página sin leer. Muchas veces significa que no encuentra lo que busca, como precios, plazos o cómo contactarte.
- **Retornos rápidos:** entra a una página y vuelve atrás en segundos, porque no era lo que esperaba.

## Cómo instalarla en WordPress

Hay dos caminos sencillos.

**Con Google Tag Manager**, si ya lo tienes instalado, que es lo más ordenado:

1. Entra a clarity.microsoft.com, crea un proyecto con el nombre de tu sitio y la dirección de la web.
2. Copia el ID del proyecto.
3. En Google Tag Manager, crea una etiqueta nueva. Puedes usar la plantilla de Clarity o una etiqueta de HTML personalizado con el script que entrega Clarity, y pegar tu ID.
4. Asígnale el activador de todas las páginas, guarda y publica el contenedor.

**Con el plugin oficial de WordPress**, si prefieres no tocar Tag Manager: busca "Microsoft Clarity" en Plugins > Añadir nuevo, instálalo, actívalo y conecta tu cuenta o pega el ID del proyecto.

Para comprobar que funciona, abre tu sitio en una ventana de incógnito, navega un par de páginas y vuelve al panel de Clarity. Normalmente las primeras sesiones aparecen en menos de una hora.

Un recordatorio importante: como estas grabaciones son datos de navegación, la herramienta debe estar declarada en tu política de privacidad. Si no lo está, conviene actualizarla antes de usarla con clientes reales.

## Qué revisar en tu sitio

Cuando tengas algunos días de datos, estos son los lugares donde suelo buscar problemas.

**El formulario de contacto o de cotización.** Filtra las grabaciones por la página de contacto. Lo que buscas son personas que empiezan a llenar el formulario y se detienen a mitad de camino. Muchas veces el problema es un campo que no es necesario en un primer contacto, un mensaje de error poco claro o un envío que no avisa si salió bien.

**El proceso de compra en WooCommerce.** Revisa las sesiones que llegaron al checkout pero no terminaron la compra. Fíjate en las opciones de despacho y en el momento en que aparece el procesador de pagos. Un costo de envío que aparece tarde suele ser una de las causas más frecuentes de abandono.

**La navegación en el celular.** Separa los datos por dispositivo y mira el mapa de desplazamiento. Si la mayoría de las personas no llega al final de la página, quizá el título es demasiado grande o el botón principal queda debajo de todo. También revisa si algún menú flotante tapa el botón de WhatsApp o el de compra.

**Lo que distrae del botón principal.** En el mapa de clics, mira dónde se concentran los toques. Si la gente hace clic en banners decorativos o en enlaces secundarios en vez de en tu botón de cotizar, el diseño está compitiendo con la venta.

## Algunos ajustes que suelen funcionar

Lo que encuentres en las grabaciones casi siempre tiene una solución concreta:

- Si hay clics de rabia en un botón, ayuda mostrar un indicador de carga al presionarlo.
- Si hay clics muertos en textos o fotos, conviene quitarles el aspecto de enlace o convertirlos en un botón de verdad.
- Si la gente se va en el checkout, aclara los costos de envío antes de llegar al formulario final.
- Si la portada no se entiende en pocos segundos, simplifica el título y pon el botón principal más arriba.

Si quieres entender mejor cada tipo de mapa, en [mapas de calor: cómo ver dónde hacen clic tus clientes](/blog/mapas-de-calor-donde-hacen-clic-tus-clientes/) te explico cómo leerlos. Y para medir las acciones que de verdad acercan una venta, revisa [por qué medir solo visitas te engaña](/blog/medir-eventos-clave-no-solo-visitas/).

## En resumen

Clarity convierte las suposiciones en observaciones. Ver cómo navegan tus clientes reales te permite encontrar exactamente dónde se traban y corregirlo, muchas veces sin gastar más en publicidad.

Si prefieres que alguien revise esto contigo, puedes ver [cómo trabajo y qué incluye cada etapa](/como-trabajo/).

{% blogCta "¿Quieres saber en qué se traban tus clientes?", "Instalamos Clarity, revisamos las primeras grabaciones contigo y te digo qué ajustar primero.", "Conoce cómo trabajo", "/como-trabajo/" %}
