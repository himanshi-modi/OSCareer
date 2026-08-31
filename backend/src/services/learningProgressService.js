const mongoose = require("mongoose");
const AppError = require("../errors/AppError");
const CareerProfile = require("../models/CareerProfile");
const UserRoadmap = require("../models/UserRoadmap");
const UserStage = require("../models/UserStage");
const UserMissionProgress = require("../models/UserMissionProgress");
const CAREER_PROFILE_MESSAGES = require("../constants/messages/careerProfileMessages");
const ROADMAP_MESSAGES = require("../constants/messages/roadmapMessages");
const STAGE_MESSAGES=require("../constants/messages/userStageMessages");
const MissionTemplate = require("../models/MissionTemplate");
const StageTemplate =require("../models/StageTemplate");

const getActiveCareerProfile = async (userId, session = null) => {
    const query = CareerProfile.findOne({
        userId,
        isActive: true,
        isDeleted: false
    });

    if (session) {
        query.session(session);
    }

    const careerProfile = await query;

    if (!careerProfile) {
        throw new AppError(
            CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
            404
        );
    }

    return careerProfile;
};
const getActiveRoadmap = async (
    userId,
    careerProfileId,
    session = null
) => {

    const query = UserRoadmap.findOne({
        userId,
        careerProfileId,
        isActive: true,
        isDeleted: false
    });

    if (session) {
        query.session(session);
    }

    const roadmap = await query;

    if (!roadmap) {
        throw new AppError(
            ROADMAP_MESSAGES.ACTIVE_ROADMAP_NOT_FOUND,
            404
        );
    }

    return roadmap;
};
const getUserStage = async (
    userId,
    userRoadmapId,
    stageTemplateId,
    session = null
) => {

    const query = UserStage.findOne({
        userId,
        userRoadmapId,
        stageTemplateId,
        isDeleted: false
    });

    if (session) {
        query.session(session);
    }

    const stage = await query;

    if (!stage) {
        throw new AppError(
            STAGE_MESSAGES.STAGE_NOT_FOUND,
            404
        );
    }

    return stage;
};
const getStageDetails = async (userId, stageId) => {

    if (!mongoose.Types.ObjectId.isValid(stageId)) {
        throw new AppError(
            STAGE_MESSAGES.INVALID_STAGE_ID,
            400
        );
    }

    const careerProfile =
        await getActiveCareerProfile(userId);

    const userRoadmap =
        await getActiveRoadmap(
            userId,
            careerProfile._id
        );

    const userStage = await UserStage.findOne({
        _id: stageId,
        userId,
        userRoadmapId: userRoadmap._id,
        isDeleted: false
    })
        .populate(
            "stageTemplateId",
            "title description stageOrder estimatedDuration totalMissions unlockCondition isOptional"
        )
        .lean();

    if (!userStage) {
        throw new AppError(
            STAGE_MESSAGES.STAGE_NOT_FOUND,
            404
        );
    }

    const missionProgress =
        await UserMissionProgress.find({
            userId,
            userStageId: userStage._id,
            isDeleted: false
        }).lean();

    const totalMissions =
        missionProgress.length;

    const completedMissions =
        missionProgress.filter(
            mission =>
                mission.status === "completed"
        ).length;

    const progress =
        totalMissions === 0
            ? 0
            : Math.round(
                  (completedMissions /
                      totalMissions) *
                      100
              );

    let currentMission = null;

    if (userStage.status !== "locked") {

        const activeMission =
            missionProgress.find(
                mission =>
                    mission.status ===
                        "in-progress" ||
                    mission.status ===
                        "not-started"
            );

        if (activeMission) {

            currentMission = {

                missionProgressId:
                    activeMission._id,

                missionTemplateId:
                    activeMission.missionTemplateId,

                status:
                    activeMission.status

            };

        }

    }

    let unlockRequirement = null;

    if (
        userStage.status === "locked"
    ) {

        if (
            userStage.stageTemplateId
                .unlockCondition ===
            "previous-stage-completed"
        ) {

            unlockRequirement = {

                type:
                    "previous-stage-completed",

                message:
                    "Complete the previous stage to unlock this stage."

            };

        } else {

            unlockRequirement = {

                type: "immediate",

                message:
                    "This stage is immediately available."

            };

        }

    }

    return {

        stageId: userStage._id,

        roadmapId: userRoadmap._id,

        careerProfileId:
            careerProfile._id,

        title:
            userStage.stageTemplateId.title,

        description:
            userStage.stageTemplateId.description,

        stageOrder:
            userStage.stageTemplateId.stageOrder,

        status:
            userStage.status,

        progress,

        totalMissions,

        completedMissions,

        estimatedDuration:
            userStage.stageTemplateId
                .estimatedDuration,

        isOptional:
            userStage.stageTemplateId
                .isOptional,

        unlockCondition:
            userStage.stageTemplateId
                .unlockCondition,

        unlockRequirement,

        currentMission

    };

};
const getUserStages = async (userId) => {

    const careerProfile = await getActiveCareerProfile(userId);

    const userRoadmap = await getActiveRoadmap(
        userId,
        careerProfile._id
    );
    console.log("========== STAGE DEBUG ==========");
console.log("USER ID:", userId);
console.log("CAREER PROFILE ID:", careerProfile._id);
console.log("ROADMAP ID:", userRoadmap._id);


    const userStages = await UserStage.find({
        userId,
        userRoadmapId: userRoadmap._id,
        isDeleted: false
    })
        .populate(
            "stageTemplateId",
            "title description stageOrder"
        )
        .lean();
        console.log("🔥 USER STAGES FOUND:", userStages);
    if (userStages.length === 0) {
        throw new AppError(
            STAGE_MESSAGES.STAGES_NOT_FOUND,
            404
        );
    }

    userStages.sort(
        (a, b) =>
            a.stageTemplateId.stageOrder -
            b.stageTemplateId.stageOrder
    );

    const userStageIds = userStages.map(
        stage => stage._id
    );

    const missionProgress =
        await UserMissionProgress.find({
            userStageId: {
                $in: userStageIds
            },
            isDeleted: false
        }).lean();

    const missionMap = new Map();

    missionProgress.forEach(progress => {

        const stageId =
            progress.userStageId.toString();

        if (!missionMap.has(stageId)) {
            missionMap.set(stageId, []);
        }

        missionMap
            .get(stageId)
            .push(progress);

    });

    const stages = userStages.map(stage => {

        const missions =
            missionMap.get(stage._id.toString()) || [];

        const totalMissions =
            missions.length;

        const completedMissions =
            missions.filter(
                mission =>
                    mission.status === "completed"
            ).length;

        const progress =
            totalMissions === 0
                ? 0
                : Math.round(
                      (completedMissions /
                          totalMissions) *
                          100
                  );

        return {

            stageId: stage._id,

            title: stage.stageTemplateId.title,

            description:
                stage.stageTemplateId.description,

            stageOrder:
                stage.stageTemplateId.stageOrder,

            status: stage.status,

            progress,

            totalMissions,

            completedMissions

        };

    });

    return {

        roadmapId: userRoadmap._id,

        careerProfileId: careerProfile._id,

        targetCareer:
            careerProfile.targetCareer,

        stages

    };

};
const getCurrentStageProgress = async (userId) => {

    const result = await getUserStages(userId);

    const stages = result.stages || [];

    if (stages.length === 0) {
        return {
            currentStage: null,
            stageProgress: 0,
            overallProgress: 0,
            completedStages: 0,
            totalStages: 0
        };
    }

    const currentStage = stages.find(
        stage => stage.status === "in-progress"
    );

    const completedStages = stages.filter(
        stage => stage.status === "completed"
    ).length;

    const totalStages = stages.length;

    const overallProgress = Math.round(
        (completedStages / totalStages) * 100
    );

    return {
        currentStage: currentStage
            ? currentStage.title
            : null,

        stageProgress: currentStage
            ? currentStage.progress
            : 0,

        overallProgress,

        completedStages,

        totalStages
    };
};


const getStageMissions = async (userId, stageId) => {
    console.log("🔥🔥🔥 SERVICE getStageMissions HIT 🔥🔥🔥");
    console.log("🔥 userId:", userId);
    console.log("🔥 stageId:", stageId);


    
    if (!mongoose.Types.ObjectId.isValid(stageId)) {
        throw new AppError(STAGE_MESSAGES.INVALID_STAGE_ID, 400);
    }
    const careerProfile = await CareerProfile.findOne({
        userId,
        isActive: true,
        isDeleted: false
    });

    if (!careerProfile) {
        throw new AppError(CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,404);
    }

    const userRoadmap = await UserRoadmap.findOne({
        _id: { $exists: true},
        userId,
        careerProfileId: careerProfile._id,
        isActive: true,
        isDeleted: false
    });
    if (!userRoadmap) {
        throw new AppError(ROADMAP_MESSAGES.ROADMAP_NOT_FOUND, 404);
    }
    const userStage = await UserStage.findOne({
        _id: stageId,
        userId,
        userRoadmapId: userRoadmap._id,
        isDeleted: false
    }).populate(
        "stageTemplateId",
        "title description stageOrder estimatedDuration totalMissions unlockCondition isOptional"
    );
    if (!userStage) {
        throw new AppError(
            STAGE_MESSAGES.STAGE_NOT_FOUND,
            404
        );
    }
    if (userStage.status === "locked") {

        return {
            stageId: userStage._id,
            stageTitle: userStage.stageTemplateId.title,
            stageStatus: userStage.status,
            progress: 0,
            totalMissions: userStage.stageTemplateId.totalMissions,
            completedMissions: 0,
            missions: []
        };
    }
    const missionTemplates = await MissionTemplate.find({
        stageTemplateId: userStage.stageTemplateId._id,
    }).sort({
            missionOrder: 1
        })
        .lean();
        console.log("🔥 STAGE ID:", stageId);
console.log(
    "🔥 STAGE TEMPLATE ID:",
    userStage.stageTemplateId._id.toString()
);
console.log(
    "🔥 MISSION TEMPLATES FOUND:",
    missionTemplates.length
);
console.log(
    "🔥 MISSION TEMPLATES:",
    missionTemplates.map(m => ({
        id: m._id,
        title: m.title,
        stageTemplateId: m.stageTemplateId,
        missionOrder: m.missionOrder
    }))
);
        
    if (missionTemplates.length === 0) {
        throw new AppError(STAGE_MESSAGES.MISSIONS_NOT_FOUND,404);
    }
    const missionProgress = await UserMissionProgress.find({
        userId,
        userStageId: userStage._id,
        isDeleted: false
    }).lean();

    const progressMap = new Map(
        missionProgress.map(progress => [
            progress.missionTemplateId.toString(),
            progress
        ])
    );

    let previousMissionResolved = true;
    
    const missions = missionTemplates.map((missionTemplate) => {

        const progress = progressMap.get(
            missionTemplate._id.toString()
        );
        if (!progress) {
            const status = previousMissionResolved
            ? "not-started"
            : "locked";
             previousMissionResolved = false;
            return {
    missionId: missionTemplate._id,
    missionOrder: missionTemplate.missionOrder,
    title: missionTemplate.title,
    description: missionTemplate.description,

    difficulty: missionTemplate.difficulty,
    type: missionTemplate.type,
    priority: missionTemplate.priority,
    estimatedTime: missionTemplate.estimatedTime,

    whyItMatters: missionTemplate.whyItMatters,
    careerImpact: missionTemplate.careerImpact,
    evidenceRequired: missionTemplate.evidenceRequired,

    proofRequired: missionTemplate.proofRequired,
    proofType: missionTemplate.proofType,

    status,
    progress: 0,
    startedAt: null,
    submittedAt: null,
    completedAt: null,
    feedback: "",
    rejectionReason: null
};
        }
        let effectiveStatus = progress.status;
        if (!previousMissionResolved) {
        effectiveStatus = "locked";
    }
    previousMissionResolved =
        progress.status === "completed" ||
        progress.status === "skipped";

        return {
    missionId: missionTemplate._id,
    missionOrder: missionTemplate.missionOrder,
    title: missionTemplate.title,
    description: missionTemplate.description,

    difficulty: missionTemplate.difficulty,
    type: missionTemplate.type,
    priority: missionTemplate.priority,
    estimatedTime: missionTemplate.estimatedTime,

    whyItMatters: missionTemplate.whyItMatters,
    careerImpact: missionTemplate.careerImpact,
    evidenceRequired: missionTemplate.evidenceRequired,

    proofRequired: missionTemplate.proofRequired,
    proofType: missionTemplate.proofType,

    status: effectiveStatus,
    progress: progress.progress,
    startedAt: progress.startedAt,
    submittedAt: progress.proof?.submittedAt || null,
    completedAt: progress.completedAt,
    feedback: progress.feedback || "",
    rejectionReason: progress.rejectionReason || null
};
    });
    const completedMissions = missionProgress.filter(
        mission => mission.status === "completed"
    ).length;

    const totalMissions = missionTemplates.length;
    const stageProgress = totalMissions === 0? 0: Math.round((completedMissions / totalMissions) * 100);
    return{
        stageId: userStage._id,
        stageTitle: userStage.stageTemplateId.title,
        stageStatus: userStage.status,
        progress: stageProgress,
        totalMissions,
        completedMissions,
        missions
    };
};
const getMissionDetails = async (userId, missionId) => {
    console.log(
        "🔥 GET MISSION DETAILS CALLED:",
        {
            userId,
            missionId,
            time: new Date().toISOString()
        }
    );
    // ============================================================
    // 1. Validate mission ID
    // ============================================================

    if (!mongoose.Types.ObjectId.isValid(missionId)) {
        throw new AppError(
            STAGE_MESSAGES.INVALID_MISSION_ID,
            400
        );
    }

    // ============================================================
    // 2. Get active career profile
    // ============================================================

    const careerProfile = await CareerProfile.findOne({
        userId,
        isActive: true,
        isDeleted: false
    }).lean();

    if (!careerProfile) {
        throw new AppError(
            CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
            404
        );
    }

    // ============================================================
    // 3. Get active roadmap
    // ============================================================

    const userRoadmap = await UserRoadmap.findOne({
        userId,
        careerProfileId: careerProfile._id,
        isActive: true,
        isDeleted: false
    }).lean();

    if (!userRoadmap) {
        throw new AppError(
            ROADMAP_MESSAGES.ACTIVE_ROADMAP_NOT_FOUND,
            404
        );
    }

    // ============================================================
    // 4. Get mission template
    // ============================================================

    const missionTemplate = await MissionTemplate.findOne({
        _id: missionId
    }).lean();

    if (!missionTemplate) {
        throw new AppError(
            STAGE_MESSAGES.MISSION_NOT_FOUND,
            404
        );
    }

    // ============================================================
    // 5. Get user's stage containing this mission
    // ============================================================

    const userStage = await UserStage.findOne({
        userId,
        userRoadmapId: userRoadmap._id,
        stageTemplateId: missionTemplate.stageTemplateId,
        isDeleted: false
    })
        .populate(
            "stageTemplateId",
            "title description stageOrder estimatedDuration totalMissions unlockCondition isOptional"
        )
        .lean();

    if (!userStage) {
        throw new AppError(
            STAGE_MESSAGES.STAGE_NOT_FOUND,
            404
        );
    }

    // ============================================================
    // 6. Get user's mission progress
    // ============================================================

    const missionProgress = await UserMissionProgress.findOne({
        userId,
        userStageId: userStage._id,
        missionTemplateId: missionTemplate._id,
        isDeleted: false
    }).lean();

    // ============================================================
    // 7. Build progress data
    // ============================================================

    const progressData = missionProgress
        ? {
              status: missionProgress.status,
              progress: missionProgress.progress || 0,

              startedAt:
                  missionProgress.startedAt || null,

              submittedAt:
                  missionProgress.proof?.submittedAt || null,

              completedAt:
                  missionProgress.completedAt || null,

              proof: {
                  url:
                      missionProgress.proof?.url || null,

                  text:
                      missionProgress.proof?.text || null,

                  type:
                      missionProgress.proof?.type || null,

                  status:
                      missionProgress.proof?.status ||
                      "not-submitted"
              },

              feedback:
                  missionProgress.feedback || "",

              rejectionReason:
                  missionProgress.rejectionReason || "",

              skipReason:
                  missionProgress.skipReason || ""
          }
        : {
              status: "not-started",
              progress: 0,
              startedAt: null,
              submittedAt: null,
              completedAt: null,

              proof: {
                  url: null,
                  text: null,
                  type: null,
                  status: "not-submitted"
              },

              feedback: "",
              rejectionReason: "",
              skipReason: ""
          };

    // ============================================================
    // 8. Return complete mission details
    // ============================================================

    return {
        missionId: missionTemplate._id,

        title: missionTemplate.title,

        description:
            missionTemplate.description,

        difficulty:
            missionTemplate.difficulty,

        priority:
            missionTemplate.priority,

        estimatedTime:
            missionTemplate.estimatedTime,

        type:
            missionTemplate.type,

        whyItMatters:
            missionTemplate.whyItMatters,

        proofRequired:
            missionTemplate.proofRequired,

        proofType:
            missionTemplate.proofType,

        evidenceRequired:
            missionTemplate.evidenceRequired,

        careerImpact:
            missionTemplate.careerImpact,

        missionOrder:
            missionTemplate.missionOrder,

        stage: {
            stageId: userStage._id,

            stageOrder:
                userStage.stageTemplateId.stageOrder,

            title:
                userStage.stageTemplateId.title
        },

        status:
            progressData.status,

        progress:
            progressData.progress,

        startedAt:
            progressData.startedAt,

        submittedAt:
            progressData.submittedAt,

        completedAt:
            progressData.completedAt,

        proof:
            progressData.proof,

        feedback:
            progressData.feedback,

        rejectionReason:
            progressData.rejectionReason,

        skipReason:
            progressData.skipReason
    };
};
const startMission = async (userId, missionId) => {
    console.log(
        "🟢 START MISSION CALLED:",
        {
            userId,
            missionId,
            time: new Date().toISOString()
        }
    );
    if (!mongoose.Types.ObjectId.isValid(missionId)) {
        throw new AppError(
            STAGE_MESSAGES.INVALID_MISSION_ID,
            400
        );
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // ============================================================
        // 1. FIND ACTIVE CAREER PROFILE
        // ============================================================

        const careerProfile = await CareerProfile.findOne({
            userId,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!careerProfile) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 2. FIND ACTIVE USER ROADMAP
        // ============================================================

        const userRoadmap = await UserRoadmap.findOne({
            userId,
            careerProfileId: careerProfile._id,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!userRoadmap) {
            throw new AppError(
                ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 3. FIND MISSION TEMPLATE
        // ============================================================

        const missionTemplate = await MissionTemplate.findOne({
            _id: missionId
        }).session(session);

        if (!missionTemplate) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 4. FIND USER STAGE
        // ============================================================

        const userStage = await UserStage.findOne({
            userId,
            userRoadmapId: userRoadmap._id,
            stageTemplateId: missionTemplate.stageTemplateId,
            isDeleted: false
        }).session(session);

        if (!userStage) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 5. CHECK STAGE ACCESS
        // ============================================================

        if (userStage.status === "locked") {
            throw new AppError(
                STAGE_MESSAGES.STAGE_LOCKED,
                403
            );
        }

        // ============================================================
        // 6. FIND EXISTING MISSION PROGRESS
        // ============================================================

        let missionProgress = await UserMissionProgress.findOne({
            userId,
            userStageId: userStage._id,
            missionTemplateId: missionTemplate._id,
            isDeleted: false
        }).session(session);

        // ============================================================
        // 7. CREATE PROGRESS IF IT DOESN'T EXIST
        // ============================================================

        if (!missionProgress) {
            missionProgress = new UserMissionProgress({
                userId,
                userStageId: userStage._id,
                missionTemplateId: missionTemplate._id,
                status: "not-started",
                progress: 0
            });
        }

        // ============================================================
        // 8. PREVENT INVALID STARTS
        // ============================================================

        if (missionProgress.status === "completed") {
            throw new AppError(
                STAGE_MESSAGES.MISSION_ALREADY_COMPLETED,
                409
            );
        }

        if (
            missionProgress.status === "submitted" ||
            missionProgress.status === "under-review"
        ) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_ALREADY_SUBMITTED,
                409
            );
        }

        // ============================================================
        // 9. START / RESTART MISSION
        // ============================================================

        if (
            missionProgress.status === "not-started" ||
            missionProgress.status === "rejected" ||
            missionProgress.status === "skipped"
        ) {
            missionProgress.status = "in-progress";

            if (!missionProgress.startedAt) {
                missionProgress.startedAt = new Date();
            }

            // If restarting after rejection/skipping,
            // clear previous review-related information.
            missionProgress.rejectionReason = "";
            missionProgress.feedback = "";

            missionProgress.proof.status = "not-submitted";
            missionProgress.proof.submittedAt = null;
        }

        // ============================================================
        // 10. SAVE MISSION PROGRESS
        // ============================================================

        await missionProgress.save({ session });

        // ============================================================
        // 11. START STAGE IF NECESSARY
        // ============================================================

        if (userStage.status === "not-started") {
            userStage.status = "in-progress";

            if (!userStage.startedAt) {
                userStage.startedAt = new Date();
            }

            await userStage.save({ session });
        }
        if (userRoadmap.status === "not-started") {
            userRoadmap.status = "in-progress";
        }

        // ============================================================
        // 12. UPDATE ROADMAP ACTIVITY
        // ============================================================

        userRoadmap.lastActivityAt = new Date();

        await userRoadmap.save({ session });

        // ============================================================
        // 13. COMMIT TRANSACTION
        // ============================================================

        await session.commitTransaction();

        // ============================================================
        // 14. RETURN RESULT
        // ============================================================

        return {
            missionProgressId: missionProgress._id,
            missionId: missionTemplate._id,
            stageId: userStage._id,
            missionStatus: missionProgress.status,
            progress: missionProgress.progress,
            startedAt: missionProgress.startedAt,
            stageStatus: userStage.status
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};
const submitMissionProof = async (userId, missionId, proofData) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // ============================================================
        // 1. VALIDATE MISSION ID
        // ============================================================

        if (!mongoose.Types.ObjectId.isValid(missionId)) {
            throw new AppError(
                STAGE_MESSAGES.INVALID_MISSION_ID,
                400
            );
        }

        // ============================================================
        // 2. FIND ACTIVE CAREER PROFILE
        // ============================================================

        const careerProfile = await CareerProfile.findOne({
            userId,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!careerProfile) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 3. FIND ACTIVE USER ROADMAP
        // ============================================================

        const userRoadmap = await UserRoadmap.findOne({
            userId,
            careerProfileId: careerProfile._id,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!userRoadmap) {
            throw new AppError(
                ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 4. FIND MISSION TEMPLATE
        // ============================================================

        const mission = await MissionTemplate.findById(
            missionId
        ).session(session);

        if (!mission) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 5. FIND USER STAGE
        // ============================================================

        const userStage = await UserStage.findOne({
            userId,
            userRoadmapId: userRoadmap._id,
            stageTemplateId: mission.stageTemplateId,
            isDeleted: false
        }).session(session);

        if (!userStage) {
            throw new AppError(
                STAGE_MESSAGES.STAGE_NOT_FOUND,
                404
            );
        }

        if (userStage.status === "locked") {
            throw new AppError(
                STAGE_MESSAGES.STAGE_LOCKED,
                403
            );
        }

        // ============================================================
        // 6. FIND MISSION PROGRESS
        // ============================================================

        const missionProgress =
            await UserMissionProgress.findOne({
                userId,
                userStageId: userStage._id,
                missionTemplateId: mission._id,
                isDeleted: false
            }).session(session);

        if (!missionProgress) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_PROGRESS_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 7. MISSION MUST HAVE BEEN STARTED
        // ============================================================

        if (missionProgress.status === "not-started") {
            throw new AppError(
                STAGE_MESSAGES.START_MISSION_BEFORE_COMPLETING,
                400
            );
        }

        // ============================================================
        // 8. PREVENT SUBMISSION AFTER COMPLETION
        // ============================================================

        if (missionProgress.status === "completed") {
            throw new AppError(
                "Mission is already completed.",
                409
            );
        }

        // ============================================================
        // 9. PREVENT DUPLICATE PENDING SUBMISSION
        // ============================================================

        if (
            missionProgress.status === "submitted" ||
            missionProgress.status === "under-review" ||
            missionProgress.proof?.status === "pending"
        ) {
            throw new AppError(
                "Your proof is already under review.",
                409
            );
        }

        // ============================================================
        // 10. ALLOW ONLY IN-PROGRESS OR REJECTED MISSIONS
        // ============================================================

        if (
            missionProgress.status !== "in-progress" &&
            missionProgress.status !== "rejected"
        ) {
            throw new AppError(
                "Mission cannot be submitted in its current state.",
                400
            );
        }

        // ============================================================
        // 11. MISSION MUST REQUIRE PROOF
        // ============================================================

        if (!mission.proofRequired) {
            throw new AppError(
                "This mission does not require proof submission.",
                400
            );
        }

        // ============================================================
        // 12. VALIDATE PROOF DATA
        // ============================================================

        if (!proofData || !proofData.type) {
            throw new AppError(
                "Proof is required to submit this mission.",
                400
            );
        }

        // ============================================================
        // 13. VALIDATE PROOF TYPE
        // ============================================================

        if (proofData.type !== mission.proofType) {
            throw new AppError(
                "Submitted proof type does not match the required proof type.",
                400
            );
        }

        // ============================================================
        // 14. VALIDATE URL-BASED PROOF
        // ============================================================

        if (
            ["github", "link", "file", "image"].includes(
                proofData.type
            )
        ) {
            if (!proofData.url) {
                throw new AppError(
                    "Proof URL is required.",
                    400
                );
            }

            try {
                new URL(proofData.url);
            } catch (error) {
                throw new AppError(
                    "Invalid proof URL.",
                    400
                );
            }
        }

        // ============================================================
        // 15. VALIDATE TEXT PROOF
        // ============================================================

        if (proofData.type === "text") {
            if (
                !proofData.text ||
                !proofData.text.trim()
            ) {
                throw new AppError(
                    "Proof text is required.",
                    400
                );
            }
        }

        // ============================================================
        // 16. SAVE / REPLACE PROOF
        // ============================================================

        missionProgress.proof = {
            type: proofData.type,
            url: proofData.url || null,
            text: proofData.text || null,
            submittedAt: new Date(),
            status: "pending"
        };

        // ============================================================
        // 17. UPDATE MISSION STATUS
        // ============================================================

        missionProgress.status = "submitted";

        // Keep existing progress.
        // Approval will set progress to 100.

        await missionProgress.save({
            session
        });

        // ============================================================
        // 18. COMMIT TRANSACTION
        // ============================================================

        await session.commitTransaction();

        // ============================================================
        // 19. RESPONSE
        // ============================================================

        return {
            missionProgressId: missionProgress._id,
            missionId: mission._id,
            stageId: userStage._id,
            missionStatus: missionProgress.status,
            progress: missionProgress.progress,
            proof: missionProgress.proof
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;

    } finally {
        await session.endSession();
    }
};

const completeMission = async (userId, missionId) => {

    console.log("🚨 COMPLETE MISSION CALLED:", {
        userId,
        missionId,
        time: new Date().toISOString()
    });

    if (!mongoose.Types.ObjectId.isValid(missionId)) {
        throw new AppError(
            STAGE_MESSAGES.INVALID_MISSION_ID,
            400
        );
    }

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        // ============================================================
        // 1. FIND ACTIVE CAREER PROFILE
        // ============================================================

        const careerProfile = await CareerProfile.findOne({
            userId,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!careerProfile) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 2. FIND ACTIVE ROADMAP
        // ============================================================

        const userRoadmap = await UserRoadmap.findOne({
            userId,
            careerProfileId: careerProfile._id,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!userRoadmap) {
            throw new AppError(
                ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 3. FIND MISSION TEMPLATE
        // ============================================================

        const missionTemplate = await MissionTemplate.findById(
            missionId
        ).session(session);

        if (!missionTemplate) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 4. FIND USER STAGE
        // ============================================================

        const userStage = await UserStage.findOne({
            userId,
            userRoadmapId: userRoadmap._id,
            stageTemplateId: missionTemplate.stageTemplateId,
            isDeleted: false
        }).session(session);

        if (!userStage) {
            throw new AppError(
                STAGE_MESSAGES.STAGE_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 5. STAGE MUST NOT BE LOCKED
        // ============================================================

        if (userStage.status === "locked") {
            throw new AppError(
                STAGE_MESSAGES.STAGE_LOCKED,
                403
            );
        }

        // ============================================================
        // 6. FIND USER MISSION PROGRESS
        // ============================================================

        const missionProgress = await UserMissionProgress.findOne({
            userId,
            userStageId: userStage._id,
            missionTemplateId: missionTemplate._id,
            isDeleted: false
        }).session(session);

        if (!missionProgress) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_PROGRESS_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 7. MISSION MUST BE STARTED
        // ============================================================

        if (missionProgress.status === "not-started") {
            throw new AppError(
                STAGE_MESSAGES.START_MISSION_BEFORE_COMPLETING,
                400
            );
        }

        // ============================================================
        // 8. CANNOT COMPLETE ALREADY COMPLETED MISSION
        // ============================================================

        if (missionProgress.status === "completed") {
            throw new AppError(
                STAGE_MESSAGES.MISSION_ALREADY_COMPLETED,
                409
            );
        }

        // ============================================================
        // 9. SKIPPED MISSION CANNOT BE COMPLETED
        // ============================================================

        if (missionProgress.status === "skipped") {
            throw new AppError(
                "Skipped missions cannot be completed.",
                409
            );
        }

        // ============================================================
        // 10. PROOF-REQUIRED MISSION
        // ============================================================

        if (missionTemplate.proofRequired) {

            if (
                !missionProgress.proof ||
                missionProgress.proof.status !== "approved"
            ) {
                throw new AppError(
                    "Mission proof must be approved before completing this mission.",
                    400
                );
            }
        }

        // ============================================================
        // 11. VALID MISSION STATUS
        // ============================================================

        if (
            missionProgress.status !== "in-progress" &&
            missionProgress.status !== "under-review"
        ) {
            throw new AppError(
                "Mission cannot be completed in its current state.",
                400
            );
        }

        // ============================================================
        // 12. COMPLETE MISSION
        // ============================================================

        missionProgress.status = "completed";
        missionProgress.progress = 100;
        missionProgress.completedAt = new Date();

        await missionProgress.save({ session });

        // ============================================================
        // 13. GET ALL REQUIRED MISSION TEMPLATES
        // ============================================================

        const requiredMissionTemplates = await MissionTemplate.find({
            stageTemplateId: userStage.stageTemplateId,
            isRequired: true
        }).session(session);

        // ============================================================
        // 14. GET ALL USER MISSION PROGRESS FOR THIS STAGE
        // ============================================================

        const stageMissionProgress = await UserMissionProgress.find({
            userId,
            userStageId: userStage._id,
            isDeleted: false
        }).session(session);

        // ============================================================
        // 15. FINISHED MISSIONS
        //
        // BOTH completed AND skipped COUNT AS FINISHED
        // ============================================================

        const finishedMissionIds = new Set(
            stageMissionProgress
                .filter(
                    progress =>
                        progress.status === "completed" ||
                        progress.status === "skipped"
                )
                .map(
                    progress =>
                        progress.missionTemplateId.toString()
                )
        );

        console.log("✅ REQUIRED MISSIONS:", 
            requiredMissionTemplates.map(m => ({
                id: m._id.toString(),
                title: m.title
            }))
        );

        console.log("✅ FINISHED MISSIONS:", [
            ...finishedMissionIds
        ]);

        // ============================================================
        // 16. CHECK IF ALL REQUIRED MISSIONS ARE FINISHED
        // ============================================================

        const allRequiredMissionsFinished =
            requiredMissionTemplates.length > 0 &&
            requiredMissionTemplates.every(
                mission =>
                    finishedMissionIds.has(
                        mission._id.toString()
                    )
            );

        console.log(
            "🔥 ALL REQUIRED MISSIONS FINISHED:",
            allRequiredMissionsFinished
        );

        let stageCompleted = false;
        let roadmapCompleted = false;
        let nextStage = null;

        // ============================================================
        // 17. CALCULATE STAGE PROGRESS
        // ============================================================

        const totalRequiredMissions =
            requiredMissionTemplates.length;

        const finishedRequiredMissions =
            requiredMissionTemplates.filter(
                mission =>
                    finishedMissionIds.has(
                        mission._id.toString()
                    )
            ).length;

        const stageProgress =
            totalRequiredMissions > 0
                ? Math.round(
                    (finishedRequiredMissions /
                        totalRequiredMissions) *
                    100
                )
                : 0;

        console.log(
            "📊 STAGE PROGRESS:",
            stageProgress
        );

        // ============================================================
        // 18. COMPLETE CURRENT STAGE
        // ============================================================

        if (
            allRequiredMissionsFinished &&
            userStage.status !== "completed"
        ) {

            userStage.status = "completed";
            userStage.completedAt = new Date();
            userStage.lastactivityAt = new Date();

            await userStage.save({ session });

            stageCompleted = true;

            console.log(
                "🎉 STAGE COMPLETED:",
                userStage._id.toString()
            );

            // ========================================================
            // 19. FIND CURRENT STAGE TEMPLATE
            // ========================================================

            const currentStageTemplate =
                await StageTemplate.findById(
                    userStage.stageTemplateId
                ).session(session);

            if (currentStageTemplate) {

                // ====================================================
                // 20. FIND NEXT STAGE TEMPLATE
                // ====================================================

                const nextStageTemplate =
                    await StageTemplate.findOne({
                        roadmapTemplateId:
                            currentStageTemplate.roadmapTemplateId,

                        stageOrder:
                            currentStageTemplate.stageOrder + 1
                    }).session(session);

                // ====================================================
                // 21. NEXT STAGE EXISTS
                // ====================================================

                if (nextStageTemplate) {

                    nextStage =
                        await UserStage.findOne({
                            userId,
                            userRoadmapId: userRoadmap._id,
                            stageTemplateId:
                                nextStageTemplate._id,
                            isDeleted: false
                        }).session(session);

                    // =================================================
                    // 22. UNLOCK NEXT STAGE
                    // =================================================

                    if (
                        nextStage &&
                        nextStage.status === "locked"
                    ) {

                        nextStage.status = "not-started";
                        nextStage.startedAt = null;
                        nextStage.lastactivityAt = new Date();

                        await nextStage.save({ session });

                        console.log(
                            "🔓 NEXT STAGE UNLOCKED:",
                            nextStage._id.toString()
                        );
                    }

                    // =================================================
                    // 23. UPDATE CURRENT ROADMAP STAGE
                    // =================================================

                    if (nextStage) {

                        userRoadmap.currentStageId =
                            nextStage._id;
                    }

                } else {

                    // =================================================
                    // 24. NO NEXT STAGE = ROADMAP COMPLETE
                    // =================================================

                    userRoadmap.status = "completed";
                    userRoadmap.progress = 100;
                    userRoadmap.completedAt = new Date();

                    roadmapCompleted = true;

                    console.log(
                        "🏆 ROADMAP COMPLETED"
                    );
                }
            }
        }

        // ============================================================
        // 25. UPDATE ROADMAP PROGRESS
        //
        // Stage completion is what contributes to roadmap progress.
        // ============================================================

        if (!roadmapCompleted) {

            const allUserStages =
                await UserStage.find({
                    userId,
                    userRoadmapId: userRoadmap._id,
                    isDeleted: false
                }).session(session);

            const totalStages =
                allUserStages.length;

            const completedStages =
                allUserStages.filter(
                    stage =>
                        stage.status === "completed" ||
                        stage._id.toString() ===
                            userStage._id.toString()
                ).length;

            const roadmapProgress =
                totalStages > 0
                    ? Math.round(
                        (completedStages /
                            totalStages) *
                        100
                    )
                    : 0;

            userRoadmap.progress =
                roadmapProgress;

            if (
                userRoadmap.status === "not-started"
            ) {
                userRoadmap.status =
                    "in-progress";
            }

            userRoadmap.lastActivityAt =
                new Date();

            await userRoadmap.save({
                session
            });

        } else {

            userRoadmap.lastActivityAt =
                new Date();

            await userRoadmap.save({
                session
            });
        }

        // ============================================================
        // 26. COMMIT TRANSACTION
        // ============================================================

        await session.commitTransaction();

        // ============================================================
        // 27. RETURN RESULT
        // ============================================================

        return {

            missionProgressId:
                missionProgress._id,

            missionId:
                missionTemplate._id,

            stageId:
                userStage._id,

            missionStatus:
                missionProgress.status,

            progress:
                missionProgress.progress,

            completedAt:
                missionProgress.completedAt,

            stageStatus:
                userStage.status,

            stageProgress,

            stageCompleted,

            roadmapId:
                userRoadmap._id,

            roadmapProgress:
                userRoadmap.progress,

            roadmapStatus:
                userRoadmap.status,

            roadmapCompleted,

            nextStage:
                nextStage
                    ? {
                        stageId:
                            nextStage._id,

                        stageTemplateId:
                            nextStage.stageTemplateId,

                        status:
                            nextStage.status
                    }
                    : null
        };

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        await session.endSession();
    }
};


const skipMission = async (userId, missionId, skipReason) => {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        // ============================================================
        // 1. VALIDATE MISSION ID
        // ============================================================

        if (!mongoose.Types.ObjectId.isValid(missionId)) {
            throw new AppError(
                STAGE_MESSAGES.INVALID_MISSION_ID,
                400
            );
        }

        // ============================================================
        // 2. VALIDATE SKIP REASON
        // ============================================================

        if (
            !skipReason ||
            typeof skipReason !== "string" ||
            !skipReason.trim()
        ) {
            throw new AppError(
                "Skip reason is required.",
                400
            );
        }

        // ============================================================
        // 3. FIND ACTIVE CAREER PROFILE
        // ============================================================

        const careerProfile = await CareerProfile.findOne({
            userId,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!careerProfile) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 4. FIND ACTIVE ROADMAP
        // ============================================================

        const userRoadmap = await UserRoadmap.findOne({
            userId,
            careerProfileId: careerProfile._id,
            isActive: true,
            isDeleted: false
        }).session(session);

        if (!userRoadmap) {
            throw new AppError(
                ROADMAP_MESSAGES.ROADMAP_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 5. FIND MISSION TEMPLATE
        // ============================================================

        const missionTemplate = await MissionTemplate.findById(
            missionId
        ).session(session);

        if (!missionTemplate) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 6. FIND USER STAGE
        // ============================================================

        const userStage = await UserStage.findOne({
            userId,
            userRoadmapId: userRoadmap._id,
            stageTemplateId: missionTemplate.stageTemplateId,
            isDeleted: false
        }).session(session);

        if (!userStage) {
            throw new AppError(
                STAGE_MESSAGES.STAGE_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 7. CANNOT SKIP LOCKED STAGE
        // ============================================================

        if (userStage.status === "locked") {
            throw new AppError(
                STAGE_MESSAGES.STAGE_LOCKED,
                403
            );
        }

        // ============================================================
        // 8. FIND MISSION PROGRESS
        // ============================================================

        const missionProgress = await UserMissionProgress.findOne({
            userId,
            userStageId: userStage._id,
            missionTemplateId: missionTemplate._id,
            isDeleted: false
        }).session(session);

        if (!missionProgress) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_PROGRESS_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 9. CANNOT SKIP COMPLETED MISSION
        // ============================================================

        if (missionProgress.status === "completed") {
            throw new AppError(
                "Completed missions cannot be skipped.",
                409
            );
        }

        // ============================================================
        // 10. CANNOT SKIP ALREADY SKIPPED MISSION
        // ============================================================

        if (missionProgress.status === "skipped") {
            throw new AppError(
                "Mission is already skipped.",
                409
            );
        }

        // ============================================================
        // 11. CANNOT SKIP WHILE PROOF IS UNDER REVIEW
        // ============================================================

        if (
            missionProgress.proof &&
            missionProgress.proof.status === "pending"
        ) {
            throw new AppError(
                "You cannot skip a mission while its proof is under review.",
                409
            );
        }

        // ============================================================
        // 12. SKIP MISSION
        // ============================================================

        missionProgress.status = "skipped";
        missionProgress.skipReason = skipReason.trim();
        missionProgress.progress = 0;

        await missionProgress.save({
            session
        });

        // ============================================================
        // 13. GET ALL REQUIRED MISSIONS FOR THIS STAGE
        // ============================================================

        const requiredMissionTemplates =
            await MissionTemplate.find({
                stageTemplateId: userStage.stageTemplateId,
                isRequired: true
            }).session(session);

        // ============================================================
        // 14. GET USER MISSION PROGRESS
        // ============================================================

        const stageMissionProgress =
            await UserMissionProgress.find({
                userId,
                userStageId: userStage._id,
                isDeleted: false
            }).session(session);

        // ============================================================
        // 15. COUNT FINISHED MISSIONS
        //
        // COMPLETED + SKIPPED = FINISHED
        // ============================================================

        const finishedMissionIds = new Set(
            stageMissionProgress
                .filter(
                    mission =>
                        mission.status === "completed" ||
                        mission.status === "skipped"
                )
                .map(
                    mission =>
                        mission.missionTemplateId.toString()
                )
        );

        // ============================================================
        // 16. CALCULATE REQUIRED MISSION PROGRESS
        // ============================================================

        const totalRequiredMissions =
            requiredMissionTemplates.length;

        const finishedRequiredMissions =
            requiredMissionTemplates.filter(
                mission =>
                    finishedMissionIds.has(
                        mission._id.toString()
                    )
            ).length;

        const stageProgress =
            totalRequiredMissions > 0
                ? Math.round(
                    (finishedRequiredMissions /
                        totalRequiredMissions) *
                    100
                )
                : 0;

        console.log(
            "📊 STAGE PROGRESS:",
            stageProgress
        );

        console.log(
            "✅ FINISHED REQUIRED MISSIONS:",
            finishedRequiredMissions,
            "/",
            totalRequiredMissions
        );

        // ============================================================
        // 17. CHECK IF STAGE IS FINISHED
        // ============================================================

        const allRequiredMissionsFinished =
            totalRequiredMissions > 0 &&
            finishedRequiredMissions ===
                totalRequiredMissions;

        console.log(
            "🔥 ALL REQUIRED MISSIONS FINISHED:",
            allRequiredMissionsFinished
        );

        let stageCompleted = false;
        let roadmapCompleted = false;
        let nextStage = null;

        // ============================================================
        // 18. COMPLETE CURRENT STAGE
        // ============================================================

        if (allRequiredMissionsFinished) {

            userStage.status = "completed";
            userStage.completedAt = new Date();
            userStage.lastactivityAt = new Date();

            await userStage.save({
                session
            });

            stageCompleted = true;

            console.log(
                "🎉 STAGE COMPLETED:",
                userStage._id.toString()
            );

            // ========================================================
            // 19. FIND CURRENT STAGE TEMPLATE
            // ========================================================

            const currentStageTemplate =
                await StageTemplate.findById(
                    userStage.stageTemplateId
                ).session(session);

            if (currentStageTemplate) {

                // ====================================================
                // 20. FIND NEXT STAGE TEMPLATE
                // ====================================================

                const nextStageTemplate =
                    await StageTemplate.findOne({
                        roadmapTemplateId:
                            currentStageTemplate.roadmapTemplateId,

                        stageOrder:
                            currentStageTemplate.stageOrder + 1
                    }).session(session);

                // ====================================================
                // 21. NEXT STAGE EXISTS
                // ====================================================

                if (nextStageTemplate) {

                    nextStage =
                        await UserStage.findOne({
                            userId,
                            userRoadmapId:
                                userRoadmap._id,
                            stageTemplateId:
                                nextStageTemplate._id,
                            isDeleted: false
                        }).session(session);

                    // =================================================
                    // 22. UNLOCK NEXT STAGE
                    // =================================================

                    if (
                        nextStage &&
                        nextStage.status === "locked"
                    ) {

                        nextStage.status = "not-started";
                        nextStage.lastactivityAt =
                            new Date();

                        await nextStage.save({
                            session
                        });

                        console.log(
                            "🔓 NEXT STAGE UNLOCKED:",
                            nextStage._id.toString()
                        );
                    }

                    // =================================================
                    // 23. UPDATE CURRENT STAGE
                    // =================================================

                    if (nextStage) {

                        userRoadmap.currentStageId =
                            nextStage._id;

                    }

                } else {

                    // =================================================
                    // 24. NO NEXT STAGE = ROADMAP COMPLETE
                    // =================================================

                    userRoadmap.status = "completed";
                    userRoadmap.progress = 100;
                    userRoadmap.completedAt = new Date();

                    roadmapCompleted = true;

                    console.log(
                        "🏆 ROADMAP COMPLETED"
                    );
                }
            }
        }

        // ============================================================
        // 25. UPDATE ROADMAP PROGRESS
        // ============================================================

        if (!roadmapCompleted) {

            const allUserStages =
                await UserStage.find({
                    userId,
                    userRoadmapId:
                        userRoadmap._id,
                    isDeleted: false
                }).session(session);

            const totalStages =
                allUserStages.length;

            const completedStages =
                allUserStages.filter(
                    stage =>
                        stage.status === "completed"
                ).length;

            const roadmapProgress =
                totalStages > 0
                    ? Math.round(
                        (completedStages /
                            totalStages) *
                        100
                    )
                    : 0;

            userRoadmap.progress =
                roadmapProgress;

            if (
                userRoadmap.status === "not-started"
            ) {
                userRoadmap.status =
                    "in-progress";
            }

            userRoadmap.lastActivityAt =
                new Date();

            await userRoadmap.save({
                session
            });

        } else {

            userRoadmap.lastActivityAt =
                new Date();

            await userRoadmap.save({
                session
            });
        }

        // ============================================================
        // 26. COMMIT TRANSACTION
        // ============================================================

        await session.commitTransaction();

        // ============================================================
        // 27. RETURN RESULT
        // ============================================================

        return {

            missionProgressId:
                missionProgress._id,

            missionId:
                missionTemplate._id,

            stageId:
                userStage._id,

            missionStatus:
                missionProgress.status,

            progress:
                missionProgress.progress,

            skipReason:
                missionProgress.skipReason,

            stageProgress,

            stageStatus:
                userStage.status,

            stageCompleted,

            roadmapId:
                userRoadmap._id,

            roadmapProgress:
                userRoadmap.progress,

            roadmapStatus:
                userRoadmap.status,

            roadmapCompleted,

            nextStage:
                nextStage
                    ? {
                        stageId:
                            nextStage._id,

                        stageTemplateId:
                            nextStage.stageTemplateId,

                        status:
                            nextStage.status
                    }
                    : null
        };

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        await session.endSession();
    }
};


const reviewMissionProof = async (
    reviewerId,
    missionProgressId,
    decision,
    feedback
) => {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        
        if (!mongoose.Types.ObjectId.isValid(missionProgressId)) {
            throw new AppError(
                STAGE_MESSAGES.INVALID_MISSION_PROGRESS_ID,
                400
            );
        }

        

        if (!["approved", "rejected"].includes(decision)) {
            throw new AppError(
                "Decision must be either approved or rejected.",
                400
            );
        }

        // ============================================================
        // 3. FIND MISSION PROGRESS
        // ============================================================

        const missionProgress =
            await UserMissionProgress.findOne({
                _id: missionProgressId,
                isDeleted: false
            }).session(session);

        if (!missionProgress) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_PROGRESS_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 4. FIND USER STAGE
        // ============================================================

        const userStage = await UserStage.findOne({
            _id: missionProgress.userStageId,
            isDeleted: false
        }).session(session);

        if (!userStage) {
            throw new AppError(
                STAGE_MESSAGES.STAGE_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 5. FIND MISSION TEMPLATE
        // ============================================================

        const mission = await MissionTemplate.findById(
            missionProgress.missionTemplateId
        ).session(session);

        if (!mission) {
            throw new AppError(
                STAGE_MESSAGES.MISSION_NOT_FOUND,
                404
            );
        }

        // ============================================================
        // 6. MISSION MUST REQUIRE PROOF
        // ============================================================

        if (!mission.proofRequired) {
            throw new AppError(
                "This mission does not require proof submission.",
                400
            );
        }

        // ============================================================
        // 7. PROOF MUST BE PENDING
        // ============================================================

        if (
            !missionProgress.proof ||
            missionProgress.proof.status !== "pending"
        ) {
            throw new AppError(
                "Mission proof is not pending review.",
                400
            );
        }

        // ============================================================
        // 8. RECORD REVIEW INFORMATION
        // ============================================================

        missionProgress.reviewedAt = new Date();
        missionProgress.reviewedBy = reviewerId;

        // ============================================================
        // 9. APPROVE
        // ============================================================

        if (decision === "approved") {

            missionProgress.proof.status = "approved";

            missionProgress.status = "completed";

            missionProgress.progress = 100;

            missionProgress.completedAt = new Date();

            if (feedback && feedback.trim()) {
                missionProgress.feedback = feedback.trim();
            }

            await missionProgress.save({ session });

            // ========================================================
            // 10. CHECK REQUIRED MISSIONS
            // ========================================================

            const requiredMissionTemplates =
                await MissionTemplate.find({
                    stageTemplateId: userStage.stageTemplateId,
                    isRequired: true
                }).session(session);

            const stageMissionProgress =
                await UserMissionProgress.find({
                    userId: missionProgress.userId,
                    userStageId: userStage._id,
                    isDeleted: false
                }).session(session);

            const allRequiredCompleted =
                requiredMissionTemplates.length > 0 &&
                requiredMissionTemplates.every(template =>
                    stageMissionProgress.some(progress =>
                        progress.missionTemplateId.toString() ===
                            template._id.toString() &&
                        progress.status === "completed"
                    )
                );

            let stageCompleted = false;
            let nextStage = null;

            // ========================================================
            // 11. COMPLETE STAGE
            // ========================================================

            if (
                allRequiredCompleted &&
                userStage.status !== "completed"
            ) {

                userStage.status = "completed";

                userStage.completedAt = new Date();

                userStage.lastactivityAt = new Date();

                await userStage.save({ session });
                // 16. Unlock the next stage if this stage is completed
if (userStage.status === "completed") {
    const nextStage = await UserStage.findOne({
        userId,
        userRoadmapId: userRoadmap._id,
        status: "locked",
        isDeleted: false
    })
        .sort({ createdAt: 1 })
        .session(session);

    if (nextStage) {
        nextStage.status = "not-started";
        nextStage.lastactivityAt = new Date();

        await nextStage.save({
            session
        });
    }
}

                stageCompleted = true;

                // ====================================================
                // 12. FIND CURRENT STAGE TEMPLATE
                // ====================================================

                const currentStageTemplate =
                    await StageTemplate.findById(
                        userStage.stageTemplateId
                    ).session(session);

                if (currentStageTemplate) {

                    // =================================================
                    // 13. FIND NEXT STAGE TEMPLATE
                    // =================================================

                    const nextStageTemplate =
                        await StageTemplate.findOne({
                            roadmapTemplateId:
                                currentStageTemplate.roadmapTemplateId,

                            stageOrder:
                                currentStageTemplate.stageOrder + 1
                        }).session(session);

                    // =================================================
                    // 14. UNLOCK NEXT STAGE
                    // =================================================

                    if (nextStageTemplate) {

                        nextStage =
                            await UserStage.findOne({
                                userId:
                                    missionProgress.userId,

                                userRoadmapId:
                                    userStage.userRoadmapId,

                                stageTemplateId:
                                    nextStageTemplate._id,

                                isDeleted: false
                            }).session(session);

                        if (
                            nextStage &&
                            nextStage.status === "locked"
                        ) {

                            nextStage.status = "not-started";

                            nextStage.lastactivityAt =
                                new Date();

                            await nextStage.save({
                                session
                            });
                        }
                    }
                }
            }

            // ========================================================
            // 15. REJECT
            // ========================================================

        } else {

            missionProgress.proof.status = "rejected";

            missionProgress.status = "rejected";

            missionProgress.progress = 0;

            missionProgress.completedAt = null;

            missionProgress.rejectionReason =
                feedback && feedback.trim()
                    ? feedback.trim()
                    : "Proof was rejected.";

            await missionProgress.save({
                session
            });
        }

        // ============================================================
        // 16. COMMIT
        // ============================================================

        await session.commitTransaction();

        return {
            missionProgressId:
                missionProgress._id,

            missionId:
                mission._id,

            stageId:
                userStage._id,

            missionStatus:
                missionProgress.status,

            proofStatus:
                missionProgress.proof.status,

            progress:
                missionProgress.progress,

            completedAt:
                missionProgress.completedAt,

            reviewedAt:
                missionProgress.reviewedAt,

            reviewedBy:
                missionProgress.reviewedBy,

            feedback:
                missionProgress.feedback,

            rejectionReason:
                missionProgress.rejectionReason,

            stageCompleted:
                decision === "approved"
                    ? stageCompleted
                    : false,

            nextStage:
                decision === "approved" && nextStage
                    ? {
                        stageId: nextStage._id,
                        status: nextStage.status
                    }
                    : null
        };

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        await session.endSession();

    }
};

const getStageSummary = async (userId) => {

    const careerProfile = await CareerProfile.findOne({
        userId,
        isActive: true,
        isDeleted: false
    });

    if (!careerProfile) {
        return null;
    }

    const roadmap = await UserRoadmap.findOne({
        userId,
        careerProfileId: careerProfile._id,
        isActive: true,
        isDeleted: false
    });

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
            "title stageOrder"
        )
        .lean();
            const currentStage = stages.find(
        stage =>
            stage.status === "in-progress" ||
            stage.status === "not-started"
    );
    const completedStages = stages.filter(
        stage => stage.status === "completed"
    ).length;
        const totalStages = stages.length;

    const progress =
        totalStages === 0
            ? 0
            : Math.round(
                  (completedStages / totalStages) * 100
              );
        return {
        currentStage: currentStage
            ? {
                  stageId: currentStage._id,
                  title: currentStage.stageTemplateId.title,
                  stageOrder:
                      currentStage.stageTemplateId.stageOrder,
                  status: currentStage.status
              }
            : null,

        completedStages,
        totalStages,
        progress
    };
};
const getTodayMissionSummary = async (userId) => {

    const mission = await UserMissionProgress.findOne({
        userId,
        isDeleted: false,
        status: {
            $in: ["not-started", "in-progress"]
        }
    })
        .populate(
            "missionTemplateId",
            "title estimatedTime priority type"
        )
        .sort({
            createdAt: 1
        })
        .lean();

    if (!mission) {
        return null;
    }

    return {
        missionId: mission.missionTemplateId._id,
        title: mission.missionTemplateId.title,
        status: mission.status,
        priority: mission.missionTemplateId.priority,
        estimatedTime: mission.missionTemplateId.estimatedTime,
        progress: mission.progress
    };
};

const getRecentActivity = async (userId) => {

    const missions = await UserMissionProgress.find({
        userId,
        status: "completed",
        isDeleted: false
    })
        .populate(
            "missionTemplateId",
            "title"
        )
        .sort({
            completedAt: -1
        })
        .limit(10)
        .select(
            "missionTemplateId status completedAt createdAt"
        )
        .lean();
        console.log(
    "🔥 LEARNING PROGRESS RECENT ACTIVITY:",
    JSON.stringify(missions, null, 2)
);
    return missions.map((mission) => ({
        type: "mission",
        mission: mission.missionTemplateId?.title ?? "Unknown Mission",
        status: mission.status,
        createdAt:
            mission.completedAt ||
            mission.createdAt
    }));
};

const getMissionStats = async (userId) => {

    const missions = await UserMissionProgress.find({
        userId,
        isDeleted: false
    })
        .select("status")
        .lean();

    const completed = missions.filter(
        mission => mission.status === "completed"
    ).length;

    const inProgress = missions.filter(
        mission => mission.status === "in-progress"
    ).length;

    const skipped = missions.filter(
        mission => mission.status === "skipped"
    ).length;

    const total = missions.length;

    return {
        completed,
        inProgress,
        skipped,
        total
    };
};

module.exports = {getUserStages,getStageDetails,getStageMissions,startMission,completeMission,submitMissionProof,skipMission,reviewMissionProof,
    getStageSummary,getTodayMissionSummary,getRecentActivity,getMissionDetails,getMissionStats,getCurrentStageProgress
};