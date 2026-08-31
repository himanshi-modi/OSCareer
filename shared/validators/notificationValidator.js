const z = require("zod");
const mongoose=require("mongoose");
const getNotificationsQuerySchema = z.object({

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

    isRead: z.coerce
        .boolean()
        .optional(),

    type: z.enum([
        "achievement",
        "roadmap",
        "mission",
        "weekly-review",
        "project",
        "certificate",
        "resume",
        "career",
        "system"
    ]).optional(),

    priority: z.enum([
        "low",
        "medium",
        "high"
    ]).optional(),

    sortBy: z.enum([
        "createdAt",
        "priority"
    ]).default("createdAt"),

    order: z.enum([
        "asc",
        "desc"
    ]).default("desc")

});
const notificationParamsSchema = z.object({

    notificationId: z
        .string()
        .refine(
            value => mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid notification ID."
            }
        )

});
module.exports = {
    getNotificationsQuerySchema,notificationParamsSchema
};