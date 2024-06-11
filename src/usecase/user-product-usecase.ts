import { InvalidCredentialsError } from "../err/invalid-credentials-error";
import { UserRepository } from "../interface/user-repository";

export interface UseCaseRequest {
  id: string;
  description: string;
  price: string;
}

export class ProductUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id }: UseCaseRequest) {
    const userExist = await this.userRepository.findById(id);

    if (!userExist || userExist.role === "USER") {
      throw new InvalidCredentialsError();
    }
  }
}
