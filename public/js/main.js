/* ==========================================================================
   Rodolfo-Freelance — Lógica del frontend
   ========================================================================== */

(function () {
  "use strict";

  const API_CONTACT = "/api/contact";
  const CSRF_ENDPOINT = "/api/csrf";
  let csrfToken = "";

  /* ---------------------------------------------------------------- Utilidades */

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ------------------------------------------------------------- Render de cards */

  function buildCardList(items) {
    const list = el("ul", "card__list");
    items.forEach((point) => {
      const li = el("li", "card__item");
      const colonIdx = point.indexOf(": ");
      if (colonIdx !== -1) {
        li.appendChild(el("strong", "card__item-label", point.slice(0, colonIdx + 1) + " "));
        li.appendChild(document.createTextNode(point.slice(colonIdx + 2)));
      } else {
        li.textContent = point;
      }
      list.appendChild(li);
    });
    return list;
  }

  function appendCardFront(target, { icon, badge, title, text }) {
    if (badge) {
      const top = el("div", "card__top");
      if (icon) top.appendChild(el("span", "card__icon", icon));
      top.appendChild(el("span", "card__badge", badge));
      target.appendChild(top);
    } else if (icon) {
      target.appendChild(el("span", "card__icon", icon));
    }
    target.appendChild(el("h3", "card__title", title));
    target.appendChild(el("p", "card__text", text));
  }

  function createCard({ icon, badge, title, text, items, flip }) {
    if (flip) {
      const article = el("article", "card card--flip flip reveal");
      article.tabIndex = 0;
      article.setAttribute("aria-label", badge ? `${badge} - ${title}` : title);

      const inner = el("div", "card__inner3d");

      const front = el("div", "card__face card__face--front");
      appendCardFront(front, { icon, badge, title, text });
      front.appendChild(window.RFKIT.flipHint());
      inner.appendChild(front);

      const back = el("div", "card__face card__face--back");
      if (Array.isArray(items) && items.length > 0) {
        back.appendChild(buildCardList(items));
      }
      inner.appendChild(back);

      article.appendChild(inner);
      window.RFKIT.bindFlipCard(article);

      return article;
    }

    const article = el("article", "card reveal");
    appendCardFront(article, { icon, badge, title, text });
    if (Array.isArray(items) && items.length > 0) {
      article.appendChild(buildCardList(items));
    }
    return article;
  }

  const CARD_SOURCES = {
    desarrollo: typeof DESARROLLO !== "undefined" ? DESARROLLO : [],
    marketing: typeof MARKETING !== "undefined" ? MARKETING : []
  };

  function renderCards(grid, items) {
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(createCard(item)));
    grid.appendChild(fragment);
  }

  function renderAllCards() {
    document.querySelectorAll("[data-cards]").forEach((grid) => {
      const items = CARD_SOURCES[grid.getAttribute("data-cards")];
      if (items) renderCards(grid, items);
    });
  }

  /* ------------------------------------------------------------- Menú móvil */

  function setupMenu() {
    const toggle = document.querySelector(".navbar__toggle");
    const menu = document.getElementById("menu");
    if (!toggle || !menu) return;

    const close = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  /* --------------------------------------------------- Enlace activo + reveal */

  function setupScrollSpy() {
    const links = Array.from(document.querySelectorAll(".navbar__link"));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          links.forEach((link) =>
            link.classList.toggle("is-active", link.getAttribute("href") === id)
          );
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ------------------------------------------------------------- CSRF token */

  async function loadCsrfToken() {
    try {
      const response = await fetch(CSRF_ENDPOINT, {
        method: "GET",
        credentials: "same-origin"
      });
      if (!response.ok) return;
      const data = await response.json();
      csrfToken = data.token || "";
    } catch (error) {
      /* sin token el servidor rechazará el envío: no exponer detalles */
      csrfToken = "";
    }
  }

  /* -------------------------------------------------------- Formulario contacto */

  const DEFAULT_UPLOAD_LABEL =
    "Adjuntar brief, boceto o documento de referencia (opcional)";

  const VALIDATORS = {
    name: (value) =>
      value.length >= 2 ? "" : "Ingresa tu nombre (mínimo 2 caracteres).",
    phone: (value) =>
      !value || /^[+\d\s()-]{6,30}$/.test(value)
        ? ""
        : "Ingresa un teléfono válido.",
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Ingresa un correo válido.",
    subject: (value) =>
      value.length >= 3 ? "" : "Selecciona un servicio.",
    message: (value) =>
      value.length >= 10 ? "" : "Cuéntame un poco más (mínimo 10 caracteres).",
    privacy: (_value, input) =>
      input && input.checked
        ? ""
        : "Debes aceptar la Política de Privacidad."
  };

  function validateField(input) {
    const validator = VALIDATORS[input.name];
    if (!validator) return true;

    const value = (input.value || "").trim();
    const message = validator(value, input);
    const field = input.closest(".form__field");
    const errorBox = field ? field.querySelector(".form__error") : null;

    if (field) field.classList.toggle("is-invalid", Boolean(message));
    if (errorBox) errorBox.textContent = message;

    return message === "";
  }

  function validateForm(form) {
    let valid = true;
    ["name", "phone", "email", "subject", "message", "privacy"].forEach((name) => {
      const input = form.elements[name];
      if (input && !validateField(input)) valid = false;
    });
    return valid;
  }

  function setFeedback(node, message, type) {
    node.textContent = message;
    node.classList.remove("is-success", "is-error");
    if (type) node.classList.add(type);
  }

  function setupForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    const submit = document.getElementById("form-submit");
    if (!form || !feedback || !submit) return;

    const counter = document.getElementById("message-counter");
    const messageInput = form.elements.message;
    const attachmentInput = document.getElementById("attachment");
    const attachmentLabel = document.getElementById("attachment-label");

    if (messageInput && counter) {
      messageInput.addEventListener("input", () => {
        const len = messageInput.value.length;
        counter.textContent =
          len > 0 ? `${len} / 2000 caracteres` : "Límite 2000 caracteres";
      });
    }

    if (attachmentInput && attachmentLabel) {
      attachmentInput.addEventListener("change", () => {
        const file = attachmentInput.files && attachmentInput.files[0];
        attachmentLabel.textContent = file ? file.name : DEFAULT_UPLOAD_LABEL;
      });
    }

    form.querySelectorAll("input, select, textarea").forEach((input) => {
      const evt =
        input.tagName === "SELECT" || input.type === "checkbox"
          ? "change"
          : "blur";
      input.addEventListener(evt, () => {
        if (input.name !== "website" && input.name !== "attachment") {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!validateForm(form)) {
        setFeedback(feedback, "Revisa los campos marcados en rojo.", "is-error");
        return;
      }

      const file =
        attachmentInput && attachmentInput.files && attachmentInput.files[0];
      const rawPhone = form.elements.phone ? form.elements.phone.value.trim() : "";
      const fullPhone = rawPhone
        ? rawPhone.startsWith("+")
          ? rawPhone
          : `+56 9 ${rawPhone}`
        : "";

      const payload = {
        name: form.elements.name.value.trim(),
        phone: fullPhone,
        email: form.elements.email.value.trim(),
        subject: form.elements.subject.value.trim(),
        message: form.elements.message.value.trim(),
        attachmentName: file ? file.name : "",
        marketingOptin: Boolean(
          form.elements.marketingOptin && form.elements.marketingOptin.checked
        ),
        website: form.elements.website.value // honeypot
      };

      if (!csrfToken) await loadCsrfToken();

      submit.disabled = true;
      submit.textContent = "Enviando…";
      setFeedback(feedback, "", null);

      try {
        const response = await fetch(API_CONTACT, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.ok) {
          setFeedback(feedback, data.message || "¡Mensaje enviado! Gracias.", "is-success");
          form.reset();
          if (counter) counter.textContent = "Límite 2000 caracteres";
          if (attachmentLabel) attachmentLabel.textContent = DEFAULT_UPLOAD_LABEL;
          csrfToken = "";
          await loadCsrfToken();
        } else {
          setFeedback(
            feedback,
            data.message || "No se pudo enviar el mensaje. Inténtalo más tarde.",
            "is-error"
          );
          if (response.status === 403) {
            csrfToken = "";
            await loadCsrfToken();
          }
        }
      } catch (error) {
        setFeedback(feedback, "Error de conexión. Revisa tu red e inténtalo de nuevo.", "is-error");
      } finally {
        submit.disabled = false;
        submit.textContent = "Enviar mensaje →";
      }
    });
  }

  /* --------------------------------------------------- Acordeón Legal */

  function setupLegalAccordion() {
    const root = document.querySelector("[data-legal-accordion]");
    if (!root) return;

    const items = Array.from(root.querySelectorAll("[data-legal-item]"));
    const navLinks = Array.from(root.querySelectorAll("[data-legal-target]"));

    function activateItem(targetId, options) {
      const toggleIfOpen = options && options.toggleIfOpen;
      const scroll = options && options.scroll;

      items.forEach((item) => {
        const id = item.getAttribute("data-legal-item");
        const trigger = item.querySelector(".legal-item__trigger");
        const panel = item.querySelector(".legal-item__panel");
        const isCurrent = id === targetId;

        if (isCurrent) {
          const willOpen = toggleIfOpen ? !item.classList.contains("is-open") : true;
          item.classList.toggle("is-open", willOpen);
          if (trigger) trigger.setAttribute("aria-expanded", String(willOpen));
          if (panel) panel.hidden = !willOpen;
        } else {
          item.classList.remove("is-open");
          if (trigger) trigger.setAttribute("aria-expanded", "false");
          if (panel) panel.hidden = true;
        }
      });

      navLinks.forEach((btn) => {
        const isMatch = btn.getAttribute("data-legal-target") === targetId;
        btn.classList.toggle("is-active", isMatch);
      });

      if (scroll) {
        const targetEl = root.querySelector(`[data-legal-item="${targetId}"]`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }

    items.forEach((item) => {
      const trigger = item.querySelector(".legal-item__trigger");
      const id = item.getAttribute("data-legal-item");
      if (!trigger || !id) return;
      trigger.addEventListener("click", () => {
        activateItem(id, { toggleIfOpen: true, scroll: false });
      });
    });

    navLinks.forEach((btn) => {
      const id = btn.getAttribute("data-legal-target");
      if (!id) return;
      btn.addEventListener("click", () => {
        activateItem(id, { toggleIfOpen: false, scroll: true });
      });
    });
  }

  /* ------------------------------------------------------------------- Año */

  function setYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------- Eliminar badge/drawer de Netlify */

  const NETLIFY_WIDGET_SELECTOR = [
    "#nl-badge-frame",
    '[id*="nl-badge"]',
    '[class*="nl-badge"]',
    "[data-netlify-badge]",
    "div[data-netlify-drawer]",
    'div[class*="netlify-drawer"]',
    'iframe[src*="netlify"]',
    "netlify-drawer",
    "#netlify-drawer-root"
  ].join(",");

  function purgeNetlifyWidgets() {
    document.querySelectorAll(NETLIFY_WIDGET_SELECTOR).forEach((node) => {
      node.remove();
    });
  }

  function setupNetlifyBadgeRemoval() {
    purgeNetlifyWidgets();
    if (!("MutationObserver" in window) || !document.body) return;
    const observer = new MutationObserver(() => {
      purgeNetlifyWidgets();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  /* ------------------------------------------------------------------ Init */

  function init() {
    setupNetlifyBadgeRemoval();
    renderAllCards();
    setupMenu();
    setupScrollSpy();
    setupForm();
    setupReveal();
    setupLegalAccordion();
    setYear();
    loadCsrfToken();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

