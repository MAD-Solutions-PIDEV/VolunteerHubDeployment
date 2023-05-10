const nodemailer = require("nodemailer");

module.exports = async function sendEmailToOrganization(
  toEmail,
  subject,
  html
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        type: "plain"
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: toEmail,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (err) {
    console.error(err);
  }
};
