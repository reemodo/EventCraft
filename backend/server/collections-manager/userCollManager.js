const User = require("../../models/user");
class userCollManager {
  static async getUsers() {
    const users = await User.find({});
    return users;
  }
  static async findUserById(id) {
    const user = await User.findById(id);
    return user;
  }
  static async findUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }
  static async saveUser(user) {
    try {
      const lastUser = await userCollManager.findTheLastUser();
      const newUser = new User({
        _id: lastUser[0]._id + 1,
        ...user,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }
  static async findTheLastUser() {
    const user = await User.find({}).sort({ _id: -1 }).limit(1);
    if (user[0]) return user[0]._id;
    else return -1;
  }
}
module.exports = userCollManager;
