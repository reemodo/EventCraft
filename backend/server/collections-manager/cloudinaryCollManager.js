const cloudinary = require("./cloudCollManager");

class cloudinaryCollManager {
  static async uploadImage(req) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const image = await cloudinary.uploader.upload(dataURI);
    const { public_id, url } = image;

    return { public_id, url };
  }

  static async removeImage(public_id) {
    const backupUrl = await cloudinary.uploader.destroy(public_id);

    return backupUrl;
  }
}

module.exports = cloudinaryCollManager;
