/* Componente <hero-section> — sección de Inicio / Home completa. */

(function () {
  "use strict";

  var PAINS = [
    {
      num: "01",
      title: "Falta de tiempo",
      text: "Atención rezagada a prospectos y clientes por atender urgencias diarias."
    },
    {
      num: "02",
      title: "Operación atascada",
      text: "Catálogos sin actualizar, cotizaciones pendientes y compras desordenadas."
    },
    {
      num: "03",
      title: "Fricción digital",
      text: "Sitios web lentos, redes desatendidas y sistemas difíciles de mantener."
    }
  ];

  var HOME_PILLARS = [
    {
      badge: "Pilar 1",
      title: "Presencia & Conversión",
      subtitle: "Webs y landing pages que explican, generan confianza y convierten visitas en oportunidades",
      variant: "primary",
      items: [
        {
          title: "Desarrollo en WordPress & E-commerce",
          text: "Tiendas online y sitios corporativos rápidos, seguros y fáciles de mantener."
        },
        {
          title: "Landing Pages & Rediseño",
          text: "Estructuras visuales pensadas para convertir visitas en consultas comerciales."
        },
        {
          title: "Experiencia de Usuario (UX)",
          text: "Flujos claros, navegación intuitiva y sin patrones oscuros."
        }
      ]
    },
    {
      badge: "Pilar 2",
      title: "Soporte Operativo & Comercial",
      subtitle: "Ordenamos tu día para que vender y gestionar no dependa de apagar incendios.",
      items: [
        {
          title: "Prospección & Ventas (SDR)",
          text: "Contacto con prospectos calificados, agendamiento de reuniones y gestión en CRM."
        },
        {
          title: "Atención al Cliente & Posventa",
          text: "Respuesta oportuna y seguimiento en WhatsApp, correo y canales digitales."
        },
        {
          title: "Operación E-commerce & Compras",
          text: "Carga de productos, fichas técnicas, cotización a proveedores y seguimiento de despachos."
        },
        {
          title: "Marketing & Redes",
          text: "Publicaciones coordinadas, gestión de campañas y actualización continua de contenidos."
        }
      ]
    }
  ];

  var METRICS = [
    {
      title: "100% Código Escalable",
      text: "Sin dependencias forzadas ni sobreingeniería."
    },
    {
      title: "Optimización Real",
      text: "Sitios ligeros con foco en conversión, no en métricas vanidosas."
    },
    {
      title: "Acompañamiento Directo",
      text: "Un solo interlocutor técnico y operativo para resolver dudas."
    }
  ];

  function render(host) {
    var k = window.RFKIT;
    var id = k.attr(host, "section-id", "inicio");
    var section = k.sectionShell(id, "section--hero");
    var container = k.el("div", "container");

    /* 1. Hero Section (Captar en 5 segundos) */
    var hero = k.el("div", "hero");
    hero.appendChild(
      k.el("h1", "hero__eyebrow", k.attr(host, "eyebrow", "DESARROLLO WEB & GESTIÓN OPERATIVA"))
    );
    hero.appendChild(k.el("p", "hero__location", "Servicios 100% remoto para negocios de todo Chile"));

    var title = k.el("h2", "hero__title");
    title.appendChild(document.createTextNode("Menos complejidad. "));
    title.appendChild(k.el("span", null, "Más tecnología útil, eficiencia y control"));
    title.appendChild(document.createTextNode("."));
    hero.appendChild(title);

    hero.appendChild(
      k.el(
        "p",
        "hero__text",
        "Desarrollo soluciones digitales a tu medida y asumo la carga operativa diaria: catálogo al día, prospectos atendidos y procesos en orden."
      )
    );

    var actions = k.el("div", "hero__actions");
    var primary = k.el("a", "btn btn--primary", "Agenda tu reunión");
    primary.href = "#contacto";
    var secondary = k.el("a", "btn btn--ghost", "Explorar servicios");
    secondary.href = "#desarrollo";
    actions.append(primary, secondary);
    hero.appendChild(actions);
    container.appendChild(hero);

    /* 2. Sección de Dolor / Empatía con el Cliente */
    var painBlock = k.el("div", "block home-pain");
    var painIntro = k.el("div", "home-pain__intro");
    painIntro.appendChild(
      k.el("p", "home-pain__eyebrow", "El punto de partida")
    );
    var painHeading = k.el("h2", "home-pain__heading");
    painHeading.appendChild(document.createTextNode("Libera tiempo para hacer crecer tu empresa; "));
    painHeading.appendChild(k.el("span", null, "delega la tecnología y la operación."));
    painIntro.appendChild(painHeading);
    painIntro.appendChild(
      k.el(
        "p",
        "home-pain__lead",
        "“Emprender y gestionar un negocio en crecimiento no debería significar ahogarte en tareas operativas”."
      )
    );
    painBlock.appendChild(painIntro);

    var painGrid = k.el("div", "home-pain__grid");
    PAINS.forEach(function (item) {
      var card = k.el("article", "home-pain__card");
      card.appendChild(k.el("span", "home-pain__num", item.num));
      card.appendChild(k.el("h3", "home-pain__title", item.title));
      card.appendChild(k.el("p", "home-pain__text", item.text));
      painGrid.appendChild(card);
    });
    painBlock.appendChild(painGrid);
    container.appendChild(painBlock);

    /* 3. Servicios en 2 Pilares (Orden Mental) */
    var pillarsBlock = k.el("div", "block");
    pillarsBlock.appendChild(k.blockTitle("Servicios en 2 Pilares", "Soluciones integrales para tu negocio"));
    var pillarsGrid = k.el("div", "home-pillars");
    HOME_PILLARS.forEach(function (pillar) {
      var pillarClass = "home-pillar flip" + (pillar.variant ? " home-pillar--" + pillar.variant : "");
      var col = k.el("article", pillarClass);
      col.setAttribute(
        "aria-label",
        pillar.badge + ": " + pillar.title + (pillar.subtitle ? " - " + pillar.subtitle : "")
      );

      var inner = k.el("div", "home-pillar__inner3d");

      var front = k.el("div", "home-pillar__face home-pillar__face--front");
      front.appendChild(k.el("span", "home-pillar__badge", pillar.badge));
      var h3 = k.el("h3", "home-pillar__title", pillar.title);
      if (pillar.subtitle) h3.appendChild(k.el("span", null, pillar.subtitle));
      front.appendChild(h3);
      front.appendChild(k.flipHint());
      inner.appendChild(front);

      var back = k.el("div", "home-pillar__face home-pillar__face--back");
      var list = k.el("ul", "home-pillar__list");
      pillar.items.forEach(function (sub) {
        var li = k.el("li", "home-pillar__item");
        li.appendChild(k.el("h4", "home-pillar__item-title", sub.title));
        li.appendChild(k.el("p", "home-pillar__item-text", sub.text));
        list.appendChild(li);
      });
      back.appendChild(list);
      inner.appendChild(back);

      col.appendChild(inner);
      k.bindFlipCard(col);

      pillarsGrid.appendChild(col);
    });
    pillarsBlock.appendChild(pillarsGrid);
    container.appendChild(pillarsBlock);

    /* 4. Prueba Social / Métricas Clave */
    var metricsBlock = k.el("div", "block");
    var metricsGrid = k.el("div", "home-metrics");
    METRICS.forEach(function (metric) {
      var card = k.el("article", "home-metric");
      var dot = k.el("span", "home-metric__icon", "✓");
      dot.setAttribute("aria-hidden", "true");
      var body = k.el("div", "home-metric__body");
      body.appendChild(k.el("h3", "home-metric__title", metric.title));
      card.append(dot, body);
      metricsGrid.appendChild(card);
    });
    metricsBlock.appendChild(metricsGrid);
    container.appendChild(metricsBlock);

    /* 5. Puente hacia tu Filosofía (Mini About) */
    var bridge = k.el("div", "home-bridge");
    bridge.appendChild(
      k.el(
        "blockquote",
        "home-bridge__quote",
        "“Desarrollo web a la medida de tu negocio y marketing con sentido estratégico. Apuesto por la frugalidad tecnológica y un diagnóstico honesto desde el primer minuto”."
      )
    );
    var bridgeLink = k.el(
      "a",
      "home-bridge__link",
      "Conoce mi filosofía y principios no negociables →"
    );
    bridgeLink.href = "#acerca";
    bridge.appendChild(bridgeLink);

    /* 6. Cierre: cita a la izquierda + CTA Directo */
    var close = k.el("div", "home-close");
    close.appendChild(bridge);
    close.appendChild(k.el("cta-banner"));
    container.appendChild(close);

    section.appendChild(container);
    host.replaceChildren(section);
  }

  window.RFKIT.define("hero-section", render);
})();
