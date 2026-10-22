"use strict";

/* Pestaña "Desarrollo WEB": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

module.exports = {
  layout: "base.njk",
  activeTab: "desarrollo",
  tabImage: "/assets/img/desarrollo-banner.webp",
  tabImageAlt: "Nave espacial con el símbolo de código sobre la Tierra",
  firstUrl: "/blog/desarrollo/",
  pageBase: "/blog/desarrollo/pagina/",
  pagination: {
    data: "collections.desarrollo",
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
      ? `/blog/desarrollo/pagina/${data.pagination.pageNumber + 1}/`
      : "/blog/desarrollo/"
};
