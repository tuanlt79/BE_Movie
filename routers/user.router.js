const express = require("express");
const {
  getListUser,
  getInfoUser,
  createUser,
  updateUser,
  removeUser,
} = require("../controller/user.controller");
const { checkExit } = require("../middleware/validation/check-exit.middleware");
const userRouter = express.Router();
const { User } = require("../models");
//get list user
userRouter.get("/", getListUser);
//get user id
userRouter.get("/:id", checkExit(User), getInfoUser);
// create user
userRouter.post("/", createUser);

//  update user
userRouter.put("/:id", checkExit(User), updateUser);

// delete user
userRouter.delete("/:id", checkExit(User), removeUser);
module.exports = { userRouter };
