const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const userManager = require("../collections-manager/userCollManager");



router.get("/email/:emailAdd", async function (req, res) {
  try {
    const emailAdd = req.params.emailAdd;
    const getUserByEmail = await userManager.findUserByEmail(emailAdd);
    res.send(getUserByEmail);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});


router.get("/", async function (req, res) {
  try {
    const user = await userManager.getUsers();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.get("/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const getUserById = await userManager.findUserById(userId);
    res.send(getUserById);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});






router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userManager.saveUser(userData);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


module.exports = router;
