const { db } = require("../Firebase/firebaseConntect");
class GoodsService {
  async getGoods(req) {
    const getGoodsData = await db.collection("goods").get();
    // const transformData = {};
    const transformData = [];
    getGoodsData.forEach((good) => {
      //   console.log("good", good.data());
      //   transformData[good.data().anchor] = good.data();
      transformData.push(good.data());
    });
    return transformData;
  }
}

module.exports = new GoodsService();
