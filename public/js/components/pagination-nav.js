/* Componente <pagination-nav> — paginación reutilizable.
   Atributos:
   - current: página actual (por defecto 1)
   - total: número total de páginas (por defecto 1)
   - base: inicio de cada enlace; se le añade el número de página (por defecto "?page=")
   - label: nombre accesible de la navegación (por defecto "Paginación") */

(function () {
  "use strict";

  function toPositiveInt(value, fallback) {
    var n = parseInt(value, 10);
    return isFinite(n) && n > 0 ? n : fallback;
  }

  /* Páginas a mostrar: primera, última y vecinas de la actual; el resto se resume con "…". */
  function visiblePages(current, total) {
    var pages = [];
    for (var p = 1; p <= total; p += 1) {
      if (p === 1 || p === total || Math.abs(p - current) <= 1) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== null) {
        pages.push(null);
      }
    }
    return pages;
  }

  window.RFKIT.define("pagination-nav", function (host) {
    var k = window.RFKIT;
    var total = toPositiveInt(k.attr(host, "total", "1"), 1);
    var current = Math.min(toPositiveInt(k.attr(host, "current", "1"), 1), total);
    var base = k.attr(host, "base", "?page=");

    var nav = k.el("nav", "pagination");
    nav.setAttribute("aria-label", k.attr(host, "label", "Paginación"));

    var list = k.el("ul", "pagination__list");

    function addLink(label, page, accessibleName) {
      var item = k.el("li", "pagination__item");
      var isDisabled = page < 1 || page > total || page === current;
      var link = k.el("a", "pagination__link", label);
      if (accessibleName) link.setAttribute("aria-label", accessibleName);
      if (page === current) {
        link.setAttribute("aria-current", "page");
      }
      if (isDisabled && page !== current) {
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("tabindex", "-1");
        link.classList.add("pagination__link--disabled");
      } else {
        link.href = base + page;
      }
      item.appendChild(link);
      list.appendChild(item);
    }

    addLink("Anterior", current - 1, "Página anterior");

    visiblePages(current, total).forEach(function (page) {
      if (page === null) {
        var gap = k.el("li", "pagination__item pagination__ellipsis", "…");
        gap.setAttribute("aria-hidden", "true");
        list.appendChild(gap);
      } else {
        addLink(String(page), page, "Página " + page);
      }
    });

    addLink("Siguiente", current + 1, "Página siguiente");

    nav.appendChild(list);
    host.replaceChildren(nav);
  });
})();
