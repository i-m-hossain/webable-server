const express = require("express");
const searchRouter = express.Router();
searchRouter.route("/").get(function (req, res) {
    res.status(200).send("hello files");
});

module.exports = searchRouter;
