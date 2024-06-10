import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserDoesntExist } from "../../err/user-doesnt-exist";
import { UserRepository } from "../../interface/user-repository";
import { UpdateUseCase } from "../user-update-usecase";
import { makeUserMock } from "./factory/make-user";

describe("Update user", () => {
  let userRepository: UserRepository;
  let sut: UpdateUseCase;

  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      delete: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
      findUserByIdAndEmail: vi.fn(),
      update: vi.fn(),
    };
    sut = new UpdateUseCase(userRepository);
  });

  it("Should update the user", async () => {
    const userMocking = makeUserMock();
    const updatedUserMocking = {
      ...userMocking,
      address: "Rua Rio Paraiba",
      email: "exemple@gmail.com",
      name: "Hewerton Reis",
    };

    vi.spyOn(userRepository, "findUserByIdAndEmail").mockResolvedValue(
      userMocking
    );

    vi.spyOn(userRepository, "update").mockResolvedValue(updatedUserMocking);

    const userUpdate = await sut.execute(updatedUserMocking);

    expect(userUpdate?.name).toEqual("Hewerton Reis");
    expect(userUpdate?.id).toBe(userMocking.id);
    expect(userRepository.update).toBeCalledTimes(1);
  });

  describe("Err Update user", () => {
    it("Shouldn't update the user, because the id or email wasn't found", async () => {
      const userMocking = makeUserMock();
      vi.spyOn(userRepository, "findUserByIdAndEmail").mockResolvedValue(null);

      const idOrEmailNotFound = sut.execute(userMocking);

      expect(idOrEmailNotFound).rejects.toBeInstanceOf(UserDoesntExist);
    });
  });
});
