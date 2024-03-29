const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

// Tamaño : 796 x 1123 A4
const A4size = {
  width: 796,
  height: 1123,
};

const reziseValues = {
  width: 0,
  height: 0,
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  },
});

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
}).array("image", 100);

const resizeAgaintsA4sheet = (dimensions) => {
  if (dimensions.width > A4size.width) {
    reziseValues.width = A4size.width;
  } else if (dimensions.width <= A4size.width) {
    reziseValues.width = dimensions.width;
  }

  if (dimensions.height > A4size.height) {
    reziseValues.height = A4size.height;
  } else if (dimensions.height <= A4size.height) {
    reziseValues.height = dimensions.height;
  }

  return reziseValues;
};

const getDirection = (dimensions) => {
  let direction = "";

  if (dimensions.width > dimensions.height) {
    direction = "width";
  } else if (dimensions.width < dimensions.height) {
    direction = "height";
  } else if (dimensions.width === dimensions.height) {
    direction = "equal";
  } else {
    direction = "";
  }
  console.log(direction);
  return direction;
};

module.exports = {
  multerFUnction,
  resizeAgaintsA4sheet,
  getDirection,
};
