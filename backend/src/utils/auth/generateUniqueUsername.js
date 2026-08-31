const User = require("../../models/User");

const generateUniqueUsername = async (name, email) => {

    let baseUsername = name
        ? name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")
        : email
            .split("@")[0]
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

    if (!baseUsername) {
        baseUsername = "user";
    }

    let username = baseUsername;
    let counter = 1;

    while (await User.findOne({ username })) {
        username = `${baseUsername}${counter}`;
        counter++;
    }

    return username;
};

module.exports = generateUniqueUsername;