const { Router } = require("express");
const sharp = require("sharp");
const storageController = require("../storageController/index");
const fs = require("fs");
const sizeOf = require("image-size");

const storage = storageController.storage;

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/upload", storageController.multerFUnction, async (req, res) => {
  const dimensions = sizeOf(req.file.path);
  console.log(dimensions.width, dimensions.height);
  const processedImage = await sharp(req.file.path).toBuffer();
  //RESIZE
  const resizeValues = storageController.resizeAgaintsA4sheet(
    processedImage,
    dimensions
  );

  console.log(resizeValues);

  const resizeImage = sharp(processedImage).resize(
    resizeValues.width,
    resizeValues.height,
    {
      fit: "contain",
    }
  );
  const resizeImageBuffer = await resizeImage.toBuffer();

  /*
  console.log(1, resizeImage);
  const img = await sharp(req.file.path).toBuffer();
  const imgTotal = await sharp(img).resize(800, 200, {
    fit: "contain",
  });
  fs.writeFileSync("../public/resizeImg/img.jpeg", imgTotal);
 */
  //console.log(req.file);

  fs.writeFileSync("./src/public/resizeImg/prueba.jpg", resizeImageBuffer);
  res.send("Uploaded");
});

module.exports = router;
