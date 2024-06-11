import { beforeEach, describe, expect, it } from "vitest";
import { UserDoesntExist } from "../../../err/user/user-doesnt-exist";
import { Hasher } from "../../../repository/adapter/password-hash";
import { InMemoryUserRepository } from "../../../repository/in-memory/in-memory-user-repository";
import { RegisterUseCase } from "../user-create-usecase";
import { DeleteUseCase } from "../user-delete-usecase";

describe("Delete user", () => {
  let userRepository: InMemoryUserRepository;
  let registerUsecase: RegisterUseCase;
  let hasher: Hasher;
  let sut: DeleteUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hasher = new Hasher();
    registerUsecase = new RegisterUseCase(userRepository, hasher);
    sut = new DeleteUseCase(userRepository);
  });

  it("Should be delete user", async () => {
    const { user } = await registerUsecase.execute({
      name: "User-Name",
      address: "Jacinto",
      email: "exemple@gmail.com",
      password: "123123",
      role: "USER",
    });

    expect(user).toBeDefined();
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("User-Name");

    await sut.execute({ id: user.id });
    const deleteResult = await userRepository.findById(user.id);

    expect(deleteResult).toBeNull();
  });

  describe("Error delete user", () => {
    it("Should not delete the user, because the user.id was not found", async () => {
      expect(sut.execute({ id: "User-Id-Not-Found" })).rejects.toBeInstanceOf(
        UserDoesntExist
      );
    });
  });
});
