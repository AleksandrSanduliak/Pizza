const UserService = require("../Services/userService");
const { cookieSettings } = require("../helpers/cookieSettings");
class UserController {
  async register(req, res, next) {
    try {
      const user = await UserService.registration(req.body);
      res.cookie("refreshToken", user.refreshToken, cookieSettings);
      return res.json(user);
    } catch (error) {
      console.log("error register");
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      console.log(req.body.email);
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, cookieSettings);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const logout = await UserService.logout(refreshToken);
      res.clearCookie("accesToken");
      res.clearCookie("refreshToken");
      return res.json(logout);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, cookieSettings);
      return res.json(user);
    } catch (error) {
      res.clearCookie("accesToken");
      res.clearCookie("refreshToken");
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activate = await UserService.activate(req.params.link);
      res.redirect(`${process.env.FRONT_API}`);
    } catch (error) {
      next(error);
    }
  }
  async user(req, res, next) {
    // console.log();
    const user = await UserService.user(req.user);
    console.log(user);
    return res.json(user);
  }
}
module.exports = new UserController();
