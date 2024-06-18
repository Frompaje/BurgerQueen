import { compare, hash } from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { repositoryAndHasherDependencies } from "./factory/make-repository-hasher-depedencies";
import { makeUserMock } from "./factory/make-user";
import { UserAlreadyExistsError } from "../../../err/user/user-already-exists.error";
import { UserRepository } from "../../../interface/user-repository";
import { Hash } from "../../../repository/adapter/password-hash";
import { RegisterUseCase } from "../user-create-usecase";

describe("Create User Use Case", () => {
  let userRepository: UserRepository;
  let hasher: Hash;
  let sut: RegisterUseCase;
  beforeEach(() => {
    const depedencies = repositoryAndHasherDependencies();

    userRepository = depedencies.userRepository;
    hasher = depedencies.hasher;

    sut = new RegisterUseCase(userRepository, hasher);
  });

  describe("Sucess", () => {
    it("Should create the user", async () => {
      const userMocking = makeUserMock();
      vi.spyOn(userRepository, "create").mockResolvedValue(userMocking);

      const { user } = await sut.execute(userMocking);

      expect(userRepository.create).toBeCalledTimes(1);
      expect(user.id).toEqual(expect.any(String));
    });

    it("Password should be hashed", async () => {
      const passwordHashed = await hash("123456", 6);

      const userMockingNoHashed = makeUserMock({
        password: passwordHashed,
      });

      vi.spyOn(userRepository, "create").mockResolvedValue(userMockingNoHashed);

      const { user } = await sut.execute(userMockingNoHashed);
      const isPasswordCorrectHashed = await compare("123456", user.password);

      expect(isPasswordCorrectHashed).toEqual(true);
    });
  });

  describe("Error", () => {
    it("Shouldn't create the user with same email", async () => {
      const userMocking = makeUserMock();
      vi.spyOn(userRepository, "findByEmail").mockResolvedValue(userMocking);

      const resultErrSameEmail = sut.execute(userMocking);

      expect(resultErrSameEmail).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
  });
});
