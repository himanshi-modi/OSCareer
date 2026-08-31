const mongoose = require("mongoose");

const stageChallengeTemplateSchema = new mongoose.Schema(
  {
    stageTemplateId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "StageTemplate",
  required: true,
},

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

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

stageChallengeTemplateSchema.index(
  {
    stageTemplateId: 1,
  },
  {
    unique: true,
  }
);

const StageChallengeTemplate = mongoose.model(
  "StageChallengeTemplate",
  stageChallengeTemplateSchema
);

module.exports = StageChallengeTemplate;