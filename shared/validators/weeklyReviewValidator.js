const { z } = require("zod");
const mongoose=require("mongoose");
const updateWeeklyReviewSchema = z.object({

    biggestAchievement: z
        .string()
        .trim()
        .max(500)
        .optional(),

    biggestChallenge: z
        .string()
        .trim()
        .max(500)
        .optional(),

    nextWeekGoal: z
        .string()
        .trim()
        .max(500)
        .optional(),

    confidenceLevel: z
        .number()
        .int()
        .min(1)
        .max(10)
        .nullable()
        .optional(),

    motivationLevel: z
        .number()
        .int()
        .min(1)
        .max(10)
        .nullable()
        .optional(),

    notes: z
        .string()
        .trim()
        .max(2000)
        .optional()

}).strict();

const weeklyReviewHistoryQuerySchema = z.object({

    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(10)

}).strict();


const weeklyReviewParamsSchema = z.object({

    reviewId: z
        .string()
        .refine(
            value => mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid weekly review ID."
            }
        )

});


module.exports = {
    updateWeeklyReviewSchema,weeklyReviewHistoryQuerySchema,weeklyReviewParamsSchema
};