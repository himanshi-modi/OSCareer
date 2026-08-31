require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const Resume = require("./models/Resume");
const {
    extractResumeText
} = require("./services/resumeServices/resumeTextExtractionService");

const MONGO_URI = process.env.MONGO_URL;

const test = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected");

        // Get the latest resume
        const resume = await Resume.findOne({
            isDeleted: false
        })
            .sort({ createdAt: -1 })
            .select("storageKey fileName");

        if (!resume) {
            console.log("No resume found");
            return;
        }

        console.log("Resume:", resume.fileName);
        console.log("Storage key:", resume.storageKey);

        const text = await extractResumeText(resume.storageKey);

        console.log("\n========== EXTRACTED TEXT ==========\n");
        console.log(text);
        console.log("\n========== END ==========\n");

    } catch (error) {
        console.error("Resume extraction test failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
};

test();