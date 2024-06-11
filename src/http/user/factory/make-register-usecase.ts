import { PrismaUserRepository } from "../../../repository/prisma-user-repository";
import { Hasher } from "../../../repository/adapter/password-hash";
import { RegisterUseCase } from "../../../usecase/user/user-create-usecase";

export function makeRegisterUseCase() {
  const userPrismaRepository = new PrismaUserRepository();
  const hash = new Hasher();
  const registerUsecase = new RegisterUseCase(userPrismaRepository, hash);

  return registerUsecase;
}
