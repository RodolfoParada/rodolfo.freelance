"use strict";

/* Pestaña "Atención al Cliente": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

const tab = require("../../_data/blogTabs.json").find((t) => t.slug === "atencion-cliente");

module.exports = {
  layout: "base.njk",
  activeTab: "atencion-cliente",
  /* Imagen de portada: se define en content/_data/blogTabs.json. */
  tabImage: tab.image,
  tabImageAlt: tab.imageAlt,
  firstUrl: "/blog/atencion-cliente/",
  pageBase: "/blog/atencion-cliente/pagina/",
  pagination: {
    data: "collections.atencion-cliente",
    size: 1,
    alias: "chunk",
    before: (posts) => {
      const sorted = posts.slice().sort((a, b) => b.date - a.date);
      if (!sorted.length) return [{ items: [null] }];
      const chunks = [{ items: sorted.slice(0, 7) }];
      for (let i = 7; i < sorted.length; i += 6) chunks.push({ items: sorted.slice(i, i + 6) });
      return chunks;
    }
  },
  permalink: (data) =>
    data.pagination.pageNumber > 0
      ? `/blog/atencion-cliente/pagina/${data.pagination.pageNumber + 1}/`
      : "/blog/atencion-cliente/"
};
