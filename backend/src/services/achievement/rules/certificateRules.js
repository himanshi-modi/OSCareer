const unlockAchievement = require("../helpers/unlockAchievement");
const  ACHIEVEMENT_RULES  = require("../../../utils/achievements/achievementRules");

const evaluateCertificateAchievements = async (userId,stats) => {

    const unlocked = [];

    if (stats.completedCertificates >= 1) {

        const rule = ACHIEVEMENT_RULES.find(
            achievement =>
                achievement.achievementKey ===
                "FIRST_CERTIFICATE"
        );

        const achievement =
            await unlockAchievement(
                userId,
                rule,
                {
                    completedCertificates:stats.completedCertificates
                }
            );
        if (achievement) {
            unlocked.push(achievement);
        }
    }
    return unlocked;

};

module.exports = {
    evaluateCertificateAchievements
};