const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    achievementKey:{
        type:String,
        required:true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "roadmap",
        "skill",
        "project",
        "certificate",
        "milestone",
        "mission",
        "resume",
        "streak",
        "weekly-review",
        "career"
      ],
      required: true,
    },

    rarity: {
      type: String,
      enum: [
        "common",
        "rare",
        "epic",
        "legendary",
      ],
      default: "common",
    },

    badgeIcon:{
        type:String,
        default:"",
        
    },

    badgeColor:{
        type:String,
        default:"#3B82F6"
    },
     xpReward:{
        type:Number,
        default:0,
         min: 0
    },
     unlockedAt:{
        type:Date,
        default:Date.now
    },

    source:{
        type:String,
        enum:[
            "system",
            "ai"
        ],
        default:"system"
    },

    metadata:{
        type:mongoose.Schema.Types.Mixed,
        default:{}
    }
    
  },
  {
    timestamps: true,
  }
);
achievementSchema.index({
    userId:1,
    achievementKey:1
},{
    unique:true
});
achievementSchema.index({
    userId: 1,
    unlockedAt: -1
});
const Achievement = mongoose.model(
  "Achievement",
  achievementSchema
);

module.exports = Achievement;