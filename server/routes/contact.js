"use strict";

const express = require("express");
const { body, validationResult } = require("express-validator");

const { sendContactEmail } = require("../mailer");
const { contactLimiter } = require("../middleware/rateLimit");
const { checkOrigin } = require("../middleware/origin");
const { verifyToken } = require("../middleware/csrf");

const router = express.Router();

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

function extractLocalPhoneDigits(raw) {
  let digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("56") && digits.length > 8) {
    digits = digits.slice(2);
  }
  if (digits.length === 9 && digits.startsWith("9")) {
    digits = digits.slice(1);
  }
  return digits;
}

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

function validateEmailAddress(rawValue) {
  const email = String(rawValue || "").trim().toLowerCase();
  if (!email) return "El correo es obligatorio.";
  if (/\s/.test(email)) return "El correo no debe contener espacios.";

  const parts = email.split("@");
  if (parts.length !== 2) return "El correo no es válido.";

  const [local, domain] = parts;
  if (!local || local.length > 64) {
    return "La parte antes del @ debe tener hasta 64 caracteres.";
  }
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return "La parte antes del @ tiene puntos en posición inválida.";
  }
  if (!EMAIL_LOCAL_RE.test(local)) {
    return "La parte antes del @ contiene caracteres no permitidos.";
  }

  if (!domain || domain.length > 255 || !domain.includes(".")) {
    return "El dominio del correo no es válido.";
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
      return "El dominio del correo contiene caracteres no válidos.";
    }
  }

  if (!EMAIL_TLD_RE.test(tld)) {
    return "La extensión del dominio no es válida.";
  }

  return "";
}

const validators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Ingresa tu nombre.")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres."),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .custom((value) => {
      const digits = extractLocalPhoneDigits(value);
      if (digits.length !== 8) {
        throw new Error("El teléfono debe tener 8 dígitos.");
      }
      if (REPEATED_DIGITS_RE.test(digits) || isSequentialDigits(digits)) {
        throw new Error("Ingresa un número de teléfono válido.");
      }
      return true;
    }),
  body("email")
    .trim()
    .toLowerCase()
    .custom((value) => {
      const errorMsg = validateEmailAddress(value);
      if (errorMsg) {
        throw new Error(errorMsg);
      }
      return true;
    }),
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("El asunto es obligatorio.")
    .isLength({ min: 3, max: 120 })
    .withMessage("El asunto debe tener entre 3 y 120 caracteres."),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("El mensaje es obligatorio.")
    .isLength({ min: 10, max: 2000 })
    .withMessage("El mensaje debe tener entre 10 y 2000 caracteres."),
  body("attachmentName")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 540 }),
  body("attachments")
    .optional()
    .isArray({ max: 3 })
    .withMessage("Solo se permiten hasta 3 archivos adjuntos.")
    .custom((items) => {
      if (!Array.isArray(items)) return true;
      const maxBytes = 10 * 1024 * 1024;
      let totalBytes = 0;
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (!item || typeof item.filename !== "string" || typeof item.content !== "string") {
          throw new Error("Formato de archivo adjunto inválido.");
        }
        const byteLen = Buffer.byteLength(item.content, "base64");
        if (byteLen > maxBytes) {
          throw new Error(`El archivo "${item.filename}" supera el límite de 10 MB.`);
        }
        totalBytes += byteLen;
      }
      if (totalBytes > maxBytes) {
        throw new Error("El peso total de los archivos adjuntos no puede superar los 10 MB.");
      }
      return true;
    }),
  body("marketingOptin").optional().isBoolean().toBoolean(),
  // El honeypot no se valida aquí: si viene relleno, la ruta responde "ok" sin enviar.
  body("website").optional({ checkFalsy: true }).isString()
];

router.post(
  "/contact",
  contactLimiter,
  checkOrigin,
  verifyToken,
  validators,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        ok: false,
        message: "Revisa los datos del formulario e inténtalo de nuevo.",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg }))
      });
    }

    const {
      name,
      phone,
      email,
      subject,
      message,
      attachmentName,
      attachments,
      marketingOptin,
      website
    } = req.body;

    // Honeypot: si viene relleno es un bot. Respondemos "ok" para no delatarnos.
    if (website) {
      return res.json({ ok: true, message: "¡Gracias! Hemos recibido tu mensaje." });
    }

    try {
      await sendContactEmail({
        name,
        phone,
        email,
        subject,
        message,
        attachmentName,
        attachments: Array.isArray(attachments) ? attachments : [],
        marketingOptin: Boolean(marketingOptin)
      });

      return res.json({
        ok: true,
        message: "¡Gracias! Tu mensaje fue enviado. Te responderé muy pronto."
      });
    } catch (error) {
      // No exponemos detalles internos al cliente.
      console.error("[contact] Error al enviar correo:", error.message);

      return res.status(502).json({
        ok: false,
        message: "No pudimos enviar tu mensaje en este momento. Inténtalo más tarde."
      });
    }
  }
);

module.exports = router;
