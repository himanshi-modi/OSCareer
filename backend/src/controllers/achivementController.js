const asyncHandler = require("../utils/asyncHandlers");
const achievementService = require("../services/achievement/achievementService");
const ACHIEVEMENT_MESSAGES = require("../constants/messages/achievementMessages");

const getAchievements = asyncHandler(async (req, res) => {

    const result = await achievementService.getAchievements(
        req.user.id,
        req.query
    );

    return res.status(200).json({
        success: true,
        message:
            result.data.length > 0
                ? ACHIEVEMENT_MESSAGES.ACHIEVEMENTS_FETCHED_SUCCESS
                : ACHIEVEMENT_MESSAGES.NO_ACHIEVEMENTS_FOUND,
        data: result.data,
        pagination: result.pagination
    });

});

const getAchievementDetails = asyncHandler(async (req, res) => {

    const achievement =await achievementService.getAchievementDetails(req.user.id, req.params.achievementId);

    return res.status(200).json({
        success: true,
        message:ACHIEVEMENT_MESSAGES.ACHIEVEMENT_FETCHED_SUCCESS,
        data: achievement
    });

});

const getAchievementsByCategory = asyncHandler(async (req, res) => {

    const result = await achievementService.getAchievementsByCategory(
        req.user.id,
        req.params.category,
        req.query
    );

    return res.status(200).json({
        success: true,
        message:
            result.pagination.total === 0
                ? ACHIEVEMENT_MESSAGES.NO_CATEGORY_ACHIEVEMENTS_FOUND
                : ACHIEVEMENT_MESSAGES.CATEGORY_ACHIEVEMENTS_FETCHED_SUCCESS,

        data: result.data,

        pagination: result.pagination
    });
});
const getRecentAchievements = asyncHandler(async (req, res) => {

    const achievements =
        await achievementService.getRecentAchievements(
            req.user.id,
            req.query.limit
        );

    return res.status(200).json({
        success: true,
        message:achievements.length === 0
                ? ACHIEVEMENT_MESSAGES.NO_RECENT_ACHIEVEMENTS_FOUND
                : ACHIEVEMENT_MESSAGES.RECENT_ACHIEVEMENTS_FETCHED_SUCCESS,
        data: achievements
    });

});

const getAchievementStats = asyncHandler(async (req, res) => {
    const stats = await achievementService.getAchievementStats(req.user.id);
    return res.status(200).json({
        success: true,
        message:ACHIEVEMENT_MESSAGES.ACHIEVEMENT_STATS_FETCHED_SUCCESS,
        data: stats
    });

});
const evaluateAchievements =asyncHandler( async (req, res, next) => {
        const achievements =
            await achievementService.evaluateAchievements(
                req.user.id
            );

        res.status(200).json({
            success: true,
            message:achievements.length
                    ? "Achievements evaluated successfully."
                    : "No new achievements unlocked.",
            data: achievements
        });

   
});
module.exports = {
    getAchievements,getAchievementDetails,getAchievementsByCategory,getRecentAchievements,getAchievementStats,
    evaluateAchievements
};