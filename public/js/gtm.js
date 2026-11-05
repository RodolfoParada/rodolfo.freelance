/* Google Tag Manager (GTM-WLCDS32G).
   Fragmento oficial en archivo externo para cumplir la CSP (sin scripts en línea).
   Consent Mode v2: antes de cargar GTM, el consentimiento de analítica está denegado.
   Si el visitante ya aceptó en esta sesión (rf-cookies = "granted"), se concede al instante. */
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  function gtag() { w[l].push(arguments); }
  w.gtag = w.gtag || gtag;
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
  try {
    if (w.sessionStorage.getItem("rf-cookies") === "granted") {
      gtag("consent", "update", { analytics_storage: "granted" });
    }
  } catch (error) {
    /* almacenamiento no disponible: se mantiene denegado */
  }
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-WLCDS32G');
