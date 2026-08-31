
const unlockAchievement = require("../helpers/unlockAchievement");
const ACHIEVEMENT_RULES = require("../../../utils/achievements/achievementRules");

const evaluateSkillAchievements = async (
    userId,
    stats
) => {

    const unlocked = [];

    if (stats.learnedSkills >= 1) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "FIRST_SKILL"
        );

        const achievement =
            await unlockAchievement(
                userId,
                rule,
                {
                    learnedSkills: stats.learnedSkills
                }
            );

        if (achievement) {
            unlocked.push(achievement);
        }
    }

    return unlocked;
};

module.exports = {
    evaluateSkillAchievements
};

