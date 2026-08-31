const Project = require("../../../models/Project");
const Certificate = require("../../../models/Certificate");
const Resume = require("../../../models/Resume");
const WeeklyReview = require("../../../models/WeeklyReview");
const UserRoadmap = require("../../../models/UserRoadmap");
const UserMissionProgress = require("../../../models/UserMissionProgress");
const UserStage = require("../../../models/UserStage");
const UserSkill = require("../../../models/UserSkill");

const collectAchievementStats = async (userId) => {

    const [
        completedProjects,
        completedCertificates,
        uploadedResumes,
        completedMissions,
    completedStages,
        completedWeeklyReviews,
         learnedSkills,
        completedRoadmaps
    ] = await Promise.all([

        Project.countDocuments({
            userId,
            status: "completed",
            isDeleted: false
        }),

        Certificate.countDocuments({
            userId,
            isDeleted: false
        }),

        Resume.countDocuments({
            userId,
            isDeleted: false
        }),

        UserMissionProgress.countDocuments({
            userId,
            status: "completed",
            isDeleted: false
        }),
        UserStage.countDocuments({
            userId,
            status: "completed",
            isDeleted: false
        }),

        WeeklyReview.countDocuments({
            userId,
            reviewStatus: "completed",
            isDeleted: false
        }),
        UserSkill.countDocuments({
    userId,
    proficiency: { $gte: 70 },
    isDeleted: false,
    isActive: true
}),

        UserRoadmap.countDocuments({
            userId,
            status: "completed",
            isDeleted: false
        })

    ]);

    return {
    completedProjects,
    completedCertificates,
    uploadedResumes,
    completedMissions,
    completedStages,
    completedWeeklyReviews,
     learnedSkills,
    completedRoadmaps
};
};

module.exports = {
    collectAchievementStats
};