"use strict";

const nodemailer = require("nodemailer");
const { config } = require("./config");

/**
 * Transporte SMTP de Gmail.
 * Usa una "contraseña de aplicación" (App Password), nunca la contraseña real.
 */
const isServerless = Boolean(
  process.env.NETLIFY ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.VERCEL
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.user,
    pass: config.mail.appPassword
  },
  pool: !isServerless,
  maxConnections: 3,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000
});

/** Escapa caracteres peligrosos para evitar inyección de HTML en el correo. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Quita saltos de línea de campos de cabecera (evita header injection). */
function sanitizeHeader(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

/**
 * Envía el correo del formulario de contacto.
 * @param {{name:string,email:string,subject:string,message:string}} data
 * @returns {Promise<void>}
 */
async function sendContactEmail(data) {
  const name = sanitizeHeader(data.name);
  const phone = data.phone ? sanitizeHeader(data.phone) : "";
  const email = sanitizeHeader(data.email);
  const subject = sanitizeHeader(data.subject);
  const attachmentName = data.attachmentName ? sanitizeHeader(data.attachmentName) : "";
  const marketingOptin = data.marketingOptin ? "Sí" : "No";
  const message = data.message;

  const row = (label, value) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e6ecf2;width:38%;font-size:14px;font-weight:700;color:#5b7b93;vertical-align:top">${label}</td>
            <td style="padding:10px 0;border-bottom:1px solid #e6ecf2;font-size:15px;color:#1e2a36;vertical-align:top">${value}</td>
          </tr>`;

  const html = `
<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f2efe7;font-family:system-ui,'Segoe UI',Roboto,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2efe7;padding:24px 12px">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fcfbf7;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
            <tr>
              <td style="background:#3368a0;padding:24px 28px">
                <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff">Nuevo mensaje desde Rodolfo-Freelance</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row("Nombre", escapeHtml(name))}${phone ? row("Teléfono", escapeHtml(phone)) : ""}${row("Correo", escapeHtml(email))}${row("Servicio", escapeHtml(subject))}${attachmentName ? row("Referencia adjunta", escapeHtml(attachmentName)) : ""}${row("Comunicaciones comerciales", marketingOptin)}
                </table>
                <p style="margin:24px 0 8px;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#3368a0">Mensaje</p>
                <div style="background:#ffffff;border:1px solid #e6ecf2;border-left:4px solid #3368a0;border-radius:8px;padding:16px 18px;font-size:15px;line-height:1.6;color:#1e2a36;white-space:pre-wrap">${escapeHtml(message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#e7f1ee;font-size:12px;line-height:1.5;color:#5b7b93">
                Responde directamente a este correo para contactar a ${escapeHtml(name)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "Nuevo mensaje desde Rodolfo-Freelance",
    "",
    `Nombre: ${name}`,
    ...(phone ? [`Teléfono: ${phone}`] : []),
    `Correo: ${email}`,
    `Servicio: ${subject}`,
    ...(attachmentName ? [`Referencia adjunta: ${attachmentName}`] : []),
    `Comunicaciones comerciales: ${marketingOptin}`,
    "",
    message
  ].join("\n");

  const rawAttachments = Array.isArray(data.attachments) ? data.attachments.slice(0, 3) : [];
  const mailAttachments = rawAttachments
    .filter((item) => item && item.filename && item.content)
    .map((item) => ({
      filename: sanitizeHeader(item.filename),
      content: Buffer.from(String(item.content), "base64"),
      contentType: item.contentType ? sanitizeHeader(item.contentType) : undefined
    }));

  await transporter.sendMail({
    from: `"${sanitizeHeader(config.mail.fromName)}" <${config.mail.user}>`,
    to: config.mail.to,
    replyTo: `"${name}" <${email}>`,
    subject: `${name} para Rodolfo - Freelance`,
    text,
    html,
    attachments: mailAttachments
  });
}

/** Verifica la conexión con Gmail al arrancar (opcional). */
async function verifyTransport() {
  await transporter.verify();
}

module.exports = { sendContactEmail, verifyTransport };
