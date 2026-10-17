/* Componente <site-header> — barra de navegación principal. */

(function () {
  "use strict";

  var base =
    typeof window !== "undefined" &&
    window.location.pathname.indexOf("privacidad") !== -1
      ? "index.html"
      : "";

  var TEMPLATE = `
    <header class="site-header">
      <nav class="navbar" aria-label="Navegación principal">
        <a class="navbar__brand" href="${base}#inicio">Rodolfo<span>-Freelance</span></a>

        <ul class="navbar__menu" id="menu">
          <li><a class="navbar__link is-active" href="${base}#inicio">Inicio</a></li>
          <li><a class="navbar__link" href="${base}#acerca">Acerca de mí</a></li>
          <li><a class="navbar__link" href="${base}#desarrollo">Servicios</a></li>
          <li><a class="navbar__link navbar__link--cta" href="${base}#contacto">Contáctame</a></li>
        </ul>

        <div class="navbar__actions">
          <button class="theme-toggle" type="button" aria-label="Activar modo oscuro" aria-pressed="false">
            <svg class="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg class="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>

          <button class="navbar__toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú">
            <span class="navbar__toggle-bar"></span>
            <span class="navbar__toggle-bar"></span>
            <span class="navbar__toggle-bar"></span>
          </button>
        </div>
      </nav>
    </header>
  `;

  window.RFKIT.define("site-header", function (host) {
    host.appendChild(window.RFKIT.fragment(TEMPLATE));
  });
})();
