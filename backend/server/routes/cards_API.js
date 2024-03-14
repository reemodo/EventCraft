const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const cardManager = require("../collections-manager/cardCollManager");
const Utilities = require("../../utility");
const upload = require("../../middleware/multer");

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

router.get("/:cardId", async function (req, res) {
  try {
    const cardId = req.params.cardId;
    const card = await cardManager.getCard(cardId);

    res.send(card);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.put(
  "/:cardId",
  Utilities.authenticateToken,
  upload.single("img"),
  async function (req, res) {
    try {
      const cardId = req.params.cardId;
      const { backgroundColor, cssStyle, img, items } = req.body;

      const updatedCard = await cardManager.updateCardFields(
        cardId,
        backgroundColor,
        cssStyle,
        img,
        items,
        req
      );
      res.status(200).send(updatedCard);
    } catch (err) {
      console.error(err);
      res.status(400).send((err) => err);
    }
  }
);

module.exports = router;
