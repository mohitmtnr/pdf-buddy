import nodemailer from "nodemailer";

const sendEmail = ({ receiverEmail, emailBody, subject }, callback) => {
  const sender = process.env.GMAIL_USER;
  const password = process.env.GMAIL_PASSWORD;
  const tranporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: sender,
      pass: password,
    },
  });

  const mailOptions = {
    from: sender,
    to: receiverEmail,
    subject: subject,
    html: emailBody,
  };

  tranporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, info);
    }
  });
};

export default sendEmail;
