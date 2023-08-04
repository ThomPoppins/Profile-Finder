const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

// use CORS on router against cross-origin resource sharing errors
router.use(cors());

// use the body-parser middleware
router.use(bodyParser.json());

router.get("/messages", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const database = client.db("app-data");
    const messagesCollection = database.collection("messages");

    const query = {
      from_userId: req.query.userId,
      to_userId: req.query.correspondingUserId,
    };

    const foundMessages = await messagesCollection.find(query).toArray();
    res.send(foundMessages);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

module.exports = router;
