const z=require("zod");
const createExperienceSchema = z.object({

    companyName: z
        .string()
        .trim()
        .min(1),

    role: z
        .string()
        .trim()
        .min(1),

    employmentType: z.enum([
        "full-time",
        "part-time",
        "internship",
        "contract",
        "freelance"
    ]),

    location: z
        .string()
        .trim()
        .optional(),

    startDate: z.coerce.date(),

    endDate: z.coerce.date().nullable().optional(),

    currentlyWorking: z.boolean(),

    description: z
        .string()
        .trim()
        .optional(),

    skillsUsed: z
        .array(z.string())
        .default([]),

    proofUrl: z
        .string()
        .trim()
        .optional()

});

const getExperiencesQuerySchema = z.object({

    page: z.coerce.number().min(1).default(1),

    limit: z.coerce.number().min(1).max(100).default(10),

    employmentType: z.enum([
        "full-time",
        "part-time",
        "internship",
        "contract",
        "freelance"
    ]).optional(),

    source: z.enum([
        "manual",
        "linkedin",
        "resume",
        "ai"
    ]).optional(),

    currentlyWorking: z.coerce.boolean().optional(),

    sortBy: z.enum([
        "createdAt",
        "startDate",
        "endDate",
        "companyName"
    ]).default("createdAt"),

    order: z.enum([
        "asc",
        "desc"
    ]).default("desc")

});

const experienceParamsSchema = z.object({

    experienceId: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid experience id"
    )

});
const updateExperienceSchema = z.object({

    companyName: z.string().trim().min(1).optional(),

    role: z.string().trim().min(1).optional(),

    employmentType: z.enum([
        "full-time",
        "part-time",
        "internship",
        "contract",
        "freelance"
    ]).optional(),

    location: z.string().trim().optional(),

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().nullable().optional(),

    currentlyWorking: z.boolean().optional(),

    description: z.string().trim().optional(),

    skillsUsed: z.array(z.string()).optional(),

    proofUrl: z.string().trim().optional()

}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field is required."
    }
);
module.exports={createExperienceSchema,getExperiencesQuerySchema,experienceParamsSchema,updateExperienceSchema};