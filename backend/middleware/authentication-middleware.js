require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const verifiedToken = verifyToken(token);

  if (!verifiedToken) {
    return next(new Error("Forbidden"));
  }

  req.user = verifiedToken.userId;
  res.locals.user = verifiedToken.userId;

  next();
};

// try-catch 최소화
function verifyToken(token) {
  try {
    // 토큰 해석해서 user 가져옴
    const user = jwt.verify(token, SECRET_KEY);
    return user;
  } catch (e) {
    return false;
  }
}
