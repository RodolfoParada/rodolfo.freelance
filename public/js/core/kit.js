/* ==========================================================================
   Kit de utilidades compartidas entre los componentes (Web Components).
   Exponen un namespace global `RFKIT` y cargan antes que cada componente.
   ========================================================================== */

(function (global) {
  "use strict";

  var FLIP_ARROW_SVG = `
    <svg class="pillar__arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  `;

  var BACK_ARROW_SVG = `
    <svg class="pillar__arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  `;

  // Trusted Types: solo se usa con plantillas estáticas del propio código (nunca con datos del usuario).
  var htmlPolicy =
    window.trustedTypes && window.trustedTypes.createPolicy
      ? window.trustedTypes.createPolicy("rf-html", {
          createHTML: function (value) {
            return value;
          }
        })
      : null;

  function fragment(html) {
    var template = document.createElement("template");
    var markup = html.trim();
    template.innerHTML = htmlPolicy ? htmlPolicy.createHTML(markup) : markup;
    return template.content;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function attr(host, name, fallback) {
    var value = host.getAttribute(name);
    return value == null || value === "" ? fallback : value;
  }

  function sectionShell(id, modifiers) {
    var section = document.createElement("section");
    section.id = id;
    section.className = "section" + (modifiers ? " " + modifiers : "");
    section.setAttribute("data-section", id);
    return section;
  }

  function sectionHeader(eyebrow, title, lead) {
    var header = document.createElement("header");
    header.className = "section__header";
    if (eyebrow) header.appendChild(el("p", "section__eyebrow", eyebrow));
    header.appendChild(el("h2", "section__title", title));
    if (lead) header.appendChild(el("p", "section__lead", lead));
    return header;
  }

  function blockTitle(title, subtitle) {
    var heading = el("h2", "block__title", title);
    if (subtitle) heading.appendChild(el("span", null, subtitle));
    return heading;
  }

  /* Botón reutilizable que gira la tarjeta (toque, clic o teclado). */
  function flipHint() {
    var hint = el("button", "pillar__hint");
    hint.type = "button";
    hint.setAttribute("aria-label", "Ver detalles");
    hint.appendChild(fragment(FLIP_ARROW_SVG));
    return hint;
  }

  /* Botón "volver" de la cara trasera: regresa la tarjeta a su estado inicial. */
  function flipBackHint() {
    var back = el("button", "pillar__hint pillar__hint--back");
    back.type = "button";
    back.setAttribute("aria-label", "Volver");
    back.appendChild(fragment(BACK_ARROW_SVG));
    return back;
  }

  /* Solo los botones .pillar__hint (ida y vuelta) giran la tarjeta. */
  function bindFlipCard(card) {
    var hint = card.querySelector(".pillar__hint:not(.pillar__hint--back)");
    var back = card.querySelector('[class*="__face--back"]');
    if (hint) {
      hint.addEventListener("click", function (e) {
        e.stopPropagation();
        card.classList.toggle("is-flipped");
      });
    }
    if (back) {
      back.appendChild(flipBackHint());
      back.querySelector(".pillar__hint--back").addEventListener("click", function (e) {
        e.stopPropagation();
        card.classList.remove("is-flipped");
      });
    }
  }

  function renderCardsSection(host, config) {
    var id = attr(host, "section-id", config.id);
    var section = sectionShell(id, config.alt ? "section--alt" : "");

    var container = el("div", "container");
    container.appendChild(
      sectionHeader(
        attr(host, "eyebrow", config.eyebrow),
        attr(host, "title", config.title),
        attr(host, "lead", config.lead)
      )
    );

    var grid = el("div", "grid");
    grid.setAttribute("data-cards", attr(host, "source", config.source));
    container.appendChild(grid);

    section.appendChild(container);
    host.replaceChildren(section);
  }

  function define(name, render) {
    if (customElements.get(name)) return;
    customElements.define(
      name,
      class extends HTMLElement {
        connectedCallback() {
          if (this.dataset.rendered === "true") return;
          this.dataset.rendered = "true";
          // Esperar al DOMContentLoaded: así el HTML estático de dentro ya está leído
          // y el render lo reemplaza en vez de sumarse a él.
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => render(this), { once: true });
          } else {
            render(this);
          }
        }
      }
    );
  }

  global.RFKIT = {
    fragment: fragment,
    el: el,
    attr: attr,
    sectionShell: sectionShell,
    sectionHeader: sectionHeader,
    blockTitle: blockTitle,
    flipHint: flipHint,
    flipBackHint: flipBackHint,
    bindFlipCard: bindFlipCard,
    renderCardsSection: renderCardsSection,
    define: define
  };
})(window);
