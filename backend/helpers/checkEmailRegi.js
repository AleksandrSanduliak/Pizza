const { db } = require("../Firebase/firebaseConntect");
const APIError = require("../exeptions/apiError");
const CheckEmailRegi = async (email) => {
  const uniqueUser = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  console.log(email, uniqueUser, "fdsfds");
  if (!uniqueUser.empty) {
    console.log("EmailCheck error");
    throw APIError.BadReq("Пользователь с таким email уже зарегистрирован");
  }
  return uniqueUser;
};
module.exports = CheckEmailRegi;
