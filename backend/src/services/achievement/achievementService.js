const Achievement = require("../../models/Achievement");
const mongoose=require("mongoose");
const AppError = require("../../errors/AppError");
const ACHIEVEMENT_MESSAGES = require("../../constants/messages/achievementMessages");
const {
    evaluateWeeklyReviewAchievements
} = require("./rules/weeklyReviewsRules");
const {getStartDate} = require("../../utils/date/getStartDate");

const getAchievements = async (userId, query) => {
    const {
        page,
        limit,
        category,
        rarity,
        sortBy,
        order
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const filters = { userId };

    if (category) {
        filters.category = category;
    }

    if (rarity) {
        filters.rarity = rarity;
    }

    const sortOptions = {
        [sortBy]: order === "asc" ? 1 : -1
    };

    const [achievements, total] = await Promise.all([
        Achievement.find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber)
            .lean(),

        Achievement.countDocuments(filters)
    ]);

    return {
        data: achievements,
        pagination: {
            total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            limit: limitNumber
        }
    };
};

const getAchievementDetails = async (userId, achievementId) => {
    if (!mongoose.Types.ObjectId.isValid(achievementId)) {
    throw new AppError(
        ACHIEVEMENT_MESSAGES.INVALID_ACHIEVEMENT_ID,
        400
    );
}

    const achievement = await Achievement.findOne({ _id: achievementId,userId});
    if (!achievement) {
        throw new AppError(ACHIEVEMENT_MESSAGES.ACHIEVEMENT_NOT_FOUND,404);
    }
    return achievement;
};

const getAchievementsByCategory = async (userId,  category, query) => {

    return getAchievements(
        userId,
        { ...query, category}
    );

};

const getRecentAchievements = async (userId, limit = 5) => {

    const achievements = await Achievement.find({
        userId
    })
        .sort({
            unlockedAt: -1
        })
        .limit(limit);

    return achievements;
};

const getAchievementStats = async (userId) => {

    const stats = await Achievement.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $facet: {
                overview: [
                    {
                        $group: {
                            _id: null,
                            totalAchievements: { $sum: 1 },
                            totalXp: { $sum: "$xpReward" }
                        }
                    }
                ],

                rarity: [
                    {
                        $group: {
                            _id: "$rarity",
                            count: { $sum: 1 }
                        }
                    }
                ],
                categories: [
                    {
                        $group: {
                            _id: "$category",
                            count: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ]);
    const result = stats[0];
    const rarity = {
        common: 0,
        rare: 0,
        epic: 0,
        legendary: 0
    };
    result.rarity.forEach(item => {
        rarity[item._id] = item.count;
    });
    const categories = {};
    result.categories.forEach(item => {
        categories[item._id] = item.count;
    });

    return {
        totalAchievements:result.overview[0]?.totalAchievements || 0,
        totalXp:result.overview[0]?.totalXp || 0,
        rarity,
        categories
    };

};


const {
    evaluateMissionAchievements
} = require("./rules/missionRules");

const {
    evaluateProjectAchievements
} = require("./rules/projectRules");

const {
    evaluateSkillAchievements
} = require("./rules/skillRules");

const {
    evaluateCertificateAchievements
} = require("./rules/certificateRules");

const {
    evaluateResumeAchievements
} = require("./rules/resumeRules");


const {
    evaluateRoadmapAchievements
} = require("./rules/roadmapRules");
const { collectAchievementStats } = require("./helpers/achievementHelper");

const getAchievementSummary = async (userId) => {

    const [stats, latestAchievements] = await Promise.all([
        getAchievementStats(userId),
        getRecentAchievements(userId, 3)
    ]);

    return {
        totalAchievements: stats.totalAchievements,
        totalXp: stats.totalXp,
        latestAchievements
    };

};
const getProfileAchievements = async (userId) => {

    const achievements = await Achievement.find({
        userId
    })
        .sort({
            unlockedAt: -1
        })
        .limit(3)
        .select(
            "_id title description category rarity xpReward unlockedAt"
        )
        .lean();

    return achievements;
};

const evaluateAchievements = async (userId) => {

    // Collect the user's current progress
    const stats = await collectAchievementStats(userId);

    console.log("🏆 Achievement Stats:", stats);

    const [
        mission,
        project,
        skill,
        certificate,
        resume,
        roadmap,
        weekly
    ] = await Promise.all([

        evaluateMissionAchievements(
            userId,
            stats
        ),

        evaluateProjectAchievements(
            userId,
            stats
        ),

        evaluateSkillAchievements(
            userId,
            stats
        ),

        evaluateCertificateAchievements(
            userId,
            stats
        ),

        evaluateResumeAchievements(
            userId,
            stats
        ),

        evaluateRoadmapAchievements(
            userId,
            stats
        ),

        evaluateWeeklyReviewAchievements(
            userId,
            stats
        )

    ]);

    return [
        ...mission,
        ...project,
        ...skill,
        ...certificate,
        ...resume,
        ...roadmap,
        ...weekly
    ];
};




const getRecentActivity = async (userId) => {

    const achievements = await Achievement.find({
        userId
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("_id title description createdAt");

    return achievements.map((achievement) => ({
        type: "achievement",

        title: "Achievement Unlocked",

        description:
            achievement.description ||
            achievement.title,

        referenceId: achievement._id,

        createdAt: achievement.createdAt
    }));
};


const getPublicUserAchievements = async (userId) => {

    return await Achievement.find({
        userId
    })
        .sort({
            createdAt: -1
        })
        .limit(10)
        .select(
            "_id title description createdAt"
        )
        .lean();
};


const getAchievementProgress = async (userId) => {

    const totalAchievements =
        await Achievement.countDocuments({
            userId
        });

    const totalAvailable =
        await Achievement.countDocuments({
            isActive: true
        });

    const percentage =
        totalAvailable === 0
            ? 0
            : Math.min(
                Math.round(
                    (totalAchievements / totalAvailable) * 100
                ),
                100
            );

    return {
        percentage,
        unlocked: totalAchievements,
        totalAvailable
    };
};


const getAchievementTrend = async (
    userId,
    period = "6m"
) => {

    const startDate = getStartDate(period);

    const achievements = await Achievement.find({
        userId,
        createdAt: {
            $gte: startDate
        }
    })
        .sort({ createdAt: 1 })
        .select("createdAt")
        .lean();

    const trend = {};

    achievements.forEach((achievement) => {

        const date =
            new Date(achievement.createdAt);

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

        trend[key] =
            (trend[key] || 0) + 1;
    });

    return Object.entries(trend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, earned]) => ({
            date,
            earned
        }));
};
module.exports = {
    getAchievements,getAchievementDetails,getAchievementsByCategory,getRecentAchievements,getAchievementStats,getAchievementSummary,evaluateAchievements,
    getProfileAchievements,getRecentActivity,getPublicUserAchievements,getAchievementProgress,getAchievementTrend
};