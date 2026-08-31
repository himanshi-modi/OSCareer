const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const analyzeResumeText = async (resumeText) => {

    const prompt = `
You are an expert resume analyzer for a career guidance application.

Analyze the resume provided below.

IMPORTANT RULES:

- Use ONLY information explicitly present in the resume.
- Do NOT invent, assume, or hallucinate information.
- If information is not present, return null or an empty array.
- Scores must be integers between 0 and 100.
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap the JSON in code fences.
- Dates should be returned in ISO format when possible.
- Preserve the actual names of technologies, companies, institutions, projects, and certificates from the resume.
- For each project, extract the GitHub repository URL if it is explicitly present in the resume.
- For each project, extract the live/demo/deployed application URL if it is explicitly present in the resume.
- Do NOT construct, guess, or infer URLs.
- Do NOT generate a GitHub URL from the project name.
- Do NOT generate a live demo URL from the project name.
- If a GitHub URL is not explicitly present, return null.
- If a live/demo URL is not explicitly present, return null.
- Preserve URLs exactly as they appear in the resume whenever possible.
- Extract project-specific URLs only when you can reasonably associate them with that project.

Return EXACTLY this JSON structure:

{
  "summary": "Short summary of the candidate",

  "resumeScore": 0,
  "recruiterScore": 0,
  "atsScore": 0,

  "extractedSkills": [
    {
      "name": "Spring Boot",
      "category": "Backend"
    }
  ],

  "extractedProjects": [
  {
    "name": "Project name",
    "description": "Project description",

    "technologies": [
      "technology 1",
      "technology 2"
    ],

    

    "githubUrl": null,

    "liveUrl": null
  }
],

  "extractedExperience": [
    {
      "company": "Company name",
      "role": "Job role",
      "startDate": null,
      "endDate": null,
      "description": "Experience description"
    }
  ],

  "extractedEducation": [
    {
      "degree": "Degree name",
      "institution": "Institution name",
      "fieldOfStudy": "Field of study",
      "startDate": null,
      "endDate": null
    }
  ],

  "extractedCertificates": [
    {
      "name": "Certificate name",
      "issuer": "Certificate issuer",
      "issueDate": null
    }
  ],

  "strengths": [
    "strength 1",
    "strength 2"
  ],

  "weaknesses": [
    "weakness 1",
    "weakness 2"
  ],

  "missingSkills": [
    "skill 1",
    "skill 2"
  ],

  "improvementAreas": [
    "improvement area 1",
    "improvement area 2"
  ],

  "aiSuggestions": [
    "suggestion 1",
    "suggestion 2"
  ],

  "aiInsights": "Overall AI insight about the candidate"
}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    const text = response.text;

    console.log("\n========== RAW GEMINI RESPONSE ==========\n");
    console.log(text);

    // Remove accidental markdown code fences if Gemini adds them
    const cleanedText = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    let result;

    try {
        result = JSON.parse(cleanedText);
    } catch (error) {
        console.error("Failed to parse Gemini JSON:");
        console.error(cleanedText);

        throw new Error(
            "Gemini returned an invalid JSON response."
        );
    }

    return result;
};

module.exports = {
    analyzeResumeText
};