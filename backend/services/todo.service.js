const todoRepository = require("../repository/todo.repository");

class TodoService {
  async createPosts({ title, description, userId }) {
    return await todoRepository.createPost({ title, description, userId });
  }

  async findAllPosts(user) {
    const todos = await todoRepository.findAllPosts(user);
    console.log(todos);

    // 생성일과 삭제일이 다른 것은 삭제된 것이므로 제외
    return todos.filter((todo) => {
      return todo.deletedAt.getTime() === todo.createdAt.getTime();
    });
  }

  async findPostById(todoId) {
    return await todoRepository.findPostById(todoId);
  }

  async updatePost({ todoId, isCompleted }) {
    const post = await todoRepository.findPostById(todoId);

    console.log(post);

    if (!post) {
      throw new Error("PostNotFound");
    }

    const updatePost = await todoRepository.updatePost({
      todoId,
      isCompleted,
    });
    return updatePost;
  }

  async deletePost(todoId) {
    const post = await todoRepository.findPostById(todoId);
    if (!post) {
      throw new Error("PostNotFound");
    }

    console.log(post);

    await todoRepository.deletePost(todoId);
  }
}

module.exports = new TodoService();
