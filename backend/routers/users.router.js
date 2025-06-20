require("dotenv").config();
const express = require("express");
const router = express.Router();
const prisma = require("../utils/prisma.js");
const bcrypt = require("bcrypt");
const {
  handleValidationResult,
  signUpValidator,
  loginValidator,
} = require("../middleware/validation-result-handler");
const authController = require("../controllers/auth.controller.js");

// jwt 설정
const jwt = require("jsonwebtoken");

// jwt 키
const SECRET_KEY = process.env.SECRET_KEY;
// jwt 키

/** 회원가입 API
 * 1. 이메일, 비밀번호, 닉네임 입력이 정확하게 왔는지 검증
 * 2. 비밀번호 6글자 이상
 * 3. 이메일이 중복이 있는지 확인
 * 4. 전부 통과하면 데이터 베이스에 저장
 */

router.post(
  "/auth/signup",
  signUpValidator,
  handleValidationResult,
  authController.signUp
);

/** 로그인 API
 * 1. 이메일, 비밀번호 입력 여부 확인
 * 2. 이메일에 해당하는 사용자 찾기
 * 3. 사용자 존재 여부
 * 4. 비밀번호 일치 여부
 * 5. JWT 토큰 발급
 * 6. 생성된 데이터를 전달
 */

router.post(
  "/auth/login",
  loginValidator,
  handleValidationResult,
  authController.login
);

module.exports = router;
