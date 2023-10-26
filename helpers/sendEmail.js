const nodemailer = require("nodemailer");

const sendEmail = async (email) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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
