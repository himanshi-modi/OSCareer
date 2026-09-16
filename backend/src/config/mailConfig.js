const dns = require("dns");
const nodemailer = require("nodemailer");

dns.setDefaultResultOrder("ipv4first");

console.log("EMAIL_USER:", process.env.EMAIL_USER);

console.log(
  "EMAIL_PASSWORD:",
  process.env.EMAIL_PASSWORD ? "Loaded" : "Missing"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  connectionTimeout: 10000,
  greetingTimeout: 10000,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;