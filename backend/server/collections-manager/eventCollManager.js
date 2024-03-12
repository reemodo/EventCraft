const Event = require("../../models/event");
const Card = require("../../models/card");
const utilitiesFunctions = require("../../utility");
const filterAllEventsField = utilitiesFunctions.filterAllEventsField;

const cloudinaryCollManager = require("./cloudinaryCollManager");
const Item = require("../../models/Item");

class eventCollManager {
  static async getEvents() {
    const events = await Event.find({});
    return events;
  }
  static async deleteEvent(eventId) {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) {
      return { success: true, message: "Event removed successfully" };
    } else {
      return { success: false, error: "Event not found" };
    }
  }
  static async saveEvent(req) {
    const imageData = await cloudinaryCollManager.uploadImage(req);
    const event = req.body;

    if (imageData && imageData.public_id) {
      const card = JSON.parse(event.card);

      const newCard = new Card({
        ...card,
        userId: event.userId,
        img: imageData.url,
      });
      await newCard.save();

      const cardItems = [];

      for (let item of card.items) {
        const newItem = new Item({
          ...item,
          userId: event.userId,
          cardId: newCard.toObject()._id,
        });
        await newItem.save();
        cardItems.push(newItem);
      }

      const newCardObject = newCard.toObject();

      await Card.findOneAndUpdate(
        { _id: newCardObject._id },
        { ...newCardObject, cardItems }
      );

      const newEvent = new Event({
        ...event,
        cardID: newCard.toObject()._id,
      });

      await newEvent.save();

      return newEvent;
    }
    return { success: false, error: "Event not Created" };
  }
  static async myEvents(userId) {
    const userEvents = await Event.find({ userId: userId });
    return userEvents;
  }
  static async findTheLastEvent() {
    const event = await Event.find({}).sort({ _id: -1 }).limit(1);
    return event[0]._id;
  }
  static async filterByParams(id, category, startDate, location) {
    const filteredFields = filterAllEventsField(
      startDate,
      undefined,
      location,
      category
    );
    filteredFields.userId = { $ne: id };
    const events = await Event.find(filteredFields).sort({
      startDate: 1,
    });
    return events;
  }
  static async findJoinedEvents(userId) {
    const joinedEvents = await Event.find({ attendance: userId });
    return joinedEvents;
  }
  static async joinEvents(eventId, userId) {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { attendance: userId } },
      { new: true }
    );
    if (updatedEvent) {
      return {
        success: true,
        message: "Event updated successfully",
        data: updatedEvent.attendance,
      };
    } else {
      return { success: false, error: "Event not found" };
    }
  }
  static async updateEventFields(
    eventId,
    startDate,
    endDate,
    category,
    location,
    description,
    title
  ) {
    const updateFields = filterAllEventsField(
      startDate,
      endDate,
      location,
      category,
      description,
      title
    );
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updateFields },
      { new: true }
    );
    if (updatedEvent) {
      return {
        success: true,
        message: "Event updated successfully",
        data: updatedEvent,
      };
    } else {
      return { success: false, error: "Event not found" };
    }
  }
}

module.exports = eventCollManager;
