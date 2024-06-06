import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserAlreadyExistsError } from "../../err/user-already-exists.error";
import { Hash } from "../../interface/password-hash";
import { UserRepository } from "../../interface/user-repository";
import { RegisterUseCase } from "../user-create-usecase";
import {
  makeUserMock,
  makeUserMockPasswordNoHashed,
} from "./factory/make-user";
import { compare, hash } from "bcryptjs";

describe("Create user", () => {
  let userRepository: UserRepository;
  let hasher: Hash;
  let sut: RegisterUseCase;

  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      delete: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
    };
    hasher = {
      compare: vi.fn(),
      hash: vi.fn(),
    };
    sut = new RegisterUseCase(userRepository, hasher);
  });

  it("Should create the user", async () => {
    const userMocking = makeUserMock();

    vi.spyOn(userRepository, "create").mockResolvedValue(userMocking);
    const { user } = await sut.execute(userMocking);

    expect(userRepository.create).toBeCalledTimes(1);
    expect(user.id).toEqual(expect.any(String));
  });

  it("Shouldn't create the user with same email", async () => {
    const userMocking = makeUserMock();

    vi.spyOn(userRepository, "findByEmail").mockResolvedValue(userMocking);

    expect(() => {
      return sut.execute(userMocking);
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("Password should be hashed", async () => {
    const userMockingNoHashed = makeUserMockPasswordNoHashed();
    const password_hash = await hash(userMockingNoHashed.password, 6);
    vi.spyOn(userRepository, "create").mockResolvedValue(userMockingNoHashed);

    const { user } = await sut.execute(userMockingNoHashed);
    const isPasswordCorrectHashed = await compare(user.password, password_hash);

    expect(isPasswordCorrectHashed).toEqual(true);
  });
});
