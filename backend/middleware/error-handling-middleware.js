module.exports = function (err, req, res, next) {
  console.error(err.message);

  // 에러 메시지 별로 따로 처리
  switch (err.message) {
    case "InputValidation":
    case "PasswordValidation":
      return res.status(400).send({
        errorMessage: "입력된 요청이 잘못되었습니다.",
      });

    case "ExistEmail":
      return res.status(409).send({
        errorMessage: "가입된 이메일 있습니다.",
      });

    // 어떤 값을 못 찾았을 때는 404
    case "UserNotFound":
      return res.status(404).send({
        errorMessage: "해당 유저가 없습니다.",
      });

    case "PostNotFound":
      return res.status(404).send({
        errorMessage: "게시물을 찾을 수 없습니다.",
      });

    case "PasswordError":
      return res.status(401).send({
        errorMessage: "패스워드가 일치하지 않습니다.",
      });

    case "DataBaseError":
      return res.status(500).send({
        errorMessage: "데이터 베이스에 오류가 있습니다.",
      });

    case "password":
      return res.status(400).send({
        errorMessage: "패스워드가 일치하지 않습니다.",
      });

    // break;  return 있어서 필요 없음

    case "Forbidden":
      return res.status(401).send({
        errorMessage: "접근 권한이 없습니다.",
      });

    // 다른 오류가 나도 서버 안 꺼지고 오류 발생
    default:
      return res.status(500).send({
        errorMessage: "서버에 오류가 있습니다.",
      });
  }
};
