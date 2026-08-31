const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        username:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        password: {
            type: String,
            minlength: 8,
            default: null
        },
        profilePicture:{
            type:String,
            default:""
        },
        phone:{
            type:String,
            default:""
        },
        location:{
            type:String,
            default:""
        },
        linkedin: {
            type: String,
            default: "",
            trim: true
        },
        github: {
            type: String,
            default: "",
            trim: true
        },
        portfolio: {
            type: String,
            default: "",
            trim: true
        },
        bio:{
            type:String,
            default:"",
            maxlength:300
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        isActive:{
            type:Boolean,
            default:false,
        },
        lastlogin:{
            type:Date,
            default:null
        },

        role:{
            type:String,
            enum:["candidate","recruiter","admin"],
            default:"candidate"
        },
        emailVerificationToken:{
            type:String
        },
        emailVerificationTokenExpires:{
            type:Date
        },
        passwordResetToken: {
            type: String
        },

        passwordResetTokenExpires: {
            type: Date
        },
        authProvider: {
            type: String,
            enum: ["local", "google", "linkedin"],
            default: "local"
        },

        providerId: {
            type: String,
            default: null
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
        
    },{
        timestamps:true,
    }
);
userSchema.index(
    {
        authProvider: 1,
        providerId: 1
    },
    {
        unique: true,
        sparse: true
    }
);

const User=mongoose.model("User",userSchema);
module.exports=User;