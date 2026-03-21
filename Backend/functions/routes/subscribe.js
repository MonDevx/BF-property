const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();
const db = admin.firestore();
const subscribeCollection = "subscribe";

router.post("/subscribe", async (req, res) => {
  try {
    const subscribe = {
      email: req.body.email,
      subscribeAt: new Date(),
    };
    await db.collection(subscribeCollection).add(subscribe);
    return res.status(200).send("OK");
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
