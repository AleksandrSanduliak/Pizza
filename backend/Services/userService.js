const { db } = require("../Firebase/firebaseConntect");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./tokenService");
const MailService = require("./mailService");
const APIError = require("../exeptions/apiError");
const CheckEmail = require("../helpers/checkEmailRegi");
const CheckActivationLink = require("../helpers/checkActivationLink");
const CheckEmailLogin = require("../helpers/checkEmailLogin");
const CheckEmailRegi = require("../helpers/checkEmailRegi");
require("dotenv").config();
const obj = require("../helpers/cardItems");

class UserService {
  async registration(data) {
    const checkmail = CheckEmailRegi(data.email);
    const hashPassword = await bcrypt.hash(data.password, 10);
    const generateActivationLink = uuid.v4();
    const user = await db.collection("users").add({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      dateBrith: data.dateBrith,
      password: hashPassword,
      isActivated: false,
      generateActivationLink,
    });
    const dto = { id: user.id, email: data.email };
    const token = tokenService.generateToken({ ...dto });
    const saveToken = tokenService.saveToken(user.id, token.refreshToken);
    const mailService = MailService.sendMail(
      data.email,
      `${process.env.EMAIL_API}/api/auth/activate/` + generateActivationLink
    );
    return { ...token, user: dto, saveToken };
  }
  async activate(activationLink) {
    console.log(activationLink);
    const checkLink = CheckActivationLink(activationLink);
    console.log(checkLink, "checklink");
  }
  async login(email, password) {
    const user = CheckEmailLogin(email);
    const LoginLogic = user.then(async function (querySnapshot) {
      if (!querySnapshot.size) {
        throw APIError.BadReq("Пользователь с таким email не существует");
      }
      const snap = querySnapshot.docs[0];

      if (!snap.data()) {
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

      const addToFirebase = (data) => {
        console.log(data.goods);
        // let result = [...data];
        data.goods?.map((good) => {
          // console.log(good);
          // good.items.map((goodItem) => {
          //   console.log(goodItem);
          // });
          db.collection("goods").doc(good.name).set(good, { merge: true });
        });
        //   for (let item of data.items) {
        //     const generateID = uuid.v4();
        //     let newObject = Object.assign({}, { ...item, generateID });
        //     // console.log("item", item);
        //     // console.log("result.item", result.items);
        //     result.items[item.id] = { ...newObject, productId: generateID };
        //     delete newObject.id;
        //   }
        //   console.log("res", result);
        //   db.collection("goods").doc("pizza").set(result, { merge: true });
      };
      addToFirebase(obj);

      return { ...token, user: dto };
    });
    return LoginLogic;
  }
  async logout(refToken) {
    const token = await tokenService.removeToken(refToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) throw APIError.UnauthError();
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!tokenFromDB || !userData) throw APIError.UnauthError();
    const findEmail = db.collection("users").doc(tokenFromDB.userId);
    const doc = await findEmail.get();
    const emailDB = doc.data().email;

    if (!emailDB) throw APIError.UnauthError();
    const dto = { id: userData.id, email: emailDB };
    const token = tokenService.generateToken({ ...dto });
    const saveToken = tokenService.saveToken(dto.id, token.refreshToken);

    return { ...token, user: dto };
  }
  async user(data) {
    const findUser = db.collection("users").doc(data.id);
    const user = await findUser.get();

    const dto = {
      email: user.data().email,
      dateBrith: user.data().dateBrith,
      phone: user.data().phone,
      name: user.data().name,
    };

    return dto;
  }
}
module.exports = new UserService();
