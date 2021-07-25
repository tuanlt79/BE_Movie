const express = require("express");
const { signIn } = require("../controller/auth.controller");
const authRouter = express.Router();
authRouter.post("/login", signIn);
module.exports = { authRouter };
