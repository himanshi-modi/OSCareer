const SKILL_MESSAGES=require("../constants/messages/skillMessages");
const asyncHandler = require("../utils/asyncHandlers");
const skillsService=require("../services/skillsService");

const searchMasterSkills = asyncHandler(async (req, res) => {
    const { query, category, limit } = req.query;
    const data = await skillsService.searchMasterSkills({query,category,limit});

    return res.status(200).json({
        success: true,
        message: data.skills.length > 0
            ? SKILL_MESSAGES.SKILL_FETCHED_SUCCESSFULLY
            : SKILL_MESSAGES.NO_SKILLS_FOUND,
        data
    });
});

const getMasterSkillById = asyncHandler(async (req, res) => {
    const { skillId } = req.params;
    const skill = await skillsService.getMasterSkillById(skillId);

    return res.status(200).json({
        success: true,
        message: SKILL_MESSAGES.SKILL_FETCHED_SUCCESSFULLY,
        data: skill
    });
});

const createMasterSkill = asyncHandler(async (req, res) => {
    const skill = await skillsService.createMasterSkill(req.body);
    return res.status(201).json({
        success: true,
        message: SKILL_MESSAGES.SKILL_CREATED_SUCCESSFULLY,
        data: skill
    });
});

const updateMasterSkill = asyncHandler(async (req, res) => {
    const { skillId } = req.params;
    const updatedSkill = await skillsService.updateMasterSkill(skillId,req.body);
    return res.status(200).json({
        success: true,
        message: SKILL_MESSAGES.SKILL_UPDATED_SUCCESSFULLY,
        data: updatedSkill
    });
});

const deleteMasterSkill = asyncHandler(async (req, res) => {
    const { skillId } = req.params;
    const skill = await skillsService.deleteMasterSkill(skillId);

    return res.status(200).json({
        success: true,
        message: SKILL_MESSAGES.SKILL_DELETED,
        data: skill
    });
});

const getMySkills = asyncHandler(async (req, res) => {
    const result = await skillsService.getMySkills(req.user.id);
    return res.status(200).json({
        success: true,
        message: SKILL_MESSAGES.USER_SKILLS_FETCHED,
        data: result
    });
});

const getMySkillById = asyncHandler(async (req, res) => {
    const userSkill = await skillsService.getMySkillById(req.user.id,req.params.skillId);
    return res.status(200).json({
        success: true,
        message: SKILL_MESSAGES.USER_SKILL_FETCHED,
        data: userSkill
    });
});

const addUserSkill = asyncHandler(async (req, res) => {
    const userSkill = await skillsService.addUserSkill(req.user.id,req.body);
    return res.status(201).json({
        success: true,
        message: SKILL_MESSAGES.USER_SKILL_ADDED,
        data: userSkill
    });
});

const updateUserSkill = asyncHandler(async (req, res) => {
    const result = await skillsService.updateUserSkill(req.params.skillId,req.user.id,req.body);
    return res.status(200).json({
        success: true,
        message: SKILL_MESSAGES.USER_SKILL_UPDATED,
        data: result
    });
});

const deleteUserSkill = asyncHandler(async (req, res) => {

    const result = await skillsService.deleteUserSkill(req.params.skillId,req.user.id);
    return res.status(200).json({
        success: true,
        message: SKILL_MESSAGES.USER_SKILL_DELETED,
        data: result
    });
});

module.exports={searchMasterSkills,getMasterSkillById,createMasterSkill,updateMasterSkill,deleteMasterSkill,getMySkills,getMySkillById,addUserSkill
    ,updateUserSkill,deleteUserSkill
};