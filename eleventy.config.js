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

  /* "Sigue leyendo": artículos del mismo tema (pestaña) primero, del más reciente al más antiguo, sin el actual.
     Si el tema no alcanza el límite, completa con artículos de otros temas. `posts` ya viene ordenado por fecha. */
  eleventyConfig.addFilter("relatedPosts", (posts, currentUrl, tag, limit = 4) => {
    const others = posts.filter((post) => post.url !== currentUrl);
    const hasTag = (post) => [].concat(post.data.tags || []).includes(tag);
    return others.filter(hasTag).concat(others.filter((post) => !hasTag(post))).slice(0, limit);
  });

  /* Enlaces externos (a otro dominio): se abren en una pestaña nueva, de forma segura (noopener)
     y avisando a los lectores de pantalla. Los enlaces al propio sitio no cambian. */
  eleventyConfig.addTransform("external-links", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replace(
      /<a href="(https?:\/\/(?!(?:www\.)?rodolfofreelance\.cl)[^"]+)"((?:(?!target=)[^>])*)>([\s\S]*?)<\/a>/g,
      (match, href, attrs, text) =>
        `<a href="${href}"${attrs} target="_blank" rel="noopener noreferrer">${text}<span class="visually-hidden"> (se abre en una pestaña nueva)</span></a>`
    );
  });

  /* Bloque CTA del final de cada artículo. Uso en un .md:
       {% blogCta "Título", "Texto" %}                                     → botón "Agenda tu reunión" a /#contacto
       {% blogCta "Título", "Texto", "Conoce cómo trabajo", "/como-trabajo/" %} → botón y enlace propios */
  eleventyConfig.addShortcode(
    "blogCta",
    (title, text, buttonText = "Agenda tu reunión", href = "/#contacto") =>
      `<div class="blog-cta">
  <div>
    <p class="blog-cta__title">${title}</p>
    <p class="blog-cta__text">${text}</p>
  </div>
  <a class="btn btn--primary" href="${href}">${buttonText}</a>
</div>`
  );

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
