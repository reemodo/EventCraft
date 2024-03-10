const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const cardManager = require("../collections-manager/cardCollManager");
const card = require("../../models/card");
const Utilities = require("../../utility");

router.get("/", Utilities.authenticateToken, async function (req, res) {
  try {
    const cards = await cardManager.getCards();
    res.send(cards);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.delete(
  "/:cardId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const cardId = req.params.cardId;
      const deleteCard = await cardManager.deleteCard(cardId);
      res.send(deleteCard);
    } catch (err) {
      console.error(err);
    }
  }
);

router.post("/", Utilities.authenticateToken, async (req, res) => {
  try {
    const cardData = req.body;
    console.log(cardData);
    const newCard = await cardManager.saveCard(cardData);
    res.send({ message: "Event created successfully", card: newCard });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Failed to create card" });
  }
});

router.get("/:cardId", Utilities.authenticateToken, async function (req, res) {
  try {
    const cardId = req.params.cardId;
    const myCards = await cardManager.myCards(cardId);
    res.send(myCards);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

module.exports = router;
