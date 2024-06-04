import { hasher } from "../../../interface/password-hash";
import { InMemoryUserRepository } from "../../../repository/in-memory/in-memory-user-repository";
import { RegisterUseCase } from "../../user-create-usecase";

export function makeUserCreated() {
  const userInMemoryRepository = new InMemoryUserRepository();
  const hash = new hasher();
  const sut = new RegisterUseCase(userInMemoryRepository, hash);

  return sut;
}
