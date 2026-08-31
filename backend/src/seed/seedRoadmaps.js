const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
require("dotenv").config();

// Models
const RoadmapTemplate = require("../models/RoadmapTemplate");
const StageTemplate = require("../models/StageTemplate");
const MissionTemplate = require("../models/MissionTemplate");
const StageChallengeTemplate = require("../models/StageChallengeTemplate");

// Roadmap seed data
const mernRoadmap = require("./data/mernRoadmap");
const javaBackendRoadmap = require("./data/javaBackendRoadmap");
const fullStackRoadmap = require("./data/fullStackRoadmap");
const frontendRoadmap = require("./data/frontendRoadmap");
const backendRoadmap = require("./data/backendRoadmap");
const pythonRoadmap = require("./data/pythonRoadmap");
const dataAnalystRoadmap = require("./data/dataAnalystRoadmap");
const dataScientistRoadmap = require("./data/dataScientistRoadmap");
const devopsRoadmap = require("./data/devopsRoadmap");
const cybersecurityRoadmap = require("./data/cybersecurityRoadmap");

// All roadmap seed files
const roadmaps = [
  mernRoadmap,
  javaBackendRoadmap,
  fullStackRoadmap,
  frontendRoadmap,
  backendRoadmap,
  pythonRoadmap,
  dataAnalystRoadmap,
  dataScientistRoadmap,
  devopsRoadmap,
  cybersecurityRoadmap,
];

const seedRoadmaps = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected.");

    // --------------------------------------------------
    // Clear existing roadmap template data
    // --------------------------------------------------

    console.log("Clearing existing roadmap data...");

    // Delete child documents first
    await MissionTemplate.deleteMany({});
    await StageChallengeTemplate.deleteMany({});
    await StageTemplate.deleteMany({});
    await RoadmapTemplate.deleteMany({});

    console.log("Existing roadmap data cleared.");

    // --------------------------------------------------
    // Seed roadmaps
    // --------------------------------------------------

    let totalRoadmaps = 0;
    let totalStages = 0;
    let totalMissions = 0;
    let totalChallenges = 0;

    for (const roadmapData of roadmaps) {
      const {
        roadmap,
        stages,
        challenges = [],
      } = roadmapData;

      if (!roadmap) {
        throw new Error("Roadmap data is missing.");
      }

      if (!Array.isArray(stages)) {
        throw new Error(
          `Stages missing for roadmap "${roadmap.title}"`
        );
      }

      // -----------------------------------------------
      // 1. Create RoadmapTemplate
      // -----------------------------------------------

      const createdRoadmap = await RoadmapTemplate.create({
        ...roadmap,

        // Keep totalStages accurate even if the
        // seed file is changed later.
        totalStages: stages.length,
      });

      totalRoadmaps++;

      console.log(
        `\nRoadmap created: ${createdRoadmap.title}`
      );

      // -----------------------------------------------
      // 2. Create StageTemplates
      // -----------------------------------------------

      for (const stageData of stages) {
        const {
          missions,
          ...stage
        } = stageData;

        if (!Array.isArray(missions)) {
          throw new Error(
            `Missions missing in stage "${stage.title}" of roadmap "${roadmap.title}"`
          );
        }

        const createdStage = await StageTemplate.create({
          ...stage,

          roadmapTemplateId: createdRoadmap._id,

          // Keep mission count synchronized
          totalMissions: missions.length,
        });

        totalStages++;

        console.log(
          `  Stage created: ${createdStage.title}`
        );

        // ---------------------------------------------
        // 3. Create MissionTemplates
        // ---------------------------------------------

        const missionDocuments = missions.map(
          (mission) => ({
            ...mission,

            stageTemplateId: createdStage._id,
          })
        );

        if (missionDocuments.length > 0) {
          await MissionTemplate.insertMany(
            missionDocuments
          );

          totalMissions += missionDocuments.length;
        }

        console.log(
          `    Missions created: ${missionDocuments.length}`
        );

        // ---------------------------------------------
        // 4. Create StageChallengeTemplate
        // ---------------------------------------------

        const challenge = challenges.find(
          (challenge) =>
            challenge.stageOrder ===
            createdStage.stageOrder
        );

        if (challenge) {
          await StageChallengeTemplate.create({
            stageTemplateId: createdStage._id,

            challengeType:
              challenge.challengeType,

            objective:
              challenge.objective,

            requiredSkills:
              challenge.requiredSkills,

            evaluationCriteria:
              challenge.evaluationCriteria,

            isActive: true,
          });

          totalChallenges++;

          console.log(
            `    Challenge created for stage ${challenge.stageOrder}`
          );
        }
      }
    }

    // --------------------------------------------------
    // Summary
    // --------------------------------------------------

    console.log("\n========================================");
    console.log("ROADMAP SEEDING COMPLETED");
    console.log("========================================");

    console.log(`Roadmaps   : ${totalRoadmaps}`);
    console.log(`Stages     : ${totalStages}`);
    console.log(`Missions   : ${totalMissions}`);
    console.log(`Challenges : ${totalChallenges}`);

    console.log("========================================\n");

    // --------------------------------------------------
    // Close database connection
    // --------------------------------------------------

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("\nRoadmap seeding failed.");
    console.error(error);

    // Make sure the connection is closed
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedRoadmaps();