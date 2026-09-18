const gmail = require("../config/mailConfig");
const verifyEmailTemplate = require("../templates/verifyEmailTemplate");
const resetPasswordTemplate = require("../templates/resetPasswordTemplate");

const createRawEmail = ({ to, subject, html }) => {
  const email = [
    `From: OSCareer <${process.env.GMAIL_USER}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
  ].join("\r\n");

  return Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const sendEmail = async ({ to, subject, html }) => {
  const raw = createRawEmail({
    to,
    subject,
    html,
  });

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });

  console.log("✅ Gmail email sent:", response.data.id);

  return response.data;
};

const sendVerificationEmail = async (email, verificationToken) => {
  console.log("Sending verification email to:", email);

  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  console.log("Verification URL:", verificationUrl);

  return await sendEmail({
    to: email,
    subject: "Verify your email",
    html: verifyEmailTemplate(verificationUrl),
  });
};

const sendPasswordResetEmail = async (email, resetToken) => {
  console.log("Sending password reset email to:", email);

  const passwordResetUrl =
    `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  return await sendEmail({
    to: email,
    subject: "Reset your password",
    html: resetPasswordTemplate(passwordResetUrl),
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};