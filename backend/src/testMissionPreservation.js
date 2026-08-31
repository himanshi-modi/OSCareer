require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const UserRoadmap = require("./models/UserRoadmap");
const UserStage = require("./models/UserStage");
const UserMissionProgress = require("./models/UserMissionProgress");

const MONGO_URI = process.env.MONGO_URL;

const USER_ID = "6a8b192df9135073ca391060";

const run = async () => {

    try {

        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected!");

        // ============================================================
        // 1. FIND CURRENT ACTIVE ROADMAP
        // ============================================================

        const roadmap = await UserRoadmap.findOne({
            userId: USER_ID,
            isActive: true,
            isDeleted: false
        }).sort({
            createdAt: -1
        });

        if (!roadmap) {
            throw new Error("Active roadmap not found.");
        }

        console.log(
            "Active roadmap:",
            roadmap._id.toString()
        );

        // ============================================================
        // 2. FIND STAGES
        // ============================================================

        const stages = await UserStage.find({
            userRoadmapId: roadmap._id,
            isDeleted: false
        }).sort({
            createdAt: 1
        });

        console.log(
            "Stages found:",
            stages.length
        );

        if (stages.length < 2) {
            throw new Error(
                "Need at least 2 stages for this test."
            );
        }

        // Stage 2
        const stage2 = stages[1];

        console.log(
            "Testing Stage 2:",
            stage2._id.toString()
        );

        // ============================================================
        // 3. FIND STAGE 2 MISSIONS
        // ============================================================

        const missions =
            await UserMissionProgress.find({
                userStageId: stage2._id,
                isDeleted: false
            }).sort({
                createdAt: 1
            });

        console.log(
            "Stage 2 missions:",
            missions.length
        );

        if (missions.length < 2) {
            throw new Error(
                "Need at least 2 missions in Stage 2."
            );
        }

        // ============================================================
        // 4. CREATE TEST PROGRESS
        // ============================================================

        const completedMission = missions[0];

        completedMission.status = "completed";
        completedMission.progress = 100;
        completedMission.feedback =
            "Test completed mission";
        completedMission.completedAt = new Date();

        await completedMission.save();

        const inProgressMission = missions[1];

        inProgressMission.status = "in-progress";
        inProgressMission.progress = 60;
        inProgressMission.feedback =
            "Test partially completed mission";
        inProgressMission.completedAt = null;

        await inProgressMission.save();

        // ============================================================
        // 5. DISPLAY WHAT WE CREATED
        // ============================================================

        console.log("\n========== TEST DATA ==========\n");

        console.log({
            completedMission: {
                id: completedMission._id,
                missionTemplateId:
                    completedMission.missionTemplateId,
                status: completedMission.status,
                progress: completedMission.progress,
                feedback: completedMission.feedback
            },

            inProgressMission: {
                id: inProgressMission._id,
                missionTemplateId:
                    inProgressMission.missionTemplateId,
                status: inProgressMission.status,
                progress: inProgressMission.progress,
                feedback: inProgressMission.feedback
            }
        });

        console.log(
            "\nTest data created successfully."
        );

    } catch (error) {

        console.error(
            "Test failed:",
            error
        );

    } finally {

        await mongoose.disconnect();

    }
};

run();