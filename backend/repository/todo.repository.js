const prisma = require("../utils/prisma.js");

class TodoRepository {
  async createPost({ title, description, userId }) {
    return await prisma.Todo.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  async findAllPosts() {
    const posts = await prisma.Todo.findMany({
      // join
      include: {
        User: {
          select: {
            userId: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async findPostById(todoId) {
    return await prisma.Todo.findUnique({
      where: {
        todoId: +todoId,
      },
      include: {
        User: {
          select: {
            userId: true,
            nickname: true,
          },
        },
      },
    });
  }

  async updatePost({ todoId, title, content }) {
    return await prisma.Todo.update({
      where: { todoId: +todoId },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });
  }

  async deletePost(todoId) {
    await prisma.Todo.delete({
      where: { todoId: +todoId },
    });
  }
}

module.exports = new TodoRepository();
