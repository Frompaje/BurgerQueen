import { Role, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { UserRepository } from "../../interface/user-repository";

interface RegisterUseCaseRequest {
  id: string;
  createdat: Date;
  name: string;
  email: string;
  password: string;
  address: string;
  role: Role;
}

export class InMemoryUserRepository implements UserRepository {
  public dataBase: User[] = [];

  async create({
    name,
    email,
    password,
    address,
    role,
  }: RegisterUseCaseRequest) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      createdAt: new Date(),
      address,
      role,
    };
    this.dataBase.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.dataBase.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = this.dataBase.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findUserByIdAndEmail(id?: string, email?: string) {
    const user = this.dataBase.find(
      (user) => user.id === id && user.email === email
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async delete(id: string) {
    const user = this.dataBase.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    this.dataBase = this.dataBase.filter((item) => item.id !== user.id);

    return user;
  }

  async update(id: string, name?: string, address?: string) {
    const user = this.dataBase.find((u) => u.id === id);

    if (!user) {
      return null;
    }

    user.name = name ?? user.name;
    user.address = address ?? user.email;

    return user;
  }

  async updateEmail(id: string, email: string) {
    const user = this.dataBase.find((u) => u.id === id);

    if (!user) {
      return null;
    }

    user.email = email ?? user.email;

    return user;
  }
}
