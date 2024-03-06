const User = require("../models/user");

const userDetails = async (req, res) => {
    const user_id = req.body.user_id; // assuming user_id is sent in the request body

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    userDetails,
};
