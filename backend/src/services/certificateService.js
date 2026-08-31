const Certificate = require("../models/Certificate");
const AppError = require("../errors/AppError");
const  CERTIFICATE_MESSAGES  = require("../constants/messages/certificateMessages");
const  SKILL_MESSAGES  = require("../constants/messages/skillMessages");
const mongoose=require("mongoose");
const CertificateSkill = require("../models/CertificateSkill");
const CertificateAnalysis = require("../models/CertificateAnalysis");
const PROJECT_MESSAGES= require("../constants/messages/projectMessages");
const Skill = require("../models/Skill");
const {getStartDate} = require("../utils/date/getStartDate");

const createCertificate = async (userId, certificateData) => {
    const {
        title,
        issuer,
        issueDate,
        expiryDate,
        credentialId,
        credentialUrl,
        certificateFileUrl
    } = certificateData;

    if (issueDate > new Date()) {
        throw new AppError( CERTIFICATE_MESSAGES.ISSUE_DATE_CANNOT_BE_IN_FUTURE,400);
    }
    if (expiryDate && expiryDate < issueDate) {
        throw new AppError(CERTIFICATE_MESSAGES.EXPIRY_DATE_BEFORE_ISSUE_DATE,400 );
    }

    const certificate = await Certificate.create({
        userId,
        title,
        issuer,
        issueDate,
        expiryDate,
        credentialId,
        credentialUrl,
        certificateFileUrl,
        source: "manual",
        isVerified: false,
        isDeleted:false
    });

    return certificate;
};

const getAllCertificates = async (userId, query) => {
    const filter = {
        userId,
        isDeleted: false
    };

    if (query.source) {
        filter.source = query.source;
    }

    if (query.isVerified !== undefined) {
    filter.isVerified = query.isVerified === "true";
}

    const sort = {
    [query.sortBy || "createdAt"]:
        query.sortOrder === "asc" ? 1 : -1
};
    return await Certificate.find(filter)
        .sort(sort);
};

const getCertificateById = async (userId, certificateId) => {
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
    const certificate = await Certificate.findOne({
        _id: certificateId,
        userId,
        isDeleted: false
    });

    if (!certificate) {
        throw new AppError(CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND,404);
    }
    return certificate;
};

const updateCertificate = async (userId, certificateId,updateData) => {
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
    const certificate=await Certificate.findOne({ _id: certificateId, userId, isDeleted: false});
    if (!certificate) {
        throw new AppError(CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND,404);
    }
    const issueDate = updateData.issueDate ?? certificate.issueDate;
    const expiryDate = updateData.expiryDate ?? certificate.expiryDate;

    if (issueDate > new Date()) {
        throw new AppError(CERTIFICATE_MESSAGES.ISSUE_DATE_CANNOT_BE_IN_FUTURE,400);
    }


    if (expiryDate && expiryDate < issueDate) {
        throw new AppError(CERTIFICATE_MESSAGES.EXPIRY_DATE_BEFORE_ISSUE_DATE,400);
    }
    Object.assign(certificate, updateData);
    await certificate.save();
    return certificate;
};

const deleteCertificate = async (userId, certificateId) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
        const certificate = await Certificate.findOne({ _id: certificateId, userId,   isDeleted: false
        }).session(session);

        if (!certificate) {
            throw new AppError(
                CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND,
                404
            );
        }
        certificate.isDeleted = true;
        certificate.deletedAt = new Date();
        await certificate.save({ session });

        
        await CertificateSkill.updateMany(
            {
                certificateId,
                isDeleted: false
            },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            },
            { session }
        );

        await CertificateAnalysis.updateMany(
            {
                certificateId,
                isDeleted: false
            },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            },
            { session }
        );

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

const addSkillsToCertificate = async (userId, certificateId, skillIds) => {
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
if (!skillIds.every(skillId => mongoose.Types.ObjectId.isValid(skillId))) {
    throw new AppError(
        SKILL_MESSAGES.INVALID_SKILL_ID,
        400
    );
}
    const certificate = await Certificate.findOne({
    _id: certificateId,
    userId,
    isDeleted: false
});

    if (!certificate) {
        throw new AppError(CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND, 404);
    }

    const uniqueSkillIds = [...new Set(skillIds)];
    const masterSkills = await Skill.find({
        _id: { $in: uniqueSkillIds },
    }).select("_id");

    if (masterSkills.length !== uniqueSkillIds.length) {
        throw new AppError(PROJECT_MESSAGES.SKILL_NOT_FOUND, 404);
    }
    const existingMappings = await CertificateSkill.find({
        certificateId,
        skillId: { $in: uniqueSkillIds },
    }).select("skillId");

    const existingSkillIds = new Set(
        existingMappings.map((item) => item.skillId.toString())
    );

    const newSkills = uniqueSkillIds.filter(
        (skillId) => !existingSkillIds.has(skillId.toString())
    );

    if (newSkills.length === 0) {
        return [];
    }

    const certificateSkills = newSkills.map(skillId => ({
    certificateId,
    skillId,
    confidenceScore: 100,
    verifiedByAI: false,
    isDeleted: false,
    deletedAt: null
}));
    return await CertificateSkill.insertMany(certificateSkills);
};

const getCertificateSkills = async (userId, certificateId) => {
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
    const certificate = await Certificate.findOne({_id: certificateId,userId,  isDeleted: false});

    if (!certificate) {
        throw new AppError(CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND,404);
    }

    const skills = await CertificateSkill.find({certificateId,isDeleted: false})
    .populate({
    path: "skillId",
    select: "name category icon",
    match: { isDeleted: false }
});

    return skills;
};

const removeSkillFromCertificate = async (userId,certificateId,skillId) => {
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
if (!mongoose.Types.ObjectId.isValid(skillId)) {
    throw new AppError(
        SKILL_MESSAGES.INVALID_SKILL_ID,
        400
    );
}
    const certificate = await Certificate.findOne({ _id: certificateId, userId, isDeleted: false});

    if (!certificate) {
        throw new AppError(
            CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND,
            404
        );
    }

    const certificateSkill = await CertificateSkill.findOne({
        certificateId,
        skillId,
        isDeleted: false
    });

    if (!certificateSkill) {
        throw new AppError(
            CERTIFICATE_MESSAGES.SKILL_NOT_ASSOCIATED_WITH_CERTIFICATE,
            404
        );
    }
    certificateSkill.isDeleted = true;
certificateSkill.deletedAt = new Date();
await certificateSkill.save();
    return;
};

const getCertificateAnalysisHistory = async ( userId, certificateId) => {
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
    const certificate = await Certificate.findOne({_id: certificateId,userId,isDeleted: false});

    if (!certificate) {
        throw new AppError(CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND,404);
    }

    const analyses = await CertificateAnalysis.find({ certificateId ,isDeleted:false})
        .populate(
            "verifiedSkills",
            "name category icon"
        )
        .populate(
            "missingRelatedSkills",
            "name category icon"
        )
        .sort({
            analysisVersion: -1
        }).lean();

    return analyses;
};
const getLatestCertificateAnalysis = async (userId, certificateId) => {
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
    throw new AppError(
        CERTIFICATE_MESSAGES.INVALID_CERTIFICATE_ID,
        400
    );
}
    const certificate = await Certificate.findOne({
        _id: certificateId,
        userId,
        isDeleted: false,
    });

    if (!certificate) {
        throw new AppError(
            CERTIFICATE_MESSAGES.CERTIFICATE_NOT_FOUND,
            404
        );
    }

    const latestAnalysis = await CertificateAnalysis.findOne({
        certificateId,
        isDeleted: false,
    })
        .sort({ analysisVersion: -1 })
        .populate("verifiedSkills", "name category icon")
        .populate("missingRelatedSkills", "name category icon");

    return latestAnalysis;
};

const getCertificateStats = async (userId) => {
    const stats = await Certificate.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                isDeleted: false
            }
        },
        {
            $facet: {
                overview: [
                    {
                        $group: {
                            _id: null,
                            totalCertificates: { $sum: 1 },

                            verifiedCertificates: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$isVerified", true] },
                                        1,
                                        0
                                    ]
                                }
                            },

                            unverifiedCertificates: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$isVerified", false] },
                                        1,
                                        0
                                    ]
                                }
                            },

                            expiredCertificates: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $ne: ["$expiryDate", null] },
                                                { $lt: ["$expiryDate", new Date()] }
                                            ]
                                        },
                                        1,
                                        0
                                    ]
                                }
                            },

                            expiringSoon: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $ne: ["$expiryDate", null] },
                                                { $gte: ["$expiryDate", new Date()] },
                                                {
                                                    $lte: [
                                                        "$expiryDate",
                                                        new Date(
                                                            Date.now() +
                                                            30 * 24 * 60 * 60 * 1000
                                                        )
                                                    ]
                                                }
                                            ]
                                        },
                                        1,
                                        0
                                    ]
                                }
                            }
                        }
                    }
                ],

                bySource: [
                    {
                        $group: {
                            _id: "$source",
                            count: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ]);

    const result = stats[0];

    return {
        totalCertificates:
            result.overview[0]?.totalCertificates || 0,

        verifiedCertificates:
            result.overview[0]?.verifiedCertificates || 0,

        unverifiedCertificates:
            result.overview[0]?.unverifiedCertificates || 0,

        expiredCertificates:
            result.overview[0]?.expiredCertificates || 0,

        expiringSoon:
            result.overview[0]?.expiringSoon || 0,

        bySource: result.bySource.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {})
    };
};

const getCertificates = async (userId) => {
    const certificates = await Certificate.find({
        userId,
        isDeleted: false
    })
        .sort({
            issueDate: -1
        })
        .select(
            "_id title issuer issueDate expiryDate credentialId credentialUrl certificateFileUrl isVerified source"
        )
        .lean();

    return certificates;
};


const getRecentActivity = async (userId) => {

    const certificates = await Certificate.find({
        userId
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .select(
            "_id title issuer issueDate createdAt"
        );

    return certificates.map((certificate) => ({
        type: "certificate",

        title: "Certificate Added",

        description:
            `${certificate.title} - ${certificate.issuer}`,

        referenceId: certificate._id,

        createdAt: certificate.createdAt
    }));
};
const getPublicUserCertificates = async (userId) => {

    return await Certificate.find({
        userId
    })
        .sort({
            issueDate: -1
        })
        .limit(10)
        .select(
            "_id title issuer issueDate expiryDate credentialId credentialUrl isVerfied"
        )
        .lean();
};


const getCertificateProgress = async (userId) => {

    const totalCertificates =
        await Certificate.countDocuments({
            userId
        });

    const targetCertificates = 4;

    const percentage = Math.min(
        Math.round(
            (totalCertificates / targetCertificates) * 100
        ),
        100
    );

    return {
        percentage,
        totalCertificates,
        targetCertificates
    };
};


const getCertificateTrend = async (
    userId,
    period = "6m"
) => {

    const startDate = getStartDate(period);

    const certificates = await Certificate.find({
        userId,
        issueDate: {
            $gte: startDate
        }
    })
        .sort({ issueDate: 1 })
        .select("issueDate")
        .lean();

    const trend = {};

    certificates.forEach((certificate) => {

        const date =
            new Date(certificate.issueDate);

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

        trend[key] =
            (trend[key] || 0) + 1;
    });

    return Object.entries(trend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, earned]) => ({
            date,
            earned
        }));
};
module.exports = {
    createCertificate,getAllCertificates,getCertificateById,updateCertificate,deleteCertificate,addSkillsToCertificate,
    getCertificateSkills,removeSkillFromCertificate,getCertificateAnalysisHistory,getLatestCertificateAnalysis,getCertificateStats,
    getCertificates,getRecentActivity,getPublicUserCertificates,getCertificateProgress,getCertificateTrend
};
