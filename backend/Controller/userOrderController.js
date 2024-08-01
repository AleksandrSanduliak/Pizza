const OrderService = require("../Services/orderService");

class UserOrderController {
  async promoCode(req, res, next) {
    try {
      const checkPromoCode = await OrderService.getPromoCode(req.body);
      return res.json(checkPromoCode);
    } catch (error) {
      next(error);
    }
  }

  async addToCard(req, res, next) {
    try {
      console.log(req.body);
      const saveCard = await OrderService.addToCard(req.body, req.user);
      const getUserCard = await OrderService.getUserCard(req.user.id);

      return res.json(getUserCard);
    } catch (error) {
      next(error);
    }
  }

  async incrementItemCard(req, res, next) {
    try {
      console.log(req.body);
      const increment = await OrderService.incrementItem(req.user.id, req.body);
      const getUserCard = await OrderService.getUserCard(req.user.id);

      return res.json(getUserCard);
    } catch (error) {
      next(error);
    }
  }

  async decrementItemCard(req, res, next) {
    try {
      console.log(req.body);
      const decrement = await OrderService.decrementItem(req.user.id, req.body);
      const getUserCard = await OrderService.getUserCard(req.user.id);

      return res.json(getUserCard);
    } catch (error) {
      next(error);
    }
  }

  async deleteItemCard(req, res, next) {
    try {
      console.log(req.body);
      const deleteItem = await OrderService.deleteItem(req.user.id, req.body);
      const getUserCard = await OrderService.getUserCard(req.user.id);

      return res.json(getUserCard);
    } catch (error) {
      next(error);
    }
  }

  async saveOrder(req, res, next) {
    try {
      console.log(req.body);
      const saveOrder = await OrderService.saveOrder(req.user.id, req.body);
      // const getUserCard = await OrderService.getUserCard(req.user.id);
      console.log("saveOrder", saveOrder);
      return res.json({ orderId: saveOrder });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserOrderController();
