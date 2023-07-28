/**
 * This file contains the server-side code for the Vind-Expert app.
 * It sets up an Express app, connects to a MongoDB database, and defines routes for handling HTTP requests.
 * The app allows users to sign up, log in, and access protected resources.
 * It uses various packages such as bcrypt, jsonwebtoken, and cors to handle authentication and authorization.
 * The server runs on port 8000 and accepts cross-origin requests from the client running on port 3000.
 */

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
// v2 stands for version 2
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
const uri = process.env.MONGODB_URI;
// create an express app
const app = express();

// configure express to use CORS
app.use(cors());
// configure express to use json
app.use(express.json());

// ROUTE HANDLERS:
// when a GET request is made to the homepage, run the callback function
app.get("/", (req, res) => {
  // send a response to the client
  res.json({ message: "Welcome to the server" });
});

// FUNCTIONS:
// generate a token for the user
// the token is signed with the user id
// the token is valid for 90 days
// the token is signed with a secret key
// the secret key is only known to the server
// the secret key is used to verify the token
// if the token is not signed with the secret key, it is not valid
// the token is sent to the client and stored in the local storage
// the token is sent to the server with every request
// the server checks if the token is valid
// if the token is valid, the user is authenticated
// generate a token function:
const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
// END FUNCTIONS

app.use(cors());
// start the server and listen on port 8000 for any incoming connection
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
