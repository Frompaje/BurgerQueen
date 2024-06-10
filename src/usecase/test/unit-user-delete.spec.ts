import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserDoesntExist } from "../../err/user-doesnt-exist";
import { UserRepository } from "../../interface/user-repository";
import { DeleteUseCase } from "../user-delete-usecase";
import { makeUserMock } from "./factory/make-user";

describe("Delete user", () => {
  let userRepository: UserRepository;
  let sut: DeleteUseCase;
  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      delete: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
      findUserByIdAndEmail: vi.fn(),
      update: vi.fn(),
    };
    sut = new DeleteUseCase(userRepository);
  });

  it("Should delete the user", async () => {
    const userMocking = makeUserMock();

    vi.spyOn(userRepository, "findById").mockResolvedValue(userMocking);
    const { user } = await sut.execute({ id: userMocking.id });

    expect(userRepository.delete).toBeCalledTimes(1);
    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not delete the user, because the user.id was not found", async () => {
    const userMocking = makeUserMock();
    vi.spyOn(userRepository, "findById").mockResolvedValue(null);

    const resultErrUserDoesntExist = sut.execute({ id: userMocking.id });

    expect(resultErrUserDoesntExist).rejects.toBeInstanceOf(UserDoesntExist);
  });
});
