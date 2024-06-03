import { beforeEach, describe, vi } from "vitest";
import { UserRepository } from "../../interface/user-repository";
import { RegisterUseCase } from "../user-create-usecase";
import { Hash } from "../../interface/password-hash";
import { it } from "node:test";

describe("Register Use case", () => {
  let userRepository: UserRepository;
  let hash: Hash;
  let registerUseCase: RegisterUseCase;

  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
    };

    hash = {
      compare: vi.fn(),
      hash: vi.fn(),
    };
  });
});
