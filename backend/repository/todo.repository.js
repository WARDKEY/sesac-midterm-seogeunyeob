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

  async findAllPosts(user) {
    const posts = await prisma.Todo.findMany({
      where: {
        userId: +user,
      },
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
            username: true,
          },
        },
      },
    });
  }

  async updatePost({ todoId, isCompleted }) {
    return await prisma.Todo.update({
      where: { todoId: +todoId },
      data: {
        isCompleted,
        updatedAt: new Date(),
      },
    });
  }

  async deletePost(todoId) {
    await prisma.Todo.update({
      where: { todoId: +todoId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

module.exports = new TodoRepository();
