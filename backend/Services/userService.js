const { db } = require("../Firebase/firebaseConntect");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./tokenService");
const MailService = require("./mailService");
const APIError = require("../exeptions/apiError");
const CheckActivationLink = require("../helpers/checkActivationLink");
const CheckEmailLogin = require("../helpers/checkEmailLogin");
const CheckEmailRegistration = require("../helpers/checkEmailRegi");
const UserDto = require("../dto/user-dto");
const TokenDto = require("../dto/token-dto");
require("dotenv").config();
const obj = require("../helpers/cardItems");

class UserService {
  async registration(data) {
    CheckEmailRegistration(data.email);

    const hashPassword = await bcrypt.hash(data.password, 10);
    const generateActivationLink = uuid.v4();
    const userDto = new UserDto({...data, password: hashPassword, generateActivationLink})
    const user = await db.collection("users").add({...userDto});

    const dto = new TokenDto(user.id, data.email);
    const token = tokenService.generateToken({ ...dto });

    const saveToken = tokenService.saveToken(user.id, token.refreshToken);
    MailService.sendMail(data.email,`${process.env.EMAIL_API}/api/auth/activate/` + generateActivationLink);
    return { ...token, user: dto, saveToken };
  }

  async activate(activationLink) {
    const checkLink = CheckActivationLink(activationLink);
    console.log(checkLink, "checklink");
  }

  async login(email, userPassword) {
    const user = CheckEmailLogin(email);

    return user.then(async function (querySnapshot) {
      if (!querySnapshot.size) throw APIError.BadReq("Пользователь с таким email не существует");
      
      const snap = querySnapshot.docs[0];
      if (!snap.data()) throw APIError.BadReq("Пользователь с таким email не существует");

      const { password, bonuses } = snap.data();
      const checkHashPassword = await bcrypt.compare(userPassword, password);
      if (!checkHashPassword) throw APIError.BadReq("Неверный пароль");

      const dto = new TokenDto(snap.id, email);
      const token = tokenService.generateToken({ ...dto });
      const saveToken = tokenService.saveToken(dto.id, token.refreshToken);

      // const addToFirebase = (data) => {
      //   data.goods?.map((good) => {
      //     db.collection("goods").doc(good.name).set(good, { merge: true });
      //   });
      // };
      // addToFirebase(obj);
      // add to firebase object
      
      return { ...token, user: dto, bonuses };
    });
  }

  async logout(refToken) {
    return await tokenService.removeToken(refToken);
  }

  async refresh(refreshToken) {
    console.log("refresh token", refreshToken);
    if (!refreshToken) throw APIError.UnauthError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!tokenFromDB || !userData) throw APIError.UnauthError();

    const findEmail = db.collection("users").doc(tokenFromDB.userId);
    
    const doc = await findEmail.get();
    const { email, bonuses } = doc.data();
    if (!email) throw APIError.UnauthError();

    const dto = new TokenDto(userData.id, email)
    const token = tokenService.generateToken({ ...dto });
    const saveToken = tokenService.saveToken(dto.id, token.refreshToken);

    return { ...token, user: dto, bonuses };
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
