/* Procesos de "Cómo trabajo": fila de botones en carrusel (svc-carousel.js) + un panel por proceso.
   Al presionar un botón se abre su proceso debajo y se cierra el que estaba abierto (uno a la vez).
   Sin JavaScript todos los procesos se ven abiertos; este script los cierra al cargar.
   Si se llega con un enlace del índice (#proceso-…), abre ese proceso. */
(function () {
  "use strict";

  var root = document.querySelector("[data-flows]");
  if (!root) return;

  var toggles = Array.prototype.slice.call(root.querySelectorAll(".svc-flow__toggle"));
  if (!toggles.length) return;

  function panelOf(toggle) {
    return document.getElementById(toggle.getAttribute("aria-controls"));
  }

  function setOpen(toggle, open) {
    var panel = panelOf(toggle);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("is-open", open);
    if (panel) panel.hidden = !open;
  }

  function show(toggle, open) {
    toggles.forEach(function (other) {
      setOpen(other, other === toggle ? open : false);
    });
    if (open) toggle.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function openById(id) {
    var toggle = id && root.querySelector('[aria-controls="' + id + '"]');
    if (!toggle) return;
    show(toggle, true);
    panelOf(toggle).scrollIntoView({ block: "start" });
  }

  toggles.forEach(function (toggle) {
    setOpen(toggle, false);
    toggle.addEventListener("click", function () {
      show(toggle, toggle.getAttribute("aria-expanded") !== "true");
    });
  });

  /* Los botones del índice abren el proceso aunque el enlace ya esté en la URL. */
  document.querySelectorAll('a[href^="#proceso-"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var id = link.getAttribute("href").slice(1);
      if (window.history.replaceState) window.history.replaceState(null, "", "#" + id);
      openById(id);
    });
  });

  openById(window.location.hash.slice(1));
  window.addEventListener("hashchange", function () {
    openById(window.location.hash.slice(1));
  });
})();
