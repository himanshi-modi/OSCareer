const mongoose = require("mongoose");

const userSkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    proficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    source: {
      type: String,
      enum: [
        "resume",
        "assessment",
        "manual",
        "github",
        "linkedin",
        "ai",
      ],
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastUsed: {
      type: Date,
      default: null,
    },

    confidenceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    isDeleted: {
            type: Boolean,
            default: false
    },
    deletedAt: {
            type: Date,
            default: null
    },
    isActive: {
            type: Boolean,
            default: true
        },
  },
  {
    timestamps: true,
  }
);

userSkillSchema.index(
  {
    userId:1,
    skillId:1,
  },
  {
    unique:true,
  }
);
userSkillSchema.index({
    userId:1,
    proficiency:-1
});

const UserSkill=mongoose.model("UserSkill", userSkillSchema);
module.exports=UserSkill;