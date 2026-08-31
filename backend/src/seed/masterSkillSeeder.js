const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
require("dotenv").config();

const Skill = require("../models/Skill");
const masterSkills = require("./data/masterSkills");

const seedMasterSkills = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected.");

    // --------------------------------------------------
    // Clear existing MasterSkill data
    // --------------------------------------------------

    console.log("\nClearing existing MasterSkill data...");

    const deleteResult = await Skill.deleteMany({});

    console.log(
      `Deleted ${deleteResult.deletedCount} existing skills.`
    );

    // --------------------------------------------------
    // Validate seed data
    // --------------------------------------------------

    if (!Array.isArray(masterSkills)) {
      throw new Error(
        "MasterSkill seed data must be an array."
      );
    }

    if (masterSkills.length === 0) {
      throw new Error(
        "No MasterSkill seed data found."
      );
    }

    // --------------------------------------------------
    // Insert MasterSkills
    // --------------------------------------------------

    console.log(
      `\nCreating ${masterSkills.length} MasterSkills...`
    );

    const createdSkills =
      await Skill.insertMany(masterSkills);

    // --------------------------------------------------
    // Summary
    // --------------------------------------------------

    console.log("\n========================================");
    console.log("MASTER SKILL SEEDING COMPLETED");
    console.log("========================================");

    console.log(
      `Skills created : ${createdSkills.length}`
    );

    console.log("========================================\n");

    // --------------------------------------------------
    // Close database connection
    // --------------------------------------------------

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error(
      "\nMasterSkill seeding failed."
    );

    console.error(error);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedMasterSkills();