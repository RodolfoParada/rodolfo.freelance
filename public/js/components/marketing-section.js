/* Componente <marketing-section> — grilla de servicios de marketing.
   Fuente de datos: "marketing" (js/data.js). Atributos opcionales:
   section-id, eyebrow, title, lead, source. */

(function () {
  "use strict";

  window.RFKIT.define("marketing-section", function (host) {
    window.RFKIT.renderCardsSection(host, {
      id: "marketing",
      eyebrow: "Estrategia",
      title: "Marketing",
      lead: "Estrategias medibles para atraer, convertir y retener clientes.",
      source: "marketing",
      alt: true
    });
  });
})();
