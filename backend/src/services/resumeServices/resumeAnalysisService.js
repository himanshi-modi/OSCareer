
const mongoose = require("mongoose");

const Resume = require("../../models/Resume");
const ResumeAnalysis = require("../../models/ResumeAnalysis");
const AppError = require("../../errors/AppError");
const RESUME_MESSAGES = require("../../constants/messages/resumeMessages");
const {
    syncResumeSkillsToUser
} = require("../userSkillSyncService");
const {
    analyzeResumeText
} = require("../ai/resumeAnalysisAIService");

const {
    extractResumeText
} = require("./resumeTextExtractionService");


const startResumeAnalysis = async (userId, resumeId) => {

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
        throw new AppError(
            RESUME_MESSAGES.INVALID_RESUME_ID,
            400
        );
    }

    const resume = await Resume.findOne({
        _id: resumeId,
        userId,
        isDeleted: false
    }).select("_id storageKey");


    if (!resume) {
        throw new AppError(
            RESUME_MESSAGES.RESUME_NOT_FOUND,
            404
        );
    }


    const activeAnalysis = await ResumeAnalysis.findOne({
        resumeId,
        userId,
        isDeleted: false,
        analysisStatus: {
            $in: ["pending", "processing"]
        }
    }).select("_id");


    if (activeAnalysis) {
        throw new AppError(
            RESUME_MESSAGES.ANALYSIS_ALREADY_IN_PROGRESS,
            409
        );
    }


    const latestAnalysis = await ResumeAnalysis.findOne({
        resumeId,
        userId
    })
        .sort({
            analysisVersion: -1
        })
        .select("analysisVersion");


    const nextAnalysisVersion = latestAnalysis
        ? latestAnalysis.analysisVersion + 1
        : 1;


    const analysis = await ResumeAnalysis.create({
        resumeId,
        userId,
        analysisVersion: nextAnalysisVersion,
        analysisStatus: "pending"
    });


    processResumeAnalysis(
        analysis._id,
        userId,
        resumeId,
        resume.storageKey
    ).catch((error) => {

        console.error(
            "Background resume analysis failed:",
            error
        );

    });


    return {
        analysisId: analysis._id,
        resumeId: analysis.resumeId,
        analysisVersion: analysis.analysisVersion,
        analysisStatus: analysis.analysisStatus
    };
};



const processResumeAnalysis = async (
    analysisId,
    userId,
    resumeId,
    storageKey
) => {

    try {

        // --------------------------------
        // STEP 1: Mark as processing
        // --------------------------------

        await ResumeAnalysis.findByIdAndUpdate(
            analysisId,
            {
                $set: {
                    analysisStatus: "processing"
                }
            }
        );


        // --------------------------------
        // STEP 2: Extract resume data
        // --------------------------------

        console.log(
            "Extracting resume text..."
        );


        const resumeData =
            await extractResumeText(storageKey);


        const resumeText =
            resumeData.text;


        const hyperlinks =
            resumeData.hyperlinks || [];


        if (!resumeText || !resumeText.trim()) {

            throw new Error(
                "No text could be extracted from the resume."
            );

        }


        console.log(
            "\n========== EXTRACTED HYPERLINKS ==========\n"
        );

        console.log(hyperlinks);


        console.log(
            "\n========== TEXT LENGTH ==========\n"
        );

        console.log(
            resumeText.length
        );


        console.log(
            "\nResume text extracted successfully."
        );


        // --------------------------------
        // STEP 3: Send text to Gemini
        // --------------------------------

        console.log(
            "\nSending resume to Gemini..."
        );


        const aiResult =
            await analyzeResumeText(resumeText);


        console.log(
            "\nGemini analysis completed."
        );
        const skillSyncResult =
    await syncResumeSkillsToUser(
        userId,
        aiResult.extractedSkills || []
    );

console.log(
    "\n========== USER SKILLS SYNC =========="
);

console.log(skillSyncResult);


        // --------------------------------
        // STEP 4: Save AI result
        // --------------------------------

        await ResumeAnalysis.findByIdAndUpdate(
            analysisId,
            {
                $set: {

                    extractedText:
                        resumeText,

                    extractedSkills:
                        aiResult.extractedSkills || [],

                    extractedProjects:
                        aiResult.extractedProjects || [],

                    extractedExperience:
                        aiResult.extractedExperience || [],

                    extractedEducation:
                        aiResult.extractedEducation || [],

                    extractedCertificates:
                        aiResult.extractedCertificates || [],

                    resumeScore:
                        aiResult.resumeScore,

                    recruiterScore:
                        aiResult.recruiterScore,

                    atsScore:
                        aiResult.atsScore,

                    summary:
                        aiResult.summary,

                    strengths:
                        aiResult.strengths || [],

                    weaknesses:
                        aiResult.weaknesses || [],

                    missingSkills:
                        aiResult.missingSkills || [],

                    improvementAreas:
                        aiResult.improvementAreas || [],

                    aiSuggestions:
                        aiResult.aiSuggestions || [],

                    aiInsights:
                        aiResult.aiInsights,

                    analysisStatus:
                        "completed",

                    analyzedAt:
                        new Date(),

                    errorMessage:
                        null
                }
            }
        );


        // --------------------------------
        // STEP 5: Update Resume
        // --------------------------------

        await Resume.findByIdAndUpdate(
            resumeId,
            {
                $set: {
                    lastAnalyzedAt: new Date()
                }
            }
        );


        console.log(
            "\nResume analysis saved successfully."
        );

    } catch (error) {

        console.error(
            "\nResume analysis processing failed:",
            error
        );


        // --------------------------------
        // Mark analysis as failed
        // --------------------------------

        await ResumeAnalysis.findByIdAndUpdate(
            analysisId,
            {
                $set: {

                    analysisStatus:
                        "failed",

                    errorMessage:
                        error.message ||
                        "Resume analysis failed."
                }
            }
        );
    }
};



const getLatestResumeAnalysis = async (
    userId,
    resumeId
) => {

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {

        throw new AppError(
            RESUME_MESSAGES.INVALID_RESUME_ID,
            400
        );

    }


    const resume = await Resume.findOne({
        _id: resumeId,
        userId,
        isDeleted: false
    }).select("_id");


    if (!resume) {

        throw new AppError(
            RESUME_MESSAGES.RESUME_NOT_FOUND,
            404
        );

    }


    const analysis =
        await ResumeAnalysis.findOne({
            resumeId,
            userId,
            isDeleted: false
        })
        .sort({
            analysisVersion: -1
        })
        .select("-extractedText");


    if (!analysis) {

        throw new AppError(
            RESUME_MESSAGES.ANALYSIS_NOT_FOUND,
            404
        );

    }


    return {

        analysis: {

            id:
                analysis._id,

            resumeId:
                analysis.resumeId,

            version:
                analysis.analysisVersion,

            status:
                analysis.analysisStatus,

            analyzedAt:
                analysis.analyzedAt,

            createdAt:
                analysis.createdAt,

            updatedAt:
                analysis.updatedAt
        },


        scores: {

            resumeScore:
                analysis.resumeScore,

            recruiterScore:
                analysis.recruiterScore,

            atsScore:
                analysis.atsScore
        },


        extractedData: {

            skills:
                analysis.extractedSkills,

            projects:
                analysis.extractedProjects,

            experience:
                analysis.extractedExperience,

            education:
                analysis.extractedEducation,

            certificates:
                analysis.extractedCertificates
        },


        feedback: {

            strengths:
                analysis.strengths,

            weaknesses:
                analysis.weaknesses,

            missingSkills:
                analysis.missingSkills,

            improvementAreas:
                analysis.improvementAreas,

            suggestions:
                analysis.aiSuggestions
        },


        summary:
            analysis.summary,

        aiInsights:
            analysis.aiInsights,

        errorMessage:
            analysis.errorMessage
    };
};



const getAnalysisHistory = async (
    userId,
    resumeId
) => {

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {

        throw new AppError(
            RESUME_MESSAGES.INVALID_RESUME_ID,
            400
        );

    }


    const resume =
        await Resume.findOne({
            _id: resumeId,
            userId,
            isDeleted: false
        }).select("_id");


    if (!resume) {

        throw new AppError(
            RESUME_MESSAGES.RESUME_NOT_FOUND,
            404
        );

    }


    const analyses =
        await ResumeAnalysis.find({
            resumeId,
            userId,
            isDeleted: false
        })
        .sort({
            analysisVersion: -1
        })
        .select(
            "_id analysisVersion resumeScore recruiterScore atsScore analysisStatus analyzedAt errorMessage"
        );


    const analysisHistory =
        analyses.map((analysis) => ({

            analysisId:
                analysis._id,

            analysisVersion:
                analysis.analysisVersion,

            resumeScore:
                analysis.resumeScore,

            recruiterScore:
                analysis.recruiterScore,

            atsScore:
                analysis.atsScore,

            analysisStatus:
                analysis.analysisStatus,

            analyzedAt:
                analysis.analyzedAt,

            ...(analysis.analysisStatus === "failed" && {
                errorMessage:
                    analysis.errorMessage
            })

        }));


    return {

        resumeId,

        totalAnalyses:
            analyses.length,

        analyses:
            analysisHistory

    };
};



const getSpecificResumeAnalysis = async (
    userId,
    resumeId,
    analysisId
) => {

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {

        throw new AppError(
            RESUME_MESSAGES.INVALID_RESUME_ID,
            400
        );

    }


    if (!mongoose.Types.ObjectId.isValid(analysisId)) {

        throw new AppError(
            RESUME_MESSAGES.INVALID_ANALYSIS_ID,
            400
        );

    }


    const resume =
        await Resume.findOne({
            _id: resumeId,
            userId,
            isDeleted: false
        });


    if (!resume) {

        throw new AppError(
            RESUME_MESSAGES.RESUME_NOT_FOUND,
            404
        );

    }


    const analysis =
        await ResumeAnalysis.findOne({
            _id: analysisId,
            resumeId,
            userId,
            isDeleted: false
        });


    if (!analysis) {

        throw new AppError(
            RESUME_MESSAGES.RESUME_ANALYSIS_NOT_FOUND,
            404
        );

    }


    return {

        analysis: {

            id:
                analysis._id,

            resumeId:
                analysis.resumeId,

            version:
                analysis.analysisVersion,

            status:
                analysis.analysisStatus,

            analyzedAt:
                analysis.analyzedAt,

            createdAt:
                analysis.createdAt,

            updatedAt:
                analysis.updatedAt
        },


        scores: {

            resumeScore:
                analysis.resumeScore,

            recruiterScore:
                analysis.recruiterScore,

            atsScore:
                analysis.atsScore
        },


        extractedData: {

            skills:
                analysis.extractedSkills,

            projects:
                analysis.extractedProjects,

            experience:
                analysis.extractedExperience,

            education:
                analysis.extractedEducation,

            certificates:
                analysis.extractedCertificates
        },


        feedback: {

            summary:
                analysis.summary,

            strengths:
                analysis.strengths,

            weaknesses:
                analysis.weaknesses,

            missingSkills:
                analysis.missingSkills,

            improvementAreas:
                analysis.improvementAreas,

            suggestions:
                analysis.aiSuggestions
        },


        aiInsights:
            analysis.aiInsights,


        ...(analysis.analysisStatus === "failed" && {

            errorMessage:
                analysis.errorMessage

        })

    };
};



const getAllResumeAnalyses = async (
    userId,
    resumeId
) => {

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {

        throw new AppError(
            RESUME_MESSAGES.INVALID_RESUME_ID,
            400
        );

    }


    const resume =
        await Resume.findOne({
            _id: resumeId,
            userId,
            isDeleted: false
        });


    if (!resume) {

        throw new AppError(
            RESUME_MESSAGES.RESUME_NOT_FOUND,
            404
        );

    }


    const analyses =
        await ResumeAnalysis.find({
            resumeId,
            userId,
            isDeleted: false
        })
        .sort({
            analysisVersion: -1
        })
        .select(
            "_id resumeId analysisVersion resumeScore recruiterScore atsScore analysisStatus analyzedAt createdAt updatedAt errorMessage"
        );


    const analysisHistory =
        analyses.map((analysis) => ({

            analysisId:
                analysis._id,

            resumeId:
                analysis.resumeId,

            analysisVersion:
                analysis.analysisVersion,

            resumeScore:
                analysis.resumeScore,

            recruiterScore:
                analysis.recruiterScore,

            atsScore:
                analysis.atsScore,

            analysisStatus:
                analysis.analysisStatus,

            analyzedAt:
                analysis.analyzedAt,

            createdAt:
                analysis.createdAt,

            updatedAt:
                analysis.updatedAt,

            ...(analysis.analysisStatus === "failed" && {

                errorMessage:
                    analysis.errorMessage

            })

        }));


    return {

        resumeId,

        totalAnalyses:
            analysisHistory.length,

        analyses:
            analysisHistory

    };
};



const deleteResumeAnalysis = async (
    userId,
    resumeId,
    analysisId
) => {

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {

        throw new AppError(
            RESUME_MESSAGES.INVALID_RESUME_ID,
            400
        );

    }


    if (!mongoose.Types.ObjectId.isValid(analysisId)) {

        throw new AppError(
            RESUME_MESSAGES.INVALID_ANALYSIS_ID,
            400
        );

    }


    const resume =
        await Resume.findOne({
            _id: resumeId,
            userId,
            isDeleted: false
        });


    if (!resume) {

        throw new AppError(
            RESUME_MESSAGES.RESUME_NOT_FOUND,
            404
        );

    }


    const analysis =
        await ResumeAnalysis.findOne({
            _id: analysisId,
            resumeId,
            userId,
            isDeleted: false
        });


    if (!analysis) {

        throw new AppError(
            RESUME_MESSAGES.ANALYSIS_NOT_FOUND,
            404
        );

    }


    analysis.isDeleted = true;

    analysis.deletedAt = new Date();

    await analysis.save();


    return {

        analysisId:
            analysis._id,

        resumeId:
            analysis.resumeId,

        analysisVersion:
            analysis.analysisVersion,

        isDeleted:
            analysis.isDeleted,

        deletedAt:
            analysis.deletedAt

    };
};



module.exports = {

    startResumeAnalysis,

    getLatestResumeAnalysis,

    getAnalysisHistory,

    getSpecificResumeAnalysis,

    deleteResumeAnalysis,

    getAllResumeAnalyses

};
