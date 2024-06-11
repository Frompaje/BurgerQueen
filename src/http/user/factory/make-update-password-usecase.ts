import { Hasher } from "../../../repository/adapter/password-hash";
import { PrismaUserRepository } from "../../../repository/prisma-user-repository";
import { UpdatePasswordUseCase } from "../../../usecase/user/user-update-password-usecase";

export function makeUpdatePasswordUseCase() {
  const userPrismaRepository = new PrismaUserRepository();
  const hasher = new Hasher();
  const updateEmailusecase = new UpdatePasswordUseCase(
    userPrismaRepository,
    hasher
  );

  return updateEmailusecase;
}
