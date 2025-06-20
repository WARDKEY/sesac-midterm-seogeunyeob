const todoService = require("../services/todo.service.js");

class TodoController {
  // 게시글 작성
  async createPost(req, res, next) {
    const { title, description } = req.body;
    const userId = req.user;
    try {
      const newPost = await todoService.createPosts({
        title,
        description,
        userId,
      });
      return res.status(200).json({ data: newPost });
    } catch (e) {
      next(new Error("DataBaseError"));
      console.log(e);
    }
  }

  // 전체 게시글 조회
  async findAllPosts(req, res, next) {
    try {
      const user = req.user;
      const posts = await todoService.findAllPosts(user);
      return res.status(200).json({ data: posts });
    } catch (e) {
      next(new Error("DataBaseError"));
      console.log(e);
    }
  }

  // 특정 게시글 조회
  async findPostById(req, res, next) {
    const { todoId } = req.params;
    try {
      // 형변환은 컨트롤러에서
      const post = await todoService.findPostById(+todoId);

      if (!post) {
        return next(new Error("PostNotFound"));
      }

      return res.status(200).json({
        data: post,
      });
    } catch (e) {
      next(e);
    }
  }

  // 게시글 수정
  async updatePost(req, res, next) {
    const { todoId, isCompleted } = req.body;
    try {
      const updatePost = await todoService.updatePost({
        todoId,
        isCompleted,
      });

      return res.status(200).json({
        message: "게시글 수정 완료",
        data: updatePost,
      });
    } catch (e) {
      console.log(e);

      next(e);
    }
  }

  // 게시글 삭제
  async deletePost(req, res, next) {
    const { todoId } = req.body;
    try {
      await todoService.deletePost(+todoId);
      return res.status(200).json({
        message: "게시글 삭제 완료",
      });
    } catch (e) {
      next(e || new Error("DataBaseError"));
    }
  }
}

module.exports = new TodoController();
