const Experience = require("../models/Experience");
const Skill = require("../models/Skill");
const AppError = require("../errors/AppError");
const EXPERIENCE_MESSAGES = require("../constants/messages/experienceMessages");
const SKILL_MESSAGES = require("../constants/messages/skillMessages");
const mongoose = require("mongoose");


const createExperience = async (userId, experienceData) => {

    const {
        companyName,
        role,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description,
        skillsUsed,
        proofUrl
    } = experienceData;

    const today = new Date();

    if (new Date(startDate) > today) {
        throw new AppError(
            EXPERIENCE_MESSAGES.START_DATE_CANNOT_BE_IN_FUTURE,
            400
        );
    }

    if (currentlyWorking && endDate) {
        throw new AppError(
            EXPERIENCE_MESSAGES.CURRENT_JOB_CANNOT_HAVE_END_DATE,
            400
        );
    }

    if (!currentlyWorking && !endDate) {
        throw new AppError(
            EXPERIENCE_MESSAGES.END_DATE_REQUIRED,
            400
        );
    }

    if (
        endDate &&
        new Date(endDate) < new Date(startDate)
    ) {
        throw new AppError(
            EXPERIENCE_MESSAGES.END_DATE_BEFORE_START_DATE,
            400
        );
    }

    const uniqueSkillIds = [...new Set(skillsUsed || [])];

    for (const skillId of uniqueSkillIds) {
        if (!mongoose.Types.ObjectId.isValid(skillId)) {
            throw new AppError(
                SKILL_MESSAGES.INVALID_SKILL_ID,
                400
            );
        }
    }

    const skills = await Skill.find({
        _id: { $in: uniqueSkillIds }
    }).select("_id");

    if (skills.length !== uniqueSkillIds.length) {
        throw new AppError(
            SKILL_MESSAGES.SKILL_NOT_FOUND,
            404
        );
    }

    const experience = await Experience.create({
        userId,
        companyName,
        role,
        employmentType,
        location,
        startDate,
        endDate: currentlyWorking ? null : endDate,
        currentlyWorking,
        description,
        skillsUsed: uniqueSkillIds,
        proofUrl,
        source: "manual"
    });

    return experience;
};

const getAllExperiences = async (userId, query) => {

    const {
        page,
        limit,
        employmentType,
        source,
        currentlyWorking,
        sortBy,
        order
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const filters = {
        userId,
        isDeleted: false
    };

    if (employmentType) {
        filters.employmentType = employmentType;
    }

    if (source) {
        filters.source = source;
    }

    if (currentlyWorking !== undefined) {
        filters.currentlyWorking = currentlyWorking;
    }

    const sortOptions = {
        [sortBy]: order === "asc" ? 1 : -1
    };

    const [experiences, total] = await Promise.all([

        Experience.find(filters)
            .populate(
                "skillsUsed",
                "name category icon"
            )
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber),

        Experience.countDocuments(filters)

    ]);

    return {

        experiences,

        pagination: {

            total,

            currentPage: pageNumber,

            totalPages: Math.ceil(
                total / limitNumber
            ),

            limit: limitNumber

        }

    };

};

const getExperienceById = async (userId, experienceId) => {

    const experience = await Experience.findOne({
        _id: experienceId,
        userId,
         isDeleted: false
    }).populate(
        "skillsUsed",
        "name category icon"
    );

    if (!experience) {
        throw new AppError(
            EXPERIENCE_MESSAGES.EXPERIENCE_NOT_FOUND,
            404
        );
    }

    return experience;
};

const updateExperience = async (
    userId,
    experienceId,
    updateData,
    
) => {

    const experience = await Experience.findOne({
        _id: experienceId,
        userId,
         isDeleted: false
    });

    if (!experience) {
        throw new AppError(
            EXPERIENCE_MESSAGES.EXPERIENCE_NOT_FOUND,
            404
        );
    }

    const startDate =
        updateData.startDate ?? experience.startDate;

    const endDate =
        updateData.endDate ?? experience.endDate;

    const currentlyWorking =
        updateData.currentlyWorking ??
        experience.currentlyWorking;

    if (new Date(startDate) > new Date()) {
        throw new AppError(
            EXPERIENCE_MESSAGES.START_DATE_CANNOT_BE_IN_FUTURE,
            400
        );
    }

    if (currentlyWorking && endDate) {
        throw new AppError(
            EXPERIENCE_MESSAGES.CURRENT_JOB_CANNOT_HAVE_END_DATE,
            400
        );
    }

    if (!currentlyWorking && !endDate) {
        throw new AppError(
            EXPERIENCE_MESSAGES.END_DATE_REQUIRED,
            400
        );
    }

    if (
        endDate &&
        new Date(endDate) < new Date(startDate)
    ) {
        throw new AppError(
            EXPERIENCE_MESSAGES.END_DATE_BEFORE_START_DATE,
            400
        );
    }

    if (updateData.skillsUsed) {

        const uniqueSkillIds = [
            ...new Set(updateData.skillsUsed)
        ];

        for (const skillId of uniqueSkillIds) {
            if (!mongoose.Types.ObjectId.isValid(skillId)) {
                throw new AppError(
                    SKILL_MESSAGES.INVALID_SKILL_ID,
                    400
                );
            }
        }

        const skills = await Skill.find({
            _id: {
                $in: uniqueSkillIds
            }
        }).select("_id");

        if (skills.length !== uniqueSkillIds.length) {
            throw new AppError(
                SKILL_MESSAGES.SKILL_NOT_FOUND,
                404
            );
        }

        updateData.skillsUsed = uniqueSkillIds;
    }

    Object.assign(experience, updateData);

    if (currentlyWorking) {
        experience.endDate = null;
    }

    await experience.save();

    return experience;

};

const deleteExperience = async (
    userId,
    experienceId
) => {

    const experience = await Experience.findOne({
        _id: experienceId,
        userId,
        isDeleted: false
    });

    if (!experience) {
        throw new AppError(
            EXPERIENCE_MESSAGES.EXPERIENCE_NOT_FOUND,
            404
        );
    }

    experience.isDeleted = true;
    experience.deletedAt = new Date();

    await experience.save();

};

const getCurrentExperience = async userId => {

    const experience = await Experience.findOne({
        userId,
        currentlyWorking: true,
        isDeleted: false
    }).populate(
        "skillsUsed",
        "name category icon"
    );

    if (!experience) {
        throw new AppError(
            EXPERIENCE_MESSAGES.CURRENT_EXPERIENCE_NOT_FOUND,
            404
        );
    }

    return experience;
};

const getExperienceStats = async userId => {

    const experiences = await Experience.find({
        userId,
        isDeleted: false
    });

    const totalExperiences = experiences.length;

    const currentExperience = experiences.filter(
        experience => experience.currentlyWorking
    ).length;

    const employmentTypes = {
        "full-time": 0,
        "part-time": 0,
        internship: 0,
        contract: 0,
        freelance: 0
    };

    experiences.forEach(experience => {
        employmentTypes[experience.employmentType]++;
    });

    const totalSkillsUsed = experiences.reduce(
        (total, experience) =>
            total + experience.skillsUsed.length,
        0
    );

    return {
        totalExperiences,
        currentExperience,
        previousExperiences:
            totalExperiences - currentExperience,
        employmentTypes,
        totalSkillsUsed
    };

};

const toggleFeaturedExperience = async (
    userId,
    experienceId
) => {

    const experience = await Experience.findOne({
        _id: experienceId,
        userId,
        isDeleted: false
    });

    if (!experience) {
        throw new AppError(
            EXPERIENCE_MESSAGES.EXPERIENCE_NOT_FOUND,
            404
        );
    }

    experience.isFeatured = !experience.isFeatured;

    await experience.save();

    return experience;
};

const getExperience = async (userId) => {

    const experiences = await Experience.find({
        userId,
        isDeleted: false
    })
        .populate(
            "skillsUsed",
            "name category icon"
        )
        .sort({
            startDate: -1
        })
        .lean();

    return experiences;
};


const getPublicUserExperience = async (userId) => {

    return await Experience.find({
        userId
    })
        .sort({
            startDate: -1
        })
        .select(
            "_id company role description startDate endDate currentlyWorking"
        )
        .lean();
};
module.exports = {
    createExperience,getAllExperiences,getExperienceById,updateExperience,deleteExperience,getCurrentExperience,getExperienceStats,toggleFeaturedExperience,
    getExperience,getPublicUserExperience
};