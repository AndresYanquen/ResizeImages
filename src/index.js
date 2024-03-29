const express = require("express");
const path = require("path");
const ejs = require("ejs");
const multer = require("multer");
const uuid = require("uuid").v4;

const storageController = require("./storageController/index");

const storage = storageController.storage;

const app = express();
const port = process.env.PORT || 3000;
app.set("port", port);
app.set("views", path.join(__dirname, "views"));
console.log(100, path.join(__dirname, "public/resizeImg"));
app.set("view engine", "ejs");

app.use(require("./routes/index"));

app.listen(app.get("port"), () => {
  console.log(`Server on Port ${app.get("port")}`);
});
