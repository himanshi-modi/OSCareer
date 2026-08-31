const CareerProfile = require("../models/CareerProfile");
const User = require("../models/User");
const AppError = require("../errors/AppError");
const mongoose = require("mongoose");
const RoadmapTemplate = require("../models/RoadmapTemplate");
const StageTemplate = require("../models/StageTemplate");
const MissionTemplate = require("../models/MissionTemplate");
const UserRoadmap = require("../models/UserRoadmap");
const UserStage = require("../models/UserStage");
const UserMissionProgress = require("../models/UserMissionProgress");
const careerAnalysisService = require("./ai/careerAnalysisService");
const CAREER_PROFILE_MESSAGES = require("../constants/messages/careerProfileMessages");
const AUTH_MESSAGES= require("../constants/messages/authMessages");
const roadmapGenerationService = require('./roadmapServices/roadmapGenerationService');

const createCareerProfile = async (userId, profileData) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
        }
        const existingCareer = await CareerProfile.findOne({
            userId,
            targetCareer: profileData.targetCareer,
            isDeleted:false
        }).session(session);

        if (existingCareer) {
            throw new AppError(CAREER_PROFILE_MESSAGES.CAREER_PROFILE_ALREADY_EXISTS,409);
        }
        await CareerProfile.updateMany(
            {
                userId,
                isActive: true,
                isDeleted:false
            },
            {
                isActive: false
            },
            { session }
        );

        const createdProfiles = await CareerProfile.create(
            [
                {
                    userId,
                    targetCareer: profileData.targetCareer,
                    currentGoal: profileData.currentGoal,
                    careerPriority: profileData.careerPriority,
                    internshipPreference:profileData.internshipPreference,
                    targetTimeline:profileData.targetTimeline,
                    dailyCommitment:profileData.dailyCommitment,
                    educationLevel:profileData.educationLevel,
                    currentYear:profileData.currentYear,
                    experienceLevel:profileData.experienceLevel,
                    isActive: true
                }
            ],
            { session }
        );

        const careerProfile = createdProfiles[0];
        await roadmapGenerationService.generateRoadmap(userId,careerProfile,session);
        await session.commitTransaction();
        return careerProfile;

    } catch (error) {

        await session.abortTransaction();
        throw error;

    } finally {

        session.endSession();

    }
};

const getCareerProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404);
    }
    const careerProfile =await CareerProfile.findOne({userId,isActive: true,isDeleted:false});
    if (!careerProfile) {
        throw new AppError(CAREER_PROFILE_MESSAGES.NO_ACTIVE_CAREER_PROFILE,404);
    }
    return careerProfile;
};
const updateCareerProfile = async (userId, updateData) => {

    const careerProfile =await CareerProfile.findOne({userId,isActive: true,isDeleted:false});
    if (!careerProfile) {
        throw new AppError(
            CAREER_PROFILE_MESSAGES.NO_ACTIVE_CAREER_PROFILE,404);
    }
    if (
        Object.prototype.hasOwnProperty.call(
            updateData,
            "targetCareer"
        )
    ) {
        throw new AppError(
            CAREER_PROFILE_MESSAGES.TARGET_CAREER_CANNOT_BE_UPDATED,
            400
        );
    }

    const allowedFields = [
        "currentGoal",
        "careerPriority",
        "internshipPreference",
        "targetTimeline",
        "dailyCommitment",
        "educationLevel",
        "currentYear",
        "experienceLevel"
    ];

    for (const field of allowedFields) {
    if (field in updateData) {
        careerProfile[field] = updateData[field];
    }
}

    await careerProfile.save();

    return careerProfile;
};
const getCareerProfileHistory = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,404 );
    }

    const careerProfiles =await CareerProfile.find({userId,isDeleted:false})
        .sort({ updatedAt: -1 });

    return careerProfiles;
};
const activateCareerProfile = async (
    userId,
    careerProfileId
) => {

    if (
        !mongoose.Types.ObjectId.isValid(
            careerProfileId
        )
    ) {
        throw new AppError(
            CAREER_PROFILE_MESSAGES.INVALID_CAREER_PROFILE_ID,
            400
        );
    }

    const session =
        await mongoose.startSession();

    try {

        session.startTransaction();

      const selectedProfile =await CareerProfile.findOne({
        _id: careerProfileId,
        isDeleted: false
    }).session(session);

        if (!selectedProfile) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
                404
            );
        }

        if (
            selectedProfile.userId.toString()
            !== userId.toString()
        ) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_ACCESS_DENIED,
                403
            );
        }

        if (selectedProfile.isActive) {

            await session.commitTransaction();

            return selectedProfile;
        }

        await CareerProfile.updateMany(
            {
                userId,
                isActive: true,
                isDeleted:false
            },
            {
                isActive: false
            },
            { session }
        );

        selectedProfile.isActive = true;

        await selectedProfile.save({
            session
        });

        await session.commitTransaction();

        return selectedProfile;

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }
};
const deleteCareerProfile = async (userId, careerProfileId) => {

    if (!mongoose.Types.ObjectId.isValid(careerProfileId)) {
        throw new AppError(
            CAREER_PROFILE_MESSAGES.INVALID_CAREER_PROFILE_ID,
            400
        );
    }

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const careerProfile = await CareerProfile.findOne({
            _id: careerProfileId,
            isDeleted: false
        }).session(session);

        if (!careerProfile) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_NOT_FOUND,
                404
            );
        }

        if (careerProfile.userId.toString() !== userId.toString()) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CAREER_PROFILE_ACCESS_DENIED,
                403
            );
        }

        if (careerProfile.isActive) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CANNOT_DELETE_ACTIVE_PROFILE,
                400
            );
        }

        const totalProfiles = await CareerProfile.countDocuments({
            userId,
            isDeleted: false
        }).session(session);

        if (totalProfiles === 1) {
            throw new AppError(
                CAREER_PROFILE_MESSAGES.CANNOT_DELETE_LAST_PROFILE,
                400
            );
        }

        const deletedAt = new Date();

        const userRoadmap = await UserRoadmap.findOne({
            careerProfileId: careerProfile._id,
            isDeleted: false
        }).session(session);

        if (userRoadmap) {

            const userStages = await UserStage.find({
                userRoadmapId: userRoadmap._id,
                isDeleted: false
            }).session(session);

            const userStageIds = userStages.map(stage => stage._id);

            await UserMissionProgress.updateMany(
                {
                    userStageId: {
                        $in: userStageIds
                    },
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt
                    }
                },
                { session }
            );

            await UserStage.updateMany(
                {
                    userRoadmapId: userRoadmap._id,
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt
                    }
                },
                { session }
            );

            await UserRoadmap.updateOne(
                {
                    _id: userRoadmap._id
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt
                    }
                },
                { session }
            );
        }

        await CareerProfile.updateOne(
            {
                _id: careerProfile._id
            },
            {
                $set: {
                    isDeleted: true,
                    deletedAt,
                    isActive: false
                }
            },
            { session }
        );

        await session.commitTransaction();

    } catch (error) {

        await session.abortTransaction();
        throw error;

    } finally {

        session.endSession();

    }

};
const getPublicCareerProfile = async (userId) => {

    return await CareerProfile.findOne({
        userId
    })
        .select(
            "targetCareer experienceLevel educationLevel currentYear"
        )
        .lean();
};


const getProfileCompletion = async (userId) => {

    const profile = await CareerProfile.findOne({
        userId
    }).lean();

    if (!profile) {
        return {
            percentage: 0,
            completedFields: 0,
            totalFields: 9
        };
    }

    const fields = [
        profile.targetCareer,
        profile.currentGoal,
        profile.careerPriority,
        profile.internshipPreference,
        profile.targetTimeline,
        profile.dailyCommitment,
        profile.educationLevel,
        profile.currentYear,
        profile.experienceLevel
    ];

    const completedFields = fields.filter(
        (field) =>
            field !== undefined &&
            field !== null &&
            field !== ""
    ).length;

    const totalFields = fields.length;

    const percentage = Math.round(
        (completedFields / totalFields) * 100
    );
    return {
        percentage,
        completedFields,
        totalFields
    };
};
module.exports = {
    createCareerProfile,
    getCareerProfile,
    updateCareerProfile,
    getCareerProfileHistory,
    activateCareerProfile,
    deleteCareerProfile,
    getPublicCareerProfile,
    getProfileCompletion
};