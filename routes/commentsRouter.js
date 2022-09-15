const express = require("express");
const { handleGetAllComments, handleGetSearchedComments } = require("../controllers/commentsController");
const commentsRouter = express.Router();

commentsRouter.get("/", handleGetAllComments);
commentsRouter.get("/searchTerm", handleGetSearchedComments);

module.exports = commentsRouter;
