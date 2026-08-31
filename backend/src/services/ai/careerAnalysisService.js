const { regenerateRoadmapWithAI} = require("./roadmapAIService");
const analyzeCareerProfile = async (
    careerProfile,
    roadmapTemplate,
    stageTemplates
) => {

    const {
        experienceLevel,
        careerPriority,
        targetTimeline,
        dailyCommitment,
        educationLevel,
        currentYear,
        internshipPreference,
        currentGoal
    } = careerProfile;

    let startingStageIndex = 0;
    const skippedStages = [];
    const reasons = [];

    // ============================================================
    // 1. EXPERIENCE LEVEL
    // ============================================================

    if (experienceLevel === "INTERMEDIATE") {

        startingStageIndex = Math.min(
            1,
            stageTemplates.length - 1
        );

        skippedStages.push(0);

        reasons.push(
            "Your intermediate experience allows you to move past the foundational stage."
        );

    } else if (experienceLevel === "ADVANCED") {

        startingStageIndex = Math.min(
            2,
            stageTemplates.length - 1
        );

        for (let i = 0; i < startingStageIndex; i++) {
            skippedStages.push(i);
        }

        reasons.push(
            "Your advanced experience allows you to skip foundational stages and focus on higher-level development."
        );

    } else {

        startingStageIndex = 0;

        reasons.push(
            "Your beginner experience means the roadmap starts with the fundamentals."
        );
    }


    // ============================================================
    // 2. CAREER PRIORITY
    // ============================================================

    if (careerPriority === "INTERNSHIP") {

        reasons.push(
            "The roadmap is oriented toward internship readiness."
        );

    } else if (careerPriority === "JOB") {

        reasons.push(
            "The roadmap is focused on preparing you for full-time employment."
        );

    } else if (careerPriority === "FREELANCING") {

        reasons.push(
            "The roadmap emphasizes practical skills useful for freelancing."
        );

    } else if (careerPriority === "HIGHER_STUDIES") {

        reasons.push(
            "The roadmap is oriented toward building a strong academic and technical foundation."
        );

    } else if (careerPriority === "CAREER_SWITCH") {

        reasons.push(
            "The roadmap prioritizes building the skills required for your career transition."
        );
    }


    // ============================================================
    // 3. TIMELINE
    // ============================================================

    if (targetTimeline === "1_MONTH") {

        reasons.push(
            "Your one-month target requires a focused and intensive learning path."
        );

    } else if (targetTimeline === "3_MONTHS") {

        reasons.push(
            "Your three-month target provides a focused preparation window."
        );

    } else if (targetTimeline === "6_MONTHS") {

        reasons.push(
            "Your six-month target allows for steady skill development and project work."
        );

    } else if (targetTimeline === "12_MONTHS") {

        reasons.push(
            "Your twelve-month target allows for deeper learning and portfolio development."
        );
    }


    // ============================================================
    // 4. DAILY COMMITMENT
    // ============================================================

    if (dailyCommitment <= 2) {

        reasons.push(
            `Your ${dailyCommitment}-hour daily commitment keeps the roadmap focused on essential skills.`
        );

    } else if (dailyCommitment >= 5) {

        reasons.push(
            `Your ${dailyCommitment}-hour daily commitment allows for deeper practice and additional projects.`
        );
    }


    // ============================================================
    // 5. EDUCATION
    // ============================================================

    if (educationLevel === "BACHELORS") {

        reasons.push(
            "Your bachelor's-level background is considered when planning the learning path."
        );
    }


    // ============================================================
    // 6. INTERNSHIP PREFERENCE
    // ============================================================

    if (
        careerPriority === "INTERNSHIP" &&
        internshipPreference &&
        internshipPreference !== "NO_PREFERENCE"
    ) {

        reasons.push(
            `Your internship preference is ${internshipPreference.toLowerCase()}.`
        );
    }


    // ============================================================
    // FINAL PERSONALIZATION REASON
    // ============================================================

    const personalizationReason =
        reasons.join(" ");


    return {
        startingStage: stageTemplates[startingStageIndex],

        startingStageIndex,

        skippedStages,

        personalizationReason
    };
};


// ================================================================
// ROADMAP REGENERATION
// ================================================================

const regenerateRoadmap = async (
    careerProfile,
    currentRoadmap,
    currentStages,
    roadmapTemplate,
    stageTemplates,
    reason
) => {

    console.log(
        "\n========== AI ROADMAP REGENERATION =========="
    );

    console.log(
        "Regeneration reason:",
        reason
    );

    const aiResult =
        await regenerateRoadmapWithAI({
            careerProfile,
            currentRoadmap,
            currentStages,
            stageTemplates,
            reason
        });

    console.log(
        "\n========== AI ROADMAP RESULT =========="
    );

    console.log(
        JSON.stringify(
            aiResult,
            null,
            2
        )
    );

    return aiResult;
};


module.exports = {
    analyzeCareerProfile,
    regenerateRoadmap
};