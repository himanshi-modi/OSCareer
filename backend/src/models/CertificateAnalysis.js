const mongoose = require("mongoose");

const certificateAnalysisSchema = new mongoose.Schema(
  {
    certificateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
      required: true,
    },

    relevanceScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    verifiedSkills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    }],

    missingRelatedSkills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    }],

    aiFeedback: {
      type: String,
      default: "",
      trim: true,
    },
    analysisVersion: {
    type: Number,
    default: 1,
},
    analyzedAt: {
      type: Date,
      default: Date.now,
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
certificateAnalysisSchema.index({
    certificateId: 1,
    analysisVersion: -1
});

const CertificateAnalysis = mongoose.model(
  "CertificateAnalysis",
  certificateAnalysisSchema
);

module.exports = CertificateAnalysis;