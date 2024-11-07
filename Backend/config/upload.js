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
      callback(null, true);
    } else {
      console.log('Solo se permiten imágenes');
      callback(new Error('Solo se permiten imágenes en formato PNG, JPG o JPEG'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2 // Límite de 2MB
  }
});

module.exports = upload;
