const unlockAchievement = require("../helpers/unlockAchievement");
const ACHIEVEMENT_RULES = require("../../../utils/achievements/achievementRules");

const evaluateMissionAchievements = async (
    userId,
    stats
) => {

    const unlocked = [];

    const completedMissions =
        stats?.completedMissions || 0;


    // FIRST MISSION
    if (completedMissions >= 1) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "FIRST_MISSION"
        );

        if (rule) {

            const achievement =
                await unlockAchievement(
                    userId,
                    rule,
                    {
                        completedMissions
                    }
                );

            if (achievement) {
                unlocked.push(achievement);
            }
        }
    }


    // FIVE MISSIONS
    if (completedMissions >= 5) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "FIVE_MISSIONS"
        );

        if (rule) {

            const achievement =
                await unlockAchievement(
                    userId,
                    rule,
                    {
                        completedMissions
                    }
                );

            if (achievement) {
                unlocked.push(achievement);
            }
        }
    }


    // TEN MISSIONS
    if (completedMissions >= 10) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "TEN_MISSIONS"
        );

        if (rule) {

            const achievement =
                await unlockAchievement(
                    userId,
                    rule,
                    {
                        completedMissions
                    }
                );

            if (achievement) {
                unlocked.push(achievement);
            }
        }
    }


    return unlocked;
};


module.exports = {
    evaluateMissionAchievements
};

