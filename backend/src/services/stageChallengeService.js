const UserStage = require("../models/UserStage");
const StageChallengeTemplate = require("../models/StageChallengeTemplate");
const AppError = require("../errors/AppError");
const UserStageChallenge = require("../models/UserStageChallenge");
const StageTemplate = require("../models/StageTemplate");
const getCurrentStageChallenge = async (userId) => {

    // Find current in-progress stage
    let userStage = await UserStage.findOne({
        userId,
        status: "in-progress",
        isDeleted: false,
    });

    // If none is in progress, find the first not-started stage
    if (!userStage) {
        const notStartedStages = await UserStage.find({
            userId,
            status: "not-started",
            isDeleted: false,
        }).lean();

        if (notStartedStages.length > 0) {

            const stageTemplateIds =
                notStartedStages.map(
                    stage => stage.stageTemplateId
                );

            const stageTemplates =
                await StageTemplate.find({
                    _id: { $in: stageTemplateIds }
                }).lean();

            stageTemplates.sort(
                (a, b) => a.stageOrder - b.stageOrder
            );

            const firstStageTemplate =
                stageTemplates[0];

            userStage = notStartedStages.find(
                stage =>
                    stage.stageTemplateId.toString() ===
                    firstStageTemplate._id.toString()
            );
        }
    }

    if (!userStage) {
        throw new AppError(
            "No current stage found for this user.",
            404
        );
    }

    console.log("CURRENT USER STAGE:", {
        id: userStage._id,
        stageTemplateId: userStage.stageTemplateId,
        status: userStage.status,
    });

    // Find challenge for this stage
    const challenge =
        await StageChallengeTemplate.findOne({
            stageTemplateId: userStage.stageTemplateId,
            isActive: true,
        }).lean();

    if (!challenge) {
        throw new AppError(
            "No challenge found for the current stage.",
            404
        );
    }

    return {
        userStage,
        challenge,
    };
};


const startCurrentStageChallenge = async (userId) => {
  
  let userStage = await UserStage.findOne({
    userId,
    status: "in-progress",
    isDeleted: false,
  }).sort({ stageTemplateId: 1 });

  if (!userStage) {
    userStage = await UserStage.findOne({
      userId,
      status: "not-started",
      isDeleted: false,
    }).sort({ stageTemplateId: 1 });
  }

  if (!userStage) {
    throw new AppError(
      "No current stage found for this user.",
      404
    );
  }
  if (userStage.status === "not-started") {
    userStage.status = "in-progress";
    userStage.startedAt = new Date();
    userStage.lastactivityAt = new Date();

    await userStage.save();
}
  // ---------------------------------------------
  // Find challenge template
  // ---------------------------------------------

  const challenge = await StageChallengeTemplate.findOne({
    stageTemplateId: userStage.stageTemplateId,
    isActive: true,
  }).lean();

  if (!challenge) {
    throw new AppError(
      "No challenge found for the current stage.",
      404
    );
  }

  // ---------------------------------------------
  // Check if user already has challenge
  // ---------------------------------------------

  let userChallenge =
    await UserStageChallenge.findOne({
      userId,
      userStageId: userStage._id,
      isDeleted: false,
    });

  // ---------------------------------------------
  // Already started
  // ---------------------------------------------

  if (userChallenge) {
    return userChallenge;
  }

  // ---------------------------------------------
  // Create user challenge
  // ---------------------------------------------

  userChallenge = await UserStageChallenge.create({
    userId,
    userStageId: userStage._id,
    stageChallengeTemplateId: challenge._id,

    challengeType: challenge.challengeType,
    objective: challenge.objective,
    requiredSkills: challenge.requiredSkills,
    evaluationCriteria: challenge.evaluationCriteria,

    status: "in-progress",
    startedAt: new Date(),
  });

  return userChallenge;
};
const submitCurrentStageChallenge = async (userId,submissionData) => {

    const { githubUrl, liveUrl, submissionDescription, } = submissionData;
    const userStage = await UserStage.findOne({
        userId,
        status: "in-progress",
        isDeleted: false,
    });

    if (!userStage) {
        throw new AppError(
            "No active stage found for this user.",
            404
        );
    }

    const userChallenge =
        await UserStageChallenge.findOne({
            userId,
            userStageId: userStage._id,
            isDeleted: false,
        });

    if (!userChallenge) {
        throw new AppError(
            "No active stage challenge found.",
            404
        );
    }
    if (!githubUrl && !liveUrl) {
        throw new AppError(
            "Please provide at least a GitHub URL or live project URL.",
            400
        );
    }

    if (!submissionDescription?.trim()) {
        throw new AppError(
            "Please provide a description of your submission.",
            400
        );
      }

    if (
        userChallenge.status === "submitted" ||
        userChallenge.status === "evaluated" ||
        userChallenge.status === "completed"
    ) {
        throw new AppError(
            "This challenge has already been submitted.",
            400
        );
    }

    userChallenge.githubUrl = githubUrl?.trim() || "";
    userChallenge.liveUrl = liveUrl?.trim() || "";
    userChallenge.submissionDescription =
        submissionDescription.trim();

    userChallenge.status = "submitted";
    userChallenge.submittedAt = new Date();

    await userChallenge.save();

    return userChallenge;
};
const evaluateCurrentStageChallenge = async (userId) => {

    // ---------------------------------------------
    // Find user's active stage
    // ---------------------------------------------

    const userStage = await UserStage.findOne({
        userId,
        status: "in-progress",
        isDeleted: false,
    });

    if (!userStage) {
        throw new AppError(
            "No active stage found for this user.",
            404
        );
    }

    // ---------------------------------------------
    // Find user's submitted challenge
    // ---------------------------------------------

    const userChallenge = await UserStageChallenge.findOne({
        userId,
        userStageId: userStage._id,
        isDeleted: false,
    });

    if (!userChallenge) {
        throw new AppError(
            "No stage challenge found for this user.",
            404
        );
    }

    // ---------------------------------------------
    // Make sure challenge was submitted
    // ---------------------------------------------

    if (userChallenge.status !== "submitted") {
        throw new AppError(
            "Challenge must be submitted before evaluation.",
            400
        );
    }

    // ---------------------------------------------
    // TEMPORARY MANUAL EVALUATION
    // ---------------------------------------------

    const score = 85;

    const feedback =
        "Good implementation. The project demonstrates the required skills and provides a functional solution.";

    const evaluation = {
        score,

        strengths: [
            "Required functionality implemented",
            "Good use of required technologies",
            "Project demonstrates practical understanding",
        ],

        improvements: [
            "Improve code organization",
            "Add more comprehensive error handling",
            "Improve documentation",
        ],
    };

    // ---------------------------------------------
    // Store evaluation
    // ---------------------------------------------

    userChallenge.aiScore = score;
    userChallenge.aiFeedback = feedback;
    userChallenge.aiEvaluation = evaluation;
    userChallenge.evaluatedAt = new Date();

    // ---------------------------------------------
    // Mark challenge completed
    // ---------------------------------------------

    userChallenge.status = "completed";
    userChallenge.completedAt = new Date();

    await userChallenge.save();

    // ---------------------------------------------
    // Mark current stage completed
    // ---------------------------------------------

    userStage.status = "completed";
    userStage.completedAt = new Date();
    userStage.lastactivityAt = new Date();

    await userStage.save();

    // ---------------------------------------------
    // Unlock next stage
    // ---------------------------------------------

    const currentStageTemplate =
        await StageTemplate.findById(
            userStage.stageTemplateId
        );

    if (currentStageTemplate) {

        const nextStageTemplate =
            await StageTemplate.findOne({
                roadmapTemplateId:
                    currentStageTemplate.roadmapTemplateId,

                stageOrder:
                    currentStageTemplate.stageOrder + 1,
            });

        if (nextStageTemplate) {

            const nextUserStage =
                await UserStage.findOne({
                    userId,

                    userRoadmapId:
                        userStage.userRoadmapId,

                    stageTemplateId:
                        nextStageTemplate._id,

                    isDeleted: false,
                });

            if (
                nextUserStage &&
                nextUserStage.status === "locked"
            ) {

                nextUserStage.status = "not-started";
                nextUserStage.lastactivityAt =
                    new Date();

                await nextUserStage.save();
            }
        }
    }

    return {
        userChallenge,
        userStage,
    };
};
module.exports = {
    getCurrentStageChallenge,startCurrentStageChallenge,submitCurrentStageChallenge,evaluateCurrentStageChallenge
};