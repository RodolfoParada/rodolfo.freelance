"use strict";

/* Une las hojas de estilo en public/css/app.css (una sola petición en vez de cinco).
   Mantén el orden: fonts → reset → variables → styles → responsive. */

const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");

const CSS_DIR = path.join(__dirname, "..", "public", "css");
const SOURCES = ["fonts.css", "reset.css", "variables.css", "styles.css", "responsive.css"];
const OUTPUT = path.join(CSS_DIR, "app.css");

const header =
  "/* Generado por scripts/build-css.js — no editar a mano. Edita los archivos fuente de public/css/. */\n";
const bundle = SOURCES.map((file) => {
  const css = fs.readFileSync(path.join(CSS_DIR, file), "utf8");
  return `/* ---- ${file} ---- */\n${css.trim()}\n`;
}).join("\n");

/* Minificación de nivel 1: quita comentarios y espacios sin reescribir reglas (seguro para calc() y selectores). */
const result = new CleanCSS({ level: 1 }).minify(bundle);
if (result.errors.length > 0) {
  throw new Error(`clean-css: ${result.errors.join("; ")}`);
}
if (result.warnings.length > 0) {
  console.warn(`clean-css: ${result.warnings.join("; ")}`);
}

fs.writeFileSync(OUTPUT, header + result.styles + "\n");
console.log(`CSS unido y minificado en ${path.relative(process.cwd(), OUTPUT)} (${SOURCES.length} archivos)`);
