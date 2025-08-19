import { transporter } from "../config/mailer.js";

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
    console.log("Email envoyé à", to);
  } catch (err) {
    console.error("Erreur envoi email:", err.message);
  }
};
