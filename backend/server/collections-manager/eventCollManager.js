const { ObjectId } = require("mongodb");

const Event = require("../../models/event");
const Card = require("../../models/card");
const utilitiesFunctions = require("../../utility");
const filterAllEventsField = utilitiesFunctions.filterAllEventsField;

const cloudinaryCollManager = require("./cloudinaryCollManager");
const Item = require("../../models/Item");

const { orderEventsByLocation } = require("../utilities/utility");

class eventCollManager {
  static async getEvents() {
    const events = await Event.find({}).populate("cardID");
    return events;
  }

  static async joinEvent(userId, eventId) {
    const event = await Event.findById(eventId).populate("cardID");

    const attendeeId = event.attendance.findIndex(
      (id) => id.toString() === userId
    );

    if (attendeeId === -1) {
      // const userDuc = await User.findById(userId);
      event.attendance.push(userId);
      event.save();
      // await mailerSvc.sendEventEmail({
      //   event: event.toObject(),
      //   to: userDuc.toObject().email,
      //   action: "join",
      // });
      return event;
    }

    throw new Error("user all ready joined");
  }

  static async cancelJoinEvent(userId, eventId) {
    const event = await Event.findById(eventId).populate("cardID");

    const attendeeIdIdx = event.attendance.findIndex(
      (id) => id.toString() === userId
    );

    if (attendeeIdIdx !== -1) {
      // const userDuc = await User.findById(userId);

      event.attendance.splice(attendeeIdIdx, 1);
      event.save();
      // await mailerSvc.sendEventEmail({
      //   event: event.toObject(),
      //   to: userDuc.toObject().email,
      //   action: "cancel joining",
      // });

      return event;
    }

    throw new Error("user not joined");
  }

  static async getEventPopulated(eventId) {
    const results = await Event.aggregate([
      { $match: { _id: eventId } },
      {
        $lookup: {
          from: "cards",
          localField: "cardID",
          foreignField: "_id",
          as: "card",
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "card.cardItems",
          foreignField: "_id",
          as: "cardItems",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "attendance",
          foreignField: "_id",
          as: "users",
        },
      },

      {
        $addFields: {
          hasUsers: { $gt: [{ $size: "$users" }, 0] }, // Check if the users array is not empty
        },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          location: 1,
          startDate: 1,
          endDate: 1,
          category: 1,
          createdAt: 1,
          isPublic: 1,
          attendance: {
            $cond: [
              { $eq: ["$hasUsers", true] },
              {
                $map: {
                  input: "$users",
                  as: "user",
                  in: {
                    _id: "$$user._id",
                    name: "$$user.name",

                    phone: "$$user.phone",
                    email: "$$user.email",
                  },
                },
              },
              [], // Return empty array if no users
            ],
          },

          cardItems: "$cardItems",
          card: { $first: "$card" },
        },
      },
    ]);
    return results;
  }

  static async deleteEvent(eventId) {
    const event = await Event.findById(eventId).populate("cardID");
    const card = await event.cardID.populate("cardItems");
    for (let itemId of card.cardItems) {
      const deleteItem = await Item.findByIdAndDelete(itemId);
      if (!deleteItem) {
        return { success: false, error: "Item not found" };
      }
    }
    const deletedCard = await Card.findByIdAndDelete(event.cardID);
    if (!deletedCard) return { success: false, error: "Event not found" };

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
        imgPublicId: imageData.public_id,
      });
      await newCard.save();

      const cardItems = [];

      for (let item of card.items) {
        const newItem = new Item({
          ...item,
          text: item.text,
          userId: event.userId,
          cardId: newCard.toObject()._id.toString(),
        });
        await newItem.save();
        cardItems.push(newItem);
      }

      const newCardObject = newCard.toObject();

      await Card.findOneAndUpdate(
        { _id: newCardObject._id },
        { ...newCardObject, cardItems },
        { new: true }
      );

      const newEvent = new Event({
        ...event,
        cardID: newCard.toObject()._id.toString(),
        attendance: [],
      });

      await newEvent.save();

      const results = await this.getEventPopulated(newEvent.toObject()._id);

      return results;
    }
    return {
      success: false,
      error: "Event not Created Cloudinary did not save the image",
    };
  }
  static async myEvents(userId) {
    const userEvents = await Event.find({ userId: userId }).populate("cardID");
    return userEvents;
  }
  static async findTheLastEvent() {
    const event = await Event.find({}).sort({ _id: -1 }).limit(1);
    if (event[0]) return event[0]._id;
    else return -1;
  }

  static async getEvent(eventId) {
    const event = await this.getEventPopulated(new ObjectId(eventId));

    return event;
  }

  static async filterByParams(
    id,
    category,
    startDate,
    location,
    title,
    userPosition
  ) {
    const filteredFields = filterAllEventsField({
      startDate,
      location,
      category,
      title,
    });
    filteredFields.userId = { $ne: id };
    filteredFields.isPublic = true;
    const events = await Event.find(filteredFields)
      .sort({
        startDate: 1,
      })
      .populate("cardID")
      .populate("attendance", "name");

    const orderedEvents = orderEventsByLocation(events, userPosition);

    return orderedEvents;
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
  static async updateEventFields(data) {
    const { eventId, ...rest } = data;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $set: rest,
      },
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
