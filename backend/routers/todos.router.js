const prisma = require("../utils/prisma.js");
const express = require("express");
const authenticateToken = require("../middleware/authentication-middleware");
const {
  handleValidationResult,
  getPostsValidator,
  postsValidator,
  putPostsValidator,
} = require("../middleware/validation-result-handler");
const { checkPostOwner } = require("../middleware/authorization-middleware");
const todoController = require("../controllers/todo.controller");

const router = express.Router();

router
  .route("/todos")
  .get(authenticateToken, todoController.findAllPosts)

  // 게시글 작성(로그인된 사람만)
  .post(
    authenticateToken,
    postsValidator,
    handleValidationResult,
    todoController.createPost
  ) // 게시글 수정(작성자)
  .patch(
    authenticateToken,
    putPostsValidator,
    handleValidationResult,
    checkPostOwner,
    todoController.updatePost
  ) // 게시글 삭제(작성자)
  .delete(
    authenticateToken,
    getPostsValidator,
    handleValidationResult,
    checkPostOwner,
    todoController.deletePost
  );

router
  .route("/todos/:todoId")
  // 특정 게시글 조회(누구나)
  .get(getPostsValidator, handleValidationResult, todoController.findPostById);

module.exports = router;
