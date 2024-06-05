import { InMemoryUserRepository } from "../../../repository/in-memory/in-memory-user-repository";
import { DeleteUseCase } from "../../user-delete-usecase";

export function makeUserDeleted() {
  const userInMemoryRepository = new InMemoryUserRepository();
  const sut = new DeleteUseCase(userInMemoryRepository);

  return sut;
}
