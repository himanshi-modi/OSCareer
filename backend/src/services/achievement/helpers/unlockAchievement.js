const Achievement = require("../../../models/Achievement");

const unlockAchievement = async (userId, rule, metadata = {}) => {

    const exists = await Achievement.findOne({
        userId,
        achievementKey: rule.achievementKey
    }).lean();
    
    if (exists) {
        return null;
    }

    const achievement = await Achievement.create({
        userId,
        achievementKey: rule.achievementKey,
        title: rule.title,
        description: rule.description,
        category: rule.category,
        rarity: rule.rarity,
        badgeIcon: rule.badgeIcon,
        badgeColor: rule.badgeColor,
        xpReward: rule.xpReward,
        metadata
    });

    return achievement;
};

module.exports = unlockAchievement;