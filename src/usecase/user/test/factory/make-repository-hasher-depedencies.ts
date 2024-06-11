import { vi } from "vitest";
import { UserRepository } from "../../../../interface/user-repository";
import { Hash } from "../../../../repository/adapter/password-hash";

export function repositoryAndHasherDependencies() {
  const userRepository: UserRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(),
    findUserByIdAndEmail: vi.fn(),
    update: vi.fn(),
    updateEmail: vi.fn(),
    updatePassword: vi.fn(),
  };

  const hasher: Hash = {
    compare: vi.fn(),
    hash: vi.fn(),
  };

  return {
    userRepository,
    hasher,
  };
}
