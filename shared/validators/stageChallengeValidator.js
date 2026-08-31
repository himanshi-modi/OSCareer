const { z } = require("zod");
const submitStageChallengeSchema = z
    .object({
        githubUrl: z
            .string()
            .trim()
            .url("GitHub repository URL must be a valid URL.")
            .regex(
                /^https?:\/\/(www\.)?github\.com\/.+/i,
                "Please provide a valid GitHub repository URL."
            )
            .optional()
            .or(z.literal("")),

        liveUrl: z
            .string()
            .trim()
            .url("Live project URL must be a valid URL.")
            .optional()
            .or(z.literal("")),

        submissionDescription: z
            .string({
                required_error: "Submission description is required."
            })
            .trim()
            .min(
                20,
                "Submission description must contain at least 20 characters."
            )
            .max(
                2000,
                "Submission description cannot exceed 2000 characters."
            )
    })
    .refine(
        (data) => data.githubUrl || data.liveUrl,
        {
            message:
                "Please provide at least a GitHub URL or live project URL.",
            path: ["githubUrl"]
        }
    );
module.exports={submitStageChallengeSchema}