"use strict";

/* Pestaña "Administración & E-Commerce": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

const tab = require("../../_data/blogTabs.json").find((t) => t.slug === "administracion-ecommerce");

module.exports = {
  layout: "base.njk",
  activeTab: "administracion-ecommerce",
  /* Imagen de portada: se define en content/_data/blogTabs.json. */
  tabImage: tab.image,
  tabImageAlt: tab.imageAlt,
  firstUrl: "/blog/administracion-ecommerce/",
  pageBase: "/blog/administracion-ecommerce/pagina/",
  pagination: {
    data: "collections.administracion-ecommerce",
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
      ? `/blog/administracion-ecommerce/pagina/${data.pagination.pageNumber + 1}/`
      : "/blog/administracion-ecommerce/"
};
