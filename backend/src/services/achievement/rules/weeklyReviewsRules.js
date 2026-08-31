const unlockAchievement = require("../helpers/unlockAchievement");
const  ACHIEVEMENT_RULES  = require("../../../utils/achievements/achievementRules");

const evaluateWeeklyReviewAchievements = async (
    userId,
    stats
) => {

    const unlocked = [];

    if (stats.completedWeeklyReviews >= 1) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "FIRST_WEEKLY_REVIEW"
        );

        const achievement =
            await unlockAchievement(
                userId,
                rule,
                {
                    completedWeeklyReviews:stats.completedWeeklyReviews
                }
            );
        if (achievement) {
            unlocked.push(achievement);
        }
    }
    return unlocked;

};

module.exports = {
    evaluateWeeklyReviewAchievements
};