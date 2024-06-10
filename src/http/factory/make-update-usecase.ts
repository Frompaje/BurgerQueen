import { PrismaUserRepository } from "../../repository/prisma-user-repository";
import { UpdateUseCase } from "../../usecase/user-update-usecase";

export function makeUpdateUseCase() {
  const userPrismaRepository = new PrismaUserRepository();
  const updateUsecase = new UpdateUseCase(userPrismaRepository);

  return updateUsecase;
}
