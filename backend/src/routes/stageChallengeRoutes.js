const express = require("express");
const {submitStageChallengeSchema}=require("../../../shared/validators/stageChallengeValidator");
const stageChallengeController = require("../controllers/stageChallengeController");
const validate = require("../middlewares/validateMiddleware");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/current",protect,stageChallengeController.getCurrentStageChallenge);
router.post("/start",protect,stageChallengeController.startCurrentStageChallenge);
router.post("/submit",protect,validate(submitStageChallengeSchema),stageChallengeController.submitCurrentStageChallenge);
router.post( "/evaluate", protect, stageChallengeController.evaluateCurrentStageChallenge);
module.exports = router;