const express = require("express");
const multer = require("multer");
const path = require("path");
const handleFileUpload = require("../controllers/fileController");
const fileRouter = express.Router();

//multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});
const upload = multer({ storage: storage });

fileRouter.post("/upload", upload.single("file"), handleFileUpload);

module.exports = fileRouter;
