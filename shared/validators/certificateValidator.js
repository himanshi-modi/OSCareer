const { z } = require("zod");
const mongoose=require("mongoose");

const createCertificateSchema = z
  .object({
    title: z
      .string({
        required_error: "Certificate title is required.",
      })
      .trim()
      .min(2, "Certificate title must contain at least 2 characters.")
      .max(150, "Certificate title cannot exceed 150 characters."),

    issuer: z
      .string({
        required_error: "Certificate issuer is required.",
      })
      .trim()
      .min(2, "Certificate issuer must contain at least 2 characters.")
      .max(150, "Certificate issuer cannot exceed 150 characters."),

    issueDate: z.coerce.date({
      required_error: "Issue date is required.",
      invalid_type_error: "Issue date must be a valid date.",
    }),

    expiryDate: z
      .coerce
      .date({
        invalid_type_error: "Expiry date must be a valid date.",
      })
      .nullable()
      .optional(),

    credentialId: z
      .string()
      .trim()
      .max(150, "Credential ID cannot exceed 150 characters.")
      .optional()
      .default(""),

    credentialUrl: z
      .string()
      .trim()
      .url("Credential URL must be a valid URL.")
      .optional()
      .default(""),

    certificateFileUrl: z
      .string()
      .trim()
      .url("Certificate file URL must be a valid URL.")
      .optional()
      .default(""),
  })
  .refine(
    (data) =>
      !data.expiryDate || data.expiryDate >= data.issueDate,
    {
      message: "Expiry date cannot be before issue date.",
      path: ["expiryDate"],
    }
  );



const getCertificatesQuerySchema = z.object({
    source: z
        .enum([
            "manual",
            "linkedin",
            "resume",
            "ai"
        ])
        .optional(),

    isVerified: z
        .enum(["true", "false"])
        .transform(value => value === "true")
        .optional(),

    sortBy: z
        .enum([
            "issueDate",
            "createdAt",
            "title"
        ])
        .default("createdAt"),

    sortOrder: z
        .enum([
            "asc",
            "desc"
        ])
        .default("desc")
});

const certificateParamsSchema = z.object({
    certificateId: z
        .string({
            required_error: "Certificate ID is required."
        })
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid certificate ID."
            }
        )
});

const updateCertificateSchema = z.object({

    title: z
        .string()
        .trim()
        .min(2)
        .max(150)
        .optional(),

    issuer: z
        .string()
        .trim()
        .min(2)
        .max(150)
        .optional(),

    issueDate: z
        .coerce
        .date()
        .optional(),

    expiryDate: z
        .coerce
        .date()
        .nullable()
        .optional(),

    credentialId: z
        .string()
        .trim()
        .max(150)
        .optional(),

    credentialUrl: z
        .string()
        .trim()
        .url()
        .optional(),

    certificateFileUrl: z
        .string()
        .trim()
        .url()
        .optional()

})
.strict()
.refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided for update."
    }
);

const addCertificateSkillsSchema = z.object({
    skillIds: z
        .array(
            z.string().refine(
                (value) => mongoose.Types.ObjectId.isValid(value),
                {
                    message: "Invalid skill ID."
                }
            )
        )
        .min(1, "At least one skill is required.")
        .refine(
            (skillIds) => new Set(skillIds).size === skillIds.length,
            {
                message: "Duplicate skill IDs are not allowed."
            }
        )
});

const removeCertificateSkillParamsSchema = z.object({

    certificateId: z
        .string()
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid certificate ID."
            }
        ),

    skillId: z
        .string()
        .refine(
            (value) => mongoose.Types.ObjectId.isValid(value),
            {
                message: "Invalid skill ID."
            }
        )

});
module.exports = {
  createCertificateSchema,getCertificatesQuerySchema,certificateParamsSchema,updateCertificateSchema,addCertificateSkillsSchema,
  removeCertificateSkillParamsSchema
};