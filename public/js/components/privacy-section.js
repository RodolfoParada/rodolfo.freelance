/* Componente <privacy-section> — sección de Política de Privacidad con índice lateral y acordeón.
   Atributos opcionales: section-id, eyebrow, title, lead. */

(function () {
  "use strict";

  var LAYOUT = `
    <div class="container legal">
      <div class="legal-layout" data-legal-accordion>
        <!-- Índice lateral -->
        <aside class="legal-nav" aria-label="Índice de Política de Privacidad">
          <p class="legal-nav__heading">CONTENIDO</p>
          <ol class="legal-nav__list">
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link is-active" data-legal-target="sec-1">
                <span class="legal-nav__num">1</span>
                <span class="legal-nav__label">Ámbito de Aplicación y Responsable</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-2">
                <span class="legal-nav__num">2</span>
                <span class="legal-nav__label">Datos Personales que Recopilamos</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-3">
                <span class="legal-nav__num">3</span>
                <span class="legal-nav__label">Finalidades y Bases de Licitud (Art. 12 y 13 de la Ley)</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-4">
                <span class="legal-nav__num">4</span>
                <span class="legal-nav__label">Confidencialidad y Terceros</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-5">
                <span class="legal-nav__num">5</span>
                <span class="legal-nav__label">Seguridad, Cookies y Medición</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-6">
                <span class="legal-nav__num">6</span>
                <span class="legal-nav__label">Conservación de los Datos</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-7">
                <span class="legal-nav__num">7</span>
                <span class="legal-nav__label">Derechos del Titular y Procedimiento (Ley N° 21.719)</span>
              </button>
            </li>
            <li class="legal-nav__item">
              <button type="button" class="legal-nav__link" data-legal-target="sec-8">
                <span class="legal-nav__num">8</span>
                <span class="legal-nav__label">Modificaciones y Ley Aplicable</span>
              </button>
            </li>
          </ol>
        </aside>

        <!-- Acordeón principal -->
        <div class="legal-accordion">
          <!-- 1 -->
          <article class="legal-item is-open" id="sec-1" data-legal-item="sec-1">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="true" aria-controls="panel-sec-1">
                <span class="legal-item__badge">1</span>
                <span class="legal-item__title">Ámbito de Aplicación y Responsable</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-1" role="region">
              <div class="legal-item__body">
                <h3 class="legal-item__sub">1.1. IDENTIFICACIÓN DEL RESPONSABLE</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Responsable del tratamiento: <strong>Rodolfo Parada</strong>, persona natural que actúa como responsable directo bajo la marca de servicios profesionales Rodolfo-Freelance. No ha designado encargado de prevención ni representante legal externo.</li>
                  <li class="legal-item__bullet">Correo electrónico oficial: <a class="legal__link" href="mailto:desarrollador.freelance7@gmail.com">desarrollador.freelance7@gmail.com</a>.</li>
                  <li class="legal-item__bullet">Modalidad: Prestación remota de servicios de desarrollo de software y marketing desde Chile.</li>
                  <li class="legal-item__bullet">Versión de la política: v3.0 (Vigente desde: 4 de noviembre de 2026).</li>
                </ul>

                <h3 class="legal-item__sub">1.2. ALCANCE</h3>
                <p class="legal-item__text">
                  La presente política regula el tratamiento de datos personales conforme a la Ley N° 19.628 y sus modificaciones introducidas por la Ley N° 21.719. Aplica a los datos recopilados mediante formularios de contacto, canales oficiales y en la relación precontractual o contractual con nuestros clientes.
                </p>
                <h3 class="legal-item__sub">1.3. CANAL PARA SOLICITUDES Y EJERCICIO DE DERECHOS</h3>
                <p class="legal-item__text">Para cualquier solicitud, comunicación o ejercicio de los derechos reconocidos por la ley, el titular puede dirigirse a los siguientes canales electrónicos permanentes y gratuitos:</p>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Correo electrónico:</strong> <a class="legal__link" href="mailto:desarrollador.freelance7@gmail.com">desarrollador.freelance7@gmail.com</a>.</li>
                  <li class="legal-item__bullet"><strong>Formulario web:</strong> el formulario de contacto disponible en este sitio (<a class="legal__link" href="index.html#contacto">ir al formulario</a>).</li>
                </ul>
              </div>
            </div>
          </article>

          <!-- 2 -->
          <article class="legal-item" id="sec-2" data-legal-item="sec-2">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-2">
                <span class="legal-item__badge">2</span>
                <span class="legal-item__title">Datos Personales que Recopilamos</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-2" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">2.1. DATOS ENTREGADOS EN EL FORMULARIO</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Nombre completo:</strong> para dirigirnos a ti de forma personalizada.</li>
                  <li class="legal-item__bullet"><strong>Teléfono:</strong> para agilizar la coordinación si prefieres contacto directo.</li>
                  <li class="legal-item__bullet"><strong>Correo electrónico:</strong> para enviarte nuestra respuesta técnica o propuesta comercial formal.</li>
                  <li class="legal-item__bullet"><strong>Servicio de interés:</strong> el servicio que eliges entre las siguientes opciones: Desarrollo Web a Medida; Ecosistema WordPress; Rediseño Web &amp; UX; Auditoría Web; Auditoría UX; Desarrollo de MVP; Marketing Digital &amp; Redes Sociales; Soporte Comercial &amp; Prospección (SDR / BDR); Atención al Cliente &amp; Fidelización; Soporte Administrativo &amp; E-commerce; u Otro / Consulta general.</li>
                  <li class="legal-item__bullet"><strong>Detalles del proyecto:</strong> texto libre donde describes tu negocio, tu sitio web actual, tus objetivos, plazos y cualquier otra información que decidas compartir. Esta información se usa para elaborar un diagnóstico honesto y acorde a tus objetivos.</li>
                </ul>

                <h3 class="legal-item__sub">2.2. REFERENCIAS Y ARCHIVOS OPCIONALES</h3>
                <p class="legal-item__text">
                  En caso de adjuntar un documento o referencia visual en tu solicitud, la información contenida será utilizada únicamente como antecedente para dimensionar tu requerimiento.
                </p>
                <p class="legal-item__text"><strong>Datos de carácter sensible e imágenes adjuntas.</strong> Te solicitamos no incluir datos sensibles (tales como información de salud, origen étnico, convicciones religiosas, políticas o datos biométricos) ni en los campos de texto ni en las imágenes o archivos adjuntos. Las imágenes compartidas deben limitarse exclusivamente a capturas técnicas, bocetos o referencias necesarias para evaluar tu requerimiento. Si envías información sensible no requerida, dicha información podrá ser descartada o eliminada para resguardar tu privacidad.</p>
                <h3 class="legal-item__sub">2.3. PERSONAS CUYOS DATOS TRATAMOS</h3>
                <p class="legal-item__text">Tratamos datos de las personas naturales, o de los representantes de empresas, que completan el formulario de contacto de este sitio para solicitar una cotización o consultar por servicios de desarrollo web o marketing. También tratamos datos de los visitantes del sitio, solo cuando aceptan las cookies de medición descritas en el punto 5.2.</p>
                <p class="legal-item__text"><strong>Origen de los datos.</strong> Los datos del formulario los entregas tú directamente al completarlo. Los datos de medición provienen de tu navegación en el sitio y solo se recogen si aceptas las cookies descritas en el punto 5.2. No obtenemos datos de fuentes de acceso público ni de terceros.</p>
              </div>
            </div>
          </article>

          <!-- 3 -->
          <article class="legal-item" id="sec-3" data-legal-item="sec-3">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-3">
                <span class="legal-item__badge">3</span>
                <span class="legal-item__title">Finalidades y Bases de Licitud (Art. 12 y 13 de la Ley)</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-3" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">3.1. GESTIÓN PRECONTRACTUAL Y CONTRACTUAL (Art. 13, letra c)</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Tratamos nombre, correo, teléfono y detalles del proyecto con el propósito exclusivo de emitir cotizaciones, diagnósticos técnicos y coordinar propuestas comerciales a solicitud del titular (medidas precontractuales).</li>
                  <li class="legal-item__bullet">En caso de contratación, el tratamiento se funda en la ejecución del contrato y la gestión administrativa y de facturación correspondiente.</li>
                </ul>

                <h3 class="legal-item__sub">3.2. COMUNICACIONES COMERCIALES (Art. 12)</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Enviamos publicidad y comunicaciones comerciales sobre nuestros servicios, como ofertas y novedades, solo a las personas que marcan la casilla opcional del formulario de contacto. Esa casilla es la única base para este envío: se trata de un consentimiento previo, libre, específico e inequívoco. Conservamos tus datos para enviarte publicidad mientras mantengas tu consentimiento. Si durante 24 meses seguidos no abres nuestros correos ni haces clic en sus enlaces, eliminamos tus datos de la lista de envíos. Puedes retirarlo en cualquier momento, de forma gratuita, escribiendo al correo indicado en el punto 1.3. Retirar el consentimiento no afecta a los datos tratados antes de ese momento.</li>
                </ul>

                <h3 class="legal-item__sub">3.3. ROL DE ENCARGADO DE TRATAMIENTO (Art. 15 bis)</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">En la prestación de servicios de asistente de marketing y desarrollo web que impliquen acceso a bases de datos de clientes, actuamos exclusivamente en calidad de encargado o mandatario, procesando información bajo las instrucciones estrictas y confidenciales del cliente responsable.</li>
                </ul>
                <h3 class="legal-item__sub">3.4. DECISIONES AUTOMATIZADAS Y PERFILAMIENTO (Art. 14 ter, letra l, y Art. 8 bis)</h3>
                <p class="legal-item__text">No adoptamos decisiones basadas exclusivamente en el tratamiento automatizado de tus datos personales que produzcan efectos jurídicos sobre ti o que te afecten significativamente. Utilizamos los segmentos de audiencia y las métricas predeterminadas de Google Analytics para evaluar y analizar, de forma estadística y agregada, el rendimiento técnico, la navegación y el uso general de este sitio web. Esa información no se utiliza para adoptar decisiones individuales ni para segmentación discriminatoria.</p>
              </div>
            </div>
          </article>

          <!-- 4 -->
          <article class="legal-item" id="sec-4" data-legal-item="sec-4">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-4">
                <span class="legal-item__badge">4</span>
                <span class="legal-item__title">Confidencialidad y Terceros</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-4" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">4.1. RESERVA PROFESIONAL</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Toda idea, modelo de negocio o información técnica compartida es tratada bajo estricta confidencialidad.</li>
                  <li class="legal-item__bullet">No vendemos, alquilamos ni cedemos bases de datos a terceros bajo ninguna circunstancia.</li>
                </ul>

                <h3 class="legal-item__sub">4.2. EXCEPCIONES LEGALES</h3>
                <p class="legal-item__text">
                  Únicamente se podrá revelar información cuando exista un requerimiento formal de una autoridad competente conforme a la legislación chilena vigente.
                </p>

                <h3 class="legal-item__sub">4.3. DESTINATARIOS DE LOS DATOS</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Netlify:</strong> aloja este sitio y recibe los datos del formulario de contacto en su servidor, antes de enviarlos por correo electrónico.</li>
                  <li class="legal-item__bullet"><strong>Google (correo electrónico):</strong> recibe el correo con los datos de tu solicitud en la casilla de correo del responsable.</li>
                  <li class="legal-item__bullet"><strong>Herramientas de coordinación y videocomunicación:</strong> Google LLC (a través de los servicios Google Meet y Google Calendar) recibe datos de identificación y contacto, como nombre y correo electrónico, en calidad de proveedor tecnológico para la programación de reuniones, la gestión de agenda y la realización de sesiones de trabajo o asesoría remota.</li>
                  <li class="legal-item__bullet"><strong>Google (Tag Manager y Analytics) y Microsoft (Clarity):</strong> reciben los datos de medición descritos en el punto 5.2, solo si aceptas las cookies de medición. No reciben los datos de contacto que escribes en el formulario.</li>
                </ul>
                <h3 class="legal-item__sub">4.4. TRANSFERENCIA INTERNACIONAL DE DATOS</h3>
                <p class="legal-item__text">Algunos de los proveedores indicados en el punto 4.3 tratan los datos fuera de Chile:</p>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Netlify:</strong> procesa los datos en servidores de Amazon Web Services, en la región de Virginia, Estados Unidos.</li>
                  <li class="legal-item__bullet"><strong>Google (correo electrónico):</strong> en cuentas personales, Google no permite elegir el país donde se guardan los datos, porque sus servidores están repartidos en distintos países. Los datos se cifran al enviarse y mientras se guardan.</li>
                  <li class="legal-item__bullet"><strong>Microsoft Clarity:</strong> procesa y almacena los datos principalmente en Estados Unidos, en centros de datos de Microsoft Azure.</li>
                </ul>
                <p class="legal-item__text"><strong>Garantías.</strong> Aceptamos los términos y políticas de privacidad de Netlify, Google y Microsoft. Netlify y Microsoft declaran cumplir los compromisos de protección de datos incluidos en esos términos. Google declara que cifra los datos durante su envío y mientras se guardan.</p>
                <p class="legal-item__text">Si la Agencia de Protección de Datos Personales determina que algún país tiene un nivel adecuado de protección, esta sección se actualizará.</p>
              </div>
            </div>
          </article>

          <!-- 5 -->
          <article class="legal-item" id="sec-5" data-legal-item="sec-5">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-5">
                <span class="legal-item__badge">5</span>
                <span class="legal-item__title">Seguridad, Cookies y Medición</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-5" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">5.1. MEDIDAS DE SEGURIDAD</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Conexión cifrada:</strong> el sitio solo puede visitarse mediante una conexión cifrada, y solo carga contenido de fuentes autorizadas.</li>
                  <li class="legal-item__bullet"><strong>Formulario protegido:</strong> el formulario solo acepta envíos que provienen de este sitio y que superan una verificación de seguridad.</li>
                  <li class="legal-item__bullet"><strong>Límite de envíos:</strong> cada conexión puede enviar hasta 5 formularios cada 15 minutos.</li>
                  <li class="legal-item__bullet"><strong>Filtro contra robots:</strong> el formulario incluye un control que solo llenan los programas automáticos; si se activa, el mensaje no se procesa.</li>
                  <li class="legal-item__bullet"><strong>Validación de datos:</strong> los datos se revisan al escribirlos y nuevamente en nuestro servidor antes de procesarlos.</li>
                  <li class="legal-item__bullet"><strong>Credenciales protegidas:</strong> las claves de la cuenta de correo se guardan solo en el servidor y nunca se entregan al navegador.</li>
                </ul>

                <h3 class="legal-item__sub">5.2. COOKIES Y MEDICIÓN</h3>
                <p class="legal-item__text">Usamos cookies y tecnologías similares para dos fines distintos: el funcionamiento del sitio y la medición de su uso.</p>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Cookies necesarias:</strong> permiten que el sitio funcione y que el formulario de contacto sea seguro. No se usan para medir tu actividad. El sitio también recuerda en tu navegador si prefieres el modo claro o el oscuro.</li>
                  <li class="legal-item__bullet"><strong>Cookies de medición:</strong> son las que usan Google Tag Manager, Google Analytics 4 y Microsoft Clarity para entender cómo se usa el sitio. Pueden registrar tu dirección IP, el tipo de dispositivo y navegador, las páginas visitadas y los clics o desplazamientos. Microsoft Clarity además graba sesiones de navegación y genera mapas de calor. Google y Microsoft tratan estos datos conforme a sus propias políticas de privacidad. Los datos de eventos recopilados por Google Analytics a través de nuestro sitio se conservan durante 2 meses, y los datos a nivel de usuario durante 14 meses; después de esos plazos se eliminan automáticamente de los servidores de Google Analytics. El plazo de los datos a nivel de usuario se renueva si vuelves a tener actividad en el sitio antes de su vencimiento. Los datos de edad, género e intereses se eliminan automáticamente a los 2 meses. Microsoft Clarity conserva las grabaciones de sesión durante 30 días, y los mapas de calor y los datos de clics y métricas agregadas durante 9 meses. Al terminar esos plazos, los datos se eliminan de sus servidores, incluidas las copias de seguridad.</li>
                </ul>
                                <p class="legal-item__text"><strong>Datos de ubicación (art. 16 sexies).</strong> Google Analytics registra ubicación geográfica aproximada, a nivel de país y ciudad, derivada del tráfico y de la red de cada visitante. No registra coordenadas GPS ni ubicaciones precisas. Tipo de datos: ubicación aproximada (país y ciudad). Finalidad: estadística interna y medición agregada de la audiencia y del rendimiento del sitio. Duración: se conservan según los plazos de Google Analytics indicados en este punto, que son 2 meses para los datos de eventos y 14 meses para los datos de usuario. Cesión: no cedemos ni comercializamos estos datos a terceros; Google los trata únicamente como proveedor del servicio de analítica.</p>
                <p class="legal-item__text"><strong>Tu consentimiento.</strong> Al entrar al sitio aparece un aviso con dos opciones de igual importancia: «Aceptar» y «Rechazar». Hasta que aceptes, no se instala ninguna cookie de medición ni se graba tu navegación. Tu elección se mantiene mientras la pestaña esté abierta; al cerrarla, el aviso vuelve a aparecer en tu próxima visita. La base de licitud de la medición es tu consentimiento, conforme al artículo 12 de la ley.</p>
                <p class="legal-item__text"><strong>Cómo retirarlo.</strong> Puedes retirar tu consentimiento en cualquier momento: pulsa «Configurar cookies» en el pie de página, elige «Rechazar» y la medición se detiene. Retirar el consentimiento no afecta a los datos tratados antes de ese momento.</p>
                <h3 class="legal-item__sub">5.3. VULNERACIONES DE SEGURIDAD</h3>
                <p class="legal-item__text">Si ocurre un incidente que ocasione la destrucción, filtración, pérdida o alteración accidental o ilícita de tus datos personales, o su acceso no autorizado, lo notificaremos a la Agencia de Protección de Datos Personales sin dilaciones indebidas cuando exista un riesgo razonable para tus derechos y libertades. Asimismo, si la vulneración compromete datos personales sensibles, datos económicos o financieros, o datos relativos a niños o niñas menores de catorce años, te lo comunicaremos directamente en un lenguaje claro y sencillo, detallando los datos afectados, las posibles consecuencias y las medidas de resguardo adoptadas.</p>
              </div>
            </div>
          </article>

          <!-- 6 -->
          <article class="legal-item" id="sec-6" data-legal-item="sec-6">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-6">
                <span class="legal-item__badge">6</span>
                <span class="legal-item__title">Conservación de los Datos</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-6" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">6.1. CRITERIOS DE CONSERVACIÓN</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Los datos de las solicitudes de cotización que no se convierten en un servicio contratado se eliminan de nuestros registros y de nuestra casilla de correo electrónico dentro de los 60 días corridos siguientes a la última comunicación con la persona.</li>
                  <li class="legal-item__bullet">Si se emite una orden de trabajo, los datos se conservan hasta la entrega del trabajo o hasta la terminación del servicio acordada por las partes. Los datos que deben constar en las boletas de honorarios electrónicas que emitimos se conservan durante 6 años, conforme al artículo 58 de la Ley sobre Impuesto a las Ventas y Servicios. Los demás datos se eliminan dentro de los 60 días corridos siguientes a la entrega del trabajo o a la terminación del servicio.</li>
                  <li class="legal-item__bullet"><strong>Eventos de reuniones en Google Calendar:</strong> si la reunión no termina en una orden de trabajo, el evento se elimina del calendario dentro de los 60 días corridos siguientes a la última comunicación con la persona. Si hay una orden de trabajo, el evento se conserva hasta la entrega del trabajo o la terminación del servicio, y se elimina del calendario dentro de los 60 días corridos siguientes.</li>
                  <li class="legal-item__bullet">Si solicitas la eliminación de tus datos, estos serán suprimidos de forma definitiva de nuestros registros de contacto. Al eliminar datos de nuestros registros y de nuestra casilla de correo, las copias que Google mantiene en sus sistemas de respaldo pueden tardar en desaparecer, como indica la Política de Privacidad de Google (policies.google.com/privacy).</li>
                </ul>
              </div>
            </div>
          </article>

          <!-- 7 -->
          <article class="legal-item" id="sec-7" data-legal-item="sec-7">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-7">
                <span class="legal-item__badge">7</span>
                <span class="legal-item__title">Derechos del Titular y Procedimiento (Ley N° 21.719)</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-7" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">7.1. DERECHOS RECONOCIDOS</h3>
                <p class="legal-item__text">
                  El titular de los datos podrá ejercer de forma gratuita los siguientes derechos:
                </p>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet"><strong>Acceso:</strong> Conocer si sus datos están siendo tratados, su origen y fines.</li>
                  <li class="legal-item__bullet"><strong>Rectificación:</strong> Solicitar la corrección o actualización de datos erróneos o incompletos.</li>
                  <li class="legal-item__bullet"><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios o retire su consentimiento.</li>
                  <li class="legal-item__bullet"><strong>Oposición:</strong> Oponerse al tratamiento para fines específicos (por ejemplo, marketing directo).</li>
                  <li class="legal-item__bullet"><strong>Bloqueo Temporal:</strong> Solicitar la suspensión cautelar del tratamiento mientras se tramita una solicitud de rectificación, oposición o supresión.</li>
                  <li class="legal-item__bullet"><strong>Portabilidad:</strong> cuando tus datos se traten de forma automatizada y el tratamiento se base en tu consentimiento, puedes solicitar una copia de los datos que nos entregaste, en un formato electrónico estructurado, y pedir que se transfieran a otro responsable. Para los datos de solicitudes de cotización, este derecho no aplica, porque su tratamiento se basa en la preparación de un posible contrato.</li>
                </ul>

                <h3 class="legal-item__sub">7.2. PROCEDIMIENTO Y PLAZOS DE RESPUESTA</h3>
                <ul class="legal-item__list">
                  <li class="legal-item__bullet">Para ejercer estos derechos, utilice cualquiera de los canales indicados en el punto 1.3, acreditando su identidad e indicando el requerimiento concreto y medio de contacto para la respuesta.</li>
                  <li class="legal-item__bullet">Se acusará recibo y se emitirá pronunciamiento fundado en un plazo máximo de 30 días corridos (este plazo puede prorrogarse por una sola vez, hasta por 30 días corridos). Para solicitudes de bloqueo temporal, el plazo de resolución será de 2 días hábiles.</li>
                </ul>

                <h3 class="legal-item__sub">7.3. TUTELA ANTE LA AUTORIDAD</h3>
                <p class="legal-item__text">
                  En caso de negativa injustificada, respuesta insatisfactoria o vencimiento del plazo legal sin respuesta, el titular tiene derecho a formular una reclamación administrativa ante la Agencia de Protección de Datos Personales dentro del plazo legal de 30 días hábiles.
                </p>
              </div>
            </div>
          </article>

          <!-- 8 -->
          <article class="legal-item" id="sec-8" data-legal-item="sec-8">
            <h2 class="legal-item__heading">
              <button type="button" class="legal-item__trigger" aria-expanded="false" aria-controls="panel-sec-8">
                <span class="legal-item__badge">8</span>
                <span class="legal-item__title">Modificaciones y Ley Aplicable</span>
                <span class="legal-item__arrow" aria-hidden="true">▼</span>
              </button>
            </h2>
            <div class="legal-item__panel" id="panel-sec-8" role="region" hidden>
              <div class="legal-item__body">
                <h3 class="legal-item__sub">8.1. ACTUALIZACIONES DE LA POLÍTICA</h3>
                <p class="legal-item__text">
                  Rodolfo-Freelance se reserva el derecho de actualizar esta Política de Privacidad para adaptarla a cambios normativos o mejoras en el servicio. Toda modificación estará permanentemente publicada en esta página.
                </p>

                <h3 class="legal-item__sub">8.2. LEGISLACIÓN Y JURISDICCIÓN</h3>
                <p class="legal-item__text">
                  Esta Política se rige por las leyes de la República de Chile, en especial por la Ley N° 19.628 sobre Protección de la Vida Privada, modificada por la Ley N° 21.719. Las modificaciones introducidas por la Ley N° 21.719 entran en vigencia el 1 de diciembre de 2026. Desde esa fecha, esta Política se aplica conforme a dichas modificaciones.
                </p>
              </div>
            </div>
          </article>

          <div class="legal__actions">
            <a class="btn btn--primary" href="index.html#contacto">Volver al formulario de contacto</a>
            <a class="btn btn--ghost" href="index.html">Ir al inicio</a>
          </div>
        </div>
      </div>
    </div>
  `;

  function render(host) {
    var k = window.RFKIT;
    var section = k.sectionShell(k.attr(host, "section-id", "privacidad"), "section--legal");

    var hero = k.el("header", "legal-hero");
    var heroInner = k.el("div", "container legal-hero__inner");
    heroInner.appendChild(
      k.el("p", "legal-hero__eyebrow", k.attr(host, "eyebrow", "Privacidad & Transparencia"))
    );
    heroInner.appendChild(
      k.el("h1", "legal-hero__title", k.attr(host, "title", "Política de Privacidad"))
    );
    heroInner.appendChild(
      k.el(
        "p",
        "legal-hero__lead",
        k.attr(
          host,
          "lead",
          "En Rodolfo-Freelance recolectamos únicamente la información necesaria para responder a tu consulta o cotización, sin letra chica ni uso comercial no autorizado."
        )
      )
    );
    hero.appendChild(heroInner);

    section.appendChild(hero);
    section.appendChild(k.fragment(LAYOUT));
    host.replaceChildren(section);
  }

  window.RFKIT.define("privacy-section", render);
})();
