const prisma = require("../utils/prisma.js");
// 게시글 작성자인지 확인
exports.checkPostOwner = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user;

  // userid랑 post의 userId가 동일한지 확인
  const post = await prisma.Post.findUnique({
    where: {
      postId: +postId,
    },
  });

  // 게시글 없음
  if (!post) {
    return next(new Error("PostNotFound"));
  }

  if (post.userId !== userId) {
    return next(new Error("Forbidden"));
  }

  console.log(" 게시글 작성자 확인");

  // 데이터 조회 후 잠깐 넣어놓음
  res.locals.post = post;
  // 문제 없으면 다음 미들웨어로
  next();
};
