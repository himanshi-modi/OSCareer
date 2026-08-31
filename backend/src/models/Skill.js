const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      
    },

    category: {
    type: String,
    required: true,
    enum: [
        "frontend",
        "backend",
        "database",
        "devops",
        "mobile",
        "cloud",
        "ai_ml",
        "testing",
        "security",
        "other"
    ],
      trim: true,
    },
    subCategory:{
        type: String,
        required: true,
        trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    aliases: [
      {
        type: String,
        trim: true,
      },
    ],

    isTrending: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true
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
// skillSchema.index({ name: 1 });
// skillSchema.index({ category: 1 });
const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
