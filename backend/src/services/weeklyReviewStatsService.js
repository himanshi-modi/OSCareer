const UserMissionProgress = require("../models/UserMissionProgress");
const UserRoadmap = require("../models/UserRoadmap");
const UserSkill = require("../models/UserSkill");
const Project = require("../models/Project");
const Certificate= require("../models/Certificate");
const Resume= require("../models/Resume");
const careerProfileService = require("./careerProfileService");
const roadmapService = require("./roadmapServices/roadmapService");
const skillsService = require("./skillsService");
const projectService = require("./projectService");
const certificateService = require("./certificateService");
const resumeService = require("./resumeServices/resumeService");
const achievementService = require("./achievement/achievementService");

const collectWeeklyStats = async (
    userId,
    weekStartDate,
    weekEndDate
) => {

    const [
        missionStats,
        roadmapProgress,
        readinessScore,
        skillsLearned,
        projectsCompleted,
        certificatesAdded,
        resumesUpdated
    ] = await Promise.all([

        getMissionStats(
            userId,
            weekStartDate,
            weekEndDate
        ),

        getRoadmapProgress(userId),

        getReadinessScore(userId),

        getSkillsLearned(
            userId,
            weekStartDate,
            weekEndDate
        ),

        getProjectsCompleted(
            userId,
            weekStartDate,
            weekEndDate
        ),

        getCertificatesAdded(
            userId,
            weekStartDate,
            weekEndDate
        ),

        getResumesUpdated(
            userId,
            weekStartDate,
            weekEndDate
        )
    ]);

    return {
        completedMissions:
            missionStats.completedMissions,

        totalMissions:
            missionStats.totalMissions,

        roadmapProgress,

        readinessScore,

        skillsLearned,

        projectsCompleted,

        certificatesAdded,

        resumesUpdated
    };
};

const getMissionStats = async (
    userId,
    weekStartDate,
    weekEndDate
) => {
    const completedMissions =
        await UserMissionProgress.countDocuments({
            userId,
            status: "completed",
            completedAt: {
                $gte: weekStartDate,
                $lte: weekEndDate
            },
            isDeleted: false
        });

    const totalMissions =
        await UserMissionProgress.countDocuments({
            userId,
            createdAt: {
                $gte: weekStartDate,
                $lte: weekEndDate
            },
            isDeleted: false
        });

    return {
        completedMissions,
        totalMissions
    };
};
const getReadinessScore = async (userId) => {

    const [
        careerProfileProgress,
        roadmapProgress,
        skillProgress,
        projectProgress,
        certificateProgress,
        resumeScore,
        achievementProgress
    ] = await Promise.all([

        careerProfileService
            .getProfileCompletion(userId),

        roadmapService
            .getRoadmapProgressDash(userId),

        skillsService
            .getSkillProgress(userId),

        projectService
            .getProjectProgress(userId),

        certificateService
            .getCertificateProgress(userId),

        resumeService
            .getLatestResumeScore(userId),

        achievementService
            .getAchievementProgress(userId)
    ]);

    const progress = {

        careerProfile:
            careerProfileProgress?.percentage ?? 0,

        roadmap:
            roadmapProgress?.percentage ?? 0,

        skills:
            skillProgress?.percentage ?? 0,

        projects:
            projectProgress?.percentage ?? 0,

        certificates:
            certificateProgress?.percentage ?? 0,

        resume:
            resumeScore?.resumeScore ?? 0,

        achievements:
            achievementProgress?.percentage ?? 0
    };

    console.log("📊 READINESS BREAKDOWN:", progress);

    const values = Object.values(progress);

    return Math.round(
        values.reduce(
            (sum, value) => sum + value,
            0
        ) / values.length
    );
};

const getRoadmapProgress = async (userId) => {
    const roadmap = await UserRoadmap.findOne({
        userId,
        isActive: true,
        isDeleted: false
    }).select("progress");
    return roadmap?.progress || 0;
};

const getSkillsLearned = async (userId,weekStartDate,weekEndDate) => {

    const skills = await UserSkill.find({
        userId,
        createdAt: {
            $gte: weekStartDate,
            $lte: weekEndDate
        },
        isDeleted: false

    }).select("skillId");
    return skills.map(skill => skill.skillId);

};
const getProjectsCompleted = async (
    userId,
    weekStartDate,
    weekEndDate
) => {

    const projects = await Project.find({
        userId,
        status: "completed",
        completionDate: {
            $gte: weekStartDate,
            $lte: weekEndDate
        },
        isDeleted: false
    }).select("_id");
    return projects.map(project => project._id);
};
const getCertificatesAdded = async (userId,weekStartDate,weekEndDate) => {
    const certificates = await Certificate.find({userId,createdAt: {
        $gte: weekStartDate,
        $lte: weekEndDate
    },
    isDeleted: false
    }).select("_id");
    return certificates.map(  certificate => certificate._id);
};
const getResumesUpdated = async (
    userId,
    weekStartDate,
    weekEndDate
) => {
    const resumes = await Resume.find({
        userId,
        updatedAt: {
            $gte: weekStartDate,
            $lte: weekEndDate
        },
        isDeleted: false
    }).select("_id");
    return resumes.map(resume => resume._id);
};
module.exports = {
    collectWeeklyStats
};