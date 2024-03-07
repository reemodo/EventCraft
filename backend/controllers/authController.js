const express = require("express");
const app = express();
const OtpAuth = require("../models/otpAuth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const otpGenerator = require("otp-generator");

const { sendSMS } = require("./smsController");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
console.log("in auth - ", JWT_SECRET);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// route - http://localhost:2024/user/signin
const signIn = async (req, res) => {
    const email = req.body.email; // Assuming the email is sent in the request body

    User.findOne({ email: email }, async function (err, user) {
        if (user) {
            // Clearing OTP auth table
            try {
                await OtpAuth.deleteMany({ email: email });
                console.log("OTP auth records deleted successfully.");
            } catch (e) {
                console.log(e);
            }

            // Generate OTP for the user
            const OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
            });

            const hashedOTP = await bcrypt.hash(OTP, 10);

            // Save OTP in OTP auth table
            const newOtpAuth = new OtpAuth({
                email: email,
                otp: hashedOTP,
            });

            newOtpAuth.save((error, success) => {
                if (error) console.log(error);
                else console.log("OTP saved successfully.");
            });

            // Send OTP via SMS
            sendSMS(email, OTP);

            return res.status(200).send({ msg: "OTP sent successfully!" });
        } else {
            return res.status(400).send({
                msg: "This email is not registered. Please sign up instead!",
            });
        }
    });
};

// route - http://localhost:2024/user/signup
const signUp = async (req, res) => {
    const email = req.body.email; // Assuming the email is sent in the request body

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).send({
            msg: "This email is already registered. Please sign in instead!",
        });
    }

    // Clear OTP auth table
    try {
        await OtpAuth.deleteMany({ email: email });
        console.log("OTP auth records deleted successfully.");
    } catch (e) {
        console.log(e);
    }

    // Generate OTP for the user
    const OTP = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });

    const hashedOTP = await bcrypt.hash(OTP, 10);

    // Save OTP in OTP auth table
    const newOtpAuth = new OtpAuth({
        email: email,
        otp: hashedOTP,
    });

    newOtpAuth.save((error, success) => {
        if (error) console.log(error);
        else console.log("OTP saved successfully.");
    });

    // Send OTP via SMS
    sendSMS(email, OTP);

    return res.status(200).send({ msg: "OTP sent successfully!" });
};

// route - http://localhost:2024/user/signin/verify
const verifyLogin = async (req, res) => {
    const email = req.body.email;
    const inputOtp = req.body.otp;

    const otpAuthRecord = await OtpAuth.findOne({ email: email });
    if (!otpAuthRecord) {
        return res.status(400).send({ msg: "The OTP expired. Please try again!" });
    }

    const validOtp = await bcrypt.compare(inputOtp, otpAuthRecord.otp);
    if (!validOtp) {
        return res.status(406).send({ msg: "OTP does not match. Please try again!" });
    }

    // If OTP is valid, delete OTP auth record and return success message
    await OtpAuth.deleteOne({ email: email });
    res.status(200).send({ msg: "Sign-In successful!" });
};

// route - http://localhost:2024/user/signup/verify
const verifyOtp = async (req, res) => {
    const email = req.body.email;
    const inputOtp = req.body.otp;

    const otpAuthRecord = await OtpAuth.findOne({ email: email });
    if (!otpAuthRecord) {
        return res.status(400).send({ msg: "The OTP expired. Please try again!" });
    }

    const validOtp = await bcrypt.compare(inputOtp, otpAuthRecord.otp);
    if (!validOtp) {
        return res.status(400).send({ msg: "OTP does not match. Please try again!" });
    }

    // If OTP is valid, delete OTP auth record, generate JWT token, and save user
    await OtpAuth.deleteOne({ email: email });

    const payload = { email: email };
    const token = jwt.sign(payload, JWT_SECRET);

    // Save user
    const newUser = new User({
        email: email,
    });

    newUser.save((error, success) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ msg: "Internal server error." });
        }
        console.log("User saved successfully:", newUser);
        res.status(200).send({ msg: "Account creation successful!", token: token });
    });
};

module.exports = {
    signUp,
    verifyOtp,
    signIn,
    verifyLogin,
};
