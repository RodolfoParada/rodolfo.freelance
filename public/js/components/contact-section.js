/* Componente <contact-section> — sección de contacto con formulario.
   Atributos opcionales: section-id, eyebrow, title, lead. */

(function () {
  "use strict";

  var FORM = `
    <form class="form" id="contact-form" novalidate>
      <div class="form__row">
        <div class="form__field">
          <label for="name">Nombre completo</label>
          <input type="text" id="name" name="name" placeholder="Ej. Juan Pérez" required minlength="2" maxlength="80" autocomplete="name" />
          <span class="form__error" data-error-for="name"></span>
        </div>

        <div class="form__field">
          <label for="phone">Teléfono</label>
          <div class="form__phone">
            <span class="form__phone-prefix" aria-hidden="true">
              <span class="form__flag">
                <svg viewBox="0 0 24 16" width="20" height="14" role="img" focusable="false">
                  <rect width="24" height="8" fill="#ffffff" />
                  <rect y="8" width="24" height="8" fill="#d52b1e" />
                  <rect width="8" height="8" fill="#0039a6" />
                  <polygon points="4,1.8 4.65,3.6 6.55,3.6 5,4.7 5.6,6.5 4,5.4 2.4,6.5 3,4.7 1.45,3.6 3.35,3.6" fill="#ffffff" />
                </svg>
              </span>
              <span>+56 9</span>
            </span>
            <input type="tel" id="phone" name="phone" placeholder="8765 4321" maxlength="20" inputmode="numeric" autocomplete="tel-local" />
          </div>
          <span class="form__error" data-error-for="phone"></span>
        </div>
      </div>

      <div class="form__field">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" name="email" placeholder="juan@ejemplo.com" required maxlength="120" autocomplete="email" />
        <span class="form__error" data-error-for="email"></span>
      </div>

      <div class="form__field">
        <label for="subject">¿En qué te puedo ayudar?</label>
        <div class="form__select-wrap">
          <select id="subject" name="subject" required>
            <option value="" disabled selected>Selecciona un servicio...</option>
            <optgroup label="Desarrollo">
              <option value="Desarrollo Web a Medida">Desarrollo Web a Medida</option>
              <option value="Ecosistema WordPress">Ecosistema WordPress</option>
              <option value="Rediseño Web & UX">Rediseño Web &amp; UX</option>
              <option value="Auditoría Web">Auditoría Web</option>
              <option value="Auditoría UX">Auditoría UX</option>
              <option value="Desarrollo de MVP">Desarrollo de MVP</option>
            </optgroup>
            <optgroup label="Marketing & Operaciones">
              <option value="Marketing Digital & Redes Sociales">Marketing Digital &amp; Redes Sociales</option>
              <option value="Soporte Comercial & Prospección (SDR / BDR)">Soporte Comercial &amp; Prospección (SDR / BDR)</option>
              <option value="Atención al Cliente & Fidelización">Atención al Cliente &amp; Fidelización</option>
              <option value="Soporte Administrativo & E-commerce">Soporte Administrativo &amp; E-commerce</option>
            </optgroup>
            <option value="Otro / Consulta general">Otro / Consulta general</option>
          </select>
          <svg class="form__select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <span class="form__error" data-error-for="subject"></span>
      </div>

      <div class="form__field">
        <label for="message">Detalles del proyecto</label>
        <textarea id="message" name="message" rows="4" placeholder="Cuéntame brevemente qué necesitas resolver, objetivos o plazos estimados..." required minlength="10" maxlength="2000"></textarea>
        <div class="form__field-meta">
          <span class="form__error" data-error-for="message"></span>
          <span class="form__counter" id="message-counter">Límite 2000 caracteres</span>
        </div>
      </div>

      <div class="form__field">
        <label class="form__upload" for="attachment">
          <input type="file" id="attachment" name="attachment" class="form__upload-input" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.zip" />
          <svg class="form__upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
          <span class="form__upload-text" id="attachment-label">Adjuntar brief, boceto o documento de referencia (opcional)</span>
        </label>
      </div>

      <div class="form__field form__field--checkbox">
        <label class="form__checkbox" for="privacy">
          <input type="checkbox" id="privacy" name="privacy" required />
          <span>He leído y acepto la <a class="form__legal-link" href="privacidad.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a></span>
        </label>
        <span class="form__error" data-error-for="privacy"></span>
      </div>

      <div class="form__field form__field--checkbox">
        <label class="form__checkbox" for="marketing-optin">
          <input type="checkbox" id="marketing-optin" name="marketingOptin" />
          <span>(Opcional) Acepto recibir ofertas y comunicaciones comerciales.</span>
        </label>
      </div>

      <div class="form__trust">
        <svg class="form__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <p class="form__trust-text">Tus datos están protegidos y solo se utilizarán para responder a tu cotización o consulta.</p>
      </div>

      <!-- Honeypot anti-bots: invisible para humanos -->
      <div class="form__honeypot" aria-hidden="true">
        <label for="website">No completar</label>
        <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
      </div>

      <button class="btn btn--primary btn--block form__submit" type="submit" id="form-submit">Enviar mensaje →</button>
      <p class="form__sla">Respondemos en menos de 24 horas hábiles.</p>
      <p class="form__feedback" id="form-feedback" role="status" aria-live="polite"></p>
    </form>
  `;

  var IMPACT_PANEL = `
    <aside class="contact-panel" aria-label="Información de confianza y contacto directo">
      <div class="contact-panel__top">
        <span class="contact-panel__badge">
          <span class="contact-panel__badge-dot" aria-hidden="true"></span>
          Atención Directa · Todo Chile
        </span>
        <h3 class="contact-panel__title">
          Llevemos tu idea <span>al siguiente nivel</span>
        </h3>
        <p class="contact-panel__lead">
          Desarrollo web a medida y soporte de asistente virtual para todo Chile.
        </p>
      </div>

      <ul class="contact-panel__points">
        <li class="contact-panel__point">
          <span class="contact-panel__point-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
          <div class="contact-panel__point-body">
            <h4 class="contact-panel__point-title">Servicio 100% Remoto</h4>
            <p class="contact-panel__point-text">
              Sin importar en qué parte de Chile estés, trabajamos codo a codo de forma digital.
            </p>
          </div>
        </li>

        <li class="contact-panel__point">
          <span class="contact-panel__point-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </span>
          <div class="contact-panel__point-body">
            <h4 class="contact-panel__point-title">Respuesta Rápida</h4>
            <p class="contact-panel__point-text">
              Te escribo de vuelta en menos de 24 horas hábiles con una propuesta o diagnóstico inicial.
            </p>
          </div>
        </li>

        <li class="contact-panel__point">
          <span class="contact-panel__point-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </span>
          <div class="contact-panel__point-body">
            <h4 class="contact-panel__point-title">Experiencia y Compromiso</h4>
            <p class="contact-panel__point-text">
              Soluciones escalables en desarrollo, WordPress y soporte operativo para tu negocio.
            </p>
          </div>
        </li>
      </ul>

      <div class="contact-panel__direct">
        <p class="contact-panel__direct-label">Contacto directo</p>
        <div class="contact-panel__channels">
          <a class="contact-panel__channel" href="https://www.instagram.com/rodolfo.tech.soluciones/" target="_blank" rel="noopener noreferrer">
            <span class="contact-panel__channel-icon contact-panel__channel-icon--ig" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </span>
            <span class="contact-panel__channel-info">
              <span class="contact-panel__channel-name">Instagram</span>
              <strong class="contact-panel__channel-value">@rodolfo.tech.soluciones</strong>
            </span>
            <span class="contact-panel__channel-arrow" aria-hidden="true">↗</span>
          </a>

          <a class="contact-panel__channel" href="mailto:desarrollador.freelance7@gmail.com">
            <span class="contact-panel__channel-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span class="contact-panel__channel-info">
              <span class="contact-panel__channel-name">Correo</span>
              <strong class="contact-panel__channel-value">desarrollador.freelance7@gmail.com</strong>
            </span>
            <span class="contact-panel__channel-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </aside>
  `;

  function render(host) {
    var k = window.RFKIT;
    var section = k.sectionShell(k.attr(host, "section-id", "contacto"), "section--contact section--alt");

    var container = k.el("div", "container");
    container.appendChild(
      k.sectionHeader(
        k.attr(host, "eyebrow", "Hablemos"),
        k.attr(host, "title", "Contáctame"),
        k.attr(host, "lead", "Cuéntame tu idea y te responderé en la brevedad")
      )
    );

    var layout = k.el("div", "contact-layout");
    layout.appendChild(k.fragment(IMPACT_PANEL));
    layout.appendChild(k.fragment(FORM));
    container.appendChild(layout);

    section.appendChild(container);
    host.replaceChildren(section);
  }

  window.RFKIT.define("contact-section", render);
})();
