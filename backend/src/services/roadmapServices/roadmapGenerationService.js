const CAREER_PROFILE_MESSAGES =require("../../constants/messages/careerProfileMessages");
const careerAnalysisService =require(".././ai/careerAnalysisService");
const UserRoadmap = require("../../models/UserRoadmap");
const UserStage = require("../../models/UserStage");
const UserMissionProgress = require("../../models/UserMissionProgress");
const MissionTemplate = require("../../models/MissionTemplate");
const AppError = require("../../errors/AppError");
const RoadmapTemplate = require("../../models/RoadmapTemplate");
const StageTemplate=require("../../models/StageTemplate");

const findRoadmapTemplate = async (careerProfile,session) => {
    const roadmapTemplate =await RoadmapTemplate.findOne({
        targetCareer: careerProfile.targetCareer,
        isActive: true
    }).session(session);
     

    if (!roadmapTemplate) {
        throw new AppError(CAREER_PROFILE_MESSAGES.ROADMAP_TEMPLATE_NOT_FOUND,404);    
    }
    await attachRoadmapTemplate(careerProfile,roadmapTemplate,session);
    return roadmapTemplate;
};

const attachRoadmapTemplate = async (careerProfile,roadmapTemplate,session) => {
    careerProfile.roadmapTemplateId =roadmapTemplate._id;
    await careerProfile.save({ session });
};

const findStageTemplates = async (roadmapTemplate,session) => {
    console.log("Searching StageTemplates for Roadmap ID:",roadmapTemplate._id);
    const stageTemplates =await StageTemplate.find({roadmapTemplateId:roadmapTemplate._id})
                                .sort({ stageOrder: 1 }).session(session);
                                 console.log(
        "Found StageTemplates:",
        stageTemplates.length
    );
    console.log(
        "StageTemplates:",
        stageTemplates
    );
    if (stageTemplates.length === 0) {
        throw new AppError(CAREER_PROFILE_MESSAGES.STAGE_TEMPLATE_NOT_FOUND,404);
    }
    return stageTemplates;
}

const analyzeCareerProfile = async (careerProfile,roadmapTemplate,stageTemplates) => {
        return await careerAnalysisService.analyzeCareerProfile(
                careerProfile,
                roadmapTemplate,
                stageTemplates
                );        
}

const createUserRoadmap = async (userId,careerProfile,roadmapTemplate,aiAnalysis,session) => {
    const estimatedCompletionDate =new Date(Date.now() +roadmapTemplate.estimatedDuration *24 *60 *60 *1000); 
    const [userRoadmap] =await UserRoadmap.create([{
                            userId,
                            careerProfileId:careerProfile._id,
                            roadmapTemplateId:roadmapTemplate._id,
                            startingStageId:null,
                            currentStageId:null,
                            status: "not-started",
                            progress: 0,
                            estimatedCompletionDate,
                            personalizationReason:aiAnalysis.personalizationReason
                        }],{ session });
        return userRoadmap;
}

const createUserStages = async (userId,userRoadmap,stageTemplates,aiAnalysis,session) => {
    const userStagesToCreate =stageTemplates.map((stageTemplate, index) => {
                                let status = "locked";
                                if (aiAnalysis.skippedStages.includes(index)) {
                                    status = "skipped";
                                } else if (index ===aiAnalysis.startingStageIndex) {
                                    status = "not-started";
                                }
                                return {
                                    userId,
                                    userRoadmapId:userRoadmap._id,
                                    stageTemplateId:stageTemplate._id,
                                    status
                                };
                            });
    const userStages =await UserStage.insertMany(userStagesToCreate,{ session });
    return userStages;
}

const createMissionProgress = async (userId,stageTemplates,userStages,session) => {
    const stageTemplateIds =stageTemplates.map(stage => stage._id);
    const missionTemplates =await MissionTemplate.find({stageTemplateId: {$in: stageTemplateIds}})
    .session(session);
    const missionsByStage = {};
    for (const mission of missionTemplates) {
        const stageId =mission.stageTemplateId.toString();
        if (!missionsByStage[stageId]){
            missionsByStage[stageId] = [];
        }
        missionsByStage[stageId].push(mission);
    }
    const userMissionProgressToCreate = [];
    for (const userStage of userStages) {
        const missions =missionsByStage[userStage.stageTemplateId.toString()] || [];
        for (const mission of missions) {
            userMissionProgressToCreate.push({
                        userId,
                        userStageId:userStage._id,
                        missionTemplateId:mission._id,
                        status: "not-started",
                        progress: 0,
                        proof: {
                            url: null,
                            submittedAt: null
                        },
                        feedback: "",
                        completedAt: null
                });
        }
    }
    await UserMissionProgress.insertMany(userMissionProgressToCreate,{ session });
}

const updateRoadmapPointers = async (userRoadmap,userStages,aiAnalysis,session) => {
    userRoadmap.startingStageId =userStages[aiAnalysis.startingStageIndex]._id;
    userRoadmap.currentStageId =userStages[aiAnalysis.startingStageIndex]._id;
    await userRoadmap.save({ session });
};

const generateRoadmap = async (userId,careerProfile,session) => {
    const roadmapTemplate =await findRoadmapTemplate(careerProfile,session);
    const stageTemplates =await findStageTemplates(roadmapTemplate,session);
    const aiAnalysis =await analyzeCareerProfile(careerProfile,roadmapTemplate,stageTemplates);
    const userRoadmap =await createUserRoadmap(userId,careerProfile,roadmapTemplate,aiAnalysis,session);
    const userStages =await createUserStages(userId,userRoadmap,stageTemplates,aiAnalysis,session);
    await createMissionProgress(userId,stageTemplates,userStages,session);
    await updateRoadmapPointers(userRoadmap,userStages,aiAnalysis,session);
};

module.exports={generateRoadmap};