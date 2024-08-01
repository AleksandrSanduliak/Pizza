const express = require("express");
const goodsRouter = express.Router();
const GoodsController = require("../Controller/goodsController");
const authMiddleware = require("../middleware/authMiddleware");

goodsRouter.get("/getGoods", GoodsController.getGoods);

module.exports = goodsRouter;
