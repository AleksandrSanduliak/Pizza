const { db } = require("../Firebase/firebaseConntect");
const CheckEmailLogin = async (email) => {
  const uniqueUser = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  return uniqueUser;
};
module.exports = CheckEmailLogin;
