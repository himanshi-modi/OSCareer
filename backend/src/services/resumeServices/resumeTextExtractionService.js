
const { PDFParse } = require("pdf-parse");

const storageService = require("../../storage/localStorageService");

const extractResumeText = async (storageKey) => {

    if (!storageKey) {
        throw new Error("Storage key is required");
    }

    const fileBuffer = await storageService.readFile(storageKey);

    if (!fileBuffer) {
        throw new Error("Resume file could not be read");
    }

    const parser = new PDFParse({
        data: fileBuffer
    });

    try {

        console.log("📄 Parsing resume PDF...");

        const result = await parser.getText();

        console.log("TEXT RESULT:", result);
        console.log("EXTRACTED TEXT:", result.text);
        console.log("TEXT LENGTH:", result.text?.length);

        if (!result.text || !result.text.trim()) {
            throw new Error(
                "No text could be extracted from the resume."
            );
        }

        return {
            text: result.text,
            hyperlinks: []
        };

    } finally {

        await parser.destroy();

    }
};


module.exports = {
    extractResumeText
};

