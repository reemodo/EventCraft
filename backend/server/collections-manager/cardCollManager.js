const Card = require("../../models/card");

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
    const lastCardId = await cardCollManager.findTheLastCard();
    const newCard = new Card({
      _id: lastCardId + 1,
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
}

module.exports = cardCollManager;