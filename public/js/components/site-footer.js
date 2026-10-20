/* Componente <site-footer> — pie de página. */

(function () {
  "use strict";

  var base =
    typeof window !== "undefined" &&
    window.location.pathname.indexOf("privacidad") !== -1
      ? "index.html"
      : typeof window !== "undefined" && window.location.pathname.indexOf("/blog/") !== -1
        ? "/index.html"
        : "";

  var TEMPLATE = `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__grid">
          <div class="site-footer__brand">
            <p class="site-footer__name">Rodolfo<span>-Freelance</span></p>
            <p class="site-footer__desc">
              Desarrollo web a medida, soluciones avanzadas en WordPress y asistencia virtual operativa.
              Impulsando la presencia digital de proyectos y marcas con alcance nacional.
            </p>
            <div class="site-footer__status">
              <span class="site-footer__status-dot" aria-hidden="true"></span>
              <span>Disponible para nuevos proyectos</span>
            </div>
          </div>

          <nav class="site-footer__col" aria-label="Explorar">
            <h3 class="site-footer__heading">EXPLORAR</h3>
            <ul class="site-footer__links">
              <li><a href="${base}#inicio">Inicio</a></li>
              <li><a href="${base}#acerca">Acerca de mí</a></li>
              <li><a href="${base}#desarrollo">Servicios</a></li>
              <li><a href="${base}#contacto">Contáctame</a></li>
            </ul>
          </nav>

          <div class="site-footer__col">
            <h3 class="site-footer__heading">CONTACTO &amp; COBERTURA</h3>
            <ul class="site-footer__contact">
              <li class="site-footer__contact-item">
                <span class="site-footer__contact-icon site-footer__contact-icon--flag" aria-hidden="true">
                  <svg viewBox="0 0 24 16" width="20" height="14" aria-hidden="true" focusable="false">
                    <rect width="24" height="8" fill="#ffffff" />
                    <rect y="8" width="24" height="8" fill="#d52b1e" />
                    <rect width="8" height="8" fill="#0039a6" />
                    <polygon points="4,1.8 4.65,3.6 6.55,3.6 5,4.7 5.6,6.5 4,5.4 2.4,6.5 3,4.7 1.45,3.6 3.35,3.6" fill="#ffffff" />
                  </svg>
                </span>
                <div class="site-footer__contact-body">
                  <strong class="site-footer__contact-title">Cobertura nacional</strong>
                  <span class="site-footer__contact-sub">Servicios 100% remotos para negocios de todo Chile</span>
                </div>
              </li>

              <li class="site-footer__contact-item">
                <span class="site-footer__contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div class="site-footer__contact-body">
                  <span class="site-footer__contact-sub">Correo electrónico</span>
                  <a class="site-footer__contact-mail" href="mailto:desarrollador.freelance7@gmail.com">desarrollador.freelance7@gmail.com</a>
                </div>
              </li>

              <li class="site-footer__contact-item">
                <span class="site-footer__contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div class="site-footer__contact-body">
                  <strong class="site-footer__contact-title">Atención Lun a Vie</strong>
                  <span class="site-footer__contact-sub">09:00 – 18:00 hrs · Respuesta &lt; 72h</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="site-footer__col">
            <h3 class="site-footer__heading">SÍGUEME</h3>
            <p class="site-footer__social-text">
              Novedades, casos de estudio y contenido digital en redes.
            </p>
            <a class="site-footer__social-btn" href="https://www.instagram.com/rodolfo.tech.soluciones/" target="_blank" rel="noopener noreferrer" aria-label="Sígueme en Instagram">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        <div class="site-footer__bottom">
          <p class="site-footer__copy">
            &copy; <span id="year">2026</span> Rodolfo-Freelance. Todos los derechos reservados.
          </p>

          <div class="site-footer__meta">
            <a class="site-footer__legal-link" href="privacidad.html">Política de privacidad</a>
            <span class="site-footer__meta-sep" aria-hidden="true">&middot;</span>
            <span class="site-footer__usability">
              <span class="site-footer__usability-dot" aria-hidden="true"></span>
              <span>Diseñado con foco en usabilidad</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  `;

  window.RFKIT.define("site-footer", function (host) {
    host.replaceChildren(window.RFKIT.fragment(TEMPLATE));
  });
})();
