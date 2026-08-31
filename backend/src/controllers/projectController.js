const asyncHandler = require("../utils/asyncHandlers");
const projectService = require("../services/projectService");
const PROJECT_MESSAGES = require("../constants/messages/projectMessages");

const createProject = asyncHandler(async (req, res) => {
    const project = await projectService.createProject(req.user.id,req.body);

    return res.status(201).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_CREATED_SUCCESS,
        data: project
    });
});

const getProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getProjects(req.user.id,req.query);
    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECTS_FETCHED_SUCCESS,
        data: projects
    });
});

const getProjectById = asyncHandler(async (req, res) => {
    const project = await projectService.getProjectById(req.user.id,req.params.projectId);
    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_FETCHED_SUCCESS,
        data: project
    });
});

const updateProject = asyncHandler(async (req, res) => {
    const updatedProject = await projectService.updateProject(
        req.user.id,
        req.params.projectId,
        req.body
    );

    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_UPDATED_SUCCESS,
        data: updatedProject
    });
});

const deleteProject = asyncHandler(async (req, res) => {
    await projectService.deleteProject(req.user.id,req.params.projectId);
    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_DELETED_SUCCESS
    });
});
const addProjectSkill = asyncHandler(async (req, res) => {
    const projectSkill = await projectService.addProjectSkill(
        req.user.id,
        req.params.projectId,
        req.body
    );
     return res.status(201).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_SKILL_ADDED_SUCCESS,
        data: projectSkill
    });
});
const getProjectSkills = asyncHandler(async (req, res) => {
    const projectSkills = await projectService.getProjectSkills( req.user.id, req.params.projectId);

    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_SKILLS_FETCHED_SUCCESS,
        data: projectSkills
    });
});
const removeProjectSkill = asyncHandler(async (req, res) => {
    await projectService.removeProjectSkill(
        req.user.id,
        req.params.projectId,
        req.params.skillId
    );
    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_SKILL_REMOVED_SUCCESS
    });
});

const createProjectReview = asyncHandler(async (req, res) => {
    const projectReview = await projectService.createProjectReview( req.user.id, req.params.projectId);

    return res.status(201).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_REVIEW_CREATED_SUCCESS,
        data: projectReview
    });
});


const getProjectReviewHistory = asyncHandler(async (req, res) => {
    const reviews = await projectService.getProjectReviewHistory(req.user.id,req.params.projectId);
    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_REVIEWS_FETCHED_SUCCESS,
        data: reviews
    });
});
const getLatestProjectReview = asyncHandler(async (req, res) => {
    const latestReview = await projectService.getLatestProjectReview( req.user.id, req.params.projectId);
    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_REVIEW_FETCHED_SUCCESS,
        data: latestReview
    });
});
const getProjectReviewById = asyncHandler(async (req, res) => {
    const review = await projectService.getProjectReviewById(req.user.id,req.params.projectId,req.params.reviewId);

    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.PROJECT_REVIEW_FETCHED_SUCCESS,
        data: review
    });
});
const getResumeProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getResumeProjects(req.user.id);

    return res.status(200).json({
        success: true,
        message: PROJECT_MESSAGES.RESUME_PROJECTS_FETCHED_SUCCESS,
        data: projects
    });
});
const getCareerProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getCareerProjects(req.user.id);

    return res.status(200).json({
        success: true,
        message: "CareerOS projects fetched successfully",
        data: projects
    });
});
const getResumeProjectById = asyncHandler(async (req, res, next) => {
  
    const { projectId } = req.params;

    const project = await projectService.getResumeProjectById(
      req.user.id,
      projectId
    );

    return res.status(200).json({
      success: true,
      message: "Resume project fetched successfully",
      data: project,
    });
   
});
module.exports={createProject,getProjects,getProjectById,updateProject,deleteProject
    ,addProjectSkill,getProjectSkills,removeProjectSkill,createProjectReview,
    getProjectReviewHistory,getLatestProjectReview,getProjectReviewById,getResumeProjects,getCareerProjects,getResumeProjectById};