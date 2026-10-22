/* Botón "Atrás" del artículo: vuelve a la pestaña (y página) del blog desde la que se llegó.
   data-blog-back lista las URL de las pestañas (content/_data/blogTabs.json).
   Sin JavaScript, o si se llegó desde fuera de una pestaña, el enlace apunta a la pestaña de la categoría del artículo. */
(function () {
  "use strict";

  var link = document.querySelector("[data-blog-back]");
  if (!link || !document.referrer) return;

  var tabs = link.getAttribute("data-blog-back").split(" ").filter(Boolean);

  function isListing(pathname) {
    return tabs.some(function (tab) {
      if (pathname === tab) return true;
      var rest = pathname.indexOf(tab) === 0 ? pathname.slice(tab.length) : "";
      return /^pagina\/\d+\/$/.test(rest);
    });
  }

  try {
    var from = new URL(document.referrer);
    if (from.origin === window.location.origin && isListing(from.pathname)) {
      link.href = from.pathname;
    }
  } catch (error) {
    /* Referrer inválido: se mantiene el enlace a la categoría. */
  }
})();
