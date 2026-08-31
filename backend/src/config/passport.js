const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const generateUniqueUsername = require("../utils/auth/generateUniqueUsername");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(
                        new Error("Google account does not have an email"),
                        null
                    );
                }

                const normalizedEmail = email.toLowerCase();

                let user = await User.findOne({
                    email: normalizedEmail
                });

                // Existing user
                if (user) {

                    if (user.isDeleted) {
                        return done(
                            new Error("ACCOUNT_DELETED"),
                            null
                        );
                    }

                    // Existing local account
                    if (
                        user.authProvider === "local" &&
                        !user.providerId
                    ) {
                        user.authProvider = "google";
                        user.providerId = profile.id;
                        user.isVerified = true;

                        if (!user.profilePicture) {
                            user.profilePicture =
                                profile.photos?.[0]?.value || "";
                        }

                        await user.save();
                    }

                    return done(null, user);
                }

                // New Google user
                const username = await generateUniqueUsername(
                    profile.displayName,
                    normalizedEmail
                );

                user = await User.create({
                    name: profile.displayName,
                    username,
                    email: normalizedEmail,
                    password: null,
                    profilePicture:
                        profile.photos?.[0]?.value || "",
                    isVerified: true,
                    isActive: true,
                    authProvider: "google",
                    providerId: profile.id
                });

                return done(null, user);

            } catch (error) {
                return done(error, null);
            }
        }
    )
);

module.exports = passport;