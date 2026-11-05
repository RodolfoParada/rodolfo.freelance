/* Componente <info-popover> — texto informativo que aparece al pasar el mouse sobre el botón
   o al enfocarlo con el teclado. Reutilizable en cualquier formulario.
   Atributos: label (texto del botón) y text (contenido del popover). */

(function () {
  "use strict";

  var counter = 0;

  function render(host) {
    var k = window.RFKIT;
    counter += 1;
    var panelId = "info-popover-" + counter;

    var wrap = k.el("span", "info-popover");
    var trigger = k.el("button", "info-popover__trigger", k.attr(host, "label", "Más información"));
    trigger.type = "button";
    trigger.setAttribute("aria-describedby", panelId);

    var panel = k.el("span", "info-popover__panel", k.attr(host, "text", ""));
    panel.id = panelId;
    panel.setAttribute("role", "tooltip");

    wrap.appendChild(trigger);
    wrap.appendChild(panel);
    host.replaceChildren(wrap);
  }

  window.RFKIT.define("info-popover", render);
})();
