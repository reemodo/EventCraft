const cloudinary = require("./cloudCollManager");
const Datauri = require("datauri/sync");

class cloudinaryCollManager {
  static async uploadImage(req) {
    const file = Datauri(req.file.path).content;
    const image = await cloudinary.uploader.upload(file);
    const { public_id, url } = image;

    return { public_id, url };
  }

  static async removeImage(public_id) {
    const backupUrl = await cloudinary.uploader.destroy(public_id);

    return backupUrl;
  }
}

module.exports = cloudinaryCollManager;
