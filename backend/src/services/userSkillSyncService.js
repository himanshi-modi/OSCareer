
const UserSkill = require("../models/UserSkill");
const Skill=require("../models/Skill");
/**
 * Sync skills extracted from a resume into UserSkill.
 *
 * @param {ObjectId} userId
 * @param {Array} extractedSkills
 * @returns {Object}
 */
const syncResumeSkillsToUser = async (
    userId,
    extractedSkills = []
) => {

    if (!Array.isArray(extractedSkills) || extractedSkills.length === 0) {
        return {
            created: 0,
            updated: 0,
            skipped: 0,
            skills: []
        };
    }

    let created = 0;
    let updated = 0;
    let skipped = 0;

    const syncedSkills = [];

    // --------------------------------------------------
    // Normalize AI skill names
    // --------------------------------------------------

    const skillNames = extractedSkills
        .map((skill) => {
            if (typeof skill === "string") {
                return skill.trim();
            }

            if (skill && typeof skill.name === "string") {
                return skill.name.trim();
            }

            return null;
        })
        .filter(Boolean);

    // Remove duplicate skill names
    const uniqueSkillNames = [
    ...new Map(
        skillNames.map((name) => [
            name.toLowerCase(),
            name
        ])
    ).values()
];

    // --------------------------------------------------
    // Process every extracted skill
    // --------------------------------------------------

    for (const normalizedName of uniqueSkillNames) {

        // --------------------------------------------------
        // Find matching Master Skill
        // --------------------------------------------------

        const skill = await Skill.findOne({
    isActive: true,
    isDeleted: false,
    $or: [
        {
            name: {
                $regex: `^${escapeRegex(normalizedName)}$`,
                $options: "i",
            },
        },
        {
            aliases: {
                $regex: `^${escapeRegex(normalizedName)}$`,
                $options: "i",
            },
        },
    ],
});

        // --------------------------------------------------
        // Skill does not exist in Master Skills
        // --------------------------------------------------

        if (!skill) {
            skipped++;
            console.log(
        `⚠️ MasterSkill not found for resume skill: "${normalizedName}"`
    );
            continue;
        }

        // --------------------------------------------------
        // Check whether user already has this skill
        // --------------------------------------------------

        const existingUserSkill = await UserSkill.findOne({
            userId,
            skillId: skill._id
        });

        // --------------------------------------------------
        // Existing skill
        // --------------------------------------------------

        if (existingUserSkill) {

            // If it was previously soft-deleted,
            // reactivate it instead of creating a duplicate.
            if (existingUserSkill.isDeleted) {

                existingUserSkill.isDeleted = false;
                existingUserSkill.isActive = true;
                existingUserSkill.deletedAt = null;
                existingUserSkill.source = "resume";

                await existingUserSkill.save();

                updated++;

                syncedSkills.push({
                    id: existingUserSkill._id,
                    skill: skill.name,
                    action: "reactivated"
                });

                continue;
            }

            // User already has an active version
            skipped++;

            syncedSkills.push({
                id: existingUserSkill._id,
                skill: skill.name,
                action: "already-exists"
            });

            continue;
        }

        // --------------------------------------------------
        // Create UserSkill
        // --------------------------------------------------

        const userSkill = await UserSkill.create({
            userId,
            skillId: skill._id,

            // Initial proficiency because resume extraction
            // does not reliably determine exact proficiency.
            proficiency: 50,

            source: "resume",

            isVerified: false,

            lastUsed: null,

            // AI found this skill in the resume,
            // but it has not yet been verified.
            confidenceScore: 70,

            isActive: true,
            isDeleted: false,
            deletedAt: null
        });

        created++;

        syncedSkills.push({
            id: userSkill._id,
            skill: skill.name,
            action: "created"
        });
    }

    return {
        created,
        updated,
        skipped,
        totalProcessed: uniqueSkillNames.length,
        skills: syncedSkills
    };
};


/**
 * Escape special regex characters.
 */
const escapeRegex = (value) => {
    return value.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );
};


module.exports = {
    syncResumeSkillsToUser
};