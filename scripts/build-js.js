"use strict";

/* Minifica public/js/main.js en public/js/main.min.js (menos bytes que descargar).
   Edita siempre main.js; este archivo se regenera con `npm run build:js`. */

const fs = require("fs");
const path = require("path");
const { minify } = require("terser");

const JS_DIR = path.join(__dirname, "..", "public", "js");

async function build() {
  const source = fs.readFileSync(path.join(JS_DIR, "main.js"), "utf8");
  const result = await minify(source, { compress: true, mangle: true, format: { comments: false } });
  fs.writeFileSync(path.join(JS_DIR, "main.min.js"), result.code);
  console.log(`JS minificado en public/js/main.min.js (${result.code.length} bytes)`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
