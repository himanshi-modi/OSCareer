const transporter=require("../config/mailConfig");
const verifyEmailTemplate=require("../templates/verifyEmailTemplate");
const resetPasswordTemplate=require("../templates/resetPasswordTemplate");


const sendVerificationEmail=async(email,verificationToken)=>{

    console.log("📧 Sending verification email to:", email);

    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    console.log("🔗 Verification URL:", verificationUrl);
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Verify your email",
        html:verifyEmailTemplate(verificationUrl)
    };
    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", result.messageId);

    
}

const sendPasswordResetEmail=async(email,resetToken)=>{
    const passwordResetUrl =`${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Reset your password",
        html:resetPasswordTemplate(passwordResetUrl)
    };
    await transporter.sendMail(mailOptions);
}


module.exports={sendVerificationEmail,sendPasswordResetEmail};