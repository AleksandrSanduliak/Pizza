const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./Router/Router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorMiddleware = require("./middleware/errorMiddleware");
require("dotenv").config();

app.use(
  cors({
    origin: process.env.FRONT_API,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(ErrorMiddleware);

app.get("/", function (req, res) {
  res.send("<h2>server start test response</h2>");
});
app.use("/api/auth", router);
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
