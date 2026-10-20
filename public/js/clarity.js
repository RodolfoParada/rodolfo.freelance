/* Microsoft Clarity (mapas de calor y grabaciones de sesiones).
   Fragmento oficial en archivo externo para cumplir la CSP (sin scripts en línea).
   Trusted Types: la política "default" solo acepta URLs de clarity.ms. */
(function () {
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy("default", {
      createScriptURL: function (url) {
        if (/^https:\/\/([a-z0-9-]+\.)?clarity\.ms\//.test(url)) return url;
        throw new TypeError("URL de script no permitida");
      }
    });
  }
})();

(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "ywukiqkuzd");
