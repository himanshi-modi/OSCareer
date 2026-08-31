const mongoose = require("mongoose");

const projectReviewSchema = new mongoose.Schema(
  {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    recruiterScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    reviewStatus: {
    type: String,
    enum: [
        "pending",
        "processing",
        "completed",
        "failed"
    ],
    default: "pending"
},

errorMessage: {
    type: String,
    default: null
},

    codeQualityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    uiUxScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    documentationScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    strengths: [
      {
        type: String,
      },
    ],

    improvementAreas: [
      {
        type: String,
      },
    ],

    recommendedFeatures: [
      {
        type: String,
      },
    ],

    overallFeedback: {
      type: String,
      required: true,
      trim: true,
    },

    reviewVersion: {
      type: Number,
      default: 1,
    },

    reviewedAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
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
projectReviewSchema.index({
    userId: 1,
    projectId: 1,
    reviewVersion: -1
});

const ProjectReview = mongoose.model(
  "ProjectReview",
  projectReviewSchema
);

module.exports = ProjectReview;