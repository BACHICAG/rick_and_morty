const express = require("express");

const { login } = require("../Controllers/Login");

const userRouter = express.Router();

userRouter.get("/login", login);

module.exports = {
    userRouter,
}