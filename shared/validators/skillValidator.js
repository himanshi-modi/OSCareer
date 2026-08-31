const { z } = require("zod");

const searchMasterSkillsSchema = z.object({
    query: z
        .string({
            required_error: "Search query is required."
        })
        .trim()
        .min(2, "Search query must contain at least 2 characters.")
        .max(50, "Search query cannot exceed 50 characters."),

    category: z
        .enum([
            "frontend",
            "backend",
            "database",
            "devops",
            "mobile",
            "cloud",
            "ai_ml",
            "testing",
            "security",
            "other"
        ])
        .optional(),

    limit: z.coerce
        .number({
            invalid_type_error: "Limit must be a number."
        })
        .int("Limit must be an integer.")
        .min(1, "Limit must be at least 1.")
        .max(50, "Limit cannot exceed 50.")
        .default(10)
});


const createMasterSkillSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Skill name must contain at least 2 characters.")
        .max(100, "Skill name cannot exceed 100 characters."),

    category: z.enum([
        "frontend",
        "backend",
        "database",
        "devops",
        "mobile",
        "cloud",
        "ai_ml",
        "testing",
        "security",
        "other"
    ]),

    subCategory: z
        .string()
        .trim()
        .min(2, "Sub-category must contain at least 2 characters.")
        .max(50, "Sub-category cannot exceed 50 characters."),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters.")
        .optional(),

    difficulty: z
        .enum([
            "beginner",
            "intermediate",
            "advanced"
        ])
        .optional(),

    aliases: z
        .array(
            z
                .string()
                .trim()
                .min(1, "Alias cannot be empty.")
        )
        .optional(),

    isTrending: z
        .boolean()
        .optional()
});

const updateMasterSkillSchema = z
    .object({
        name: z
            .string({
                required_error: "Skill name must be a string."
            })
            .trim()
            .min(2, "Skill name must contain at least 2 characters.")
            .max(100, "Skill name cannot exceed 100 characters.")
            .optional(),

        category: z
            .enum([
                "frontend",
                "backend",
                "database",
                "devops",
                "mobile",
                "cloud",
                "ai_ml",
                "testing",
                "security",
                "other"
            ], {
                errorMap: () => ({
                    message: "Invalid skill category."
                })
            })
            .optional(),

        subCategory: z
            .string({
                required_error: "Sub-category must be a string."
            })
            .trim()
            .min(2, "Sub-category must contain at least 2 characters.")
            .max(100, "Sub-category cannot exceed 100 characters.")
            .optional(),

        description: z
            .string({
                required_error: "Description must be a string."
            })
            .trim()
            .max(500, "Description cannot exceed 500 characters.")
            .optional(),

        difficulty: z
            .enum([
                "beginner",
                "intermediate",
                "advanced"
            ], {
                errorMap: () => ({
                    message: "Invalid skill difficulty."
                })
            })
            .optional(),

        aliases: z
            .array(
                z
                    .string({
                        required_error: "Each alias must be a string."
                    })
                    .trim()
                    .min(1, "Alias cannot be empty.")
                    .max(100, "Alias cannot exceed 100 characters.")
            )
            .optional(),

        isTrending: z
            .boolean({
                required_error: "isTrending must be a boolean."
            })
            .optional(),

        isActive: z
            .boolean({
                required_error: "isActive must be a boolean."
            })
            .optional()
    })
    .refine(
        data => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided for update."
        }
    );



const createUserSkillSchema = z.object({
    skillId: z
        .string({
            required_error: "Skill ID is required."
        })
        .trim()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid skill ID."
        ),

    proficiency: z
        .number({
            required_error: "Proficiency is required.",
            invalid_type_error: "Proficiency must be a number."
        })
        .min(0, "Proficiency cannot be less than 0.")
        .max(100, "Proficiency cannot exceed 100."),

    source: z.enum(
        [
            "resume",
            "assessment",
            "manual",
            "github",
            "linkedin",
            "ai"
        ],
        {
            required_error: "Skill source is required.",
            invalid_type_error: "Invalid skill source."
        }
    )
});


const updateUserSkillSchema = z
    .object({
        proficiency: z
            .number()
            .min(0, "Proficiency cannot be less than 0.")
            .max(100, "Proficiency cannot exceed 100.")
            .optional(),

        lastUsed: z
            .string()
            .datetime("Invalid last used date.")
            .optional()
    })
    .refine(
        (data) =>
            data.proficiency !== undefined ||
            data.lastUsed !== undefined,
        {
            message: "At least one field must be provided."
        }
    );


module.exports={searchMasterSkillsSchema,createMasterSkillSchema,updateMasterSkillSchema,createUserSkillSchema,updateUserSkillSchema};