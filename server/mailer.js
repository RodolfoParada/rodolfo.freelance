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

  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 16px">Nuevo mensaje desde Rodolfo-Freelance</h2>
      <p style="margin:0 0 8px"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      ${phone ? `<p style="margin:0 0 8px"><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p style="margin:0 0 8px"><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px"><strong>Servicio:</strong> ${escapeHtml(subject)}</p>
      ${attachmentName ? `<p style="margin:0 0 8px"><strong>Referencia adjunta:</strong> ${escapeHtml(attachmentName)}</p>` : ""}
      <p style="margin:0 0 8px"><strong>Comunicaciones comerciales:</strong> ${marketingOptin}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>
  `;

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

  await transporter.sendMail({
    from: `"${sanitizeHeader(config.mail.fromName)}" <${config.mail.user}>`,
    to: config.mail.to,
    replyTo: `"${name}" <${email}>`,
    subject: `[Contacto] ${subject}`,
    text,
    html
  });
}

/** Verifica la conexión con Gmail al arrancar (opcional). */
async function verifyTransport() {
  await transporter.verify();
}

module.exports = { sendContactEmail, verifyTransport };
