import { Hasher } from "../../repository/adapter/password-hash";
import { PrismaUserRepository } from "../../repository/prisma-user-repository";
import { AuthenticateUseCase } from "../../usecase/user/user-authenticate-usecase";

export function makeAuthenticateUseCase() {
  const userPrismaRepository = new PrismaUserRepository();
  const hasher = new Hasher();
  const authenticateUsecase = new AuthenticateUseCase(
    userPrismaRepository,
    hasher
  );

  return authenticateUsecase;
}
