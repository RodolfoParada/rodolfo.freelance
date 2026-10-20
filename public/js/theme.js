/* ==========================================================================
   Rodolfo-Freelance — Tema claro/oscuro
   Se carga de forma síncrona en <head> para evitar el "flash" (FOUC).
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "rf-theme";
  var root = document.documentElement;
  var LIGHT = "light";
  var DARK = "dark";

  function getStored() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === LIGHT || value === DARK ? value : null;
    } catch (error) {
      return null;
    }
  }

  function store(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* almacenamiento no disponible: se ignora */
    }
  }

  function prefersDark() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function updateMetaColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === DARK ? "#131A23" : "#F2EFE7");
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    updateMetaColor(theme);
  }

  function current() {
    return root.getAttribute("data-theme") === DARK ? DARK : LIGHT;
  }

  /* Aplicar tema lo antes posible (antes del primer render). */
  apply(getStored() || (prefersDark() ? DARK : LIGHT));

  function syncButton(button) {
    if (!button) return;
    var isDark = current() === DARK;
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute(
      "aria-label",
      isDark ? "Activar modo claro" : "Activar modo oscuro"
    );
  }

  function syncAllButtons() {
    document.querySelectorAll(".theme-toggle").forEach(syncButton);
  }

  function setupToggle() {
    /* Delegación: el botón lo renderiza <site-header>, que puede montarse después de este script. */
    document.addEventListener("click", function (event) {
      var target = event.target;
      var button = target && target.closest ? target.closest(".theme-toggle") : null;
      if (!button) return;
      var next = current() === DARK ? LIGHT : DARK;
      apply(next);
      store(next);
      syncAllButtons();
    });

    syncAllButtons();
    window.addEventListener("load", syncAllButtons);

    if (typeof window.matchMedia === "function") {
      var media = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (event) {
        if (getStored()) return;
        apply(event.matches ? DARK : LIGHT);
        syncAllButtons();
      };
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", onChange);
      } else if (typeof media.addListener === "function") {
        media.addListener(onChange);
      }
    }
  }

  setupToggle();
})();
