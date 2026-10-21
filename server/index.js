"use strict";

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { config, validateConfig } = require("./config");
const { generalLimiter } = require("./middleware/rateLimit");
const { issueToken } = require("./middleware/csrf");
const contactRoute = require("./routes/contact");

function createApp() {
  const app = express();

  // Detrás de un proxy/HTTPS (nginx, Railway, Render, etc.)
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  // ----- Cabeceras de seguridad -------------------------------------------------
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          scriptSrc: ["'self'", "https://*.clarity.ms", "https://*.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com"],
          styleSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "blob:", "https://*.clarity.ms", "https://*.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com"],
          fontSrc: ["'self'"],
          connectSrc: ["'self'", "https://*.clarity.ms", "https://*.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com"],
          frameSrc: ["'self'", "https://*.googletagmanager.com"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          formAction: ["'self'"],
          requireTrustedTypesFor: ["'script'"],
          trustedTypes: ["rf-html", "default"],
          upgradeInsecureRequests: config.isProduction ? [] : null
        }
      },
      crossOriginOpenerPolicy: { policy: "same-origin" },
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      hsts: config.isProduction
        ? { maxAge: 31536000, includeSubDomains: true, preload: true }
        : false
    })
  );

  app.use((req, res, next) => {
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), payment=()"
    );
    next();
  });

  // ----- Parsers ----------------------------------------------------------------
  app.use(cookieParser());
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: false, limit: "25mb" }));

  // ----- Archivos estáticos (frontend) -----------------------------------------
  app.use(
    express.static(path.join(__dirname, "..", "dist"), {
      dotfiles: "deny",
      index: "index.html",
      maxAge: config.isProduction ? "1h" : 0,
      setHeaders(res) {
        res.setHeader("X-Content-Type-Options", "nosniff");
      }
    })
  );

  // ----- API --------------------------------------------------------------------
  const apiLimiter = generalLimiter;
  const apiRouter = express.Router();

  apiRouter.get("/csrf", apiLimiter, issueToken);

  apiRouter.get("/health", (req, res) => {
    res.json({ ok: true, status: "up" });
  });

  apiRouter.use(apiLimiter, contactRoute);

  apiRouter.use((req, res) => {
    res.status(404).json({ ok: false, message: "Recurso no encontrado." });
  });

  app.use("/api", apiRouter);
  app.use("/.netlify/functions/server/api", apiRouter);
  app.use("/.netlify/functions/server", apiRouter);

  // ----- Manejador de errores ---------------------------------------------------
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err && err.type === "entity.too.large") {
      return res.status(413).json({ ok: false, message: "Solicitud demasiado grande." });
    }
    if (err && err.type === "entity.parse.failed") {
      return res.status(400).json({ ok: false, message: "Solicitud inválida." });
    }
    console.error("[error]", err && err.message);
    return res.status(500).json({ ok: false, message: "Error interno del servidor." });
  });

  return app;
}

const app = createApp();

function start() {
  validateConfig();

  app.listen(config.port, () => {
    console.log(`Rodolfo-Freelance escuchando en http://localhost:${config.port} (${config.env})`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;
module.exports.app = app;
module.exports.createApp = createApp;
