const asyncHandler = require("../utils/asyncHandlers");
const CAREER_PROFILE_MESSAGES=require("../constants/messages/careerProfileMessages");
const careerProfileService=require("../services/careerProfileService");

const createCareerProfile=asyncHandler(async(req,res)=>{
    const careerProfile=await careerProfileService.createCareerProfile(req.user.id,req.body);
    return res.status(201).json({
            success:true,
            message:CAREER_PROFILE_MESSAGES.CAREER_PROFILE_CREATED_SUCCESSFULLY,
            data:careerProfile
        });
});

const getCareerProfile=asyncHandler(async(req,res)=>{
    const careerProfile=await careerProfileService.getCareerProfile(req.user.id);
    return res.status(200).json({
            success:true,
            message:CAREER_PROFILE_MESSAGES.CAREER_PROFILE_FETCHED,
            data:careerProfile
        });
});

const updateCareerProfile = asyncHandler(async (req, res) => {

    const careerProfile=await careerProfileService.updateCareerProfile(req.user.id,req.body);
    return res.status(200).json({
        success: true,
        message:
            CAREER_PROFILE_MESSAGES.CAREER_PROFILE_UPDATED,
        data: careerProfile
    });

});

const getCareerProfileHistory=asyncHandler(async(req,res)=>{
    const history =await careerProfileService.getCareerProfileHistory(req.user.id);

    return res.status(200).json({
        success: true,
        message:
            CAREER_PROFILE_MESSAGES.CAREER_PROFILE_HISTORY_FETCHED,
        data: history
    });
});

const activateCareerProfile = asyncHandler(async (req, res) => {
    const careerProfile =await careerProfileService.activateCareerProfile(req.user.id,req.params.careerProfileId);
    return res.status(200).json({
        success: true,
        message:CAREER_PROFILE_MESSAGES.CAREER_PROFILE_ACTIVATED,
        data: careerProfile
    });

    }
);

const deleteCareerProfile = asyncHandler(async (req, res) => {

    const { careerProfileId } = req.params;

    await careerProfileService.deleteCareerProfile(
        req.user.id,
        careerProfileId
    );

    return res.status(200).json({
        success: true,
        message: CAREER_PROFILE_MESSAGES.CAREER_PROFILE_DELETED
    });

});

module.exports={createCareerProfile,getCareerProfile,updateCareerProfile,getCareerProfileHistory,activateCareerProfile,deleteCareerProfile};