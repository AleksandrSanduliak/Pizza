const { db } = require("../Firebase/firebaseConntect");
const admin = require("firebase-admin");
const APIError = require("../exeptions/apiError");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

class OrderService {
  async getPromoCode(req, res, next) {
    const findPromoCode = await db
      .collection("promocodes")
      .where("name", "==", req.promoCode)
      .get();
    const isFindPromoCode = findPromoCode?.docs[0]?.data();
    if (!isFindPromoCode) {
      throw APIError.BadReq("Промокод не найден");
    }
    const percent = (req.totalPrice * isFindPromoCode.percent) / 100;
    const newTotalPrice = parseFloat(req.totalPrice - percent).toFixed(0);
    return {
      totalPrice: newTotalPrice,
      discountPrice: req.totalPrice,
    };
  }

  async addToCard(body, user) {
    // const batch = db.batch();
    // const cardInfo = await db
    //   .collection("users")
    //   .doc(user.id)
    //   .collection("currentOrder")
    //   .doc("cardInfo")
    //   .get();
    // const cardInfoRef = await db
    //   .collection("users")
    //   .doc(user.id)
    //   .collection("currentOrder")
    //   .doc("cardInfo");
    // const saveCard = await db
    //   .collection("users")
    //   .doc(user.id)
    //   .collection("currentOrder")
    //   .where("id", "==", body.id)
    //   .get();
    // console.log("save card", saveCard.docs.length);
    // if (saveCard?.docs.length === 0) {
    //   console.log("add body");
    //   const currentOrder = await db
    //     .collection("users")
    //     .doc(user.id)
    //     .collection("currentOrder")
    //     .doc();
    //   batch.set(currentOrder, {
    //     ...body,
    //     count: 1,
    //     totalPrice: admin.firestore.FieldValue.increment(body.price),
    //   });
    //   console.log("cardInfo.exists", cardInfo.exists);
    //   if (!cardInfo.exists) {
    //     // await cardInfo.ref.set({
    //     //   totalPrice: admin.firestore.FieldValue.increment(body.price),
    //     //   totalCount: admin.firestore.FieldValue.increment(1),
    //     // });
    //     batch.set(cardInfoRef, {
    //       totalPrice: admin.firestore.FieldValue.increment(body.price),
    //       // totalCount: 1,
    //       totalCount: admin.firestore.FieldValue.increment(1),
    //     });
    //     // return;
    //   }
    //   batch.set(
    //     cardInfoRef,
    //     {
    //       totalPrice: admin.firestore.FieldValue.increment(body.price),
    //       totalCount: admin.firestore.FieldValue.increment(1),
    //     },
    //     { merge: true }
    //   );
    //   // console.log("not exist");
    //   // await cardInfo.ref.set({
    //   //   totalPrice: admin.firestore.FieldValue.increment(body.price),
    //   //   totalCount: admin.firestore.FieldValue.increment(1),
    //   // });
    //   // batch.commit();
    // } else {
    //   console.log("add count");
    //   // const batch = db.batch();
    //   const cardRef = await db
    //     .collection("users")
    //     .doc(user.id)
    //     .collection("currentOrder")
    //     .doc(saveCard.docs[0].id);
    //   batch.update(
    //     cardRef,
    //     {
    //       count: admin.firestore.FieldValue.increment(1),
    //       totalPrice: admin.firestore.FieldValue.increment(body.price),
    //     },
    //     { merge: true }
    //   );
    //   const cardInfoRef = await db
    //     .collection("users")
    //     .doc(user.id)
    //     .collection("currentOrder")
    //     .doc("cardInfo");
    //   batch.set(
    //     cardInfoRef,
    //     {
    //       totalPrice: admin.firestore.FieldValue.increment(body.price),
    //       totalCount: admin.firestore.FieldValue.increment(1),
    //     },
    //     { merge: true }
    //   );
    // }
    // batch.commit();
    const saveCard = db
      .collection("users")
      .doc(user.id)
      .collection("currentOrder");

    const cardInfo = db
      .collection("users")
      .doc(user.id)
      .collection("currentOrder")
      .doc("cardInfo");

    const find = saveCard.where("id", "==", body.id);
    try {
      const res = await db.runTransaction(async (t) => {
        const doc = await t.get(find);
        const cardInfoDoc = await t.get(cardInfo);

        if (doc.size) {
          const id = doc.docs[0].id;
          // const newCount = doc.docs[0].data().count + 1;
          // const newTotalPrice = doc.docs[0].data().totalPrice + body.price;
          // const newtotalCount = cardInfoDoc.data()?.totalCount + 1;
          // const newtotalPrices = cardInfoDoc.data()?.totalPrice + body.price;
          t.update(saveCard.doc(id), {
            count: admin.firestore.FieldValue.increment(1),
            totalPrice: admin.firestore.FieldValue.increment(body.price),
          });
          t.update(cardInfoDoc.ref, {
            totalCount: admin.firestore.FieldValue.increment(1),
            totalPrice: admin.firestore.FieldValue.increment(body.price),
          });
          return;
        }

        if (!doc.size) {
          t.set(saveCard.doc(), {
            ...body,
            count: admin.firestore.FieldValue.increment(1),
            totalPrice: admin.firestore.FieldValue.increment(body.price),
          });
          t.set(
            saveCard.doc("cardInfo"),
            {
              totalCount: admin.firestore.FieldValue.increment(1),
              totalPrice: admin.firestore.FieldValue.increment(body.price),
            },
            { merge: true }
          );
        }
      });
    } catch (e) {
      console.log("Transaction failure:", e);
    }
  }

  async getUserCard(userId) {
    console.log("getUserCard", userId);
    const card = [];
    let cardInfo = {};

    const userCard = await db
      .collection("users")
      .doc(userId)
      .collection("currentOrder")
      .get();

    const result = userCard.forEach((doc) => {
      if (doc.id === "cardInfo") {
        cardInfo = doc.data();
        return;
      }

      card.push(doc.data());
    });

    return { card, cardInfo };
  }

  async incrementItem(userId, body) {
    console.log("userID =", userId);
    console.log("body =", body);
    const currentOrder = db
      .collection("users")
      .doc(userId)
      .collection("currentOrder");
    const batch = db.batch();
    const find = currentOrder.where("id", "==", body.id);
    const getData = await find.get();
    console.log("getData ID", getData.docs[0].id);
    const docId = getData.docs[0].id;
    batch.update(currentOrder.doc(docId), {
      count: admin.firestore.FieldValue.increment(1),
      // totalPrice: admin.firestore.FieldValue.increment("540"),
    });
    batch.update(currentOrder.doc("cardInfo"), {
      totalCount: admin.firestore.FieldValue.increment(1),
    });
    // console.log("getData =", getData.docs[0].data());
    batch.commit();
  }

  async decrementItem(userId, body) {
    console.log("userID =", userId);
    console.log("body =", body);
    const currentOrder = db
      .collection("users")
      .doc(userId)
      .collection("currentOrder");
    const batch = db.batch();
    const find = currentOrder.where("id", "==", body.id);
    const getData = await find.get();
    console.log("getData ID", getData.docs[0].id);
    const docId = getData.docs[0].id;
    batch.update(currentOrder.doc(docId), {
      count: admin.firestore.FieldValue.increment(-1),
      // totalPrice: admin.firestore.FieldValue.increment("540"),
    });
    batch.update(currentOrder.doc("cardInfo"), {
      totalCount: admin.firestore.FieldValue.increment(-1),
    });
    // console.log("getData =", getData.docs[0].data());
    batch.commit();
  }

  async deleteItem(userId, body) {
    console.log("userID =", userId);
    console.log("body =", body);
    const currentOrder = db
      .collection("users")
      .doc(userId)
      .collection("currentOrder");

    const find = currentOrder.where("id", "==", body.id);

    const batch = db.batch();
    const getData = await find.get();
    const getCardInfo = await currentOrder.doc("cardInfo");
    const docId = getData.docs[0].id;
    const docCounter = getData.docs[0].data().count;
    const docTotalPrice = getData.docs[0].data().totalPrice;
    console.log("docCounter =", -docCounter);
    // const res = await currentOrder.doc(docId).delete();
    batch.update(getCardInfo, {
      totalCount: admin.firestore.FieldValue.increment(-docCounter),
      totalPrice: admin.firestore.FieldValue.increment(-docTotalPrice),
    });
    batch.delete(currentOrder.doc(docId));
    batch.commit();
  }

  async saveOrder(userId, body) {
    console.log("userID =", userId);
    console.log("body =", body);
    const updateOrderHistory = db
      .collection("users")
      .doc(userId)
      .collection("orderHistory")
      .doc();

    const currentOrder = db
      .collection("users")
      .doc(userId)
      .collection("currentOrder");
    const updateUsersOrderHistory = db.collection("usersOrderHistory");
    let actialOrderId;
    const batch = db.batch();

    const order = await currentOrder.get();
    const ordersCount = await updateUsersOrderHistory.count().get();
    const getOrdersCount = ordersCount.data().count;
    const increaseOrderID = getOrdersCount + 1;
    actialOrderId = increaseOrderID;
    const getCurrentOrder = {};
    order.docs.forEach((doc, index) => {
      if (doc.data().totalCount) {
        getCurrentOrder["cardInfo"] = doc.data();
        batch.delete(doc.ref);
        return;
      }
      getCurrentOrder[index] = doc.data();
      batch.delete(doc.ref);
    });

    console.log("orderHistory", ordersCount.data().count);
    batch.set(
      updateOrderHistory,
      {
        order: getCurrentOrder,
        userInfo: body.userInfo,
        orderId: increaseOrderID,
        date: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    batch.set(
      db.collection("usersOrderHistory").doc(),
      {
        order: getCurrentOrder,
        userInfo: body.userInfo,
        orderId: increaseOrderID,
        date: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    // batch.delete(currentOrder);
    batch.commit();
    return actialOrderId;
  }
}
module.exports = new OrderService();
