import { PrismaUserRepository } from "../../repository/prisma-user-repository";
import { UpdateEmailUseCase } from "../../usecase/user-update-email-usecase";

export function makeUpdateEmailUseCase() {
  const userPrismaRepository = new PrismaUserRepository();
  const updateEmailusecase = new UpdateEmailUseCase(userPrismaRepository);

  return updateEmailusecase;
}
