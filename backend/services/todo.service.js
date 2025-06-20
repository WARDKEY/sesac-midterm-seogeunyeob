const todoRepository = require("../repository/todo.repository");

class TodoService {
  async createPosts({ title, description, userId }) {
    return await todoRepository.createPost({ title, description, userId });
  }

  async findAllPosts() {
    return await todoRepository.findAllPosts();
  }

  async findPostById(todoId) {
    return await todoRepository.findPostById(todoId);
  }

  async updatePost({ todoId, title, content }) {
    const post = await todoRepository.findPostById(todoId);

    if (!post) {
      throw new Error("PostNotFound");
    }

    const updatePost = await todoRepository.updatePost({
      todoId,
      title,
      content,
    });
    return updatePost;
  }

  async deletePost(todoId) {
    const post = await todoRepository.findPostById(todoId);
    if (!post) {
      throw new Error("PostNotFound");
    }

    await todoRepository.deletePost(todoId);
  }
}

module.exports = new TodoService();
