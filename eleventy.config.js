"use strict";

/* Eleventy: genera el blog desde Markdown. Lo demás de public/ se copia tal cual a dist/. */

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "." });

  /* Sitemap generado en cada build (plugins/sitemap.js). */
  eleventyConfig.addPlugin(require("./plugins/sitemap"), {
    siteUrl: "https://rodolfofreelance.cl",
    staticPages: [
      { url: "/", priority: 1 },
      { url: "/privacidad.html", priority: 0.3 }
    ]
  });

  /* Filtros de fecha: formato legible en español y formato ISO para <time datetime>. */
  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("htmlDateString", (date) => new Date(date).toISOString().slice(0, 10));

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("content/blog/posts/*.md")
      .sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "dist"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
