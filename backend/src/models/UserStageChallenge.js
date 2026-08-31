const mongoose = require("mongoose");

const userStageChallengeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    userStageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserStage",
      required: true,
      index: true,
    },

    stageChallengeTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StageChallengeTemplate",
      required: true,
      index: true,
    },

    // -----------------------------------------
    // Challenge snapshot
    // -----------------------------------------

    challengeType: {
      type: String,
      required: true,
      trim: true,
    },

    objective: {
      type: String,
      required: true,
      trim: true,
    },

    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],

    evaluationCriteria: [
      {
        type: String,
        trim: true,
      },
    ],

    // -----------------------------------------
    // Challenge status
    // -----------------------------------------

    status: {
      type: String,
      enum: [
        "not-started",
        "in-progress",
        "submitted",
        "evaluated",
        "completed",
        "failed",
      ],
      default: "not-started",
    },

    // -----------------------------------------
    // User submission
    // -----------------------------------------

    githubUrl: {
      type: String,
      trim: true,
      default: "",
    },

    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },

    submissionDescription: {
      type: String,
      trim: true,
      default: "",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    // -----------------------------------------
    // AI evaluation
    // We'll use these later.
    // -----------------------------------------

    aiScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    aiFeedback: {
      type: String,
      trim: true,
      default: "",
    },

    aiEvaluation: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    evaluatedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userStageChallengeSchema.index(
  {
    userId: 1,
    userStageId: 1,
  },
  {
    unique: true,
  }
);

const UserStageChallenge = mongoose.model(
  "UserStageChallenge",
  userStageChallengeSchema
);

module.exports = UserStageChallenge;