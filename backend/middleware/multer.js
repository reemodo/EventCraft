const multer = require('multer');
const path = require('path');


const imageStorage = multer.diskStorage({
  destination: 'images',  
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))

  }
});

const upload = multer({dest: 'images/', storage: imageStorage});

module.exports = upload;