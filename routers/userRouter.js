const express = require("express");
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const editUser = require("../controllers/user/editUser");
const deleteUser = require("../controllers/user/deleteUser");
const jwtMiddleware = require("../jwtMiddleware");

const userRouter = express.Router();
userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.put("/:user_id", jwtMiddleware, editUser);
userRouter.delete("/:user_id", jwtMiddleware, deleteUser);

module.exports = userRouter;
