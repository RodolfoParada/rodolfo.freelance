"use strict";

const crypto = require("crypto");
const { config } = require("../config");

const COOKIE_NAME = "rf_csrf";
const HEADER_NAME = "x-csrf-token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict",
  secure: config.isProduction,
  path: "/",
  maxAge: 1000 * 60 * 60 // 1 hora
};

/**
 * Patrón "double-submit": el token viaja al cliente por el cuerpo de la respuesta
 * (no leyendo la cookie) y vuelve por cabecera. La cookie es httpOnly + SameSite=Strict,
 * por lo que otro origen no puede leerla ni falsificar la petición.
 */
function issueToken(req, res) {
  const token = crypto.randomBytes(32).toString("hex");
  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  res.json({ token });
}

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function verifyToken(req, res, next) {
  const cookieToken = req.cookies ? req.cookies[COOKIE_NAME] : undefined;
  const headerToken = req.get(HEADER_NAME);

  if (!cookieToken || !headerToken || !safeEqual(cookieToken, headerToken)) {
    res.clearCookie(COOKIE_NAME, { path: "/" });
    return res.status(403).json({
      ok: false,
      message: "Sesión de formulario inválida o expirada. Recarga la página e inténtalo de nuevo."
    });
  }

  return next();
}

module.exports = { issueToken, verifyToken, COOKIE_NAME, HEADER_NAME };
