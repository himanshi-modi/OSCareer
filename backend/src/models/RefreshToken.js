const mongoose =require("mongoose");

const refreshTokenSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    hashedRefreshToken:{
        type:String,
        required:true,
    
    },
    deviceId:{
        type: String,
        required: true
    },
    browser: {
        type: String,
        default: "Unknown"
    },
    operatingSystem: {
            type: String,
            default: "Unknown"
        },
    expiresAt:{
        type:Date,
        required:true,
    },
    isRevoked:{
        type:Boolean,
        default:false
    },
    revokedAt:{
        type:Date,
        default:null
    },
    userAgent:{
        type:String,
        default:null
    },
    ipAdddress:{
        type:String,
        default:null
    },
    rotatedAt: {
        type: Date
    },
    lastUsedAt:{
        type:Date,
        default:Date.now,
    },
    revocationReason: {
            type: String,
            enum: [
                "LOGOUT",
                "LOGOUT_ALL",
                "TOKEN_ROTATION",
                "TOKEN_REUSE_DETECTED",
                "PASSWORD_CHANGED",
                "ACCOUNT_DELETED"
            ],
            default: null
        }

},
{
    timestamps:true
});

refreshTokenSchema.index(
    {expiresAt:1},
    {expireAfterSeconds:0}
);

const RefreshToken=mongoose.model("RefreshToken",refreshTokenSchema);
module.exports=RefreshToken;