import { $Enums } from "@prisma/client";
import { UserAlreadyExistsError } from "../err/user-already-exists.error";
import { UserRepository } from "../interface/user-repository";
import { Hash } from "../repository/adapter/password-hash";

export interface UseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  role: $Enums.Role;
}

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hash
  ) {}
  async execute({ name, email, password, address, role }: UseCaseRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await this.hasher.hash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: password_hash,
      address,
      role,
    });

    return { user };
  }
}
