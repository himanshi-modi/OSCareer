const { z } = require("zod");
const mongoose=require("mongoose");
const createProjectSchema = z
  .object({
    title: z
      .string({
        required_error: "Project title is required.",
      })
      .trim()
      .min(2, "Project title must contain at least 2 characters.")
      .max(100, "Project title cannot exceed 100 characters."),

    description: z
      .string({
        required_error: "Project description is required.",
      })
      .trim()
      .min(10, "Project description must contain at least 10 characters.")
      .max(2000, "Project description cannot exceed 2000 characters."),

    category: z
      .string({
        required_error: "Project category is required.",
      })
      .trim()
      .min(2, "Project category must contain at least 2 characters.")
      .max(100, "Project category cannot exceed 100 characters."),

    featured: z
      .boolean()
      .optional()
      .default(false),

    githubUrl: z
      .string()
      .url("Please provide a valid GitHub URL.")
      .optional()
      .or(z.literal("")),

    liveDemoUrl: z
      .string()
      .url("Please provide a valid live demo URL.")
      .optional()
      .or(z.literal("")),

    thumbnailUrl: z
      .string()
      .url("Please provide a valid thumbnail URL.")
      .optional()
      .or(z.literal("")),

    status: z
      .enum([
        "planned",
        "in-progress",
        "completed",
        "archived",
      ])
      .optional()
      .default("planned"),

    source: z
      .enum([
        "user",
        "roadmap",
        "ai",
        "course",
      ])
      .optional()
      .default("user"),

    completionDate: z
      .string()
      .datetime()
      .nullable()
      .optional()
      .default(null),

    deploymentStatus: z
      .enum([
        "not-deployed",
        "live",
        "offline",
      ])
      .optional()
      .default("not-deployed"),
  })
  .superRefine((data, ctx) => {
    if (
      data.status === "completed" &&
      !data.completionDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["completionDate"],
        message:
          "Completion date is required when project status is completed.",
      });
    }

    if (
      data.status !== "completed" &&
      data.completionDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["completionDate"],
        message:
          "Completion date can only be provided for completed projects.",
      });
    }
  });

const getProjectsSchema = z.object({
    page: z
        .coerce
        .number()
        .int("Page must be an integer.")
        .min(1, "Page must be at least 1.")
        .default(1),

    limit: z
        .coerce
        .number()
        .int("Limit must be an integer.")
        .min(1, "Limit must be at least 1.")
        .max(50, "Limit cannot exceed 50.")
        .default(10),

    status: z
        .enum([
            "planned",
            "in-progress",
            "completed",
            "archived"
        ])
        .optional(),

    category: z
        .string()
        .trim()
        .min(2, "Category must contain at least 2 characters.")
        .max(100, "Category cannot exceed 100 characters.")
        .optional(),

    source: z
        .enum([
            "user",
            "roadmap",
            "ai",
            "course"
        ])
        .optional(),

    deploymentStatus: z
        .enum([
            "not-deployed",
            "live",
            "offline"
        ])
        .optional(),

    featured: z
        .enum(["true", "false"])
        .optional()
});
const projectIdSchema = z.object({
    projectId: z
        .string()
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid project ID."
            }
        )
});

const updateProjectSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(2, "Project title must contain at least 2 characters.")
            .max(100, "Project title cannot exceed 100 characters.")
            .optional(),

        description: z
            .string()
            .trim()
            .min(10, "Project description must contain at least 10 characters.")
            .max(2000, "Project description cannot exceed 2000 characters.")
            .optional(),

        category: z
            .string()
            .trim()
            .min(2, "Project category must contain at least 2 characters.")
            .max(100, "Project category cannot exceed 100 characters.")
            .optional(),

        featured: z
            .boolean()
            .optional(),

        githubUrl: z
            .string()
            .url("Please provide a valid GitHub URL.")
            .or(z.literal(""))
            .optional(),

        liveDemoUrl: z
            .string()
            .url("Please provide a valid live demo URL.")
            .or(z.literal(""))
            .optional(),

        thumbnailUrl: z
            .string()
            .url("Please provide a valid thumbnail URL.")
            .or(z.literal(""))
            .optional(),

        status: z
            .enum([
                "planned",
                "in-progress",
                "completed",
                "archived"
            ])
            .optional(),

        source: z
            .enum([
                "user",
                "roadmap",
                "ai",
                "course"
            ])
            .optional(),

        completionDate: z
            .string()
            .datetime()
            .nullable()
            .optional(),

        deploymentStatus: z
            .enum([
                "not-deployed",
                "live",
                "offline"
            ])
            .optional()
    })
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required to update the project."
        }
    );



const addProjectSkillSchema = z
    .object({
        skillId: z
            .string({
                required_error: "Skill ID is required."
            })
            .refine(
                (value) => mongoose.Types.ObjectId.isValid(value),
                {
                    message: "Invalid skill ID."
                }
            ),

        confidenceScore: z
            .number({
                invalid_type_error: "Confidence score must be a number."
            })
            .min(0, "Confidence score cannot be less than 0.")
            .max(100, "Confidence score cannot exceed 100.")
            .optional()
    })
    .strict();

const projectSkillParamsSchema = z.object({
    projectId: z
        .string({
            required_error: "Project ID is required."
        })
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            "Invalid project ID."
        ),

    skillId: z
        .string({
            required_error: "Skill ID is required."
        })
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            "Invalid skill ID."
        )
});
const projectReviewParamsSchema = z.object({
    projectId: z
        .string({
            required_error: "Project ID is required."
        })
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            "Invalid project ID."
        ),

    reviewId: z
        .string({
            required_error: "Review ID is required."
        })
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            "Invalid review ID."
        )
});
module.exports = {
  createProjectSchema,getProjectsSchema,projectIdSchema,updateProjectSchema,addProjectSkillSchema,projectSkillParamsSchema
  ,projectReviewParamsSchema
};
