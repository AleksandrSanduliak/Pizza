const APIError = require("../exeptions/apiError");
module.exports = function (err, req, res, next) {
  if (err instanceof APIError) {
    return res.status(err.status).json({
      errors: err.errors,
      message: err.message,
    });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
