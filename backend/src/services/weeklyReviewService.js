const WeeklyReview = require("../models/WeeklyReview");
const AppError = require("../errors/AppError");

const getCurrentWeek = require("../utils/date/getCurrentWeek");
const getPreviousWeek = require("../utils/date/getPreviousWeek");

const { collectWeeklyStats } = require("./weeklyReviewStatsService");

const {
    generateWeeklyReviewAnalysis
} = require("./ai/weeklyReviewAnalysisPlaceholder");

const WEEKLY_REVIEW_MESSAGES = require("../constants/messages/weeklyReviewMessages");

const { getStartDate } = require("../utils/date/getStartDate");
const { getWeekKey } = require("../utils/date/getWeekKey");

const mongoose = require("mongoose");


// ============================================================
// GENERATE CURRENT WEEKLY REVIEW
// ============================================================

const generateWeeklyReview = async (userId) => {

    const {
        weekStartDate,
        weekEndDate
    } = getCurrentWeek();

    return generateWeeklyReviewForWeek(
        userId,
        weekStartDate,
        weekEndDate
    );
};


// ============================================================
// GENERATE REVIEW FOR ANY WEEK
// ============================================================

const generateWeeklyReviewForWeek = async (
    userId,
    weekStartDate,
    weekEndDate
) => {

    const existingReview = await WeeklyReview.findOne({
        userId,
        weekStartDate,
        isDeleted: false
    });

    if (existingReview) {
        return {
            isExisting: true,
            review: existingReview
        };
    }

    const stats = await collectWeeklyStats(
        userId,
        weekStartDate,
        weekEndDate
    );

    const weeklyReview = await WeeklyReview.create({

        userId,

        weekStartDate,

        weekEndDate,

        completedMissions:
            stats.completedMissions,

        totalMissions:
            stats.totalMissions,

        roadmapProgress:
            stats.roadmapProgress,

        skillsLearned:
            stats.skillsLearned,

        projectsCompleted:
            stats.projectsCompleted,

        certificatesAdded:
            stats.certificatesAdded,

        resumesUpdated:
            stats.resumesUpdated,

        readinessScore:
            stats.readinessScore ?? null
    });

    return {
        isExisting: false,
        review: weeklyReview
    };
};


// ============================================================
// GENERATE LAST WEEK'S REVIEW
// ============================================================

const generateLastWeekReview = async (userId) => {

    const {
        weekStartDate,
        weekEndDate
    } = getPreviousWeek();

    return generateWeeklyReviewForWeek(
        userId,
        weekStartDate,
        weekEndDate
    );
};


// ============================================================
// GET CURRENT WEEKLY REVIEW
// ============================================================

const getCurrentWeeklyReview = async (userId) => {

    const { weekStartDate } = getCurrentWeek();

    const review = await WeeklyReview.findOne({
        userId,
        weekStartDate,
        isDeleted: false
    })
        .populate("skillsLearned", "name category")
        .populate("projectsCompleted", "title category")
        .populate("certificatesAdded", "title issuer")
        .populate("resumesUpdated", "resumeTitle version");

    if (!review) {
        throw new AppError(
            WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_NOT_FOUND,
            404
        );
    }

    return review;
};


// ============================================================
// GET CURRENT WEEKLY REVIEW FOR DASHBOARD
// ============================================================

const getCurrentWeeklyReviewForDashboard = async (userId) => {

    const { weekStartDate } = getCurrentWeek();

    const review = await WeeklyReview.findOne({
        userId,
        weekStartDate,
        isDeleted: false
    })
        .populate("skillsLearned", "name category")
        .populate("projectsCompleted", "title category")
        .populate("certificatesAdded", "title issuer")
        .populate("resumesUpdated", "resumeTitle version");

    return review || null;
};


// ============================================================
// UPDATE CURRENT WEEKLY REVIEW
// ============================================================

const updateCurrentWeeklyReview = async (
    userId,
    updateData
) => {

    const { weekStartDate } = getCurrentWeek();

    const review = await WeeklyReview.findOne({
        userId,
        weekStartDate,
        isDeleted: false
    });

    if (!review) {
        throw new AppError(
            WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_NOT_FOUND,
            404
        );
    }

    const allowedFields = [
        "biggestAchievement",
        "biggestChallenge",
        "nextWeekGoal",
        "confidenceLevel",
        "motivationLevel",
        "notes"
    ];

    for (const field of allowedFields) {

        if (field in updateData) {
            review[field] = updateData[field];
        }
    }

    review.reviewStatus = "completed";

    review.reviewedAt = new Date();

    await review.save();

    return review;
};


// ============================================================
// WEEKLY REVIEW HISTORY
// ============================================================

const getWeeklyReviewHistory = async (
    userId,
    page = 1,
    limit = 10
) => {

    const skip = (page - 1) * limit;

    const [
        reviews,
        totalReviews
    ] = await Promise.all([

        WeeklyReview.find({
            userId,
            isDeleted: false
        })
            .select(
                "weekStartDate weekEndDate reviewStatus roadmapProgress readinessScore consistencyScore reviewedAt"
            )
            .sort({
                weekStartDate: -1
            })
            .skip(skip)
            .limit(limit),

        WeeklyReview.countDocuments({
            userId,
            isDeleted: false
        })
    ]);

    return {

        reviews,

        pagination: {
            totalReviews,
            currentPage: page,
            totalPages:
                Math.ceil(totalReviews / limit),
            limit
        }
    };
};


// ============================================================
// GET WEEKLY REVIEW BY ID
// ============================================================

const getWeeklyReviewById = async (
    userId,
    reviewId
) => {

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {

        throw new AppError(
            WEEKLY_REVIEW_MESSAGES.INVALID_WEEKLY_REVIEW_ID,
            400
        );
    }

    const review = await WeeklyReview.findOne({
        _id: reviewId,
        userId,
        isDeleted: false
    })
        .populate(
            "skillsLearned",
            "name category"
        )
        .populate(
            "projectsCompleted",
            "title category"
        )
        .populate(
            "certificatesAdded",
            "title issuer"
        )
        .populate(
            "resumesUpdated",
            "resumeTitle version"
        );

    if (!review) {

        throw new AppError(
            WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_NOT_FOUND,
            404
        );
    }

    return review;
};


// ============================================================
// DELETE WEEKLY REVIEW
// ============================================================

const deleteWeeklyReview = async (
    userId,
    reviewId
) => {

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {

        throw new AppError(
            WEEKLY_REVIEW_MESSAGES.INVALID_WEEKLY_REVIEW_ID,
            400
        );
    }

    const review = await WeeklyReview.findOne({
        _id: reviewId,
        userId,
        isDeleted: false
    });

    if (!review) {

        throw new AppError(
            WEEKLY_REVIEW_MESSAGES.WEEKLY_REVIEW_NOT_FOUND,
            404
        );
    }

    review.isDeleted = true;

    review.deletedAt = new Date();

    await review.save();
};


// ============================================================
// AI ANALYSIS
// ============================================================

const analyzeCurrentWeeklyReview = async (userId) => {

    const { weekStartDate } = getCurrentWeek();

    let review = await WeeklyReview.findOne({
        userId,
        weekStartDate,
        isDeleted: false
    });

    if (!review) {

        const generated =
            await generateWeeklyReview(userId);

        review = generated.review;
    }

    const aiResult =
        generateWeeklyReviewAnalysis(review);

    review.aiSummary =
        aiResult.aiSummary;

    review.aiSuggestions =
        aiResult.aiSuggestions;

    review.aiMotivation =
        aiResult.aiMotivation;

    review.consistencyScore =
        aiResult.consistencyScore;

    await review.save();

    return review;
};


// ============================================================
// WEEKLY REVIEW STATS
// ============================================================

const getWeeklyReviewStats = async (userId) => {

    const reviews = await WeeklyReview.find({
        userId,
        isDeleted: false
    })
        .sort({
            weekStartDate: 1
        });

    const totalReviews =
        reviews.length;

    const completedWeeks =
        reviews.filter(
            review =>
                review.reviewStatus === "completed"
        ).length;

    const consistencyReviews =
        reviews.filter(
            review =>
                review.consistencyScore !== null
        );

    const averageConsistency =
        consistencyReviews.length > 0
            ? Math.round(
                  consistencyReviews.reduce(
                      (sum, review) =>
                          sum +
                          review.consistencyScore,
                      0
                  ) /
                      consistencyReviews.length
              )
            : 0;

    const confidenceReviews =
        reviews.filter(
            review =>
                review.confidenceLevel !== null
        );

    const averageConfidence =
        confidenceReviews.length > 0
            ? Math.round(
                  confidenceReviews.reduce(
                      (sum, review) =>
                          sum +
                          review.confidenceLevel,
                      0
                  ) /
                      confidenceReviews.length
              )
            : 0;

    const motivationReviews =
        reviews.filter(
            review =>
                review.motivationLevel !== null
        );

    const averageMotivation =
        motivationReviews.length > 0
            ? Math.round(
                  motivationReviews.reduce(
                      (sum, review) =>
                          sum +
                          review.motivationLevel,
                      0
                  ) /
                      motivationReviews.length
              )
            : 0;

    let longestStreak = 0;

    let currentStreak = 0;

    for (const review of reviews) {

        if (
            review.reviewStatus ===
            "completed"
        ) {

            currentStreak++;

            longestStreak =
                Math.max(
                    longestStreak,
                    currentStreak
                );

        } else {

            currentStreak = 0;
        }
    }

    return {

        totalReviews,

        completedWeeks,

        averageConsistency,

        averageConfidence,

        averageMotivation,

        longestStreak
    };
};


// ============================================================
// WEEKLY REVIEW CALENDAR
// ============================================================

const getWeeklyReviewCalendar = async (userId) => {

    const startOfYear =
        new Date(
            new Date().getFullYear(),
            0,
            1
        );

    const reviews =
        await WeeklyReview.find({
            userId,
            isDeleted: false,

            weekStartDate: {
                $gte: startOfYear
            }
        })
            .select(
                "weekStartDate weekEndDate reviewStatus consistencyScore readinessScore"
            )
            .sort({
                weekStartDate: 1
            });

    return reviews;
};


// ============================================================
// SUMMARY
// ============================================================

const weeklyReviewSummary = async (userId) => {

    return await getWeeklyReviewStats(
        userId
    );
};


// ============================================================
// CURRENT STREAK
// ============================================================

const getCurrentStreak = async (userId) => {

    const reviews =
        await WeeklyReview.find({
            userId,
            isDeleted: false,
            reviewStatus: "completed"
        })
            .select("weekStartDate")
            .sort({
                weekStartDate: -1
            })
            .lean();

    if (reviews.length === 0) {
        return 0;
    }

    let currentStreak = 0;

    const {
        weekStartDate: currentWeekStart
    } = getCurrentWeek();

    let expectedWeekStart =
        new Date(currentWeekStart);

    for (const review of reviews) {

        const reviewWeekStart =
            new Date(
                review.weekStartDate
            );

        const sameWeek =
            reviewWeekStart.getTime() ===
            expectedWeekStart.getTime();

        if (!sameWeek) {
            break;
        }

        currentStreak++;

        expectedWeekStart =
            new Date(expectedWeekStart);

        expectedWeekStart.setDate(
            expectedWeekStart.getDate() - 7
        );
    }

    return currentStreak;
};


// ============================================================
// RECENT ACTIVITY
// ============================================================

const getRecentActivity = async (userId) => {

    const reviews =
        await WeeklyReview.find({
            userId,
            isDeleted: false
        })
            .sort({
                reviewedAt: -1
            })
            .limit(10)
            .select(
                "_id reviewedAt createdAt"
            );

    return reviews.map(review => ({

        type: "weekly-review",

        title:
            "Weekly Review Completed",

        description:
            "You completed your weekly review",

        referenceId:
            review._id,

        createdAt:
            review.reviewedAt ||
            review.createdAt
    }));
};


// ============================================================
// REVIEW TREND
// ============================================================

const getReviewTrend = async (
    userId,
    period = "6m"
) => {

    const startDate =
        getStartDate(period);

    const reviews =
        await WeeklyReview.find({
            userId,
            isDeleted: false,

            reviewedAt: {
                $gte: startDate
            }
        })
            .sort({
                reviewedAt: 1
            })
            .select("reviewedAt")
            .lean();

    return reviews.map(review => {

        const date =
            new Date(
                review.reviewedAt
            );

        return {

            week:
                getWeekKey(date),

            completed: true
        };
    });
};


// ============================================================
// LATEST WEEKLY REVIEW
// ============================================================

const getLatestWeeklyReview = async (userId) => {

    const latestReview =
        await WeeklyReview.findOne({
            userId,
            isDeleted: false
        })
            .sort({
                weekStartDate: -1
            })
            .populate(
                "skillsLearned",
                "name category"
            )
            .populate(
                "projectsCompleted",
                "title category"
            )
            .populate(
                "certificatesAdded",
                "title issuer"
            )
            .populate(
                "resumesUpdated",
                "resumeTitle version"
            )
            .lean();

    return latestReview || null;
};


// ============================================================
// LAST WEEK READINESS
// ============================================================

const getLastWeekReadiness = async (userId) => {

    const { weekStartDate, weekEndDate } = getPreviousWeek();

    console.log("📅 PREVIOUS WEEK START:", weekStartDate);
    console.log("📅 PREVIOUS WEEK END:", weekEndDate);

    const review = await WeeklyReview.findOne({
        userId,
        weekStartDate,
        isDeleted: false
    })
        .select("weekStartDate weekEndDate readinessScore")
        .lean();

    console.log("📊 PREVIOUS WEEK REVIEW:", review);

    if (!review) {
        return {
            readinessScore: null
        };
    }

    return {
        readinessScore: review.readinessScore ?? null
    };
};

// const generateLastWeekReview = async (userId) => {
//     const {
//         weekStartDate,
//         weekEndDate
//     } = getPreviousWeek();

//     return generateWeeklyReviewForWeek(
//         userId,
//         weekStartDate,
//         weekEndDate
//     );
// };
// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    generateWeeklyReview,

    generateWeeklyReviewForWeek,

    generateLastWeekReview,

    collectWeeklyStats,

    getCurrentWeeklyReview,

    getCurrentWeeklyReviewForDashboard,

    updateCurrentWeeklyReview,

    getWeeklyReviewHistory,

    getWeeklyReviewById,

    deleteWeeklyReview,

    analyzeCurrentWeeklyReview,

    getWeeklyReviewStats,

    getWeeklyReviewCalendar,

    weeklyReviewSummary,

    getCurrentStreak,

    getRecentActivity,

    getReviewTrend,

    getLatestWeeklyReview,

    getLastWeekReadiness
};