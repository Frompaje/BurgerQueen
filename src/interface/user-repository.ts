import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  findUserByIdAndEmail(id?: string, email?: string): Promise<User | null>;

  create(data: Prisma.UserCreateInput): Promise<User>;

  delete(id: string): Promise<User | null>;

  update(id: string, name?: string, address?: string): Promise<User | null>;

  updateEmail(id: string, emailUpdate: string): Promise<User | null>;

  updatePassword(id: string, password: string): Promise<User | null>;
}
