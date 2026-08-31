const { z } = require("zod");
const mongoose=require("mongoose");
const getAchievementsQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),

    category: z.enum([
        "roadmap",
        "mission",
        "skill",
        "project",
        "certificate",
        "resume",
        "streak",
        "weekly-review",
        "career",
        "milestone"
    ]).optional(),

    rarity: z.enum([
        "common",
        "rare",
        "epic",
        "legendary"
    ]).optional(),

    sortBy: z.enum([
        "unlockedAt",
        "xpReward"
    ]).default("unlockedAt"),

    order: z.enum([
        "asc",
        "desc"
    ]).default("desc")
});


const achievementParamsSchema = z.object({
    achievementId: z
        .string()
        .refine(
            value => mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid achievement ID."
            }
        )
});

const achievementCategoryParamsSchema = z.object({
    category: z.enum([
        "roadmap",
        "mission",
        "skill",
        "project",
        "certificate",
        "resume",
        "streak",
        "weekly-review",
        "career"
    ])
});

const achievementCategoryQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    rarity: z.enum([
        "common",
        "rare",
        "epic",
        "legendary"
    ]).optional(),

    sortBy: z.enum([
        "unlockedAt",
        "xpReward"
    ]).default("unlockedAt"),

    order: z.enum([
        "asc",
        "desc"
    ]).default("desc")
});
const recentAchievementsQuerySchema = z.object({
    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(20)
        .default(5)
});

module.exports = {
    getAchievementsQuerySchema,achievementParamsSchema,achievementCategoryParamsSchema,achievementCategoryQuerySchema,
    recentAchievementsQuerySchema
};