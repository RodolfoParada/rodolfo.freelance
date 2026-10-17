"use strict";

const { config } = require("../config");

/**
 * Verifica que el Origin/Referer de la petición API pertenezca a un origen permitido.
 * Defensa en profundidad contra CSRF y peticiones de terceros.
 */
function checkOrigin(req, res, next) {
  // Peticiones sin Origin (curl, health-check interno) en desarrollo se permiten.
  const origin = req.get("origin");
  const referer = req.get("referer");

  const candidate = origin || (referer ? new URL(referer).origin : "");
  if (!candidate) {
    if (config.isProduction) {
      return res.status(403).json({ ok: false, message: "Origen no permitido." });
    }
    return next();
  }

  const allowed = config.allowedOrigins;
  if (allowed.length === 0) {
    // Sin lista configurada: en producción cerramos, en desarrollo permitimos mismo host.
    if (!config.isProduction) return next();
    return res.status(403).json({ ok: false, message: "Origen no permitido." });
  }

  if (allowed.includes(candidate)) return next();

  return res.status(403).json({ ok: false, message: "Origen no permitido." });
}

module.exports = { checkOrigin };
