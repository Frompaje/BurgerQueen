import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "../../../err/user/user-already-exists.error";
import { Hasher } from "../../../repository/adapter/password-hash";
import { InMemoryUserRepository } from "../../../repository/in-memory/in-memory-user-repository";
import { RegisterUseCase } from "../user-create-usecase";
import { makeUserMock } from "./factory/make-user";

describe("Create user", () => {
  let userRepository: InMemoryUserRepository;
  let hash: Hasher;
  let sut: RegisterUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hash = new Hasher();
    sut = new RegisterUseCase(userRepository, hash);
  });

  it("Shoulde be create user", async () => {
    const userMock = makeUserMock();

    const { user } = await sut.execute(userMock);

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual(userMock.name);
  });

  it("Shoulde be hashing password", async () => {
    const userMock = makeUserMock();

    const { user } = await sut.execute(userMock);
    const isPasswordCorrectHashed = await compare(
      userMock.password,
      user.password
    );

    expect(isPasswordCorrectHashed).toBe(true);
  });

  describe("Erro created users", () => {
    it("Should not create users with same email", async () => {
      const user = makeUserMock();

      await sut.execute(user);

      await expect(() => {
        return sut.execute(user);
      }).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
  });
});
