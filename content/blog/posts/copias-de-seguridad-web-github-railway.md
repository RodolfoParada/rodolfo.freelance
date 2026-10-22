---
title: "Copias de seguridad de tu web: por qué GitHub y Railway no bastan"
description: "Tener el código en GitHub y la web en Railway no es lo mismo que tener respaldo. Te explico qué debe respaldar tu pyme, cada cuánto y cómo comprobarlo."
date: 2026-10-21
tags: desarrollo
categoryName: Desarrollo WEB
---

Hoy muchas webs de pymes se arman por partes. La parte visible, lo que ve el cliente, se publica en plataformas como Netlify o Vercel. La parte que trabaja por detrás, que guarda pedidos, recibe formularios o maneja usuarios, corre en servicios como Railway o Render. Y el código queda guardado en GitHub.

Con esa combinación es fácil pensar: «Mi código está en GitHub y todo está en la nube, así que ya estoy respaldado».

No del todo. GitHub guarda el código, es decir, las instrucciones con las que se construye tu web. Pero lo que de verdad no se puede reemplazar son los **datos de tu negocio**: clientes, pedidos, cotizaciones, archivos que suben tus usuarios y las claves que conectan todo. Eso no vive en GitHub.

En este artículo te cuento qué riesgos existen, qué debes respaldar y cada cuánto, explicado sin tecnicismos innecesarios.

## Por qué tener el código en GitHub no es suficiente

GitHub y Railway son excelentes para publicar y actualizar tu web. Pero hay situaciones que no cubren:

- **El código no incluye tus datos.** Si la base de datos se daña, alguien borra información por error o una actualización mal hecha modifica los registros, GitHub no tiene copia de esos datos. Solo tiene el código.
- **Depender de una sola cuenta es un riesgo.** Si el proveedor suspende tu cuenta por un pago rechazado, una alerta de seguridad o una falla en sus servidores, puedes perder el acceso a tu web y también a las copias que guardabas en ese mismo panel.
- **Algunos archivos se borran solos.** En servicios como Railway, el servidor se vuelve a crear en cada actualización. Si tu web guarda comprobantes, PDF o imágenes directamente ahí, sin un espacio de almacenamiento permanente, esos archivos pueden desaparecer en la próxima publicación.
- **Las copias de Railway quedan dentro de Railway.** Railway ofrece copias automáticas de sus volúmenes, y conviene activarlas, pero se guardan en la misma plataforma. Si pierdes el acceso a tu cuenta, pierdes la web y las copias al mismo tiempo.

La regla de oro es simple: **una copia de seguridad solo sirve si sobrevive aunque pierdas el acceso al servidor donde está tu web.** Por eso debe guardarse en otro lugar, con otro proveedor.

## ¿Mi web necesita respaldo si no tiene base de datos?

Depende de lo que haga. No todas las webs tienen el mismo riesgo:

- **Backend en Railway que solo envía formularios a tu correo.** Si tu servidor recibe el formulario, lo envía por correo y no guarda nada, los mensajes ya quedan en tu bandeja de entrada. El riesgo es bajo: basta con tener el código en GitHub, una copia en tu computador y tus claves guardadas en un lugar seguro.
- **Backend en Railway con base de datos o archivos.** Si tu web registra pedidos, usuarios, reservas o guarda archivos, el riesgo es alto. Necesitas respaldar esos datos fuera de Railway, como te explico más abajo.

## Qué debe incluir un respaldo completo

Para poder levantar tu web desde cero en otro proveedor si algo grave pasa, necesitas tres cosas, cada una guardada por separado:

- **La base de datos.** Es una copia completa de la información de tu negocio: clientes, pedidos, productos y todo lo que la web registra. Se hace con herramientas estándar, como `pg_dump` para PostgreSQL o `mysqldump` para MySQL, y se guarda cifrada.
- **Los archivos que suben tus usuarios.** Fotos, comprobantes, adjuntos de cotizaciones. Lo ideal es que no se guarden en el mismo servidor de la web, sino en un servicio de almacenamiento de archivos como Cloudflare R2 o Amazon S3, y que además se copien de forma periódica a un segundo lugar.
- **Las claves y configuraciones.** Son los datos que conectan tu web con otros servicios: la base de datos, el correo, Transbank u otras pasarelas de pago. Nunca deben subirse a GitHub y tampoco conviene que existan solo en el panel del proveedor. Guárdalas en un gestor de contraseñas, como Bitwarden, o en un archivo cifrado.

Y el código también: aunque esté en GitHub, mantén una copia actualizada en tu computador. Si algún día pierdes el acceso a tu cuenta de GitHub, tendrás todo a mano.

## ¿Cada cuánto hay que respaldar?

Para decidirlo, hazte dos preguntas:

- **¿Cuánta información puedes darte el lujo de perder?** Si la última copia es de ayer, perderías todo lo que pasó hoy. ¿Es grave para tu negocio o no?
- **¿Cuánto tiempo puede estar caída tu web?** Una web informativa puede esperar unas horas. Una tienda en línea pierde ventas cada minuto.

Con eso, una guía general:

- **Web informativa que recibe formularios:** base de datos una vez al día y archivos una vez a la semana.
- **Plataforma con usuarios activos que crean contenido todos los días:** base de datos cada 6 a 12 horas y archivos una vez al día.
- **Tienda en línea o sistema con pagos, pedidos y stock:** base de datos cada hora o con respaldo continuo (muchos proveedores lo ofrecen como «recuperación a un punto en el tiempo») y archivos copiados de inmediato.

## Cómo automatizar los respaldos

Hacer copias a mano funciona hasta el día en que se te olvida. Lo recomendable es que se hagan solas:

1. **Una tarea programada hace la copia.** Puede ser un pequeño proceso en tu mismo servicio o una tarea automática en GitHub. Conviene que corra de noche o en horarios de poco movimiento.
2. **La copia se comprime y se cifra.** Así ocupa menos espacio y nadie puede leerla aunque llegue a manos equivocadas.
3. **Se envía a otro proveedor.** Por ejemplo, desde Railway hacia Cloudflare R2 o Amazon S3, idealmente en otra región.
4. **Las copias antiguas se borran solas.** Estos servicios permiten configurar reglas para eliminar archivos según su antigüedad. Por ejemplo, conservar las copias diarias por 30 días y las semanales por tres meses. Así no pagas de más por almacenamiento.

Si usas tareas programadas de GitHub, ten en cuenta que en repositorios públicos se desactivan automáticamente cuando el repositorio pasa unos 60 días sin cambios. Revisa de vez en cuando que siguen funcionando.

## El paso que casi nadie hace: probar que la copia funciona

Una copia de seguridad que nunca se ha probado no es una garantía, es una esperanza.

Al menos una vez cada tres o cuatro meses:

1. Descarga la última copia desde tu almacenamiento externo.
2. Restáurala en un entorno de prueba, separado de tu web real.
3. Conecta una copia de tu web a esos datos.
4. Revisa que la información esté completa y se vea bien, sin errores ni caracteres extraños.

Si todo funciona, sabes que puedes recuperarte. Si algo falla, lo descubres con calma y no en medio de una emergencia.

Respaldar es una parte de cuidar tu web; la otra es protegerla. En [cómo proteger tu web del spam y los ataques de fuerza bruta](/blog/spam-formularios-fuerza-bruta-proteger-web-pyme/) te explico cómo hacerlo. Y si quieres entender dónde vive cada parte de tu sitio, revisa [dominio, hosting y DNS explicados en simple](/blog/dominio-hosting-dns-explicados/).

## En resumen

GitHub guarda tu código y Railway mantiene tu web funcionando, pero ninguno de los dos reemplaza una copia de tu negocio guardada en otro lugar. Lo que de verdad importa respaldar son tus datos, los archivos de tus clientes y tus claves, siempre fuera del proveedor donde está tu web.

Con copias automáticas, guardadas en otro lugar y probadas de vez en cuando, puedes levantar tu web en otro proveedor si algo sale mal, sin perder lo que tanto te costó construir.

{% blogCta "¿Sabes si tu web podría recuperarse mañana?", "Reviso cómo está armado tu sitio, qué datos están en riesgo y dejo funcionando copias automáticas fuera de tu proveedor, para que una falla no se lleve tu negocio con ella." %}
