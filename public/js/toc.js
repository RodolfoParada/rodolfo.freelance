/* Índice del artículo: lista los títulos H2 y marca la sección que se está leyendo. */
(function () {
  "use strict";

  var body = document.querySelector(".blog-post__body");
  var nav = document.querySelector(".blog-toc");
  var list = document.querySelector("[data-toc-list]");
  if (!body || !nav || !list) return;

  var headings = Array.prototype.slice.call(body.querySelectorAll("h2"));
  if (!headings.length) return;

  var links = {};
  headings.forEach(function (heading, index) {
    if (!heading.id) heading.id = "seccion-" + (index + 1);

    var item = document.createElement("li");
    var link = document.createElement("a");
    link.className = "blog-toc__link";
    link.href = "#" + heading.id;
    link.textContent = heading.textContent;
    item.appendChild(link);
    list.appendChild(item);
    links[heading.id] = link;
  });

  nav.hidden = false;

  if (!("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) {
          links[id].classList.toggle("is-active", id === entry.target.id);
        });
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });
})();
