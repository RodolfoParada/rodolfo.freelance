---
title: "Spam en formularios y ataques de fuerza bruta: cómo proteger la web de tu pyme"
description: "Los bots atacan cualquier formulario o login desprotegido, no solo WordPress. Te explico cómo funcionan estos ataques y cómo frenarlos sin complicar a tus clientes."
date: 2026-10-21T18:00:00Z
tags: desarrollo
categoryName: Desarrollo WEB
---

Muchas personas creen que los ataques informáticos solo le pasan a las webs hechas en WordPress o a las grandes empresas. Y quienes tienen una plataforma a medida, por ejemplo con React en la parte visible y Node.js o Java por detrás, suelen pensar que están a salvo porque no usan plugins.

Lamentablemente, no es así. Los atacantes casi nunca eligen una empresa en particular. Usan programas automáticos, llamados bots, que recorren internet buscando cualquier formulario sin protección o cualquier página de inicio de sesión a la que puedan entrar.

Para una pyme, ser blanco de estos ataques no siempre significa que le roben la base de datos. Lo más común es algo más cotidiano, pero igual de molesto: el correo lleno de basura, la web caída por exceso de visitas falsas o una cuenta más alta de lo normal en servicios como Railway, AWS o Render.

En este artículo te explico cómo funcionan los dos ataques más frecuentes y qué medidas simples puedes aplicar para frenarlos, sin llenar tu web de obstáculos para tus clientes. Al final de cada medida encontrarás un ejemplo de código, por si quieres compartirlo con la persona que desarrolla tu sitio.

## Spam masivo en formularios

### Cómo funciona

Los bots revisan el código de las páginas web buscando formularios o direcciones internas a las que la web envía datos, por ejemplo `/api/contacto` o `/api/cotizaciones`. Esto pasa también en aplicaciones hechas con React.

Cuando encuentran una, empiezan a enviar cientos o miles de mensajes automáticos con enlaces sospechosos, publicidad o intentos de estafa.

### Cómo afecta a tu negocio

- **Tu correo se llena de basura.** Tu equipo pierde tiempo separando los mensajes reales de los falsos, y un cliente de verdad puede quedar perdido entre ellos.
- **Pagas más por tus envíos de correo.** Si tu web manda un correo de confirmación cada vez que alguien llena el formulario, usando servicios como Resend, SendGrid o Amazon SES, un ataque puede gastar tu cuota del mes en minutos.
- **Tu dominio puede terminar marcado como spam.** Si tu web envía respuestas automáticas a direcciones falsas o a personas que nunca te escribieron, muchos de esos correos rebotan o son reportados. Gmail y Outlook pueden empezar a tratar los correos de tu empresa como spam, incluidas tus cotizaciones.

## Ataques de fuerza bruta y contraseñas filtradas

### Cómo funcionan

Si tu plataforma tiene un panel de administración o una sección para clientes con usuario y contraseña, los bots intentan entrar probando combinaciones de forma masiva. Hay dos variantes:

- **Fuerza bruta:** prueban miles de contraseñas comunes, como admin123 o empresa2024, contra usuarios conocidos.
- **Contraseñas filtradas** (en inglés, *credential stuffing*): usan listas de correos y contraseñas robadas de otros sitios hackeados, apostando a que alguien de tu equipo usa la misma clave en tu plataforma.

### Cómo afecta a tu negocio

Además del riesgo de que alguien entre, hay un efecto que pocos conocen: tu web puede volverse lenta o caerse.

Para revisar si una contraseña es correcta, el servidor usa procesos de seguridad pensados para ser lentos, como bcrypt o Argon2, y así dificultar el robo de claves. Si llegan miles de intentos seguidos, el servidor se dedica solo a eso, y tus clientes reales encuentran una web que no responde.

## Cómo protegerte: cuatro capas simples

Protegerte no requiere contratar herramientas de seguridad costosas ni poner pruebas imposibles a tus clientes. La idea es sumar filtros, uno sobre otro.

### 1. Un campo trampa en el formulario

Es una de las soluciones más limpias, porque frena a una gran parte de los bots simples sin que tus clientes noten nada.

**Cómo funciona:** se agrega al formulario un campo oculto que las personas no ven. Los bots, en cambio, suelen llenar todos los campos que encuentran. Si ese campo llega con algo escrito, sabes que lo envió un bot. En inglés se le llama *honeypot*, o «tarro de miel».

En React, el campo se oculta con una clase CSS y se deja fuera de la navegación con teclado y de los lectores de pantalla:

```jsx
// En tu formulario de React
<div className="form-trap" aria-hidden="true">
  <input
    type="text"
    name="website_url_check"
    tabIndex={-1}
    autoComplete="off"
    value={honeypot}
    onChange={(e) => setHoneypot(e.target.value)}
  />
</div>
```

```css
/* Fuera de la vista, pero presente en el código para que el bot lo encuentre */
.form-trap {
  position: absolute;
  left: -9999px;
}
```

En el servidor, si el campo trae algo, se descarta el mensaje. Se responde como si todo hubiera salido bien, para que el bot no pruebe otra forma de entrar:

```js
// En tu controlador de Node.js
if (req.body.website_url_check) {
  // Es un bot: respuesta de éxito falsa y el mensaje se descarta
  return res.status(200).json({ success: true });
}
```

### 2. Un límite de envíos por persona

Ninguna persona real envía 50 cotizaciones o prueba 30 contraseñas en 10 segundos. Por eso conviene poner un límite de solicitudes por dirección IP (en inglés, *rate limiting*).

En Node.js con Express se puede usar la librería `express-rate-limit`:

```js
const rateLimit = require("express-rate-limit");

// Railway, Render y similares pasan las visitas por un proxy:
// sin esta línea, todas parecen venir de la misma IP.
app.set("trust proxy", 1);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
  limit: 5, // Máximo 5 envíos por IP
  message: { error: "Enviaste demasiadas solicitudes. Intenta más tarde." },
  standardHeaders: true,
  legacyHeaders: false
});

app.post("/api/contacto", contactLimiter, contactController);
```

En Java con Spring Boot se puede lograr lo mismo con librerías como Bucket4j o con reglas en el API Gateway.

Para el inicio de sesión, conviene además limitar los intentos por cuenta, por ejemplo cinco intentos fallidos y un bloqueo de unos minutos. Así te proteges aunque el ataque venga desde muchas IP distintas. Y si puedes, activa la verificación en dos pasos para tu equipo: aunque alguien tenga la contraseña, no podrá entrar.

### 3. Revisar todo lo que llega al servidor

Nunca des por hecho que los datos que llegan desde tu web son correctos. Las validaciones del navegador ayudan a tus clientes, pero cualquiera puede saltárselas y enviar datos directamente al servidor.

- **En Node.js:** herramientas como Zod o Joi permiten revisar que cada campo tenga el tipo y el largo correctos, y rechazar lo que no corresponde.
- **En Java:** las anotaciones de Bean Validation, como `@NotBlank`, `@Size(min = 20, max = 1500)` o `@Email`, hacen la misma revisión antes de procesar cualquier dato.

### 4. Una verificación invisible, solo si el spam sigue

Si a pesar de todo siguen llegando mensajes falsos, el siguiente paso es una verificación automática. En vez de los clásicos «selecciona todos los semáforos», que frustran a cualquiera, hay opciones como Cloudflare Turnstile o Google reCAPTCHA v3.

Estas herramientas analizan en segundo plano cómo se usa la página y le entregan al servidor una señal que indica si quien escribe es una persona. La mayoría de las veces el cliente no tiene que hacer nada. Lo importante es que el servidor confirme esa señal con Cloudflare o Google antes de aceptar el mensaje.

## Resumen: qué ataque, qué síntoma y qué hacer

**Spam en formularios de contacto o cotización**

- **Síntoma:** mensajes en inglés o con enlaces extraños.
- **Solución:** campo trampa en el formulario y revisión en el servidor.
- **Efecto en tus clientes:** ninguno, no notan nada.

**Ataques constantes a tu web**

- **Síntoma:** servidor lento o una cuenta de la nube más alta de lo normal.
- **Solución:** límite de solicitudes por IP.
- **Efecto en tus clientes:** ninguno, solo se bloquea a quien abusa.

**Fuerza bruta en el panel o el inicio de sesión**

- **Síntoma:** muchos intentos de ingreso fallidos en los registros.
- **Solución:** límite de intentos por cuenta, bloqueo temporal y verificación en dos pasos.
- **Efecto en tus clientes:** mínimo.

**Bots más avanzados que cambian de IP**

- **Síntoma:** spam que sigue llegando a pesar del límite por IP.
- **Solución:** Cloudflare Turnstile en el formulario.
- **Efecto en tus clientes:** mínimo, la verificación casi siempre es invisible.

## En resumen

Tener una plataforma a medida, hecha con React, Node.js o Java, te da más control, mejor rendimiento y más estabilidad. Protegerla de los ataques más comunes no requiere obsesionarse con la seguridad ni llenar la web de obstáculos. Con un límite de envíos razonable, un campo trampa invisible y una buena revisión en el servidor, mantienes tu correo limpio, tu web funcionando y tus costos bajo control.

{% blogCta "¿Tu formulario recibe más spam que clientes?", "Reviso cómo está protegida tu web y aplico estas defensas sin que tus clientes noten la diferencia: menos basura en tu correo, una web más estable y una cuenta de servidor bajo control." %}
