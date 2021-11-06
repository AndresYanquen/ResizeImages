const { Router } = require("express");
const path = require("path");
const sharp = require("sharp");
const storageController = require("../storageController/index");
const fs = require("fs");
const sizeOf = require("image-size");
const { getImage, recieveImages } = require("../controllers");

const storage = storageController.storage;

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/image/:filepath", getImage);

router.post("/upload", storageController.multerFUnction, recieveImages);

module.exports = router;
