"use strict";

/* Plugin propio de Eleventy: genera sitemap.xml al terminar el build.
   Incluye las páginas que genera Eleventy (blog, pestañas y artículos) y las páginas estáticas
   que se copian desde public/ (que Eleventy no conoce).

   Uso en eleventy.config.js:
     eleventyConfig.addPlugin(require("./plugins/sitemap"), {
       siteUrl: "https://rodolfofreelance.cl",
       staticPages: [{ url: "/", lastmod: "2026-10-20", priority: 1 }],
       exclude: [/^\/borrador\//]
     });
*/

const fs = require("fs");
const path = require("path");

const isoDate = (value) => {
  const date = value instanceof Date && !isNaN(value) ? value : new Date();
  return date.toISOString().slice(0, 10);
};

/* Prioridad por tipo de página: inicio > pestañas del blog > artículos. */
const priorityFor = (url) => {
  if (url === "/") return 1;
  if (url === "/como-trabajo/") return 0.9;
  if (url === "/blog/" || /^\/blog\/(wordpress|desarrollo|marketing|prospeccion|atencion-cliente|administracion-ecommerce)\/(pagina\/\d+\/)?$/.test(url)) return 0.7;
  if (url.startsWith("/blog/")) return 0.6;
  return 0.5;
};

module.exports = function sitemapPlugin(eleventyConfig, options = {}) {
  const siteUrl = (options.siteUrl || "").replace(/\/$/, "");
  const staticPages = options.staticPages || [];
  const exclude = options.exclude || [];

  /* Fechas reales de cada página (front matter), leídas de Eleventy durante el build. */
  const dates = new Map();
  eleventyConfig.addCollection("sitemapDates", (collectionApi) => {
    collectionApi.getAll().forEach((item) => dates.set(item.url, item.date));
    return [];
  });

  eleventyConfig.on("eleventy.after", async ({ dir, results }) => {
    const pages = new Map();

    staticPages.forEach((page) => {
      pages.set(page.url, {
        url: page.url,
        lastmod: page.lastmod || isoDate(),
        priority: page.priority ?? priorityFor(page.url)
      });
    });

    results.forEach((result) => {
      const url = result.url;
      if (!url || !String(result.outputPath || "").endsWith(".html")) return;
      if (url.startsWith("/404")) return;
      if (exclude.some((pattern) => pattern.test(url))) return;

      pages.set(url, {
        url,
        lastmod: isoDate(dates.get(url)),
        priority: priorityFor(url)
      });
    });

    const entries = Array.from(pages.values())
      .sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url))
      .map(
        (page) =>
          `  <url>\n    <loc>${siteUrl}${page.url}</loc>\n    <lastmod>${page.lastmod}</lastmod>\n    <priority>${page.priority}</priority>\n  </url>`
      )
      .join("\n");

    const xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      entries +
      "\n</urlset>\n";

    fs.writeFileSync(path.join(dir.output, "sitemap.xml"), xml, "utf8");
  });
};
