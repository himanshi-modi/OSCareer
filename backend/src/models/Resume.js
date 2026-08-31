const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    version: {
      type: Number,
      required: true,
      min: 1,
    },

    resumeTitle: {
      type: String,
      default: "My Resume",
      trim: true,
      maxlength: 100,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "doc", "docx"],
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
      min: 1,
    },

    storageKey: {
      type: String,
      required: true,
    },

    isCurrent: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastAnalyzedAt: {
      type: Date,
      default: null,
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

resumeSchema.index(
  {
    userId: 1,
    version: 1,
  },
  {
    unique: true,
  }
);

resumeSchema.index({
  userId: 1,
  isCurrent: 1,
  isDeleted: 1,
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;