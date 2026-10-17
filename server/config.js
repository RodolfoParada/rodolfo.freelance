"use strict";

require("dotenv").config();

const REQUIRED = ["GMAIL_USER", "GMAIL_APP_PASSWORD"];
const isProduction = process.env.NODE_ENV === "production";

function parseOrigins(value) {
  return String(value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const config = {
  env: process.env.NODE_ENV || "development",
  isProduction,
  port: Number.parseInt(process.env.PORT || "3000", 10),

  mail: {
    user: process.env.GMAIL_USER || "",
    appPassword: process.env.GMAIL_APP_PASSWORD || "",
    fromName: process.env.MAIL_FROM_NAME || "Rodolfo-Freelance",
    to: process.env.MAIL_TO || process.env.GMAIL_USER || ""
  },

  allowedOrigins: parseOrigins(process.env.ALLOWED_ORIGINS)
};

function validateConfig() {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno requeridas: ${missing.join(", ")}. ` +
        "Copia .env.example a .env y completa los valores."
    );
  }
}

module.exports = { config, validateConfig };
