const careerProfileService = require("./careerProfileService");
const roadmapService = require("./roadmapServices/roadmapService");
const learningProgressService = require("./learningProgressService");
const resumeService = require("./resumeServices/resumeService");
const weeklyReviewService = require("./weeklyReviewService");
const achievementService = require("./achievement/achievementService");
const notificationService = require("./notificationService");
const projectService = require("./projectService");
const certificateService = require("./certificateService");
const authService=require("./authService");
const skillsService=require("./skillsService");
const experienceService=require("./experienceService");
const userService=require("./userService");
const {generateCareerInsights}=require("./ai/generateCareerInsights");


const getDashboard = async (userId) => {

    const careerProfile =
        await careerProfileService.getCareerProfile(userId);

    const currentResumePromise = resumeService
        .getCurrentResume(userId)
        .catch((error) => {
            if (error.statusCode === 404) {
                return null;
            }

            throw error;
        });

    const [
        user,
        activeRoadmap,
        todayMission,
        currentResume,
        weeklyReview,
        achievementSummary,
        notifications,
        projectStats,
        certificateStats,
        readinessComparison,
        nextMilestone
    ] = await Promise.all([

        userService.getUserById(userId),

        roadmapService.getActiveRoadmap(
            userId,
            careerProfile?._id
        ),

        learningProgressService.getTodayMissionSummary(userId),

        currentResumePromise,

        weeklyReviewService.getCurrentWeeklyReviewForDashboard(
            userId
        ),

        achievementService.getAchievementSummary(userId),

        notificationService.getRecentNotifications(userId),

        projectService.getProjectStats(userId),

        certificateService.getCertificateStats(userId),

        getReadinessComparison(userId),

        roadmapService.getNextMilestone(userId)
    ]);

    return {

        
        user,
        careerProfile,
        roadmap: activeRoadmap,
        todayMission,
        nextMilestone,
        resume: currentResume,
        weeklyReview,
        achievements: achievementSummary,
        notifications,
        projects: projectStats,
        certificates: certificateStats,
        readiness: readinessComparison
    };
};



const getProfileOverview =async (userId) => {
    const [
        user,
        careerProfile,
        latestResume,
        skills,
        projects,
        certificates,
        achievements,
        experience

    ] = await Promise.all([
        userService.getUserById(userId),
        careerProfileService.getCareerProfile(userId),
        resumeService.getLatestResume(userId),
        skillsService.getMySkills(userId),
        projectService.getResumeProjects(userId),
        certificateService.getCertificates(userId),
        achievementService.getProfileAchievements(userId),
        experienceService.getExperience(userId)

    ]);
    return {
        user,
        careerProfile,
        latestResume,
        skills,
        projects,
        certificates,
        achievements,
        experience
    };

};

const getDashboardStats = async (userId) => {

    const [
        projectStats,
        certificateStats,
        skillStats,
        achievementStats,
        resumeStats,
        roadmapProgress,
        currentStreak
    ] = await Promise.all([

        projectService.getProjectStats(userId),
        certificateService.getCertificateStats(userId),
        skillsService.getSkillStats(userId),
        achievementService.getAchievementStats(userId),
        resumeService.getLatestResumeScore(userId),
        roadmapService.getRoadmapProgressDash(userId),
        weeklyReviewService.getCurrentStreak(userId)

    ]);

    return {
        projects: projectStats?.totalProjects ?? 0,

        certificates:
            certificateStats?.totalCertificates ?? 0,

        skills:
            skillStats?.totalSkills ?? 0,

        achievements:
            achievementStats?.totalAchievements ?? 0,

        xp:
            achievementStats?.totalXp ?? 0,

        resumeScore:
            resumeStats?.resumeScore ?? 0,

        roadmapProgress:
            roadmapProgress?.progress ?? 0,

        currentStreak:
            currentStreak ?? 0
    };
};
const getReadinessComparison = async (userId) => {

    const [
        currentProgress,
        lastWeek
    ] = await Promise.all([

        getProfileProgress(userId),

        weeklyReviewService.getLastWeekReadiness(userId)
    ]);
    console.log("🔥 CURRENT PROGRESS:", currentProgress);
    console.log("🔥 CURRENT READINESS:", currentProgress?.overallProgress);
    console.log("🔥 LAST WEEK:", lastWeek);
    console.log("🔥 LAST WEEK READINESS:", lastWeek?.readinessScore);

    const currentReadiness =
        currentProgress?.overallProgress ?? 0;

    const previousReadiness =
        lastWeek?.readinessScore;
    console.log(
        "🔥 CALCULATION:",
        currentReadiness,
        "-",
        previousReadiness,
        "=",
        currentReadiness - previousReadiness
    );

    if (
        previousReadiness === null ||
        previousReadiness === undefined
    ) {
        return {
            currentReadiness,
            previousReadiness: null,
            change: null
        };
    }

    return {
        currentReadiness,
        previousReadiness,
        change:
            currentReadiness - previousReadiness
    };
};

const getRecentActivity =async (userId, { page, limit }) => {

        const [
            projects,
            achievements,
            certificates,
            resumes,
            missions,
            weeklyReviews
        ] = await Promise.all([

            projectService.getRecentActivity(userId),

            achievementService.getRecentActivity(userId),

            certificateService.getRecentActivity(userId),

            resumeService.getRecentActivity(userId),

            learningProgressService.getRecentActivity(userId),

            weeklyReviewService.getRecentActivity(userId)

        ]);

        const activities = [

            ...projects,

            ...achievements,

            ...certificates,

            ...resumes,

            ...missions,

            ...weeklyReviews

        ];

        activities.sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );

        const total = activities.length;

        const start =
            (page - 1) * limit;

        const paginatedActivities =
            activities.slice(
                start,
                start + limit
            );

        return {
            activities: paginatedActivities,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)

            }

        };

};

const getPublicProfile =async (userId) => {

        const [
            user,
            careerProfile,
            skills,
            projects,
            certificates,
            experience,
            achievements
        ] = await Promise.all([
            userService.getPublicUser(userId),
            careerProfileService.getPublicCareerProfile(userId),
            skillsService.getPublicUserSkills(userId),
            projectService.getFeaturedProjects(userId),
            certificateService.getPublicUserCertificates(userId),
            experienceService.getPublicUserExperience(userId),
            achievementService.getPublicUserAchievements(userId)
        ]);
        if (!user) {
            throw new AppError(PROFILE_MESSAGES.USER_NOT_FOUND,404);
        }

        return {
            user,
            careerProfile,
            skills,
            projects,
            certificates,
            experience,
            achievements
        };

};
const getProfileProgress =async (userId) => {

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
                roadmapProgress?.overallProgress?? 0,

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

        const values =
            Object.values(progress);

        const overallProgress =
            Math.round(
                values.reduce(
                    (sum, value) => sum + value,
                    0
                ) / values.length
            );
        return {
            ...progress,
            overallProgress
        };

};
const getCareerAnalytics =async (userId, period = "6m") => {

        const [
            resumeTrend,
            projectTrend,
            skillTrend,
            certificateTrend,
            achievementTrend,
            weeklyReviewTrend
        ] = await Promise.all([

            resumeService.getResumeScoreTrend(
                userId,
                period
            ),

            projectService.getProjectTrend(
                userId,
                period
            ),

            skillsService.getSkillTrend(
                userId,
                period
            ),

            certificateService.getCertificateTrend(
                userId,
                period
            ),

            achievementService.getAchievementTrend(
                userId,
                period
            ),

            weeklyReviewService.getReviewTrend(
                userId,
                period
            )

        ]);

        return {

            resumeScoreTrend:
                resumeTrend,

            projects:
                projectTrend,

            skills:
                skillTrend,

            certificates:
                certificateTrend,

            achievements:
                achievementTrend,

            weeklyReviews:
                weeklyReviewTrend

        };

};


const getCareerInsights = async (userId) => {

    const [
        careerProfile,
        roadmapProgress,
        todayMission,
        missionStats,
        recentActivity,
        skills
    ] = await Promise.all([

        careerProfileService.getCareerProfile(userId),

        roadmapService.getRoadmapProgressDash(userId),

        learningProgressService.getTodayMissionSummary(userId),

        learningProgressService.getMissionStats(userId),

        learningProgressService.getRecentActivity(userId),

        skillsService.getMySkills(userId)

    ]);

    const careerContext = {

        career: careerProfile.targetCareer,

        goal: careerProfile.currentGoal,

        careerPriority: careerProfile.careerPriority,

        dailyCommitment: careerProfile.dailyCommitment,

        experienceLevel: careerProfile.experienceLevel,

        roadmap: {
            currentStage: roadmapProgress.currentStage,
            stageProgress: roadmapProgress.stageProgress,
            overallProgress: roadmapProgress.overallProgress,
            completedStages: roadmapProgress.completedStages,
            totalStages: roadmapProgress.totalStages
        },

        missions: {
            completed: missionStats.completed,
            inProgress: missionStats.inProgress,
            skipped: missionStats.skipped,
            total: missionStats.total
        },

        todayMission: todayMission
            ? {
                missionId: todayMission.missionId,
                title: todayMission.title,
                status: todayMission.status,
                priority: todayMission.priority,
                estimatedTime: todayMission.estimatedTime,
                progress: todayMission.progress
            }
            : null,

        recentActivity: recentActivity.map(activity => ({
            type: activity.type,
            mission: activity.mission,
            status: activity.status,
            createdAt: activity.createdAt
        })),

        skills: skills.skills.map(skill => ({
            skill: skill.skill?.name,
            proficiency: skill.proficiency,
            isVerified: skill.isVerified,
            confidenceScore: skill.confidenceScore
        }))

    };

    console.log(
        "🤖 AI CAREER CONTEXT:",
        JSON.stringify(careerContext, null, 2)
    );

    // Don't change AI call yet

    return careerContext;
};


module.exports = {
    getDashboard,getProfileOverview,getDashboardStats,getRecentActivity,getPublicProfile,getProfileProgress,getCareerAnalytics,
    getCareerInsights
};
