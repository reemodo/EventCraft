const multer = require("multer");
const path = require("path");

const imageStorage = multer.memoryStorage();

const upload = multer({ storage: imageStorage });

module.exports = upload;
