import { beforeEach, describe, expect, it, vi } from "vitest";
import { Hash } from "../../interface/password-hash";
import { UserRepository } from "../../interface/user-repository";
import { RegisterUseCase } from "../user-create-usecase";
import { makeUserMock } from "./factory/make-user";
import { UserAlreadyExistsError } from "../../err/user-already-exists.error";

describe("Create user", () => {
  let userRepository: UserRepository;
  let hasher: Hash
  let sut: RegisterUseCase;

  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      delete: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
      update: vi.fn()
    };
    hasher = {
      compare: vi.fn(),
      hash: vi.fn()
    }
    sut = new RegisterUseCase(userRepository, hasher);
  });

  it("Should create the user", async () => {
    const userMocking = makeUserMock()

    vi.spyOn(userRepository, "create").mockResolvedValue(userMocking)
    const { user } = await sut.execute(userMocking)

    expect(userRepository.create).toBeCalledTimes(1)
    expect(user.id).toEqual(expect.any(String))
  })

  it("Shouldn't create the user with same email", async () => {
    const userMocking = makeUserMock()

    vi.spyOn(userRepository, "findByEmail").mockResolvedValue(userMocking)

    expect(() => {
      return sut.execute(userMocking)
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it("Password should be hashed", async () => {
    const userMocking = makeUserMock()
    vi.spyOn(userRepository, "findByEmail").mockResolvedValue(userMocking)

    const { user } = await sut.execute(userMocking)

    const isPasswordCorrectHashed = await hasher.compare(userMocking.password, user.password)
    expect(isPasswordCorrectHashed).toEqual(true)
  })


});

