---
title: "Actualizar muchos precios a la vez, sin errores"
description: "Cómo cambiar precios o stock de cientos de productos sin editar uno por uno: el código SKU como llave, un archivo de respaldo, cambios en planilla y una importación de prueba."
date: 2026-11-06T23:59:57Z
tags: administracion-ecommerce
categoryName: Administración & E-Commerce
---

Cuando una tienda crece de unas decenas de productos a cientos, editar cada ficha a mano deja de ser práctico. Si tu proveedor sube sus costos, o quieres una promoción para toda una categoría, pasar uno por uno puede tomar semanas y aumentar los errores.

La solución es trabajar con archivos ordenados y cambios en lote. Así una sola planilla puede actualizar muchos productos, siempre que se haga con cuidado.

## Usa el SKU como llave

Para actualizar muchos productos, la plataforma necesita saber exactamente cuál es cada uno. Esa llave no es el nombre, porque el nombre puede cambiar. Es el **SKU**, un código único por producto o variante.

Si en tu planilla cambias el nombre de «Polera algodón básica» a «Polera 100 % algodón básica», pero el SKU sigue igual, la plataforma sabrá que es el mismo producto. En cambio, si cambias el SKU, podría crear un producto duplicado.

Piensa en el SKU como el RUT de cada producto: no cambia, aunque cambie todo lo demás.

## Cuatro pasos para hacerlo bien

<figure>
<svg viewBox="0 0 480 420" width="440" role="img" aria-labelledby="proceso-title proceso-desc" fill="none" stroke="currentColor" stroke-width="1.5">
<title id="proceso-title">Proceso en cuatro pasos para actualizar precios en lote</title>
<desc id="proceso-desc">Paso 1: copia de respaldo de la tienda. Paso 2: exportar a un archivo solo con SKU, nombre, precios y stock. Paso 3: cambiar los precios en la planilla y pegar los valores. Paso 4: probar la importación con pocos productos y luego importar todo marcando la opción de actualizar productos existentes.</desc>
<line x1="50" y1="76" x2="50" y2="127"/>
<polygon points="50,138 44,126 56,126" fill="currentColor" stroke="none"/>
<line x1="50" y1="176" x2="50" y2="227"/>
<polygon points="50,238 44,226 56,226" fill="currentColor" stroke="none"/>
<line x1="50" y1="276" x2="50" y2="327"/>
<polygon points="50,338 44,326 56,326" fill="currentColor" stroke="none"/>
<rect x="90" y="20" width="330" height="76" rx="10" fill="currentColor" fill-opacity="0.04"/>
<circle cx="50" cy="58" r="18" fill="#3368A0" stroke="none"/>
<text x="50" y="64" font-size="18" text-anchor="middle" fill="#FFFFFF" stroke="none">1</text>
<text x="110" y="52" font-size="19" font-weight="700" fill="currentColor" stroke="none">Respaldo previo</text>
<text x="110" y="80" font-size="17" fill="currentColor" stroke="none">Copia antes de empezar</text>
<rect x="90" y="120" width="330" height="76" rx="10" fill="currentColor" fill-opacity="0.04"/>
<circle cx="50" cy="158" r="18" fill="#3368A0" stroke="none"/>
<text x="50" y="164" font-size="18" text-anchor="middle" fill="#FFFFFF" stroke="none">2</text>
<text x="110" y="152" font-size="19" font-weight="700" fill="currentColor" stroke="none">Exportar lo necesario</text>
<text x="110" y="180" font-size="17" fill="currentColor" stroke="none">SKU, nombre, precios y stock</text>
<rect x="90" y="220" width="330" height="76" rx="10" fill="currentColor" fill-opacity="0.04"/>
<circle cx="50" cy="258" r="18" fill="#3368A0" stroke="none"/>
<text x="50" y="264" font-size="18" text-anchor="middle" fill="#FFFFFF" stroke="none">3</text>
<text x="110" y="252" font-size="19" font-weight="700" fill="currentColor" stroke="none">Cambiar en la planilla</text>
<text x="110" y="280" font-size="17" fill="currentColor" stroke="none">Aplica el cambio y pega como valores</text>
<rect x="90" y="320" width="330" height="76" rx="10" fill="currentColor" fill-opacity="0.14" stroke-width="2.5"/>
<circle cx="50" cy="358" r="18" fill="#3368A0" stroke="none"/>
<text x="50" y="364" font-size="18" text-anchor="middle" fill="#FFFFFF" stroke="none">4</text>
<text x="110" y="352" font-size="19" font-weight="700" fill="currentColor" stroke="none">Probar y luego importar</text>
<text x="110" y="380" font-size="17" fill="currentColor" stroke="none">Primero con pocos productos</text>
</svg>
<figcaption><p>Cuatro pasos para cambiar muchos productos: respaldo, exportación, cambio en planilla e importación de prueba antes del archivo completo.</p></figcaption>
</figure>

**1. Haz una copia de respaldo.** Antes de subir cualquier archivo, guarda una copia reciente de tu tienda. Si una fórmula sale mal y deja productos con precio cero, así puedes volver atrás en minutos. Si necesitas ayuda para armar esos respaldos, en [copias de seguridad de tu web con GitHub y Railway](/blog/copias-de-seguridad-web-github-railway/) lo explicamos.

**2. Exporta solo lo necesario.** No descargues la ficha completa si solo vas a cambiar precios. Deja en el archivo el SKU, el nombre como referencia, el precio normal, el precio de oferta y el stock.

**3. Cambia los valores en tu planilla.** Por ejemplo, para subir una categoría un 7 %, multiplica el precio por 1,07 y redondea al precio que uses en tu tienda. Después, pega los valores encima de las fórmulas para dejar solo los números definitivos. Guarda el archivo en UTF-8 para que las tildes no se dañen.

**4. Prueba antes de importar todo.** Importa primero tres o cinco productos y revisa la tienda. Si todo calza, importa el archivo completo. Marca la opción de actualizar productos existentes, para que no se creen duplicados.

## Cuando basta con editar en el panel

Si el cambio no necesita cálculos, puedes usar la edición en lote del panel de tu plataforma. Filtra por categoría, selecciona los productos y cambia en un solo paso el estado de stock, la etiqueta de una promoción o la clase de envío.

## En resumen

Actualizar muchos productos es posible sin tanto riesgo si usas el SKU como llave, haces un respaldo, cambias solo lo necesario y pruebas antes de importar. Así una actualización de precios toma minutos y no días.

Si todavía no tienes un catálogo ordenado, revisa primero [errores comunes en el catálogo de tu tienda online](/blog/errores-catalogo-ecommerce/). Y para que el stock se mantenga correcto después de cada cambio, en [sincronizar stock entre tu tienda y tu bodega](/blog/sincronizar-stock-tienda-bodega/) explicamos cómo mantenerlo al día.

{% blogCta "¿Cambiar precios de tu catálogo te toma demasiado tiempo?", "Te ayudamos a preparar tu archivo de productos, hacer el respaldo y actualizar precios y stock con pruebas antes de publicar.", "Conoce cómo trabajo", "/como-trabajo/" %}
