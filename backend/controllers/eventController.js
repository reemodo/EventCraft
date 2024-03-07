const { Event } = require("../models/event");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const nodemailer = require("nodemailer");

function sendCheckInMail(data) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODE_MAILER_USER,
            pass: process.env.NODE_MAILER_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from: process.env.NODE_MAILER_USER,
        to: data.email,
        subject: `${data.name} You've Checked In - EventCraft`,
        html: `Dear ${data.name},<br><br>
           <strong>Congratulations, you've successfully checked in!</strong><br><br>
           Name: ${data.name}<br>
           Registration Number: ${data.regNo}<br>
           Contact Number: ${data.number}`,
    };

    transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
            console.log(err);
        } else {
            console.log("Checked In Email sent successfully");
        }
    });
}

const handleErrors = (res, errorMessage, error) => {
    console.error(errorMessage, error);
    res.status(500).send({ msg: errorMessage, error: error.message });
};

const postEvent = async (req, res) => {
    const { userId, title, description, location, date, duration, cardID, attendance, category, createdAt } = req.body;

    try {
        const newEvent = new Event({
            userId,
            title,
            description,
            location,
            date,
            duration,
            cardID,
            attendance,
            category,
            createdAt,
        });

        await newEvent.save();
        console.log("Saved new event successfully.");
        res.status(200).send({ msg: "Event created successfully", event: newEvent });
    } catch (error) {
        handleErrors(res, "Error saving new event", error);
    }
};

const allEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).send(events);
    } catch (error) {
        handleErrors(res, "Error fetching events", error);
    }
};

const particularEvent = async (req, res) => {
    const eventId = req.body.event_id;
    try {
        const event = await Event.findOne({ _id: eventId });
        res.status(200).send(event);
    } catch (error) {
        handleErrors(res, "Error fetching event", error);
    }
};

const deleteEvent = async (req, res) => {
    const eventId = req.body.event_id;
    try {
        await Event.deleteOne({ _id: eventId });
        res.status(200).send({ msg: "Event deleted successfully" });
    } catch (error) {
        handleErrors(res, "Error deleting event", error);
    }
};

const checkin = async (req, res) => {
    const { event_id, checkInList } = req.body;

    try {
        const event = await Event.findOne({ _id: event_id });
        if (!event) {
            return res.status(404).send({ msg: "Event not found" });
        }

        // Update the attendance for each user in the checkInList
        for (const userId of checkInList) {
            if (!event.attendance.includes(userId)) {
                event.attendance.push(userId);
            }
        }

        await event.save();

        // Send check-in email to each user
        for (const userId of checkInList) {
            const user = await User.findOne({ _id: userId });
            if (user) {
                const checkInData = {
                    name: user.name,
                    regNo: user.regNumber,
                    email: user.email,
                    number: user.phoneNumber,
                    event: event.title,
                };
                sendCheckInMail(checkInData);
            }
        }

        res.status(200).send({ msg: "Check-in completed successfully" });
    } catch (error) {
        handleErrors(res, "Error during check-in process", error);
    }
};

module.exports = {
    postEvent,
    allEvents,
    particularEvent,
    deleteEvent,
    checkin,
};