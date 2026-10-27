/* Componente <about-section> — sección "Acerca de mí".
   Atributo opcional: section-id (por defecto "acerca"). */

(function () {
  "use strict";

  var PILLARS = [
    {
      num: "01",
      title: "Frugalidad Tecnológica",
      subtitle: "Diseño racional de sistemas: adecuación perfecta entre escala y herramienta.",
      meaning: "Elegir la solución más directa, eficiente y adecuada para tu etapa actual.",
      benefit: "Sales al mercado más rápido y evitas mantener sistemas que tu negocio no necesita."
    },
    {
      num: "02",
      title: "Experiencia de Usuario",
      subtitle: "Navegación limpia y flujos diseñados para humanos.",
      meaning: "Sitios diseñados con navegación intuitiva, procesos claros y simples.",
      benefit: "Generas confianza inmediata, facilitas la decisión de compra y construyes clientes fieles a largo plazo."
    },
    {
      num: "03",
      title: "Código Escalable",
      subtitle: "Sistemas limpios, bien documentados y fáciles de mantener.",
      meaning: "Código limpio y estructurado para evolucionar con tu negocio sin volverse un dolor de cabeza.",
      benefit: "Control absoluto sobre tus sistemas y libertad para escalar sin acumular deuda técnica."
    },
    {
      num: "04",
      title: "Privacidad y Datos Éticos",
      subtitle: "Cumplimiento normativo integrado y tranquilidad operativa.",
      meaning: "Capturar únicamente los datos indispensables para operar, mediante formularios claros, seguros y transparentes.",
      benefit: "Proteges la reputación de tu marca y cumples con los estándares legales de privacidad sin complicaciones."
    }
  ];

  var COMMITMENTS = [
    {
      title: "Honestidad en el diagnóstico",
      text: "Si tu problema se resuelve con una herramienta existente o una mejora puntual, te lo diré con claridad. Jamás te propondré un desarrollo nuevo si no es estrictamente necesario."
    },
    {
      title: "Comunicación clara y sin tecnicismos",
      text: "Reportes transparentes, estado real de cada proyecto y acompañamiento continuo."
    }
  ];

  var STACK = [
    {
      title: "Desarrollo Web & MVP",
      text: "Soluciones ágiles, estables y bien estructuradas. Desarrollo Web, Desarrollo en WordPress a medida (temas limpios, plugins funcionales, WooCommerce y landing pages de alta conversión) y arquitecturas modernas adaptadas a la escala real de tu proyecto."
    },
    {
      title: "Operación & Crecimiento",
      text: "Integración con herramientas de gestión comercial (CRM como HubSpot), analítica web, pauta digital en Meta y Google Ads, y soporte operativo diario para asegurar la continuidad de tu negocio."
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
      document.createTextNode("Soluciones digitales y soporte operativo para tu negocio.")
    );
    hero.appendChild(heroTitle);
    hero.appendChild(
      k.el("p", "about-hero__text", "Ayudo a startups y negocios en crecimiento a construir activos digitales sólidos: desde desarrollo web funcional y UX intuitivo, hasta la gestión operativa y comercial de cada día.")
    );

    var bridge = k.el("div", "about-bridge");
    bridge.appendChild(
      k.el(
        "blockquote",
        "about-bridge__quote",
        "“Desarrollo web a la medida de tu negocio y marketing con sentido estratégico. Apuesto por la frugalidad tecnológica y un diagnóstico honesto desde el primer minuto”."
      )
    );
    var bridgeLink = k.el(
      "a",
      "about-bridge__link",
      "Conoce mi filosofía y principios no negociables →"
    );
    bridgeLink.href = "#acerca";
    bridge.appendChild(bridgeLink);

    intro.append(hero, bridge);
    container.appendChild(intro);

    var pillarsBlock = k.el("div", "block");
    pillarsBlock.appendChild(k.blockTitle("Mis 4 Pilares de Trabajo", "Lo que ganas al colaborar conmigo"));
    var pillarsGrid = k.el("div", "pillars");
    PILLARS.forEach(function (pillar) {
      var card = k.el("article", "pillar flip");
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

        var panel = k.el("div", "commit-panel");
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabId);
        panel.setAttribute("id", panelId);
        panel.hidden = index !== 0;
        panel.appendChild(k.el("p", "commit-panel__text", item.text));
        panels.push(panel);
      });

      var tablist = k.el("div", "commit-tabs__list");
      tablist.setAttribute("role", "tablist");
      tablist.setAttribute("aria-label", ariaLabel);
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

    /* "Mi Compromiso" y "Cómo abordamos tu proyecto": una tarjeta con los dos bloques lado a lado,
       justo debajo de los 4 pilares. El CTA va a continuación, a todo el ancho. */
    var commit = k.el("div", "block");
    commit.appendChild(k.blockTitle("Mi Compromiso", "No Negociable"));
    commit.appendChild(buildTabs(COMMITMENTS, "commit", "Mis compromisos"));

    var stack = k.el("div", "block");
    stack.appendChild(k.blockTitle("Cómo abordamos tu proyecto", "Stack adaptable"));
    stack.appendChild(buildTabs(STACK, "stack", "Cómo abordamos tu proyecto"));

    var commitments = k.el("div", "about-commitments");
    commitments.append(commit, stack);
    container.appendChild(commitments);

    var ctaSlot = k.el("div", "about-cta-slot");
    ctaSlot.appendChild(k.el("cta-banner"));
    container.appendChild(ctaSlot);

    container.appendChild(
      k.el("p", "stack__quote", "“Las herramientas se eligen en función del problema, no de la moda”.")
    );

    section.appendChild(container);
    host.replaceChildren(section);
  }

  window.RFKIT.define("about-section", render);
})();
