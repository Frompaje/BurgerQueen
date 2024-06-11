import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { UserRepository } from "../interface/user-repository";

export class PrismaUserRepository implements UserRepository {
  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: data,
    });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findUserByIdAndEmail(id?: string, email?: string) {
    return prisma.user.findUnique({
      where: {
        id,
        email,
      },
    });
  }

  delete(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }

  update(id: string, name: string, address: string) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        address,
      },
    });
  }
  updateEmail(id: string, emailUpdate: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: { email: emailUpdate },
    });
  }

  updatePassword(id: string, password: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
