const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async (email) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const emailConfig = {
    to: email,
    from: "oksa@gmail.com",
    subject: "Your subscription",
    text: "You have been subscribed successfully",
  };

  await transport.sendMail(emailConfig);
};

module.exports = sendEmail;
