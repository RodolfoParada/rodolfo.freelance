/* Carrusel de tarjetas (Cómo trabajo y la sección Servicios de la portada).
   El desplazamiento es CSS (scroll-snap): funciona con el dedo, la rueda del mouse y el teclado.
   Este script solo mueve el carrusel con los botones ← → y los oculta en los extremos.
   Se inicia en DOMContentLoaded (después de que los Web Components y main.js pintan las tarjetas)
   y se actualiza si el contenido del carrusel cambia. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setup(carousel) {
    if (carousel.dataset.carouselReady === "true") return;
    var track = carousel.querySelector(".svc-carousel__track");
    var prev = carousel.querySelector("[data-carousel-prev]");
    var next = carousel.querySelector("[data-carousel-next]");
    if (!track || !prev || !next) return;
    carousel.dataset.carouselReady = "true";

    function step() {
      var card = track.firstElementChild;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    }

    function update() {
      /* Margen de unos píxeles: el ajuste del scroll-snap puede dejar el carrusel apenas desplazado. */
      var max = track.scrollWidth - track.clientWidth - 8;
      prev.disabled = track.scrollLeft <= 8;
      next.disabled = track.scrollLeft >= max;
    }

    function move(direction) {
      track.scrollBy({ left: direction * step(), behavior: reduceMotion ? "auto" : "smooth" });
    }

    prev.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    if ("MutationObserver" in window) {
      new MutationObserver(update).observe(track, { childList: true });
    }
    update();
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-carousel]"), setup);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
