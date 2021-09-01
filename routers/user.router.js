const express = require("express");
const {
  getListUser,
  getInfoUser,
  createUser,
  updateUser,
  removeUser,
} = require("../controller/user.controller");
const {
  authencate,
  authorize,
  verifyToken,
} = require("../middleware/auth/verify-token.middleware");
const {
  checkExit,
  checkDoubleTaiKhoan,
  checkDoubleEmail,
} = require("../middleware/validation/check-exit.middleware");

const userRouter = express.Router();
const { User } = require("../models");
//get list user
userRouter.get("/", getListUser);
//get user id
userRouter.get("/:id", verifyToken, authencate, checkExit(User), getInfoUser);
// create user
userRouter.post(
  "/",
  checkDoubleTaiKhoan(User),
  checkDoubleEmail(User),
  createUser
);

//  update user
userRouter.put(
  "/:id",
  verifyToken,
  authencate,
  authorize(["QuanTri", "Admin"]),
  checkExit(User),
  updateUser
);

// delete user
userRouter.delete(
  "/:id",
  verifyToken,
  authencate,
  authorize(["QuanTri", "Admin"]),
  checkExit(User),
  removeUser
);
module.exports = { userRouter };
