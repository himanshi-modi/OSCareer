const unlockAchievement = require("../helpers/unlockAchievement");
const  ACHIEVEMENT_RULES  = require("../../../utils/achievements/achievementRules");

const evaluateResumeAchievements = async (
    userId,
    stats
) => {

    const unlocked = [];

    if (stats.uploadedResumes >= 1) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "FIRST_RESUME"
        );

        const achievement =
            await unlockAchievement(
                userId,
                rule,
                {
                    uploadedResumes: stats.uploadedResumes
                }
            );
        if (achievement) {
            unlocked.push(achievement);
        }
    }
    return unlocked;

};

module.exports = {
    evaluateResumeAchievements
};