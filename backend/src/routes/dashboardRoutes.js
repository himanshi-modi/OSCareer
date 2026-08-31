const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");
const validate = require("../middlewares/validateMiddleware");
const {publicProfileParamsSchema,analyticsQuerySchema}=require("../../../shared/validators/dashboardValidator");
router.get("/",protect,dashboardController.getDashboard);
router.get("/profile",protect,dashboardController.getProfileOverview);
router.get("/stats",protect,dashboardController.getDashboardStats);
router.get("/activity",protect,dashboardController.getRecentActivity);
router.get("/profile/:userId",protect,dashboardController.getPublicProfile);
router.get("/progress", protect,dashboardController.getProfileProgress);
router.get("/analytics",protect,validate(analyticsQuerySchema,"query"),dashboardController.getCareerAnalytics);
router.get("/insights",protect,dashboardController.getCareerInsights);
module.exports = router;
