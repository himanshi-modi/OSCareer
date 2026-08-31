const AppError = require("../../errors/AppError");
const UserRoadmap = require("../../models/UserRoadmap");
const UserStage = require("../../models/UserStage");
const UserMissionProgress = require("../../models/UserMissionProgress");
const mongoose = require("mongoose");
const CareerProfile = require("../../models/CareerProfile");
const AUTH_MESSAGES = require("../../constants/messages/authMessages");
const ROADMAP_MESSAGES = require("../../constants/messages/roadmapMessages");
const { getMissionStatsByStage, calculateRoadmapProgress, buildStageDetails,calculateMissionProgress, } = require("./getRoadmapDetailsService");
const CAREER_PROFILE_MESSAGES =require("../../constants/messages/careerProfileMessages");
const careerAnalysisService =require(".././ai/careerAnalysisService");
const MissionTemplate = require("../../models/MissionTemplate");
const StageTemplate=require("../../models/StageTemplate");
const RoadmapTemplate=require("../../models/RoadmapTemplate");
const {buildProgressMap,deactivateCurrentRoadmap,createRegeneratedStages,createRegeneratedMissionProgress} = require("./regenerateRoadmap");

const getActiveRoadmap = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
    }

    const careerProfile = await CareerProfile.findOne({
        userId,
        isActive: true,
        isDeleted: false
    });

    if (!careerProfile) {
        throw new AppError(
            ROADMAP_MESSAGES.NO_ACTIVE_ROADMAP_FOUND,
            404
        );
    }

    const userRoadmap = await UserRoadmap.findOne({
        careerProfileId: careerProfile._id,
        isDeleted: false,
        isActive:true
    }).populate(
        "roadmapTemplateId",
        "title targetCareer totalStages"
    );

    if (!userRoadmap) {
        throw new AppError(
            ROADMAP_MESSAGES.NO_ACTIVE_ROADMAP_FOUND,404
        );
    }
    const userStages = await UserStage.find({userRoadmapId: userRoadmap._id,isDeleted: false});
    const roadmapProgress =await calculateRoadmapProgress(userStages);

    return {
        roadmapId: userRoadmap._id,
        careerProfileId: careerProfile._id,
        targetCareer: careerProfile.targetCareer,
        status: userRoadmap.status,
        progress: roadmapProgress.progress,
        totalStages: userRoadmap.roadmapTemplateId.totalStages,
        currentStageId: userRoadmap.currentStageId,
        estimatedCompletionDate: userRoadmap.estimatedCompletionDate
    };
};

const getRoadmapDetails = async (userId,roadmapId) => {
    if (!mongoose.Types.ObjectId.isValid(roadmapId)) {
        throw new AppError(ROADMAP_MESSAGES.INVALID_ROADMAP_ID,400);
    }
    const userRoadmap =await UserRoadmap.findOne({_id: roadmapId,userId,isDeleted: false});
    
    if (!userRoadmap) {
        throw new AppError(ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,404);
    }
    const careerProfile =await CareerProfile.findOne({
        _id:userRoadmap.careerProfileId,
        userId,
        isDeleted: false
    });
    if (!careerProfile) {
        throw new AppError(ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,404);
    }
    const userStages =await UserStage.find({userRoadmapId:userRoadmap._id,isDeleted: false})
        .populate(
            "stageTemplateId",
            "title description stageOrder estimatedDuration"
        )
        userStages.sort((a, b) =>
        a.stageTemplateId.stageOrder -b.stageTemplateId.stageOrder);
        const userStageIds =userStages.map(stage => stage._id);
        const missionStatsByStage =await getMissionStatsByStage(userStageIds);
        const roadmapProgress =await calculateRoadmapProgress(userStages);
        const stages =await buildStageDetails(userStages,missionStatsByStage);
        return {
            roadmapId:userRoadmap._id,
            careerProfileId:careerProfile._id,
            targetCareer:careerProfile.targetCareer,
            status:userRoadmap.status,
            progress:roadmapProgress.progress,
            completedStages:roadmapProgress.completedStages,
            totalStages:roadmapProgress.totalStages,
            estimatedCompletionDate:userRoadmap.estimatedCompletionDate,
            stages
        };
};
const regenerateRoadmap = async (userId,roadmapId,reason) => {

    const session =await mongoose.startSession();
     try {

        session.startTransaction();

        console.log("========== REGENERATE ROADMAP ==========");
    console.log("User ID:", userId);
    console.log("Roadmap ID:", roadmapId);
    if (!mongoose.Types.ObjectId.isValid(roadmapId)) {
        throw new AppError(
            ROADMAP_MESSAGES.INVALID_ROADMAP_ID,
            400
        );
    }

    const userRoadmap = await UserRoadmap.findOne({
        _id: roadmapId,
        userId,
        isDeleted: false,
        isActive:true
    }).session(session);

    console.log("Roadmap found:", userRoadmap._id);
    console.log("Regeneration reason:", reason);


    if (!userRoadmap) {
        throw new AppError(ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,404);
    }
    const careerProfile = await CareerProfile.findOne({
         _id: userRoadmap.careerProfileId,
        userId,
        isDeleted: false
    }).session(session);

    if (!careerProfile) {
        throw new AppError(ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,404);
    }
    const currentStages = await UserStage.find({
        userRoadmapId: userRoadmap._id,
        isDeleted: false
    }).populate("stageTemplateId","title description stageOrder estimatedDuration").session(session);
    console.log("Career profile:", careerProfile._id);
    console.log("Current stages:", currentStages.length);

    const currentStageIds =currentStages.map(stage => stage._id);
    const currentMissionProgress =await UserMissionProgress.find({
        userStageId: {
            $in: currentStageIds
        },
        isDeleted: false
    }).session(session);
    console.log("Current mission progress:",currentMissionProgress.length);
    const progressMap = buildProgressMap(currentStages,currentMissionProgress);
    console.log("Progress map:",progressMap);
    const roadmapTemplate = await RoadmapTemplate.findOne({
        targetCareer: careerProfile.targetCareer,
        isActive: true
    }).session(session);

    if (!roadmapTemplate) {
        throw new AppError(ROADMAP_MESSAGES.ROADMAP_TEMPLATE_NOT_FOUND,404);
    }
    const stageTemplates = await StageTemplate.find({roadmapTemplateId: roadmapTemplate._id}).sort({stageOrder: 1}).session(session);

    if (stageTemplates.length === 0) {
        throw new AppError(ROADMAP_MESSAGES.STAGE_TEMPLATE_NOT_FOUND,404);
    }
   
    const aiAnalysis =await careerAnalysisService.regenerateRoadmap(
        careerProfile,
        userRoadmap,
        currentStages,
        roadmapTemplate,
        stageTemplates,
        reason
    );
    console.log("AI regeneration analysis:",aiAnalysis);
    console.log("Latest roadmap template:",roadmapTemplate._id);
    console.log("Latest stage templates:",stageTemplates.length);

    
    const regeneratedRoadmapData =
    await deactivateCurrentRoadmap(
        userRoadmap,
        roadmapTemplate,
        aiAnalysis,
        session
    );

const newUserRoadmap =regeneratedRoadmapData.roadmap;
    console.log("Regenerated roadmap document:",regeneratedRoadmapData);
    console.log("New roadmap userId:",regeneratedRoadmapData.userId);
    console.log("New roadmap _id:",regeneratedRoadmapData._id);
    const regeneratedStageData =await createRegeneratedStages(newUserRoadmap,stageTemplates,aiAnalysis,progressMap,session);

    const newUserStages =regeneratedStageData.createdStages;
    console.log(
    "========== REGENERATED STAGE DATA =========="
);

console.log(
    "Starting stage ID:",
    regeneratedStageData.startingStageId
);

console.log(
    "Current stage ID:",
    regeneratedStageData.currentStageId
);

console.log(
    "Created stages:",
    regeneratedStageData.createdStages.length
);
    const updatedRoadmap =
    await UserRoadmap.findByIdAndUpdate(
        newUserRoadmap._id,
        {
            startingStageId:
                regeneratedStageData.startingStageId,

            currentStageId:
                regeneratedStageData.currentStageId
        },
        {
            session,
             returnDocument: "after"
        }
    );
console.log(
    "========== UPDATED ROADMAP =========="
);

console.log(
    "Starting Stage:",
    updatedRoadmap.startingStageId
);

console.log(
    "Current Stage:",
    updatedRoadmap.currentStageId
);
    console.log("New stages created:",newUserStages.length);

    const newMissionProgress =await createRegeneratedMissionProgress(newUserStages,progressMap,session);
    
    console.log("New mission progress created:",newMissionProgress.length);
    await session.commitTransaction();
    return {
    roadmapId:
        regeneratedRoadmapData.roadmapId,

    previousRoadmapId:
        regeneratedRoadmapData.previousRoadmapId,

    personalizationReason:
        regeneratedRoadmapData.personalizationReason,

    stagesCreated:
        newUserStages.length,

    missionsCreated:
        newMissionProgress.length
};


    }catch (error) {

        await session.abortTransaction();
        throw error;

    } finally {

        await session.endSession();

    }
};
const getRoadmapProgress = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError(
            AUTH_MESSAGES.USER_NOT_FOUND,
            404
        );
    }

    const careerProfile = await CareerProfile.findOne({
        userId,
        isActive: true,
        isDeleted: false
    });

    if (!careerProfile) {
        throw new AppError(
            ROADMAP_MESSAGES.NO_ACTIVE_ROADMAP_FOUND,
            404
        );
    }

    const userRoadmap = await UserRoadmap.findOne({
        careerProfileId: careerProfile._id,
        userId,
        isActive: true,
        isDeleted: false
    });

    if (!userRoadmap) {
        throw new AppError(
            ROADMAP_MESSAGES.NO_ACTIVE_ROADMAP_FOUND,
            404
        );
    }

    const userStages = await UserStage.find({
    userRoadmapId: userRoadmap._id,
    isDeleted: false
});

const userStageIds = userStages.map(
    stage => stage._id
);

const missionStatsByStage =
    await getMissionStatsByStage(userStageIds);

const stageProgress =
    calculateRoadmapProgress(userStages);

const missionProgress =
    calculateMissionProgress(missionStatsByStage);

    return {
    roadmapId: userRoadmap._id,

    progress: missionProgress.progress,

    completedMissions:
        missionProgress.completedMissions,

    totalMissions:
        missionProgress.totalMissions,

    completedStages:
        stageProgress.completedStages,

    totalStages:
        stageProgress.totalStages,

    currentStageId:
        userRoadmap.currentStageId,

    estimatedCompletionDate:
        userRoadmap.estimatedCompletionDate
};
};

const getRoadmapProgressDash = async (userId) => {

    const roadmap = await UserRoadmap.findOne({
        userId,
        status: {
            $in: ["active", "in-progress"]
        }
    })
        .select("_id")
        .lean();

    if (!roadmap) {
        return {
            currentStage: null,
            stageProgress: 0,
            overallProgress: 0,
            completedStages: 0,
            totalStages: 0,
            completedMissions: 0,
            totalMissions: 0
        };
    }

    // ------------------------------------------------------------
    // GET ALL USER STAGES
    // ------------------------------------------------------------

    const stages = await UserStage.find({
        userId,
        userRoadmapId: roadmap._id,
        isDeleted: false
    })
        .populate(
            "stageTemplateId",
            "title stageOrder"
        )
        .lean();

    const totalStages = stages.length;

    if (totalStages === 0) {
        return {
            currentStage: null,
            stageProgress: 0,
            overallProgress: 0,
            completedStages: 0,
            totalStages: 0,
            completedMissions: 0,
            totalMissions: 0
        };
    }

    // Sort stages according to roadmap order
    stages.sort(
        (a, b) =>
            a.stageTemplateId.stageOrder -
            b.stageTemplateId.stageOrder
    );

    // ------------------------------------------------------------
    // STAGE COMPLETION
    // ------------------------------------------------------------

    const completedStages = stages.filter(
        stage =>
            stage.status === "completed"
    ).length;

    // ------------------------------------------------------------
    // GET ALL MISSIONS FOR THIS ROADMAP
    // ------------------------------------------------------------

    const stageIds = stages.map(
        stage => stage._id
    );

    const missions = await UserMissionProgress.find({
        userId,
        userStageId: {
            $in: stageIds
        },
        isDeleted: false
    })
        .select("userStageId status progress")
        .lean();

    const totalMissions = missions.length;

    const completedMissions = missions.filter(
        mission =>
            mission.status === "completed"
    ).length;

    // ------------------------------------------------------------
    // OVERALL ROADMAP PROGRESS
    // ------------------------------------------------------------

    const overallProgress =
        totalMissions === 0
            ? 0
            : Math.round(
                (completedMissions /
                    totalMissions) *
                    100
            );

    // ------------------------------------------------------------
    // CURRENT STAGE
    // ------------------------------------------------------------

    const currentStage =
        stages.find(
            stage =>
                stage.status === "in-progress"
        ) ||
        stages.find(
            stage =>
                stage.status === "not-started"
        );

    // ------------------------------------------------------------
    // CURRENT STAGE PROGRESS
    // ------------------------------------------------------------

    let stageProgress = 0;

    if (currentStage) {

        const currentStageMissions =
            missions.filter(
                mission =>
                    mission.userStageId.toString() ===
                    currentStage._id.toString()
            );

        const totalStageMissions =
            currentStageMissions.length;

        const completedStageMissions =
            currentStageMissions.filter(
                mission =>
                    mission.status === "completed"
            ).length;

        stageProgress =
            totalStageMissions === 0
                ? 0
                : Math.round(
                    (completedStageMissions /
                        totalStageMissions) *
                        100
                );
    }

    // ------------------------------------------------------------
    // RETURN
    // ------------------------------------------------------------

    return {

        currentStage:
            currentStage
                ? currentStage.stageTemplateId.title
                : null,

        stageProgress,

        overallProgress,

        completedStages,

        totalStages,

        completedMissions,

        totalMissions
    };
};
const getNextMilestone = async (userId) => {

    const roadmap = await UserRoadmap.findOne({
        userId,
        status: {
            $in: ["active", "in-progress"]
        }
    })
        .select("_id")
        .lean();

    if (!roadmap) {
        return null;
    }

    const stages = await UserStage.find({
        userId,
        userRoadmapId: roadmap._id,
        isDeleted: false
    })
        .populate(
    "stageTemplateId",
    "title description stageOrder estimatedDuration"
)
        .lean();

    if (!stages.length) {
        return null;
    }

    stages.sort(
        (a, b) =>
            a.stageTemplateId.stageOrder -
            b.stageTemplateId.stageOrder
    );

    // Find the first stage that is not completed
    const nextStage = stages.find(
        stage => stage.status !== "completed"
    );

    if (!nextStage) {
        return null;
    }

    // Get missions belonging to this stage
    const missions = await UserMissionProgress.find({
        userStageId: nextStage._id,
        isDeleted: false
    })
        .lean();

    const totalMissions = missions.length;

    const completedMissions = missions.filter(
        mission => mission.status === "completed"
    ).length;

    const progress =
        totalMissions === 0
            ? 0
            : Math.round(
                  (completedMissions / totalMissions) * 100
              );

    return {
        stageId: nextStage._id,

        title: nextStage.stageTemplateId.title,

        description:
            nextStage.stageTemplateId.description,

        stageOrder:
            nextStage.stageTemplateId.stageOrder,
            estimatedDuration:
    nextStage.stageTemplateId.estimatedDuration,

        status: nextStage.status,

        progress,

        totalMissions,

        completedMissions,

        remainingMissions:
            totalMissions - completedMissions,
            
    };
};
module.exports = {getActiveRoadmap,getRoadmapDetails,regenerateRoadmap,getRoadmapProgressDash,getNextMilestone};
