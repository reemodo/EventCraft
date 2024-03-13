const Event = require("../../models/event");
const utilitiesFunctions = require("../../utility");
const filterAllEventsField = utilitiesFunctions.filterAllEventsField;

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
    //const lastEventId = await eventCollManager.findTheLastEvent();
    const newEvent = new Event({
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
