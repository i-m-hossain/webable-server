const express = require("express");
const { handleGetAllComments } = require("../controllers/commentsController");
const commentsRouter = express.Router();

commentsRouter.get("/", handleGetAllComments);

module.exports = commentsRouter;
