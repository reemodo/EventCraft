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
router.post("/", async function (req, res) {
  try {
    console.log("dkfjslkjl");
    console.log(req.body);
    await DBManager.saveSomething(req.body);
    res.status(200).end();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
