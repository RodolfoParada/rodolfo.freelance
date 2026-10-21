"use strict";

/* Pestaña "Prospección Comercial": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

module.exports = {
  layout: "base.njk",
  activeTab: "prospeccion",
  tabImage: "/assets/img/prospeccion-comercial.webp",
  tabImageAlt: "Robot con audífonos haciendo varias llamadas comerciales a la vez desde un escritorio con teléfonos",
  firstUrl: "/blog/prospeccion/",
  pageBase: "/blog/prospeccion/pagina/",
  pagination: {
    data: "collections.prospeccion",
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
      ? `/blog/prospeccion/pagina/${data.pagination.pageNumber + 1}/`
      : "/blog/prospeccion/"
};
