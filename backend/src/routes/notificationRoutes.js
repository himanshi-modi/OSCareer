const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const notificationController = require("../controllers/notificationController");
const {getNotificationsQuerySchema,notificationParamsSchema} = require("../../../shared/validators/notificationValidator");

router.get("/",protect,validate(getNotificationsQuerySchema, "query"),notificationController.getNotifications);
router.patch("/read-all",protect,notificationController.markAllNotificationsAsRead);
router.get("/:notificationId",protect,validate(notificationParamsSchema, "params"),notificationController.getNotificationDetails);
router.patch("/:notificationId/read",protect, validate(notificationParamsSchema, "params"),notificationController.markNotificationAsRead);
router.get("/unread-count",protect,notificationController.getUnreadNotificationCount);
router.delete("/:notificationId",protect,validate(notificationParamsSchema,"params"), notificationController.deleteNotification);
router.delete("/",protect,notificationController.clearAllNotifications);
module.exports = router;