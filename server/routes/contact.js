"use strict";

const express = require("express");
const { body, validationResult } = require("express-validator");

const { sendContactEmail } = require("../mailer");
const { contactLimiter } = require("../middleware/rateLimit");
const { checkOrigin } = require("../middleware/origin");
const { verifyToken } = require("../middleware/csrf");

const router = express.Router();

const validators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2, max: 80 })
    .withMessage("El nombre debe tener entre 2 y 80 caracteres."),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("El teléfono es demasiado largo."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("El correo no es válido.")
    .isLength({ max: 120 })
    .withMessage("El correo es demasiado largo.")
    .normalizeEmail(),
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
    .isLength({ max: 180 }),
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

    const { name, phone, email, subject, message, attachmentName, marketingOptin, website } =
      req.body;

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
