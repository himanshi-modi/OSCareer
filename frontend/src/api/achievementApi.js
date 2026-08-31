import api from "./axios";

export const getAchievements = (params = {}) => {
    return api.get("/achievements", {
        params,
    });
};

export const getAchievementsByCategory = (
    category,
    params = {}
) => {
    return api.get(`/achievements/category/${category}`, {
        params,
    });
};

export const getAchievementDetails = (achievementId) => {
    return api.get(`/achievements/${achievementId}`);
};

export const getRecentAchievements = (params = {}) => {
    return api.get("/achievements/recent", {
        params,
    });
};

export const getAchievementStats = () => {
    return api.get("/achievements/stats");
};

export const evaluateAchievements = () => {
    return api.post("/achievements/evaluate");
};