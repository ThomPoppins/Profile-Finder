// Copilot: Create a models directory and move all your database models into separate files. For example, you can create a User.js file to define the user model, a Post.js file to define the post model, and so on.

// /SERVER/MODELS/* EXAMPLES:

// Me: Can you give me a code example that will explain an User.js and Post.js in the /server/models directory?

// To define a model for a user, you can create a new file named User.js in the /server/models directory and add the following code:

// /SERVER/MODELS/USER.JS EXAMPLE:
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// In this example, we first import the mongoose module using the require() function. We then define the userSchema object using the mongoose.Schema() method. The userSchema object defines the fields and their types for the user model. The User model is defined using the mongoose.model() method, which takes two arguments: the name of the model and the userSchema object. Finally, we export the User model using the module.exports object.

// To define a model for a post, you can create a new file named Post.js in the /server/models directory and add the following code:

// /SERVER/MODELS/POST.JS EXAMPLE:
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

// In this example, we first import the mongoose module using the require() function. We then define the postSchema object using the mongoose.Schema() method. The postSchema object defines the fields and their types for the post model. The Post model is defined using the mongoose.model() method, which takes two arguments: the name of the model and the postSchema object. Finally, we export the Post model using the module.exports object.

// Me: how do I import /server/models/User.js functionality in to the /server/index.js file?

// To import the functionality of the User.js file in the /server/models directory into the index.js file in the /server directory, you can use the require() function to import the User model and use it to interact with the database. Here's an example:

// /SERVER/INDEX.JS EXAMPLE:
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/User");

// Connect to the database
mongoose.connect("mongodb://localhost/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a route to create a new user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// In this example, we first import the User model from the User.js file using the require() function. We then use the mongoose.connect() method to connect to the MongoDB database. We define a route to create a new user using the app.post() method, and use the User model to create a new user in the database and return it as a JSON response.

// Note that you can use the same approach to import and use other models from the /server/models directory in your index.js file. You can also use the User model to perform other CRUD operations on the database, such as retrieving, updating, and deleting users.

// END OF /SERVER/MODELS/* EXAMPLES
