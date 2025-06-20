require("dotenv").config();
const express = require("express");
const userRouter = require("./routers/users.router");
const todoRouter = require("./routers/todos.router");
// 에러 미들웨어
const errorHandlingMiddleware = require("./middleware/error-handling-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", [userRouter, todoRouter]);

// 오류 처리 미들웨어
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, `포트로 서버가 열림`);
});
