const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");

router.get("/DBgenerator", async function (req, res) {
  try {
    await DBManager.reGenerate();
    res.end();
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

module.exports = router;
