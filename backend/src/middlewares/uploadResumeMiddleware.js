const multer = require("multer");
const AppError = require("../errors/AppError");
const storage = multer.memoryStorage();
const RESUME_MESSAGES=require("../constants/messages/resumeMessages");
const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const fileFilter = (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
           new AppError(RESUME_MESSAGES.ONLY_SUPPORTS_FILE,400)
        );
    }

    cb(null, true);
};

const uploadResume = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = uploadResume;
