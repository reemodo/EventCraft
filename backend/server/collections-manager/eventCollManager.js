const Event = require("../../models/event");

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
  static async saveEvent(event) {
    const lastEventId = await eventCollManager.findTheLastEvent();
    console.log(lastEventId);
    const newEvent = new Event({
      _id: lastEventId + 1,
      ...event,
    });
    await newEvent.save();
    return newEvent;
  }
  static async myEvents(userId) {
    const userEvents = await Event.find({ userId: userId });
    return userEvents;
  }
  static async findTheLastEvent() {
    const event = await Event.find({}).sort({ _id: -1 }).limit(1);
    return event[0]._id;
  }
}

module.exports = eventCollManager;
