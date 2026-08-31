const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const regenerateRoadmapWithAI = async ({
    careerProfile,
    currentRoadmap,
    currentStages,
    stageTemplates,
    reason
}) => {

    const prompt = `
You are an AI career roadmap personalization engine for CareerOS.

Your job is to analyze the user's current career state and determine how
their existing roadmap should be regenerated.

IMPORTANT RULES:

1. Do NOT invent stages.
2. You may ONLY use the provided stage templates.
3. Completed stages should normally be preserved.
4. The user's regeneration reason must influence your decision.
5. You may choose:
   - "preserve"
   - "modify"
   - "skip"
   - "remove"
6. Do NOT remove completed stages.
7. Do NOT skip a completed stage.
8. The startingStageIndex must refer to the first stage that the user
   actually needs to work on.
9. Return ONLY valid JSON.
10. Do NOT use markdown.
11. Do NOT wrap the JSON in code fences.

USER CAREER PROFILE:

${JSON.stringify(careerProfile, null, 2)}

CURRENT ROADMAP:

${JSON.stringify(currentRoadmap, null, 2)}

CURRENT USER STAGES:

${JSON.stringify(currentStages, null, 2)}

AVAILABLE STAGE TEMPLATES:

${JSON.stringify(stageTemplates, null, 2)}

USER'S REGENERATION REASON:

${reason}

Return EXACTLY this structure:

{
    "startingStageIndex": 0,

    "personalizationReason": "Explain why the roadmap was changed.",

    "stages": [
        {
            "stageTemplateId": "template id",
            "action": "preserve"
        }
    ]
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    const text = response.text;

    console.log(
        "\n========== RAW GEMINI ROADMAP RESPONSE ==========\n"
    );

    console.log(text);

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
            "Failed to parse Gemini roadmap JSON:"
        );

        console.error(cleanedText);

        throw new Error(
            "Gemini returned an invalid roadmap JSON response."
        );
    }

    return result;
};

module.exports = {
    regenerateRoadmapWithAI
};