const notificationService = require("../services/notificationService");
const NOTIFICATION_MESSAGES= require("../constants/messages/notificationMessages");
const asyncHandler = require("../utils/asyncHandlers");

const getNotifications = asyncHandler(async (req, res) => {

    const result = await notificationService.getNotifications(
        req.user.id,
        req.query
    );

    res.status(200).json({
        success: true,
        message:
            result.notifications.length > 0
                ? NOTIFICATION_MESSAGES.NOTIFICATION_FETCHED_SUCCESS
                :NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND,
        data: result.notifications,
        unreadCount: result.unreadCount,
        pagination: result.pagination
    });

});


const getNotificationDetails = asyncHandler(async (req, res) => {

    const notification =
        await notificationService.getNotificationDetails(
            req.user.id,
            req.params.notificationId
        );

    res.status(200).json({
        success: true,
        message:NOTIFICATION_MESSAGES.NOTIFICATION_FETCHED_SUCCESS,
        data: notification
    });

});

const markNotificationAsRead = asyncHandler(async (req, res) => {

    const notification = await notificationService.markNotificationAsRead(
            req.user.id,
            req.params.notificationId
        );

    res.status(200).json({
        success: true,
        message: NOTIFICATION_MESSAGESS.NOTIFICATION_MARKED_AS_READ,
        data: notification
    });

});

const markAllNotificationsAsRead =asyncHandler(async (req, res) => {

    const updatedCount =await notificationService.markAllNotificationsAsRead(
            req.user.id
        );

    res.status(200).json({
        success: true,
        message:NOTIFICATION_MESSAGES.ALL_NOTIFICATIONS_MARKED_AS_READ,
        data: {updatedCount}
    });

});

const getUnreadNotificationCount =asyncHandler(async (req, res) => {

    const unreadCount =await notificationService.getUnreadNotificationCount(req.user.id);
    res.status(200).json({
        success: true,
        message: NOTIFICATION_MESSAGES.UNREAD_NOTIFICATION_COUNT_FETCHED,
        data: {unreadCount}
    });

});

const deleteNotification = asyncHandler(async (req, res) => {

    const result =await notificationService.deleteNotification(
            req.user.id,
            req.params.notificationId
        );

    return res.status(200).json({
        success: true,
        message:NOTIFICATION_MESSAGES.NOTIFICATION_DELETED,
        data: result
    });

});


const clearAllNotifications = asyncHandler(async (req, res) => {

        const result = await notificationService.clearAllNotifications(
                req.user.id
            );

        return res.status(200).json({
            success: true,
            message:NOTIFICATION_MESSAGES.ALL_NOTIFICATIONS_DELETED,
            data: result
        });

    }
);



module.exports = {
    getNotifications,getNotificationDetails,markNotificationAsRead ,markAllNotificationsAsRead,getUnreadNotificationCount,deleteNotification,clearAllNotifications
};