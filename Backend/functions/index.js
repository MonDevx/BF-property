const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const path = require("path");
const transporter = require("./utils/mailer");
const realestateRoutes = require("./routes/realestate");
const subscribeRoutes = require("./routes/subscribe");
const usersRoutes = require("./routes/users");

admin.initializeApp();

const app = express();
const main = express();

app.use(cors());
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: true }));

app.use(realestateRoutes);
app.use(subscribeRoutes);
app.use(usersRoutes);

exports.webApi = functions.https.onRequest(main);

const EMAIL_ATTACHMENTS = [
  {
    filename: "email.png",
    path: path.resolve(__dirname, "public/images/email.png"),
    cid: "email",
  },
  {
    filename: "facebook.png",
    path: path.resolve(__dirname, "public/images/facebook.png"),
    cid: "facebook",
  },
];

exports.sendMaillistOverHTTP = functions.https.onRequest((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://msbfproperty.firebaseapp.com");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

  transporter.sendMail(
    {
      from: "noreplybfproperty@gmail.com",
      to: req.body.emaillist,
      subject: req.body.textheader,
      template: "emailnotification",
      context: { textdetail: req.body.textdetail },
      attachments: EMAIL_ATTACHMENTS,
    },
    (error) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("success");
    }
  );
});

exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.bf-property.com");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  transporter.sendMail(
    {
      from: "noreplybfproperty@gmail.com",
      to: req.body.emailowner,
      subject: "ประกาศขายบ้านของคุณได้รับความสนใจ",
      template: "emailcontact",
      context: {
        propertyname: req.body.propertyname,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      attachments: EMAIL_ATTACHMENTS,
    },
    (error) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("success");
    }
  );
});

