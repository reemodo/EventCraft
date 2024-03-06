const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const userCollManager = require("../collections-manager/userCollManager");

router.get("/DBgenerator", async function (req, res) {
  try {
    await DBManager.reGenerate();
    res.end();
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.get("/", async function (req, res) {
  try {
    const user = await userCollManager.getUsers();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

module.exports = router;
