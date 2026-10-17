/* Componente <privacy-section> — sección de Política de Privacidad con índice lateral y acordeón.
   Atributos opcionales: section-id, eyebrow, title, lead. */

(function () {
  "use strict";

  var LAYOUT = `
    <div class="container legal">
      <div class="legal-layout" data-legal-accordion>
        <!-- Índice lateral -->
        <aside class="legal-nav" aria-label="Índice de Política de Privacidad">
          <p class="legal-nav__heading">CONTENIDO</p>
          <ol class="legal-nav__list">
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link is-active" data-legal-target="sec-1">
                <span class="legal-nav__num">1</span>
                <span class="legal-nav__label">Ámbito de Aplicación y Responsable</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-2">
                <span class="legal-nav__num">2</span>
                <span class="legal-nav__label">Datos Personales que Recopilamos</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-3">
                <span class="legal-nav__num">3</span>
                <span class="legal-nav__label">Finalidades y Bases de Licitud (Art. 12 y 13 de la Ley)</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-4">
                <span class="legal-nav__num">4</span>
                <span class="legal-nav__label">Confidencialidad y Terceros</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-5">
                <span class="legal-nav__num">5</span>
                <span class="legal-nav__label">Seguridad y Cookies Técnicas</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-6">
                <span class="legal-nav__num">6</span>
                <span class="legal-nav__label">Conservación de los Datos</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-7">
                <span class="legal-nav__num">7</span>
                <span class="legal-nav__label">Derechos del Titular y Procedimiento (Ley N° 21.719)</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-8">
                <span class="legal-nav__num">8</span>
                <span class="legal-nav__label">Modificaciones y Ley Aplicable</span>
              </button>
            </li>
          </ol>
        </aside>

        <!-- Acordeón principal -->
        <div class="legal-accordion">
          <!-- 1 -->
          <article class="legal-item is-open" id="sec-1" data-legal-item="sec-1">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="true" aria-controls="panel-sec-1">
                <span class="legal-item__badge">1</span>
                <span class="legal-item__title">Ámbito de Aplicación y Responsable</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-1" role="region">
              <div class="legal-item__body">
                <h3 class="legal-item__sub">1.1. IDENTIFICACIÓN DEL RESPONSABLE</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Titular y responsable del tratamiento: <strong>Rodolfo-Freelance</strong> (Ingeniería en Informática &amp; Marketing Digital).</li>
                  <li class="legal-item__bullet">Correo electrónico oficial: <a class="legal__link" href="mailto:desarrollador.freelance7@gmail.com">desarrollador.freelance7@gmail.com</a>.</li>
                  <li class="legal-item__bullet">Modalidad: Prestación remota de servicios de desarrollo de software y marketing desde Chile.</li>
                  <li class="legal-item__bullet">Versión de la política: v2.0 (Vigente desde: 17 de octubre de 2026).</li>
                </ul>

                <h3 class="legal-item__sub">1.2. ALCANCE</h3>
                <p class="legal-item__text">
                  La presente política regula el tratamiento de datos personales conforme a la Ley N° 19.628 y sus modificaciones introducidas por la Ley N° 21.719. Aplica a los datos recopilados mediante formularios de contacto, canales oficiales y en la relación precontractual o contractual con nuestros clientes.
                </p>
              </div>
            </div>
          </article>

          <!-- 2 -->
          <article class="legal-item" id="sec-2" data-legal-item="sec-2">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-2">
                <span class="legal-item__badge">2</span>
                <span class="legal-item__title">Datos Personales que Recopilamos</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-2" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">2.1. DATOS ENTREGADOS EN EL FORMULARIO</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Nombre completo:</strong> para dirigirnos a ti de forma personalizada.</li>
                  <li class="legal-item__bullet"><strong>Teléfono:</strong> para agilizar la coordinación si prefieres contacto directo.</li>
                  <li class="legal-item__bullet"><strong>Correo electrónico:</strong> para enviarte nuestra respuesta técnica o propuesta comercial formal.</li>
                  <li class="legal-item__bullet"><strong>Servicio de interés y detalles del proyecto:</strong> para elaborar un diagnóstico honesto y acorde a tus objetivos.</li>
                </ul>

                <h3 class="legal-item__sub">2.2. REFERENCIAS Y ARCHIVOS OPCIONALES</h3>
                <p class="legal-item__text">
                  En caso de adjuntar un documento o referencia visual en tu solicitud, la información contenida será utilizada únicamente como antecedente para dimensionar tu requerimiento.
                </p>
              </div>
            </div>
          </article>

          <!-- 3 -->
          <article class="legal-item" id="sec-3" data-legal-item="sec-3">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-3">
                <span class="legal-item__badge">3</span>
                <span class="legal-item__title">Finalidades y Bases de Licitud (Art. 12 y 13 de la Ley)</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-3" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">3.1. GESTIÓN PRECONTRACTUAL Y CONTRACTUAL (Art. 13, letra c)</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Tratamos nombre, correo, teléfono y detalles del proyecto con el propósito exclusivo de emitir cotizaciones, diagnósticos técnicos y coordinar propuestas comerciales a solicitud del titular (medidas precontractuales).</li>
                  <li class="legal-item__bullet">En caso de contratación, el tratamiento se funda en la ejecución del contrato y la gestión administrativa y de facturación correspondiente.</li>
                </ul>

                <h3 class="legal-item__sub">3.2. COMUNICACIONES COMERCIALES (Art. 12)</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">El envío de boletines informativos o novedades comerciales se basa única y exclusivamente en el consentimiento previo, libre e inequívoco otorgado mediante casilla de verificación afirmativa (opt-in). Este consentimiento puede ser revocado en cualquier momento de manera directa y gratuita.</li>
                </ul>

                <h3 class="legal-item__sub">3.3. ROL DE ENCARGADO DE TRATAMIENTO (Art. 15 bis)</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">En la prestación de servicios de asistente de marketing y desarrollo web que impliquen acceso a bases de datos de clientes, actuamos exclusivamente en calidad de encargado o mandatario, procesando información bajo las instrucciones estrictas y confidenciales del cliente responsable.</li>
                </ul>
              </div>
            </div>
          </article>

          <!-- 4 -->
          <article class="legal-item" id="sec-4" data-legal-item="sec-4">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-4">
                <span class="legal-item__badge">4</span>
                <span class="legal-item__title">Confidencialidad y Terceros</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-4" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">4.1. RESERVA PROFESIONAL</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Toda idea, modelo de negocio o información técnica compartida es tratada bajo estricta confidencialidad.</li>
                  <li class="legal-item__bullet">No vendemos, alquilamos ni cedemos bases de datos a terceros bajo ninguna circunstancia.</li>
                </ul>

                <h3 class="legal-item__sub">4.2. EXCEPCIONES LEGALES</h3>
                <p class="legal-item__text">
                  Únicamente se podrá revelar información cuando exista un requerimiento formal de una autoridad competente conforme a la legislación chilena vigente.
                </p>
              </div>
            </div>
          </article>

          <!-- 5 -->
          <article class="legal-item" id="sec-5" data-legal-item="sec-5">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-5">
                <span class="legal-item__badge">5</span>
                <span class="legal-item__title">Seguridad y Cookies Técnicas</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-5" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">5.1. MEDIDAS DE PROTECCIÓN</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Validación y sanitización de datos en cliente y servidor para prevenir inyecciones de código.</li>
                  <li class="legal-item__bullet">Tokens de seguridad contra falsificación de peticiones (CSRF) y cabeceras HTTP seguras (Helmet / CSP).</li>
                  <li class="legal-item__bullet">Limitación de tasa de solicitudes (Rate Limiting) y campos anti-bots (Honeypot).</li>
                </ul>

                <h3 class="legal-item__sub">5.2. COOKIES Y ALMACENAMIENTO LOCAL</h3>
                <p class="legal-item__text">
                  Este sitio utiliza exclusivamente cookies técnicas necesarias para validar la seguridad del formulario (<code>rf_csrf</code>) y almacenamiento local (<code>rf-theme</code>) para recordar tu preferencia de modo visual (claro u oscuro), sin rastreadores publicitarios invasivos.
                </p>
              </div>
            </div>
          </article>

          <!-- 6 -->
          <article class="legal-item" id="sec-6" data-legal-item="sec-6">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-6">
                <span class="legal-item__badge">6</span>
                <span class="legal-item__title">Conservación de los Datos</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-6" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">6.1. CRITERIOS DE CONSERVACIÓN</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Los datos de consultas se conservan durante el tiempo necesario para atender y dar seguimiento a tu solicitud.</li>
                  <li class="legal-item__bullet">En caso de concretar un proyecto, los antecedentes se mantienen mientras dure la relación profesional y los plazos legales aplicables.</li>
                  <li class="legal-item__bullet">Si solicitas la eliminación de tus datos, estos serán suprimidos de forma definitiva de nuestros registros de contacto.</li>
                </ul>
              </div>
            </div>
          </article>

          <!-- 7 -->
          <article class="legal-item" id="sec-7" data-legal-item="sec-7">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-7">
                <span class="legal-item__badge">7</span>
                <span class="legal-item__title">Derechos del Titular y Procedimiento (Ley N° 21.719)</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-7" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">7.1. DERECHOS RECONOCIDOS</h3>
                <p class="legal-item__text">
                  El titular de los datos podrá ejercer de forma gratuita los siguientes derechos:
                </p>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Acceso:</strong> Conocer si sus datos están siendo tratados, su origen y fines.</li>
                  <li class="legal-item__bullet"><strong>Rectificación:</strong> Solicitar la corrección o actualización de datos erróneos o incompletos.</li>
                  <li class="legal-item__bullet"><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios o retire su consentimiento.</li>
                  <li class="legal-item__bullet"><strong>Oposición:</strong> Oponerse al tratamiento para fines específicos (por ejemplo, marketing directo).</li>
                  <li class="legal-item__bullet"><strong>Bloqueo Temporal:</strong> Solicitar la suspensión cautelar del tratamiento mientras se tramita una solicitud de rectificación, oposición o supresión.</li>
                </ul>

                <h3 class="legal-item__sub">7.2. PROCEDIMIENTO Y PLAZOS DE RESPUESTA</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Para ejercer estos derechos, envíe una comunicación a <a class="legal__link" href="mailto:desarrollador.freelance7@gmail.com">desarrollador.freelance7@gmail.com</a> acreditando su identidad e indicando el requerimiento concreto y medio de contacto para la respuesta.</li>
                  <li class="legal-item__bullet">Se acusará recibo y se emitirá pronunciamiento fundado en un plazo máximo de 30 días corridos (prorrogables por 30 días adicionales en casos debidamente justificados). Para solicitudes de bloqueo temporal, el plazo de resolución será de 2 días hábiles.</li>
                </ul>

                <h3 class="legal-item__sub">7.3. TUTELA ANTE LA AUTORIDAD</h3>
                <p class="legal-item__text">
                  En caso de negativa injustificada, respuesta insatisfactoria o vencimiento del plazo legal sin respuesta, el titular tiene derecho a formular una reclamación administrativa ante la Agencia de Protección de Datos Personales dentro del plazo legal de 30 días hábiles.
                </p>
              </div>
            </div>
          </article>

          <!-- 8 -->
          <article class="legal-item" id="sec-8" data-legal-item="sec-8">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-8">
                <span class="legal-item__badge">8</span>
                <span class="legal-item__title">Modificaciones y Ley Aplicable</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-8" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">8.1. ACTUALIZACIONES DE LA POLÍTICA</h3>
                <p class="legal-item__text">
                  Rodolfo-Freelance se reserva el derecho de actualizar esta Política de Privacidad para adaptarla a cambios normativos o mejoras en el servicio. Toda modificación estará permanentemente publicada en esta página.
                </p>

                <h3 class="legal-item__sub">8.2. LEGISLACIÓN Y JURISDICCIÓN</h3>
                <p class="legal-item__text">
                  Esta Política se rige por las leyes de la República de Chile, en especial por la Ley N° 19.628 sobre Protección de la Vida Privada y sus modificaciones vigentes.
                </p>
              </div>
            </div>
          </article>

          <div class="legal__actions">
            <a class="btn btn--primary" href="index.html#contacto">Volver al formulario de contacto</a>
            <a class="btn btn--ghost" href="index.html">Ir al inicio</a>
          </div>
        </div>
      </div>
    </div>
  `;

  function render(host) {
    var k = window.RFKIT;
    var section = k.sectionShell(k.attr(host, "section-id", "privacidad"), "section--legal");

    var hero = k.el("header", "legal-hero");
    var heroInner = k.el("div", "container legal-hero__inner");
    heroInner.appendChild(
      k.el("p", "legal-hero__eyebrow", k.attr(host, "eyebrow", "Privacidad & Transparencia"))
    );
    heroInner.appendChild(
      k.el("h1", "legal-hero__title", k.attr(host, "title", "Política de Privacidad"))
    );
    heroInner.appendChild(
      k.el(
        "p",
        "legal-hero__lead",
        k.attr(
          host,
          "lead",
          "En Rodolfo-Freelance recolectamos únicamente la información necesaria para responder a tu consulta o cotización, sin letra chica ni uso comercial no autorizado."
        )
      )
    );
    hero.appendChild(heroInner);

    section.appendChild(hero);
    section.appendChild(k.fragment(LAYOUT));
    host.replaceChildren(section);
  }

  window.RFKIT.define("privacy-section", render);
})();
