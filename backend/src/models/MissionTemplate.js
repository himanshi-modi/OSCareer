const mongoose = require("mongoose");

const missionTemplateSchema = new mongoose.Schema(
  {
    stageTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StageTemplate",
      required: true,
    },

    // ============================================================
    // BASIC MISSION INFORMATION
    // ============================================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    whyItMatters: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================================
    // MISSION DIFFICULTY
    // ============================================================

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    // ============================================================
    // MISSION TYPE
    // ============================================================

    type: {
      type: String,
      enum: [
        "video",
        "article",
        "project",
        "quiz",
        "assignment",
      ],
      required: true,
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },

    // ============================================================
    // TIME
    // ============================================================

    estimatedTime: {
      type: Number,
      required: true,
      min: 1,
    },

    // ============================================================
    // CAREER IMPACT
    // ============================================================

    careerImpact: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // ============================================================
    // EVIDENCE
    // ============================================================

    proofRequired: {
      type: Boolean,
      default: false,
    },

    proofType: {
      type: String,
      enum: [
        "github",
        "link",
        "file",
        "text",
        "image",
      ],
      default: null,
    },

    evidenceRequired: [
      {
        type: String,
        trim: true,
      },
    ],

    // ============================================================
    // ORDER / REQUIREMENT
    // ============================================================

    missionOrder: {
      type: Number,
      required: true,
      min: 1,
    },

    isRequired: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

missionTemplateSchema.index(
  {
    stageTemplateId: 1,
    missionOrder: 1,
  },
  {
    unique: true,
  }
);

const MissionTemplate = mongoose.model(
  "MissionTemplate",
  missionTemplateSchema
);

module.exports = MissionTemplate;