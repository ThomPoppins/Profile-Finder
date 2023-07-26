// load environment variables from the .env file
require("dotenv").config();

// port where the server will run
const PORT = 8000;

// import express
const express = require("express");

// use MongoClient to connect to the db
const { MongoClient } = require("mongodb");

// use uuid to generate a unique id for the user
// uuidv1 is a function that generates a unique id
// v1 stands for version 1
// version 1 is a timestamp-based id
const { v1: uuidv1 } = require("uuid");

// jsonwebtoken is used to create a token for the user
const jwt = require("jsonwebtoken");

// cors is used to allow cross-origin requests
// the client runs on localhost:3000
// the server runs on localhost:8000
// the client and server are on different origins
// by default, cross-origin requests are not allowed
// cors is used to allow cross-origin requests
// cors is a middleware
// a middleware is a function that is executed before the request is handled
// cors is a function that is executed before the request is handled
// cors allows cross-origin requests
const cors = require("cors");

// bcrypt is used to encrypt the password
// the password is encrypted before it is stored in the database
// the password is encrypted using a salt
// a salt is a random string that is added to the password
// the salt is used to generate the hash
// the hash is the encrypted password
// the salt is stored with the hash in the database
// bcrypt is used to compare the password with the hash
const bcrypt = require("bcrypt");

// load environment variables from the .env file
// the .env file is in the root of the server folder
// the .env file contains the connection URI to the MongoDB database server
// the .env file is not committed to the git repository
require("dotenv").config();

// connection URI to the MongoDB database server
// TODO: regenerate a password after moving that value to the environment variables
const uri = process.env.MONGODB_URI;
// create an express app
const app = express();

// configure express to use CORS
app.use(cors());
// configure express to use json
app.use(express.json());

// ROUTES:
// when a GET request is made to the homepage, run the callback function
app.get("/", (req, res) => {
  // send a response to the client
  res.json({ message: "Welcome to the server" });
});

// the route the signup form send the data to
app.post("/signup", async (req, res) => {
  // initialize the MongoClient
  const client = new MongoClient(uri);

  // destructure the email and password from the request body
  const { email, password } = req.body;

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

    // make sure the email is lowercase
    const sanitizedEmail = email.toLowerCase();

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
      password: hashedPassword,
    };

    // insert the new user into the database
    const insertedUser = await users.insertOne(data);

    // create a token for the user
    // the token is signed with the user id
    // the token is valid for 24 hours
    // the token is signed with a secret key
    // the secret key is only known to the server
    // the secret key is used to verify the token
    // if the token is not signed with the secret key, it is not valid
    // the token is sent to the client and stored in the local storage
    // the token is sent to the server with every request
    // the server checks if the token is valid
    // if the token is valid, the user is authenticated
    // the token is generated when the user logs in
    //TODO: check: jwt sign the token and send it to the client
    const auth_token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24, // expires in 24 hours
    });

    // send a response to the client
    // the client stores the token in the local storage
    res
      .status(201)
      .json({ auth_token, user_id: generatedUserId, email: sanitizedEmail });
  } catch (error) {
    // catch any errors and log them to the console
    console.log(error);
  }
});

// create a route for the login form
// the route is /login
// the route accepts POST requests
// the route accepts a request body
// the request body contains the email and password
// the route is asynchronous because it makes a request to the database
app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
});

// return all users from the database
app.get("/users", async (req, res) => {
  // initialize the MongoClient
  const client = new MongoClient(uri);

  // try to connect to the MongoDB database
  // if it does work, run the code in the try block
  // finally, close the connection to the database
  try {
    await client.connect();
    // define the database
    database = client.db("app-data");
    // define the collection as users
    users = database.collection("users");
    // find all the documents in the collection
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});
// END ROUTES

// start the server and listen on port 8000 for any incoming connection
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
