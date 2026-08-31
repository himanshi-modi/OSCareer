const express = require("express");
const router = express.Router();
const protect =require("../middlewares/authMiddleware");
const resumeController = require("../controllers/resumeController");
const uploadResume= require("../middlewares/uploadResumeMiddleware");

router.post("/",protect,uploadResume.single("file"),resumeController.uploadResume);
router.get("/",protect,resumeController.getAllResumes);
router.get("/current",protect,resumeController.getCurrentResume);
router.get("/:resumeId",protect,resumeController.getResumeById);
router.patch("/:resumeId/set-current",protect,resumeController.setCurrentResume);
router.delete("/:resumeId",protect,resumeController.deleteResume);

router.post( "/:resumeId/analyze",protect,resumeController.startResumeAnalysis);
router.get("/:resumeId/analysis/current",protect,resumeController.getLatestResumeAnalysis);
router.get("/:resumeId/analysis/history",protect,resumeController.getAnalysisHistory);
router.get("/:resumeId/analysis/:analysisId",protect,resumeController.getSpecificResumeAnalysis);
router.get("/:resumeId/analysis",protect,resumeController.getAllResumeAnalyses);
router.delete("/:resumeId/analysis/:analysisId",protect,resumeController.deleteResumeAnalysis);
module.exports=router;