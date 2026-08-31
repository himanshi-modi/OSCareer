const unlockAchievement = require("../helpers/unlockAchievement");
const  ACHIEVEMENT_RULES  = require("../../../utils/achievements/achievementRules");

const evaluateProjectAchievements = async (
    userId,
    stats
) => {
    const unlocked = [];
    console.log("Project Stats:", stats.completedProjects);
    if (stats.completedProjects >= 1) {
        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey === "FIRST_PROJECT"
        );
        console.log("Creating FIRST_PROJECT achievement...");
        const achievement = await unlockAchievement(
            userId,
            rule,
            {
                completedProjects: stats.completedProjects
            }
        );
        console.log("Achievement created:", achievement);

        if (achievement) {
            unlocked.push(achievement);
        }
    }

    return unlocked;
};

module.exports = {
    evaluateProjectAchievements
};