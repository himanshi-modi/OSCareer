const asyncHandler = require("../utils/asyncHandlers");
const weeklyReviewService=require("../services/weeklyReviewService");
const WEEKLY_REVIEW_MESSAGES=require("../constants/messages/weeklyReviewMessages");

const generateWeeklyReview = asyncHandler(async (req, res) => {
    const result = await weeklyReviewService.generateWeeklyReview( req.user.id);
    return res.status(result.isExisting ? 200 : 201).json({
        success: true,
        message: result.isExisting
            ? WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_ALREADY_EXISTS
            : WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_GENERATED_SUCCESS,
        data: result.review
    });

});
const getCurrentWeeklyReview = asyncHandler(async (req, res) => {
    const review = await weeklyReviewService.getCurrentWeeklyReview(req.user.id);

    return res.status(200).json({
        success: true,
        message: WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_FETCHED_SUCCESS,
        data: review
    });

});
const updateCurrentWeeklyReview = asyncHandler(async (req, res) => {

    const review =await weeklyReviewService.updateCurrentWeeklyReview(
            req.user.id,
            req.body
        );
    return res.status(200).json({
        success: true,
        message:WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_UPDATED_SUCCESS,
        data: review
    });

});
const getWeeklyReviewHistory = asyncHandler(async (req, res) => {
    const reviews =await weeklyReviewService.getWeeklyReviewHistory(
            req.user.id,
            req.query.page,
            req.query.limit
        );
    return res.status(200).json({
        success: true,
        message: WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_HISTORY_FETCHED_SUCCESS,
        data: reviews
    });
});
const getWeeklyReviewById = asyncHandler(async (req, res) => {

    const review =await weeklyReviewService.getWeeklyReviewById(req.user.id,req.params.reviewId);
    return res.status(200).json({
        success: true,
        message:WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_FETCHED_SUCCESS,
        data: review
    });
});
const deleteWeeklyReview = asyncHandler(async (req, res) => {

    await weeklyReviewService.deleteWeeklyReview(req.user.id,req.params.reviewId);
    return res.status(200).json({
        success: true,
        message:WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_DELETED_SUCCESS
    });

});
const analyzeCurrentWeeklyReview = asyncHandler(async (req, res) => {
        const review =await weeklyReviewService.analyzeCurrentWeeklyReview(req.user.id);
        return res.status(200).json({
            success: true,
            message:WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_ANALYZED_SUCCESS,
            data: review
        });
});
const getWeeklyReviewStats = asyncHandler(async (req, res) => {
    const stats =await weeklyReviewService.getWeeklyReviewStats( req.user.id);
        res.status(200).json({
        success: true,
        message:WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_STATS_FETCHED_SUCCESS,
        data: stats
    });

});
const getWeeklyReviewCalendar = asyncHandler(async (req, res) => {
    console.log("Calendar API hit");
    const calendar =await weeklyReviewService.getWeeklyReviewCalendar( req.user.id);
    res.status(200).json({
        success: true,
        message:WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_CALENDAR_FETCHED_SUCCESS,
        data: calendar
    });

});
const generateLastWeekReview = asyncHandler(async (req, res) => {

    const result =
        await weeklyReviewService.generateLastWeekReview(
            req.user.id
        );

    return res.status(result.isExisting ? 200 : 201).json({
        success: true,
        message: result.isExisting
            ? WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_ALREADY_EXISTS
            : WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_GENERATED_SUCCESS,
        data: result.review
    });

});

module.exports={generateWeeklyReview,getCurrentWeeklyReview,updateCurrentWeeklyReview,getWeeklyReviewHistory,getWeeklyReviewById
    ,deleteWeeklyReview,analyzeCurrentWeeklyReview,getWeeklyReviewStats,getWeeklyReviewCalendar,generateLastWeekReview};

