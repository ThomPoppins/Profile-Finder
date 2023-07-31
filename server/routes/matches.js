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

// ADD-MATCH ROUTE:
router.put("/add-match", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { user_id, matched_user_id } = req.body;

  try {
    // connect to the db
    await client.connect();

    console.log("Connected correctly to server");

    // select the database
    const db = client.db("app-data");

    // select the users collection
    const usersCollection = db.collection("users");

    // create a query to find the user with userId
    const query = { user_id: user_id };

    // add the matchedUserId to the matches array of the user with userId
    // $push is a MongoDB operator that adds a value to an array if the value is not already in the array (no duplicates)
    // and if the value is not null (no null values)
    // and if the value is not undefined (no undefined values)

    // usersCollection.updateOne(query, updateDocument) returns a promise

    // check if userId and matchedUserId are not null and not undefined
    // the first parameter of updateOne() is @param filter - The filter used to select the document to update
    // the second parameter of updateOne() is @param update - The update operations to be applied to the document
    // check for the existence of a match in the matches array of the user with user_id
    // if the match does not exist, add the match to the matches array of the user with user_id
    // if the match exists, do nothing
    // if the match is null or undefined, do nothing
    const user = await usersCollection.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if the match already exists
    // if the match exists, do nothing
    // if the match does not exist, add the match to the matches array of the user with user_id
    // @elemMatch is a MongoDB operator that matches documents that contain an array field with at least one element that matches all the specified query criteria
    const matchExists = await usersCollection.findOne({
      user_id,
      matches: { $elemMatch: { user_id: matched_user_id } },
    });

    if (matchExists) {
      console.log("Match already exists");
      return res.status(409).json({ message: "Match already exists" });
    }

    if (matched_user_id != null && matched_user_id != undefined) {
      const updateDocument = {
        $push: { matches: { user_id: matched_user_id } },
      };
      const user = await usersCollection.updateOne(query, updateDocument);
      res.send(user);
    }
  } catch (error) {
    // if the promise rejects, send a 500 response
    res.status(500).send("Error adding match");
    console.log(error);
  } finally {
    // close the connection to the db
    await client.close();
  }
});

module.exports = router;
