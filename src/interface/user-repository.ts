import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, name: string, email: string, password: string, address: string): Promise<User | null>
  delete(id: string): Promise<User | null>;
}
