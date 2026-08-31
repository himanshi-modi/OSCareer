const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

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

    category: {
      type: String,
      required: true,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    githubUrl: {
      type: String,
      default: "",
    },

    liveDemoUrl: {
      type: String,
      default: "",
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "planned",
        "in-progress",
        "completed",
        "archived",
      ],
      default: "planned",
    },

    source: {
      type: String,
      enum: [
        "user",
        "roadmap",
        "ai",
        "course",
      ],
      default: "user",
    },

    completionDate: {
      type: Date,
      default: null,
    },

    deploymentStatus: {
      type: String,
      enum: [
        "not-deployed",
        "live",
        "offline",
      ],
      default: "not-deployed",
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
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

projectSchema.index({
  userId: 1,
  isDeleted: 1,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;