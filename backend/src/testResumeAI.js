require("dotenv").config();

const {
    analyzeResumeText
} = require("./services/ai/resumeAnalysisAIService");

const resumeText = `
Himanshi Modi
Computer Science student with backend development skills
in Java Spring Boot and JavaScript Node.js Express.js.

Skills:
MongoDB, Express.js, Node.js, Java, Spring Boot,
Spring Security, JWT, REST APIs, React, TypeScript,
Docker, Git.

Projects:
WanderLust Listing Application using Node.js,
Express.js, MongoDB and EJS.

RBAC Authentication System using Spring Boot,
React and TypeScript.

Hospital Management System using Spring Boot,
Spring Security, PostgreSQL and Docker.

Education:
B.Sc. Computer Science.
`;

const test = async () => {

    try {

        const result = await analyzeResumeText(resumeText);

        console.log("\n========== AI ANALYSIS ==========\n");

        console.log(result);

        console.log("\n========== END ==========\n");

    } catch (error) {

        console.error("AI analysis failed:");

        console.error(error);
    }
};

test();