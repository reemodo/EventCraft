const Item = require("../../models/Item");
const Card = require("../../models/card");
const { findUpdatedFields } = require("../../utility");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const cloudinaryCollManager = require("./cloudinaryCollManager");
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
  static async updateCardFields(
    cardId,
    backgroundColor,
    cssStyle,
    img,
    items,
    req
  ) {
    const updateFields = findUpdatedFields(backgroundColor, cssStyle);
    const card = await Card.findById(cardId);

    await cloudinaryCollManager.removeImage(card.toObject().imgPublicId);
    const newImgeData = await cloudinaryCollManager.uploadImage(req);

    updateFields.imgPublicId = newImgeData.public_id;
    updateFields.img = newImgeData.url;

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
