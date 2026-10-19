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

  let accordionCount = 0;

  function createAccordionCard({ icon, badge, title, text, items }) {
    const article = el("article", "card card--accordion reveal");
    const panelId = `card-panel-${(accordionCount += 1)}`;

    const summary = el("div", "card__summary");
    appendCardFront(summary, { icon, badge, title, text });
    article.appendChild(summary);

    const toggle = el("button", "card__toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", panelId);
    toggle.appendChild(el("span", "card__toggle-label", "Ver funciones"));
    const toggleIcon = el("span", "card__toggle-icon");
    toggleIcon.setAttribute("aria-hidden", "true");
    toggle.appendChild(toggleIcon);
    article.appendChild(toggle);

    const panel = el("div", "card__panel");
    panel.id = panelId;
    panel.hidden = true;
    panel.appendChild(buildCardList(items));
    article.appendChild(panel);

    toggle.addEventListener("click", () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      article.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    return article;
  }

  function createCard(card) {
    const { icon, badge, title, text, items, accordion, flip } = card;
    if (accordion && Array.isArray(items) && items.length > 0) {
      return createAccordionCard(card);
    }

    if (flip) {
      const article = el("article", "card card--flip flip reveal");
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

  /* Iguala la altura de las tarjetas cerradas sin estirar la fila al abrir una. */
  function equalizeAccordionCards() {
    document.querySelectorAll("[data-cards]").forEach((grid) => {
      const summaries = Array.from(grid.querySelectorAll(".card__summary"));
      if (summaries.length === 0) return;
      summaries.forEach((summary) => (summary.style.minHeight = ""));

      const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      if (columns < 2) return;

      const tallest = Math.max(...summaries.map((summary) => summary.offsetHeight));
      summaries.forEach((summary) => (summary.style.minHeight = `${tallest}px`));
    });
  }

  function setupAccordionCards() {
    if (!document.querySelector(".card__summary")) return;
    equalizeAccordionCards();

    let frame = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(equalizeAccordionCards);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(equalizeAccordionCards);
    }
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

  const DEFAULT_UPLOAD_LABEL = "Adjuntar archivo o referencia (opcional)";

  const REPEATED_DIGITS_RE = /^(.)\1{7}$/;

  function isSequentialDigits(digits) {
    if (digits.length !== 8) return false;
    let isAscending = true;
    let isDescending = true;
    for (let i = 1; i < digits.length; i += 1) {
      const prev = Number(digits[i - 1]);
      const curr = Number(digits[i]);
      if (curr !== prev + 1) isAscending = false;
      if (curr !== prev - 1) isDescending = false;
    }
    return isAscending || isDescending;
  }

  function sanitizePhoneDigits(value, isPaste) {
    let digits = String(value || "").replace(/\D/g, "");

    if (isPaste || digits.length > 8) {
      if (digits.startsWith("56") && (isPaste || digits.length > 8)) {
        digits = digits.slice(2);
      }
      if (digits.length >= 9 && digits.startsWith("9")) {
        digits = digits.slice(1);
      }
    }

    return digits.slice(0, 8);
  }

  function formatPhoneMask(digits) {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
  }

  function getRawPhoneDigits(input) {
    if (!input) return "";
    if (typeof input.dataset.rawPhone === "string") {
      return input.dataset.rawPhone;
    }
    return sanitizePhoneDigits(input.value, false);
  }

  function applyPhoneState(input, digits) {
    input.dataset.rawPhone = digits;
    input.maxLength = digits.length >= 4 ? 9 : 8;
    input.value = formatPhoneMask(digits);
  }

  /* ----------------------------------------- Validación y sanitización Email */

  const EMAIL_LOCAL_RE = /^[a-z0-9áéíóúüñ._%+-]+$/i;
  const EMAIL_LABEL_RE = /^[a-z0-9áéíóúüñ](?:[a-z0-9áéíóúüñ-]{0,61}[a-z0-9áéíóúüñ])?$/i;
  const EMAIL_TLD_RE = /^(?:[a-z]{2,}|xn--[a-z0-9]{2,})$/i;

  const EMAIL_DOMAIN_TYPOS = {
    "gamil.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gmal.com": "gmail.com",
    "gmail.con": "gmail.com",
    "gmail.c": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "hotmal.com": "hotmail.com",
    "hotmail.con": "hotmail.com",
    "hotmail.c": "hotmail.com",
    "outlok.com": "outlook.com",
    "outllok.com": "outlook.com",
    "oulook.com": "outlook.com",
    "outlook.con": "outlook.com",
    "outlook.c": "outlook.com",
    "outlok.cl": "outlook.cl",
    "outllok.cl": "outlook.cl",
    "yaho.com": "yahoo.com",
    "yahooo.com": "yahoo.com",
    "yhoo.com": "yahoo.com",
    "yahoo.con": "yahoo.com",
    "yahoo.c": "yahoo.com"
  };

  function sanitizeEmail(raw) {
    return String(raw || "").trim().toLowerCase();
  }

  function validateEmailAddress(rawValue) {
    const email = sanitizeEmail(rawValue);
    if (!email) return "Ingresa tu correo electrónico.";
    if (/\s/.test(email)) return "El correo no debe contener espacios.";

    const parts = email.split("@");
    if (parts.length !== 2) {
      return "Ingresa un correo válido (ej. nombre@dominio.cl).";
    }

    const local = parts[0];
    const domain = parts[1];

    if (!local) return "Ingresa el usuario antes del @.";
    if (local.length > 64) {
      return "La parte antes del @ no puede superar los 64 caracteres.";
    }
    if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
      return "La parte antes del @ no puede iniciar, terminar ni tener puntos seguidos (..).";
    }
    if (!EMAIL_LOCAL_RE.test(local)) {
      return "La parte antes del @ contiene caracteres no permitidos.";
    }

    if (!domain) return "Ingresa el dominio después del @ (ej. gmail.com o empresa.cl).";
    if (domain.length > 255) {
      return "El dominio no puede superar los 255 caracteres.";
    }
    if (!domain.includes(".")) {
      return "El dominio debe incluir al menos un punto (ej. .cl o .com).";
    }
    if (domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) {
      return "El dominio del correo tiene un formato inválido.";
    }

    if (EMAIL_DOMAIN_TYPOS[domain]) {
      return `¿Quisiste decir ${local}@${EMAIL_DOMAIN_TYPOS[domain]}?`;
    }

    const labels = domain.split(".");
    const tld = labels[labels.length - 1];
    const baseDomain = labels.slice(0, -1).join(".");

    if (tld === "con") {
      return `La terminación ".con" no es válida. ¿Quisiste decir ${local}@${baseDomain}.com o .cl?`;
    }
    if (tld === "c") {
      return `La terminación ".c" no es válida. ¿Quisiste decir ${local}@${baseDomain}.cl o .com?`;
    }

    for (let i = 0; i < labels.length; i += 1) {
      if (!EMAIL_LABEL_RE.test(labels[i])) {
        return "El dominio contiene caracteres o guiones en una posición no válida.";
      }
    }

    if (!EMAIL_TLD_RE.test(tld)) {
      return "La extensión del dominio no es válida (ej. .cl, .com, .gob.cl).";
    }

    return "";
  }

  function setupNameInput(nameInput) {
    if (!nameInput) return;

    const toUpperPreservingCursor = () => {
      const start = nameInput.selectionStart;
      const end = nameInput.selectionEnd;
      const upper = nameInput.value.toUpperCase().slice(0, 30);
      if (nameInput.value !== upper) {
        nameInput.value = upper;
        if (typeof start === "number" && typeof end === "number") {
          nameInput.setSelectionRange(start, end);
        }
      }
    };

    nameInput.addEventListener("input", toUpperPreservingCursor);
    nameInput.addEventListener("blur", () => {
      nameInput.value = nameInput.value.trim().toUpperCase().slice(0, 30);
    });
  }

  const VALIDATORS = {
    name: (value) => {
      if (!value) return "Ingresa tu nombre.";
      if (value.length < 2) return "Ingresa tu nombre (mínimo 2 caracteres).";
      if (value.length > 30) return "El nombre no puede superar los 30 caracteres.";
      return "";
    },
    phone: (_value, input) => {
      const digits = getRawPhoneDigits(input);
      if (!digits) return "";
      if (digits.length !== 8) {
        return "Ingresa los 8 dígitos de tu teléfono.";
      }
      if (REPEATED_DIGITS_RE.test(digits) || isSequentialDigits(digits)) {
        return "Ingresa un número de teléfono real (sin secuencias ni dígitos repetidos).";
      }
      return "";
    },
    email: (value) => validateEmailAddress(value),
    subject: (value) =>
      value.length >= 3 ? "" : "Selecciona un servicio.",
    message: (value) => {
      if (value.length < 10) {
        return "Cuéntame un poco más (mínimo 10 caracteres).";
      }
      if (value.length > 2000) {
        return "Has superado el límite máximo de 2000 caracteres.";
      }
      return "";
    },
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

  function setupPhoneInput(phoneInput) {
    if (!phoneInput) return;

    phoneInput.dataset.rawPhone = "";

    phoneInput.addEventListener("keydown", (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ];
      if (allowedKeys.includes(event.key)) return;

      if (!/^\d$/.test(event.key)) {
        event.preventDefault();
        return;
      }

      const currentDigits = getRawPhoneDigits(phoneInput);
      const selectionLength =
        (phoneInput.selectionEnd || 0) - (phoneInput.selectionStart || 0);

      if (currentDigits.length >= 8 && selectionLength === 0) {
        event.preventDefault();
      }
    });

    phoneInput.addEventListener("paste", (event) => {
      event.preventDefault();
      const clipboard = event.clipboardData || window.clipboardData;
      const pastedText = clipboard ? clipboard.getData("text") : "";
      const digits = sanitizePhoneDigits(pastedText, true);
      applyPhoneState(phoneInput, digits);
      validateField(phoneInput);
    });

    const handlePhoneChange = () => {
      const digits = sanitizePhoneDigits(phoneInput.value, false);
      applyPhoneState(phoneInput, digits);
    };

    phoneInput.addEventListener("input", handlePhoneChange);
    phoneInput.addEventListener("change", () => {
      handlePhoneChange();
      validateField(phoneInput);
    });
  }

  function setupEmailInput(emailInput) {
    if (!emailInput) return;

    const toLowerPreservingCursor = () => {
      const start = emailInput.selectionStart;
      const end = emailInput.selectionEnd;
      const lower = emailInput.value.toLowerCase();
      if (emailInput.value !== lower) {
        emailInput.value = lower;
        if (typeof start === "number" && typeof end === "number") {
          try {
            emailInput.setSelectionRange(start, end);
          } catch (_err) {
            /* input[type="email"] en algunos navegadores no soporta setSelectionRange */
          }
        }
      }
    };

    const normalizeField = () => {
      const cleaned = sanitizeEmail(emailInput.value);
      if (emailInput.value !== cleaned) {
        emailInput.value = cleaned;
      }
    };

    emailInput.addEventListener("input", toLowerPreservingCursor);
    emailInput.addEventListener("blur", normalizeField);
    emailInput.addEventListener("change", normalizeField);
    emailInput.addEventListener("paste", (event) => {
      event.preventDefault();
      const clipboard = event.clipboardData || window.clipboardData;
      const pastedText = clipboard ? clipboard.getData("text") : "";
      emailInput.value = sanitizeEmail(pastedText);
      validateField(emailInput);
    });
  }

  const MESSAGE_MAX_LENGTH = 2000;

  function updateMessageCounter(messageInput, counter) {
    if (!messageInput || !counter) return;

    if (messageInput.value.length > MESSAGE_MAX_LENGTH) {
      messageInput.value = messageInput.value.slice(0, MESSAGE_MAX_LENGTH);
    }

    const len = messageInput.value.length;
    counter.classList.remove("is-near-limit", "is-at-limit");

    if (len === 0) {
      counter.textContent = "Límite 2000 caracteres";
    } else if (len >= MESSAGE_MAX_LENGTH) {
      counter.textContent =
        "2000 / 2000 — Has alcanzado el límite máximo de caracteres";
      counter.classList.add("is-at-limit");
    } else if (len >= MESSAGE_MAX_LENGTH - 100) {
      counter.textContent = `${len} / 2000 caracteres (quedan ${MESSAGE_MAX_LENGTH - len})`;
      counter.classList.add("is-near-limit");
    } else {
      counter.textContent = `${len} / 2000 caracteres`;
    }
  }

  function setupSuccessModal() {
    const modal = document.getElementById("contact-success-modal");
    const messageNode = document.getElementById("contact-modal-message");
    const closeBtn = document.getElementById("contact-modal-close");

    function closeModal() {
      if (!modal) return;
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }

    function openModal(text) {
      if (!modal) return;
      if (messageNode && text) {
        messageNode.textContent = text;
      }
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      if (closeBtn) closeBtn.focus();
    }

    if (modal) {
      modal.querySelectorAll("[data-modal-close]").forEach((node) => {
        node.addEventListener("click", closeModal);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
          closeModal();
        }
      });
    }

    return { openModal, closeModal };
  }

  const MAX_ATTACHMENTS = 3;
  const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB

  function formatFileSize(bytes) {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const commaIdx = result.indexOf(",");
        resolve(commaIdx !== -1 ? result.slice(commaIdx + 1) : result);
      };
      reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
      reader.readAsDataURL(file);
    });
  }

  function compressImageIfNeeded(file) {
    return readFileAsBase64(file)
      .then((rawBase64) => {
        const fallback = {
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          content: rawBase64
        };

        if (
          !file.type ||
          !/^image\/(jpeg|jpg|png|webp)$/i.test(file.type) ||
          file.size <= 1.2 * 1024 * 1024
        ) {
          return fallback;
        }

        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const maxDim = 1920;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              const ratio = Math.min(maxDim / width, maxDim / height);
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              resolve(fallback);
              return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
            const commaIdx = dataUrl.indexOf(",");
            const base64 = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
            resolve({
              name: file.name,
              size: file.size,
              type: "image/jpeg",
              content: base64
            });
          };
          img.onerror = () => resolve(fallback);
          img.src = `data:${file.type};base64,${rawBase64}`;
        });
      })
      .catch(() => null);
  }

  function setupAttachmentManager(attachmentInput) {
    const dropzone = document.getElementById("attachment-dropzone");
    const listNode = document.getElementById("attachment-list");
    const errorNode = document.getElementById("attachment-error");
    const fieldNode = document.getElementById("attachment-field");
    const items = [];

    function setAttachmentError(msg) {
      if (errorNode) errorNode.textContent = msg || "";
      if (fieldNode) fieldNode.classList.toggle("is-invalid", Boolean(msg));
    }

    function renderList() {
      if (!dropzone || !listNode) return;

      if (items.length === 0) {
        dropzone.hidden = false;
        listNode.hidden = true;
        listNode.replaceChildren();
        return;
      }

      dropzone.hidden = true;
      listNode.hidden = false;
      const isAtMax = items.length >= MAX_ATTACHMENTS;
      const frag = document.createDocumentFragment();

      items.forEach((item, index) => {
        const row = el("div", "form__attachment-item");
        const nameSpan = el(
          "span",
          "form__attachment-name",
          `${item.name} (${formatFileSize(item.size)})`
        );
        nameSpan.title = item.name;

        const actions = el("div", "form__attachment-actions");

        const addBtn = el(
          "button",
          "form__attachment-btn form__attachment-btn--add",
          "Agregar"
        );
        addBtn.type = "button";
        addBtn.disabled = isAtMax;
        addBtn.addEventListener("click", () => {
          if (items.length < MAX_ATTACHMENTS && attachmentInput) {
            attachmentInput.value = "";
            attachmentInput.click();
          }
        });

        const removeBtn = el(
          "button",
          "form__attachment-btn form__attachment-btn--remove",
          "Eliminar"
        );
        removeBtn.type = "button";
        removeBtn.addEventListener("click", () => {
          items.splice(index, 1);
          setAttachmentError("");
          if (attachmentInput) attachmentInput.value = "";
          renderList();
        });

        actions.appendChild(addBtn);
        actions.appendChild(removeBtn);
        row.appendChild(nameSpan);
        row.appendChild(actions);
        frag.appendChild(row);
      });

      listNode.replaceChildren(frag);
    }

    if (attachmentInput) {
      attachmentInput.addEventListener("change", async () => {
        const selectedFiles = attachmentInput.files
          ? Array.from(attachmentInput.files)
          : [];
        if (selectedFiles.length === 0) return;

        setAttachmentError("");

        for (let i = 0; i < selectedFiles.length; i += 1) {
          if (items.length >= MAX_ATTACHMENTS) {
            setAttachmentError("Solo puedes adjuntar hasta 3 archivos.");
            break;
          }

          const file = selectedFiles[i];
          if (file.size > MAX_ATTACHMENT_BYTES) {
            setAttachmentError(
              `El archivo "${file.name}" supera el límite máximo de 10 MB.`
            );
            continue;
          }

          const currentTotal = items.reduce((acc, it) => acc + it.size, 0);
          if (currentTotal + file.size > MAX_ATTACHMENT_BYTES) {
            setAttachmentError(
              "El peso total de los archivos adjuntos no puede superar los 10 MB."
            );
            continue;
          }

          const processed = await compressImageIfNeeded(file);
          if (processed) {
            items.push(processed);
          } else {
            setAttachmentError(`No se pudo adjuntar "${file.name}".`);
          }
        }

        attachmentInput.value = "";
        renderList();
      });
    }

    function clearAttachments() {
      items.length = 0;
      if (attachmentInput) attachmentInput.value = "";
      setAttachmentError("");
      renderList();
    }

    function getAttachmentsPayload() {
      return items.map((it) => ({
        filename: it.name,
        contentType: it.type,
        size: it.size,
        content: it.content
      }));
    }

    function getAttachmentNames() {
      return items.map((it) => it.name).join(", ");
    }

    return {
      clearAttachments,
      getAttachmentsPayload,
      getAttachmentNames
    };
  }

  function setupForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    const submit = document.getElementById("form-submit");
    if (!form || !feedback || !submit) return;

    const { openModal } = setupSuccessModal();
    const counter = document.getElementById("message-counter");
    const nameInput = form.elements.name;
    const messageInput = form.elements.message;
    const phoneInput = form.elements.phone;
    const emailInput = form.elements.email;
    const attachmentInput = document.getElementById("attachment");

    setupNameInput(nameInput);
    setupPhoneInput(phoneInput);
    setupEmailInput(emailInput);
    const attachmentManager = setupAttachmentManager(attachmentInput);

    if (messageInput && counter) {
      messageInput.addEventListener("input", () => {
        updateMessageCounter(messageInput, counter);
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

      if (nameInput) {
        nameInput.value = nameInput.value.trim().toUpperCase().slice(0, 30);
      }
      if (emailInput) {
        emailInput.value = sanitizeEmail(emailInput.value);
      }

      if (!validateForm(form)) {
        setFeedback(feedback, "Revisa los campos marcados en rojo.", "is-error");
        return;
      }

      const rawPhoneDigits = getRawPhoneDigits(phoneInput);
      const fullPhone = rawPhoneDigits ? `+56 9 ${rawPhoneDigits}` : "";

      const payload = {
        name: form.elements.name.value.trim().toUpperCase(),
        phone: fullPhone,
        email: sanitizeEmail(form.elements.email.value),
        subject: form.elements.subject.value.trim(),
        message: form.elements.message.value.trim(),
        attachmentName: attachmentManager.getAttachmentNames(),
        attachments: attachmentManager.getAttachmentsPayload(),
        marketingOptin: Boolean(
          form.elements.marketingOptin && form.elements.marketingOptin.checked
        ),
        website: form.elements.website.value // honeypot
      };

      // Token nuevo en cada envío: la cookie vence a la hora y el token de la carga inicial puede quedar obsoleto.
      await loadCsrfToken();

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
          setFeedback(feedback, "", null);
          openModal("¡Gracias! Tu mensaje fue enviado. Te responderé muy pronto.");
          form.reset();
          if (phoneInput) applyPhoneState(phoneInput, "");
          if (counter) updateMessageCounter(messageInput, counter);
          attachmentManager.clearAttachments();
          csrfToken = "";
          await loadCsrfToken();
        } else {
          const firstFieldError =
            Array.isArray(data.errors) && data.errors[0] && data.errors[0].message;
          setFeedback(
            feedback,
            firstFieldError ||
              data.message ||
              "No se pudo enviar el mensaje. Inténtalo más tarde.",
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
    setupAccordionCards();
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

