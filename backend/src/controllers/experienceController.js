const asyncHandler = require("../utils/asyncHandlers");
const experienceService = require("../services/experienceService");
const EXPERIENCE_MESSAGES = require("../constants/messages/experienceMessages");

const createExperience = asyncHandler(async (req, res) => {

    const experience = await experienceService.createExperience(
        req.user.id,
        req.body
    );

    return res.status(201).json({
        success: true,
        message: EXPERIENCE_MESSAGES.EXPERIENCE_CREATED_SUCCESS,
        data: experience
    });

});

const getAllExperiences = asyncHandler(async (req, res) => {

    const result = await experienceService.getAllExperiences(
        req.user.id,
        req.query
    );

    return res.status(200).json({
        success: true,
        message:
            result.experiences.length > 0
                ? EXPERIENCE_MESSAGES.EXPERIENCES_FETCHED_SUCCESS
                : EXPERIENCE_MESSAGES.NO_EXPERIENCES_FOUND,
        data: result.experiences,
        pagination: result.pagination
    });

});

const getExperienceById = asyncHandler(async (req, res) => {

    const experience = await experienceService.getExperienceById(
        req.user.id,
        req.params.experienceId
    );

    return res.status(200).json({
        success: true,
        message: EXPERIENCE_MESSAGES.EXPERIENCE_FETCHED_SUCCESS,
        data: experience
    });

});

const updateExperience = asyncHandler(async (req, res) => {

    const experience = await experienceService.updateExperience(
        req.user.id,
        req.params.experienceId,
        req.body
    );

    return res.status(200).json({
        success: true,
        message: EXPERIENCE_MESSAGES.EXPERIENCE_UPDATED_SUCCESS,
        data: experience
    });

});

const deleteExperience = asyncHandler(async (req, res) => {

    await experienceService.deleteExperience(
        req.user.id,
        req.params.experienceId
    );

    return res.status(200).json({
        success: true,
        message: EXPERIENCE_MESSAGES.EXPERIENCE_DELETED_SUCCESS
    });

});

const getCurrentExperience = asyncHandler(async (req, res) => {

    const experience =
        await experienceService.getCurrentExperience(
            req.user.id
        );

    return res.status(200).json({
        success: true,
        message:
            EXPERIENCE_MESSAGES.CURRENT_EXPERIENCE_FETCHED_SUCCESS,
        data: experience
    });

});

const getExperienceStats = asyncHandler(async (req, res) => {

    const stats = await experienceService.getExperienceStats(
        req.user.id
    );

    return res.status(200).json({
        success: true,
        message: EXPERIENCE_MESSAGES.EXPERIENCE_STATS_FETCHED_SUCCESS,
        data: stats
    });

});
const toggleFeaturedExperience = asyncHandler(async (req, res) => {

    const experience =
        await experienceService.toggleFeaturedExperience(
            req.user.id,
            req.params.experienceId
        );

    return res.status(200).json({
        success: true,
        message:
            EXPERIENCE_MESSAGES.EXPERIENCE_FEATURED_UPDATED_SUCCESS,
        data: experience
    });

});
module.exports = {
    createExperience,getAllExperiences,getExperienceById, updateExperience,deleteExperience,getCurrentExperience
    ,getExperienceStats,toggleFeaturedExperience
};