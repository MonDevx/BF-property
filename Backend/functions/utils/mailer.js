const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const creds = require("../config");

const transport = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "../views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views/email"),
    extName: ".handlebars",
  })
);

if (process.env.MAILER_VERIFY_ON_STARTUP === "true") {
  transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("API WORK");
    }
  });
}

module.exports = transporter;
