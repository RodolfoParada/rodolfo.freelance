/* Banner de cookies: el visitante acepta o rechaza la medición (Google Analytics, Microsoft Clarity).
   La elección se guarda en sessionStorage (rf-cookies: "granted" | "denied"): dura mientras
   la pestaña esté abierta, así que al cerrar y volver a entrar el banner aparece de nuevo.
   Sin elección no se instala ninguna cookie de medición (ver gtm.js y clarity.js).
   Se construye con DOM (sin innerHTML) para cumplir Trusted Types. */
(function () {
  "use strict";

  var KEY = "rf-cookies";
  var GRANTED = "granted";
  var DENIED = "denied";

  var banner = null;

  function read() {
    try {
      return window.sessionStorage.getItem(KEY);
    } catch (error) {
      return null;
    }
  }

  function write(value) {
    try {
      window.sessionStorage.setItem(KEY, value);
    } catch (error) {
      /* almacenamiento no disponible: la elección solo dura esta página */
    }
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function updateConsent(value) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: value === GRANTED ? "granted" : "denied"
      });
    }
    /* Avisa a GTM para que las etiquetas que esperan consentimiento se disparen sin recargar la página. */
    if (value === GRANTED && window.dataLayer) {
      window.dataLayer.push({ event: "rf_consent_granted" });
    }
    document.dispatchEvent(new CustomEvent("rf-consent", { detail: value }));
  }

  function hide() {
    if (banner) banner.hidden = true;
  }

  function choose(value) {
    var previous = read();
    write(value);
    updateConsent(value);
    hide();
    /* Clarity no se puede descargar en caliente: al revocar, se recarga la página. */
    if (previous === GRANTED && value === DENIED) window.location.reload();
  }

  function buildBanner() {
    banner = el("section", "cookie-banner");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.hidden = true;

    var text = el("p", "cookie-banner__text", "Usamos cookies de medición (Google Analytics, Microsoft Clarity y Google Tag Manager) para entender cómo se usa el sitio. Solo se instalan si las aceptas. Más información en la ");
    var link = el("a", null, "Política de privacidad");
    link.href = "/privacidad.html";
    text.appendChild(link);
    text.appendChild(document.createTextNode("."));

    var actions = el("div", "cookie-banner__actions");
    var reject = el("button", "btn btn--ghost", "Rechazar");
    reject.type = "button";
    reject.addEventListener("click", function () { choose(DENIED); });
    var accept = el("button", "btn btn--primary", "Aceptar");
    accept.type = "button";
    accept.addEventListener("click", function () { choose(GRANTED); });
    actions.appendChild(reject);
    actions.appendChild(accept);

    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  function show() {
    if (!banner) buildBanner();
    banner.hidden = false;
  }

  /* Enlace «Configurar cookies» del footer: vuelve a mostrar el banner en cualquier momento. */
  document.addEventListener("click", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest('a[href="#cookies"]') : null;
    if (!link) return;
    event.preventDefault();
    show();
  });

  function init() {
    if (read() === null) show();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
