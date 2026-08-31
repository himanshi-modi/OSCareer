const Skill = require("../models/Skill");
const mongoose = require("mongoose");
const AppError = require("../errors/AppError");
const SKILL_MESSAGES=require("../constants/messages/skillMessages");
const UserSkill = require("../models/UserSkill");
const {getStartDate} = require("../utils/date/getStartDate");

const searchMasterSkills = async ({query,category,subCategory,limit}) => {
    const filter = {
    isActive: true,
    isDeleted: false,
    $or: [
        {
            name: {
                $regex: query,
                $options: "i"
            }
        },
        {
            aliases: {
                $regex: query,
                $options: "i"
            }
        }
    ]
};
    if (category) {
        filter.category = category;
    }

    if (subCategory) {
        filter.subCategory = subCategory;
    }

    const skills = await Skill.find(filter)
        .select("_id name category subCategory description difficulty aliases isTrending")
        .sort({
            name: 1
        }).limit(Number(limit) || 20).lean();
    return {
        skills,
        count: skills.length
    };
};

const getMasterSkillById = async (skillId) => {

    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        throw new AppError(SKILL_MESSAGES.INVALID_SKILL_ID,400);
    }

    const skill = await Skill.findOne({
        _id: skillId,
        isActive: true,
        isDeleted: false
    }).select("_id name category subCategory description difficulty aliases isTrending");

    if (!skill) {
        throw new AppError(SKILL_MESSAGES.SKILL_NOT_FOUND,404);
    }
    return {
        id: skill._id,
        name: skill.name,
        category: skill.category,
        subCategory: skill.subCategory,
        description: skill.description,
        difficulty: skill.difficulty,
        aliases: skill.aliases,
        isTrending: skill.isTrending
    };

};

const createMasterSkill = async (skillData) => {
    const {name,category,subCategory,description,difficulty,aliases,isTrending} = skillData;
    const normalizedName = name.trim();
    const existingSkill = await Skill.findOne({
        name: {
            $regex: `^${normalizedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
            $options: "i"
        }
    });
    console.log(existingSkill);
    if (existingSkill) {
        throw new AppError(SKILL_MESSAGES.SKILL_ALREADY_EXISTS,409);
    }
    try {
        const skill = await Skill.create({
            name: normalizedName,
            category,
            subCategory,
            description: description || "",
            difficulty: difficulty || "beginner",
            aliases: aliases || [],
            isTrending: isTrending ?? false,
            isActive: true,
            isDeleted: false
        });

        return {
            id: skill._id,
            name: skill.name,
            category: skill.category,
            subCategory: skill.subCategory,
            description: skill.description,
            difficulty: skill.difficulty,
            aliases: skill.aliases,
            isTrending: skill.isTrending,
            isActive: skill.isActive
        };

    } catch (error) {
    console.log("Error code:", error.code);
    console.log("Key pattern:", error.keyPattern);
    console.log("Key value:", error.keyValue);
    console.log(error);

    throw error;
}
};

const updateMasterSkill = async (skillId, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        throw new AppError(
            SKILL_MESSAGES.INVALID_SKILL_ID,
            400
        );
    }
    const skill = await Skill.findOne({_id: skillId,isDeleted: false});

    if (!skill) {
        throw new AppError(SKILL_MESSAGES.SKILL_NOT_FOUND,404);
    }

    const {name,category,subCategory,description,difficulty,aliases,isTrending,isActive} = updateData;
    if (
        name === undefined &&
        category === undefined &&
        subCategory === undefined &&
        description === undefined &&
        difficulty === undefined &&
        aliases === undefined &&
        isTrending === undefined &&
        isActive === undefined
    ) {
        throw new AppError(SKILL_MESSAGES.NO_UPDATE_FIELDS,400);
    }

    if (name !== undefined) {
        const normalizedName = name.trim();
        const existingSkill = await Skill.findOne({
            _id: { $ne: skillId },
            name: {
                $regex: `^${normalizedName.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                )}$`,
                $options: "i"
            },
            isDeleted: false
        });
        if (existingSkill) {
            throw new AppError(
                SKILL_MESSAGES.SKILL_ALREADY_EXISTS,
                409
            );
        }
        skill.name = normalizedName;
    }
    if (category !== undefined) {
        skill.category = category;
    }
    if (subCategory !== undefined) {
        skill.subCategory = subCategory.trim();
    }
    if(description !== undefined){
    skill.description = description?.trim() || "";
}
    if (difficulty !== undefined) {
        skill.difficulty = difficulty;
    }
    if (aliases !== undefined) {
        skill.aliases = aliases;
    }
    if (isTrending !== undefined) {
        skill.isTrending = isTrending;
    }
    if (isActive !== undefined) {
        skill.isActive = isActive;
    }
    const updatedSkill = await skill.save();
    return updatedSkill;
};

const deleteMasterSkill = async (skillId) => {
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        throw new AppError(SKILL_MESSAGES.INVALID_SKILL_ID,400);
    }

    const skill = await Skill.findOne({_id: skillId,isDeleted: false});

    if (!skill) {
        throw new AppError(SKILL_MESSAGES.SKILL_NOT_FOUND,404);
    }

    if (!skill.isActive) {
        throw new AppError(SKILL_MESSAGES.SKILL_ALREADY_INACTIVE,409);
    }

    skill.isActive = false;
    skill.isDeleted = true;
    skill.deletedAt = new Date();

    await skill.save();

    return {
        id: skill._id,
        name: skill.name,
        isActive: skill.isActive,
        isDeleted: skill.isDeleted,
        deletedAt: skill.deletedAt
    };
};

const getMySkills = async (userId) => {

    const userSkills = await UserSkill.find({userId,isDeleted:false,isActive:true})
        .populate({
            path: "skillId",
            select: "name category subCategory description difficulty aliases isTrending isActive isDeleted"
        }).sort({
            createdAt: -1
        });
        console.log(
        "🔥 USER SKILLS:",
        JSON.stringify(userSkills, null, 2)
    );
    return {
        skills: userSkills.map((userSkill) => ({
            id: userSkill._id,
            skill: userSkill.skillId,
            category:userSkill.category,
            proficiency: userSkill.proficiency,
            source: userSkill.source,
            isVerified: userSkill.isVerified,
            lastUsed: userSkill.lastUsed,
            confidenceScore: userSkill.confidenceScore,
            createdAt: userSkill.createdAt,
            updatedAt: userSkill.updatedAt
        })),
        totalSkills: userSkills.length
    };
};

const getMySkillById = async (userId, skillId) => {
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        throw new AppError(SKILL_MESSAGES.INVALID_SKILL_ID,400);
    }
    const userSkill = await UserSkill.findOne({
        _id: skillId,
        userId,
        isDeleted: false,
        isActive: true
    }).populate({
        path: "skillId",
        select: "name category subCategory description difficulty aliases isTrending isActive isDeleted"
    });

    if (!userSkill) {
        throw new AppError(SKILL_MESSAGES.USER_SKILL_NOT_FOUND,404);
    }
    return {
        id: userSkill._id,
        skill: userSkill.skillId,
        proficiency: userSkill.proficiency,
        source: userSkill.source,
        isVerified: userSkill.isVerified,
        lastUsed: userSkill.lastUsed,
        confidenceScore: userSkill.confidenceScore,
        createdAt: userSkill.createdAt,
        updatedAt: userSkill.updatedAt
    };
};

const addUserSkill = async (userId, skillData) => {
    const { skillId, proficiency, source } = skillData;
    const skill = await Skill.findOne({
        _id: skillId,
        isActive: true,
        isDeleted: false
    });

    if (!skill) {
        throw new AppError(SKILL_MESSAGES.SKILL_NOT_FOUND,404);
    }

    const existingUserSkill = await UserSkill.findOne({
    userId,
    skillId,
    isDeleted:false
});

    if (existingUserSkill) {
        throw new AppError(SKILL_MESSAGES.USER_SKILL_ALREADY_EXISTS,409);
    }

    try {
        const userSkill = await UserSkill.create({
            userId,
            skillId,
            proficiency,
            source,
            isVerified: false,
            lastUsed: null,
            confidenceScore: 0,
            isActive: true,
            isDeleted: false,
            deletedAt: null
        });
        await userSkill.populate({
            path: "skillId",
            select: "_id name category subCategory description difficulty aliases isTrending isActive"
        });

        return {
            id: userSkill._id,
            skill: userSkill.skillId,
            proficiency: userSkill.proficiency,
            source: userSkill.source,
            isVerified: userSkill.isVerified,
            lastUsed: userSkill.lastUsed,
            confidenceScore: userSkill.confidenceScore,
            createdAt: userSkill.createdAt,
            updatedAt: userSkill.updatedAt
        };

    } catch (error) {
        if (error.code === 11000) {
            throw new AppError(SKILL_MESSAGES.USER_SKILL_ALREADY_EXISTS,409);
        }

        throw error;
    }
};

const updateUserSkill = async (skillId, userId, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        throw new AppError(
            SKILL_MESSAGES.INVALID_SKILL_ID,
            400
        );
    }
    console.log("========== UPDATE USER SKILL ==========");
console.log("skillId:", skillId);
console.log("userId:", userId);
console.log("skillId valid:", mongoose.Types.ObjectId.isValid(skillId));
    const userSkill = await UserSkill.findOne({
        _id: skillId,
        userId,
        isDeleted: false,
        isActive: true
    });
    console.log("Found by ID only:", userSkill);
    const userSkillWithUser = await UserSkill.findOne({
    _id: skillId,
    userId
});

console.log("Found by ID + userId:", userSkillWithUser);
const userSkillWithFlags = await UserSkill.findOne({
    _id: skillId,
    userId,
    isDeleted: false,
    isActive: true
});

console.log("Found with all filters:", userSkillWithFlags);
    if (!userSkill) {
        throw new AppError(SKILL_MESSAGES.USER_SKILL_NOT_FOUND,404);
    }
    const {proficiency,lastUsed} = updateData;
    if (
        proficiency === undefined &&
        lastUsed === undefined
    ) {
        throw new AppError(SKILL_MESSAGES.NO_UPDATE_FIELDS,400
        );
    }
    if (proficiency !== undefined) {
        userSkill.proficiency = proficiency;
    }
    if (lastUsed !== undefined) {
        userSkill.lastUsed = lastUsed;
    }
    const updatedUserSkill = await userSkill.save();
    await updatedUserSkill.populate({
        path: "skillId",
        select: "name category subCategory description difficulty aliases isTrending isActive isDeleted"
    });

    return {
        id: updatedUserSkill._id,
        skill: updatedUserSkill.skillId,
        proficiency: updatedUserSkill.proficiency,
        source: updatedUserSkill.source,
        isVerified: updatedUserSkill.isVerified,
        lastUsed: updatedUserSkill.lastUsed,
        confidenceScore: updatedUserSkill.confidenceScore,
        createdAt: updatedUserSkill.createdAt,
        updatedAt: updatedUserSkill.updatedAt
    };
};

const deleteUserSkill = async (skillId, userId) => {
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        throw new AppError(SKILL_MESSAGES.INVALID_SKILL_ID,400);
    }

    const userSkill = await UserSkill.findOne({
        _id: skillId,
        userId,
        isDeleted: false,
        isActive: true
    });

    if (!userSkill) {
        throw new AppError(SKILL_MESSAGES.USER_SKILL_NOT_FOUND,404);
    }
    userSkill.isActive = false;
    userSkill.isDeleted = true;
    userSkill.deletedAt = new Date();
    await userSkill.save();
    return {
        id: userSkill._id,
        isActive: userSkill.isActive,
        isDeleted: userSkill.isDeleted,
        deletedAt: userSkill.deletedAt
    };
};

const getSkillStats = async (userId) => {
    const stats = await UserSkill.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                isDeleted: false,
                isActive: true
            }
        },
        {
            $facet: {
                overview: [
                    {
                        $group: {
                            _id: null,

                            totalSkills: {
                                $sum: 1
                            },

                            verifiedSkills: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$isVerified", true] },
                                        1,
                                        0
                                    ]
                                }
                            },

                            unverifiedSkills: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$isVerified", false] },
                                        1,
                                        0
                                    ]
                                }
                            }
                        }
                    }
                ],

                proficiency: [
                    {
                        $group: {
                            _id: "$proficiency",
                            count: { $sum: 1 }
                        }
                    }
                ],

                categories: [
                    {
                        $lookup: {
                            from: "skills",
                            localField: "skillId",
                            foreignField: "_id",
                            as: "skill"
                        }
                    },
                    {
                        $unwind: "$skill"
                    },
                    {
                        $group: {
                            _id: "$skill.category",
                            count: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ]);

    const result = stats[0];

    const proficiency = {};

    result.proficiency.forEach((item) => {
        proficiency[item._id] = item.count;
    });

    const categories = {};

    result.categories.forEach((item) => {
        categories[item._id] = item.count;
    });

    return {
        totalSkills:
            result.overview[0]?.totalSkills || 0,

        verifiedSkills:
            result.overview[0]?.verifiedSkills || 0,

        unverifiedSkills:
            result.overview[0]?.unverifiedSkills || 0,

        proficiency,

        categories
    };
};


const getPublicUserSkills = async (userId) => {

    return await UserSkill.find({
        userId
    })
        .populate({
            path: "skillId",
            select: "name category"
        })
        .select(
            "skillId level proficiencyScore verified"
        )
        .lean();
};
const getSkillProgress = async (userId) => {

    const skills = await UserSkill.find({
        userId
    }).select("skillId level verified");

    const totalSkills = skills.length;

    if (totalSkills === 0) {
        return {
            percentage: 0,
            totalSkills: 0,
            verifiedSkills: 0
        };
    }

    const verifiedSkills = skills.filter(
        (skill) => skill.verified === true
    ).length;

    

    const percentage = Math.round(
        (verifiedSkills / totalSkills) * 100
    );

    return {
        percentage,
        totalSkills,
        verifiedSkills
    };
};
const getSkillTrend = async (userId, period = "6m") => {

    const startDate = getStartDate(period);

    const skills = await UserSkill.find({
        userId,
        createdAt: {
            $gte: startDate
        }
    })
        .sort({ createdAt: 1 })
        .select("createdAt")
        .lean();

    let totalSkillsBeforePeriod =
        await UserSkill.countDocuments({
            userId,
            createdAt: {
                $lt: startDate
            }
        });

    const trend = {};

    skills.forEach((skill) => {

        const date = new Date(skill.createdAt);

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

        totalSkillsBeforePeriod++;

        trend[key] = totalSkillsBeforePeriod;
    });

    return Object.entries(trend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, totalSkills]) => ({
            date,
            totalSkills
        }));
};
module.exports = {searchMasterSkills,getMasterSkillById,createMasterSkill,updateMasterSkill,deleteMasterSkill,getMySkills,getMySkillById,addUserSkill,
    updateUserSkill,deleteUserSkill,getSkillStats,getPublicUserSkills,getSkillProgress,getSkillTrend
};

