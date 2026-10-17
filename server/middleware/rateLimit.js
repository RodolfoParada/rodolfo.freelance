"use strict";

const rateLimit = require("express-rate-limit");

/** Límite general para toda la API. */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Demasiadas solicitudes. Inténtalo más tarde." }
});

/** Límite estricto para el envío del formulario (anti-spam). */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Has enviado demasiados mensajes. Espera unos minutos e inténtalo de nuevo."
  }
});

module.exports = { generalLimiter, contactLimiter };
