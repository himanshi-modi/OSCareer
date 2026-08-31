const z=require("zod");
const publicProfileParamsSchema = z.object({

    userId: z
        .string()
        .refine(
            (value) =>
                mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid user ID."
            }
        )

});
const analyticsQuerySchema = z.object({
    period: z
        .enum(["7d", "30d", "3m", "6m", "1y"])
        .default("6m")
});
module.exports={publicProfileParamsSchema,analyticsQuerySchema};