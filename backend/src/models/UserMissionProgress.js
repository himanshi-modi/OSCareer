const mongoose = require("mongoose");

const userMissionProgressSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    userStageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserStage",
      required: true,
    },

    missionTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MissionTemplate",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "not-started",
        "in-progress",
        "submitted",
        "under-review",
        "completed",
        "rejected",
        "skipped"
      ],
      default: "not-started",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    proof: {
    type: {
        type: String,
        enum: ["github", "link", "file", "text", "image"],
        default: null
    },
    url: {
        type: String,
        default: null,
        trim: true
    },
    text: {
        type: String,
        default: null,
        trim: true
    },
    submittedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: [
            "not-submitted",
            "pending",
            "approved",
            "rejected"
        ],
        default: "not-submitted"
    }
},

    feedback: {
      type: String,
      default: "",
      trim: true,
    },

    completedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false
  },

  deletedAt: {
    type: Date,
    default: null
  },
  startedAt: {
    type: Date,
    default: null
},
reviewedAt: {
    type: Date,
    default: null
},

reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
},
skipReason: {
    type: String,
    trim: true,
    default: ""
},
rejectionReason: {
    type: String,
    default: "",
    trim: true
},
  },
  
  {
    timestamps: true,
  }
);
userMissionProgressSchema.index(
    {
        userStageId:1,
        missionTemplateId:1
    },
    {
        unique:true
    }
)
const UserMissionProgress = mongoose.model(
  "UserMissionProgress",
  userMissionProgressSchema
);

module.exports = UserMissionProgress;