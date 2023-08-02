const express = require("express");
const jwtMiddleware = require("../jwtMiddleware");
const addComment = require("../controllers/comment/addComment");
const removeComment = require("../controllers/comment/removeComment");

const commentRouter = express.Router();
commentRouter.post("/", jwtMiddleware, addComment);
commentRouter.delete("/:comment_id", jwtMiddleware, removeComment);
module.exports = commentRouter;
