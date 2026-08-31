const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "internship",
        "contract",
        "freelance"
      ],
      required: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    skillsUsed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    }],

    proofUrl: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: [
        "manual",
        "linkedin",
        "resume",
        "ai"
      ],
      default: "manual",
    },
    isDeleted: {
    type: Boolean,
    default: false
},

deletedAt: {
    type: Date,
    default: null
},
isFeatured: {
    type: Boolean,
    default: false
},
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;