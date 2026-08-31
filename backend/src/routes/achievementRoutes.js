const express=require("express");
const router=express.Router();
const validate = require("../middlewares/validateMiddleware");
const protect = require("../middlewares/authMiddleware");

const {getAchievementsQuerySchema,achievementParamsSchema,achievementCategoryParamsSchema,achievementCategoryQuerySchema,
    recentAchievementsQuerySchema}=require("../../../shared/validators/achievementValidator");
const achievementController=require("../controllers/achivementController");

router.get("/",protect,validate(getAchievementsQuerySchema, "query"),achievementController.getAchievements);
router.get("/category/:category",protect,validate(achievementCategoryParamsSchema, "params"),validate(achievementCategoryQuerySchema, "query"),
    achievementController.getAchievementsByCategory
);
router.get("/recent",protect,validate(recentAchievementsQuerySchema, "query"),achievementController.getRecentAchievements);
router.get("/stats",protect,achievementController.getAchievementStats);
router.post("/evaluate",protect,achievementController.evaluateAchievements);
router.get( "/:achievementId",protect,validate(achievementParamsSchema, "params"),achievementController.getAchievementDetails);

module.exports=router;