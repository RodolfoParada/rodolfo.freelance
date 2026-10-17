/* Componente <services-section> — grilla de servicios de desarrollo y marketing.
   Fuentes de datos: "desarrollo" y "marketing" (js/data.js). */

(function () {
  "use strict";

  window.RFKIT.define("services-section", function (host) {
    var k = window.RFKIT;
    var id = k.attr(host, "section-id", "desarrollo");
    var section = k.sectionShell(id, "");
    var container = k.el("div", "container");

    var devBlock = k.el("div", "block");
    devBlock.appendChild(
      k.sectionHeader(
        k.attr(host, "eyebrow", "Servicios"),
        k.attr(host, "title", "Desarrollo"),
        k.attr(host, "lead", "Construyo productos digitales rápidos, seguros y mantenibles.")
      )
    );
    var devGrid = k.el("div", "grid");
    devGrid.setAttribute("data-cards", "desarrollo");
    devBlock.appendChild(devGrid);

    var mktBlock = k.el("div", "block");
    mktBlock.appendChild(
      k.sectionHeader(
        "Estrategia",
        "Marketing",
        "Estrategias medibles para atraer, convertir y retener clientes."
      )
    );
    var mktGrid = k.el("div", "grid");
    mktGrid.setAttribute("data-cards", "marketing");
    mktBlock.appendChild(mktGrid);

    container.append(devBlock, mktBlock);
    section.appendChild(container);
    host.replaceChildren(section);
  });
})();
