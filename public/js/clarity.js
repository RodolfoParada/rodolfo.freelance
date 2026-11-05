/* Microsoft Clarity (mapas de calor y grabaciones de sesiones).
   Solo se carga cuando el visitante acepta las cookies (ver consent.js).
   Fragmento oficial en archivo externo para cumplir la CSP (sin scripts en línea).
   La política Trusted Types está en trusted-types.js. */
(function () {
  "use strict";

  var loaded = false;

  function load() {
    if (loaded) return;
    loaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "ywukiqkuzd");
  }

  function consented() {
    try {
      return window.sessionStorage.getItem("rf-cookies") === "granted";
    } catch (error) {
      return false;
    }
  }

  document.addEventListener("rf-consent", function (event) {
    if (event.detail === "granted") load();
  });

  if (consented()) load();
})();
