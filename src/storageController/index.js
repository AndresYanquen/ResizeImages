const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

// Tamaño : 796 x 1123 A4

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  },
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
}).single("image");

const multerFUnction = multer({
  storage,
  dest: path.join(__dirname, "public/uploads"),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|PNG|JPEG|JPG|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Formato invalido de Imagen");
  },
}).single("image");

module.exports = {
  storage,
  multerFUnction,
  upload,
};
