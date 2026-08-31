const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
         "achievement",
        "roadmap",
        "mission",
        "weekly-review",
        "project",
        "certificate",
        "resume",
        "career",
        "system",
        "ai-suggestions"
      ],
      required: true,
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
      ],
      default: "medium",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    
    isArchived: {
    type: Boolean,
    default: false,
},

    actionUrl: {
      type: String,
      default: "",
    },

    scheduledFor: {
      type: Date,
      default: null,
    },

    sentAt: {
      type: Date,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    readAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
notificationSchema.index({
    userId: 1,
    isRead: 1,
    expiresAt: 1
});
notificationSchema.index({
    userId: 1,
    createdAt: -1
});
notificationSchema.index({
    expiresAt: 1
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

module.exports = Notification;