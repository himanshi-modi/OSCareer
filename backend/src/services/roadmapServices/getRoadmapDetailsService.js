const UserMissionProgress = require("../../models/UserMissionProgress");
const MissionTemplate = require("../../models/MissionTemplate");

const calculateRoadmapProgress = (userStages) => {
    if (userStages.length === 0) {
        return {
            completedStages: 0,
            totalStages: 0,
            progress: 0
        };
    }
    const completedStages = userStages.filter(stage => stage.status === "completed").length;
    const totalStages = userStages.length;
    const progress = Math.round((completedStages / totalStages) * 100);
    return {completedStages,totalStages,progress};
};

const getMissionStatsByStage = async (userStageIds, session = null) => {
    const matchStage = {
        userStageId: { $in: userStageIds },
        isDeleted: false
    };

    const query = UserMissionProgress.find(matchStage)
        .populate(
            "missionTemplateId",
            "title description whyItMatters difficulty type priority estimatedTime careerImpact proofRequired proofType evidenceRequired missionOrder"
        );

    if (session) {
        query.session(session);
    }

    const missionProgresses = await query;

    const statsMap = {};

    for (const mission of missionProgresses) {
        const stageId = mission.userStageId.toString();

        if (!statsMap[stageId]) {
            statsMap[stageId] = {
                totalMissions: 0,
                completedMissions: 0,
                missions: []
            };
        }

        statsMap[stageId].totalMissions += 1;

        if (mission.status === "completed") {
            statsMap[stageId].completedMissions += 1;
        }

        statsMap[stageId].missions.push({
            _id: mission._id,

            title: mission.missionTemplateId.title,
            description: mission.missionTemplateId.description,
            whyItMatters: mission.missionTemplateId.whyItMatters,

            difficulty: mission.missionTemplateId.difficulty,
            type: mission.missionTemplateId.type,
            priority: mission.missionTemplateId.priority,

            estimatedTime: mission.missionTemplateId.estimatedTime,
            careerImpact: mission.missionTemplateId.careerImpact,

            proofRequired: mission.missionTemplateId.proofRequired,
            proofType: mission.missionTemplateId.proofType,
            evidenceRequired:
                mission.missionTemplateId.evidenceRequired,

            missionOrder: mission.missionTemplateId.missionOrder,

            // User's progress
            status: mission.status,
            progress: mission.progress
        });
    }

    return statsMap;
};

const buildStageDetails = (userStages, missionStatsByStage) => {
    return userStages.map(userStage => {
        const stageTemplate = userStage.stageTemplateId;

        const missionStats =
            missionStatsByStage[userStage._id.toString()] || {
                totalMissions: 0,
                completedMissions: 0,
                missions: []
            };

        const progress =
            missionStats.totalMissions > 0
                ? Math.round(
                    (missionStats.completedMissions /
                        missionStats.totalMissions) * 100
                )
                : 0;

        return {
            stageId: userStage._id,
            title: stageTemplate.title,
            description: stageTemplate.description,
            stageOrder: stageTemplate.stageOrder,
            status: userStage.status,
            estimatedDuration: stageTemplate.estimatedDuration,

            completedMissions: missionStats.completedMissions,
            totalMissions: missionStats.totalMissions,

            progress,

            // 👇 actual missions for Roadmap UI
            missions: missionStats.missions
        };
    });
};
const calculateMissionProgress = (missionStatsByStage) => {
    let totalMissions = 0;
    let completedMissions = 0;

    for (const stageId in missionStatsByStage) {
        totalMissions +=
            missionStatsByStage[stageId].totalMissions;

        completedMissions +=
            missionStatsByStage[stageId].completedMissions;
    }

    const progress =
        totalMissions > 0
            ? Math.round(
                (completedMissions / totalMissions) * 100
            )
            : 0;

    return {
        completedMissions,
        totalMissions,
        progress
    };
};

module.exports={calculateRoadmapProgress,getMissionStatsByStage,buildStageDetails,calculateMissionProgress};