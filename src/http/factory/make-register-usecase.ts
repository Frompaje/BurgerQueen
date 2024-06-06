import { Hasher } from "../../interface/password-hash";
import { PrismaUserRepository } from "../../repository/prisma-user-repository";
import { RegisterUseCase } from "../../usecase/user-create-usecase";

export function makeRegisterUseCase() {
  const userPrismaRepository = new PrismaUserRepository();
  const hash = new Hasher();
  const registerUsecase = new RegisterUseCase(userPrismaRepository, hash);

  return registerUsecase;
}
