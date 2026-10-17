/* Componente <cta-banner> — bloque CTA reutilizable.
   Atributos opcionales:
   - title
   - text
   - primary-text
   - primary-href
   - secondary-text (usar "none" para ocultar el botón secundario)
   - secondary-href
   - note (usar "none" para ocultar la leyenda inferior) */

(function () {
  "use strict";

  var DEFAULTS = {
    title: "¿Hablamos de lo que tu negocio necesita para crecer?",
    text: "Cuéntame en qué etapa está tu proyecto. Analizamos juntos una solución técnica y práctica, con presupuesto claro y sin sorpresas.",
    primaryText: "Completar formulario de cotización →",
    primaryHref: "#contacto",
    secondaryText: "Escríbeme por correo",
    secondaryHref: "mailto:desarrollador.freelance7@gmail.com",
    note: "Respuesta en menos de 24 horas hábiles · Atención 100% remota para todo Chile"
  };

  function render(host) {
    var k = window.RFKIT;
    var title = k.attr(host, "title", DEFAULTS.title);
    var text = k.attr(host, "text", DEFAULTS.text);
    var primaryText = k.attr(host, "primary-text", DEFAULTS.primaryText);
    var primaryHref = k.attr(host, "primary-href", DEFAULTS.primaryHref);
    var secondaryText = k.attr(host, "secondary-text", DEFAULTS.secondaryText);
    var secondaryHref = k.attr(host, "secondary-href", DEFAULTS.secondaryHref);
    var note = k.attr(host, "note", DEFAULTS.note);

    var cta = k.el("div", "about-cta");
    cta.appendChild(k.el("h2", "about-cta__title", title));
    cta.appendChild(k.el("p", "about-cta__text", text));

    var actions = k.el("div", "about-cta__actions");
    var primary = k.el("a", "btn btn--primary", primaryText);
    primary.href = primaryHref;
    actions.appendChild(primary);

    if (secondaryText && secondaryText !== "none") {
      var secondary = k.el("a", "btn btn--ghost", secondaryText);
      secondary.href = secondaryHref;
      actions.appendChild(secondary);
    }

    cta.appendChild(actions);

    if (note && note !== "none") {
      cta.appendChild(k.el("p", "about-cta__note", note));
    }

    host.replaceChildren(cta);
  }

  window.RFKIT.define("cta-banner", render);
})();
