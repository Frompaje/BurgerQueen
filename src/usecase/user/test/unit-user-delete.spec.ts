import { beforeEach, describe, expect, it, vi } from "vitest";
import { repositoryDependencies } from "./factory/make-repository-dependencies";
import { makeUserMock } from "./factory/make-user";
import { UserDoesntExist } from "../../../err/user/user-doesnt-exist";
import { UserRepository } from "../../../interface/user-repository";
import { DeleteUseCase } from "../user-delete-usecase";

describe("Delete User Use Case", () => {
  let userRepository: UserRepository;
  let sut: DeleteUseCase;
  beforeEach(() => {
    const depedencies = repositoryDependencies();

    userRepository = depedencies.userRepository;

    sut = new DeleteUseCase(userRepository);
  });
  describe("Sucess", () => {
    it("Should delete the user", async () => {
      const userMocking = makeUserMock();

      vi.spyOn(userRepository, "findById").mockResolvedValue(userMocking);
      const { user } = await sut.execute({ id: userMocking.id });

      expect(userRepository.delete).toBeCalledTimes(1);
      expect(user.id).toEqual(expect.any(String));
    });
  });
  describe("Error", () => {
    it("Should not delete the user, because the user.id was not found", async () => {
      const userMocking = makeUserMock();
      vi.spyOn(userRepository, "findById").mockResolvedValue(null);

      const resultErrUserDoesntExist = sut.execute({ id: userMocking.id });

      expect(resultErrUserDoesntExist).rejects.toBeInstanceOf(UserDoesntExist);
    });
  });
});
