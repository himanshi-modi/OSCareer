const rateLimit = require("express-rate-limit");

const createRateLimiter = ({
    windowMs,
    max,
    message
}) => {
    return rateLimit({
        windowMs,
        max,

        standardHeaders: true,
        legacyHeaders: false,

        message: {
            success: false,
            message
        }
    });
};
const loginLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Please try again after 15 minutes."
});
const registerLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: "Too many registration attempts. Please try again later."
});
const forgotPasswordLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many password reset requests. Please try again later."
});

const resendVerificationLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many verification email requests. Please try again later."
});

module.exports = {
    loginLimiter,
    registerLimiter,
    forgotPasswordLimiter,
    resendVerificationLimiter,
    createRateLimiter
};

