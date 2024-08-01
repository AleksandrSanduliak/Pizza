const GoodsService = require("../Services/goodsService");
class GoodsController {
  async getGoods(req, res, next) {
    try {
      const getGoods = await GoodsService.getGoods();
      return res.json(getGoods);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GoodsController();
