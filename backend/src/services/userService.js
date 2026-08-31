const User = require("../models/User");
const AUTH_MESSAGES=require("../constants/messages/authMessages");

const getUserById = async (userId) => {
const user = await User.findById(userId)
.select(
"-password " +
"-emailVerificationToken " +
"-emailVerificationTokenExpires " +
"-passwordResetToken " +
"-passwordResetTokenExpires"
);

if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
}

return user;


};
const getPublicUser = async (userId) => {
    return await User.findById(userId)
        .select("name profileImage bio headline")
        .lean();
};

module.exports={getUserById,getPublicUser};