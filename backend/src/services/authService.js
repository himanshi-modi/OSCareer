const RefreshToken =require("../models/RefreshToken");
const { generateAccessToken, generateRefreshToken } =require("../utils/jwt");
const jwt=require("jsonwebtoken");
const AppError =require( "../errors/AppError");
const bcrypt=require("bcrypt");
const User=require("../models/User");
const crypto=require("crypto");
const AUTH_MESSAGES = require("../constants/messages/authMessages");
const { sendVerificationEmail, sendPasswordResetEmail } = require("./emailService");
const CareerProfile = require("../models/CareerProfile");

const registerUser = async (userData) => {
  const { name, email, username, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const verificationToken = crypto
    .randomBytes(32)
    .toString("hex");

  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const verificationTokenExpires = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  );

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    isVerified: false,
    emailVerificationToken: hashedVerificationToken,
    emailVerificationTokenExpires: verificationTokenExpires,
  });

  await sendVerificationEmail(
    user.email,
    verificationToken
  );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    isVerified: user.isVerified,
  };
};

const verifyEmail = async (token) => {
    console.log(" Raw token:", token);
    console.log(" Raw token length:", token?.length);

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    console.log("🔐 Hashed token:", hashedToken);

    // DEBUG: find by token ONLY
    const tokenUser = await User.findOne({
        emailVerificationToken: hashedToken
    });

    console.log(
        "👤 User found by token:",
        tokenUser
            ? {
                  id: tokenUser._id,
                  email: tokenUser.email,
                  isVerified: tokenUser.isVerified,
                  expires: tokenUser.emailVerificationTokenExpires,
              }
            : "NO USER"
    );

    // Actual validation
    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpires: {
            $gt: new Date()
        }
    });

    console.log(
        "👤 User found with expiry:",
        user ? user.email : "NO USER"
    );

    if (!user) {
        throw new AppError(
            AUTH_MESSAGES.INVALID_OR_EXPIRED_VERIFICATION_TOKEN,
            400
        );
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
    };
};
const loginUser=async(userData)=>{
    const {email,password}=userData;
    const user=await User.findOne({email});
    if(!user){
        throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS,401);
    }
    if (user.isDeleted) {
    throw new AppError(
        AUTH_MESSAGES.ACCOUNT_DELETED,
        403
    );
    }

    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS,401);
    }
    if(!user.isVerified){
        throw new AppError(AUTH_MESSAGES.EMAIL_NOT_VERIFIED,403);
    }
    const careerProfile = await CareerProfile.findOne({
    userId: user._id,
    isActive: true,
    isDeleted: false
    });

    const needsOnboarding = !careerProfile;
    const accessToken=generateAccessToken(user);
    const refreshToken=generateRefreshToken(user);

    
    const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

    await RefreshToken.create({
    userId: user._id,
    hashedRefreshToken,
     deviceId: userData.deviceId || "postman-device",
        browser: userData.browser || "Postman",
        operatingSystem: userData.operatingSystem || "Unknown",
        userAgent: userData.userAgent || "Postman",
        ipAddress: userData.ipAddress || "127.0.0.1",

        lastUsedAt: new Date(),
        expiresAt: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        isRevoked: false
    });
    return {
    user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email

    },
    accessToken,
    refreshToken,
    needsOnboarding
    };
    
};
const googleLogin = async (user) => {

    if (!user) {
        throw new AppError(
            AUTH_MESSAGES.INVALID_CREDENTIALS,
            401
        );
    }

    if (user.isDeleted) {
        throw new AppError(
            AUTH_MESSAGES.ACCOUNT_DELETED,
            403
        );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    await RefreshToken.create({
        userId: user._id,
        hashedRefreshToken,
        deviceId: "google-login",
        browser: "Google",
        operatingSystem: "Unknown",
        userAgent: "Google OAuth",
        ipAddress: "127.0.0.1",
        lastUsedAt: new Date(),
        expiresAt: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        isRevoked: false
    });

    return {
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture
        },
        accessToken,
        refreshToken
    };
};
const linkedinLogin = async (user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    await RefreshToken.create({
        userId: user._id,
        hashedRefreshToken,
        deviceId: "linkedin",
        browser: "LinkedIn",
        operatingSystem: "Unknown",
        userAgent: "LinkedIn OAuth",
        ipAddress: "127.0.0.1",
        lastUsedAt: new Date(),
        expiresAt: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        isRevoked: false
    });

    user.lastlogin = new Date();
    await user.save();

    return {
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture
        },
        accessToken,
        refreshToken
    };
};
const refreshToken=async(refreshToken)=>{
    
    let decoded;
    try{
        decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    }catch(error){
        throw new AppError(AUTH_MESSAGES.UNAUTHORIZED);
    }
    const hashedRefreshToken=crypto.createHash("sha256").update(refreshToken).digest("hex");
    const storedToken=await RefreshToken.findOne({
        hashedRefreshToken,
        userId:decoded.userId,
        isRevoked:false,
        expiresAt:{$gt:new Date()}
    });
    if(!storedToken){
        await RefreshToken.updateMany(
            {userId:decoded.userId},
            {isRevoked:true,revocationReason: "TOKEN_REUSE_DETECTED"},
            
        );
        throw new AppError(AUTH_MESSAGES.SESSION_COMPROMISED,401);
    }
    const user=await User.findById(decoded.userId);
    if(!user){
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,401);
    }
    
    const accessToken=generateAccessToken(user);
    const newRefreshToken=generateRefreshToken(user);
    const hashedNewRefreshToken=crypto.createHash("sha256").update(newRefreshToken).digest("hex");
    storedToken.hashedRefreshToken=hashedNewRefreshToken;
    storedToken.lastUsedAt=new Date();
    storedToken.expiresAt=new Date(
        Date.now() +30*24 * 60 * 60 * 1000);
    storedToken.rotatedAt=new Date();
    await storedToken.save();
    return {accessToken,refreshToken:newRefreshToken};
}

const logout=async(refreshToken)=>{
    const hashedRefreshToken=crypto.createHash("sha256").update(refreshToken).digest("hex");
    const storedToken=await RefreshToken.findOne({hashedRefreshToken,isRevoked:false});
    if(!storedToken){
        throw new AppError(AUTH_MESSAGES.UNAUTHORIZED,401);
    }
    storedToken.isRevoked=true,
    storedToken.revocationReason = "LOGOUT";
    await storedToken.save();


}
const logoutAll = async (userId) => {

    const result = await RefreshToken.updateMany(
        {
            userId,
            isRevoked: false
        },
        {
            isRevoked: true,
            revocationReason: "LOGOUT_ALL"
        }
    );

    return result;
};

const forgotPassword=async(email)=>{
    const user=await User.findOne({email});
    if(!user){
        return;
    }
    const resetToken=crypto.randomBytes(32).toString("hex");
    const hashedResetToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetToken=hashedResetToken;
    user.passwordResetTokenExpires=new Date(Date.now()+15*60*1000);
    await user.save();
    await sendPasswordResetEmail(user.email,resetToken);
}

const resetPassword=async(passwordData)=>{
    const{newPassword,resetToken}=passwordData;
    const hashedResetToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    const user=await User.findOne({passwordResetToken:hashedResetToken,passwordResetTokenExpires:{$gt:Date.now()}});
    if(!user){
        throw new AppError(AUTH_MESSAGES.INVALID_OR_EXPIRED_RESET_TOKEN,400)
    }
    user.password=await bcrypt.hash(newPassword,12);
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpires=undefined;

    await user.save();
    await RefreshToken.updateMany(
        {userId: user._id},
        {
            isRevoked: true,
            revocationReason: "PASSWORD_CHANGED"
        }
    );
}
const changePassword=async(userId,passwordData)=>{
    const {oldPassword,newPassword}=passwordData;
    const user=await User.findById(userId);
    if(!user){
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
    }
    const isPasswordCorrect=await bcrypt.compare(oldPassword,user.password);
    if(!isPasswordCorrect){
        throw new AppError(AUTH_MESSAGES.WRONG_PASSWORD,400);
    }   
    const isSamePassword = await bcrypt.compare(newPassword,user.password);

    if (isSamePassword) {
        throw new AppError(AUTH_MESSAGES.NEW_PASSWORD_MUST_BE_DIFFERENT,400);
    }

    const hashNewPassword=await bcrypt.hash(newPassword,12);
    user.password=hashNewPassword;
    await user.save();
    await RefreshToken.updateMany(
        {userId: user._id},
        {
            isRevoked: true,
            revocationReason: "PASSWORD_CHANGED"
        }
    )
}

const getCurrentUser = async (userId) => {
    const user = await User.findById(userId)
        .select("-password -emailVerificationToken -emailVerificationTokenExpires -passwordResetToken -passwordResetTokenExpires");

    if (!user) {
        throw new AppError(
            AUTH_MESSAGES.USER_NOT_FOUND,
            404
        );
    }

    return user;
};

const updateProfile = async (userId, profileData) => {
    const {
        name,
        username,
        bio,
        phone,
        location,
        profilePicture
    } = profileData;

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(
            AUTH_MESSAGES.USER_NOT_FOUND,
            404
        );
    }

    // Username
    if (username !== undefined && username !== user.username) {
        const existingUser = await User.findOne({
            username,
            _id: { $ne: userId }
        });

        if (existingUser) {
            throw new AppError(
                AUTH_MESSAGES.USERNAME_ALREADY_EXISTS,
                409
            );
        }

        user.username = username;
    }

    // Other editable fields
    if (name !== undefined) {
        user.name = name;
    }

    if (bio !== undefined) {
        user.bio = bio;
    }

    if (phone !== undefined) {
        user.phone = phone;
    }

    if (location !== undefined) {
        user.location = location;
    }

    if (profilePicture !== undefined) {
        user.profilePicture = profilePicture;
    }

    await user.save();

    return {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        phone: user.phone,
        location: user.location,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified
    };
};
const deleteAccount = async (userId, password) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(
            AUTH_MESSAGES.USER_NOT_FOUND,
            404
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new AppError(
            AUTH_MESSAGES.INVALID_CREDENTIALS,
            401
        );
    }

    user.isDeleted = true;
    user.deletedAt = new Date();

    await user.save();

    await RefreshToken.updateMany(
        { userId: user._id },
        {
            isRevoked: true,
            revocationReason: "ACCOUNT_DEACTIVATED"
        }
    );
};

const resendVerificationEmail=async(email)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
    }
    if(user.isVerified){
        throw new AppError(AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED,400);
    }
    const verificationToken=crypto.randomBytes(32).toString("hex");
    const hashedVerificationToken=crypto.createHash("sha256").update(verificationToken).digest("hex");
    user.emailVerificationToken=hashedVerificationToken;
    user.emailVerificationTokenExpires=new Date(
        Date.now() +24 * 60 * 60 * 1000
    );
    await user.save();
    await sendVerificationEmail(user.email,verificationToken);
}

module.exports={registerUser,verifyEmail,loginUser,refreshToken,logout,logoutAll,forgotPassword,resetPassword,changePassword,getCurrentUser,updateProfile,deleteAccount,
    resendVerificationEmail,googleLogin,linkedinLogin};