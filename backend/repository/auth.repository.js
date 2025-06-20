const prisma = require("../utils/prisma.js");

class AuthRepository {
  async findUserByEmail(email) {
    return await prisma.Users.findFirst({
      where: { email },
    });
  }

  async createUser(email, password, username) {
    return await prisma.Users.create({
      data: {
        email,
        password,
        username,
      },
    });
  }
}

module.exports = new AuthRepository();
