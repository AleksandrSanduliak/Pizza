const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/activate/:link", UserController.activate);
router.get("/user", authMiddleware, UserController.user);

module.exports = router;
