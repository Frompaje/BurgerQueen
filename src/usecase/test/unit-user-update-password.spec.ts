import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserRepository } from "../../interface/user-repository";
import { Hash } from "../../repository/adapter/password-hash";
import { UpdatePasswordUseCase } from "../user/user-update-password-usecase";
import { repositoryAndHasherDependencies } from "./factory/make-repository-hasher-depedencies";

describe("Update password user", () => {
  let userRepository: UserRepository;
  let hasher: Hash;
  let sut: UpdatePasswordUseCase;

  beforeEach(() => {
    const depedencies = repositoryAndHasherDependencies();

    userRepository = depedencies.userRepository;
    hasher = depedencies.hasher;
    sut = new UpdatePasswordUseCase(userRepository, hasher);
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
