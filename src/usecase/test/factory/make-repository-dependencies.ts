import { vi } from "vitest";
import { UserRepository } from "../../../interface/user-repository";

export function repositoryDependencies() {
  const userRepository: UserRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(),
    findUserByIdAndEmail: vi.fn(),
    update: vi.fn(),
    updateEmail: vi.fn(),
  };

  return {
    userRepository,
  };
}
