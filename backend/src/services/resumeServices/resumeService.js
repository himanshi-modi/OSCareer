const mongoose = require("mongoose");
const Resume = require("../../models/Resume");
const AppError = require("../../errors/AppError");
const RESUME_MESSAGES = require("../../constants/messages/resumeMessages");
const storageService = require("../../storage/localStorageService");
const ResumeAnalysis = require("../../models/ResumeAnalysis");
const {getStartDate} = require("../../utils/date/getStartDate");
const uploadResume = async (userId, file) => {
    if (!file) {
        throw new AppError(RESUME_MESSAGES.FILE_REQUIRED,400);
    }
    const latestResume = await Resume.findOne({userId,isDeleted: false})
    .sort({
        version: -1
    }).select("version");
    const nextVersion = latestResume? latestResume.version + 1: 1;

    let uploadedFile;
    try {
        uploadedFile = await storageService.uploadFile({
            buffer: file.buffer,
            userId,
            version: nextVersion,
            fileName: file.originalname
        });
    } catch (error) {
        throw new AppError( RESUME_MESSAGES.UPLOAD_FAILED, 500);
    }
const session = await mongoose.startSession();    
    try {

        session.startTransaction();

        await Resume.updateMany(
            {
                userId,
                isCurrent: true,
                isDeleted: false
            },
            {
                $set: {
                    isCurrent: false
                }
            },
            {
                session
            }
        );
        const fileExtension = file.originalname.split(".").pop().toLowerCase();
        const [resume] = await Resume.create(
            [
                {
                    userId,
                    version: nextVersion,
                    resumeTitle: "My Resume",
                    fileName: file.originalname,
                    fileUrl: uploadedFile.fileUrl,
                    fileType: fileExtension,
                    fileSize: file.size,
                    storageKey: uploadedFile.storageKey,
                    isCurrent: true,
                    lastAnalyzedAt: null,
                    isDeleted: false,
                    deletedAt: null
                }
            ],
            {
                session
            }
        );
        await session.commitTransaction();
        return {
            id: resume._id,
            version: resume.version,
            resumeTitle: resume.resumeTitle,
            fileName: resume.fileName,
            fileType: resume.fileType,
            fileSize: resume.fileSize,
            isCurrent: resume.isCurrent,
            uploadedAt: resume.createdAt
        };

    } catch (error) {
        await session.abortTransaction();
        if (uploadedFile?.storageKey) {
            try {
                await storageService.deleteFile(
                    uploadedFile.storageKey
                );
            } catch (cleanupError) {
                console.error("Failed to cleanup uploaded resume file:",cleanupError);
            }
        }
        throw error;
    } finally {
        await session.endSession();
    }
};

const getAllResumes = async (userId) => {
    const resumes = await Resume.find({
    userId,
    isDeleted: false
})
        .sort({
            version: -1
        })
        .select(
            "_id version resumeTitle fileName fileType fileSize isCurrent lastAnalyzedAt createdAt updatedAt"
        )
        .lean();

    return resumes.map((resume) => ({
        id: resume._id,
        version: resume.version,
        resumeTitle: resume.resumeTitle,
        fileName: resume.fileName,
        fileType: resume.fileType,
        fileSize: resume.fileSize,
        isCurrent: resume.isCurrent,
        lastAnalyzedAt: resume.lastAnalyzedAt,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt
    }));
};
const getCurrentResume = async (userId) => {
    const resume = await Resume.findOne({userId,isCurrent: true,isDeleted: false})
    .select(
        "version resumeTitle fileName fileUrl fileType fileSize isCurrent lastAnalyzedAt createdAt updatedAt"
    );

    if (!resume) {
        throw new AppError(RESUME_MESSAGES.CURRENT_RESUME_NOT_FOUND,404);
    }

    return {
        id: resume._id,
        version: resume.version,
        resumeTitle: resume.resumeTitle,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        fileType: resume.fileType,
        fileSize: resume.fileSize,
        isCurrent: resume.isCurrent,
        lastAnalyzedAt: resume.lastAnalyzedAt,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt
    };
};
const getResumeById = async (resumeId, userId) => {
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
        throw new AppError(RESUME_MESSAGES.INVALID_RESUME_ID,400);
    }

    const resume = await Resume.findOne({ _id: resumeId, userId,isDeleted:false})
    .select(
        "version resumeTitle fileName fileUrl fileType fileSize isCurrent lastAnalyzedAt createdAt updatedAt"
    );

    if (!resume) {
        throw new AppError(RESUME_MESSAGES.RESUME_NOT_FOUND,404);
    }

    return {
        id: resume._id,
        version: resume.version,
        resumeTitle: resume.resumeTitle,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        fileType: resume.fileType,
        fileSize: resume.fileSize,
        isCurrent: resume.isCurrent,
        lastAnalyzedAt: resume.lastAnalyzedAt,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt
    };
};

const setCurrentResume = async (userId, resumeId) => {
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
        throw new AppError(
            RESUME_MESSAGES.INVALID_RESUME_ID,
            400
        );
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const resume = await Resume.findOne({_id: resumeId,userId , isDeleted: false}).session(session);
        if (!resume) {
            throw new AppError(RESUME_MESSAGES.RESUME_NOT_FOUND,404);
        }

        if (resume.isCurrent) {
            await session.commitTransaction();

            return {
                id: resume._id,
                version: resume.version,
                resumeTitle: resume.resumeTitle,
                fileName: resume.fileName,
                fileUrl: resume.fileUrl,
                fileType: resume.fileType,
                fileSize: resume.fileSize,
                isCurrent: resume.isCurrent,
                lastAnalyzedAt: resume.lastAnalyzedAt,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt
            };
        }
        await Resume.updateOne(
            {
                userId,
                isCurrent: true,
                isDeleted: false
            },
            {
                $set: {
                    isCurrent: false
                }
            }
        ).session(session);
        resume.isCurrent = true;
        const updatedResume = await resume.save({session});
        await session.commitTransaction();
        return {
            id: updatedResume._id,
            version: updatedResume.version,
            resumeTitle: updatedResume.resumeTitle,
            fileName: updatedResume.fileName,
            fileUrl: updatedResume.fileUrl,
            fileType: updatedResume.fileType,
            fileSize: updatedResume.fileSize,
            isCurrent: updatedResume.isCurrent,
            lastAnalyzedAt: updatedResume.lastAnalyzedAt,
            createdAt: updatedResume.createdAt,
            updatedAt: updatedResume.updatedAt
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

const deleteResume = async (userId, resumeId) => {
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
        throw new AppError(RESUME_MESSAGES.INVALID_RESUME_ID,400);
    }
    const resume = await Resume.findOne({_id: resumeId,userId,isDeleted: false});
    if (!resume) {
        throw new AppError(RESUME_MESSAGES.RESUME_NOT_FOUND,404);
    }
    if (resume.isCurrent) {
        throw new AppError(RESUME_MESSAGES.CANNOT_DELETE_CURRENT_RESUME,409);
    }
    resume.isDeleted = true;
    resume.deletedAt = new Date();
    await resume.save();
    return;
};
const getLatestResume = async (userId) => {
const resume = await Resume.findOne({
userId,
isDeleted: false
})
.sort({ version: -1 })
.select(
"_id version resumeTitle fileName fileUrl fileType fileSize isCurrent lastAnalyzedAt createdAt updatedAt"
)
.lean();


if (!resume) {
    throw new AppError(
        RESUME_MESSAGES.RESUME_NOT_FOUND,
        404
    );
}

return {
    id: resume._id,
    version: resume.version,
    resumeTitle: resume.resumeTitle,
    fileName: resume.fileName,
    fileUrl: resume.fileUrl,
    fileType: resume.fileType,
    fileSize: resume.fileSize,
    isCurrent: resume.isCurrent,
    lastAnalyzedAt: resume.lastAnalyzedAt,
    createdAt: resume.createdAt,
    updatedAt: resume.updatedAt
};


};
const getLatestResumeScore = async (userId) => {
    const latestAnalysis = await ResumeAnalysis.findOne({
        userId,
        status: "COMPLETED"
    })
        .sort({
            analyzedAt: -1,
            analysisVersion: -1
        })
        .select("resumeScore recruiterScore analyzedAt")
        .lean();

    if (!latestAnalysis) {
        return null;
    }

    return {
        resumeScore: latestAnalysis.resumeScore,
        recruiterScore: latestAnalysis.recruiterScore,
        analyzedAt: latestAnalysis.analyzedAt
    };
};

const getRecentActivity = async (userId) => {

    const resumes = await Resume.find({
        userId
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("_id fileName createdAt");

    return resumes.map((resume) => ({
        type: "resume",

        title: "Resume Uploaded",

        description:
            resume.fileName ||
            "New resume uploaded",

        referenceId: resume._id,

        createdAt: resume.createdAt
    }));
};


const getResumeScoreTrend = async (userId, period = "6m") => {

    const startDate = getStartDate(period);
    const analyses = await ResumeAnalysis.find({
        userId,
        analyzedAt: {
            $gte: startDate
        }
    })
        .sort({ analyzedAt: 1 })
        .select("overallScore analyzedAt")
        .lean();

    return analyses.map((analysis) => ({
        date: analysis.analyzedAt,
        score: analysis.overallScore
    }));
};


module.exports = {uploadResume, getAllResumes,getCurrentResume,getResumeById,setCurrentResume,deleteResume,getLatestResume,
    getLatestResumeScore,getRecentActivity,getResumeScoreTrend
};

