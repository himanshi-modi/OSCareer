const mongoose = require("mongoose");

const certificateSkillSchema = new mongoose.Schema(
  {
    certificateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
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

certificateSkillSchema.index(
  {
    certificateId: 1,
    skillId: 1,
  },
  {
    unique: true,
  }
);

const CertificateSkill = mongoose.model(
  "CertificateSkill",
  certificateSkillSchema
);

module.exports = CertificateSkill;