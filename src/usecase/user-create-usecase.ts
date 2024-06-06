import { $Enums, User } from "@prisma/client";
import { UserAlreadyExistsError } from "../err/user-already-exists.error";
import { Hash } from "../interface/password-hash";
import { UserRepository } from "../interface/user-repository";

export interface UseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  role: $Enums.Role;
}

export interface UseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hash
  ) {}
  async execute({
    name,
    email,
    password,
    address,
    role,
  }: UseCaseRequest): Promise<UseCaseResponse> {
    const password_hash = await this.hasher.hash(password);
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: password_hash,
      address,
      role,
    });

    if (!user) {
      throw new Error();
    }

    return { user };
  }
}
