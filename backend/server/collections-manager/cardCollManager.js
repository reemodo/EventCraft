const Item = require("../../models/Item");
const Card = require("../../models/card");
const { findUpdatedFields } = require("../../utility");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
class cardCollManager {
  static async getCards() {
    const cards = await Card.find({});
    return cards;
  }
  static async deleteCard(cardId) {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (deletedCard) {
      return { success: true, message: "Card removed successfully" };
    } else {
      return { success: false, error: "Card not found" };
    }
  }
  static async saveCard(card) {
    const newCard = new Card({
      ...card,
    });
    await newCard.save();
    return newCard;
  }
  static async myCards(userId) {
    const userCards = await Card.find({ userId: userId }).populate("cardItems");
    return userCards;
  }

  static async getCard(cardId) {
    const card = await Card.findById(cardId).populate("cardItems");
    return card;
  }

  static async findTheLastCard() {
    const card = await Card.find({}).sort({ _id: -1 }).limit(1);
    if (card[0]) {
      return card[0]._id;
    } else return -1;
  }
  static async updateCardFields(cardId, backgroundColor, cssStyle, img, items) {
    const updateFields = findUpdatedFields(backgroundColor, cssStyle, img);
    const card = await Card.findById(cardId);
    const existedItemsIds = card.toObject().cardItems;

    const newItemsIdsSet = new Set();

    const newCardItemsIds = [];

    for (let item of items) {
      if (!item._id) {
        const newItem = new Item({ ...item });
        await newItem.save();
        newCardItemsIds.push(newItem.toObject()._id);
      } else {
        await Item.findByIdAndUpdate(item._id, item);
        newItemsIdsSet.add(ObjectId(item._id));
      }
    }

    for (let itemId of existedItemsIds) {
      if (newItemsIdsSet.has(itemId)) {
        newCardItemsIds.push(itemId);
      } else {
        await Item.findByIdAndDelete(itemId.toString());
      }
    }

    updateFields.cardItems = newCardItemsIds;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $set: updateFields },
      { new: true }
    );
    if (updatedCard) {
      return {
        success: true,
        message: "Card updated successfully",
        data: updatedCard,
      };
    } else {
      return { success: false, error: "Card not found" };
    }
  }
}

module.exports = cardCollManager;
