const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const userManager = require("../collections-manager/userCollManager");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

function hashPassword(user) {
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  return hashedPassword;
}

async function authenticateUser(email, password) {
  const user = await userCollManager.findUserByMail(email);
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, hashPassword(user));
  if (!isPasswordValid) {
    return null;
  }
  return { id: user.id, email: user.email };
}
function generateAccessToken(user) {
  return jwt.sign(user, secretKey);
}

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  if (!user) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  const accessToken = generateAccessToken(user);
  res.send({ accessToken, id: user.id });
});
const secretKey = "my_secret_key";

router.post("/register", async function (req, res) {
  try {
    const userData = req.body;
    const user = await userCollManager.saveUser(userData);
    const accessToken = generateAccessToken(user.toJSON());
    res.send({ accessToken, id: user.id });
  } catch (error) {
    res
      .status(401)
      .send({ message: "This email is already registered to an account" });
  }
});

module.exports = router;
