module.exports = class APIError extends Error {
  status;
  errors;
  constructor(status, errors = [], message) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthError() {
    return new APIError(401, "Пользователь не авторизован");
  }
  static BadReq(message, errors = []) {
    return new APIError(400, message, errors);
  }
};
