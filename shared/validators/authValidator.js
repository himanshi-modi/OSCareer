import {z} from "zod";

const passwordSchema = z.string()
    .min(8, "Password must contain at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*?&])[A-Za-z\d@#$%*?&]{8,64}$/,
        "Password must contain one uppercase letter, one lowercase letter, one number and one special character"
    );
const registerSchema=z.object(
    {
        name:z.string().
        trim()
        .min(1,"Name is required!")
        .max(50, "Name cannot exceed 50 characters")
        .regex(/^[A-Za-z ]+$/, "Name can only contain letters"),

        username:z.string()
        .trim()
        .toLowerCase()
        .min(5,"Username must be atleast 5 characters long")
        .max(15,"Username cannot be  more than 15 characters")
        .regex(/^[a-z0-9][a-z0-9._]*[a-z0-9]$/,"Username can only contain lowercase letters,numbers,dots(.) and underscores(_)"),
        
        email:z.string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address."),
    
        password:passwordSchema,
        confirmPassword:z.string()
        
    }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    }
);
const loginSchema=z.object(
    {
        email:z.string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address."),
   
        password:passwordSchema
    }
);
const forgotPasswordSchema = z.object({
    email:z.string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address."),
});
const resetPasswordSchema=z.object({
    resetToken: z.string().trim().min(1, "Token is required"),
    newPassword:passwordSchema,
    confirmPassword: z.string()
})
.refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    }
);

const changePasswordSchema=z.object({
    oldPassword:passwordSchema,
    newPassword:passwordSchema,
    confirmNewPassword:z.string()
})
.refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"]
    }
);

const updateProfileSchema = z.object({
    name: z.string()
        .trim()
        .min(1)
        .max(50)
        .optional(),

    username: z.string()
        .trim()
        .toLowerCase()
        .min(5)
        .max(15)
        .regex(
            /^[a-z0-9][a-z0-9._]*[a-z0-9]$/,
            "Invalid username"
        )
        .optional(),

    bio: z.string()
        .trim()
        .max(300)
        .optional(),

    phone: z.string()
        .trim()
        .max(20)
        .optional(),

    location: z.string()
        .trim()
        .max(100)
        .optional(),

    profilePicture: z.string()
        .url("Invalid URL")
        .optional()
}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided."
    }
);
const deleteAccountSchema = z.object({
    password: passwordSchema
});


export{registerSchema,loginSchema,forgotPasswordSchema,resetPasswordSchema,changePasswordSchema,updateProfileSchema,deleteAccountSchema};
