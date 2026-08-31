const UserRoadmap = require("../../models/UserRoadmap");
const UserStage = require("../../models/UserStage");
const MissionTemplate = require("../../models/MissionTemplate");
const UserMissionProgress = require("../../models/UserMissionProgress");

const buildProgressMap = (currentStages,currentMissionProgress) => {
    const progressMap = {};
    for (const userStage of currentStages) {
        const stageTemplateId =userStage.stageTemplateId._id.toString();
        const stageMissions =currentMissionProgress.filter(
            mission =>mission.userStageId.toString() ===userStage._id.toString());
            progressMap[stageTemplateId] = {
                stageStatus:userStage.status,
                userStageId:userStage._id,
                missions:stageMissions.map(mission => ({missionTemplateId:mission.missionTemplateId.toString(),
                    status:mission.status,
                    progress:mission.progress,
                    proof:mission.proof,
                    feedback:mission.feedback,
                    completedAt:mission.completedAt
                    }))
                };
        }

    return progressMap;
};
const deactivateCurrentRoadmap = async (userRoadmap,roadmapTemplate,aiAnalysis,session) => {
    userRoadmap.isActive = false;
    await userRoadmap.save({session});
    const newUserRoadmap = await UserRoadmap.create(
        [
            {
                userId: userRoadmap.userId,
                careerProfileId: userRoadmap.careerProfileId,
                roadmapTemplateId: roadmapTemplate._id,
                status: "not-started",
                progress: 0,
                estimatedCompletionDate:userRoadmap.estimatedCompletionDate,
                personalizationReason:aiAnalysis.personalizationReason,
                isActive: true,
                isDeleted: false
            }
        ],
        {
            session
        }
    );

    const regeneratedRoadmap = newUserRoadmap[0];

    return {
        roadmap: regeneratedRoadmap,
        roadmapId: regeneratedRoadmap._id,
        previousRoadmapId: userRoadmap._id,
        personalizationReason:aiAnalysis.personalizationReason
    };
};
const createRegeneratedStages = async (
    newUserRoadmap,
    stageTemplates,
    aiAnalysis,
    progressMap,
    session
) => {
    const createdStages = [];

    // ============================================================
    // 1. DETERMINE STARTING STAGE
    // ============================================================

    let startingStageIndex = aiAnalysis.startingStageIndex;

    // Make sure index is valid
    if (
        startingStageIndex < 0 ||
        startingStageIndex >= stageTemplates.length
    ) {
        startingStageIndex = 0;
    }

    // If AI points to a skipped stage, move forward to the
    // first non-skipped stage.
    while (
        startingStageIndex < stageTemplates.length
    ) {
        const template = stageTemplates[startingStageIndex];

        const aiStage = aiAnalysis.stages.find(
            stage =>
                stage.stageTemplateId.toString() ===
                template._id.toString()
        );

        if (aiStage?.action !== "skip") {
            break;
        }

        startingStageIndex++;
    }

    // ============================================================
    // 2. CREATE USER STAGES
    // ============================================================

    for (let index = 0; index < stageTemplates.length; index++) {

        const stageTemplate = stageTemplates[index];

        // ========================================================
        // FIND AI DECISION
        // ========================================================

        const aiStage = aiAnalysis.stages.find(
            stage =>
                stage.stageTemplateId.toString() ===
                stageTemplate._id.toString()
        );

        // If AI did not return a decision, skip this template
        if (!aiStage) {
            continue;
        }

        // ========================================================
        // SKIPPED STAGE
        // ========================================================

        if (aiStage.action === "skip") {

            const userStage = await UserStage.create(
                [
                    {
                        userId: newUserRoadmap.userId,

                        userRoadmapId:
                            newUserRoadmap._id,

                        stageTemplateId:
                            stageTemplate._id,

                        status: "skipped",

                        aiNotes:
                            "Skipped by AI during roadmap regeneration.",

                        skipReason:
                            aiAnalysis.personalizationReason
                    }
                ],
                {
                    session
                }
            );

            createdStages.push(userStage[0]);

            continue;
        }

        // ========================================================
        // PREVIOUS PROGRESS
        // ========================================================

        const previousProgress =
            progressMap[
                stageTemplate._id.toString()
            ];

        // ========================================================
        // DETERMINE IF THIS IS THE STARTING STAGE
        // ========================================================

        const isStartingStage =
            index === startingStageIndex;

        // ========================================================
        // DETERMINE STATUS
        // ========================================================

        let status = "locked";

        // Starting stage MUST be active
        if (isStartingStage) {

            status = "in-progress";

        }

        // Preserve previous stage status when appropriate
        else if (
            aiStage.action === "preserve" &&
            previousProgress
        ) {

            status =
                previousProgress.stageStatus;
        }

        // ========================================================
        // CREATE USER STAGE
        // ========================================================

        const userStage = await UserStage.create(
            [
                {
                    userId:
                        newUserRoadmap.userId,

                    userRoadmapId:
                        newUserRoadmap._id,

                    stageTemplateId:
                        stageTemplate._id,

                    status,

                    aiNotes:
                        aiStage.action
                }
            ],
            {
                session
            }
        );

        createdStages.push(userStage[0]);
    }

    // ============================================================
    // 3. FIND STARTING STAGE
    // ============================================================

    const startingStageTemplate =
        stageTemplates[startingStageIndex];

    const startingStage =
        createdStages.find(
            stage =>
                stage.stageTemplateId.toString() ===
                startingStageTemplate?._id.toString()
        );

    // ============================================================
    // 4. FIND CURRENT STAGE
    // ============================================================

    const currentStage =
        createdStages.find(
            stage =>
                stage.status === "in-progress"
        );

    // ============================================================
    // 5. SAFETY CHECK
    // ============================================================

    if (!startingStage) {
        throw new Error(
            "Unable to determine starting stage during roadmap regeneration."
        );
    }

    if (!currentStage) {
        throw new Error(
            "Roadmap regeneration completed without an active stage."
        );
    }

    // ============================================================
    // 6. RETURN RESULT
    // ============================================================

    return {
        createdStages,

        startingStageId:
            startingStage._id,

        currentStageId:
            currentStage._id
    };
};
const createRegeneratedMissionProgress = async (
    newUserStages,
    progressMap,
    session
) => {
    const createdProgress = [];

    for (const userStage of newUserStages) {

        // ============================================================
        // 1. SKIPPED STAGE
        // ============================================================

        if (userStage.status === "skipped") {
            console.log(
                `Skipping mission creation for skipped stage: ${userStage.stageTemplateId}`
            );

            continue;
        }

        // ============================================================
        // 2. GET PREVIOUS PROGRESS
        // ============================================================

        const stageTemplateId =
            userStage.stageTemplateId.toString();

        const previousProgress =
            progressMap[stageTemplateId];

        // ============================================================
        // 3. GET MISSION TEMPLATES
        // ============================================================

        const missionTemplates =
            await MissionTemplate.find({
                stageTemplateId: userStage.stageTemplateId
            }).session(session);

        console.log(
            `Mission templates found for stage ${stageTemplateId}:`,
            missionTemplates.length
        );

        // ============================================================
        // 4. CREATE MISSION PROGRESS
        // ============================================================

        for (const missionTemplate of missionTemplates) {

            const previousMission =
                previousProgress?.missions.find(
                    mission =>
                        mission.missionTemplateId.toString() ===
                        missionTemplate._id.toString()
                );

            const missionData = {
                userId: userStage.userId,

                userStageId: userStage._id,

                missionTemplateId: missionTemplate._id,

                status:
                    previousMission
                        ? previousMission.status
                        : "not-started",

                progress:
                    previousMission
                        ? previousMission.progress
                        : 0,

                feedback:
                    previousMission
                        ? previousMission.feedback
                        : "",

                completedAt:
                    previousMission?.completedAt || undefined
            };

            // ========================================================
            // 5. PRESERVE PROOF IF IT EXISTS
            // ========================================================

            if (
                previousMission &&
                previousMission.proof
            ) {
                missionData.proof =
                    previousMission.proof;
            }

            // ========================================================
            // 6. SAVE
            // ========================================================

            const missionProgress =
                await UserMissionProgress.create(
                    [missionData],
                    {
                        session
                    }
                );

            createdProgress.push(
                missionProgress[0]
            );
        }
    }

    return createdProgress;
};
module.exports={buildProgressMap,deactivateCurrentRoadmap,createRegeneratedStages,createRegeneratedMissionProgress};