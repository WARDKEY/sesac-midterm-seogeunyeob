const { body, param, validationResult } = require("express-validator");

// 회원 가입 유효성 체크
exports.signUpValidator = [
  body("email")
    .isEmail()
    .withMessage("이메일 형식이 아닙니다.")
    .notEmpty()
    .withMessage("이메일이 없습니다."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호가 6자리 이하")
    .notEmpty()
    .withMessage("패스워드가 없습니다."),
  body("username").notEmpty().withMessage("닉네임이 없습니다."),
];

// 로그인 유효성 체크
exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("이메일 형식이 아닙니다.")
    .notEmpty()
    .withMessage("이메일이 없습니다."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호가 6자리 이하")
    .notEmpty()
    .withMessage("패스워드가 없습니다."),
];

// 게시글 작성 유효성 체크
exports.postsValidator = [
  body("title").notEmpty().withMessage("제목을 입력해주세요."),

  body("description").notEmpty().withMessage("내용을 입력해주세요."),
];

// 게시글 조회, 삭제 유효성 체크
exports.getPostsValidator = [
  param("todiId")
    .isInt()
    .withMessage("id가 숫자여야 합니다.")
    .notEmpty()
    .withMessage("todoId가 필요합니다."),
];

// 게시글 수정 유효성 체크
exports.putPostsValidator = [
  param("todoId")
    .isInt()
    .withMessage("id가 숫자여야 합니다.")
    .notEmpty()
    .withMessage("todoId가 필요합니다."),
  body("title").notEmpty().withMessage("제목을 입력해주세요."),

  body("description").notEmpty().withMessage("내용을 입력해주세요."),
];

exports.handleValidationResult = (req, res, next) => {
  // 이전 미들웨어에서 검사한 결과에서 에러를 배열로 가져옴
  const result = validationResult(req).errors;

  // 배열의 길이가 0이 아니면 에러 존재
  if (result.length !== 0) {
    // 에러 메시지 추출
    const extractError = result.map((err) => err.msg);
    // 입력 오류가 있는 경우
    return next(new Error("InputValidation"));
  }

  // 에러 없으면 다음
  next();
};
