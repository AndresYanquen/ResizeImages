const { Router } = require("express");
const path = require("path");
const sharp = require("sharp");
const storageController = require("../storageController/index");
const fs = require("fs");
const sizeOf = require("image-size");

const storage = storageController.storage;

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/image/:filepath");

router.post("/upload", storageController.multerFUnction, async (req, res) => {
  const img = __dirname;
  const imagesId = [];
  const files = req.files;
  files.map(async (file) => {
    const id = Date.now();
    imagesId.push(id);
    const dimensions = sizeOf(file.path);
    const processedImage = await sharp(file.path).toBuffer();
    const resizeValues = storageController.resizeAgaintsA4sheet(
      processedImage,
      dimensions
    );
    const resizeImage = sharp(processedImage).resize(
      resizeValues.width,
      resizeValues.height,
      {
        fit: "contain",
      }
    );
    const resizeImageBuffer = await resizeImage.toBuffer();
    fs.writeFileSync(`./src/public/resizeImg/${id}.jpg`, resizeImageBuffer);
  });
  console.log(imagesId);
  console.log(img);
  fs.readFile(`./src/public/resizeImg/1635557531371.jpg`, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1> Image not Found </h1>");
    } else {
      res.writeHead(200, { "Content-type": "image/jpg" });
      res.end(content);
    }
  });
});

module.exports = router;
