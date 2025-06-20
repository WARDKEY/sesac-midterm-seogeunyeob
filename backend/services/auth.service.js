require("dotenv").config();
const authRepository = require("../repository/auth.repository.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  async signUp({ email, password, username }) {
    // 입력 받은 이메일을 보고 데이터베이스에 값이 있는지 확인
    const existingUser = await authRepository.findUserByEmail(email);
    console.log(email, password, username);

    if (existingUser) {
      throw new Error("ExistEmail");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await authRepository.createUser(
      email,
      bcryptPassword,
      username
    );

    console.log(newUser);

    return { userId: newUser.userId };
  }

  // 로그인
  async login({ email, password }) {
    const existingUser = await authRepository.findUserByEmail(email);
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!existingUser) {
      throw new Error("UserNotFound");
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) {
      throw new Error("PasswordError");
    }

    const token = jwt.sign({ userId: existingUser.userId }, SECRET_KEY, {
      expiresIn: "12h",
    });

    return token;
  }
}

// 호출될 때 생성
module.exports = new AuthService();
