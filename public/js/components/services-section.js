/* Componente <services-section> — grilla de servicios de desarrollo y marketing.
   Fuentes de datos: "desarrollo" y "marketing" (js/data.js). */

(function () {
  "use strict";

  /* Envuelve una grilla en el carrusel compartido (css: .svc-carousel; js: svc-carousel.js). */
  function carousel(k, track) {
    var wrapper = k.el("div", "svc-carousel");
    wrapper.setAttribute("data-carousel", "");
    var viewport = k.el("div", "svc-carousel__viewport");
    [["prev", "Servicio anterior", "←"], ["next", "Servicio siguiente", "→"]].forEach(function (cfg) {
      var button = k.el("button", "svc-carousel__btn svc-carousel__btn--" + cfg[0]);
      button.type = "button";
      button.setAttribute("data-carousel-" + cfg[0], "");
      button.setAttribute("aria-controls", track.id);
      button.setAttribute("aria-label", cfg[1]);
      var icon = k.el("span", "", cfg[2]);
      icon.setAttribute("aria-hidden", "true");
      button.appendChild(icon);
      viewport.appendChild(button);
    });
    viewport.appendChild(track);
    wrapper.appendChild(viewport);
    return wrapper;
  }

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
    var devGrid = k.el("div", "grid svc-carousel__track");
    devGrid.setAttribute("data-cards", "desarrollo");
    devGrid.id = "carrusel-servicios-desarrollo";
    devGrid.setAttribute("role", "region");
    devGrid.setAttribute("aria-label", "Servicios de desarrollo");
    devGrid.tabIndex = 0;
    devBlock.appendChild(carousel(k, devGrid));

    var mktBlock = k.el("div", "block");
    mktBlock.appendChild(
      k.sectionHeader(
        "Estrategia",
        "Marketing",
        "Estrategias medibles para atraer, convertir y retener clientes."
      )
    );
    mktBlock.appendChild(
      k.el("p", "services-label", "Servicios de Asistente Virtual Freelance")
    );
    var mktGrid = k.el("div", "grid");
    mktGrid.setAttribute("data-cards", "marketing");
    mktBlock.appendChild(mktGrid);

    container.append(devBlock, mktBlock);
    section.appendChild(container);
    host.replaceChildren(section);
  });
})();
