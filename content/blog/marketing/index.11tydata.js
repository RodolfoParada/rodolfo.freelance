"use strict";

/* Pestaña "Marketing Digital": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

module.exports = {
  layout: "base.njk",
  activeTab: "marketing",
  tabImage: "/assets/img/marketing-banner.webp",
  tabImageAlt: "Ilustración de marketing digital",
  firstUrl: "/blog/marketing/",
  pageBase: "/blog/marketing/pagina/",
  pagination: {
    data: "collections.marketing",
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
      ? `/blog/marketing/pagina/${data.pagination.pageNumber + 1}/`
      : "/blog/marketing/"
};
