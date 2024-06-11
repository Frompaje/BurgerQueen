import { PrismaUserRepository } from "../../repository/prisma-user-repository";
import { DeleteUseCase } from "../../usecase/user/user-delete-usecase";

export function makeDeleteUseCase() {
  const userPrismaRepository = new PrismaUserRepository();
  const deleteUsecase = new DeleteUseCase(userPrismaRepository);

  return deleteUsecase;
}
