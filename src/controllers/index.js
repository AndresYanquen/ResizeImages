const { Router } = require("express");
const path = require("path");
const sharp = require("sharp");
const storageController = require("../storageController/index");
const fs = require("fs");
const sizeOf = require("image-size");

let dimensions;
let direction = [];

const getImage = (req, res) => {
  const filepath = req.params.filepath;
  console.log(filepath);
  res.writeHead(200, { "content-type": "image/jpg" });
  fs.createReadStream(`./src/public/resizeImg/${filepath}.jpg`).pipe(res);
};

const recieveImages = async (req, res) => {
  const imagesId = [];
  const files = req.files;

  files.map(async (file) => {
    const id = Date.now();
    imagesId.push(id);
    dimensions = sizeOf(file.path);
    direction.push(storageController.getDirection(dimensions));
    console.log(dimensions);
    const processedImage = await sharp(file.path).toBuffer();
    const resizeValues = storageController.resizeAgaintsA4sheet(dimensions);

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

  res.status(200).send({ id: imagesId, direction: direction });
  direction = [];
};

module.exports = { getImage, recieveImages };
