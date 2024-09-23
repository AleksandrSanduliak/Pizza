const GoodsService = require("../Services/goodsService");
class GoodsController {
  async getGoods(req, res, next) {
    try {
      console.log('res', res.cookies)
      console.log('req', req.cookies.location)
      const getGoods = await GoodsService.getGoods(req.cookies.location);
      return res.json(getGoods);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GoodsController();
