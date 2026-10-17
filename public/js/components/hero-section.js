/* Componente <hero-section> — sección de Inicio / Home completa. */

(function () {
  "use strict";

  var PAINS = [
    {
      num: "01",
      title: "Falta de tiempo",
      text: "Atención rezagada a prospectos y clientes por atender urgencias."
    },
    {
      num: "02",
      title: "Operación atascada",
      text: "Catálogos sin actualizar, cotizaciones pendientes y compras desordenadas."
    },
    {
      num: "03",
      title: "Fricción digital",
      text: "Sitios lentos, redes descuidadas o miedo a pagar desarrollos inflados que nadie sabe mantener."
    }
  ];

  var HOME_PILLARS = [
    {
      badge: "Pilar 1",
      title: "Presencia & Conversión",
      subtitle: "Web & UX",
      items: [
        {
          title: "Desarrollo en WordPress & E-commerce",
          text: "Tiendas online y sitios corporativos rápidos, seguros y mantenibles."
        },
        {
          title: "Landing Pages & Rediseño",
          text: "Estructuras pensadas para convertir visitas en consultas comerciales."
        },
        {
          title: "Experiencia de Usuario (UX)",
          text: "Flujos simples, navegación intuitiva y cero trampas (Dark Patterns)."
        }
      ]
    },
    {
      badge: "Pilar 2",
      title: "Soporte Operativo & Comercial",
      subtitle: "Gestión & Crecimiento",
      items: [
        {
          title: "Prospección & Ventas (SDR)",
          text: "Contacto con prospectos, agendamiento de reuniones y gestión en CRM."
        },
        {
          title: "Atención al Cliente & Postventa",
          text: "Respuesta oportuna en WhatsApp, correo y plataformas digitales."
        },
        {
          title: "Operación E-commerce & Compras",
          text: "Carga de productos, fichas técnicas, cotizaciones y seguimiento de despachos."
        },
        {
          title: "Marketing & Redes",
          text: "Publicaciones coordinadas, campañas y administración web continua."
        }
      ]
    }
  ];

  var METRICS = [
    {
      title: "100% Código Heredable",
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
      k.el("p", "hero__eyebrow", k.attr(host, "eyebrow", "Desarrollador & Socio Operativo"))
    );

    var title = k.el("h1", "hero__title");
    title.appendChild(document.createTextNode("Menos complejidad. "));
    title.appendChild(k.el("span", null, "Más tecnología útil, ventas y orden operativo"));
    title.appendChild(document.createTextNode("."));
    hero.appendChild(title);

    hero.appendChild(
      k.el(
        "p",
        "hero__text",
        "Más que un proveedor tradicional, un socio integral: desarrollo soluciones web funcionales y me encargo de la gestión comercial y operativa para que tu negocio crezca sin inflar costes innecesarios."
      )
    );

    var actions = k.el("div", "hero__actions");
    var primary = k.el("a", "btn btn--primary", "Solicita diagnóstico");
    primary.href = "#contacto";
    var secondary = k.el("a", "btn btn--ghost", "Explorar servicios");
    secondary.href = "#desarrollo";
    actions.append(primary, secondary);
    hero.appendChild(actions);
    container.appendChild(hero);

    /* 2. Sección de Dolor / Empatía con el Cliente */
    var painBlock = k.el("div", "block home-pain");
    painBlock.appendChild(
      k.el(
        "p",
        "home-pain__lead",
        "“Emprender y gestionar un negocio en crecimiento no debería significar ahogarte en tareas operativas.”"
      )
    );
    var painGrid = k.el("div", "home-pain__grid");
    PAINS.forEach(function (item) {
      var card = k.el("article", "home-pain__card");
      card.appendChild(k.el("span", "home-pain__num", item.num));
      card.appendChild(k.el("h2", "home-pain__title", item.title));
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
      var col = k.el("article", "home-pillar flip");
      col.tabIndex = 0;
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
      body.appendChild(k.el("p", "home-metric__text", metric.text));
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
        "“No diseño sistemas inflados para cobrar más ni aplico marketing engañoso. Creo en la frugalidad tecnológica y en la honestidad de diagnóstico desde el primer minuto.”"
      )
    );
    var bridgeLink = k.el(
      "a",
      "home-bridge__link",
      "Conoce mi filosofía y principios no negociables →"
    );
    bridgeLink.href = "#acerca";
    bridge.appendChild(bridgeLink);
    container.appendChild(bridge);

    /* 6. Cierre con CTA Directo */
    container.appendChild(k.el("cta-banner"));

    section.appendChild(container);
    host.replaceChildren(section);
  }

  window.RFKIT.define("hero-section", render);
})();
