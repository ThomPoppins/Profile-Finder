const jwt = require("jsonwebtoken");

// generate a token for the user
const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// verify the token
const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

// export the functions
module.exports = { generateToken, verifyToken };
