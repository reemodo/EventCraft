const Card = require("../../models/card");
const { findUpdatedFields } = require("../../utility");
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
    const userCards = await Card.find({ userId: userId });
    return userCards;
  }
  static async findTheLastCard() {
    const card = await Card.find({}).sort({ _id: -1 }).limit(1);
    return card[0]._id;
  }
  static async updateCardFields(cardId, backgroundColor, cssStyle, img) {
    const updateFields = findUpdatedFields(backgroundColor, cssStyle, img);
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
