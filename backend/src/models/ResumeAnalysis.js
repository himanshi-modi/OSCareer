const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    analysisVersion: {
      type: Number,
      required: true,
      min: 1,
    },

    extractedText: {
      type: String,
      trim: true,
      default: null,
    },

    extractedSkills: [
      {
        name: {
          type: String,
          trim: true,
        },
        category: {
          type: String,
          trim: true,
        },
      },
    ],

    extractedProjects: [
  {
    name: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    githubUrl: {
      type: String,
      trim: true,
      default: null,
    },

    liveUrl: {
      type: String,
      trim: true,
      default: null,
    },
  },
],

    extractedExperience: [
      {
        company: {
          type: String,
          trim: true,
        },
        role: {
          type: String,
          trim: true,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],

    extractedEducation: [
      {
        degree: {
          type: String,
          trim: true,
        },
        institution: {
          type: String,
          trim: true,
        },
        fieldOfStudy: {
          type: String,
          trim: true,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
      },
    ],

    extractedCertificates: [
      {
        name: {
          type: String,
          trim: true,
        },
        issuer: {
          type: String,
          trim: true,
        },
        issueDate: {
          type: Date,
        },
      },
    ],

    resumeScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    recruiterScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    summary: {
      type: String,
      trim: true,
      default: null,
    },

    strengths: [
      {
        type: String,
        trim: true,
      },
    ],

    weaknesses: [
      {
        type: String,
        trim: true,
      },
    ],

    aiInsights: {
      type: String,
      trim: true,
      default: null,
    },

    analyzedAt: {
      type: Date,
      default: null,
    },

    analysisStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
      ],
      default: "pending",
      required: true,
    },

    errorMessage: {
      type: String,
      trim: true,
      default: null,
    },

    improvementAreas: [
      {
        type: String,
        trim: true,
      },
    ],

    missingSkills: [
      {
        type: String,
        trim: true,
      },
    ],

    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    aiSuggestions: [
      {
        type: String,
        trim: true,
      },
    ],
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
resumeAnalysisSchema.index(
  {
    resumeId: 1,
    userId: 1,
    analysisVersion: 1,
  },
  {
    unique: true,
  }
);

resumeAnalysisSchema.index(
    {
        resumeId: 1,
        userId: 1
    },
    {
        unique: true,
        partialFilterExpression: {
            isDeleted: false,
            analysisStatus: {
                $in: ["pending", "processing"]
            }
        }
    }
);

const ResumeAnalysis =
    mongoose.models.ResumeAnalysis ||
    mongoose.model("ResumeAnalysis", resumeAnalysisSchema);

module.exports = ResumeAnalysis;

module.exports = ResumeAnalysis;