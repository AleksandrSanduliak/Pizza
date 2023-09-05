const { db } = require("../Firebase/firebaseConntect");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./tokenService");
const MailService = require("./mailService");
const APIError = require("../exeptions/apiError");
require("dotenv").config();

class UserService {
  async registration(data) {
    const uniqueUser = await db
      .collection("users")
      .where("email", "==", data.email)
      .get();
    if (!uniqueUser.empty) {
      throw APIError.BadReq("Пользователь с таким email уже зарегистрирован");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const activationLink = uuid.v4();
    const user = await db.collection("users").add({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      dateBrith: data.dateBrith,
      password: hashPassword,
      isActivated: false,
      activationLink,
    });
    const dto = { id: user.id, email: data.email };
    const token = tokenService.generateToken({ ...dto });
    const saveToken = tokenService.saveToken(user.id, token.refreshToken);
    const mailService = MailService.sendMail(
      data.email,
      `${process.env.EMAIL_API}/api/auth/activate/` + activationLink
    );
    return { ...token, user: dto, saveToken };
  }
  async activate(activationLink) {
    const user = await db
      .collection("users")
      .where("activationLink", "==", activationLink)
      .get()
      .then(async function (querySnapshot) {
        if (querySnapshot.size === 1) {
          const snap = querySnapshot.docs[0];
          await snap.ref.update({ isActivated: true });
          res.redirect(process.env.CLIENT_URL);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (!user.empty) {
      console.log("Ошибка доступа к БД");
      throw APIError.BadReq("Не корректная ссылка для активации пользователя");
    }
  }
  async login(email, password) {
    console.log(email, password);
    const user = await db
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(async function (querySnapshot) {
        if (!querySnapshot.size) {
          console.log("Пользователь с таким email не существует");
          throw APIError.BadReq("Пользователь с таким email не существует");
        }
        const snap = querySnapshot.docs[0];
        if (!snap.data()) {
          console.log("Пользователь с таким email не существует");
          throw APIError.BadReq("Пользователь с таким email не существует");
        }
        const checkHashPassword = await bcrypt.compare(
          password,
          snap.data().password
        );
        if (!checkHashPassword) {
          console.log("Неверный пароль");
          throw APIError.BadReq("Неверный пароль");
        }
        const dto = { id: snap.id, email: email };
        const token = tokenService.generateToken({ ...dto });
        const saveToken = tokenService.saveToken(dto.id, token.refreshToken);
        return { ...token, user: dto };
      });
    return user;
  }
  async logout(refToken) {
    const token = await tokenService.removeToken(refToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) throw APIError.UnauthError();
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    // console.log(refreshToken);
    // console.log(userData, "userData 2");
    // console.log(tokenFromDB, "token from db");
    if (!tokenFromDB || !userData) throw APIError.UnauthError();
    const findEmail = await db.collection("users").doc(tokenFromDB.userId);
    const doc = await findEmail.get();
    const emailDB = doc.data().email;
    // console.log(emailDB);
    if (!emailDB) throw APIError.UnauthError();

    const dto = { id: userData.id, email: emailDB };
    const token = tokenService.generateToken({ ...dto });
    const saveToken = tokenService.saveToken(dto.id, token.refreshToken);
    return { ...token, user: dto };
  }
}
module.exports = new UserService();
