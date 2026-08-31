const express=require("express");
const protect = require("../middlewares/authMiddleware");
const roadmapController=require("../controllers/roadmapController");
const router=express.Router();

router.get("/",protect,roadmapController.getActiveRoadmap);
router.get("/:roadmapId",protect,roadmapController.getRoadmapDetails);
router.post("/:roadmapId/regenerate",protect,roadmapController.regenerateUserRoadmap);

module.exports=router;