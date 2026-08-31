const asyncHandler = require("../utils/asyncHandlers");
const ROADMAP_MESSAGES=require("../constants/messages/roadmapMessages");
const roadmapService=require("../services/roadmapServices/roadmapService");

const getActiveRoadmap=asyncHandler(async(req,res)=>{
    const roadmap = await roadmapService.getActiveRoadmap(req.user.id);
    res.status(200).json({
        success: true,
        message: ROADMAP_MESSAGES.ROADMAP_FETCHED_SUCCESSFULLY,
        data: roadmap
    });
});
const getRoadmapDetails = asyncHandler(async (req, res) => {
    const roadmap =await roadmapService.getRoadmapDetails(req.user.id,req.params.roadmapId);
    return res.status(200).json({
        success: true,
        message:ROADMAP_MESSAGES.ROADMAP_DETAILS_FETCHED_SUCCESSFULLY,
        data: roadmap
    });
});
const regenerateUserRoadmap = async (req, res) => {
    const result = await roadmapService.regenerateRoadmap(req.user.id,req.params.roadmapId,req.body.reason);
    res.status(200).json({
        success: true,
        message: ROADMAP_MESSAGES.ROADMAP_GENERATED_SUCCESSFULLY,
        data: result
    });
};
module.exports={getActiveRoadmap,getRoadmapDetails,regenerateUserRoadmap};