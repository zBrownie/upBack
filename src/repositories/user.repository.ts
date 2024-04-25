import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interface/users.interface";

export class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
