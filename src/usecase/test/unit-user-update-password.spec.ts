import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserRepository } from "../../interface/user-repository";
import { UpdateEmailUseCase } from "../user-update-email-usecase";
import { repositoryDependencies } from "./factory/make-repository-dependencies";
import { makeUserMock } from "./factory/make-user";
import { hash } from "bcryptjs";
import { UpdatePasswordUseCase } from "../user-update-password-usecase";
import { User } from "@prisma/client";

describe("Update password user", () => {
  let userRepository: UserRepository;
  let sut: UpdatePasswordUseCase;

  beforeEach(() => {
    const depedencies = repositoryDependencies();

    userRepository = depedencies.userRepository;

    sut = new UpdatePasswordUseCase(userRepository);
  });

  it("Should update password the user", async () => {
    const passwordActual = await hash("passwordActual", 6);
    const passwordUpdate = await hash("passwordUpdate", 6);

    const user: User = {
      id: "User-Id",
      address: "Rua 5 Djalma",
      createdAt: new Date(),
      email: "email@exemple.com",
      name: "Jonathan Donaldis",
      password: passwordActual,
      role: "USER",
    };

    vi.spyOn(userRepository, "findById").mockResolvedValue({
      id: "User-Id",
      address: "Rua 5 Djalma",
      createdAt: new Date(),
      email: "email@exemple.com",
      name: "Jonathan Donaldis",
      password: passwordActual,
      role: "USER",
    });

    vi.spyOn(userRepository, "updatePassword").mockResolvedValue({
      id: "User-Id",
      address: "Rua 5 Djalma",
      createdAt: new Date(),
      email: "email@exemple.com",
      name: "Jonathan Donaldis",
      password: passwordUpdate,
      role: "USER",
    });

    const resultUpdatePassword = await sut.execute({
      id: user.id,
      password: passwordUpdate,
    });

    expect(userRepository.findById).toBeCalledTimes(1);
    expect(userRepository.updatePassword).toBeCalledTimes(1);

    expect(resultUpdatePassword?.password).toEqual(passwordUpdate);
  });
});
