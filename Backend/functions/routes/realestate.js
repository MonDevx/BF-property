const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../middleware/auth");
const propertyFields = require("../utils/propertyFields");

const router = express.Router();
const corsOptions = {
  origin: "https://bfproperty.firebaseapp.com",
  optionsSuccessStatus: 200,
};

const db = admin.firestore();
const realestateCollection = "property";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/realestatedetail/:realestatename", cors(corsOptions), async (req, res) => {
  const { realestatename } = req.params;
  return db
    .collection(realestateCollection)
    .where("name", "==", realestatename)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) throw new Error("Realestate not found");
      return querySnapshot.forEach((doc) => {
        const data = doc.data();
        delete data.idowner;
        return res.status(200).json({ id: doc.id, data });
      });
    })
    .catch((error) => res.status(500).send(error));
});

router.get("/editrealestatedetail/:realestateId", authLimiter, authMiddleware, cors(corsOptions), async (req, res) => {
  const { realestateId } = req.params;
  return db
    .collection(realestateCollection)
    .doc(realestateId)
    .get()
    .then((doc) => {
      if (!doc.exists) throw new Error("Realestate not found");
      const data = doc.data();
      delete data.idowner;
      return res.status(200).json({ id: doc.id, data });
    })
    .catch((error) => res.status(500).send(error));
});

router.get("/myrealestatelist", authLimiter, authMiddleware, cors(corsOptions), async (req, res) => {
  const decodedToken = await admin.auth().verifyIdToken(req.token);
  return db
    .collection(realestateCollection)
    .where("idowner", "==", decodedToken.uid)
    .orderBy("createat", "asc")
    .get()
    .then((querySnapshot) => {
      const realestatelist = querySnapshot.docs.map((doc) =>
        propertyFields(doc, { includeStatus: true, includeImages: true })
      );
      return res.status(200).json(realestatelist);
    })
    .catch((error) => res.status(500).send(error));
});

router.get("/favoriterealestatelist", authLimiter, authMiddleware, cors(corsOptions), async (req, res) => {
  const arr =
    typeof req.query.favoritelist === "string" ||
    req.query.favoritelist instanceof String
      ? [req.query.favoritelist]
      : req.query.favoritelist;

  return db
    .collection(realestateCollection)
    .where(admin.firestore.FieldPath.documentId(), "in", arr)
    .get()
    .then((querySnapshot) => {
      const realestatelist = querySnapshot.docs
        .filter((doc) => doc.data().status !== 4)
        .map((doc) => propertyFields(doc));
      return res.status(200).json(realestatelist);
    })
    .catch((error) => res.status(500).send(error));
});

router.get("/realestaterecommendlist", cors(corsOptions), async (req, res) => {
  return db
    .collection(realestateCollection)
    .where("status", "!=", 4)
    .limit(4)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) throw new Error("Realestate not found");
      const realestatelist = querySnapshot.docs.map((doc) =>
        propertyFields(doc, { includeStatus: true })
      );
      return res.status(200).json(realestatelist);
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
