const APIError = require("../exeptions/apiError");
const tokenService = require("../Services/tokenService");
module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(APIError.UnauthError());
    }

    const accesToken = authHeader.split(" ")[1];
    if (!accesToken) {
      return next(APIError.UnauthError());
    }

    const userData = tokenService.validateAccesToken(accesToken);
    console.log("userData", userData);
    if (!userData) {
      return next(APIError.UnauthError());
    }

    req.user = userData;
    next();
  } catch (err) {
    console.log(err);
  }
};
