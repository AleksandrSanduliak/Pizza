const express = require("express");
const authRouter = express.Router();
const UserController = require("../Controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

authRouter.post("/register", UserController.register);
authRouter.post("/login", UserController.login);
authRouter.post("/logout", UserController.logout);
authRouter.get("/refresh", UserController.refresh);
authRouter.get("/activate/:link", UserController.activate);
authRouter.get("/user", authMiddleware, UserController.user);

module.exports = authRouter;
