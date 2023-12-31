const jwt = require("jsonwebtoken");
const { db } = require("../Firebase/firebaseConntect");
const APIError = require("../exeptions/apiError");
class tokenService {
  generateToken(user) {
    console.log("generate token");
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH, {
      expiresIn: "30d",
    });
    const accesToken = jwt.sign(user, process.env.JWT_ACCES, {
      expiresIn: "15m",
    });
    console.log(refreshToken);
    return {
      refreshToken,
      accesToken,
    };
  }
  async saveToken(userId, refreshToken) {
    const uniqueToken = await db
      .collection("tokens")
      .where("refreshToken", "==", refreshToken)
      .get();
    if (!uniqueToken.empty) {
      console.log("unique token");
      const writeToken = await db
        .collection("tokens")
        .doc(userId, refreshToken);
    }
    const token = await db
      .collection("tokens")
      .doc(userId)
      .set({ userId: userId, refreshToken: refreshToken });
    console.log(userId, "token");
    return token;
  }
  async removeToken(refreshToken) {
    const token = await db
      .collection("tokens")
      .where("refreshToken", "==", refreshToken)
      .get()
      .then(async (querySnapshot) => {
        querySnapshot.forEach((doc) => doc.ref.delete());
        console.log("succes logout");
      })
      .catch(function (error) {
        console.log(error);
      });
    return token;
  }
  async findToken(refreshToken) {
    if (!refreshToken) throw APIError.TokenError();
    console.log(refreshToken, "refreshToken find token");
    const token = await db
      .collection("tokens")
      .where("refreshToken", "==", refreshToken)
      .get()
      .then(async function (querySnapshot) {
        if (!querySnapshot.size) {
          console.log("Ошибка поиска токена");
          throw APIError.UnauthError();
        }
        const snap = querySnapshot.docs[0];
        return snap.data();
      })
      .catch(function (error) {
        console.log(error.message);
      });
    return token;
  }
  validateRefreshToken(refreshToken) {
    try {
      const user = jwt.verify(refreshToken, process.env.JWT_REFRESH);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  validateAccesToken(accesToken) {
    try {
      const user = jwt.verify(accesToken, process.env.JWT_ACCES);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new tokenService();
