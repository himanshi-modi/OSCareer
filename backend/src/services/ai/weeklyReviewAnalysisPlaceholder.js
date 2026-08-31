
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const generateWeeklyReviewAnalysis = async (review) => {

    const prompt = `
You are an AI career coach inside a career guidance application.

Analyze the user's weekly career progress and provide useful, personalized
feedback.

IMPORTANT RULES:

- Use ONLY the information provided in the weekly review data.
- Do NOT invent achievements, projects, skills, or progress.
- Do NOT make assumptions about information that is not provided.
- Keep the feedback specific to the user's actual progress.
- Be encouraging but honest.
- Do NOT exaggerate progress.
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap the JSON in code fences.
- consistencyScore must be an integer between 0 and 100.
- aiSuggestions must contain practical, actionable suggestions.
- aiSummary should briefly explain the user's performance this week.
- aiMotivation should be encouraging but based on the actual data.

Return EXACTLY this JSON structure:

{
  "aiSummary": "Short personalized summary of the user's week",

  "aiSuggestions": [
    "Actionable suggestion 1",
    "Actionable suggestion 2",
    "Actionable suggestion 3"
  ],

  "aiMotivation": "Short personalized motivational message",

  "consistencyScore": 0
}


WEEKLY REVIEW DATA:

Completed Missions:
${review.completedMissions ?? 0}

Total Missions:
${review.totalMissions ?? 0}

Roadmap Progress:
${review.roadmapProgress ?? 0}%

Career Readiness Score:
${review.readinessScore ?? 0}%

Skills Learned:
${review.skillsLearned?.length ?? 0}

Projects Completed:
${review.projectsCompleted?.length ?? 0}

Certificates Added:
${review.certificatesAdded?.length ?? 0}

Resume Updates:
${review.resumesUpdated?.length ?? 0}

Biggest Achievement:
${review.biggestAchievement || "Not provided"}

Biggest Challenge:
${review.biggestChallenge || "Not provided"}

Next Week Goal:
${review.nextWeekGoal || "Not provided"}

Confidence Level:
${review.confidenceLevel ?? "Not provided"}

Motivation Level:
${review.motivationLevel ?? "Not provided"}

Notes:
${review.notes || "Not provided"}
`;


    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });


    const text = response.text;

    console.log(
        "\n========== RAW WEEKLY REVIEW GEMINI RESPONSE ==========\n"
    );

    console.log(text);


    // Remove accidental markdown code fences
    const cleanedText = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();


    let result;


    try {

        result = JSON.parse(cleanedText);

    } catch (error) {

        console.error(
            "Failed to parse Weekly Review Gemini JSON:"
        );

        console.error(cleanedText);

        throw new Error(
            "Gemini returned an invalid Weekly Review JSON response."
        );
    }


    // Basic validation
    if (
        typeof result.aiSummary !== "string" ||
        !Array.isArray(result.aiSuggestions) ||
        typeof result.aiMotivation !== "string" ||
        typeof result.consistencyScore !== "number"
    ) {

        throw new Error(
            "Gemini returned an invalid Weekly Review structure."
        );
    }


    result.consistencyScore = Math.max(
        0,
        Math.min(
            100,
            Math.round(result.consistencyScore)
        )
    );


    return result;
};


module.exports = {
    generateWeeklyReviewAnalysis
};