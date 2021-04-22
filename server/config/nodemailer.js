const nodemailer = require("nodemailer");
const templates = require("../templates/confirmation-email")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const senderMail = process.env.EMAIL_USER;
const senderPW = process.env.EMAIL_PW;

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: senderMail, // generated ethereal user
    pass: senderPW, // generated ethereal password
  },
});

module.exports.sendConfirmationMail = (username, email, confirmationCode) => {
  transporter
    .sendMail({
      from: `Jammit Team <${senderMail}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `Jammit Account Confirmation`, // Subject line
      html: templates.templateExample(username, process.env.CONFIRMATION_URL + confirmationCode),
    })
    .catch((err) => console.log(err));
};
