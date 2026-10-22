"use strict";

/* Pestaña "Atención al Cliente": primera página con destacado y dos filas de tres tarjetas; el resto de páginas, dos filas de tres. */

module.exports = {
  layout: "base.njk",
  activeTab: "atencion-cliente",
  tabImage: "/assets/img/atencion-cliente.webp",
  tabImageAlt: "Ejecutiva de atención al cliente con audífonos hablando por teléfono y tomando notas en su escritorio",
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
