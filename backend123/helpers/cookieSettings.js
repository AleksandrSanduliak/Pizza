const cookieSettings = {
  maxAge: 1000 * 60 * 60 * 24 * 30,
  httpOnly: true,
  sameSite: "strict",
  secure: true
};

module.exports = { cookieSettings };
