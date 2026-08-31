const jwt = require("jsonwebtoken");
const AUTH_MESSAGES=require("../constants/messages/authMessages");
const AppError = require("../errors/AppError");
const User=require("../models/User");

const protect=async(req,res,next)=>{
    let token;
    console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next (new AppError(AUTH_MESSAGES.UNAUTHORIZED,401));
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        console.log(decoded);
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return next(new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404));
        }
        if (user.isDeleted) {
    return next(
        new AppError(
            AUTH_MESSAGES.ACCOUNT_DELETED,
            403
        )
    );
}
        
        req.user={
            id:user._id,
            email:user.email,
            username:user.username,
            isVerified:user.isVerified,
             role: user.role
        };
        
        next();
    }catch(error){
        console.log(error);
        return next(new AppError(AUTH_MESSAGES.UNAUTHORIZED,401));
    }

}

module.exports=protect;