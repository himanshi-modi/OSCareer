const resend = require("../config/mailConfig");
const verifyEmailTemplate = require("../templates/verifyEmailTemplate");
const resetPasswordTemplate = require("../templates/resetPasswordTemplate");

const sendVerificationEmail = async (email, verificationToken) => {
  console.log("Sending verification email to:", email);

  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  console.log("Verification URL:", verificationUrl);

  const { data, error } = await resend.emails.send({
    from: "OSCareer <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your email",
    html: verifyEmailTemplate(verificationUrl),
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  console.log(" Verification email sent:", data.id);

  return data;
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const passwordResetUrl =
    `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const { data, error } = await resend.emails.send({
    from: "OSCareer <onboarding@resend.dev>",
    to: [email],
    subject: "Reset your password",
    html: resetPasswordTemplate(passwordResetUrl),
  });

  if (error) {
    console.error(" Resend password reset error:", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  console.log("✅ Password reset email sent:", data.id);

  return data;
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};