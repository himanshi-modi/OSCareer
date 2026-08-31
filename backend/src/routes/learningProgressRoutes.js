const express = require("express");
const router = express.Router();
console.log("🔥 LEARNING PROGRESS ROUTES LOADED");
const protect =require("../middlewares/authMiddleware");
const learningProgressController =require("../controllers/learningProgressController");

router.get("/stages",protect,learningProgressController.getUserStages);
router.get("/stages/:stageId",protect,learningProgressController.getStageDetails);
router.get("/stages/:stageId/missions",protect,learningProgressController.getStageMissions);
router.get("/missions/:missionId",protect,learningProgressController.getMissionDetails);
router.post("/missions/:missionId/start",protect,learningProgressController.startMission);
router.post("/missions/:missionId/complete",protect,learningProgressController.completeMission);
router.post("/missions/:missionId/proof",protect,learningProgressController.submitMissionProof);
router.patch("/missions/:missionId/skip",protect,learningProgressController.skipMission);
router.patch("/mission-progress/:missionProgressId/proof/review",protect,learningProgressController.reviewMissionProof);
module.exports = router;