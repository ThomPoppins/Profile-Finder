export default function handler(request, response) {
  // request.query is an object with the query string parsed as keys/values
  // e.g. for /api/lee?name=lee
  // request.query.name -> "lee"
  // request.query.slug -> undefined
  // request.query -> { name: "lee", slug: undefined }
  // api/[name].js -> /api/lee
  // request.query.name -> "lee"
  const { name } = request.query;

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

  // SIGNUP ROUTE:
  // the route the signup form submits to
  app.post("/signup", async (req, res) => {
    // initialize the MongoClient
    const client = new MongoClient(uri);

    // destructure the email and password from the request body
    const { email, password } = req.body;

    // make sure the email is lowercase
    const sanitizedEmail = email.toLowerCase();

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
  app.post("/login", async (req, res) => {
    console.log("Login route hit");
    // initialize the MongoClient
    const client = new MongoClient(uri);
    // destructure the email and password from the request body
    const { email, password } = req.body;
    // make sure the email is lowercase
    const sanitizedEmail = email.toLowerCase();
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
      const passwordMatch = await bcrypt.compare(
        password,
        user.hashed_password
      );
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
      res.status(201).json({ auth_token, user_id: user.user_id });
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
  app.get("/user", async (req, res) => {
    // initialize the MongoClient
    const client = new MongoClient(uri);
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

      // TODO: send the user data without the hashed password
      // the client does not need to know the hashed password
      // TODO: remove console.log statements
      console.log("BEFORE:::::: ", user);
      user.hashed_password = undefined;
      user._id = undefined;
      console.log("AFTER:::::: ", user);
      // TODO: send the user data without the auth_token
      // the auth_token is only used to authenticate the user
      // the client does not need to know the auth_token
      // the client only needs to know the user_id
      // the user_id is used to fetch the user data from the database
      // TODO: test if {res.status(200).json(user)}; is better
      res.send(user);
    } catch (error) {
      // catch any errors and log them to the console
      console.log(error);
      // TODO: better error handling https://www.developerway.com/posts/how-to-handle-errors-in-react
      // TODO: send an error message to the client
    } finally {
      await client.close();
      console.log("Connection to the database closed!");
    }
  });

  // GET ALL USERS ROUTE:
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

  // UPDATE USER ROUTE:
  // update a specific user from the database
  // the user_id is passed as a query parameter
  app.put("/user", async (req, res) => {
    const client = new MongoClient(uri);
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
  // END ROUTES

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

  res.status(200).end("Hello Cron!");
}
