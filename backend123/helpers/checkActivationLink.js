const { db } = require("../Firebase/firebaseConntect");

const CheckActivationLink = async (activationLink) => {
  const user = await db
    .collection("users")
    .where("generateActivationLink", "==", activationLink)
    .get()
    .then(async function (querySnapshot) {
      if (querySnapshot.size === 1) {
        const snap = querySnapshot.docs[0];
        await snap.ref.update({ isActivated: true });
        res.redirect(process.env.FRONT_API);
      } else {
        throw APIError.BadReq(
          "Не корректная ссылка для активации пользователя"
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = CheckActivationLink;
