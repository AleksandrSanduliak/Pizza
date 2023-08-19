const UserService = require("../Services/userService");

class UserController {
  async register(req, res, next) {
    try {
      const user = await UserService.registration(req.body);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "strict",
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await UserService.login(email, password);
      console.log(user, "user");
      console.log(user.refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        // maxAge: 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      console.log(req.cookies);
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
    console.log(req.cookies, "req cookie");
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken, "refreshToken");
      const user = await UserService.refresh(refreshToken);
      console.log(user, "user");
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activate = await UserService.activate(req.params.link);
      return res.redirect(process.env.FRONTEND_URL);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
