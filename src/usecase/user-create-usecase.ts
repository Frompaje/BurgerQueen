import { Role, User } from "@prisma/client";
import { UserAlreadyExistsError } from "../err/user-already-exists.error";
import { UserRepository } from "../interface/user-repository";
import { Hash } from "../interface/password-hash";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  role: Role;
}

interface RegisterUseCaseResponse {
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
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

    return { user };
  }
}
