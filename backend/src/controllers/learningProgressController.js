const learningProgressService =require("../services/learningProgressService");
const asyncHandler = require("../utils/asyncHandlers");
const STAGE_MESSAGES=require("../constants/messages/userStageMessages");

const getUserStages =asyncHandler( async (req, res, next) => {
    console.log("🔥🔥🔥 getUserStages CONTROLLER REACHED 🔥🔥🔥");
  console.log("USER:", req.user);
  console.log("USER ID:", req.user?._id || req.user?.id);

    const userId = req.user.id;
    const data =await learningProgressService.getUserStages(userId);
    return res.status(200).json({
        success: true,
        message: STAGE_MESSAGES.STAGES_FETCHED_SUCCESSFULLY,
        data
    });
});
const getStageDetails =asyncHandler( async (req, res, next) => {
        const userId = req.user.id;
        const { stageId } = req.params;
        const stageDetails = await learningProgressService.getStageDetails( userId, stageId);
        return res.status(200).json({
            success: true,
            message:STAGE_MESSAGES.STAGE_DETAILS_FETCHED_SUCCESSFULLY,
            data: stageDetails
        });
});


const getStageMissions = asyncHandler(async (req, res, next) => {

    console.log("🔥🔥🔥 CONTROLLER getStageMissions HIT 🔥🔥🔥");
    console.log("🔥 PARAMS:", req.params);
    console.log("🔥 USER:", req.user?.id);

    const userId = req.user.id;
    const { stageId } = req.params;

    console.log("🔥 ABOUT TO CALL SERVICE");

    const data = await learningProgressService.getStageMissions(
        userId,
        stageId
    );

    console.log("🔥 SERVICE RETURNED:", data);

    return res.status(200).json({
        success: true,
        message: STAGE_MESSAGES.STAGE_MISSIONS_FETCHED_SUCCESSFULLY,
        data
    });
});
const getMissionDetails = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { missionId } = req.params;

    const data = await learningProgressService.getMissionDetails(
        userId,
        missionId
    );

    return res.status(200).json({
        success: true,
        message: "Mission details fetched successfully.",
        data
    });
});

const startMission = asyncHandler(async (req, res) => {
    console.log(req.user.id);
    const userId = req.user.id;
    const { missionId } = req.params;
    const data = await learningProgressService.startMission(userId, missionId);
    return res.status(200).json({
        success: true,
        message:STAGE_MESSAGES.MISSION_STARTED_SUCCESSFULLY,
        data
    });
});

const completeMission = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { missionId } = req.params;
        const result =await learningProgressService.completeMission(userId,missionId);
        return res.status(200).json({
            success: true,
            message: STAGE_MESSAGES.MISSION_COMPLETED_SUCCESSFULLY,
            data: result
        });
});
const submitMissionProof = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { missionId } = req.params;
    const proofData = req.body.proof || null;
    const data = await learningProgressService.submitMissionProof(
        userId,
        missionId,
        proofData
    );
    return res.status(200).json({
        success: true,
        message: STAGE_MESSAGES.MISSION_SUBMITTED_SUCCESSFULLY,
        data
    });
});

const skipMission = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { missionId } = req.params;
    const { skipReason } = req.body;

    const data = await learningProgressService.skipMission(userId,missionId,skipReason);

    return res.status(200).json({
        success: true,
        message: STAGE_MESSAGES.MISSION_SKIPPED_SUCCESSFULLY,
        data
    });
});

const reviewMissionProof = asyncHandler(async (req, res) => {
    const reviewerId = req.user.id;
    const { missionProgressId } = req.params;
    const { decision, feedback } = req.body;
    const data = await learningProgressService.reviewMissionProof(
        reviewerId,
        missionProgressId,
        decision,
        feedback
    );
    return res.status(200).json({
        success: true,
        message: STAGE_MESSAGES.MISSION_PROOF_REVIEWED_SUCCESSFULL,
        data
    });
});


module.exports = {getUserStages,getStageDetails,getStageMissions,startMission,completeMission,submitMissionProof,skipMission,reviewMissionProof,
    getMissionDetails
};