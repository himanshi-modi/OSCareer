const MESSAGES = require("../constants/messages/authMessages");

const validate = (schema, source = "body") => {
    return (req, res, next) => {
        if (!schema) {
            console.error("VALIDATION SCHEMA IS UNDEFINED");
            console.error("Request:", req.method, req.originalUrl);
            console.error("Source:", source);

            return res.status(500).json({
                success: false,
                message: "Validation schema is not configured correctly."
            });
        }
        const data = req[source];

        const result = schema.safeParse(data);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            return res.status(400).json({
                success: false,
                message: MESSAGES.VALIDATION_FAILED,
                errors
            });
        }

        req[source] = result.data;

        next();
    };
};

module.exports = validate;