const express = require("express");
const app = express();
const PORT = 3000;
const authRouter = require("./Router/authRouter");
const orderRouter = require("./Router/orderRouter");
const goodsRouter = require("./Router/goodsRouter");
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
  res.send("<h2>server</h2>");
});

app.use("/api/auth", authRouter);
app.use("/api/order", orderRouter);
app.use("/api/goods", goodsRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (err) {
    throw new Error("Ошибка запуска сервера");
  }
};

start();
