
const unlockAchievement = require("../helpers/unlockAchievement");
const ACHIEVEMENT_RULES = require("../../../utils/achievements/achievementRules");

const evaluateRoadmapAchievements = async (
    userId,
    stats
) => {

    const unlocked = [];

    if (stats.completedStages >= 1) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "FIRST_STAGE"
        );

        const achievement =
            await unlockAchievement(
                userId,
                rule,
                {
                    completedStages: stats.completedStages
                }
            );

        if (achievement) {
            unlocked.push(achievement);
        }
    }

    return unlocked;
};

module.exports = {
    evaluateRoadmapAchievements
};
