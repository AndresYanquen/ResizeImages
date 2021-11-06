const { Router } = require("express");
const path = require("path");
const sharp = require("sharp");
const storageController = require("../storageController/index");
const fs = require("fs");
const sizeOf = require("image-size");

let direction = [];
let dimensions;

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
    console.log(dimensions);
    const processedImage = await sharp(file.path).toBuffer();
    const resizeValues = storageController.resizeAgaintsA4sheet(dimensions);
    direction.push(storageController.getDirection(dimensions));
    console.log("La dirección es : " + direction);
    const resizeImage = sharp(processedImage).resize(
      resizeValues.width,
      resizeValues.height,
      {
        fit: "contain",
      }
    );
    /* const resizeImageBuffer = await resizeImage.toBuffer();
    fs.writeFileSync(`./src/public/resizeImg/${id}.jpg`, resizeImageBuffer); */
  });

  let jsonResponse = {
    id: imagesId,
    visualDirection: direction,
  };
  console.log(`El valor de directions es : ${direction} `);
  console.log(jsonResponse);
  res.status(200).send(jsonResponse);
  direction = [];
};

module.exports = { getImage, recieveImages };
