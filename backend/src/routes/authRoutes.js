const express=require("express");
const router = express.Router();
const authController=require("../controllers/authController");
const { registerSchema,loginSchema, forgotPasswordSchema,resetPasswordSchema,changePasswordSchema, deleteAccountSchema ,updateProfileSchema} 
= require("../../../shared/validators/authValidator");
const validate = require("../middlewares/validateMiddleware");
const protect = require("../middlewares/authMiddleware");
const {loginLimiter,registerLimiter,forgotPasswordLimiter,resendVerificationLimiter} = require("../middlewares/rateLimitMiddleware");
const passport = require("../config/passport");

router.post("/register",registerLimiter,validate(registerSchema),authController.registerUser);
router.get("/verify-email",authController.verifyEmail);
router.post("/login",loginLimiter,validate(loginSchema),authController.loginUser);
router.get("/google",passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback",passport.authenticate("google", { session: false}),authController.googleLogin);
router.get("/linkedin", (req, res) => {
        const params = new URLSearchParams({
            response_type: "code",
            client_id: process.env.LINKEDIN_CLIENT_ID,
            redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
            scope: "openid profile email"
        });
        res.redirect(
            `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
        );
    }
);

router.get("/linkedin/callback",authController.linkedinLogin);
router.post("/refresh-token",authController.refreshToken);
router.post("/logout",authController.logout);
router.post("/logout-all", protect,authController.logoutAll);
router.post("/forgot-password",forgotPasswordLimiter,validate(forgotPasswordSchema),authController.forgotPassword);
router.patch("/reset-password",validate(resetPasswordSchema),authController.resetPassword);
router.post("/change-password",validate(changePasswordSchema),protect,authController.changePassword);
router.get("/me",protect,authController.getCurrentUser);
router.patch("/me",protect,validate(updateProfileSchema),authController.updateProfile);
router.delete("/me",protect,validate(deleteAccountSchema),authController.deleteAccount);
router.post("/resend-verification-email",resendVerificationLimiter,validate(forgotPasswordSchema),authController.resendVerificationEmail);

module.exports=router;
