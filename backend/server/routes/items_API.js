const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const itemManager = require("../collections-manager/itemCollManager");
const Utilities = require("../../utility");

router.get("/:cardId", Utilities.authenticateToken, async function (req, res) {
  try {
    const cardId = req.params.cardId;
    const items = await itemManager.getItems(cardId);
    res.send(items[0].cardItems);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.delete(
  "/:cardId/:itemId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const cardId = req.params.cardId;
      const itemId = req.params.itemId;
      const deleteItem = await itemManager.deleteItem(cardId, itemId);
      res.send(deleteItem);
    } catch (err) {
      console.error(err);
    }
  }
);

router.post("/:cardId", Utilities.authenticateToken, async (req, res) => {
  try {
    const cardId = req.params.cardId;
    const itemData = req.body;
    const newItem = await itemManager.saveNewItem(cardId, itemData);
    res.send({ message: "Item created successfully", item: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
});

router.put(
  "/:cardId/:itemId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const cardId = req.params.cardId;
      const itemId = req.params.itemId;
      const newData = req.body;
      const updatedItem = await itemManager.editItemPosition(
        cardId,
        itemId,
        newData
      );
      res.status(200).send(updatedItem);
    } catch (err) {
      console.error(err);
      res.status(400).send((err) => err);
    }
  }
);

module.exports = router;
