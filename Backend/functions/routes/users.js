const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const corsOptions = {
  origin: "https://bfproperty.firebaseapp.com",
  optionsSuccessStatus: 200,
};

const db = admin.firestore();
const usersCollection = "users";

router.put("/usersupdatefavorite", authMiddleware, cors(corsOptions), async (req, res) => {
  const decodedToken = await admin.auth().verifyIdToken(req.token);
  return db
    .collection(usersCollection)
    .doc(decodedToken.uid)
    .update({ favorite: req.body.favorite })
    .then(() => res.status(200).send("Update OK"))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
