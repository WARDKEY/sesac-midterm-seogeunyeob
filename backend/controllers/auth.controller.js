const authService = require("../services/auth.service.js");

// 요청과 응답을 담당
// 요청에 대한 처리는 서비스에 위임

class AuthController {
  async signUp(req, res, next) {
    // 인증, 인가, validation -> router에서 처리됨
    const { email, password, username } = req.body;

    // 에러는 컨트롤러에서 잡음
    try {
      const newUser = await authService.signUp({ email, password, username });
      return res.status(201).json({
        userid: newUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const token = await authService.login({ email, password });
      return res.status(200).send({
        token,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
