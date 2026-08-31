const mongoose = require("mongoose");

const projectSkillSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    confidenceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 100,
    },

    verifiedByAI: {
      type: Boolean,
      default: false,
    },
    source:{
        type:String,
        enum:["user","ai","github"],
        default:"user"
    },
    isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  }
  },
  {
    timestamps: true,
  }
);


projectSkillSchema.index(
  {
    projectId: 1,
    skillId: 1,
  },
  {
    unique: true,
  }
);

const ProjectSkill = mongoose.model("ProjectSkill", projectSkillSchema);

module.exports = ProjectSkill;
