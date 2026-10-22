/* Pestañas del blog: precarga la página y la imagen de portada de cada pestaña para que el cambio sea inmediato.
   - Imágenes: se precargan todas en segundo plano cuando el navegador está libre (salvo modo de ahorro de datos).
   - Páginas: se precarga la de una pestaña cuando el visitante pasa el mouse, la enfoca o la toca.
   Las pestañas llevan la imagen en data-prefetch-image (content/_data/blogTabs.json). */
(function () {
  "use strict";

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".blog-tab[href]"));
  if (!tabs.length) return;

  var connection = navigator.connection || {};
  var saveData = connection.saveData === true || /2g/.test(connection.effectiveType || "");
  var done = {};

  function prefetch(url, as) {
    if (!url || done[url]) return;
    done[url] = true;
    var link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    if (as) link.as = as;
    document.head.appendChild(link);
  }

  tabs.forEach(function (tab) {
    if (tab.getAttribute("aria-current") === "page") return;
    var warm = function () {
      prefetch(tab.getAttribute("href"), "document");
      prefetch(tab.getAttribute("data-prefetch-image"), "image");
    };
    tab.addEventListener("pointerenter", warm, { once: true });
    tab.addEventListener("focus", warm, { once: true });
    tab.addEventListener("touchstart", warm, { once: true, passive: true });
  });

  if (saveData) return;

  var idle = window.requestIdleCallback || function (fn) { return window.setTimeout(fn, 1500); };
  window.addEventListener("load", function () {
    idle(function () {
      tabs.forEach(function (tab) {
        prefetch(tab.getAttribute("data-prefetch-image"), "image");
      });
    });
  });
})();
