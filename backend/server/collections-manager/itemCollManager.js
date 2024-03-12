const mongoose = require("mongoose");

const Card = require("../../models/card");
const { findUpdatedItemFields } = require("../../utility");
const { updateCardFields } = require("./cardCollManager");
const Item = require("../../models/Item");

class itemCollManager {
  static async getItems(cardId) {
    const items = await Card.find({ _id: cardId }).select("cardItems");
    return items;
  }
  static async deleteItem(cardId, itemId) {
    try {
      const card = await Card.findById(cardId);
      if (!card) {
        return { success: false, error: "Card not found" };
      }
      const updatedCardItems = card.cardItems.filter(
        (item) => item._id != itemId
      );
      card.cardItems = updatedCardItems;
      await card.save();
      return { success: true, message: "Item removed successfully" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async saveNewItem(cardId, newItemData) {
    try {
      const card = await Card.findById(cardId);
      if (!card) {
        return { success: false, error: "Card not found" };
      }
      const lastItemId = await itemCollManager.findTheLastItem(cardId);
      const newItem = new Item({ _id: lastItemId, ...newItemData });
      card.cardItems.push(newItem);
      await card.save();
      return { success: true, message: "Item saved successfully" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async findTheLastItem(cardId) {
    const card = await Card.find({ _id: cardId }).sort({ _id: -1 }).limit(1);
    if (card[0].cardItems.length == 0) return 0;
    else return card[0].cardItems.length;
  }

  static async editItemPosition(cardId, itemId, newPosition) {
    try {
      const updateFields = findUpdatedItemFields(newPosition);
      const updatedCard = await Card.findOneAndUpdate(
        { _id: cardId, "cardItems._id": itemId },
        { $set: updateFields },
        { new: true }
      );
      if (!updatedCard) {
        return { success: false, error: "Card or Item not found" };
      }
      return { success: true, message: "Item position updated successfully" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = itemCollManager;
