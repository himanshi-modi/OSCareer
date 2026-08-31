const express=require("express");
const router=express.Router();
const protect = require("../middlewares/authMiddleware");
const weeklyReviewController =require("../controllers/weeklyReviewController");
const validate = require("../middlewares/validateMiddleware");
const {updateWeeklyReviewSchema,weeklyReviewHistoryQuerySchema,
    weeklyReviewParamsSchema}=require("../../../shared/validators/weeklyReviewValidator");

router.post("/generate",protect,weeklyReviewController.generateWeeklyReview);
router.get("/current",protect,weeklyReviewController.getCurrentWeeklyReview);
router.patch("/current", protect, validate(updateWeeklyReviewSchema, "body"), weeklyReviewController.updateCurrentWeeklyReview);
router.post("/current/analyze",protect,weeklyReviewController.analyzeCurrentWeeklyReview);
router.get("/history",protect,validate(weeklyReviewHistoryQuerySchema, "query"),weeklyReviewController.getWeeklyReviewHistory);
router.get("/stats",protect,weeklyReviewController.getWeeklyReviewStats);
router.get("/calendar",protect,weeklyReviewController.getWeeklyReviewCalendar);
router.get("/:reviewId",protect,validate(weeklyReviewParamsSchema, "params"),weeklyReviewController.getWeeklyReviewById);
router.delete("/:reviewId",protect,validate(weeklyReviewParamsSchema, "params"),weeklyReviewController.deleteWeeklyReview);
router.post("/generate/last-week",protect,weeklyReviewController.generateLastWeekReview);

module.exports=router;
