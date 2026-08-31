const { z } = require("zod");



const createCareerProfileSchema = z.object({
    targetCareer: z.string()
        .trim()
        .min(3)
        .max(100),

    currentGoal: z.string()
        .trim()
        .min(5)
        .max(150),

    careerPriority: z.enum([
        "JOB",
        "INTERNSHIP",
        "FREELANCING",
        "HIGHER_STUDIES",
        "CAREER_SWITCH"
    ]),

    internshipPreference: z.enum([
        "REMOTE",
        "ONSITE",
        "HYBRID",
        "NO_PREFERENCE"
    ]),

    targetTimeline: z.enum([
        "1_MONTH",
        "3_MONTHS",
        "6_MONTHS",
        "12_MONTHS",
        "NO_TIMELINE",
        "CUSTOM"
    ]),

    customTimelineMonths: z.number()
        .int()
        .min(1)
        .max(120)
        .nullable()
        .optional(),

    dailyCommitment: z.number()
        .min(1)
        .max(12),

    educationLevel: z.enum([
        "HIGH_SCHOOL",
        "DIPLOMA",
        "BACHELORS",
        "MASTERS",
        "PHD"
    ]),

    currentYear: z.number()
        .int()
        .min(1)
        .max(6)
        .optional(),

    experienceLevel: z.enum([
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED"
    ])
})
.superRefine((data, ctx) => {

    if (
        data.targetTimeline === "CUSTOM" &&
        !data.customTimelineMonths
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["customTimelineMonths"],
            message: "Custom timeline months are required."
        });
    }

    if (
        data.targetTimeline !== "CUSTOM" &&
        data.customTimelineMonths !== null &&
        data.customTimelineMonths !== undefined
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["customTimelineMonths"],
            message: "Custom timeline months are only allowed for a custom timeline."
        });
    }
});


const updateCareerProfileSchema = z.object({
    currentGoal: z
        .string()
        .trim()
        .min(5, "Current goal must be at least 5 characters.")
        .max(150, "Current goal cannot exceed 150 characters.")
        .optional(),

    dailyCommitment: z
        .number({
            invalid_type_error: "Daily commitment must be a number."
        })
        .int("Daily commitment must be an integer.")
        .min(1, "Daily commitment must be at least 1 hour.")
        .max(12, "Daily commitment cannot exceed 12 hours.")
        .optional(),

    targetTimeline: z.enum([
        "1_MONTH",
        "3_MONTHS",
        "6_MONTHS",
        "12_MONTHS",
        "NO_TIMELINE",
        "CUSTOM"
    ]).optional(),

    customTimelineMonths: z
        .number({
            invalid_type_error: "Custom timeline must be a number."
        })
        .int("Custom timeline must be an integer.")
        .min(1)
        .max(120)
        .nullable()
        .optional(),

    internshipPreference: z.enum([
        "REMOTE",
        "ONSITE",
        "HYBRID",
        "NO_PREFERENCE"
    ]).optional(),

    educationLevel: z.enum([
        "HIGH_SCHOOL",
        "DIPLOMA",
        "BACHELORS",
        "MASTERS",
        "PHD"
    ]).optional(),

    currentYear: z
        .number({
            invalid_type_error: "Current year must be a number."
        })
        .int("Current year must be an integer.")
        .min(1)
        .max(8)
        .optional(),

    experienceLevel: z.enum([
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED"
    ]).optional(),

    careerPriority: z.enum([
        "JOB",
        "INTERNSHIP",
        "FREELANCING",
        "HIGHER_STUDIES",
        "CAREER_SWITCH"
    ]).optional()
})
.passthrough()
.refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided for update."
    }
);






module.exports = {
    createCareerProfileSchema,updateCareerProfileSchema
};