const UserService = require("../Services/userService");
const OrderService = require("../Services/orderService");
const { cookieSettings } = require("../helpers/cookieSettings");

class UserController {
  async register(req, res, next) {
    try {
      const user = await UserService.registration(req.body);

      res.cookie("refreshToken", user.refreshToken, cookieSettings);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      const userCard = await OrderService.getUserCard(user.user.id);
      
      res.cookie("refreshToken", user.refreshToken, cookieSettings);
      return res.json({ user: user, userCard: userCard });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const logout = await UserService.logout(refreshToken);

      res.clearCookie("refreshToken", { path: '/' });
      return res.json(logout);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await UserService.refresh(refreshToken);
      const userCard = await OrderService.getUserCard(user.user.id);
      console.log('user', user)
      
      // res.cookie("accessToken", user.accessToken, cookieSettings);
      res.cookie("refreshToken", user.refreshToken, cookieSettings);
      return res.json({ user: user, userCard: userCard });
    } catch (error) {
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
    try {
      const user = await UserService.user(req.user);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
