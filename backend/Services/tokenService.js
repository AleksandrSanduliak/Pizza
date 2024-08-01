const jwt = require("jsonwebtoken");
const { db } = require("../Firebase/firebaseConntect");
const APIError = require("../exeptions/apiError");
class tokenService {
  generateToken(user) {
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH, {
      expiresIn: "30d",
    });
    const accesToken = jwt.sign(user, process.env.JWT_ACCES, {
      expiresIn: "15m",
    });
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
      const writeToken = await db
        .collection("tokens")
        .doc(userId, refreshToken);
    }
    const token = await db
      .collection("tokens")
      .doc(userId)
      .set({ userId: userId, refreshToken: refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const token = await db
      .collection("tokens")
      .where("refreshToken", "==", refreshToken)
      .get()
      .then(async (querySnapshot) => {
        querySnapshot.forEach((doc) => doc.ref.delete());
      })
      .catch(function (error) {});
    return token;
  }
  async findToken(refreshToken) {
    if (!refreshToken) throw APIError.TokenError();
    const token = await db
      .collection("tokens")
      .where("refreshToken", "==", refreshToken)
      .get()
      .then(async function (querySnapshot) {
        if (!querySnapshot.size) {
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
