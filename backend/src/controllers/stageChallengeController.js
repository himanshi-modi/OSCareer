const asyncHandler = require("../utils/asyncHandlers");
const stageChallengeService = require("../services/stageChallengeService");

const getCurrentStageChallenge = asyncHandler(async (req, res) => {

    const result =
        await stageChallengeService.getCurrentStageChallenge(
            req.user.id
        );

    return res.status(200).json({
        success: true,
        message: "Current stage challenge fetched successfully.",
        data: result,
    });
});
const startCurrentStageChallenge = asyncHandler(async (req, res) => {
  const result =
    await stageChallengeService.startCurrentStageChallenge(
      req.user.id
    );

  return res.status(200).json({
    success: true,
    message: "Stage challenge started successfully.",
    data: result,
  });
});
const submitCurrentStageChallenge = asyncHandler(async (req, res) => {
    const result =
        await stageChallengeService.submitCurrentStageChallenge(
            req.user.id,
            req.body
        );

    return res.status(200).json({
        success: true,
        message: "Stage challenge submitted successfully.",
        data: result,
    });
});
const evaluateCurrentStageChallenge = asyncHandler(async (req, res) => {
    const result =
        await stageChallengeService.evaluateCurrentStageChallenge(
            req.user.id
        );

    return res.status(200).json({
        success: true,
        message: "Stage challenge evaluated successfully.",
        data: result,
    });
});
module.exports = {
    getCurrentStageChallenge,startCurrentStageChallenge,submitCurrentStageChallenge,evaluateCurrentStageChallenge
};
