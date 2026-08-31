const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateCareerInsights = async (context) => {

    try {

        console.log("🤖 Generating career insight with AI...");

        const prompt = `
You are the AI career coach for a student career development platform.

Your job is to generate ONE highly personalized daily career insight.

You MUST base the insight ONLY on the student's actual data provided below.

IMPORTANT RULES:

1. Do NOT invent skills, projects, certificates, achievements, resume scores,
   experience, or accomplishments.

2. Do NOT assume that completing a mission means the student has mastered
   the related skill.

3. If the skills array is empty, do NOT claim that the student is strong,
   weak, or developing in any particular skill.

4. Pay close attention to the relationship between:
   - current roadmap stage
   - stage progress
   - overall roadmap progress
   - completed missions
   - skipped missions
   - today's mission
   - recent completed missions
   - career goal
   - experience level
   - daily commitment

5. Recent activity is especially important. Use it to understand what the
   student has actually been working on recently.

6. Today's mission is especially important. If the student has an upcoming
   or not-started mission, consider whether completing it is the most useful
   action today.

7. Do not repeat the data mechanically. Interpret it.

8. The insight should feel like it was written specifically for THIS student.

9. Prefer concrete observations over generic motivational advice.

10. Keep the insight short:
    - title: 5-10 words
    - message: 1-2 sentences
    - The message should contain a useful observation or actionable next step.

11. Never tell the student to do something unrelated to their current roadmap
    unless the provided data strongly supports it.

12. If the student has recently completed foundational missions and today's
    mission moves them into the next stage, explicitly recognize that
    progression.

Student data:

${JSON.stringify(context, null, 2)}

Think about the following before generating the insight:

- What has the student actually accomplished recently?
- What stage are they currently working through?
- What is their immediate next step?
- Is there a meaningful gap between their progress and their goal?
- Is there a useful action they should take today?
- Is there something they should avoid rushing into?

Choose ONE of these insight types:

"progress"
Use when the student's recent activity or roadmap progress is worth highlighting.

"warning"
Use when there is a meaningful problem, stagnation, skipped work, or risk that
is clearly supported by the data.

"recommendation"
Use when there is a specific useful next action.

"achievement"
Use when the student has a meaningful accomplishment worth recognizing.

Choose priority:

"low"
Minor observation or encouragement.

"medium"
Useful and relevant action or observation.

"high"
An important issue or action that should receive immediate attention.

Return ONLY valid JSON.

Do not use markdown.
Do not include explanations.
Do not include code fences.

Return exactly:

{
    "title": "Short insight title",
    "message": "One or two sentence personalized insight.",
    "type": "progress",
    "priority": "medium"
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt
        });

        let text = response.text.trim();

        // Remove markdown code fences if Gemini returns them
        text = text
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        const insight = JSON.parse(text);

        return {
            title: insight.title,
            message: insight.message,
            type: insight.type,
            priority: insight.priority
        };

    } catch (error) {

        console.error(
            "❌ Career insight generation failed:",
            error
        );

        return {
            title: "Keep moving through your roadmap",
            message:
                "Continue working on your current roadmap mission and build progress consistently toward your career goal.",
            type: "recommendation",
            priority: "medium"
        };
    }
};

module.exports = {
    generateCareerInsights
};