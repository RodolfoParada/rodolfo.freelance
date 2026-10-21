"use strict";

/* Pestaña "WordPress": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

module.exports = {
  layout: "base.njk",
  activeTab: "wordpress",
  tabImage: "/assets/img/wordpress-orbita.webp",
  tabImageAlt: "Logo de WordPress con planetas girando a su alrededor",
  firstUrl: "/blog/wordpress/",
  pageBase: "/blog/wordpress/pagina/",
  pagination: {
    data: "collections.wordpress",
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
      ? `/blog/wordpress/pagina/${data.pagination.pageNumber + 1}/`
      : "/blog/wordpress/"
};
