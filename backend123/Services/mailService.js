const nodemailer = require("nodemailer");
class MailService {
  sendMail(to, link) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      from: "ToTo Pizza",
      to,
      subject: "Подтверждение почты",
      html: `
      <div>
      <p>Приветстуем вас, для подтверждения почты пройдите пожалуйста по ссылке: </p>
      <a href="${link}">${link}</a>
      <p>Если вы получили это письмо по ошибке, просто игнорируйте его.</p>
        </div>
      `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
module.exports = new MailService();
