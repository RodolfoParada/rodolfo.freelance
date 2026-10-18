/* Componente <about-section> — sección "Acerca de mí".
   Atributo opcional: section-id (por defecto "acerca"). */

(function () {
  "use strict";

  var PILLARS = [
    {
      num: "01",
      title: "Frugalidad Tecnológica",
      subtitle: "Simplicidad Radical",
      meaning: "Elegir siempre la solución más simple, eficiente y rentable para tu etapa actual. Si tu negocio resuelve su necesidad con WordPress bien optimizado, una landing ágil o una automatización básica, jamás te empujaré a desarrollar software a medida costoso de mantener.",
      benefit: "Cuidas tu presupuesto de inicio y lanzas al mercado rápido, sin quemar caja en herramientas que no usarás."
    },
    {
      num: "02",
      title: "Experiencia de Usuario sin Trampas",
      subtitle: "Cero Dark Patterns",
      meaning: "Construir flujos de compra y navegación transparentes. No implemento contadores regresivos falsos, casillas de suscripción ocultas ni trabas mañosas para darse de baja.",
      benefit: "Tu marca construye reputación, credibilidad y lealtad a largo plazo. Las ventas llegan por el valor real de tu producto, no por manipulación psicológica."
    },
    {
      num: "03",
      title: "Sostenibilidad y Código Heredable",
      subtitle: null,
      meaning: "Diseño y configuro plataformas pensadas para durar. Código limpio, plugins estrictamente necesarios y documentación clara para que cualquier profesional pueda continuarlo mañana sin dolores de cabeza.",
      benefit: "Cero dependencia tóxica. Eres dueño absoluto de tu infraestructura y evitas acumular deuda técnica que detenga tu crecimiento."
    },
    {
      num: "04",
      title: "Privacidad y Datos Éticos",
      subtitle: null,
      meaning: "Recolectar únicamente la información que tu servicio necesita para operar con excelencia. Flujos limpios, seguros y respetuosos con la privacidad de tus usuarios.",
      benefit: "Blindaje de reputación frente a tus clientes y cumplimiento natural con estándares digitales modernos."
    }
  ];

  var COMMITMENTS = [
    {
      title: "Honestidad en el diagnóstico",
      text: "Si al analizar tu requerimiento descubro que no necesitas pagar por un desarrollo nuevo y puedes resolverlo con una herramienta existente o un ajuste menor, te lo diré de frente antes de cobrarte un solo peso."
    },
    {
      title: "Comunicación clara y sin tecnicismos",
      text: "Reportes transparentes, estado real de los proyectos y acompañamiento cercano."
    }
  ];

  var STACK = [
    {
      title: "Desarrollo Web & MVP",
      text: "Especializado en soluciones ágiles y robustas. Desarrollo en WordPress a medida (themes limpios, plugins funcionales, tiendas WooCommerce y landings de alta conversión) y arquitecturas modernas según la escala y requerimiento del proyecto."
    },
    {
      title: "Operación & Crecimiento",
      text: "Integración con herramientas de gestión comercial (CRM como HubSpot), analítica, pauta digital (Meta / Google Ads) y soporte administrativo/operativo para que la rueda no se detenga."
    }
  ];

  function labeledText(k, label, text) {
    var group = k.el("div", "pillar__group");
    group.appendChild(k.el("p", "pillar__label", label));
    group.appendChild(k.el("p", "pillar__text", text));
    return group;
  }

  function render(host) {
    var k = window.RFKIT;
    var section = k.sectionShell(k.attr(host, "section-id", "acerca"), "section--about");
    var container = k.el("div", "container");

    var intro = k.el("div", "about-intro");

    var hero = k.el("header", "about-hero");
    hero.appendChild(k.el("p", "about-hero__eyebrow", "Filosofía & Método de Trabajo"));

    var heroTitle = k.el("h2", "about-hero__title");
    heroTitle.appendChild(
      document.createTextNode("Tecnología sobria, marketing honesto y foco en lo que tu negocio ")
    );
    heroTitle.appendChild(k.el("span", null, "realmente necesita"));
    heroTitle.appendChild(document.createTextNode("."));
    hero.appendChild(heroTitle);
    hero.appendChild(
      k.el("p", "about-hero__text", "Ayudo a startups y negocios en crecimiento a construir activos digitales sólidos: desde desarrollo web funcional y UX intuitivo, hasta la gestión operativa y comercial de cada día. Sin sobrecostes, sin complejidades innecesarias y sin falsas promesas.")
    );

    var manifesto = k.el("div", "manifesto");
    manifesto.appendChild(
      k.el("blockquote", "manifesto__quote", "“El mundo digital está lleno de sistemas sobredimensionados para alimentar egos técnicos y campañas basadas en trucos de urgencia falsa. Yo trabajo desde la vereda opuesta.”")
    );
    manifesto.appendChild(
      k.el("p", "manifesto__text", "Creo firmemente que la tecnología debe resolver problemas reales de la forma más directa, económica y limpia posible. Mi trabajo combina dos mundos que rara vez se comunican bien: la ingeniería práctica (para que todo funcione rápido, seguro y sin fallas) y la operación de negocio (para que el sitio venda, los leads se atiendan y la administración fluya).")
    );

    intro.append(hero, manifesto);
    container.appendChild(intro);

    var pillarsBlock = k.el("div", "block");
    pillarsBlock.appendChild(k.blockTitle("Mis 4 Pilares de Trabajo", "Lo que ganas al colaborar conmigo"));
    var pillarsGrid = k.el("div", "pillars");
    PILLARS.forEach(function (pillar) {
      var card = k.el("article", "pillar flip");
      card.tabIndex = 0;
      card.setAttribute("aria-label", pillar.title + (pillar.subtitle ? " - " + pillar.subtitle : ""));
      var inner = k.el("div", "pillar__inner3d");
      var front = k.el("div", "pillar__face pillar__face--front");
      front.appendChild(k.el("span", "pillar__num", pillar.num));
      var title = k.el("h3", "pillar__title", pillar.title);
      if (pillar.subtitle) title.appendChild(k.el("span", null, pillar.subtitle));
      front.appendChild(title);
      front.appendChild(k.flipHint());
      inner.appendChild(front);
      var back = k.el("div", "pillar__face pillar__face--back");
      var g1 = labeledText(k, "Qué significa", pillar.meaning);
      var g2 = labeledText(k, "Tu beneficio", pillar.benefit);
      back.appendChild(g1);
      back.appendChild(g2);
      inner.appendChild(back);
      card.appendChild(inner);
      k.bindFlipCard(card);

      pillarsGrid.appendChild(card);
    });
    pillarsBlock.appendChild(pillarsGrid);
    container.appendChild(pillarsBlock);

    function buildTabs(items, idPrefix, ariaLabel) {
      var tabsRoot = k.el("div", "commit-tabs");
      tabsRoot.setAttribute("role", "tablist");
      tabsRoot.setAttribute("aria-label", ariaLabel);

      var tabButtons = [];
      var panels = [];

      items.forEach(function (item, index) {
        var tabId = idPrefix + "-tab-" + index;
        var panelId = idPrefix + "-panel-" + index;

        var btn = k.el("button", "commit-tab", item.title);
        btn.setAttribute("type", "button");
        btn.setAttribute("role", "tab");
        btn.setAttribute("id", tabId);
        btn.setAttribute("aria-controls", panelId);
        btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
        btn.setAttribute("tabindex", index === 0 ? "0" : "-1");
        tabButtons.push(btn);

        var panel = k.el("article", "commit-panel");
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabId);
        panel.setAttribute("id", panelId);
        panel.hidden = index !== 0;
        panel.appendChild(k.el("p", "commit-panel__text", item.text));
        panels.push(panel);
      });

      var tablist = k.el("div", "commit-tabs__list");
      tabButtons.forEach(function (b) {
        tablist.appendChild(b);
      });

      var panelsContainer = k.el("div", "commit-tabs__panels");
      panels.forEach(function (p) {
        panelsContainer.appendChild(p);
      });

      tabsRoot.appendChild(tablist);
      tabsRoot.appendChild(panelsContainer);

      function activateTab(index) {
        tabButtons.forEach(function (btn, i) {
          var isActive = i === index;
          btn.setAttribute("aria-selected", isActive ? "true" : "false");
          btn.setAttribute("tabindex", isActive ? "0" : "-1");
        });
        panels.forEach(function (panel, i) {
          panel.hidden = i !== index;
        });
      }

      tabButtons.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          activateTab(index);
        });

        btn.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            var dir = e.key === "ArrowRight" ? 1 : -1;
            var newIndex = (index + dir + tabButtons.length) % tabButtons.length;
            tabButtons[newIndex].focus();
            activateTab(newIndex);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activateTab(index);
          }
        });
      });

      return tabsRoot;
    }

    var aboutSplit = k.el("div", "about-split");
    var aboutMain = k.el("div", "about-split__main");
    var aboutAside = k.el("div", "about-split__aside");

    var commit = k.el("div", "block");
    commit.appendChild(k.blockTitle("Mi Compromiso", "No Negociable"));
    commit.appendChild(buildTabs(COMMITMENTS, "commit", "Mis compromisos"));

    var stack = k.el("div", "block");
    stack.appendChild(k.blockTitle("Cómo abordamos tu proyecto", "Stack adaptable"));
    stack.appendChild(buildTabs(STACK, "stack", "Cómo abordamos tu proyecto"));

    aboutMain.append(
      commit,
      stack,
      k.el("p", "stack__quote", "“Las herramientas se eligen en función del problema, no de la moda.”")
    );
    aboutAside.appendChild(k.el("cta-banner"));

    aboutSplit.append(aboutMain, aboutAside);
    container.appendChild(aboutSplit);

    section.appendChild(container);
    host.replaceChildren(section);
  }

  window.RFKIT.define("about-section", render);
})();
