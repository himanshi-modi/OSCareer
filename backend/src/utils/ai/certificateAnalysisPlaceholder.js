const generateCertificateAnalysis = (certificate, skills) => {
    const skillIds = skills.map(skill => skill.skillId._id);

    const relevanceScore = Math.min(
        100,
        50 + skillIds.length * 10
    );

    let feedback = "";

    if (skillIds.length >= 5) {
        feedback =
            "Excellent certificate with strong skill coverage. Continue building projects to showcase these skills.";
    } else if (skillIds.length >= 3) {
        feedback =
            "Good certificate. Adding a few more relevant skills can improve your profile.";
    } else {
        feedback =
            "Consider adding more skills related to this certificate for better career recommendations.";
    }

    return {
        relevanceScore,
        verifiedSkills: skillIds,
        missingRelatedSkills: [],
        aiFeedback: feedback
    };
};

module.exports = {
    generateCertificateAnalysis
};