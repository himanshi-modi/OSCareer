const asyncHandler = require("../utils/asyncHandlers");
const resumeService = require("../services/resumeServices/resumeService");
const resumeAnalysisService = require("../services/resumeServices/resumeAnalysisService");
const RESUME_MESSAGES = require("../constants/messages/resumeMessages");

const uploadResume = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const file = req.file;
    const resume = await resumeService.uploadResume(userId,file);
    return res.status(201).json({
        success: true,
        message: RESUME_MESSAGES.UPLOAD_SUCCESS,
        data: resume
    });
});

const getAllResumes = asyncHandler(async (req, res) => {

    const resumes = await resumeService.getAllResumes(req.user.id);
    return res.status(200).json({
        success: true,
        message: RESUME_MESSAGES.RESUMES_FETCHED_SUCCESS,
        data: resumes
    });
});

const getCurrentResume = asyncHandler(async (req, res) => {
    const resume = await resumeService.getCurrentResume(req.user.id);
    return res.status(200).json({
        success: true,
        message: RESUME_MESSAGES.CURRENT_RESUME_FETCHED_SUCCESS,
        data: resume
    });
});
const getResumeById = asyncHandler(async (req, res) => {
    const { resumeId } = req.params;
    const userId = req.user.id;
    const resume = await resumeService.getResumeById(resumeId,userId);
    return res.status(200).json({
        success: true,
        message: RESUME_MESSAGES.RESUME_FETCHED_SUCCESS,
        data: resume
    });
});

const setCurrentResume = asyncHandler(async (req, res) => {
    const { resumeId } = req.params;
    const userId = req.user.id;
    const resume = await resumeService.setCurrentResume(userId,resumeId);

    return res.status(200).json({
        success: true,
        message: RESUME_MESSAGES.RESUME_SET_CURRENT_SUCCESS,
        data: resume
    });
});

const deleteResume = asyncHandler(async (req, res) => {
    const { resumeId } = req.params;
    const userId = req.user.id;

    await resumeService.deleteResume(userId,resumeId);
    return res.status(200).json({
        success: true,
        message: RESUME_MESSAGES.RESUME_DELETED_SUCCESS
    });
});


const startResumeAnalysis = asyncHandler(
    async (req, res) => {
        const { resumeId } = req.params;
        const userId = req.user.id;
        const analysis =await resumeAnalysisService.startResumeAnalysis(userId,resumeId);
        return res.status(202).json({
            success: true,
            message:RESUME_MESSAGES.ANALYSIS_STARTED_SUCCESS,
            data: analysis
        });
    }
);

const getLatestResumeAnalysis = asyncHandler(async (req, res) => {
        const { resumeId } = req.params;
        const userId = req.user.id;
        const analysis =await resumeAnalysisService.getLatestResumeAnalysis(
                userId,
                resumeId
            );
        return res.status(200).json({
            success: true,
            message: RESUME_MESSAGES.ANALYSIS_FETCHED_SUCCESS,
            data: analysis
        });
    }
);

const getAnalysisHistory = asyncHandler(async (req, res) => {
        const { resumeId } = req.params;
        const userId = req.user.id;
        const analysisHistory =await resumeAnalysisService.getAnalysisHistory(userId,resumeId);
        return res.status(200).json({
            success: true,
            message: RESUME_MESSAGES.ANALYSIS_HISTORY_FETCHED_SUCCESS,
            data: analysisHistory
        });
    }
);

const getSpecificResumeAnalysis = asyncHandler(async (req, res) => {
        const { resumeId, analysisId } = req.params;
        const userId = req.user.id;
        const analysis =await resumeAnalysisService.getSpecificResumeAnalysis(userId,resumeId,analysisId);
        return res.status(200).json({
            success: true,
            message: RESUME_MESSAGES.ANALYSIS_FETCHED_SUCCESS,
            data: analysis
        });
    }
);

const getAllResumeAnalyses = asyncHandler(async (req, res) => {
        const { resumeId } = req.params;
        const userId = req.user.id;
        const analyses =
            await resumeAnalysisService.getAllResumeAnalyses(userId,resumeId);
            return res.status(200).json({
            success: true,
            message: RESUME_MESSAGES.ANALYSES_FETCHED_SUCCESS,
            data: analyses
        });
    }
);
const deleteResumeAnalysis = asyncHandler(
    async (req, res) => {
        const { resumeId, analysisId } = req.params;
        const userId = req.user.id;
        const result =await resumeAnalysisService.deleteResumeAnalysis(userId,resumeId,analysisId);
        return res.status(200).json({
            success: true,
            message: RESUME_MESSAGES.ANALYSIS_DELETED_SUCCESS,
            data: result
        });
    }
);
module.exports = { uploadResume,getAllResumes,getCurrentResume,getResumeById,setCurrentResume,deleteResume,startResumeAnalysis
    ,getLatestResumeAnalysis,getAnalysisHistory,getSpecificResumeAnalysis,getAllResumeAnalyses,deleteResumeAnalysis};

