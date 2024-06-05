import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../interface/user-repository";
import { prisma } from "../database/prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: data,
    });
    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async delete(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: string, name: string, email: string, password: string, address: string) {

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password, address
      }
    })

    return user
  }
}
