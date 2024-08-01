const express = require("express");
const orderRouter = express.Router();
const UserOrderController = require("../Controller/userOrderController");
const authMiddleware = require("../middleware/authMiddleware");

orderRouter.post("/getPromo", UserOrderController.promoCode);
orderRouter.patch("/saveCard", authMiddleware, UserOrderController.addToCard);
orderRouter.patch(
  "/incrementItem",
  authMiddleware,
  UserOrderController.incrementItemCard
);
orderRouter.patch(
  "/decrementItem",
  authMiddleware,
  UserOrderController.decrementItemCard
);
orderRouter.delete(
  "/deleteItem",
  authMiddleware,
  UserOrderController.deleteItemCard
);
orderRouter.post("/saveOrder", authMiddleware, UserOrderController.saveOrder);

module.exports = orderRouter;
