const AUTH_MESSAGES= require("../constants/messages/authMessages");
const User = require("../models/User");
const AppError = require("../errors/AppError");
const PROJECT_MESSAGES= require("../constants/messages/projectMessages");
const Project = require("../models/Project");
const mongoose=require("mongoose");
const ProjectSkill = require("../models/ProjectSkill");
const ProjectReview = require("../models/ProjectReview");
const Skill = require("../models/Skill");
const {getStartDate} = require("../utils/date/getStartDate");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const UserMissionProgress = require("../models/UserMissionProgress");
const Resume = require("../models/Resume");

const createProject = async (userId, projectData) => {
    const {title,description,category,featured,githubUrl,liveDemoUrl,thumbnailUrl,status,
        source,completionDate,deploymentStatus} = projectData;

    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
    }

    if (status === "completed" && !completionDate) {
        throw new AppError(PROJECT_MESSAGES.COMPLETION_DATE_REQUIRED,400);
    }
    if (status !== "completed" && completionDate) {
        throw new AppError( PROJECT_MESSAGES.COMPLETION_DATE_ONLY_FOR_COMPLETED_PROJECT, 400);
    }

    const project = await Project.create({
        userId,
        title,
        description,
        category,
        featured: featured ?? false,
        githubUrl: githubUrl || "",
        liveDemoUrl: liveDemoUrl || "",
        thumbnailUrl: thumbnailUrl || "",
        status: status || "planned",
        source: source || "user",
        completionDate: completionDate || null,
        deploymentStatus: deploymentStatus || "not-deployed",
        isDeleted: false,
        deletedAt: null
    });

    return project;
};


const getProjects = async (userId, queryParams) => {
    const {
        page = 1,
        limit = 10,
        status,
        category,
        source,
        deploymentStatus,
        featured
    } = queryParams;

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
    }
    const query = {
        userId,
        isDeleted: false
    };

    if (status) {
        query.status = status;
    }
    if (category) {
        query.category = category;
    }
    if (source) {
        query.source = source;
    }
    if (deploymentStatus) {
        query.deploymentStatus = deploymentStatus;
    }
    if (featured !== undefined) {
        query.featured = featured === "true";
    }
    const skip = (page - 1) * limit;
    const [projects, totalProjects] = await Promise.all([
        Project.find(query)
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limit),
        Project.countDocuments(query)
    ]);
    const totalPages = Math.ceil(totalProjects / limit);

    return {
        projects,
        pagination: {
            currentPage: page,
            limit,
            totalProjects,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };
};

const getProjectById = async (userId, projectId) => {

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_ID,400);
    }

    const project = await Project.findOne({_id: projectId,userId,isDeleted: false}).lean();

    if (!project) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }

    const skills = await ProjectSkill.find({projectId})
        .populate({
    path:"skillId",
    select:"name category subCategory"
})
        .lean();

    const latestReview = await ProjectReview.findOne({projectId})
        .sort({
            reviewVersion: -1
        })
        .lean();

    return {...project,skills,latestReview};
};

const updateProject = async (userId, projectId, projectData) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_ID,400);
    }

    const project = await Project.findOne({_id: projectId,userId,isDeleted: false});

    if (!project) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }

    const allowedFields = [
        "title",
        "description",
        "category",
        "featured",
        "githubUrl",
        "liveDemoUrl",
        "thumbnailUrl",
        "status",
        "source",
        "completionDate",
        "deploymentStatus"
    ];

    const updates = {};

    for (const field of allowedFields) {
        if (projectData[field] !== undefined) {
            updates[field] = projectData[field];
        }
    }

    if (Object.keys(updates).length === 0) {
        throw new AppError(PROJECT_MESSAGES.NO_FIELDS_TO_UPDATE,400);
    }

    if (
        updates.status &&
        updates.status !== "completed"
    ) {
        updates.completionDate = null;
    }

    if (
        updates.status === "completed" &&
        updates.completionDate === undefined
    ) {
        updates.completionDate = new Date();
    }

    const updatedProject = await Project.findOneAndUpdate(
        {
            _id: projectId,
            userId,
            isDeleted: false
        },
        {
            $set: updates
        },
        {
            new: true,
            runValidators: true
        }
    );
    if (!updatedProject) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }

    return updatedProject;
};

const deleteProject = async (userId, projectId) => {

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_ID,400);
    }
    const project = await Project.findOne({ _id: projectId,userId,isDeleted: false});

    if (!project) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }
    project.isDeleted = true;
    project.deletedAt = new Date();
    await project.save();
    return project;
};

const addProjectSkill = async (userId, projectId, skillData) => {
    const { skillId, confidenceScore } = skillData;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_ID,400);
    }

    const project = await Project.findOne({
        _id: projectId,
        userId,
        isDeleted: false
    });
    
    if (!project) {
        throw new AppError( PROJECT_MESSAGES.PROJECT_NOT_FOUND, 404);
    }
    const skill = await Skill.findOne({_id: skillId,isDeleted: false});
    if (!skill) {
        throw new AppError(PROJECT_MESSAGES.SKILL_NOT_FOUND,404);
    }
    const existingProjectSkill =
    await ProjectSkill.findOne({
        projectId,
        skillId
    });
    if (existingProjectSkill) {
        throw new AppError(PROJECT_MESSAGES.SKILL_ALREADY_ADDED,409);
    }

    try {
        const projectSkill = await ProjectSkill.create({
            projectId,
            skillId,
            confidenceScore,
            verifiedByAI: false,
            source: "user"
        });

        await projectSkill.populate("skillId");
        return projectSkill;
    } catch (error) {
        if (error.code === 11000) {
            throw new AppError(PROJECT_MESSAGES.SKILL_ALREADY_ADDED,409 );
        }
        throw error;
    }
};

const getProjectSkills = async (userId, projectId) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_ID,400);
    }

    const project = await Project.findOne({ _id: projectId, userId, isDeleted: false });

    if (!project) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }

    const projectSkills = await ProjectSkill.find({projectId})
        .populate({
    path:"skillId",
    select:"name category difficulty"
})
        .sort({ createdAt: -1 });

    return projectSkills;
};

const removeProjectSkill = async (userId,projectId,skillId) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(
            PROJECT_MESSAGES.INVALID_PROJECT_ID,
            400
        );
    }

    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_SKILL_ID,400);
    }

    const project = await Project.findOne({
        _id: projectId,
        userId,
        isDeleted: false
    });

    if (!project) {
        throw new AppError( PROJECT_MESSAGES.PROJECT_NOT_FOUND, 404 );
    }

    const projectSkill = await ProjectSkill.findOne({projectId,skillId });

    if (!projectSkill) {
        throw new AppError(PROJECT_MESSAGES.SKILL_NOT_ASSOCIATED_WITH_PROJECT,404);
    }
    projectSkill.isDeleted = true;
    projectSkill.deletedAt = new Date();
    await projectSkill.save();
    return projectSkill;
};

const createProjectReview = async (userId, projectId) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_ID,400);
    }

    const project = await Project.findOne({_id: projectId,userId,isDeleted: false });

    if (!project) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }

    if ( project.status !== "in-progress" && project.status !== "completed") {
        throw new AppError( PROJECT_MESSAGES.PROJECT_NOT_ELIGIBLE_FOR_REVIEW, 400);
    }

    const projectSkills = await ProjectSkill.find({projectId }).populate("skillId");
    const latestReview = await ProjectReview.findOne({userId,projectId,isDeleted: false})
        .sort({
            reviewVersion: -1
        });

    const reviewVersion = latestReview
        ? latestReview.reviewVersion + 1
        : 1;

    /*
     * 7. Temporary mock review data
     *
     * AI integration will be added later.
     *
     * Later this section can become:
     *
     * const reviewData =
     *     await aiProjectReviewService.analyze({
     *         project,
     *         projectSkills
     *     });
     */

    const reviewData = {
        recruiterScore: 70,
        codeQualityScore: 70,
        uiUxScore: 70,
        documentationScore: 70,
        strengths: [
            "Project has a clear description.",
            "Project demonstrates practical development skills."
        ],

        improvementAreas: [
            "Improve automated test coverage.",
            "Add stronger project documentation."
        ],

        recommendedFeatures: [
            "Add CI/CD pipeline.",
            "Add production monitoring."
        ],

        overallFeedback:
            "This project demonstrates good practical development skills. " +
            "Adding stronger testing, documentation, and production " +
            "features can improve its overall recruiter appeal."
    };

    const projectReview = await ProjectReview.create({
        userId,
        projectId,
        recruiterScore: reviewData.recruiterScore,
        reviewStatus: "completed",
        errorMessage: null,
        codeQualityScore: reviewData.codeQualityScore,
        uiUxScore: reviewData.uiUxScore,
        documentationScore: reviewData.documentationScore,
        strengths: reviewData.strengths,
        improvementAreas: reviewData.improvementAreas,
        recommendedFeatures: reviewData.recommendedFeatures,
        overallFeedback: reviewData.overallFeedback,
        reviewVersion,
        reviewedAt: new Date(),
        isDeleted: false,
        deletedAt: null
    });

    return projectReview;
};

const getProjectReviewHistory = async (userId, projectId) => {

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError( PROJECT_MESSAGES.INVALID_PROJECT_ID, 400  );
    }
    const project = await Project.findOne({ _id: projectId,  userId });

    if (!project) {
        throw new AppError( PROJECT_MESSAGES.PROJECT_NOT_FOUND, 404);
    }

    const reviews = await ProjectReview.find({userId,projectId,isDeleted: false})
    .sort({
        reviewVersion: -1
    });
    return reviews;
};

const getLatestProjectReview = async (userId, projectId) => {

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError( PROJECT_MESSAGES.INVALID_PROJECT_ID, 400 );
    }

    const project = await Project.findOne({_id: projectId,userId});

    if (!project) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }
    const latestReview = await ProjectReview.findOne({ userId,projectId,isDeleted: false})
    .sort({
        reviewVersion: -1
    });
    if (!latestReview) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_REVIEW_NOT_FOUND,404);
    }
    return latestReview;
};

const getProjectReviewById = async ( userId,projectId,reviewId) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_ID,  400);
    }

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        throw new AppError(PROJECT_MESSAGES.INVALID_PROJECT_REVIEW_ID, 400);
    }

    const project = await Project.findOne({_id: projectId,userId});

    if (!project) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_NOT_FOUND,404);
    }
    
    const review = await ProjectReview.findOne({_id: reviewId,projectId,isDeleted: false });

    if (!review) {
        throw new AppError(PROJECT_MESSAGES.PROJECT_REVIEW_NOT_FOUND,404);
    }
    return review;
};

const getProjectStats = async (userId) => {
    const stats = await Project.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                isDeleted: false
            }
        },
        {
            $facet: {
                overview: [
                    {
                        $group: {
                            _id: null,
                            totalProjects: { $sum: 1 },
                            completedProjects: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$status", "completed"] },
                                        1,
                                        0
                                    ]
                                }
                            },
                            inProgressProjects: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$status", "in-progress"] },
                                        1,
                                        0
                                    ]
                                }
                            },
                            plannedProjects: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$status", "planned"] },
                                        1,
                                        0
                                    ]
                                }
                            },
                            featuredProjects: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$featured", true] },
                                        1,
                                        0
                                    ]
                                }
                            }
                        }
                    }
                ],
                byCategory: [
                    {
                        $group: {
                            _id: "$category",
                            count: { $sum: 1 }
                        }
                    }
                ],
                byDeploymentStatus: [
                    {
                        $group: {
                            _id: "$deploymentStatus",
                            count: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ]);

    const result = stats[0];

    return {
        totalProjects: result.overview[0]?.totalProjects || 0,
        completedProjects: result.overview[0]?.completedProjects || 0,
        inProgressProjects: result.overview[0]?.inProgressProjects || 0,
        plannedProjects: result.overview[0]?.plannedProjects || 0,
        featuredProjects: result.overview[0]?.featuredProjects || 0,

        byCategory: result.byCategory.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {}),

        byDeploymentStatus: result.byDeploymentStatus.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {})
    };
};
const getProfileProjects = async (userId) => {

    const projects = await Project.find({
        userId,
        isDeleted: false,
        status: "completed"
    })
        .sort({
            completionDate: -1
        })
        .limit(3)
        .select(
            "title description category featured githubUrl liveDemoUrl thumbnailUrl status deploymentStatus completionDate"
        )
        .lean();

    return projects;
};

const getRecentActivity = async (userId) => {
    const projects = await Project.find({
        userId,
        status: {
            $in: ["completed", "in-progress"]
        }
    })
        .sort({ updatedAt: -1 })
        .limit(10)
        .select("_id title status createdAt updatedAt completionDate");

    return projects.map((project) => {

        if (project.status === "completed") {

            return {
                type: "project",
                title: "Project Completed",
                description: project.title,
                referenceId: project._id,
                createdAt:
                    project.completionDate ||
                    project.updatedAt
            };

        }

        return {
            type: "project",
            title: "Project Started",
            description: project.title,
            referenceId: project._id,
            createdAt: project.updatedAt
        };

    });
};
const getFeaturedProjects = async (userId) => {

    return await Project.find({
        userId,
        featured: true,
        status: "completed"
    })
        .sort({
            completionDate: -1,
            updatedAt: -1
        })
        .limit(6)
        .select(
            "_id title description category githubUrl liveDemoUrl thumbnailUrl completionDate"
        )
        .lean();
};


const getProjectProgress = async (userId) => {

    const totalProjects =
        await Project.countDocuments({
            userId,
            status: {
                $ne: "archived"
            }
        });

    const completedProjects =
        await Project.countDocuments({
            userId,
            status: "completed"
        });

    const targetProjects = 5;

    const percentage = Math.min(
        Math.round(
            (completedProjects / targetProjects) * 100
        ),
        100
    );

    return {
        percentage,
        completedProjects,
        totalProjects,
        targetProjects
    };
};
const getProjectTrend = async (userId, period = "6m") => {

    const startDate = getStartDate(period);

    const projects = await Project.find({
        userId,
        status: "completed",
        completionDate: {
            $gte: startDate
        }
    })
        .select("completionDate")
        .lean();

    const trend = {};

    projects.forEach((project) => {

        const date = new Date(project.completionDate);

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

        trend[key] =
            (trend[key] || 0) + 1;
    });

    return Object.entries(trend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, completed]) => ({
            date,
            completed
        }));
};


const getResumeProjects = async (userId) => {
    const analysis = await ResumeAnalysis.findOne({
        userId,
        isDeleted: false,
        analysisStatus: "completed"
    })
        .sort({ analysisVersion: -1 })
        .select("extractedProjects")
        .lean();

    if (!analysis) {
        return [];
    }

    return analysis.extractedProjects || [];
};


const getCareerProjects = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, 404);
    }

    const careerProjects = await UserMissionProgress.find({
        userId,
        isDeleted: false
    })
        .populate({
            path: "missionTemplateId",
            match: {
                type: "project"
            },
            select: "title description type estimatedTime evidenceRequired"
        })
        .populate({
            path: "userStageId",
            select: "stageTemplateId status"
        })
        .lean();

    const projectMissions = careerProjects
        .filter((mission) => mission.missionTemplateId)
        .map((mission) => ({
            missionId: mission.missionTemplateId._id,

            title: mission.missionTemplateId.title,

            description: mission.missionTemplateId.description,

            stageId: mission.userStageId?._id || null,

            stageTemplateId:
                mission.userStageId?.stageTemplateId || null,

            mission: mission.missionTemplateId.title,

            progress: mission.progress,

            status: mission.status,

            technologies:
                mission.missionTemplateId.evidenceRequired || [],

            estimatedTime:
                mission.missionTemplateId.estimatedTime
        }));

    return projectMissions;
};
const getResumeProjectById = async (userId, projectId) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project ID.");
    }

    const analysis = await ResumeAnalysis.findOne({
        userId,
        isDeleted: false,
        analysisStatus: "completed"
    })
        .sort({ analysisVersion: -1 })
        .select("extractedProjects")
        .lean();

    if (!analysis) {
        throw new Error("Resume analysis not found.");
    }

    const project = analysis.extractedProjects?.find(
        (project) => project._id?.toString() === projectId
    );

    if (!project) {
        throw new Error("Resume project not found.");
    }

    return project;
};
module.exports={createProject,getProjects,getProjectById,updateProject,addProjectSkill,getProjectSkills,removeProjectSkill,
    createProjectReview,getProjectReviewHistory,getLatestProjectReview,getProjectReviewById,deleteProject, getProjectStats
    ,getProfileProjects,getRecentActivity,getFeaturedProjects,getProjectProgress,getProjectTrend,getResumeProjects,getCareerProjects,
    getResumeProjectById
    
};


