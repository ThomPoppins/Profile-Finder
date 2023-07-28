const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { v1: uuidv1 } = require("uuid");
const { MongoClient } = require("mongodb");
const { generateToken } = require("../utils/jwt");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

// use CORS on router
router.use(cors());

// use the body-parser middleware
router.use(bodyParser.json());

// SIGNUP ROUTE:
// the route the signup form submits to
router.post("/signup", async (req, res) => {
  // initialize the MongoClient
  const client = new MongoClient(process.env.MONGODB_URI);

  console.log("Signup route hit");
  console.log("Request body:", req.body);

  // destructure the email and password from the request body
  const { email, password } = req.body;

  // make sure the email is lowercase
  const sanitizedEmail = email.toLowerCase();

  console.log("SANITIZED EMAIL:", sanitizedEmail);

  // generate a timestamp-based user id
  const generatedUserId = uuidv1();

  // encrypt the password with bcrypt
  // the second argument is the number of salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // try to connect to the MongoDB database
    // client.connect();
    await client.connect();
    // pick the database
    const database = client.db("app-data");
    // select the collection users
    const users = database.collection("users");

    // fetch any user with the same email to check if the user already exists
    const existingUser = await users.findOne({ sanitizedEmail });

    if (existingUser) {
      console.log("User already exists!");
      return res.status(409).json({ message: "User already exists!" });
    }

    // create a new user data object
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    console.log("New user data:", data);

    // insert the new user into the database
    const insertedUser = await users.insertOne(data);

    // create a token for the user
    // the token is used to authenticate the user
    const auth_token = generateToken(insertedUser);

    // send a response to the client
    // the client stores the token in the local storage
    res.status(201).json({
      auth_token,
      user_id: generatedUserId,
      email: sanitizedEmail,
    });
  } catch (error) {
    // catch any errors and log them to the console
    console.log(error);
  }
});

// LOGIN ROUTE:
// the route the login form send the data to
router.post("/login", async (req, res) => {
  console.log("Login route hit");
  // initialize the MongoClient
  const client = new MongoClient(process.env.MONGODB_URI);
  // destructure the email and password from the request body
  const { email, password } = req.body;
  // make sure the email is lowercase
  const sanitizedEmail = email.toLowerCase();
  console.log(
    "SANITIZED EMAIL IN LOGIN API AFTER GETTING IT FROM REQUEST BODY:::::::::::",
    sanitizedEmail
  );
  // try to connect to the MongoDB database
  // if it does work, run the code in the try block
  // finally, close the connection to the database
  try {
    await client.connect();
    // define the database
    const database = client.db("app-data");
    // define the collection as users
    const users = database.collection("users");
    // fetch the user with the same email
    const user = await users.findOne({ email: sanitizedEmail });
    // if the user does not exist, send an error message
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // compare the password with the hashed password
    // the hashed password is stored in the database
    // the password is the one the user entered in the login form
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);
    // if the password does not match, send an error message
    if (!passwordMatch) {
      console.log("Invalid credentials!");
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    // create a token for the user
    // the token is used to authenticate the user
    const auth_token = generateToken(user);
    // console.log("User logged in!");
    // console.log("auth_token: ", auth_token);
    // send a response to the client
    // the client stores the token in cookies
    res
      .status(201)
      .json({ auth_token, user_id: user.user_id, email: sanitizedEmail });
  } catch (error) {
    // catch any errors and log them to the console
    console.log(error);
  } finally {
    await client.close();
    console.log("Connection to the database closed!");
  }
});

// GET USER ROUTE:
// return the user data from the database
router.get("/user", async (req, res) => {
  // initialize the MongoClient
  const client = new MongoClient(process.env.MONGODB_URI);
  // destructure the user_id from the request query
  const { user_id } = req.query;

  // TODO: remove console.log statements
  console.log("user_id: ", user_id);

  // try to connect to the MongoDB database
  try {
    await client.connect();
    // define the database
    const database = client.db("app-data");
    // define the collection as users
    const users = database.collection("users");
    // find the user with the same user_id
    const user = await users.findOne({ user_id });
    console.log("user: ", user);
    // if the user does not exist, send an error message
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // send the user data to the client

    // the client does not need to know the hashed_password or _id
    user.hashed_password = undefined;
    user._id = undefined;

    // TODO: send the user data without the auth_token
    // the auth_token is only used to authenticate the user
    // the client does not need to know the auth_token
    // the client only needs to know the user_id
    // the user_id is used to fetch the user data from the database
    // send the user data to the client
    res.send(user);
  } catch (error) {
    // catch any errors and log them to the console
    console.log(error);
    // TODO: better error handling https://www.developerway.com/posts/how-to-handle-errors-in-react
    // TODO: send an error message to the client
  } finally {
    // close the connection to the database
    await client.close();
    // TODO: remove console.log statements
    console.log("Connection to the database closed!");
  }
});

// GET GENDERED USERS ROUTE:
// return all users from the database
router.get("/gendered-users", async (req, res) => {
  // initialize the MongoClient
  const client = new MongoClient(process.env.MONGODB_URI);

  // try to connect to the MongoDB database
  // if it does work, run the code in the try block
  try {
    await client.connect();
    // define the database
    database = client.db("app-data");
    // define the collection as users
    users = database.collection("users");
    // find all the documents in the collection with empty find() method and put them in a array
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    // finally, close the connection to the database
    await client.close();
  }
});

// UPDATE USER ROUTE:
// update a specific user from the database
// the user_id is passed as a query parameter
router.put("/user", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const formData = req.body.formData;

  console.log("formData: ", formData);

  try {
    // try to connect to the MongoDB database
    await client.connect();
    // define the database
    database = client.db("app-data");
    // define the collection as users
    users = database.collection("users");

    // update the user
    // the first argument is the query
    // the second argument is the new data
    // the third argument is the options
    // in this case, we want to return the updated user
    // update  using the spreak operator to update the user
    // with the new data from the form
    const updatedUser = await users.findOneAndUpdate(
      { user_id: formData.user_id }, // the query
      { $set: { ...formData } }, // the new data
      { returnOriginal: false } // the options
    );

    // send the updated user back to the client
    res.send(updatedUser);
  } finally {
    // and finally close the connection to the database
    await client.close();
  }
});

module.exports = router;
