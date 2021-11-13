const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const creds = require("./config");
const express = require("express");
const cors = require("cors");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
//initialize firebase inorder to access its services
admin.initializeApp();
//initialize express server
const app = express();
const main = express();

var corsOptions = {
  origin: "https://bfproperty.firebaseapp.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const middleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    // eslint-disable-next-line callback-return
    next();
  } else {
    res.send("error");
  }
};
//add the path to receive request and set json as bodyParser to process the body
app.use(cors());
main.use("/api/v1", app);

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: true }));

//initialize the database and the collection
const db = admin.firestore();
const storage = admin.storage();

const subscribeCollection = "subscribe";
const realestateCollection = "property";
const usersCollection = "users";
//define google cloud function name
exports.webApi = functions.https.onRequest(main);
var transport = {
  host: "smtp.gmail.com", // e.g. smtp.gmail.com
  port: 465,
  secure: true,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

var transporter = nodemailer.createTransport(transport);
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "views/email"),
    extName: ".handlebars",
  })
);
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("API WORK");
  }
});

exports.sendMaillistOverHTTP = functions.https.onRequest((req, res) => {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://msbfproperty.firebaseapp.com"
  );

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)

  transporter.sendMail(
    {
      from: `noreplybfproperty@gmail.com`,
      to: req.body.emaillist,
      subject: req.body.textheader,
      template: "emailnotification",
      context: {
        textdetail: req.body.textdetail,
      },
      attachments: [
        {
          filename: "email.png",
          path: path.resolve(__dirname, "public/images/email.png"),
          cid: "email", //same cid value as in the html img src
        },
        {
          filename: "facebook.png",
          path: path.resolve(__dirname, "public/images/facebook.png"),
          cid: "facebook", //same cid value as in the html img src
        },
      ],
    },
    function (error, data) {
      if (error) {
        return res.status(400).send(error);
      }
      return res.status(200).send("success");
    }
  );
});
exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "https://www.bf-property.com");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  transporter.sendMail(
    {
      from: `noreplybfproperty@gmail.com`,
      to: req.body.emailowner,
      subject: "ประกาศขายบ้านของคุณได้รับความสนใจ",
      template: "emailcontact",
      context: {
        propertyname: req.body.propertyname,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      attachments: [
        {
          filename: "email.png",
          path: path.resolve(__dirname, "public/images/email.png"),
          cid: "email", //same cid value as in the html img src
        },
        {
          filename: "facebook.png",
          path: path.resolve(__dirname, "public/images/facebook.png"),
          cid: "facebook", //same cid value as in the html img src
        },
      ],
    },
    function (error, data) {
      if (error) {
        return res.status(400).send(error);
      }
      return res.status(200).send("success");
    }
  );
});

// eslint-disable-next-line consistent-return
app.post("/subscribe", async (req, res) => {
  try {
    const subscribe = {
      email: req.body["email"],
      subscribeAt: new Date(),
    };

    await db
      .collection(subscribeCollection)
      .add(subscribe)
      .then(() => {
        return res.status(200);
      });
  } catch (error) {
    return res.status(400).send(error);
  }
});
app.get(
  "/realestatedetail/:realestatename",
  cors(corsOptions),
  async (req, res) => {
    const realestatename = req.params.realestatename;
    await db
      .collection(realestateCollection)
      .where("name", "==", realestatename)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) throw new Error("Realestate not found");
        return querySnapshot.forEach((realestate) => {
          const data = realestate.data();
          delete data.idowner;
          return res.status(200).json({ id: realestate.id, data: data });
        });
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  }
);
app.get(
  "/editrealestatedetail/:realestateId",
  middleware,
  cors(corsOptions),
  async (req, res) => {
    const realestateId = req.params.realestateId;
    await db
      .collection(realestateCollection)
      .doc(realestateId)
      .get()
      .then((realestate) => {
        if (!realestate.exists) throw new Error("Realestate not found");
        const data = realestate.data();
        delete data.idowner;
        return res
          .status(200)
          .json({ id: realestate.id, data: data });
      })
      .catch((error) => res.status(500).send(error));
  }
);
app.get(
  "/myrealestatelist",
  middleware,
  cors(corsOptions),
  async (req, res) => {
    let decodedToken = await admin.auth().verifyIdToken(req.token);
    await db
      .collection(realestateCollection)
      .where("idowner", "==", decodedToken.uid)
      .orderBy("createat", "asc")
      .get()
      .then((querySnapshot) => {
        var realestatelist = [];
        querySnapshot.forEach((doc) => {
          let dict = {
            id: doc.id,
            name: doc.data().name,
            propertysize: doc.data().propertysize,
            numberofbathrooms: doc.data().numberofbathrooms,
            numberofbedrooms: doc.data().numberofbedrooms,
            price: doc.data().price,
            zipCode: doc.data().zipCode,
            province: doc.data().province,
            subDistrict: doc.data().subDistrict,
            district: doc.data().district,
            address: doc.data().address,
            idtype: doc.data().idtype,
            firstimg: doc.data().firstimg,
            status: doc.data().status,
            urlimginside: doc.data().urlimginside,
            urlimgoutside: doc.data().urlimgoutside,
          };
          realestatelist.push(dict);
        });
        return res.status(200).json(realestatelist);
      })
      .catch((error) => res.status(500).send(error));
  }
);
app.get(
  "/favoriterealestatelist",
  middleware,
  cors(corsOptions),
  async (req, res) => {
    let arr = [];
    if (
      typeof req.query.favoritelist === "string" ||
      req.query.favoritelist instanceof String
    ) {
      arr.push(req.query.favoritelist);
    } else {
      arr = req.query.favoritelist;
    }
    await db
      .collection(realestateCollection)
      .where(admin.firestore.FieldPath.documentId(), "in", arr)
      .get()
      .then((querySnapshot) => {
        var realestatelist = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().status !== 4) {
            let dict = {
              id: doc.id,
              name: doc.data().name,
              propertysize: doc.data().propertysize,
              numberofbathrooms: doc.data().numberofbathrooms,
              numberofbedrooms: doc.data().numberofbedrooms,
              price: doc.data().price,
              zipCode: doc.data().zipCode,
              province: doc.data().province,
              subDistrict: doc.data().subDistrict,
              district: doc.data().district,
              address: doc.data().address,
              idtype: doc.data().idtype,
              firstimg: doc.data().firstimg,
            };
            realestatelist.push(dict);
          }
        });
        return res.status(200).json(realestatelist);
      })
      .catch((error) => res.status(500).send(error));
  }
);
app.get("/realestaterecommendlist", cors(corsOptions), async (req, res) => {
  var realestatelist = [];
  await db
    .collection(realestateCollection)
    .limit(4)
    .where("status", "!=", 4)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) throw new Error("Realestate not found");
      querySnapshot.forEach((doc) => {
        let dict = {
          id: doc.id,
          name: doc.data().name,
          propertysize: doc.data().propertysize,
          numberofbathrooms: doc.data().numberofbathrooms,
          numberofbedrooms: doc.data().numberofbedrooms,
          price: doc.data().price,
          zipCode: doc.data().zipCode,
          province: doc.data().province,
          subDistrict: doc.data().subDistrict,
          district: doc.data().district,
          address: doc.data().address,
          idtype: doc.data().idtype,
          status: doc.data().status,
          firstimg: doc.data().firstimg,
        };
        realestatelist.push(dict);
      });
      return res.status(200).json(realestatelist);
    })
    .catch((error) => res.status(500).send(error));
});
app.put(
  "/usersupdatefavorite",
  middleware,
  cors(corsOptions),
  async (req, res) => {
    let decodedToken = await admin.auth().verifyIdToken(req.token);
    await db
      .collection(usersCollection)
      .doc(decodedToken.uid)
      .update({ favorite: req.body.favorite })
      .then(() => {
        return res.status(200).send("Update OK");
      })
      .catch((error) => res.status(500).send(error));
  }
);
