const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (['.png', '.jpg', '.jpeg'].includes(path.extname(file.originalname).toLowerCase())) {
      return callback(null, true);
    } else {
      console.log('Solo se permiten imágenes');
      return callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2 // Limite de 2MB
  }
});

module.exports = upload;