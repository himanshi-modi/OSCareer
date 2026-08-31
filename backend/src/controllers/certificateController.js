const asyncHandler = require("../utils/asyncHandlers");
const certificateService=require("../services/certificateService");
const  CERTIFICATE_MESSAGES  = require("../constants/messages/certificateMessages");
const PROJECT_MESSAGES = require("../constants/messages/projectMessages");
const createCertificate = asyncHandler(async (req, res) => {
    
    const certificate = await certificateService.createCertificate( req.user.id, req.body);
    return res.status(201).json({
        success: true,
        message: CERTIFICATE_MESSAGES.CERTIFICATE_CREATED_SUCCESS,
        data: certificate
    });

});

const getAllCertificates = asyncHandler(async (req, res) => {
    const certificates = await certificateService.getAllCertificates(req.user.id, req.query);

    return res.status(200).json({
        success: true,
        message: CERTIFICATE_MESSAGES.CERTIFICATES_FETCHED_SUCCESS,
        data: certificates
    });
});
const getCertificateById = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;

    const certificate = await certificateService.getCertificateById( req.user.id, certificateId);
    return res.status(200).json({
        success:true,
        message:CERTIFICATE_MESSAGES.CERTIFICATE_FETCHED_SUCCESSFULLY,
        data:certificate
    });
});

const updateCertificate = asyncHandler(async (req, res) => {
    const certificate = await certificateService.updateCertificate( req.user.id, req.params.certificateId, req.body);

    return res.status(200).json({
        success:true,
        message:CERTIFICATE_MESSAGES.CERTIFICATE_UPDATED_SUCCESSFULLY,
        data:certificate
    });
});

const deleteCertificate = asyncHandler(async (req, res) => {
    await certificateService.deleteCertificate( req.user.id, req.params.certificateId);

    return res.status(200).json({
        success:true,
        message: CERTIFICATE_MESSAGES.CERTIFICATE_DELETED_SUCCESSFULLY,
    });
});

const addSkillsToCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;
    const { skillIds } = req.body;

    const certificateSkills =await certificateService.addSkillsToCertificate(
            req.user.id,
            certificateId,
            skillIds
        );
        return res.status(201).json({
        success: true,
        message: PROJECT_MESSAGES.SKILLS_ADDED_SUCCESS,
        data: certificateSkills,
    });
});

const getCertificateSkills = asyncHandler(async (req, res) => {

    const skills = await certificateService.getCertificateSkills(req.user.id,req.params.certificateId);

    return res.status(200).json({
        success: true,
        message:
            skills.length > 0
                ? CERTIFICATE_MESSAGES.CERTIFICATE_SKILLS_FETCHED_SUCCESS
                : CERTIFICATE_MESSAGES.NO_CERTIFICATE_SKILLS_FOUND,
        data: skills
    });

});

const removeSkillFromCertificate = asyncHandler(async (req, res) => {

    await certificateService.removeSkillFromCertificate(req.user.id, req.params.certificateId, req.params.skillId);
    return res.status(200).json({
        success: true,
        message:CERTIFICATE_MESSAGES.SKILL_REMOVED_FROM_CERTIFICATE_SUCCESS
    });

});
const getCertificateAnalysisHistory = asyncHandler(async (req, res) => {

    const analyses = await certificateService.getCertificateAnalysisHistory( req.user.id, req.params.certificateId);

    return res.status(200).json({
        success: true,
        message: CERTIFICATE_MESSAGES.CERTIFICATE_ANALYSIS_HISTORY_FETCHED_SUCCESS,
        data: analyses
    });

});

const getLatestCertificateAnalysis = asyncHandler(async (req, res) => {

    const analysis = await certificateService.getLatestCertificateAnalysis( req.user.id, req.params.certificateId);

    return res.status(200).json({
        success: true,
        message: analysis
            ? CERTIFICATE_MESSAGES.CERTIFICATE_ANALYSIS_FETCHED_SUCCESS
            : CERTIFICATE_MESSAGES.NO_CERTIFICATE_ANALYSIS_FOUND,
        data: analysis,
    });

});
module.exports={createCertificate,getAllCertificates,getCertificateById, updateCertificate,deleteCertificate,addSkillsToCertificate,
    getCertificateSkills,removeSkillFromCertificate,getCertificateAnalysisHistory,getLatestCertificateAnalysis
};