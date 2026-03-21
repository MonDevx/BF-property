const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const corsOptions = {
  origin: "https://bfproperty.firebaseapp.com",
  optionsSuccessStatus: 200,
};

const db = admin.firestore();
const usersCollection = "users";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

router.put("/usersupdatefavorite", authLimiter, authMiddleware, cors(corsOptions), async (req, res) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(req.token);
    await db
      .collection(usersCollection)
      .doc(decodedToken.uid)
      .update({ favorite: req.body.favorite });
    return res.status(200).send("Update OK");
  } catch (error) {
    if (error && typeof error.code === "string" && error.code.startsWith("auth/")) {
      return res.status(401).send("Invalid or expired token");
    }
    return res.status(500).send(error);
  }
});

module.exports = router;
