"use strict";

/* Pestaña "Todos": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

module.exports = {
  layout: "base.njk",
  activeTab: "todos",
  tabImage: "/assets/img/todo.webp",
  tabImageAlt: "Profesional trabajando frente a varias pantallas con desarrollo web, marketing digital, atención al cliente y una tienda online",
  firstUrl: "/blog/",
  pageBase: "/blog/pagina/",
  pagination: {
    data: "collections.posts",
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
      ? `/blog/pagina/${data.pagination.pageNumber + 1}/`
      : "/blog/"
};
