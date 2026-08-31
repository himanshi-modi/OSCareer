const asyncHandler = require("../utils/asyncHandlers");
const dashboardService = require("../services/dashboardService");
const DASHBOARD_MESSAGES = require("../constants/messages/dashboardMessages");

const getDashboard =asyncHandler(async (req, res) => {

    const dashboard =await dashboardService.getDashboard(req.user.id
);
    return res.status(200).json({
        success: true,
        message:DASHBOARD_MESSAGES.DASHBOARD_FETCHED_SUCCESS,
        data: dashboard
    });

});

const getProfileOverview = asyncHandler(async (req, res) => {
    const profile =await dashboardService.getProfileOverview( req.user.id);
    return res.status(200).json({
        success: true,
        message:DASHBOARD_MESSAGES.PROFILE_FETCHED_SUCCESS,
        data: profile
    });

});

const getDashboardStats =asyncHandler(async (req, res) => {

    const stats =await dashboardService.getDashboardStats(req.user.id);
    return res.status(200).json({
        success: true,
        message:DASHBOARD_MESSAGES.STATS_FETCHED_SUCCESS,
        data: stats

    });

});

const getRecentActivity =asyncHandler(async (req, res) => {
        const page =Number(req.query.page) || 1;
        const limit =Number(req.query.limit) || 10;
        const activity =await dashboardService.getRecentActivity(
                req.user.id,
                {
                    page,
                    limit
                }
            );
        return res.status(200).json({
            success: true,
            message:DASHBOARD_MESSAGES.ACTIVITY_FETCHED_SUCCESS,
            data: activity
        });

});
const getPublicProfile =asyncHandler(async (req, res) => {

        const profile =await dashboardService.getPublicProfile(
                req.params.userId
            );

        return res.status(200).json({
            success: true,
            message:DASHBOARD_MESSAGES.PUBLIC_PROFILE_FETCHED_SUCCESS,
            data: profile

        });

});

const getProfileProgress =asyncHandler(async (req, res) => {

        const progress =await dashboardService.getProfileProgress(
                req.user.id
            );

        return res.status(200).json({
            success: true,
            message:DASHBOARD_MESSAGES.PROGRESS_FETCHED_SUCCESS,
            data: progress

        });

});
const getCareerAnalytics =asyncHandler(async (req, res) => {

        const analytics =await dashboardService.getCareerAnalytics(
                req.user.id,
                req.query.period
            );

        return res.status(200).json({
            success: true,
            message:DASHBOARD_MESSAGES.ANALYTICS_FETCHED_SUCCESS,
            data: analytics

        });

});
const getCareerInsights =asyncHandler(async (req, res) => {

        const insights =await dashboardService.getCareerInsights(
                req.user.id
            );

        return res.status(200).json({

            success: true,

            message:DASHBOARD_MESSAGES.INSIGHTS_FETCHED_SUCCESS,

            data: insights

        });

});
module.exports = {
    getDashboard , getProfileOverview,getDashboardStats,getRecentActivity,getPublicProfile,getProfileProgress,getCareerAnalytics,
    getCareerInsights
};