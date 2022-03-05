import nodemailer from "nodemailer";
import log from "./logger"
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD,
  },
});
const sendMail = async (data,to,subject) => {
  const mainOptions = {
    from: `"da29.me" ${process.env.SMTP_USER}`,
    to,
    subject: subject,
    html: data,
  };

  transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
      log.error(err)
      throw err
    } else {
      log.info("Message sent: " + info.response)
    }
  });
};
export default sendMail;
