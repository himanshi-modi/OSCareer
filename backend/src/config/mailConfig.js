const { google } = require("googleapis");

console.log(
  "GMAIL_CLIENT_ID:",
  process.env.GMAIL_CLIENT_ID ? "Loaded ✅" : "Missing ❌"
);

console.log(
  "GMAIL_CLIENT_SECRET:",
  process.env.GMAIL_CLIENT_SECRET ? "Loaded ✅" : "Missing ❌"
);

console.log(
  "GMAIL_REFRESH_TOKEN:",
  process.env.GMAIL_REFRESH_TOKEN ? "Loaded ✅" : "Missing ❌"
);

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({
  version: "v1",
  auth: oauth2Client,
});

module.exports = gmail;