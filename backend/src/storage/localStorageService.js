const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const RESUME_STORAGE_DIR = path.join(
    process.cwd(),
    "uploads",
    "resumes"
);

const ensureStorageDirectory = async () => {
    await fs.mkdir(RESUME_STORAGE_DIR, {
        recursive: true
    });
};

const generateStorageKey = (userId, version, fileName) => {
    const extension = path.extname(fileName).toLowerCase();

    const uniqueId = crypto
        .randomUUID()
        .replace(/-/g, "");

    return `resumes/${userId}/v${version}/${uniqueId}${extension}`;
};

const uploadFile = async ({
    buffer,
    userId,
    version,
    fileName
}) => {
    await ensureStorageDirectory();

    const storageKey = generateStorageKey(
        userId,
        version,
        fileName
    );

    const relativePath = storageKey.replace(
        /^resumes\//,
        ""
    );

    const filePath = path.join(
        RESUME_STORAGE_DIR,
        relativePath
    );

    await fs.mkdir(
        path.dirname(filePath),
        {
            recursive: true
        }
    );

    await fs.writeFile(
        filePath,
        buffer
    );

    return {
        storageKey,
        fileUrl: `/uploads/${relativePath}`
    };
};

const deleteFile = async (storageKey) => {
    if (!storageKey) {
        return;
    }

    const relativePath = storageKey.replace(
        /^resumes\//,
        ""
    );

    const filePath = path.join(
        RESUME_STORAGE_DIR,
        relativePath
    );

    try {
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }
};
const readFile = async (storageKey) => {
    if (!storageKey) {
        throw new Error("Storage key is required");
    }

    const relativePath = storageKey.replace(/^resumes\//,"");

    const filePath = path.join( RESUME_STORAGE_DIR, relativePath);
    return await fs.readFile(filePath);
};

module.exports = {
    uploadFile,
    deleteFile,
    readFile
};
