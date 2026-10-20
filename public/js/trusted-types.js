/* Política "default" de Trusted Types: solo acepta scripts de los proveedores de medición
   (Google Tag Manager / Analytics y Microsoft Clarity). Debe cargarse antes que ellos.
   Un único archivo para toda la página: solo puede existir una política "default". */
(function () {
  if (!window.trustedTypes || !window.trustedTypes.createPolicy) return;
  var ALLOWED = /^https:\/\/([a-z0-9-]+\.)*(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|clarity\.ms)\//;
  window.trustedTypes.createPolicy("default", {
    createScriptURL: function (url) {
      if (ALLOWED.test(url)) return url;
      throw new TypeError("URL de script no permitida");
    }
  });
})();
