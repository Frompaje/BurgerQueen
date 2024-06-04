import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserDoesntExist } from "../../err/user-doesnt-exist";
import { UserRepository } from "../../interface/user-repository";
import { DeleteUseCase } from "../user-delete-usecase";
import { makeUserMock } from "./factory/make-user";

describe("Delete user", () => {
  let userRepository: UserRepository;
  let deleteUsecase: DeleteUseCase;
  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      delete: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
    };
    deleteUsecase = new DeleteUseCase(userRepository);
  });



  it("Should delete the user", async () => {
    const userMock = makeUserMock()

    vi.spyOn(userRepository, "findById").mockResolvedValue(userMock);

    const { user } = await deleteUsecase.execute({ id: "User-id" })

    expect(userRepository.delete).toBeCalledTimes(1)
    expect(user.id).toEqual("User-id")
  })


  it("You must not delete the user, because you didn't find the id", async () => {

    vi.spyOn(userRepository, "findById").mockResolvedValue(null);

    expect(() => {
      return deleteUsecase.execute({
        id: "User-Id"
      })
    }).rejects.toBeInstanceOf(UserDoesntExist)

  })
});

