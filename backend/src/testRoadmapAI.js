require("dotenv").config();

const {
    regenerateRoadmapWithAI
} = require("./services/ai/roadmapAIService");

const test = async () => {

    try {

        const careerProfile = {
            targetCareer: "Full Stack Developer",
            careerPriority: "JOB",
            targetTimeline: "6_MONTHS",
            dailyCommitment: 3,
            experienceLevel: "INTERMEDIATE",
            educationLevel: "BACHELORS",
            internshipPreference: "NO_PREFERENCE"
        };

        const currentRoadmap = {
            roadmapId: "current-roadmap-123",
            progress: 35,
            completedStages: 2,
            totalStages: 7
        };

        const currentStages = [
            {
                stageTemplateId: "stage-1",
                stageOrder: 1,
                title: "Web Development Foundations",
                status: "completed"
            },
            {
                stageTemplateId: "stage-2",
                stageOrder: 2,
                title: "Frontend Development with React",
                status: "completed"
            },
            {
                stageTemplateId: "stage-3",
                stageOrder: 3,
                title: "Backend and REST APIs",
                status: "in-progress"
            },
            {
                stageTemplateId: "stage-4",
                stageOrder: 4,
                title: "Databases and Data Modeling",
                status: "locked"
            },
            {
                stageTemplateId: "stage-5",
                stageOrder: 5,
                title: "Authentication and Full Stack Integration",
                status: "locked"
            },
            {
                stageTemplateId: "stage-6",
                stageOrder: 6,
                title: "Full Stack Production Project",
                status: "locked"
            },
            {
                stageTemplateId: "stage-7",
                stageOrder: 7,
                title: "Deployment and Career Readiness",
                status: "locked"
            }
        ];

        const stageTemplates = [
            {
                _id: "stage-1",
                stageOrder: 1,
                title: "Web Development Foundations",
                description:
                    "Build a strong foundation in HTML, CSS, JavaScript, responsive design, browser fundamentals, and Git.",
                estimatedDuration: 20
            },
            {
                _id: "stage-2",
                stageOrder: 2,
                title: "Frontend Development with React",
                description:
                    "Learn React and build modern, component-based frontend applications.",
                estimatedDuration: 25
            },
            {
                _id: "stage-3",
                stageOrder: 3,
                title: "Backend and REST APIs",
                description:
                    "Learn backend development and create maintainable REST APIs using Node.js and Express.",
                estimatedDuration: 25
            },
            {
                _id: "stage-4",
                stageOrder: 4,
                title: "Databases and Data Modeling",
                description:
                    "Learn relational and NoSQL databases and understand how to design data models for full-stack applications.",
                estimatedDuration: 20
            },
            {
                _id: "stage-5",
                stageOrder: 5,
                title: "Authentication and Full Stack Integration",
                description:
                    "Connect the frontend, backend, and database into a secure full-stack application.",
                estimatedDuration: 25
            },
            {
                _id: "stage-6",
                stageOrder: 6,
                title: "Full Stack Production Project",
                description:
                    "Build a complete production-style full-stack application from planning through implementation and testing.",
                estimatedDuration: 30
            },
            {
                _id: "stage-7",
                stageOrder: 7,
                title: "Deployment and Career Readiness",
                description:
                    "Deploy the application and turn the completed project into a strong portfolio and interview asset.",
                estimatedDuration: 15
            }
        ];

        const reason =
            "I already know the fundamentals, so I want to skip beginner topics and focus on advanced development.";

        console.log(
            "\n========== TESTING AI ROADMAP REGENERATION ==========\n"
        );

        const result =
            await regenerateRoadmapWithAI({
                careerProfile,
                currentRoadmap,
                currentStages,
                stageTemplates,
                reason
            });

        console.log(
            "\n========== AI RESULT ==========\n"
        );

        console.log(
            JSON.stringify(result, null, 2)
        );

    } catch (error) {

        console.error(
            "\n========== AI TEST FAILED ==========\n"
        );

        console.error(error);

    }
};

test();