const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const cloudinary = require("../collections-manager/cloudCollManager");
const Datauri = require("datauri/sync");

router.post("/upload", upload.single("image"), function (req, res) {
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  cloudinary.uploader.upload(dataURI, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

router.delete("/delete/:public_id", async (req, res) => {
  const { public_id } = req.params;

  try {
    await cloudinaryController.removeImage(public_id);
    res.json({ message: "Image deleted from Cloudinary" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update", upload.single("file"), async (req, res) => {
  const { existingUrl } = req.body;

  try {
    const newImageUrl = await cloudinaryController.updateImage(
      req.file.path,
      existingUrl
    );
    res.json({ newImageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
