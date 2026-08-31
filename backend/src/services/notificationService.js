const Notification = require("../models/Notification");
const NOTIFICATION_MESSAGES = require("../constants/messages/notificationMessages");
const AppError = require("../errors/AppError");
const User = require("../models/User");
const AUTH_MESSAGES = require("../constants/messages/authMessages");
const getNotifications = async (userId, query) => {
    const {
        page,
        limit,
        isRead,
        type,
        priority,
        sortBy,
        order
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const filters = {
        userId,
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    };

    if (isRead !== undefined) {
        filters.isRead = isRead;
    }

    if (type) {
        filters.type = type;
    }

    if (priority) {
        filters.priority = priority;
    }

    const sortOptions = {
        [sortBy]: order === "asc" ? 1 : -1
    };

    const [notifications, total, unreadCount] = await Promise.all([
        Notification.find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber),

        Notification.countDocuments(filters),

        Notification.countDocuments({
            userId,
            isRead: false,
            $or: [
                { expiresAt: null },
                { expiresAt: { $gt: new Date() } }
            ]
        })
    ]);

    return {
        notifications,
        unreadCount,
        pagination: {
            total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            limit: limitNumber
        }
    };
};

const getNotificationDetails = async (userId, notificationId) => {
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    throw new AppError(
        NOTIFICATION_MESSAGES.INVALID_NOTIFICATION_ID,
        400
    );
}
    const notification = await Notification.findOne({
        _id: notificationId,
        userId,
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    });

    if (!notification) {
        throw new AppError(NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND,404);
    }

    if (!notification.isRead) {
    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();
}
    return notification;
};


const markNotificationAsRead = async (
    userId,
    notificationId
) => {
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    throw new AppError(
        NOTIFICATION_MESSAGES.INVALID_NOTIFICATION_ID,
        400
    );
}
    const notification =
        await Notification.findOneAndUpdate(
            {
    _id: notificationId,
    userId,
    $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
    ]
},
            {
                $set: {
                    isRead: true,
                    readAt: new Date()
                }
            },
            {
                new: true
            }
        );

    if (!notification) {
        throw new AppError(
            NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND,
            404
        );
    }
    return notification;
};

const markAllNotificationsAsRead = async (userId) => {

    const result = await Notification.updateMany(
        {
            userId,
            isRead: false
        },
        {
            $set: {
                isRead: true,
                readAt: new Date()
            }
        }
    );
    return result.modifiedCount;

};

const getUnreadNotificationCount = async (userId) => {

    const unreadCount = await Notification.countDocuments({
            userId,
            isRead: false,
            $or: [
                {
                    expiresAt: null
                },
                {
                    expiresAt: {
                        $gt: new Date()
                    }
                }
            ]
        });
    return unreadCount;

};

const deleteNotification = async ( userId,notificationId) => {
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    throw new AppError(
        NOTIFICATION_MESSAGES.INVALID_NOTIFICATION_ID,
        400
    );
}
    const notification =await Notification.findOne({ _id: notificationId, userId });

    if (!notification) {
        throw new AppError( NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND, 404);
    }
    await notification.deleteOne();
    const unreadCount =await Notification.countDocuments({
    userId,
    isRead: false,
    $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
    ]
});

    return {unreadCount};

};

const clearAllNotifications = async (userId) => {

    const result =await Notification.deleteMany({userId});

    return {
        deletedCount: result.deletedCount,
        unreadCount: 0
    };

};

const createNotification = async ({
    userId,
    title,
    message,
    type,
    priority = "medium",
    actionUrl = "",
    metadata = {},
    expiresAt = null
}) => {

    

    const notification =
        await Notification.create({
            userId,
            title,
            message,
            type,
            priority,
            actionUrl,
            metadata,
            expiresAt
        });

    return notification;
};

const getRecentNotifications = async (userId, limit = 5) => {
    return await Notification.find({
        userId,
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    })
    .sort({ createdAt: -1 })
    .limit(limit);
};


module.exports = {
    getNotifications,getNotificationDetails , markNotificationAsRead,markAllNotificationsAsRead,getUnreadNotificationCount,
    deleteNotification,clearAllNotifications,createNotification,getRecentNotifications
};